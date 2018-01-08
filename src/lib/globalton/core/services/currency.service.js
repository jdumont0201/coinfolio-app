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
var core_2 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/timeout");
require("rxjs/add/operator/share");
var request_service_1 = require("./request.service");
var console_service_1 = require("./console.service");
var config_service_1 = require("./config.service");
var CurrencyService = (function () {
    function CurrencyService(http, configService, consoleService, requestService) {
        this.http = http;
        this.configService = configService;
        this.consoleService = consoleService;
        this.requestService = requestService;
        this.currencyRatesLoaded = new core_1.EventEmitter();
        this.currencyChanged = new core_1.EventEmitter();
        this.rates = {};
        this.ratesTable = [];
        consoleService.serv("+ CurrencyService");
        this.processFile(JSON.parse(this.configService.defaultCurrencyRates));
        this.loadCurrencyFile();
    }
    CurrencyService.prototype.loadCurrencyFile = function () {
        var url = this.configService.currencyRatesApi;
        if (this.configService.renewCurrencyFileAtStartup) {
            console.log("CurrencyService loading ", url);
            this.requestService.get(url, function (result) {
                if (result.error) {
                }
                else {
                    this.processFile(result.file);
                }
            }, this);
        }
    };
    CurrencyService.prototype.convertToUserCurrency = function (price) {
        return this.convert(price, this.getUserCurrency());
    };
    CurrencyService.prototype.convert = function (originalPrice, destinationCurrency) {
        //console.log("convert", originalValue, originalCurrency, destinationCurrency, this.ratesTable);
        if (!originalPrice) {
            console.warn("CurrencyService convert originalValue=", originalPrice);
            return null;
        }
        if (!(originalPrice.currencyCode in this.configService.usedCurrencies)) {
            console.warn("CurrencyService convert unknown originalCurrency=", originalPrice.currencyCode);
            return null;
        }
        if (!(destinationCurrency in this.configService.supportedCurrencies)) {
            console.warn("CurrencyService convert unknown destinationCurrency=", destinationCurrency);
            return null;
        }
        if (originalPrice.currencyCode === destinationCurrency)
            return originalPrice;
        else {
            // console.log("rate",this.ratesTable,originalCurrency,destinationCurrency);
            // console.log("rate",this.ratesTable[originalCurrency][destinationCurrency])
            return { value: originalPrice.value * this.ratesTable[originalPrice.currencyCode][destinationCurrency], currencyCode: destinationCurrency };
        }
    };
    CurrencyService.prototype.processFile = function (file) {
        console.log("CurrencyService done downloading file=", file, "rates=", file.rates);
        console.log("this", this);
        console.log("thisrates", this.rates);
        this.rates = {};
        for (var currency in file.rates) {
            console.log("check", currency, file.rates[currency]);
            var val = parseFloat(file.rates[currency]);
            this.rates[currency] = val;
        }
        this.buildTable();
        console.log("CurrencyTable", this.ratesTable);
        this.currencyRatesLoaded.next({});
    };
    CurrencyService.prototype.buildTable = function () {
        console.log("buildTable", this.rates);
        this.ratesTable = [];
        for (var currency in this.configService.usedCurrencies) {
            this.ratesTable[currency] = [];
            for (var currencyDest in this.configService.usedCurrencies) {
                if (currency === currencyDest)
                    this.ratesTable[currency][currencyDest] = 1;
                else if (currency === "USD")
                    this.ratesTable[currency][currencyDest] = this.rates[currencyDest];
                else if (currencyDest === "USD")
                    this.ratesTable[currency][currencyDest] = 1 / this.rates[currency];
                else
                    this.ratesTable[currency][currencyDest] = this.rates[currencyDest] / this.rates[currency];
            }
        }
    };
    CurrencyService.prototype.setCurrency = function (currencyCode) {
        console.log("SetLanguage", currencyCode);
        this.currentCurrencyCode = currencyCode;
        this.currencyRatesLoaded.next(this.currentCurrencyCode);
    };
    CurrencyService.prototype.getUserCurrency = function () {
        return this.currentCurrencyCode;
    };
    __decorate([
        core_2.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CurrencyService.prototype, "currencyRatesLoaded", void 0);
    __decorate([
        core_2.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CurrencyService.prototype, "currencyChanged", void 0);
    CurrencyService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            config_service_1.ConfigService,
            console_service_1.ConsoleService,
            request_service_1.RequestService])
    ], CurrencyService);
    return CurrencyService;
}());
exports.CurrencyService = CurrencyService;
//# sourceMappingURL=currency.service.js.map