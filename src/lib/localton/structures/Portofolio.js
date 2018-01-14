"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Portfolio = (function () {
    function Portfolio(logic, tradingService, refreshService, key) {
        this.logic = logic;
        this.tradingService = tradingService;
        this.refreshService = refreshService;
        this.content = {};
        this.connected = false;
        console.log("NEW BROKER PTF", key);
        this.key = key;
        this.content = {};
    }
    Portfolio.prototype.getTotalUSDValue = function () {
        var res = 0;
        console.log(this.key + " getTotalUSDValue");
        for (var k in this.content) {
            res += this.content[k].usdvalue;
            //        console.log("  ", k, "=", this.content[k].usdvalue)
        }
        return Math.round(100 * res) / 100;
    };
    Portfolio.prototype.refresh = function (f, force) {
        var _this = this;
        if (force)
            this.content = {};
        this.loadPortfolio(function () {
            _this.refreshTotal();
            f();
        });
    };
    Portfolio.prototype.refreshTotal = function () {
        this.totalUSDValue = this.getTotalUSDValue();
    };
    Portfolio.prototype.getSymbols = function () {
        return Object.keys(this.content);
    };
    Portfolio.prototype.loadPortfolio = function (f) {
        console.log("  PTF LOAD");
        if (this.key == "binance") {
            this.loadBinance(f);
        }
        else if (this.key === "kraken") {
            this.loadKraken(f);
        }
    };
    Portfolio.prototype.combineWith = function (P) {
        for (var k in P.content) {
            if (k in this.content)
                this.content[k].q += P.content[k].q;
            else
                this.content[k] = P.content[k];
        }
    };
    Portfolio.prototype.add = function (symbol, q, broker) {
        //console.log("TRADE PTF ADD ", symbol, q)
        if (symbol in this.content)
            this.content[symbol].q = q;
        else {
            this.content[symbol] = { symbol: symbol, q: q, broker: broker };
        }
    };
    Portfolio.prototype.setUSDValues = function (ticker) {
        for (var s in this.content) {
            this.setUSDValue(ticker, s);
        }
    };
    Portfolio.prototype.setUSDValue = function (ticker, s) {
        var asset = this.content[s];
        var USD = ticker.getUSDValue(s);
        this.content[s].usdvalue = USD * asset.q;
        this.content[s].unitvalue = USD;
        //console.log("setusdvalue ",s," USDunit=",USD,"q=","USDVal=",asset.q,this.content[s].usdvalue)
    };
    Portfolio.prototype.has = function (symbol, threshold) {
        if (!threshold)
            return symbol in this.content;
        else {
            //let usdvalue=this.tradingService.getBrokerByName(this.key).getTicker().getUSDValue(symbol);
            return symbol in this.content && this.content[symbol].usdvalue > threshold;
        }
    };
    Portfolio.prototype.getAllocation = function (threshold) {
        var resData = [];
        var gridData = [];
        var objData = {};
        //    this.setUSDValues(this.tradingService.getBrokerByName(this.key).getTicker());
        for (var k in this.content) {
            var asset = this.content[k];
            var T = this.tradingService.getBrokerByName(asset.broker).getTicker();
            if (!threshold || asset.usdvalue > threshold) {
                var v = Math.round(100 * T.getUSDValue(asset.symbol)) / 100;
                var r = { name: asset.symbol, y: Math.round(100 * v * asset.q) / 100, change: T.getSymbolChange(asset.symbol) };
                resData.push(r);
                var rr = { symbol: asset.symbol, available: asset.q, price: v, value: Math.round(100 * v * asset.q) / 100, broker: asset.broker };
                gridData.push(rr);
                objData[asset.symbol] = rr;
            }
        }
        return { chartData: resData, gridData: gridData, objData: objData };
    };
    Portfolio.prototype.loadBinance = function (f) {
        var _this = this;
        //console.log("TRADE PTF LOAD BINANCE")
        this.logic.BinanceGetAllocation(function (alloc) {
            _this.dataTime = new Date();
            //console.log("TRADE PTF LOAD BINANCE RES", alloc)
            if (alloc) {
                for (var k in alloc)
                    if (parseFloat(alloc[k].available) + parseFloat(alloc[k].onOrder) > 0) {
                        var q = parseFloat(alloc[k].available) + parseFloat(alloc[k].onOrder);
                        _this.add(k, q, _this.key);
                    }
                _this.afterLoad();
                f(_this.connected);
            }
            else {
                f(false);
            }
        });
    };
    Portfolio.prototype.afterLoad = function () {
        var isInitialLoad = !this.connected;
        if (isInitialLoad) {
            this.refreshService.createPool(this.key + "-portfolio");
            this.tradingService.PortfolioUpdatedEvent.emit({ broker: this.key, success: true });
        }
        this.connected = true;
    };
    Portfolio.prototype.loadKraken = function (f) {
        var _this = this;
        //console.log("TRADE PTF LOAD BINANCE")
        this.logic.KrakenGetAllocation(function (alloc) {
            _this.dataTime = new Date();
            //  console.log("TRADE PTF LOAD BINANCE RES", alloc)
            if (alloc) {
                for (var k in alloc)
                    if (parseFloat(alloc[k].available) + parseFloat(alloc[k].onOrder) > 0) {
                        var q = parseFloat(alloc[k].available) + parseFloat(alloc[k].onOrder);
                        _this.add(k, q, _this.key);
                    }
                _this.afterLoad();
                f(_this.connected);
            }
            else {
                f(false);
            }
        });
    };
    Portfolio.prototype.getAsset = function (s) {
        if (s in this.content)
            return this.content[s];
        else
            return null;
    };
    Portfolio.prototype.isInPortfolio = function (s) {
        return this.getAsset(s) ? true : false;
    };
    return Portfolio;
}());
exports.Portfolio = Portfolio;
