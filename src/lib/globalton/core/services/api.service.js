"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var message_service_1 = require("./message.service");
var console_service_1 = require("./console.service");
var config_service_1 = require("./config.service");
//import {ToastController} from 'ionic-angular';
require("rxjs/add/operator/map");
require("rxjs/add/operator/timeout");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/retry");
require("rxjs/Rx");
var http_1 = require("@angular/common/http");
var ApiService = (function () {
    function ApiService(http, messageService, consoleService, configService) {
        this.http = http;
        this.messageService = messageService;
        this.consoleService = consoleService;
        this.configService = configService;
        this.errorsChanged = new core_1.EventEmitter();
        this.pingOnError = false;
        this.isUp = false;
        this.waitLine = [];
        this.consoleService.serv("+ ApiService");
        this.timeout = configService.API_TIMEOUT;
        this.retry = configService.API_NB_RETRY;
        this.baseurl = this.configService.apiURL;
        this.ping(function () {
        });
    }
    ApiService.prototype.setApiUrl = function (v) {
        this.baseurl = v;
    };
    ApiService.prototype.setServerUrl = function (v) {
        this.serverurl = v;
    };
    ApiService.prototype.setAuthService = function (authService, f) {
        this.authService = authService;
        f();
    };
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
    ApiService.prototype.processError = function (errorCode, err) {
        this.messageService.hideLoading();
        this.messageService.hideSaving();
        console.error(errorCode, err);
        var desc;
        if (!err) {
            this.messageService.addError("API_ERROR", null, "No error desc available");
            return;
        }
        if (err.name === "TimeoutError") {
            this.messageService.addError("API_DOWN", null, "API is unreachable.");
        }
        else if (err.message === "Unauthorized") {
            this.messageService.addError("API_UNAUTHORIZED", null, "You don't have access to this ressource.");
        }
        else {
            console.log("other error", errorCode, err);
            if (err && err._body && typeof err._body === "string") {
                try {
                    var parsed = JSON.parse(err._body);
                    if (parsed.errordesc)
                        desc = parsed.errordesc;
                    else if (parsed.message)
                        desc = parsed.message;
                    console.log("other error");
                    this.messageService.readError(parsed.error);
                }
                catch (e) {
                    desc = err._body;
                    console.log("not parsed");
                    this.messageService.addError(err.url, parsed.error, "Unparsable error");
                }
            }
            this.messageService.addError(errorCode, "", "");
            /*          let toast = this.toastCtrl.create({
                          message: errorCode + " " + err + " " + (desc ? desc.toString() : ""),
                          cssClass: "red",
                          dismissOnPageChange: true, showCloseButton: true,
                          position: 'bottom'
                      });
                      toast.present();
          */
        }
    };
    ApiService.prototype.processData = function (url, data, f) {
        this.messageService.hideLoading();
        this.messageService.hideSaving();
        console.log("[API] processData", url, data);
        if (data.error) {
            this.processError("API_PROCESS", data.errordesc);
        }
        else {
            f(data);
        }
    };
    ApiService.prototype.pingResult = function (isUp, f) {
        var diff = new Date().getTime() - this.timer;
        this.isUp = isUp;
        this.messageService.hideLoading();
        this.messageService.hideSaving();
        if (isUp) {
            console.log("PING Server up ", diff, "ms");
            clearInterval(this.pingInterval);
            this.processWaitLine();
        }
        else {
            console.error("PING Server down", diff, "ms");
        }
        f(isUp);
    };
    ApiService.prototype.processWaitLine = function () {
        console.log("waitline", this.waitLine);
        for (var i = 0; i < this.waitLine.length; ++i) {
            var w = this.waitLine[i];
            if (w.type === "get")
                this.get(w.url, w.headers, w.func);
        }
    };
    ApiService.prototype.handlePingError = function (error) {
        var _this = this;
        console.error('An error occurred', error, this);
        if (!this.pingInterval)
            this.pingInterval = window.setInterval(function () {
                _this.ping(function () { });
            }, 3000);
        //return Promise.reject(error.message || error);
    };
    ApiService.prototype.ping = function (f) {
        var _this = this;
        var fullurl = this.serverurl + "ping";
        console.log("PING", fullurl);
        this.timer = new Date().getTime();
        //const h: HttpHeaders = this.authService.noauthGetHeaders;
        this.http.get(fullurl)
            .toPromise()
            .then(function (res) { return _this.pingResult(true, f); })
            .catch(this.handlePingError.bind(this));
        ;
    };
    ApiService.prototype.authget = function (url, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.authGetHeaders;
        this.get(fullurl, h, f);
    };
    ApiService.prototype.noauthget = function (url, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.noauthGetHeaders;
        this.get(fullurl, h, f);
    };
    ApiService.prototype.authput = function (url, model, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.authPostHeaders;
        var ser = typeof model == "object" ? JSON.stringify(model) : model.serialize();
        this.put(fullurl, ser, h, f);
    };
    ApiService.prototype.authpatch = function (url, model, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.authPostHeaders;
        var ser = typeof model == "object" ? JSON.stringify(model) : model.serialize();
        this.patch(fullurl, model, h, f);
    };
    ApiService.prototype.authpost = function (url, model, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.authPostHeaders;
        var ser = typeof model == "object" ? JSON.stringify(model) : model.serialize();
        this.post(fullurl, ser, h, f);
    };
    ApiService.prototype.authrawpost = function (url, raw, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.authPostHeaders;
        var ser = JSON.stringify(raw);
        this.post(fullurl, ser, h, f);
    };
    ApiService.prototype.noauthpost = function (url, model, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.noauthPostHeaders;
        var ser = typeof model == "object" ? JSON.stringify(model) : model.serialize();
        this.post(fullurl, ser, h, f);
    };
    ApiService.prototype.noauthrawpost = function (url, raw, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.noauthPostHeaders;
        var ser = JSON.stringify(raw);
        this.post(fullurl, ser, h, f);
    };
    ApiService.prototype.authdelete = function (url, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.authPostHeaders;
        this.delete(fullurl, h, f);
    };
    ApiService.prototype.post = function (url, raw, headers, f) {
        var _this = this;
        this.consoleService.post("Posting", url, "seralized", raw, "headers", headers);
        this.messageService.showSaving();
        this.http.post(url, raw, { headers: headers })
            .timeout(this.timeout)
            .retry(this.retry)
            .subscribe(function (data) { return _this.processData(url, data, f); }, function (err) { return _this.processError("API_POST", err); }, 
        // err => this.error(err),
        function () { return console.log('Done posting.'); });
    };
    ApiService.prototype.delete = function (url, headers, f) {
        var _this = this;
        this.consoleService.delete("Deleting", url);
        this.messageService.showSaving();
        this.http.delete(url, { headers: headers })
            .timeout(this.timeout)
            .retry(this.retry)
            .subscribe(function (data) { return _this.processData(url, data, f); }, function (err) { return _this.processError("API_DELETE", err); }, 
        // err => this.error(err),
        function () { return console.log('Done deleting.'); });
    };
    ApiService.prototype.put = function (url, ser, headers, f) {
        var _this = this;
        this.consoleService.put("Putting", url, "obj", ser, "serialized", ser);
        this.messageService.showSaving();
        this.http.put(url, ser, { headers: headers })
            .timeout(this.timeout)
            .retry(this.retry)
            .subscribe(function (data) { return _this.processData(url, data, f); }, function (err) { return _this.processError("API_PUT", err); }, 
        // err => this.error(err),
        function () { return console.log('Done putting.'); });
    };
    ApiService.prototype.patch = function (url, ser, headers, f) {
        var _this = this;
        this.consoleService.patch("Patching", url, "obj", ser, "serialized", ser);
        this.messageService.showSaving();
        this.http.patch(url, ser, { headers: headers })
            .timeout(this.timeout)
            .retry(this.retry)
            .subscribe(function (data) { return _this.processData(url, data, f); }, function (err) { return _this.processError("API_PATCH", err); }, 
        // err => this.error(err),
        function () { return console.log('Done patching.'); });
    };
    ApiService.prototype.get = function (url, headers, f) {
        var _this = this;
        if (!this.isUp) {
            this.waitLine.push({ type: "get", url: url, headers: headers, func: f });
            return;
        }
        this.timer = new Date().getTime();
        this.consoleService.get("ApiService Get", url, headers);
        this.messageService.showLoading();
        this.http.get(url, { headers: headers })
            .timeout(this.timeout)
            .retry(this.retry)
            .subscribe(function (data) { return _this.processData(url, data, f); }, function (err) { return _this.processError("API_GET", err); }, 
        // err => this.error(err),
        function () { return console.log('Done.'); });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ApiService.prototype, "errorsChanged", void 0);
    ApiService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            message_service_1.MessageService,
            console_service_1.ConsoleService,
            config_service_1.ConfigService])
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map