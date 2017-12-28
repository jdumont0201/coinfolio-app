"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var ngx_facebook_1 = require("ngx-facebook");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/timeout");
var message_service_1 = require("./message.service");
//SERVICES
var currency_service_1 = require("../services/currency.service");
var console_service_1 = require("./console.service");
var request_service_1 = require("./request.service");
var config_service_1 = require("./config.service");
var api_service_1 = require("./api.service");
//import {TranslateService} from './translate.service';
var core_3 = require("@ngx-translate/core");
var http_1 = require("@angular/http");
var AuthService = (function () {
    function AuthService(http, messageService, fb, consoleService, translateService, currencyService, apiService, configService, requestService) {
        var _this = this;
        this.http = http;
        this.messageService = messageService;
        this.fb = fb;
        this.consoleService = consoleService;
        this.translateService = translateService;
        this.currencyService = currencyService;
        this.apiService = apiService;
        this.configService = configService;
        this.requestService = requestService;
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
            _this.apiService.ping(function () {
            });
        });
        this.initFB();
    }
    //WHEN CONFIG IS DONE
    AuthService.prototype.postConfigEvent = function (value) {
        console.log("auth.service postconfigevent", value);
        if (value.type == "general") {
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
            }
            this.isPostConfigured = true;
        }
    };
    AuthService.prototype.setLocalStorageKey = function () {
        var sitename = this.configService.sitename;
        var appname = this.configService.app;
        if (appname) {
            this.localStorageKey = sitename + "-" + appname + "-jwt";
        }
        else {
            console.error("Error no app name");
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
    };
    AuthService.prototype.postLogin = function () {
        console.log("postlogin", this.loginResponse);
        this.createAuthHeaders();
        this.authenticated = true;
        this.loadFromLoginResponse();
        console.log("postlogin userid=", this.userId, "authstatus=", this.authenticated);
        this.configService.setEntityPrefix("entity/" + this.entityId + "/");
        this.emitAuthStatus();
    };
    //LOGIN REQUEST TO SERVER
    AuthService.prototype.login = function (email, password, rememberme, f) {
        var _this = this;
        var storeUserId = this.configService.storeUserId;
        var appname = this.configService.app;
        var url = "user/login/" + appname + "?email=" + email + "&password=" + password + "&returnuoid=" + storeUserId;
        console.log(" > authService login", url);
        this.apiService.noauthget(url, function (data) {
            _this.processLoginFB(data, f);
        });
    };
    AuthService.prototype.loginFB = function (userid, token, f) {
        var _this = this;
        var storeUserId = this.configService.storeUserId;
        var appname = this.configService.app;
        var url = "loginfb/" + userid + "/" + token;
        this.apiService.noauthget(url, function (data) {
            _this.processLoginFB(data, f);
        });
    };
    AuthService.prototype.login2 = function (email, password, rememberme, f) {
        var _this = this;
        this.login(email, password, rememberme, function (data) {
            console.log("LoginForm data", data);
            if (data.code)
                if (data.code == "loginApp:getUserIdFromToken:find_error")
                    _this.messageService.addAlert("lines.loginfailed", true);
                else
                    _this.messageService.addError(data.desc, data.errordesc);
            else {
                if (!data.token) {
                    _this.messageService.addMessage("lines.nouserfound");
                    f();
                }
                else {
                    var token = data.token;
                    if (_this.configService.storeUserId) {
                        console.log("userid=", data.uoid);
                        _this.userId = data.uoid;
                    }
                    _this.token = token;
                    console.log(" > success redirect ready");
                    f();
                }
            }
        });
    };
    //obsolete?
    AuthService.prototype.checkAuthenticated = function (router, location) {
        console.warn("authservice PROM");
        return this.isAuthenticated();
    };
    AuthService.prototype.processError = function (err, f) {
        console.log("proceseerror");
        this.messageService.addError("AUTH", err);
        f({ error: true, desc: err, user: null });
    };
    AuthService.prototype.getToken = function () {
        return this.token;
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
        console.log("updateLocal bef", this.loginResponse);
        this.loginResponse.currency = this.currencyService.getUserCurrency();
        this.loginResponse.lang = this.translateService.currentLang;
        console.log("updateLocal aft", this.loginResponse);
        var localStorageLoginResponse = JSON.stringify(this.loginResponse);
        localStorage.setItem(this.localStorageKey, localStorageLoginResponse);
    };
    AuthService.prototype.processLogin = function (data, rememberme, f) {
        console.log(" > authService processLogin");
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
        console.log(" > authService processLoginFB", data);
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
        console.log(" > authService createAuthHeaders");
        this.authGetHeaders = new http_1.Headers();
        if (this.token) {
            this.authGetHeaders.append('Authorization', this.token);
        }
        else {
            console.warn(" > authService createAuthHeaders token not set");
        }
        this.authGetHeaders.append('Content-Type', 'application/json');
        this.authPostHeaders = this.authGetHeaders;
        //this.authPostHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    };
    AuthService.prototype.createNoAuthHeaders = function () {
        console.log(" > authService createNoAuthHeaders");
        this.noauthPostHeaders = new http_1.Headers();
        this.noauthPostHeaders.append('Content-Type', 'application/json');
        this.noauthGetHeaders = new http_1.Headers();
        this.noauthGetHeaders.append('Content-Type', 'application/json');
        if (!this.authGetHeaders) {
            this.authGetHeaders = new http_1.Headers();
            this.authGetHeaders.append('Content-Type', 'application/json');
        }
        if (!this.authPostHeaders) {
            this.authPostHeaders = new http_1.Headers();
            this.authPostHeaders.append('Content-Type', 'application/json');
        }
    };
    AuthService.prototype.emitAuthStatus = function () {
        console.log("authService emitAuthStatus user=", this.user, "auth=", this.authenticated);
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
        console.log(" > authService loginWithFacebook", url);
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
        console.log(" > authService fblogin", url);
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
    return AuthService;
}());
__decorate([
    core_2.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AuthService.prototype, "loginChanged", void 0);
__decorate([
    core_2.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AuthService.prototype, "loginHeaderChanged", void 0);
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        message_service_1.MessageService,
        ngx_facebook_1.FacebookService,
        console_service_1.ConsoleService,
        core_3.TranslateService,
        currency_service_1.CurrencyService, api_service_1.ApiService,
        config_service_1.ConfigService,
        request_service_1.RequestService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZFO0FBQzdFLHNDQUF3RDtBQUN4RCw2Q0FBMkQ7QUFFM0QsaUNBQStCO0FBQy9CLHVDQUFxQztBQUNyQyxxQ0FBbUM7QUFDbkMscURBQWlEO0FBSWpELFVBQVU7QUFDVixpRUFBNkQ7QUFDN0QscURBQWlEO0FBQ2pELHFEQUFpRDtBQUNqRCxtREFBK0M7QUFDL0MsNkNBQXlDO0FBQ3pDLHVEQUF1RDtBQUV2RCw0Q0FBcUQ7QUFDckQsc0NBQTRDO0FBSTVDLElBQWEsV0FBVztJQW9DcEIscUJBQW9CLElBQVUsRUFDWCxjQUE4QixFQUU3QixFQUFtQixFQUNuQixjQUE4QixFQUM5QixnQkFBa0MsRUFDbEMsZUFBZ0MsRUFBVSxVQUFzQixFQUNoRSxhQUE0QixFQUM1QixjQUE4QjtRQVJsRCxpQkFtQkM7UUFuQm1CLFNBQUksR0FBSixJQUFJLENBQU07UUFDWCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFN0IsT0FBRSxHQUFGLEVBQUUsQ0FBaUI7UUFDbkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNoRSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUEzQ3hDLGlCQUFZLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRXJELHVCQUFrQixHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQU1yRSxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFNbEMsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsZUFBVSxHQUFZLEtBQUssQ0FBQztRQVk1QixrQkFBYSxHQUFlO1lBQzVCLEtBQUssRUFBRSxpQkFBaUI7WUFDeEIsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsTUFBTTtTQUNsQixDQUFDO1FBYU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBM0IsQ0FBMkIsRUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDLEVBQTVDLENBQTRDLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQW5CLENBQW1CLENBQUMsQ0FBQztRQUN2SyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUU7WUFDakMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFFckIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQscUJBQXFCO0lBQ3JCLHFDQUFlLEdBQWYsVUFBZ0IsS0FBSztRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDLHdCQUF3QixDQUFDO1lBQy9ELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBRTFCLElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3JELEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQzdDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDckIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDakQsQ0FBQztZQUNELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDakMsQ0FBQztJQUVMLENBQUM7SUFFRCx3Q0FBa0IsR0FBbEI7UUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUMzQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDN0QsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1FBQ3RDLENBQUM7SUFDTCxDQUFDO0lBRUQscUNBQWUsR0FBZjtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUN0QixDQUFDO0lBRUQsK0JBQVMsR0FBVCxVQUFVLENBQVc7UUFDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsMkNBQXFCLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7SUFFNUMsQ0FBQztJQUVELCtCQUFTLEdBQVQ7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCx5QkFBeUI7SUFDekIsMkJBQUssR0FBTCxVQUFNLEtBQWEsRUFBRSxRQUFnQixFQUFFLFVBQW1CLEVBQUUsQ0FBQztRQUE3RCxpQkFVQztRQVRHLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO1FBQ2pELElBQUksT0FBTyxHQUFXLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO1FBQzdDLElBQUksR0FBRyxHQUFHLGFBQWEsR0FBRyxPQUFPLEdBQUcsU0FBUyxHQUFHLEtBQUssR0FBRyxZQUFZLEdBQUcsUUFBUSxHQUFHLGNBQWMsR0FBRyxXQUFXLENBQUM7UUFDL0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUV6QyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsVUFBQyxJQUFJO1lBQ2hDLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVELDZCQUFPLEdBQVAsVUFBUSxNQUFjLEVBQUUsS0FBYSxFQUFFLENBQUM7UUFBeEMsaUJBUUM7UUFQRyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztRQUNqRCxJQUFJLE9BQU8sR0FBVyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztRQUM3QyxJQUFJLEdBQUcsR0FBRyxVQUFVLEdBQUcsTUFBTSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLFVBQUMsSUFBSTtZQUNoQyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFFRCw0QkFBTSxHQUFOLFVBQU8sS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQztRQUFyQyxpQkEyQkM7UUExQkcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFDLElBQUk7WUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNWLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksd0NBQXdDLENBQUM7b0JBQ3RELEtBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM1RCxJQUFJO29CQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWpFLElBQUksQ0FBQyxDQUFDO2dCQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ2QsS0FBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDcEQsQ0FBQyxFQUFFLENBQUM7Z0JBQ1IsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUMvQixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDbEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUM1QixDQUFDO29CQUVELEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7b0JBQ3pDLENBQUMsRUFBRSxDQUFDO2dCQUNSLENBQUM7WUFDTCxDQUFDO1FBRUwsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUQsV0FBVztJQUNYLHdDQUFrQixHQUFsQixVQUFtQixNQUFXLEVBQUUsUUFBa0I7UUFDOUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFFbEMsQ0FBQztJQUVELGtDQUFZLEdBQVosVUFBYSxHQUFHLEVBQUUsQ0FBQztRQUVmLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsOEJBQVEsR0FBUjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxxQ0FBZSxHQUFmO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUVELDhDQUF3QixHQUF4QjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQzVFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBRXJCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFBO1lBRTVCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDYix5REFBeUQ7SUFDN0QsQ0FBQztJQUdELHdDQUFrQixHQUFsQjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDckUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztRQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuRCxJQUFJLHlCQUF5QixHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNFLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxrQ0FBWSxHQUFaLFVBQWEsSUFBSSxFQUFFLFVBQW1CLEVBQUUsQ0FBQztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDYixDQUFDLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7WUFDbEQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ2IsSUFBSSx5QkFBeUIsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDM0UsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLHlCQUF5QixDQUFDLENBQUM7Z0JBQzFFLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztZQUNqRCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRCxvQ0FBYyxHQUFkLFVBQWUsSUFBSSxFQUFFLENBQUM7UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUVsRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNiLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzFCLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztZQUNsRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRUosT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBRXhCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ1AsSUFBSSx5QkFBeUIsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDM0UsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLHlCQUF5QixDQUFDLENBQUM7Z0JBQzFFLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztZQUNqRCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRCx1Q0FBaUIsR0FBakI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixPQUFPLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMzQyxtRkFBbUY7SUFFdkYsQ0FBQztJQUVELHlDQUFtQixHQUFuQjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDakUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7SUFDTCxDQUFDO0lBRU8sb0NBQWMsR0FBdEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNoSCxDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLEdBQUc7UUFDUixPQUFPLENBQUMsS0FBSyxDQUFDLHNCQUFzQixHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSw4QkFBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBS0QsdUNBQWlCLEdBQWpCLFVBQWtCLFFBQVksRUFBRSxDQUFVO1FBQTFDLGlCQWlCQztRQWhCRyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxtQkFBbUIsR0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQztRQUMzRCxJQUFJLENBQUMsY0FBYyxHQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBRWpELElBQUksR0FBRyxHQUFHLDBCQUEwQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsR0FBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBQyxjQUFjLENBQUM7UUFDakgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsVUFBQyxJQUFJO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLEVBQUUsQ0FBQSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUM7Z0JBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJO2dCQUNBLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDRCxzQ0FBZ0IsR0FBaEIsVUFBaUIsUUFBWSxFQUFDLFFBQWUsRUFBRSxDQUFVO1FBQXpELGlCQWdCQztRQWZHLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLG1CQUFtQixHQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO1FBQzNELElBQUksQ0FBQyxjQUFjLEdBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDakQsSUFBSSxHQUFHLEdBQUcsdUJBQXVCLENBQUMsQ0FBQSxxR0FBcUc7UUFDdkksSUFBSSxJQUFJLEdBQUMsRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxjQUFjLEVBQUMsQ0FBQTtRQUMvRSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUMsVUFBQyxJQUFJO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUMsSUFBSSxDQUFDLENBQUE7WUFDekMsRUFBRSxDQUFBLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQztnQkFBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNaLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUk7Z0JBQ0EsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELDRCQUFNLEdBQU47UUFDSSxlQUFlO1FBQ2YsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFTLE1BQU07WUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsRUFBRSxVQUFTLE1BQU07WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFBQSxDQUFDO0lBQ1IsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQXRXRCxJQXNXQztBQXJXYTtJQUFULGFBQU0sRUFBRTs4QkFBZSxtQkFBWTtpREFBMkI7QUFFckQ7SUFBVCxhQUFNLEVBQUU7OEJBQXFCLG1CQUFZO3VEQUEyQjtBQUg1RCxXQUFXO0lBRHZCLGlCQUFVLEVBQUU7cUNBcUNpQixXQUFJO1FBQ0ssZ0NBQWM7UUFFekIsOEJBQWU7UUFDSCxnQ0FBYztRQUNaLHVCQUFnQjtRQUNqQixrQ0FBZSxFQUFzQix3QkFBVTtRQUNqRCw4QkFBYTtRQUNaLGdDQUFjO0dBNUN6QyxXQUFXLENBc1d2QjtBQXRXWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Zm9yd2FyZFJlZiwgSW5qZWN0YWJsZSwgUHJvdmlkZXIsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tcG9uZW50LCBPdXRwdXR9ICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZhY2Vib29rU2VydmljZSwgSW5pdFBhcmFtcyB9IGZyb20gJ25neC1mYWNlYm9vayc7XHJcblxyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90aW1lb3V0JztcclxuaW1wb3J0IHtNZXNzYWdlU2VydmljZX0gZnJvbSAnLi9tZXNzYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQge0luamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG4vL1NFUlZJQ0VTXHJcbmltcG9ydCB7Q3VycmVuY3lTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9jdXJyZW5jeS5zZXJ2aWNlJztcclxuaW1wb3J0IHtDb25zb2xlU2VydmljZX0gZnJvbSAnLi9jb25zb2xlLnNlcnZpY2UnO1xyXG5pbXBvcnQge1JlcXVlc3RTZXJ2aWNlfSBmcm9tICcuL3JlcXVlc3Quc2VydmljZSc7XHJcbmltcG9ydCB7Q29uZmlnU2VydmljZX0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7QXBpU2VydmljZX0gZnJvbSAnLi9hcGkuc2VydmljZSc7XHJcbi8vaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICcuL3RyYW5zbGF0ZS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7SHR0cCwgSGVhZGVyc30gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7T2JqZWN0SWR9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ludGVyZmFjZXNcIlxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xyXG4gICAgQE91dHB1dCgpIGxvZ2luQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIGxvZ2luSGVhZGVyQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBDT05URU5UX0FVVEhFTlRJRklDQVRJT046IGJvb2xlYW47XHJcblxyXG4gICAgYmFzZXVybDogc3RyaW5nO1xyXG5cclxuICAgIHVzZXJJZDogT2JqZWN0SWQ7XHJcbiAgICBpc1Bvc3RDb25maWd1cmVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBsb2dpblJlc3BvbnNlOiB7IHRva2VuOiBzdHJpbmcsIGxhbmc6IHN0cmluZywgY3VycmVuY3k6IHN0cmluZywgdGltZXpvbmU6IHN0cmluZywgY2FydElkOiBPYmplY3RJZCwgdXNlcjogYW55LCB1c2VySWQ6IE9iamVjdElkLCBlbnRpdHlJZDogT2JqZWN0SWQgfTtcclxuXHJcbiAgICB0b2tlbjogc3RyaW5nO1xyXG4gICAgZGF0YTogYW55O1xyXG4gICAgdXNlcjogYW55O1xyXG4gICAgYXV0aGVudGljYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgaXNUb3VyRG9uZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgdGltZXpvbmU6IHN0cmluZztcclxuICAgIGlvaWQ6IE9iamVjdElkO1xyXG5cclxuICAgIGVudGl0eUlkOiBPYmplY3RJZDtcclxuICAgIGNhcnRJZDogT2JqZWN0SWQ7XHJcblxyXG4gICAgYXV0aEdldEhlYWRlcnM6IEhlYWRlcnM7XHJcbiAgICBub2F1dGhHZXRIZWFkZXJzOiBIZWFkZXJzO1xyXG4gICAgYXV0aFBvc3RIZWFkZXJzOiBIZWFkZXJzO1xyXG4gICAgbm9hdXRoUG9zdEhlYWRlcnM6IEhlYWRlcnM7XHJcblxyXG4gICAgRkJfaW5pdFBhcmFtczogSW5pdFBhcmFtcyA9IHtcclxuICAgIGFwcElkOiAnMjc2NTE3OTE5NDg2NTIyJyxcclxuICAgIHhmYm1sOiB0cnVlLFxyXG4gICAgdmVyc2lvbjogJ3YyLjgnXHJcbn07XHJcblxyXG4gICAgbG9jYWxTdG9yYWdlS2V5OiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLFxyXG4gICAgICAgICAgICAgICAgcHVibGljIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGZiOiBGYWNlYm9va1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbnNvbGVTZXJ2aWNlOiBDb25zb2xlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgY3VycmVuY3lTZXJ2aWNlOiBDdXJyZW5jeVNlcnZpY2UsIHByaXZhdGUgYXBpU2VydmljZTogQXBpU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVxdWVzdFNlcnZpY2U6IFJlcXVlc3RTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5jb25zb2xlU2VydmljZS5zZXJ2KFwiKyBBdXRoU2VydmljZVwiKTtcclxuICAgICAgICB0aGlzLmJhc2V1cmwgPSB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0QXBpVXJsKCk7XHJcbiAgICAgICAgdGhpcy5jb25maWdTZXJ2aWNlLnBlclNpdGVDb25maWd1cmVkLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLnBvc3RDb25maWdFdmVudCh2YWx1ZSksIGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3IgcG9zdENvbmZpZ0V2ZW50XCIgKyBlcnJvciksICgpID0+IGNvbnNvbGUubG9nKCdkb25lJykpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTm9BdXRoSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMuYXBpU2VydmljZS5zZXRBdXRoU2VydmljZSh0aGlzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBpU2VydmljZS5waW5nKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaW5pdEZCKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9XSEVOIENPTkZJRyBJUyBET05FXHJcbiAgICBwb3N0Q29uZmlnRXZlbnQodmFsdWUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImF1dGguc2VydmljZSBwb3N0Y29uZmlnZXZlbnRcIiwgdmFsdWUpO1xyXG4gICAgICAgIGlmICh2YWx1ZS50eXBlID09IFwiZ2VuZXJhbFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ09OVEVOVF9BVVRIRU5USUZJQ0FUSU9OID0gdmFsdWUuQ09OVEVOVF9BVVRIRU5USUZJQ0FUSU9OO1xyXG4gICAgICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZUtleSgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGp3dCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMubG9jYWxTdG9yYWdlS2V5KTtcclxuICAgICAgICAgICAgaWYgKGp3dCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25zb2xlU2VydmljZS5sb2coXCJoYXMgbG9jYWwgc3RvcmFnZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VG9rZW5Gcm9tTG9jYWxTdG9yYWdlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RMb2dpbigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25zb2xlU2VydmljZS5hdXRoKFwiTm8gTG9jYWwgU3RvcmFnZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzUG9zdENvbmZpZ3VyZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0TG9jYWxTdG9yYWdlS2V5KCkge1xyXG4gICAgICAgIGxldCBzaXRlbmFtZSA9IHRoaXMuY29uZmlnU2VydmljZS5zaXRlbmFtZTtcclxuICAgICAgICBsZXQgYXBwbmFtZSA9IHRoaXMuY29uZmlnU2VydmljZS5hcHA7XHJcbiAgICAgICAgaWYgKGFwcG5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VLZXkgPSBzaXRlbmFtZSArIFwiLVwiICsgYXBwbmFtZSArIFwiLWp3dFwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBubyBhcHAgbmFtZVwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRTdG9yZWRVc2VySWQoKTogT2JqZWN0SWQge1xyXG4gICAgICAgIGlmICghdGhpcy51c2VySWQpIGNvbnNvbGUuZXJyb3IoXCJTdG9yZWQgdXNlcmlkIHVuZGVmaW5lZFwiKTtcclxuICAgICAgICByZXR1cm4gdGhpcy51c2VySWRcclxuICAgIH1cclxuXHJcbiAgICBnZXRVc2VySWQoZjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBmKHRoaXMudXNlcklkKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkRnJvbUxvZ2luUmVzcG9uc2UoKSB7XHJcbiAgICAgICAgdGhpcy50aW1lem9uZSA9IHRoaXMubG9naW5SZXNwb25zZS50aW1lem9uZTtcclxuICAgICAgICB0aGlzLmN1cnJlbmN5U2VydmljZS5zZXRDdXJyZW5jeSh0aGlzLmxvZ2luUmVzcG9uc2UuY3VycmVuY3kpO1xyXG4gICAgICAgIHRoaXMudHJhbnNsYXRlU2VydmljZS51c2UodGhpcy5sb2dpblJlc3BvbnNlLmxhbmcpO1xyXG4gICAgICAgIHRoaXMudXNlciA9IHRoaXMubG9naW5SZXNwb25zZS51c2VyO1xyXG4gICAgICAgIHRoaXMudXNlcklkID0gdGhpcy5sb2dpblJlc3BvbnNlLnVzZXJJZDtcclxuICAgICAgICB0aGlzLmVudGl0eUlkID0gdGhpcy5sb2dpblJlc3BvbnNlLmVudGl0eUlkO1xyXG4gICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLmxvZ2luUmVzcG9uc2UudG9rZW47XHJcbiAgICAgICAgdGhpcy5jYXJ0SWQgPSB0aGlzLmxvZ2luUmVzcG9uc2UuY2FydElkO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwb3N0TG9naW4oKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJwb3N0bG9naW5cIiwgdGhpcy5sb2dpblJlc3BvbnNlKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUF1dGhIZWFkZXJzKCk7XHJcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxvYWRGcm9tTG9naW5SZXNwb25zZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicG9zdGxvZ2luIHVzZXJpZD1cIiwgdGhpcy51c2VySWQsIFwiYXV0aHN0YXR1cz1cIix0aGlzLmF1dGhlbnRpY2F0ZWQpO1xyXG4gICAgICAgIHRoaXMuY29uZmlnU2VydmljZS5zZXRFbnRpdHlQcmVmaXgoXCJlbnRpdHkvXCIgKyB0aGlzLmVudGl0eUlkICsgXCIvXCIpO1xyXG4gICAgICAgIHRoaXMuZW1pdEF1dGhTdGF0dXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL0xPR0lOIFJFUVVFU1QgVE8gU0VSVkVSXHJcbiAgICBsb2dpbihlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCByZW1lbWJlcm1lOiBib29sZWFuLCBmKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHN0b3JlVXNlcklkID0gdGhpcy5jb25maWdTZXJ2aWNlLnN0b3JlVXNlcklkO1xyXG4gICAgICAgIGxldCBhcHBuYW1lOiBzdHJpbmcgPSB0aGlzLmNvbmZpZ1NlcnZpY2UuYXBwO1xyXG4gICAgICAgIGxldCB1cmwgPSBcInVzZXIvbG9naW4vXCIgKyBhcHBuYW1lICsgXCI/ZW1haWw9XCIgKyBlbWFpbCArIFwiJnBhc3N3b3JkPVwiICsgcGFzc3dvcmQgKyBcIiZyZXR1cm51b2lkPVwiICsgc3RvcmVVc2VySWQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIgPiBhdXRoU2VydmljZSBsb2dpblwiLCB1cmwpO1xyXG5cclxuICAgICAgICB0aGlzLmFwaVNlcnZpY2Uubm9hdXRoZ2V0KHVybCwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzTG9naW5GQihkYXRhLCBmKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBsb2dpbkZCKHVzZXJpZDogc3RyaW5nLCB0b2tlbjogc3RyaW5nLCBmKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHN0b3JlVXNlcklkID0gdGhpcy5jb25maWdTZXJ2aWNlLnN0b3JlVXNlcklkO1xyXG4gICAgICAgIGxldCBhcHBuYW1lOiBzdHJpbmcgPSB0aGlzLmNvbmZpZ1NlcnZpY2UuYXBwO1xyXG4gICAgICAgIGxldCB1cmwgPSBcImxvZ2luZmIvXCIgKyB1c2VyaWQgKyBcIi9cIiArIHRva2VuO1xyXG4gICAgICAgIHRoaXMuYXBpU2VydmljZS5ub2F1dGhnZXQodXJsLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NMb2dpbkZCKGRhdGEsIGYpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxvZ2luMihlbWFpbCwgcGFzc3dvcmQsIHJlbWVtYmVybWUsIGYpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxvZ2luKGVtYWlsLCBwYXNzd29yZCwgcmVtZW1iZXJtZSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dpbkZvcm0gZGF0YVwiLCBkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuY29kZSlcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmNvZGUgPT0gXCJsb2dpbkFwcDpnZXRVc2VySWRGcm9tVG9rZW46ZmluZF9lcnJvclwiKS8vYXBpIHNlbmQgYW4gZXJyb3Igd2hlbiB1c2VyIG5vdCBmb3VuZCAsIG92ZXJyaWRlIGVycm9yIC0+IHdhcm5pbmdcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmFkZEFsZXJ0KFwibGluZXMubG9naW5mYWlsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMubWVzc2FnZVNlcnZpY2UuYWRkRXJyb3IoZGF0YS5kZXNjLCBkYXRhLmVycm9yZGVzYyk7XHJcblxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghZGF0YS50b2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuYWRkTWVzc2FnZShcImxpbmVzLm5vdXNlcmZvdW5kXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGYoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRva2VuOiBzdHJpbmcgPSBkYXRhLnRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZ1NlcnZpY2Uuc3RvcmVVc2VySWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyaWQ9XCIsIGRhdGEudW9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlcklkID0gZGF0YS51b2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiID4gc3VjY2VzcyByZWRpcmVjdCByZWFkeVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBmKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vb2Jzb2xldGU/XHJcbiAgICBjaGVja0F1dGhlbnRpY2F0ZWQocm91dGVyOiBhbnksIGxvY2F0aW9uOiBMb2NhdGlvbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcImF1dGhzZXJ2aWNlIFBST01cIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NFcnJvcihlcnIsIGYpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJwcm9jZXNlZXJyb3JcIik7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5hZGRFcnJvcihcIkFVVEhcIiwgZXJyKTtcclxuICAgICAgICBmKHtlcnJvcjogdHJ1ZSwgZGVzYzogZXJyLCB1c2VyOiBudWxsfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG9rZW4oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcclxuICAgIH1cclxuXHJcbiAgICBpc0F1dGhlbnRpY2F0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aGVudGljYXRlZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUb2tlbkZyb21Mb2NhbFN0b3JhZ2UoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy5sb2dpblJlc3BvbnNlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmxvY2FsU3RvcmFnZUtleSkpO1xyXG4gICAgICAgIGlmICh0aGlzLmxvZ2luUmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9naW5SZXNwb25zZUZyb21Mb2NhbHN0b3JhZ2VcIiwgdGhpcy5sb2dpblJlc3BvbnNlKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRnJvbUxvZ2luUmVzcG9uc2UoKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvL3RoaXMuZGVjb2RlZEp3dCA9IHRoaXMudG9rZW4gJiYgand0X2RlY29kZSh0aGlzLnRva2VuKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdXBkYXRlTG9jYWxTdG9yYWdlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidXBkYXRlTG9jYWwgYmVmXCIsIHRoaXMubG9naW5SZXNwb25zZSk7XHJcbiAgICAgICAgdGhpcy5sb2dpblJlc3BvbnNlLmN1cnJlbmN5ID0gdGhpcy5jdXJyZW5jeVNlcnZpY2UuZ2V0VXNlckN1cnJlbmN5KCk7XHJcbiAgICAgICAgdGhpcy5sb2dpblJlc3BvbnNlLmxhbmcgPSB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuY3VycmVudExhbmc7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGVMb2NhbCBhZnRcIiwgdGhpcy5sb2dpblJlc3BvbnNlKTtcclxuICAgICAgICBsZXQgbG9jYWxTdG9yYWdlTG9naW5SZXNwb25zZTogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodGhpcy5sb2dpblJlc3BvbnNlKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmxvY2FsU3RvcmFnZUtleSwgbG9jYWxTdG9yYWdlTG9naW5SZXNwb25zZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc0xvZ2luKGRhdGEsIHJlbWVtYmVybWU6IGJvb2xlYW4sIGYpOiBhbnkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiID4gYXV0aFNlcnZpY2UgcHJvY2Vzc0xvZ2luXCIpO1xyXG4gICAgICAgIGlmIChkYXRhLmVycm9yKSB7XHJcbiAgICAgICAgICAgIGYoe2Vycm9yOiBkYXRhLmVycm9yLCBlcnJvcmRlc2M6IGRhdGEuZXJyb3JkZXNjLCB1c2VyOiBudWxsfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGYoe2Vycm9yOiBmYWxzZSwgc3VjY2VzczogZmFsc2UsIHVzZXI6IGRhdGF9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9naW46bG9nZ2VkOnJlc3BvbnNlXCIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpblJlc3BvbnNlID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSBkYXRhLnRva2VuO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlbWVtYmVybWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxTdG9yYWdlTG9naW5SZXNwb25zZTogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodGhpcy5sb2dpblJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmxvY2FsU3RvcmFnZUtleSwgbG9jYWxTdG9yYWdlTG9naW5SZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVG91ckRvbmUgPSBkYXRhLmlzdG91cmRvbmU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RMb2dpbigpO1xyXG4gICAgICAgICAgICAgICAgZih7ZXJyb3I6IGZhbHNlLCBzdWNjZXNzOiB0cnVlLCB1c2VyOiBkYXRhfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc0xvZ2luRkIoZGF0YSwgZik6IGFueSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIgPiBhdXRoU2VydmljZSBwcm9jZXNzTG9naW5GQlwiLGRhdGEpO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5lcnJvcikge1xyXG4gICAgICAgICAgICBmKHtlcnJvcjogZGF0YS5lcnJvciwgZXJyb3JkZXNjOiBkYXRhLmVycm9yZGVzYywgdXNlcjogbnVsbH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vIHN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICBmKHtlcnJvcjogZmFsc2UsIHN1Y2Nlc3M6IGZhbHNlLCB1c2VyOiBkYXRhfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2dpbjpsb2dnZWQ6cmVzcG9uc2VcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2luUmVzcG9uc2UgPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0gZGF0YS50b2tlbjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHJ1ZSkgeyAvL3JlbWVtYmVybWVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxTdG9yYWdlTG9naW5SZXNwb25zZTogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodGhpcy5sb2dpblJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmxvY2FsU3RvcmFnZUtleSwgbG9jYWxTdG9yYWdlTG9naW5SZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVG91ckRvbmUgPSBkYXRhLmlzdG91cmRvbmU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RMb2dpbigpO1xyXG4gICAgICAgICAgICAgICAgZih7ZXJyb3I6IGZhbHNlLCBzdWNjZXNzOiB0cnVlLCB1c2VyOiBkYXRhfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQXV0aEhlYWRlcnMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIgPiBhdXRoU2VydmljZSBjcmVhdGVBdXRoSGVhZGVyc1wiKTtcclxuICAgICAgICB0aGlzLmF1dGhHZXRIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICBpZiAodGhpcy50b2tlbikge1xyXG4gICAgICAgICAgICB0aGlzLmF1dGhHZXRIZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIHRoaXMudG9rZW4pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIiA+IGF1dGhTZXJ2aWNlIGNyZWF0ZUF1dGhIZWFkZXJzIHRva2VuIG5vdCBzZXRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYXV0aEdldEhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgICAgIHRoaXMuYXV0aFBvc3RIZWFkZXJzID0gdGhpcy5hdXRoR2V0SGVhZGVycztcclxuICAgICAgICAvL3RoaXMuYXV0aFBvc3RIZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVOb0F1dGhIZWFkZXJzKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiID4gYXV0aFNlcnZpY2UgY3JlYXRlTm9BdXRoSGVhZGVyc1wiKTtcclxuICAgICAgICB0aGlzLm5vYXV0aFBvc3RIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICB0aGlzLm5vYXV0aFBvc3RIZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgICAgICB0aGlzLm5vYXV0aEdldEhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIHRoaXMubm9hdXRoR2V0SGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICAgICAgaWYgKCF0aGlzLmF1dGhHZXRIZWFkZXJzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aEdldEhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgICAgICB0aGlzLmF1dGhHZXRIZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmF1dGhQb3N0SGVhZGVycykge1xyXG4gICAgICAgICAgICB0aGlzLmF1dGhQb3N0SGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aFBvc3RIZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlbWl0QXV0aFN0YXR1cygpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImF1dGhTZXJ2aWNlIGVtaXRBdXRoU3RhdHVzIHVzZXI9XCIsIHRoaXMudXNlciwgXCJhdXRoPVwiLHRoaXMuYXV0aGVudGljYXRlZCk7XHJcbiAgICAgICAgdGhpcy5sb2dpbkNoYW5nZWQuZW1pdCh7YXV0aGVudGlmaWNhdGVkOiB0aGlzLmF1dGhlbnRpY2F0ZWQsIGlzVG91ckRvbmU6IHRoaXMuaXNUb3VyRG9uZSwgdXNlcjogdGhpcy51c2VyfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nRXJyb3IoZXJyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignVGhlcmUgd2FzIGFuIGVycm9yOiAnICsgZXJyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZG9Mb2dvdXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50b2tlbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy51c2VySWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudXNlciA9IG51bGw7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5sb2NhbFN0b3JhZ2VLZXkpO1xyXG4gICAgICAgIHRoaXMuZW1pdEF1dGhTdGF0dXMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnU2Vzc2lvbiBoYXMgYmVlbiBjbGVhcmVkJyk7XHJcbiAgICB9XHJcbiAgICBmYWNlYm9va0FjY2Vzc1Rva2VuOmFueTtcclxuICAgIGZhY2Vib29rVXNlcklkOmFueVxyXG4gICAgO1xyXG5cclxuICAgIGxvZ2luV2l0aEZhY2Vib29rKHJlc3BvbnNlOmFueSwgZjpGdW5jdGlvbil7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2dpbldpdGhGYWNlYm9va1wiLHJlc3BvbnNlKTtcclxuICAgICAgICB0aGlzLmZhY2Vib29rQWNjZXNzVG9rZW49cmVzcG9uc2UuYXV0aFJlc3BvbnNlLmFjY2Vzc1Rva2VuO1xyXG4gICAgICAgIHRoaXMuZmFjZWJvb2tVc2VySWQ9cmVzcG9uc2UuYXV0aFJlc3BvbnNlLnVzZXJJRDtcclxuXHJcbiAgICAgICAgbGV0IHVybCA9IFwidXNlci9sb2dpbi9hcHAvZmI/dG9rZW49XCIgKyB0aGlzLmZhY2Vib29rQWNjZXNzVG9rZW4rIFwiJnVzZXJJZD1cIiArIHRoaXMuZmFjZWJvb2tVc2VySWQrXCImZm9yY2U9ZmFsc2VcIjtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIiA+IGF1dGhTZXJ2aWNlIGxvZ2luV2l0aEZhY2Vib29rXCIsIHVybCk7XHJcbiAgICAgICAgdGhpcy5hcGlTZXJ2aWNlLm5vYXV0aGdldCh1cmwsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQW5zd1wiLGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYoXCJsb2dpblwiIGluIGRhdGEpIGRhdGE9ZGF0YS5sb2dpbjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBbnN3XCIsZGF0YSk7XHJcbiAgICAgICAgICAgIGlmKGRhdGEuc3VjY2VzcylcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0xvZ2luRkIoZGF0YSwgZik7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGYoZGF0YSk7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBsaW5rV2l0aEZhY2Vib29rKHJlc3BvbnNlOmFueSxwYXNzd29yZDpzdHJpbmcsIGY6RnVuY3Rpb24pe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibGlua1dpdGhGYWNlYm9va1wiLHJlc3BvbnNlKTtcclxuICAgICAgICB0aGlzLmZhY2Vib29rQWNjZXNzVG9rZW49cmVzcG9uc2UuYXV0aFJlc3BvbnNlLmFjY2Vzc1Rva2VuO1xyXG4gICAgICAgIHRoaXMuZmFjZWJvb2tVc2VySWQ9cmVzcG9uc2UuYXV0aFJlc3BvbnNlLnVzZXJJRDtcclxuICAgICAgICBsZXQgdXJsID0gXCJ1c2VyL2F1dGgvYXBwL2ZiL2xpbmtcIjsvLz9wPVwiK3Bhc3N3b3JkK1wiJnRva2VuPVwiICsgdGhpcy5mYWNlYm9va0FjY2Vzc1Rva2VuKyBcIiZ1c2VySWQ9XCIgKyB0aGlzLmZhY2Vib29rVXNlcklkK1wiJmZvcmNlPXRydWVcIjtcclxuICAgICAgICBsZXQgZGF0YT17cDpwYXNzd29yZCx0b2tlbjp0aGlzLmZhY2Vib29rQWNjZXNzVG9rZW4sdXNlcklkOnRoaXMuZmFjZWJvb2tVc2VySWR9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIgPiBhdXRoU2VydmljZSBmYmxvZ2luXCIsIHVybCk7XHJcbiAgICAgICAgdGhpcy5hcGlTZXJ2aWNlLm5vYXV0aHJhd3Bvc3QodXJsLCBkYXRhLChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGlua1dpdGhGYWNlYm9vayBhbnN3XCIsZGF0YSlcclxuICAgICAgICAgICAgaWYoXCJsb2dpblwiIGluIGRhdGEpIGRhdGE9ZGF0YS5sb2dpbjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBbnN3XCIsZGF0YSk7XHJcbiAgICAgICAgICAgIGlmKGRhdGEuc3VjY2VzcylcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0xvZ2luRkIoZGF0YSwgZik7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGYoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpbml0RkIoKXtcclxuICAgICAgICAvL2luaXQgZmFjZWJvb2tcclxuICAgICAgICB0aGlzLmZiLmluaXQodGhpcy5GQl9pbml0UGFyYW1zKS50aGVuKGZ1bmN0aW9uKHZhbGV1cikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIltGYWNlYm9va10gaW5pdCBva1wiKTtcclxuICAgICAgICB9LCBmdW5jdGlvbihyYWlzb24pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJbRmFjZWJvb2tdIGluaXQgZmFpbGVkXCIpO1xyXG4gICAgICAgIH0pOztcclxuICAgIH1cclxufVxyXG4iXX0=