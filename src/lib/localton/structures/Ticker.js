"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require("async");
function getUSDValue(k, P) {
    var p;
    if (k === "USDT") {
        p = 1;
    }
    else if (k === "BTC") {
        p = parseFloat(P["BTCUSDT"]);
    }
    else if ((k + "USDT") in this.prices) {
        p = parseFloat(P[k + "USDT"]);
    }
    else {
        var pb = parseFloat(P[k + "BTC"]);
        var btcv = pb;
        var b = parseFloat(P["BTCUSDT"]);
        p = btcv * b;
    }
    return p;
}
var Ticker = (function () {
    function Ticker(logic, tradingService, refreshService, key, consoleService) {
        this.logic = logic;
        this.tradingService = tradingService;
        this.refreshService = refreshService;
        this.consoleService = consoleService;
        this.content = {};
        this.connected = false;
        this.maxVolume = {};
        console.log("NEW BROKER TICKER", key);
        this.key = key;
        this.content = {};
    }
    Ticker.prototype.getPairChange = function (pair, f, force) {
        //console.log("getpairchange",pair);
        var c = this.getTick(pair);
        if (c) {
            //  console.log("getpairchange exist ?" ,pair,JSON.stringify(c));
            if (c.change && !force) {
                f({ last: c.changelastprice, change: c.change, current: c.p, changeCloseTime: c.changeCloseTime, changeLastTime: c.changeLastTime, p: c.p });
            }
            else {
                this.load24hChangePerPair(pair, function (res) {
                    /*add tick change data*/
                    c.change = res.change;
                    c.p = res.current;
                    c.changeCloseTime = res.closeTime;
                    c.changeLastTime = res.lastTime;
                    c.changelastprice = res.last;
                    //        console.log("getpairchange update" ,pair,JSON.stringify(this.content[pair]));
                    f({ last: res.last, current: res.current, change: res.change, p: c.p, changeCloseTime: c.changeCloseTime, changeLastTime: c.changeLastTime });
                });
            }
        }
        else {
            f(null);
        }
    };
    Ticker.prototype.loadTicker = function (f) {
        var _this = this;
        console.log("TICKER LOAD ");
        if (this.key == "binance") {
            this.loadBinance(function (success) {
                if (success) {
                    _this.consoleService.eventSent("PriceUpdatedEvent <-- Ticker", { broker: _this.key, pair: "all" });
                    _this.tradingService.PriceUpdatedEvent.emit({ pair: "all", broker: _this.key });
                    f(true);
                }
                else {
                    f(false);
                }
            });
        }
        else if (this.key == "kraken") {
            f(false);
        }
    };
    Ticker.prototype.loadBackground24hChange = function (f) {
        if (this.key == "binance") {
            this.loadBinance(f);
        }
    };
    Ticker.prototype.add = function (pair, p) {
        var sendEvent = false;
        if (pair in this.content)
            this.content[pair].p = p;
        else
            this.content[pair] = { p: p };
        if (sendEvent) {
            this.consoleService.eventSent("PriceUpdatedEvent <-- Ticker", { broker: this.key, pair: pair, price: p });
            this.tradingService.PriceUpdatedEvent.emit({ broker: this.key, pair: pair, price: p });
        }
    };
    Ticker.prototype.loadBinance = function (f) {
        var _this = this;
        console.log("TICKER LOAD BIN");
        this.logic.BinanceGetLivePrices(function (prices) {
            _this.dataTime = new Date();
            console.log("TICKER LOAD BIN RES", prices);
            if (prices) {
                for (var symbol in prices) {
                    var p = parseFloat(prices[symbol]);
                    _this.add(symbol, p);
                }
                _this.afterLoad();
                f(_this.connected);
            }
            else {
                f(null);
            }
        });
    };
    Ticker.prototype.afterLoad = function () {
        var isInitialLoad = !this.connected;
        if (isInitialLoad) {
            this.refreshService.createPool(this.key + "-ticker");
            //this.refreshService.createPool(this.key + "-portfolio-ticker")
            this.tradingService.TickerUpdatedEvent.emit({ broker: this.key, success: true });
        }
        this.connected = true;
    };
    Ticker.prototype.refresh = function (f, force) {
        var _this = this;
        console.log("TICKER ", this.key, "refresh");
        if (force)
            this.content = {};
        this.loadTicker(function () {
            _this.tradingService.getBrokerByName(_this.key).getPortfolio().refreshTotal();
            f();
        });
    };
    Ticker.prototype.processLoadBinance = function (e, cb) {
        var _this = this;
        setTimeout(function () {
            _this.loadBinance24ChangeSymbol(typeof e == "string" ? e : e.symbol, function (res) {
                cb();
            });
        }, 3000);
    };
    Ticker.prototype.load24hChangePerPair = function (pair, f) {
        console.log("load24hChangePerPair");
        if (this.key == "binance")
            this.loadBinance24ChangeSymbol(pair, function (res) {
                f({ last: res.prevClosePrice, change: res.priceChange, current: res.lastPrice, lastTime: res.openTime, closeTime: res.closeTime });
            });
        else
            console.error("not configured");
    };
    Ticker.prototype.loadBinance24ChangeSymbol = function (pair, f) {
        var _this = this;
        console.log("loadBinance24ChangeSymbol");
        this.logic.BinanceGet24hChange(pair, function (ticker) {
            //console.log(" -> gpc=", ticker)
            if (ticker) {
                _this.add24hChange(ticker.symbol, ticker.quoteVolume, ticker.priceChange, ticker.priceChangePercent, ticker.prevClosePrice, ticker.lastPrice);
                f(ticker);
            }
            else {
                f(null);
            }
        });
    };
    /* adds the changes data from Ticker to the Listing Cryptopair*/
    Ticker.prototype.appendChange = function (L) {
        var _this = this;
        L.forEach(function (l) {
            var t = _this.content[l.pair];
            l.change = t.change;
            l.changelastprice = t.changelastprice;
            l.changelasttime = t.changelasttime;
            l.pricemoy = (l.bid + l.ask) / 2;
            l.volume = t.volume ? Math.floor(t.volume) : null;
        });
    };
    Ticker.prototype.load24ChangeBinance = function (f) {
        var _this = this;
        var L = this.tradingService.getBrokerByName(this.key).getListing();
        var max = 4;
        var count = 0;
        var keys = Object.keys(L.content);
        this.tradingService.getBrokerByName(this.key).getTrades().getMostTraded(function (res) {
            console.log("MOSTTRADED", res);
            async.eachSeries(res, function (e, cb) {
                _this.processLoadBinance(e, cb);
            }, function (e) {
                console.log("MOSTTRADED END LIST", keys);
                async.eachSeries(keys, function (e, cb) {
                    if (res.indexOf(e) > -1) {
                        cb();
                    }
                    else {
                        _this.processLoadBinance(e, cb);
                    }
                }, function (e) {
                    f();
                });
            });
            console.log("TCIEKR LOAD 24h BINANCE");
        });
    };
    Ticker.prototype.setMaxVolume = function (pair, volume) {
        var L = this.tradingService.getBrokerByName(this.key).getListing();
        var infra = pair in L.content ? L.content[pair].infra : null;
        //console.log("setmaxvol",this.maxVolume,infra in this.maxVolume)
        if (infra)
            if (!(infra in this.maxVolume)) {
                //console.log("setmaxvol newinfra",infra,volume);
                this.maxVolume[infra] = volume;
            }
            else {
                // console.log("setmaxvol pair" ,pair,infra,this.maxVolume[infra],volume)
                this.maxVolume[infra] = Math.max(volume, this.maxVolume[infra]);
                // console.log("  setmaxvol pair af" ,pair,infra,this.maxVolume[infra],volume)
            }
    };
    Ticker.prototype.add24hChange = function (pair, volume, priceChange, priceChangePercent, ChangeLastPrice, lastPrice) {
        this.setMaxVolume(pair, volume);
        if (!pair) {
            console.log("ticker no pair");
            return;
        }
        if (pair in this.content) {
            this.content[pair].volume = volume;
            this.content[pair].changepips = priceChange;
            this.content[pair].p = lastPrice;
            this.content[pair].change = priceChangePercent;
            this.content[pair].changelastprice = ChangeLastPrice;
            this.tradingService.PriceChangeUpdatedEvent.emit({ pair: pair, broker: this.key });
        }
        else {
            console.log("ticker new item at live", pair);
        }
    };
    Ticker.prototype.getSymbolChange = function (symbol) {
        var pair = this.tradingService.getBrokerByName(this.key).getListing().getBasePair(symbol);
        if (pair)
            return this.content[pair].change;
    };
    Ticker.prototype.getTick = function (s) {
        if (s in this.content)
            return this.content[s];
        else
            return null;
    };
    Ticker.prototype.hasPair = function (s) {
        return s in this.content;
    };
    Ticker.prototype.getPrice = function (s) {
        if (s in this.content)
            return this.content[s].p;
        else
            return null;
    };
    Ticker.prototype.getPair = function (symbol) {
        if (symbol == "USDT")
            return "USDT";
        var candidate = symbol + "USDT";
        if (this.hasPair(candidate))
            return candidate;
        else if (this.hasPair(symbol + "BTC"))
            return symbol + "BTC";
        else if (this.hasPair(symbol + "BNB"))
            return symbol + "BNB";
        else
            console.log("cannot find pair for symbol" + symbol);
    };
    Ticker.prototype.getUSDValue = function (symbol) {
        if (symbol == "USDT")
            return 1;
        var candidate = symbol + "USDT";
        if (this.hasPair(candidate))
            return this.getPrice(candidate);
        else if (this.hasPair(symbol + "BTC"))
            return this.getPrice(symbol + "BTC") * this.getPrice("BTCUSDT");
        else if (this.hasPair(symbol + "BNB"))
            return this.getPrice(symbol + "BNB") * this.getPrice("BNBUSDT");
    };
    return Ticker;
}());
exports.Ticker = Ticker;
