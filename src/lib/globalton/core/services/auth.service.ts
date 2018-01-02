import {forwardRef, Injectable, Provider, EventEmitter} from '@angular/core';
import {Component, Output}         from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import {MessageService} from './message.service';
import {Inject} from '@angular/core';
import {Location} from '@angular/common';
import {HttpHeaders} from "@angular/common/http";
//SERVICES
import {CurrencyService} from '../services/currency.service';
import {ConsoleService} from './console.service';
import {RequestService} from './request.service';
import {ConfigService} from './config.service';
import {ApiService} from './api.service';
//import {TranslateService} from './translate.service';

import {TranslateService} from '@ngx-translate/core';
import {Http, Headers} from '@angular/http';
import {ObjectId} from "../interfaces/interfaces"
import {Logic} from "../../../../logic/Logic";
import {EventService} from "../../../localton/services/event.service";

@Injectable()
export class AuthService {
    @Output() loginChanged: EventEmitter<any> = new EventEmitter();

    @Output() loginHeaderChanged: EventEmitter<any> = new EventEmitter();
    CONTENT_AUTHENTIFICATION: boolean;

    baseurl: string;

    userId: ObjectId;
    isPostConfigured: boolean = false;
    loginResponse: { token: string, lang: string, currency: string, timezone: string, cartId: ObjectId, user: any, userId: ObjectId, entityId: ObjectId };

    token: string;
    data: any;
    user: any;
    authenticated: boolean = false;
    isTourDone: boolean = false;
    timezone: string;
    ioid: ObjectId;

    paymentExpiration:number;

    entityId: ObjectId;
    cartId: ObjectId;

    authGetHeaders: HttpHeaders;
    noauthGetHeaders: HttpHeaders;
    authPostHeaders: HttpHeaders;
    noauthPostHeaders: HttpHeaders;

    FB_initParams: InitParams = {
    appId: '276517919486522',
    xfbml: true,
    version: 'v2.8'
};
    localStorageKey: string;

    constructor(
                public messageService: MessageService,
                private fb: FacebookService,
                private consoleService: ConsoleService,

                private translateService: TranslateService,
                private currencyService: CurrencyService,
                private apiService: ApiService,
                private configService: ConfigService) {
        this.consoleService.serv("+ AuthService");
        this.baseurl = this.configService.getApiUrl();
        this.configService.perSiteConfigured.subscribe(value => this.postConfigEvent(value), error => console.log("Error postConfigEvent" + error), () => console.log('done'));
        this.createNoAuthHeaders();
        this.apiService.setAuthService(this, () => {
            this.apiService.ping(function () {

            });
        });
        this.initFB();
    }

    //WHEN CONFIG IS DONE
    postConfigEvent(value) {
        console.log("auth.service postconfigevent", value);
        if (value.type == "general") {
            this.CONTENT_AUTHENTIFICATION = value.CONTENT_AUTHENTIFICATION;
            this.setLocalStorageKey();
            let jwt = localStorage.getItem(this.localStorageKey);
            if (jwt !== null) {
                this.consoleService.log("has local storage");
                this.setTokenFromLocalStorage();
                this.postLogin();
            } else {
                this.consoleService.auth("No Local Storage");
                this.configService.isReady.emit({logged:true})
            }
            this.isPostConfigured = true;
            //this.configService.isReady.emit({logged:false})
            this.emitAuthStatus()
        }
    }

    setLocalStorageKey() {
        let sitename = this.configService.sitename;
        let appname = this.configService.app;
        if (appname) {
            this.localStorageKey = sitename + "-" + appname + "-jwt";
        } else {
            console.error("Error no app name")
        }
    }

    getStoredUserId(): ObjectId {
        if (!this.userId) console.error("Stored userid undefined");
        return this.userId
    }

    getUserId(f: Function): void {
        f(this.userId);
    }

    loadFromLoginResponse() {
        this.timezone = this.loginResponse.timezone;
        this.currencyService.setCurrency(this.loginResponse.currency);
        this.translateService.use(this.loginResponse.lang);
        this.user = this.loginResponse.user;
        this.userId = this.loginResponse.userId;
        this.entityId = this.loginResponse.entityId;
        this.token = this.loginResponse.token;
        this.cartId = this.loginResponse.cartId;


    }

    postLogin(): void {
        console.log("[AUTH] postlogin", this.loginResponse);
        this.loadFromLoginResponse();

        this.createAuthHeaders();
        this.authenticated = true;
        console.log("[AUTH] postlogin userid=", this.userId, "authenticated=",this.authenticated);
        this.configService.setEntityPrefix("entity/" + this.entityId + "/");
        this.emitAuthStatus();
        this.updateLocalStorage()

    }


    processError(err, f): void {

        console.log("[AUTH] proceseerror");
        this.messageService.addError("AUTH", err);
        f({error: true, desc: err, user: null});
    }

    getToken(): string {
        return this.token;
    }
  isSubscriptionActive():boolean{

      return true;
      // return this.authenticated && this.paymentExpiration && this.paymentExpiration>new Date().getTime()/1000
  }
    isAuthenticated(): boolean {
        return this.authenticated;
    }

    setTokenFromLocalStorage(): boolean {
        this.loginResponse = JSON.parse(localStorage.getItem(this.localStorageKey));
        if (this.loginResponse) {
            console.log("loginResponseFromLocalstorage", this.loginResponse);
            this.loadFromLoginResponse()
            return true;
        }
        return false;
        //this.decodedJwt = this.token && jwt_decode(this.token);
    }


    updateLocalStorage(): void {

        this.loginResponse.currency = this.currencyService.getUserCurrency();
        this.loginResponse.lang = this.translateService.currentLang;
        console.log("updateLocal", this.loginResponse);
        let localStorageLoginResponse: string = JSON.stringify(this.loginResponse);
        localStorage.setItem(this.localStorageKey, localStorageLoginResponse);
    }

    processLogin(data, rememberme: boolean, f): any {
        console.log(" > authService processLogin");
        if (data.error) {
            f({error: data.error, errordesc: data.errordesc, user: null});
        } else {
            if (!data.success) {
                f({error: false, success: false, user: data});
            } else {
                console.log("login:logged:response", data);
                this.loginResponse = data;
                this.token = data.token;
                if (rememberme) {
                    let localStorageLoginResponse: string = JSON.stringify(this.loginResponse);
                    localStorage.setItem(this.localStorageKey, localStorageLoginResponse);
                }
                this.isTourDone = data.istourdone;
                this.postLogin();
                f({error: false, success: true, user: data});
            }
        }
    }

    processLoginFB(data, f): any {
        console.log(" > authService processLoginFB",data);

        if (data.error) {
            f({error: data.error, errordesc: data.errordesc, user: null});
        } else {
            if (!data.success) {
                console.log("no success");
                f({error: false, success: false, user: data});
            } else {

                console.log("login:logged:response", data);
                this.loginResponse = data.data;
                this.token = data.token;

                if (true) { //rememberme
                    let localStorageLoginResponse: string = JSON.stringify(this.loginResponse);
                    localStorage.setItem(this.localStorageKey, localStorageLoginResponse);
                }
                this.isTourDone = data.istourdone;
                this.postLogin();
                f({error: false, success: true, user: data});
            }
        }
    }

    createAuthHeaders(): void {
        console.log(" > authService createAuthHeaders");
        this.authGetHeaders = new HttpHeaders();
        if (this.token) {
            this.authGetHeaders=this.authGetHeaders.set('Authorization', this.token);
        } else {
            console.warn(" > authService createAuthHeaders token not set");
        }
      this.authGetHeaders=this.authGetHeaders.set('Content-Type', 'application/json');
        this.authPostHeaders = this.authGetHeaders;
        console.log("AUTH headers",this.authPostHeaders)


    }

    createNoAuthHeaders(): void {
        console.log(" > authService createNoAuthHeaders");
        this.noauthPostHeaders = new HttpHeaders();
        this.noauthPostHeaders=this.noauthPostHeaders.set('Content-Type', 'application/json');
        this.noauthGetHeaders = new HttpHeaders();
        this.noauthGetHeaders=this.noauthGetHeaders.set('Content-Type', 'application/json');
        if (!this.authGetHeaders) {
            this.authGetHeaders = new HttpHeaders();
            this.authGetHeaders=this.authGetHeaders.set('Content-Type', 'application/json');
        }
        if (!this.authPostHeaders) {
            this.authPostHeaders = new HttpHeaders();
            this.authPostHeaders=this.authPostHeaders.set('Content-Type', 'application/json');
        }
    }

    private emitAuthStatus(): void {
        console.log("authService emitAuthStatus user=", this.user, "auth=",this.authenticated);
        this.loginChanged.emit({authentificated: this.authenticated, isTourDone: this.isTourDone, user: this.user});
    }

    logError(err): void {
        console.error('There was an error: ' + err);
    }

    public doLogout(): void {
        this.authenticated = false;
        this.token = null;
        this.userId = null;
        this.user = null;
        localStorage.removeItem(this.localStorageKey);
        this.emitAuthStatus();
        console.log('Session has been cleared');
    }
    facebookAccessToken:any;
    facebookUserId:any
    ;

    loginWithFacebook(response:any, f:Function){
        console.log("loginWithFacebook",response);
        this.facebookAccessToken=response.authResponse.accessToken;
        this.facebookUserId=response.authResponse.userID;

        let url = "user/login/app/fb?token=" + this.facebookAccessToken+ "&userId=" + this.facebookUserId+"&force=false";
        console.log(" > authService loginWithFacebook", url);
        this.apiService.noauthget(url, (data) => {
            console.log("Answ",data);
                if("login" in data) data=data.login;
            console.log("Answ",data);
            if(data.success)
                this.processLoginFB(data, f);
            else
                f(data);

        })
    }
    linkWithFacebook(response:any,password:string, f:Function){
        console.log("linkWithFacebook",response);
        this.facebookAccessToken=response.authResponse.accessToken;
        this.facebookUserId=response.authResponse.userID;
        let url = "user/auth/app/fb/link";//?p="+password+"&token=" + this.facebookAccessToken+ "&userId=" + this.facebookUserId+"&force=true";
        let data={p:password,token:this.facebookAccessToken,userId:this.facebookUserId}
        console.log(" > authService fblogin", url);
        this.apiService.noauthrawpost(url, data,(data) => {
            console.log("linkWithFacebook answ",data)
            if("login" in data) data=data.login;
            console.log("Answ",data);
            if(data.success)
                this.processLoginFB(data, f);
            else
                f(data);
        });
    }
    initFB(){
        //init facebook
        this.fb.init(this.FB_initParams).then(function(valeur) {
            console.log("[Facebook] init ok");
        }, function(raison) {
            console.log("[Facebook] init failed");
        });;
    }
}
