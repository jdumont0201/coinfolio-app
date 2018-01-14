"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils/utils");
var Listing = (function () {
    function Listing(logic, eventService, tradingService, refreshService, key, consoleService) {
        this.logic = logic;
        this.eventService = eventService;
        this.tradingService = tradingService;
        this.refreshService = refreshService;
        this.key = key;
        this.consoleService = consoleService;
        this.content = {};
        this.bases = ["USDT", "BTC", "BNB", "ETH"];
    }
    Listing.prototype.has = function (pair) {
        return pair in this.content;
    };
    Listing.prototype.refresh = function (f) {
        this.loadListing(f);
    };
    Listing.prototype.loadListing = function (f) {
        var _this = this;
        console.log("TRADE : LOAD LISTING", this.key);
        if (this.key == "binance") {
            this.loadBinance(function (success) {
                if (success) {
                    _this.consoleService.eventSent("ListingUpdatedEvent <-- Listing", { broker: _this.key });
                    _this.tradingService.ListingUpdatedEvent.emit({ key: _this.key, loaded: true });
                    f(true);
                }
                else {
                    f(false);
                }
            });
        }
        else {
            f(false);
        }
    };
    Listing.prototype.loadBinance = function (f) {
        var _this = this;
        var broker = "binance";
        console.log("TRADE LOAD LISTING BINANCE");
        this.logic.BinanceGetBookTickers(function (listing) {
            _this.dataTime = new Date();
            console.log("TRADE LOAD LISTING BINANCE RES", listing);
            if (listing) {
                for (var k in listing) {
                    var l = listing[k];
                    if (k !== "123456") {
                        var pair = utils_1.Crypto.getSymbolsFromPair(k);
                        var inptf = _this.tradingService.globalBroker.getPortfolio().has(pair.supra, 20);
                        var hasTraded = _this.tradingService.globalBroker.getTrades().hasTraded(k);
                        var usdref = _this.getUSDValue(pair.infra, listing);
                        _this.add(k, broker, parseFloat(l.bid), parseFloat(l.ask), parseFloat(l.bids), parseFloat(l.asks), pair.infra, pair.supra, inptf, usdref.ask, usdref.bid, hasTraded);
                    }
                }
                _this.isLoaded = true;
                f(true);
            }
            else {
                f(false);
            }
        });
    };
    Listing.prototype.getBasePair = function (symbol) {
        var _this = this;
        this.bases.forEach(function (b) {
            if (_this.has(symbol + "b"))
                return symbol + "b";
        });
        return null;
    };
    Listing.prototype.getUSDValue = function (infra, listing) {
        var pair = infra + "USDT";
        if (pair in listing)
            return { ask: parseFloat(listing[pair].ask), bid: parseFloat(listing[pair].bid) };
        else if (infra === "USDT")
            return { ask: 1, bid: 1 };
        else
            console.log("err", "unknown pair in listing", pair, listing);
    };
    Listing.prototype.getSortField = function (sortby, a) {
        if (sortby === "name")
            return a.supra;
        else if (sortby === "bid_ask_volume_ratio")
            return a.ratio;
        else if (sortby === "has_some_in_portfolio")
            return a.inptf;
        else if (sortby === "has_been_traded")
            return a.hasTraded;
    };
    Listing.prototype.getSortOrder = function (sortby) {
        if (sortby === "name")
            return -1;
        else if (sortby === "bid_ask_volume_ratio")
            return 1;
        else if (sortby === "has_some_in_portfolio")
            return 1;
        else if (sortby === "has_been_traded")
            return 1;
    };
    Listing.prototype.sort = function (sortby) {
        var _this = this;
        //console.log("SORTA", this.content)
        var order = this.getSortOrder(sortby);
        var C = [];
        for (var k in this.content)
            C.push(this.content[k]);
        C.sort(function (a, b) {
            var keyA = _this.getSortField(sortby, a), keyB = _this.getSortField(sortby, b);
            if (keyA < keyB)
                return order;
            if (keyA > keyB)
                return -1 * order;
            else
                return a.supra < b.supra ? -1 : 1;
        });
        return C;
    };
    Listing.prototype.getList = function (sortby, format) {
        var res = this.sort(sortby);
        if (format == "change")
            this.tradingService.getBrokerByName(this.key).getTicker().appendChange(res);
        return res;
    };
    Listing.prototype.add = function (pair, broker, bid, ask, bids, asks, infra, supra, inptf, usdask, usdbid, hasTraded) {
        if (pair in this.content) {
            this.content[pair].oldask = this.content[pair].ask;
            this.content[pair].oldbid = this.content[pair].bid;
            this.content[pair].ask = ask;
            this.content[pair].bid = bid;
            this.content[pair].asks = asks;
            this.content[pair].bids = bids;
            this.content[pair].hasTraded = hasTraded;
            this.content[pair].usdbid = usdbid;
            this.content[pair].usdask = usdask;
            this.content[pair].inptf = inptf;
            this.content[pair].ratio = bids / (asks + bids);
        }
        else {
            this.content[pair] = {
                pair: pair,
                inptf: inptf,
                infra: infra,
                broker: broker,
                supra: supra,
                bid: bid,
                hasTraded: hasTraded,
                ask: ask,
                bids: bids,
                asks: asks,
                ratio: bids / (bids + asks),
                usdask: usdask,
                usdbid: usdbid
            };
        }
    };
    return Listing;
}());
exports.Listing = Listing;
