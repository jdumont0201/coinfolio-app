"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Broker_1 = require("../structures/Broker");
var utils_1 = require("../../../lib/localton/utils/utils");
var utils_2 = require("../../../lib/globalton/core/utils/utils");
var utils_3 = require("../../../lib/globalton/core/utils/utils");
var TradingService = (function () {
    function TradingService(authService, appConfigService, consoleService, eventService, refreshService, logic) {
        var _this = this;
        this.authService = authService;
        this.appConfigService = appConfigService;
        this.consoleService = consoleService;
        this.eventService = eventService;
        this.refreshService = refreshService;
        this.logic = logic;
        this.brokersConnected = false;
        this.InfraSupra = {};
        this.BidAskUpdatedEvent = new core_1.EventEmitter();
        this.PriceChangeUpdatedEvent = new core_1.EventEmitter();
        this.EnabledBrokersLoadingFinishedEvent = new core_1.EventEmitter();
        this.PriceUpdatedEvent = new core_1.EventEmitter();
        this.ListingUpdatedEvent = new core_1.EventEmitter();
        this.PortfolioUpdatedEvent = new core_1.EventEmitter();
        this.TickerUpdatedEvent = new core_1.EventEmitter();
        this.enabledBrokers = [];
        consoleService.trade("+", this.authService, this.authService.loginChanged);
        this.consoleService.trade(" + tradingservice", this.authService, this.authService.loginChanged);
        this.authService.loginChanged.subscribe(function (value) { return _this.loginUpdated(value); }, function (error) { return console.log("Error reading loginupdated" + error); }, function () { return console.log('done'); });
        this.refreshService.setTradingService(this);
        this.brokers = new Broker_1.BrokerCollection(logic, eventService, this, this.refreshService, this.consoleService);
        this.globalBroker = new Broker_1.Broker(logic, "global", eventService, this.refreshService, this, this.consoleService);
        if (this.authService.isAuthenticated())
            this.init();
        else {
            this.brokers.createAll(this.appConfigService.possibleBrokers);
            this.consoleService.trade("waiting for auth");
            this.eventService.hideLoading();
        }
        //this.refreshService.createPool("ticker")
    }
    TradingService.prototype.getInfraSupra = function (pair) {
        if (pair in this.InfraSupra)
            return this.InfraSupra[pair];
        else {
            this.InfraSupra[pair] = utils_1.Crypto.getSymbolsFromPair(pair);
        }
    };
    TradingService.prototype.getInfra = function (pair) {
        var p = this.getInfraSupra(pair);
        return p ? p.infra : null;
    };
    TradingService.prototype.getSupra = function (pair) {
        var p = this.getInfraSupra(pair);
        return p ? p.supra : null;
    };
    TradingService.prototype.isBrokerLoaded = function (key) {
        return this.getBrokerByName(key).isLoaded;
    };
    TradingService.prototype.loginUpdated = function (val) {
        this.consoleService.trade(" loginupdated");
        if (this.authService.isAuthenticated())
            this.init();
    };
    TradingService.prototype.getListing = function () {
        var res = {};
        var B = this.brokers.getBrokers();
        //console.log("brokers",B)
        for (var j in B) {
            var b = B[j];
            var L = b.getListing().content;
            for (var k in L)
                if (L[k].pair in res) {
                    res[L[k].pair].brokers.push(b.key);
                }
                else {
                    res[L[k].pair] = { brokers: [b.key], name: L[k].pair };
                }
        }
        //console.log("brokers",B,"listing",res)
        var A = utils_2.Structures.objectToArray(res);
        var C = utils_2.Structures.ArraySort(A, "name", -1);
        //console.log("brokers",B,"listing",A,C)
        return C;
    };
    TradingService.prototype.fetchBrokerEnabledArray = function (f) {
        var _this = this;
        var r = [];
        this.logic.getMe(function (user) {
            console.log("user", user);
            _this.appConfigService.possibleBrokers.forEach(function (k) {
                var prop = "Connection" + utils_3.Strings.Capitalize(k);
                console.log("check", prop);
                if (user[prop] === "true") {
                    r.push(k);
                }
            });
            console.log("enabledBrokers", r, user);
            _this.enabledBrokers = r;
            f(r);
        });
    };
    TradingService.prototype.init = function () {
        var _this = this;
        this.consoleService.trade(" init");
        this.fetchBrokerEnabledArray(function (list) {
            console.log("LADING", list);
            _this.brokers.init(_this.appConfigService.possibleBrokers, function (broker) {
                _this.globalBroker.combineWith(broker.getPortfolio());
                _this.globalBroker.isLoaded = true;
                _this.brokersConnected = true;
                //this.eventService.brokerLoadedEvent.emit({key: "global", loaded: true})
            }, list);
        });
    };
    TradingService.prototype.getListTickerRefresh = function () {
        var _this = this;
        var L = [];
        //this.logic.getMe((user)=>{
        var F = this.authService.favoritePairs;
        if (F) {
            F.forEach(function (f) {
                L.push(f);
            });
        }
        this.enabledBrokers.forEach(function (b) {
            //console.log("LISTTOREf broker", b)
            var P = _this.getBrokerByName(b).getPortfolio().getSymbols();
            P.forEach(function (symbol) {
                var pair = _this.getBrokerByName(b).getTicker().getPair(symbol);
                var idx = utils_2.Structures.getIndexByMatch(L, { broker: b, pair: pair });
                if (idx == -1)
                    L.push({ pair: pair, broker: b });
                //console.log("LISTTOREf", symbol, "--> ", pair, idx)
            });
        });
        console.log("LISTTOREf", L);
        //        f(L)
        return L;
        //  });
    };
    TradingService.prototype.loadingFinished = function () {
        this.consoleService.eventSent("EnabledBrokersLoadingFinishedEvent <-- tradingService");
        this.EnabledBrokersLoadingFinishedEvent.emit(this.enabledBrokers);
        this.eventService.hideLoading();
    };
    TradingService.prototype.getGlobalBroker = function () {
        return this.getBrokerByName("global");
    };
    TradingService.prototype.getBrokerByName = function (name) {
        if (name == "global")
            return this.globalBroker;
        return this.brokers.getByName(name);
    };
    TradingService.prototype.isAnyBrokerConfigured = function () {
        return this.brokersConnected;
    };
    TradingService.prototype.getConnectedBrokers = function () {
        return this.brokers.getConnectedBrokers();
    };
    TradingService.prototype.getConnectedBrokersArray = function () {
        return this.brokers.connectedBrokersArray;
    };
    TradingService.prototype.getConnectedBrokersKeys = function () {
        return this.brokers.connectedBrokersArray;
    };
    TradingService.prototype.reload = function () {
        if (this.authService.isAuthenticated()) {
            this.consoleService.trade(" reload");
            this.init();
        }
    };
    TradingService.prototype.getProbablePairs = function (symbol) {
        if (symbol == "USDT")
            return [];
        else {
            var A = [symbol + "USDT", symbol + "BTC", symbol + "BNB", symbol + "ETH"];
            var B = [];
            for (var i = 0; i < A.length; ++i) {
                if (this.checkIfPairExists(A[i]) == "yes") {
                    B.push(A[i]);
                }
            }
            return B;
        }
    };
    TradingService.prototype.checkIfPairExists = function (pair) {
        var B = this.getBrokerByName("binance");
        if (B)
            return B.getTicker().hasPair(pair) ? "yes" : "no";
        else
            return null;
    };
    __decorate([
        core_1.Output()
    ], TradingService.prototype, "BidAskUpdatedEvent", void 0);
    __decorate([
        core_1.Output()
    ], TradingService.prototype, "PriceChangeUpdatedEvent", void 0);
    __decorate([
        core_1.Output()
    ], TradingService.prototype, "EnabledBrokersLoadingFinishedEvent", void 0);
    __decorate([
        core_1.Output()
    ], TradingService.prototype, "PriceUpdatedEvent", void 0);
    __decorate([
        core_1.Output()
    ], TradingService.prototype, "ListingUpdatedEvent", void 0);
    __decorate([
        core_1.Output()
    ], TradingService.prototype, "PortfolioUpdatedEvent", void 0);
    __decorate([
        core_1.Output()
    ], TradingService.prototype, "TickerUpdatedEvent", void 0);
    TradingService = __decorate([
        core_1.Injectable()
    ], TradingService);
    return TradingService;
}());
exports.TradingService = TradingService;
