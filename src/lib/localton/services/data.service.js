"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DataService = (function () {
    function DataService(requestService, restangular, proxyService) {
        this.requestService = requestService;
        this.restangular = restangular;
        this.proxyService = proxyService;
        this.database = "c";
    }
    DataService.prototype.post = function (table, obj, f) {
        console.log("[POST]", table, obj);
        var dt = this.restangular.all(table);
        var r = dt.post(obj).toPromise();
        r.then(function (res) {
            f(res);
        })
            .catch(function (error) {
            console.log("There was an error performing");
            f(null);
        });
    };
    DataService.prototype.perform = function (call, obj, f) {
        call = "rpc/" + call;
        console.log("[PERFORM]", call, obj);
        var dt = this.restangular.all(call);
        var r = dt.post(obj).toPromise();
        var reqId = this.proxyService.addNewDBRequest(call, "POST");
        r.then(function (res) {
            this.proxyService.completeRequestSuccessResult(reqId);
            f(res);
        }, function () {
            this.proxyService.completeRequestErrorResult(reqId);
            console.log("There was an error performing");
            f(null);
        });
        ;
    };
    DataService.prototype.getQueryParam = function (where, order, limit) {
        if (this.database === "c") {
            var res = {};
            for (var k in where) {
                res[k] = "eq." + where[k];
            }
            if (order)
                res["order"] = order.key + "." + order.dir;
            if (limit)
                res["limit"] = limit;
            return res;
        }
    };
    DataService.prototype.getAll = function (table, f, where, order, limit) {
        var _this = this;
        console.log("[GET ALL]", table, where);
        var dt = this.restangular.all(table);
        var q = this.getQueryParam(where, order, limit);
        var reqId = this.proxyService.addNewDBRequest(table, "GET");
        dt.customGETLIST("", q).subscribe(function (obj) {
            _this.proxyService.completeRequestSuccessResult(reqId);
            f(obj);
        });
    };
    DataService.prototype.getById = function (table, id, f) {
        var dt = this.restangular.one(table, id);
        dt.get().subscribe(function (obj) {
            f(obj);
        });
    };
    DataService = __decorate([
        core_1.Injectable()
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
