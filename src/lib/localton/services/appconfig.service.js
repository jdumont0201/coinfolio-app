"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppConfigService = (function () {
    function AppConfigService(configService, consoleService, apiService, authService, logic) {
        var _this = this;
        this.configService = configService;
        this.consoleService = consoleService;
        this.apiService = apiService;
        this.authService = authService;
        this.logic = logic;
        this.isCustomDashboardEnabled = false;
        this.possibleBrokers = ["binance", "kraken"];
        this.brokersLinks = { "binance": { signup: "", api: "https://www.binance.com/userCenter/createApi.html" }, "kraken": { api: "", signup: "" } };
        this.ohlcColors = {
            orange: {
                lineColor: '#3e91a0',
                color: '#b18215',
                upColor: 'transparent',
                downColor: '#b18215'
            },
            redgreen: {
                lineColor: '#3e91a0',
                color: '#b11a00',
                upColor: '#63c55b',
                downColor: '#b18215'
            },
            spec: {
                lineColor: '#becbcc',
                color: '#b12400',
                upColor: '#46c53e',
                downColor: '#b11c11'
            }
        };
        this.values = ["BTC", "ETH", "BCH", "XRP", "DASH", "XMR", "LTC", "ZEC"];
        this.valuesandglobal = ["GLOBAL"];
        this.formats = ["chart", "numeric"];
        this.listing = {
            GLOBA: { name: "Global", price: [], marketcap: ["aken"] },
            BTC: { name: "Bitcoin", price: ["kraken"], marketcap: ["cmc"] },
            ETH: { name: "Ethereum", price: ["kraken"], marketcap: ["cmc"] },
            XRP: { name: "Ripple", price: ["kraken"], marketcap: ["cmc"] },
            ZEC: { name: "ZCash", price: ["kraken"], marketcap: ["cmc"] },
            DASH: { name: "Dash", price: ["kraken"], marketcap: ["cmc"] },
            XMR: { name: "Monero", price: ["kraken"], marketcap: ["cmc"] },
            LTC: { name: "LiteCoin", price: ["kraken"], marketcap: ["cmc"] }
        };
        this.bases = ["USD", "EUR"];
        this.intervals = [1, 5, 15, 30, 60, 240, 1440];
        this.intervalNames = { 1: "1m", 5: "5m", 15: "15m", 30: "30m", 60: "1H", 240: "4H", 1440: "1D" };
        this.sources = { kraken: "kraken.com", "ccc": "cryptocurrencychart.com", "cmc": "coinmarketcap.com" };
        this.lastNames = { "last24h": "Last day", "last7d": "Last week", "last30d": "Last month" };
        this.times = ["last24h", "last7d", "last30d"];
        this.widgetConfig = {
            "PRICE_CHANGE": { time: true, symbol: true },
            "VOLUME_CHANGE": { time: true, symbol: true },
            "LATEST_NEWS": { time: false, symbol: true },
            "LATEST_TWEETS": { time: false, symbol: true },
            "CHART_MARKETCAP": { time: false, symbol: true },
            "CHART_PRICE": { time: false, symbol: true },
            "CHART_VOLUME": { time: false, symbol: true },
            "RANKING_MARKETCAP": { time: false, symbol: false },
            "PERF_LASTWEEK": { time: false, symbol: true, format: true },
            "EVOL_MARKETCAP_MINI": { time: true, symbol: false },
            "BITCOIN_DOMINANCE": { time: false, symbol: false },
            "TOP_ENTRIES": { time: false, symbol: false }
        };
        this.specialPanels = [{ id: 'SP_LISTING', type: "special", title: "Listing" }, {
                id: 'SP_SEPARATOR',
                type: "separator",
                title: "Separator"
            }];
        this.specialLinks = { 'SP_LISTING': "/listing" };
        this.widgets = [
            {
                code: "PRICE_CHANGE",
                title: "Price change",
                size: "1x1",
                id: 1,
            }, {
                title: "Volume change",
                code: "VOLUME_CHANGE",
                size: "1x1",
                id: 2
            }, {
                title: "Latest news",
                code: "LATEST_NEWS",
                size: "2x4",
                id: 3
            }, {
                title: "Latest tweets",
                code: "LATEST_TWEETS",
                size: "2x4",
                id: 4
            }, {
                title: "Market Cap Chart",
                code: "CHART_MARKETCAP",
                size: "4x4",
                id: 5
            }, {
                title: "Volume Chart",
                code: "CHART_VOLUME",
                size: "4x4",
                id: 7
            }, {
                title: "Price Chart",
                code: "CHART_PRICE",
                size: "4x4",
                id: 6
            }, {
                title: "Market cap rankings",
                code: "RANKING_MARKETCAP",
                size: "4x2",
                id: 8
            }, {
                title: "Market cap evol",
                code: "EVOL_MARKETCAP_MINI",
                size: "1x2",
                id: 9
            }, {
                title: "Perf last week",
                code: "PERF_LASTWEEK",
                size: "1x4",
                id: 10
            }, {
                title: "Bitcoin Dominance",
                code: "BITCOIN_DOMINANCE",
                size: "1x1",
                id: 11
            }, {
                title: "Top entries",
                code: "TOP_ENTRIES",
                size: "1x1",
                id: 11
            }
        ];
        consoleService.serv('APPCONFIG');
        this.generateListing();
        this.apiService.setApiUrl("http://34.242.69.165:3001/api/");
        this.apiService.setServerUrl("http://34.242.69.165:3001/");
        this.consoleService.serv("+ AppConfigService");
        this.configService.app = "comeoncoins";
        this.configService.perSiteConfigured.emit({ "type": "general" });
        if (this.authService.isAuthenticated())
            this.logic.readSubscription(function (res) {
                console.log("expiration", res);
                _this.authService.paymentExpiration = res.expiration;
                console.log("active", _this.authService.isSubscriptionActive(), _this.authService.authenticated, _this.authService.paymentExpiration, _this.authService.paymentExpiration > new Date().getTime() / 1000);
            });
    }
    AppConfigService.prototype.generateListing = function () {
        this.valuesandglobal.push.apply(this.valuesandglobal, this.values);
    };
    AppConfigService = __decorate([
        core_1.Injectable()
    ], AppConfigService);
    return AppConfigService;
}());
exports.AppConfigService = AppConfigService;
