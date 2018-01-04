import {Http, Headers} from '@angular/http';
import {Injectable, Inject, Output, EventEmitter} from "@angular/core";

import {MessageService} from './message.service';
import {ConsoleService} from './console.service';
import {ConfigService} from './config.service';
import {AuthService} from './auth.service';

//import {ToastController} from 'ionic-angular';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/Rx';
import {Model} from "../models/Model";
import {Raw} from "../interfaces/interfaces"
import {HttpHeaders,HttpClient} from "@angular/common/http";

@Injectable()
export class ApiService {
    @Output() errorsChanged: EventEmitter<any> = new EventEmitter();

    baseurl: string;
    timer: number;
    timeout: number;
    retry: number;
    pingOnError: boolean = false;
    isUp: boolean = false;
    pingInterval:any;

    authService: AuthService;

    constructor(public http: HttpClient,
                public messageService: MessageService,
                private consoleService: ConsoleService,

                private configService: ConfigService) {
        this.consoleService.serv("+ ApiService");
        this.timeout = configService.API_TIMEOUT;
        this.retry = configService.API_NB_RETRY;
    this.baseurl=this.configService.apiURL;
        this.ping(function () {

        });

    }
    setApiUrl(v:string){
      this.baseurl = v;
    }

    setAuthService(authService, f) {
        this.authService = authService;
        f();
    }

    //TEST WHETHER API IS LIVE
    /*if (this.pingOnError) {
     this.ping((isUp) => {
     if (isUp) {
     this.doProcessError(errorCode,err);
     } else {
     this.messageService.addError("API_DOWN", null, "API is unreachable.");
     }
     });
     */

    processError(errorCode: string, err) {
        this.messageService.hideLoading();
        this.messageService.hideSaving();
        console.error(errorCode, err);
        let desc: string;
        if(!err){
            this.messageService.addError("API_ERROR", null, "No error desc available");
        return}

        if (err.name === "TimeoutError") {
            this.messageService.addError("API_DOWN", null, "API is unreachable.");
        }else if (err.message === "Unauthorized") {
            this.messageService.addError("API_UNAUTHORIZED", null, "You don't have access to this ressource.");
        }else{
            console.log("other error",errorCode,err);
            if (err && err._body && typeof err._body === "string") {
                try {
                    var parsed = JSON.parse(err._body);
                    if (parsed.errordesc)
                        desc = parsed.errordesc;
                    else if (parsed.message)
                        desc = parsed.message
                    console.log("other error");

                    this.messageService.readError(parsed.error);

                } catch (e) {
                    desc = err._body;
                    console.log("not parsed");

                    this.messageService.addError(err.url,parsed.error,"Unparsable error");

                }
            }
            this.messageService.addError(errorCode,"","");

            /*          let toast = this.toastCtrl.create({
                          message: errorCode + " " + err + " " + (desc ? desc.toString() : ""),
                          cssClass: "red",
                          dismissOnPageChange: true, showCloseButton: true,
                          position: 'bottom'
                      });
                      toast.present();
          */
        }
    }

    processData(data, f: Function) {
        this.messageService.hideLoading();
        this.messageService.hideSaving();
        console.log("ApiService processData", data);
        if (data.error) {
            this.processError("API_PROCESS", data.errordesc);
        } else {
            f(data);
        }
    }
    pingResult(isUp: boolean, f: Function) {

        const diff = new Date().getTime() - this.timer;
        this.isUp = isUp;
        this.messageService.hideLoading();
        this.messageService.hideSaving();
        if (isUp) {
            console.log("PING Server up ", diff, "ms");
            clearInterval(this.pingInterval);
            this.processWaitLine()
        } else {
            console.error("PING Server down", diff, "ms");
        }
        f(isUp);
    }
    processWaitLine(){
       console.log("waitline",this.waitLine)
        for(let i=0;i<this.waitLine.length;++i){
            const w:any=this.waitLine[i]
        if(w.type==="get")
            this.get(w.url,w.headers,w.func)
        }
    }
    private handlePingError(error: any) {
        console.error('An error occurred', error,this);
        if(!this.pingInterval)
            this.pingInterval=window.setInterval(() => {
               this.ping(()=>{})
            },3000);
        //return Promise.reject(error.message || error);
    }

    ping(f: Function): void {
        const fullurl: string = this.baseurl + "ping";
        console.log("PING", fullurl);
        this.timer = new Date().getTime();
        //const h: HttpHeaders = this.authService.noauthGetHeaders;
        this.http.get(fullurl)
            .toPromise()
            .then(res => this.pingResult(true, f))
            .catch(this.handlePingError.bind(this));
        ;
    }

    authget(url: string, f: Function): void {
        let fullurl: string = this.baseurl + url;
        let h: HttpHeaders = this.authService.authGetHeaders;
        this.get(fullurl, h, f);
    }

    noauthget(url: string, f: Function): void {
        let fullurl: string = this.baseurl + url;
        let h: HttpHeaders = this.authService.noauthGetHeaders;
        this.get(fullurl, h, f);
    }

    authput(url: string, model: Model|any, f): void {
        let fullurl: string = this.baseurl + url;
        let h: HttpHeaders = this.authService.authPostHeaders;
      let ser: string = typeof model =="object"?JSON.stringify(model):model.serialize();
        this.put(fullurl, ser, h, f);
    }

    authpatch(url: string, model: Model|any, referenceRaw: Raw, f: Function): void {
        let fullurl: string = this.baseurl + url;
        let h: HttpHeaders = this.authService.authPostHeaders;


        this.patch(fullurl, model, referenceRaw, h, f);
    }

    authpost(url: string, model: Model|any, f: Function): void {
        let fullurl: string = this.baseurl + url;
        let h: HttpHeaders = this.authService.authPostHeaders;
      let ser: string = typeof model =="object"?JSON.stringify(model):model.serialize();
        this.post(fullurl, ser, h, f);
    }

    authrawpost(url: string, raw: any, f: Function): void {
        let fullurl: string = this.baseurl + url;
        let h: HttpHeaders = this.authService.authPostHeaders;
        let ser: string = JSON.stringify(raw);
        this.post(fullurl, ser, h, f);
    }

    noauthpost(url: string, model: Model|any, f: Function): void {
        let fullurl: string = this.baseurl + url;
        let h: HttpHeaders = this.authService.noauthPostHeaders;
        let ser: string = typeof model =="object"?JSON.stringify(model):model.serialize();
        this.post(fullurl, ser, h, f);
    }
    noauthrawpost(url: string, raw: any, f: Function): void {
        let fullurl: string = this.baseurl + url;
        let h: HttpHeaders = this.authService.noauthPostHeaders;
        let ser: string = JSON.stringify(raw);
        this.post(fullurl, ser, h, f);
    }

    authdelete(url: string, f: Function) {
        let fullurl: string = this.baseurl + url;
        let h: HttpHeaders = this.authService.authPostHeaders;
        this.delete(fullurl, h, f);
    }

    private post(url: string, raw: any, headers: HttpHeaders, f: Function) {
        this.consoleService.post("Posting", url, "seralized", raw, "headers", headers);
        this.messageService.showSaving();
        this.http.post(url, raw, {headers: headers})
            .timeout(this.timeout)
            .retry(this.retry)
            .subscribe(
                data => this.processData(data, f),
                err => this.processError("API_POST", err),
                // err => this.error(err),
                () => console.log('Done posting.')
            );
    }

    private delete(url: string, headers: HttpHeaders, f: Function) {
        this.consoleService.delete("Deleting", url);
        this.messageService.showSaving();
        this.http.delete(url, {headers: headers})

            .timeout(this.timeout)
            .retry(this.retry)
            .subscribe(
                data => this.processData(data, f),
                err => this.processError("API_DELETE", err),
                // err => this.error(err),
                () => console.log('Done deleting.')
            );
    }

    private put(url: string, ser: string, headers: HttpHeaders, f: Function) {
        this.consoleService.put("Putting", url, "obj", ser, "serialized", ser);
        this.messageService.showSaving();
        this.http.put(url, ser, {headers: headers})

            .timeout(this.timeout)
            .retry(this.retry)
            .subscribe(
                data => this.processData(data, f),
                err => this.processError("API_PUT", err),
                // err => this.error(err),
                () => console.log('Done putting.')
            );
    }

    private patch(url: string, model: Model, referenceRaw: Raw, headers: HttpHeaders, f: Function) {
        let ser: string = model.serializeModified(referenceRaw);
        this.consoleService.patch("Patching", url, "obj", model, "serialized", ser);
        this.messageService.showSaving();
        this.http.patch(url, ser, {headers: headers})

            .timeout(this.timeout)
            .retry(this.retry)
            .subscribe(
                data => this.processData(data, f),
                err => this.processError("API_PATCH", err),
                // err => this.error(err),
                () => console.log('Done patching.')
            );
    }
    waitLine:any[]=[];
    private get(url: string, headers: HttpHeaders, f: Function) {
        if(!this.isUp) {
            this.waitLine.push({type:"get",url:url,headers:headers,func:f})
            return ;
        }
        this.timer = new Date().getTime();
        this.consoleService.get("ApiService Get", url, headers);
        this.messageService.showLoading();
        this.http.get(url, {headers: headers})

            .timeout(this.timeout)
            .retry(this.retry)
            .subscribe(
                data => this.processData(data, f),
                err => this.processError("API_GET", err),
                // err => this.error(err),
                () => console.log('Done.')
            );
    }
}
