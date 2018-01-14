"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var RequestService = (function () {
    function RequestService(http, consoleService, proxyService, messageService) {
        this.http = http;
        this.consoleService = consoleService;
        this.proxyService = proxyService;
        this.messageService = messageService;
        consoleService.serv("+ RequestService");
    }
    RequestService.prototype.error = function (f, err, desc, reqId) {
        console.error('REQUEST ERR', err);
        this.proxyService.completeRequestErrorResult(reqId);
        this.messageService.addError("REQUEST_GET", err, desc);
        f({ error: true });
    };
    RequestService.prototype.success = function (f, data, reqId) {
        this.proxyService.completeRequestSuccessResult(reqId);
        f({ error: false, file: data });
    };
    RequestService.prototype.getWithHeaders = function (url, headers, f) {
        var _this = this;
        console.log("RequestService get", url, headers);
        this.consoleService.get("RequestService Getting", url);
        var reqId = this.proxyService.addNewExternalRequest(url, "GET");
        this.http.get(url, { headers: headers })
            .subscribe(function (data) { return _this.success(f, data, reqId); }, function (err) { return _this.error(f, err, "Error downloading " + url, reqId); }, 
        // err => this.error(err),
        function () { return console.log('Done getting.', url); });
    };
    RequestService.prototype.post = function (url, obj, headers, f) {
        var _this = this;
        var reqId = this.proxyService.addNewExternalRequest(url, "POST");
        this.http.post(url, obj, { headers: headers })
            .subscribe(function (data) { return _this.success(f, data, reqId); }, function (err) { return _this.error(f, err, "Error downloading " + url, reqId); }, 
        // err => this.error(err),
        function () { return console.log('Done post.', url); });
    };
    RequestService.prototype.get = function (url, f, context) {
        this.getWithHeaders(url, new http_1.HttpHeaders(), f.bind(context));
    };
    RequestService.prototype.getJSON = function (url, f, context) {
        var h = new http_1.HttpHeaders();
        h.append("Content-Type", "application/json; charset=UTF-8");
        this.getWithHeaders(url, h, f.bind(context));
    };
    RequestService = __decorate([
        core_1.Injectable()
    ], RequestService);
    return RequestService;
}());
exports.RequestService = RequestService;
