"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Request = (function () {
    function Request(id, type, url, tag) {
        this.id = id;
        this.type = type;
        this.url = url;
        this.tag = tag;
        this.starttime = new Date().getTime();
        this.status = "INIT";
    }
    Request.prototype.complete = function (status) {
        this.status = status;
        this.endtime = new Date().getTime();
        this.time = this.endtime - this.starttime;
    };
    return Request;
}());
exports.Request = Request;
var ProxyService = (function () {
    function ProxyService() {
        this.requests = [];
    }
    ProxyService.prototype.addNewRequest = function (url, type) {
        var id = this.requests.push(new Request(this.getNewId(), type, url, null));
    };
    ProxyService.prototype.addNewExternalRequest = function (url, type) {
        var id = this.getNewId();
        this.requests.push(new Request(id, type, url, "external"));
        return id;
    };
    ProxyService.prototype.addNewInternalRequest = function (url, type) {
        var id = this.getNewId();
        this.requests.push(new Request(id, type, url, "internal"));
        return id;
    };
    ProxyService.prototype.addNewDBRequest = function (url, type) {
        var id = this.getNewId();
        this.requests.push(new Request(id, type, url, "db"));
        return id;
    };
    ProxyService.prototype.getNewId = function () {
        return this.requests.length;
    };
    ProxyService.prototype.completeRequestSuccessResult = function (id) {
        console.log(id, this.requests);
        if (id)
            this.getRequest(id).complete("SUCCESS");
    };
    ProxyService.prototype.completeRequestErrorResult = function (id) {
        if (id)
            this.getRequest(id).complete("ERROR_RESULT");
    };
    ProxyService.prototype.completeRequestError = function (id) {
        if (id)
            this.getRequest(id).complete("ERRORED");
    };
    ProxyService.prototype.getRequest = function (id) {
        if (id)
            return this.requests[id];
    };
    ProxyService = __decorate([
        core_1.Injectable()
    ], ProxyService);
    return ProxyService;
}());
exports.ProxyService = ProxyService;
