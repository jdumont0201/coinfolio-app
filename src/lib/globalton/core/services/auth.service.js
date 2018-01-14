"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/timeout");
var http_1 = require("@angular/common/http");
var AuthService = (function () {
    function AuthService(messageService, fb, consoleService, translateService, currencyService, apiService, configService) {
        var _this = this;
        this.messageService = messageService;
        this.fb = fb;
        this.consoleService = consoleService;
        this.translateService = translateService;
        this.currencyService = currencyService;
        this.apiService = apiService;
        this.configService = configService;
        this.loginChanged = new core_1.EventEmitter();
        this.loginHeaderChanged = new core_1.EventEmitter();
        this.isPostConfigured = false;
        this.authenticated = false;
        this.isTourDone = false;
        this.FB_initParams = {
            appId: '276517919486522',
            xfbml: true,
            version: 'v2.8'
        };
        this.consoleService.serv("+ AuthService");
        this.baseurl = this.configService.getApiUrl();
        this.configService.perSiteConfigured.subscribe(function (value) { return _this.postConfigEvent(value); }, function (error) { return console.log("Error postConfigEvent" + error); }, function () { return console.log('done'); });
        this.createNoAuthHeaders();
        this.apiService.setAuthService(this, function () {
        });
        this.initFB();
    }
    AuthService.prototype.setLogic = function (l) {
        this.logic = l;
    };
    //WHEN CONFIG IS DONE
    AuthService.prototype.postConfigEvent = function (value) {
        console.log("auth.service postconfigevent", value);
        if (value.type === "general") {
            this.CONTENT_AUTHENTIFICATION = value.CONTENT_AUTHENTIFICATION;
            this.setLocalStorageKey();
            var jwt = localStorage.getItem(this.localStorageKey);
            if (jwt !== null) {
                this.consoleService.log("has local storage");
                this.setTokenFromLocalStorage();
                this.postLogin();
            }
            else {
                this.consoleService.auth("No Local Storage");
                this.configService.isReady.emit({ logged: true });
            }
            this.isPostConfigured = true;
            //this.configService.isReady.emit({logged:false})
            this.emitAuthStatus();
        }
    };
    AuthService.prototype.setLocalStorageKey = function () {
        var sitename = this.configService.sitename;
        var appname = this.configService.app;
        if (appname) {
            this.localStorageKey = sitename + "-" + appname + "-jwt";
        }
        else {
            console.error("Error no app key");
        }
    };
    AuthService.prototype.getStoredUserId = function () {
        if (!this.userId)
            console.error("Stored userid undefined");
        return this.userId;
    };
    AuthService.prototype.getUserId = function (f) {
        f(this.userId);
    };
    AuthService.prototype.loadFromLoginResponse = function () {
        this.timezone = this.loginResponse.timezone;
        this.currencyService.setCurrency(this.loginResponse.currency);
        this.translateService.use(this.loginResponse.lang);
        this.user = this.loginResponse.user;
        this.userId = this.loginResponse.userId;
        this.entityId = this.loginResponse.entityId;
        this.token = this.loginResponse.token;
        this.cartId = this.loginResponse.cartId;
        this.favoritePairs = this.loginResponse.favoritePairs ? JSON.parse(this.loginResponse.favoritePairs) : [];
    };
    AuthService.prototype.postLogin = function () {
        var _this = this;
        console.log("[AUTH] postlogin", this.loginResponse);
        this.loadFromLoginResponse();
        this.createAuthHeaders();
        this.authenticated = true;
        console.log("[AUTH] postlogin userid=", this.userId, "authenticated=", this.authenticated);
        this.configService.setEntityPrefix("entity/" + this.entityId + "/");
        if (!this.user)
            this.logic.getMe(function (user) {
                _this.user = user;
                _this.favoritePairs = user.favoritePairs;
            });
        this.emitAuthStatus();
        this.updateLocalStorage();
    };
    AuthService.prototype.processError = function (err, f) {
        console.log("[AUTH] proceseerror");
        this.messageService.addError("AUTH", err);
        f({ error: true, desc: err, user: null });
    };
    AuthService.prototype.getToken = function () {
        return this.token;
    };
    AuthService.prototype.isSubscriptionActive = function () {
        return true;
        // return this.authenticated && this.paymentExpiration && this.paymentExpiration>new Date().getTime()/1000
    };
    AuthService.prototype.isAuthenticated = function () {
        return this.authenticated;
    };
    AuthService.prototype.setTokenFromLocalStorage = function () {
        this.loginResponse = JSON.parse(localStorage.getItem(this.localStorageKey));
        if (this.loginResponse) {
            console.log("loginResponseFromLocalstorage", this.loginResponse);
            this.loadFromLoginResponse();
            return true;
        }
        return false;
        //this.decodedJwt = this.token && jwt_decode(this.token);
    };
    AuthService.prototype.updateLocalStorage = function () {
        this.loginResponse.currency = this.currencyService.getUserCurrency();
        this.loginResponse.lang = this.translateService.currentLang;
        console.log("updateLocal", this.loginResponse);
        var localStorageLoginResponse = JSON.stringify(this.loginResponse);
        localStorage.setItem(this.localStorageKey, localStorageLoginResponse);
    };
    AuthService.prototype.processLogin = function (data, rememberme, f) {
        this.consoleService.auth("processLogin");
        if (data.error) {
            f({ error: data.error, errordesc: data.errordesc, user: null });
        }
        else {
            if (!data.success) {
                f({ error: false, success: false, user: data });
            }
            else {
                console.log("login:logged:response", data);
                this.loginResponse = data;
                this.token = data.token;
                if (rememberme) {
                    var localStorageLoginResponse = JSON.stringify(this.loginResponse);
                    localStorage.setItem(this.localStorageKey, localStorageLoginResponse);
                }
                this.isTourDone = data.istourdone;
                this.postLogin();
                f({ error: false, success: true, user: data });
            }
        }
    };
    AuthService.prototype.processLoginFB = function (data, f) {
        this.consoleService.auth("processLoginFB", data);
        if (data.error) {
            f({ error: data.error, errordesc: data.errordesc, user: null });
        }
        else {
            if (!data.success) {
                console.log("no success");
                f({ error: false, success: false, user: data });
            }
            else {
                console.log("login:logged:response", data);
                this.loginResponse = data.data;
                this.token = data.token;
                if (true) {
                    var localStorageLoginResponse = JSON.stringify(this.loginResponse);
                    localStorage.setItem(this.localStorageKey, localStorageLoginResponse);
                }
                this.isTourDone = data.istourdone;
                this.postLogin();
                f({ error: false, success: true, user: data });
            }
        }
    };
    AuthService.prototype.createAuthHeaders = function () {
        this.consoleService.auth("createAuthHeaders");
        this.authGetHeaders = new http_1.HttpHeaders();
        if (this.token) {
            this.authGetHeaders = this.authGetHeaders.set('Authorization', this.token);
        }
        else {
            console.warn(" > authService createAuthHeaders token not set");
        }
        this.authGetHeaders = this.authGetHeaders.set('Content-Type', 'application/json');
        this.authPostHeaders = this.authGetHeaders;
        console.log("AUTH headers", this.authPostHeaders);
    };
    AuthService.prototype.createNoAuthHeaders = function () {
        this.consoleService.auth("createNoAuthHeaders");
        this.noauthPostHeaders = new http_1.HttpHeaders();
        this.noauthPostHeaders = this.noauthPostHeaders.set('Content-Type', 'application/json');
        this.noauthGetHeaders = new http_1.HttpHeaders();
        this.noauthGetHeaders = this.noauthGetHeaders.set('Content-Type', 'application/json');
        if (!this.authGetHeaders) {
            this.authGetHeaders = new http_1.HttpHeaders();
            this.authGetHeaders = this.authGetHeaders.set('Content-Type', 'application/json');
        }
        if (!this.authPostHeaders) {
            this.authPostHeaders = new http_1.HttpHeaders();
            this.authPostHeaders = this.authPostHeaders.set('Content-Type', 'application/json');
        }
    };
    AuthService.prototype.emitAuthStatus = function () {
        this.consoleService.auth("authService emitAuthStatus user=", this.user, "auth=", this.authenticated);
        this.loginChanged.emit({ authentificated: this.authenticated, isTourDone: this.isTourDone, user: this.user });
    };
    AuthService.prototype.logError = function (err) {
        console.error('There was an error: ' + err);
    };
    AuthService.prototype.doLogout = function () {
        this.authenticated = false;
        this.token = null;
        this.userId = null;
        this.user = null;
        localStorage.removeItem(this.localStorageKey);
        this.emitAuthStatus();
        console.log('Session has been cleared');
    };
    AuthService.prototype.loginWithFacebook = function (response, f) {
        var _this = this;
        console.log("loginWithFacebook", response);
        this.facebookAccessToken = response.authResponse.accessToken;
        this.facebookUserId = response.authResponse.userID;
        var url = "user/login/app/fb?token=" + this.facebookAccessToken + "&userId=" + this.facebookUserId + "&force=false";
        this.consoleService.auth("loginWithFacebook", url);
        this.apiService.noauthget(url, function (data) {
            console.log("Answ", data);
            if ("login" in data)
                data = data.login;
            console.log("Answ", data);
            if (data.success)
                _this.processLoginFB(data, f);
            else
                f(data);
        });
    };
    AuthService.prototype.linkWithFacebook = function (response, password, f) {
        var _this = this;
        console.log("linkWithFacebook", response);
        this.facebookAccessToken = response.authResponse.accessToken;
        this.facebookUserId = response.authResponse.userID;
        var url = "user/auth/app/fb/link"; //?p="+password+"&token=" + this.facebookAccessToken+ "&userId=" + this.facebookUserId+"&force=true";
        var data = { p: password, token: this.facebookAccessToken, userId: this.facebookUserId };
        this.consoleService.auth("fblogin", url);
        this.apiService.noauthrawpost(url, data, function (data) {
            console.log("linkWithFacebook answ", data);
            if ("login" in data)
                data = data.login;
            console.log("Answ", data);
            if (data.success)
                _this.processLoginFB(data, f);
            else
                f(data);
        });
    };
    AuthService.prototype.initFB = function () {
        //init facebook
        this.fb.init(this.FB_initParams).then(function (valeur) {
            console.log("[Facebook] init ok");
        }, function (raison) {
            console.log("[Facebook] init failed");
        });
        ;
    };
    __decorate([
        core_2.Output()
    ], AuthService.prototype, "loginChanged", void 0);
    __decorate([
        core_2.Output()
    ], AuthService.prototype, "loginHeaderChanged", void 0);
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
