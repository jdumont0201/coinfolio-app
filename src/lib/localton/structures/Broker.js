"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Portofolio_1 = require("./Portofolio");
var Ticker_1 = require("./Ticker");
var Listing_1 = require("./Listing");
var Trades_1 = require("./Trades");
var Broker = (function () {
    function Broker(logic, key, eventService, refreshService, tradingService, consoleService) {
        this.logic = logic;
        this.key = key;
        this.eventService = eventService;
        this.refreshService = refreshService;
        this.tradingService = tradingService;
        this.consoleService = consoleService;
        console.log("NEW BROKER ", key);
        this.portfolio = new Portofolio_1.Portfolio(this.logic, this.tradingService, this.refreshService, this.key);
        this.ticker = new Ticker_1.Ticker(this.logic, this.tradingService, this.refreshService, this.key, this.consoleService);
        this.listing = new Listing_1.Listing(this.logic, this.eventService, this.tradingService, this.refreshService, this.key, this.consoleService);
        this.trades = new Trades_1.Trades(this.logic, this.eventService, this.tradingService, this.refreshService, this.key);
    }
    Broker.prototype.getTotalUSDValue = function () {
        var _this = this;
        console.log("getTotalUSDValue init", this.key, "val");
        if (this.key == "global") {
            var res_1 = 0;
            var brokers = this.tradingService.getConnectedBrokersArray();
            console.log("getTotalUSDValue ", this.key, "br", brokers);
            brokers.forEach(function (b) {
                var v = _this.tradingService.getBrokerByName(b).getPortfolio().getTotalUSDValue();
                res_1 += v;
                //console.log("getTotalUSDValue ", _this.key, "add", b, "val=", v, "co=", _this.tradingService.getBrokerByName(b).getPortfolio().content);
            });
            return res_1;
        }
        else {
            return this.getPortfolio().getTotalUSDValue();
        }
    };
    Broker.prototype.getPortfolio = function () {
        return this.portfolio;
    };
    Broker.prototype.getListing = function () {
        return this.listing;
    };
    Broker.prototype.getTrades = function () {
        return this.trades;
    };
    Broker.prototype.getTicker = function () {
        return this.ticker;
    };
    Broker.prototype.loadBroker = function (f) {
        var _this = this;
        console.log("LOAD BROKER", this.key);
        this.refreshService.createPool(this.key + "-ticker");
        //this.refreshService.createPool(this.key + "-portfolio-ticker")
        this.refreshService.createPool(this.key + "-portfolio");
        this.refreshService.createPool(this.key + "-bidask");
        this.portfolio.loadPortfolio(function (isSuccess) {
            _this.ticker.loadTicker(function (isSuccess2) {
                _this.portfolio.setUSDValues(_this.ticker);
                if (isSuccess && isSuccess2)
                    _this.listing.loadListing(function (isSuccess3) {
                        //    this.backgroundLoad()
                        _this.setLoaded(true);
                        f({ portfolio: isSuccess, ticker: isSuccess2 });
                    });
            });
        });
    };
    Broker.prototype.backgroundLoad = function (f) {
        this.trades.load(function () {
        });
        this.ticker.load24ChangeBinance(function () {
        });
    };
    Broker.prototype.setLoaded = function (val) {
        console.log("SETLOADED");
        if (val) {
            this.isLoaded = true;
            this.consoleService.eventSent("brokerLoadedEvent <-- Broker", { key: this.key, loaded: true });
            this.eventService.brokerLoadedEvent.emit({ key: this.key, loaded: true });
            if (this.tradingService.brokers.connectedBrokersArray.indexOf(this.key) == -1)
                this.tradingService.brokers.connectedBrokersArray.push(this.key);
        }
        else {
            this.isLoaded = false;
            var idx = this.tradingService.brokers.connectedBrokersArray.indexOf(this.key);
            if (idx > -1)
                this.tradingService.brokers.connectedBrokersArray.splice(idx, 1);
        }
    };
    Broker.prototype.combineWith = function (P) {
        this.portfolio.combineWith(P);
    };
    return Broker;
}());
exports.Broker = Broker;
var BrokerCollection = (function () {
    function BrokerCollection(logic, eventService, tradingService, refreshService, consoleService) {
        this.logic = logic;
        this.eventService = eventService;
        this.tradingService = tradingService;
        this.refreshService = refreshService;
        this.consoleService = consoleService;
        this.brokers = {};
        this.connectedBrokersArray = [];
        this.connectedBrokersKeys = [];
        this.isLoaded = false;
        this.hasAttemptedLoginAllBrokers = false;
        this.loadStatus = {};
    }
    BrokerCollection.prototype.getBrokers = function () {
        return this.brokers;
    };
    BrokerCollection.prototype.getConnected = function () {
        return this.connectedBrokersArray;
    };
    BrokerCollection.prototype.getConnectedBrokers = function () {
        var res = {};
        for (var k in this.brokers)
            if (this.brokers[k].isLoaded)
                res[k] = this.brokers[k];
        return res;
    };
    BrokerCollection.prototype.createAll = function (keys) {
        var _this = this;
        keys.forEach(function (key) {
            _this.create(key);
        });
    };
    BrokerCollection.prototype.init = function (keys, f, selectiveInit) {
        this.createAll(keys);
        if (selectiveInit)
            this.loadBrokers(selectiveInit, f);
        else
            this.loadAllBrokers(f);
    };
    BrokerCollection.prototype.getByName = function (name) {
        //console.log("getbyname",key,this.brokers)
        if (name in this.brokers)
            return this.brokers[name];
        else
            return null;
    };
    BrokerCollection.prototype.reset = function () {
        this.brokers = {};
    };
    BrokerCollection.prototype.create = function (name) {
        console.log("CREATING BROK", name);
        var P = new Broker(this.logic, name, this.eventService, this.refreshService, this.tradingService, this.consoleService);
        this.brokers[name] = P;
    };
    BrokerCollection.prototype.checkLoadFinished = function (broker, status) {
        this.loadStatus[broker] = status;
        var r = true;
        for (var k in this.loadStatus) {
            if (this.loadStatus[k].portfolio == "todo" || this.loadStatus[k].ticker == "todo")
                r = false;
        }
        this.hasAttemptedLoginAllBrokers = r;
        return this.hasAttemptedLoginAllBrokers;
    };
    BrokerCollection.prototype.loadAllBrokers = function (f) {
        var _this = this;
        console.log("TRADE : ALL LOAD BROKER COL", this.brokers);
        var _loop_1 = function (k) {
            this_1.loadStatus[k] = { portfolio: "todo", ticker: "todo" };
            this_1.brokers[k].loadBroker(function (res) {
                if (res) {
                    _this.isLoaded = true;
                }
                if (_this.checkLoadFinished(k, res))
                    _this.tradingService.loadingFinished();
                f(_this.brokers[k]);
            });
        };
        var this_1 = this;
        for (var k in this.brokers) {
            _loop_1(k);
        }
    };
    BrokerCollection.prototype.loadBrokers = function (keys, f) {
        var _this = this;
        console.log("TRADE : LOAD BROKER COL", keys);
        keys.forEach(function (k) {
            _this.loadStatus[k] = { portfolio: "todo", ticker: "todo" };
            _this.brokers[k].loadBroker(function (res) {
                if (res) {
                    _this.isLoaded = true;
                }
                if (_this.checkLoadFinished(k, res))
                    _this.tradingService.loadingFinished();
                f(_this.brokers[k]);
            });
        });
    };
    return BrokerCollection;
}());
exports.BrokerCollection = BrokerCollection;
