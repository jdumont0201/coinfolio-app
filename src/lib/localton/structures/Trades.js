"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require("async");
var Trades = (function () {
    function Trades(logic, eventService, tradingService, refreshService, key) {
        this.logic = logic;
        this.eventService = eventService;
        this.tradingService = tradingService;
        this.refreshService = refreshService;
        this.key = key;
        this.content = {};
        this.symbolCount = {};
        this.loadCount = 0;
    }
    Trades.prototype.has = function (symbol) {
        return symbol in this.content;
    };
    Trades.prototype.refresh = function () {
        this.load(function () {
        });
    };
    Trades.prototype.load = function (f) {
        console.log("TRADE : LOAD LISTING", this.key);
        if (this.key == "binance") {
            this.loadBinance(f);
        }
    };
    Trades.prototype.getTrades = function () {
        var r = [];
        for (var k in this.content)
            r.push(this.content[k]);
        r.sort(function (a, b) {
            var keyA = a.time, keyB = b.time;
            if (keyA < keyB)
                return 1;
            if (keyA > keyB)
                return -1;
            else
                return a.symbol < b.symbol ? -1 : 1;
        });
        return r;
    };
    Trades.prototype.saveMostTraded = function () {
        var _this = this;
        this.logic.getMe(function (me) {
            me.mostTradedPairs = JSON.stringify(_this.getPairCount());
            console.log("stats save most");
            _this.logic.saveUser(me, function (res) {
                console.log("stats saved");
            });
        });
    };
    Trades.prototype.getMostTraded = function (f) {
        var _this = this;
        this.logic.getMe(function (me) {
            console.log("MOSTTRADED", me.mostTradedPairs);
            var mt = me.mostTradedPairs;
            if (mt)
                mt = JSON.parse(mt);
            _this.mostTradedPairs = mt;
            f(mt);
        });
    };
    Trades.prototype.processLoad = function (e, cb) {
        var _this = this;
        setTimeout(function () {
            _this.loadBinanceSymbol(typeof e == "string" ? e : e.symbol, function (res) {
                _this.progress++;
                _this.loadCount++;
                if (_this.loadCount % 20 == 0)
                    _this.saveMostTraded();
                cb();
            });
        }, 300);
    };
    Trades.prototype.loadBinance = function (f) {
        var _this = this;
        var L = this.tradingService.getBrokerByName(this.key).getListing();
        var max = 4;
        var count = 0;
        var keys = Object.keys(L.content);
        this.getMostTraded(function (res) {
            console.log("MOSTTRADED", res);
            async.eachSeries(res, function (e, cb) {
                _this.processLoad(e, cb);
            }, function (e) {
                console.log("MOSTTRADED END LIST", keys);
                async.eachSeries(keys, function (e, cb) {
                    if (res.indexOf(e) > -1) {
                        cb();
                    }
                    else {
                        _this.processLoad(e, cb);
                    }
                }, function (e) {
                    f();
                });
            });
            _this.progress = 0;
            console.log("TRADE LOAD TRADES BINANCE", L.content, L.isLoaded, keys);
        });
    };
    Trades.prototype.loadBinanceSymbol = function (symbol, f) {
        var _this = this;
        this.logic.BinanceGetMyTrades(symbol, function (trades) {
            _this.dataTime = new Date();
            if (trades) {
                for (var k in trades) {
                    var l = trades[k];
                    _this.add(l.id, symbol, "binance", parseFloat(l.price), l.isBuyer ? "long" : "short", parseFloat(l.qty), parseFloat(l.commission), l.commissionunit, l.time);
                }
                f();
            }
        });
    };
    Trades.prototype.getCount = function () {
        return Object.keys(this.content).length;
    };
    Trades.prototype.hasTraded = function (pair) {
        return pair in this.symbolCount;
    };
    Trades.prototype.getPairCount = function (pair) {
        if (pair)
            if (pair in this.symbolCount)
                return this.symbolCount[pair];
            else
                return 0;
        else {
            var res = [];
            for (var k in this.symbolCount)
                res.push({ symbol: k, count: this.symbolCount[k] });
            res.sort(function (a, b) {
                var keyA = a.count, keyB = b.count;
                if (keyA < keyB)
                    return 1;
                if (keyA > keyB)
                    return -1;
                else
                    return a.symbol < b.symbol ? -1 : 1;
            });
            return res;
        }
    };
    Trades.prototype.add = function (id, symbol, broker, price, direction, q, commission, commissionunit, time) {
        if (this.key !== "global")
            this.tradingService.globalBroker.getTrades().add(id, symbol, broker, price, direction, q, commission, commissionunit, time);
        if (symbol in this.symbolCount)
            this.symbolCount[symbol]++;
        else
            this.symbolCount[symbol] = 1;
        //console.log("add trade",id,this.progress)
        if (id in this.content) {
            this.content[id].direction = direction;
            this.content[id].price = price;
            this.content[id].symbol = symbol;
            this.content[id].commission = commission;
            this.content[id].q = q;
            this.content[id].broker = broker;
            this.content[id].time = time;
            this.content[id].commissionunit = commissionunit;
        }
        else {
            this.content[id] = {
                id: id,
                commissionunit: commissionunit,
                price: price,
                symbol: symbol,
                direction: direction,
                broker: broker,
                q: q,
                commission: commission,
                time: time
            };
        }
    };
    return Trades;
}());
exports.Trades = Trades;
