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
var data_service_1 = require("../lib/localton/services/data.service");
var api_service_1 = require("../lib/globalton/core/services/api.service");
var auth_service_1 = require("../lib/globalton/core/services/auth.service");
var request_service_1 = require("../lib/globalton/core/services/request.service");
var Logic = (function () {
    function Logic(requestService, dataService, apiService, authService) {
        this.requestService = requestService;
        this.dataService = dataService;
        this.apiService = apiService;
        this.authService = authService;
    }
    Logic.prototype.BinanceGetAllocation = function (f) {
        this.apiService.noauthget("user/getbinancebalance?userId=" + this.authService.userId, function (res) {
            if (res.result.success)
                f(res.result.data);
        });
    };
    Logic.prototype.BinanceGetLivePrices = function (f) {
        this.apiService.noauthget("user/getbinanceliveprices?userId=" + this.authService.userId, function (res) {
            if (res.result.success)
                f(res.result.data);
        });
    };
    Logic.prototype.BinanceGetMyTrades = function (symbols, f) {
        this.apiService.noauthget("user/getbinancetrades?userId=" + this.authService.userId + "&symbol=" + symbols, function (res) {
            if (res.result.success)
                f(res.result.data);
        });
    };
    Logic.prototype.BinanceGetDepth = function (symbol, f) {
        this.apiService.noauthget("user/getbinancedepth?symbol=" + symbol + "&userId=" + this.authService.userId, function (res) {
            if (res.result.success)
                f(res.result.data);
        });
    };
    Logic.prototype.BinanceGetOHLC = function (symbol, interval, f) {
        this.apiService.noauthget("user/getbinanceohlc?symbol=" + symbol + "&interval=" + interval + "&userId=" + this.authService.userId, function (res) {
            if (res.result.success)
                f(res.result.data);
        });
    };
    Logic.prototype.KrakenGetAllocation = function (f) {
        this.apiService.noauthget("user/getkrakenbalance?userId=" + this.authService.userId, function (res) {
            if (res.result.success)
                f(res.result.data);
        });
    };
    Logic.prototype.KrakenGetLivePrices = function (f) {
        this.apiService.noauthget("user/getkrakenliveprices?userId=" + this.authService.userId, function (res) {
            if (res.result.success)
                f(res.result.data);
        });
    };
    Logic.prototype.registerUser = function (obj, f) {
        var _this = this;
        console.log("Register ", obj);
        this.apiService.noauthpost("user", obj, function (res) {
            if (res.token) {
                _this.authService.loginResponse = res;
                _this.authService.postLogin();
                f({ success: true });
            }
            else {
                f({ success: false, error: true });
            }
        });
    };
    Logic.prototype.set = function (url, obj, f) {
        this.apiService.authpatch("user", obj, f);
    };
    Logic.prototype.saveUser = function (obj, f) {
        if (obj.id)
            this.apiService.authput("user", obj, f);
        else
            this.apiService.noauthpost("user", obj, f);
    };
    /* PAYMENT */
    Logic.prototype.generateAddress = function (planId, f) {
        var userId = this.authService.userId;
        this.apiService.noauthget("payment/generatebitcoinaddress?userId=" + userId + "&planId=" + planId, function (res) {
            f(res.result);
        });
    };
    Logic.prototype.getPlans = function (f) {
        var userId = this.authService.userId;
        this.apiService.noauthget("plan/getPlans", function (res) {
            f(res.result);
        });
    };
    Logic.prototype.readSubscription = function (f) {
        this.apiService.noauthget("user/getexpiration?userId=" + this.authService.userId, function (res) {
            f(res.result);
        });
    };
    Logic.prototype.checkBitcoinPayment = function (paymentId, f) {
        console.log("checkbitcoinpayment", paymentId);
        this.apiService.noauthget("payment/checkbitcoinpayment?paymentId=" + paymentId, function (res) {
            if (res && res.result)
                f(res.result);
            else
                f(null);
        });
    };
    Logic.prototype.getMe = function (f) {
        this.apiService.noauthget("user/" + this.authService.userId, f);
    };
    Logic.prototype.getChartData = function (source, interval, symbol, base, f) {
        this.dataService.getAll("recordprice", f, {
            source: source,
            interval: interval,
            symbol: symbol,
            base: base
        }, { key: "ts", dir: "asc" });
    };
    Logic.prototype.getMarketCapEvol = function (source, base, from, to, f) {
        this.dataService.perform("marketcapevol", { psource: source, pfrom: from, pto: to, pbase: base }, f);
    };
    Logic.prototype.getDominance = function (source, base, from, f) {
        this.dataService.perform("dominance", { psource: source, pts: from, pbase: base }, f);
    };
    Logic.prototype.getTopEntries = function (source, base, from, f) {
        this.dataService.perform("topentries", { psource: source, pts: from, pbase: base }, f);
    };
    Logic.prototype.getMarketCapData = function (source, symbol, base, f) {
        this.dataService.perform("marketcap", { psource: source, psymbol: symbol, pbase: base }, f);
    };
    Logic.prototype.getPriceDivMarketCapData = function (source, symbol, base, f) {
        this.dataService.perform("pricedivmarket", { psource: source, psymbol: symbol, pbase: base }, f);
    };
    Logic.prototype.getVolumeData = function (source, symbol, base, f) {
        this.dataService.perform("volumedd", { psource: source, psymbol: symbol, pbase: base }, f);
    };
    Logic.prototype.getImports = function (f) {
        this.dataService.getAll("import", f, {}, { key: "ts", dir: "desc" }, 1000);
    };
    Logic.prototype.getVolumeWeekData = function (source, symbol, base, f) {
        this.dataService.perform("volumeweekccc", { psource: source, psymbol: symbol, pbase: base }, f);
    };
    Logic.prototype.getAllChartData = function (source, interval, timestamp, base, f) {
        this.dataService.getAll("recordprice", f, { source: source, interval: interval, ts: timestamp, base: base });
    };
    /*

     PERFORM

     * */
    Logic.prototype.getMarketData = function (source, base, ts, f) {
        this.dataService.perform("allsymbolscap", { psource: source, pts: ts, pbase: base }, f);
    };
    Logic.prototype.getDailyTopPerformance = function (source, ts, base, f) {
        this.dataService.perform("dailytopperf", { pts: ts, pbase: base, psource: source }, f);
    };
    Logic.prototype.getTopPerformance = function (source, from, to, base, f) {
        this.dataService.perform("topperf", { pfrom: from, pto: to, pbase: base, psource: source }, f);
    };
    Logic.prototype.getPerfLastWeek = function (source, days, ts, symbol, base, f) {
        this.dataService.perform("lastweekperf", {
            pts: ts,
            psymbol: symbol,
            pdays: days,
            pbase: base,
            psource: source
        }, f);
    };
    Logic.prototype.getCapLastWeek = function (source, days, ts, symbol, base, f) {
        this.dataService.perform("caplastweek", {
            pts: ts,
            psymbol: symbol,
            pdays: days,
            pbase: base,
            psource: source
        }, f);
    };
    Logic.prototype.getTrendingPriceCapLastWeek = function (source, days, ts, base, sourcecap, f) {
        var options = { pts: ts, pdays: days, pbase: base, psourceprice: source, psourcecap: sourcecap };
        this.dataService.perform("pricecaplastweek2d", options, f);
    };
    Logic.prototype.getLastImport = function (source, type, f) {
        this.dataService.getAll("import", function (res) {
            if (res.length > 0)
                f(res[0].timestamp);
            else
                f(null);
        }, { source: source, type: type }, { key: "ts", dir: "DESC" });
    };
    Logic.prototype.savePanel = function (panel, f) {
        panel.userId = this.authService.userId;
        if (panel.id)
            this.apiService.authput("user/" + this.authService.userId + "/panels/" + panel.id, panel, function (res) {
                f(res);
            });
        else
            this.apiService.authpost("user/" + this.authService.userId + "/panels", panel, function (res) {
                f(res);
            });
    };
    Logic.prototype.getMyPanels = function (f) {
        this.apiService.authget("user/" + this.authService.userId + "/panels", function (res) {
            f(res);
        });
    };
    Logic.prototype.getPanels = function (array, f) {
        var url = 'panel?filter={"where":{"id":{"inq":["' + array.join('","') + '"]}}}';
        this.apiService.authget(url, function (res) {
            f(res);
        });
    };
    Logic.prototype.getMyWorkspaces = function (f) {
        this.apiService.authget("user/" + this.authService.userId + "/workspaces", function (res) {
            f(res);
        });
    };
    Logic.prototype.saveWorkspace = function (w, f) {
        if (w.id)
            this.apiService.authput("user/" + this.authService.userId + "/workspaces/" + w.id, w, function (res) {
                f(res);
            });
        else
            this.apiService.authpost("user/" + this.authService.userId + "/workspaces", w, function (res) {
                f(res);
            });
    };
    Logic.prototype.getNews = function (q, f) {
        var url = "widget/searchNews?q=" + q;
        this.apiService.noauthget(url, function (res) {
            f(res.searchNews.feed.entries);
        });
    };
    Logic.prototype.getTweets = function (q, f) {
        var url = "widget/searchTweets?q=" + q;
        this.apiService.noauthget(url, function (res) {
            f(res);
        });
    };
    Logic.prototype.loadMyPanels = function (f) {
        var A = {};
        this.getMyPanels(function (res) {
            for (var i = 0; i < res.length; ++i)
                A[res[i].id] = res[i];
            f({ array: res, object: A });
        });
    };
    Logic.prototype.loadPanels = function (array, f) {
        this.loadDefaultPanels(array, f);
    };
    Logic.prototype.loadDefaultPanels = function (array, f) {
        var A = {};
        this.getPanels(array, function (res) {
            for (var i = 0; i < res.length; ++i)
                A[res[i].id] = res[i];
            f({ array: res, object: A });
        });
    };
    Logic.prototype.loadTemplatePanels = function (f) {
        var url = 'panel/?filter={"where":{"isDefault":"true"}}';
        this.apiService.authget(url, function (res) {
            f(res);
        });
    };
    Logic.prototype.adminInitDB = function () {
        this.createPlans();
    };
    Logic.prototype.createPlans = function () {
        this.savePlan({ amount: 39, length: 30, name: "premium" });
        this.savePlan({ amount: 89, length: 90, name: "premium" });
        this.savePlan({ amount: 299, length: 365, name: "premium" });
        this.savePlan({ amount: 0, length: 10000, name: "free" });
    };
    Logic.prototype.savePlan = function (data) {
        var url = "plan";
        this.apiService.noauthpost(url, data, function (res) {
        });
    };
    Logic = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [request_service_1.RequestService, data_service_1.DataService, api_service_1.ApiService, auth_service_1.AuthService])
    ], Logic);
    return Logic;
}());
exports.Logic = Logic;
//# sourceMappingURL=Logic.js.map