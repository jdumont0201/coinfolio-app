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
var http_1 = require("@angular/common/http");
var console_service_1 = require("./console.service");
var message_service_1 = require("./message.service");
var RequestService = (function () {
    function RequestService(http, consoleService, messageService) {
        this.http = http;
        this.consoleService = consoleService;
        this.messageService = messageService;
        consoleService.serv("+ RequestService");
    }
    RequestService.prototype.error = function (f, err, desc) {
        console.error('REQUEST ERR', err);
        this.messageService.addError("REQUEST_GET", err, desc);
        f({ error: true });
    };
    RequestService.prototype.success = function (f, data) {
        f({ error: false, file: data });
    };
    RequestService.prototype.getWithHeaders = function (url, headers, f) {
        var _this = this;
        console.log("RequestService get", url, headers);
        this.consoleService.get("RequestService Getting", url);
        this.http.get(url, { headers: headers })
            .subscribe(function (data) { return _this.success(f, data); }, function (err) { return _this.error(f, err, "Error downloading " + url); }, 
        // err => this.error(err),
        function () { return console.log('Done getting.', url); });
    };
    RequestService.prototype.post = function (url, obj, headers, f) {
        var _this = this;
        this.http.post(url, obj, { headers: headers })
            .subscribe(function (data) { return _this.success(f, data); }, function (err) { return _this.error(f, err, "Error downloading " + url); }, 
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
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            console_service_1.ConsoleService,
            message_service_1.MessageService])
    ], RequestService);
    return RequestService;
}());
exports.RequestService = RequestService;
//# sourceMappingURL=request.service.js.map