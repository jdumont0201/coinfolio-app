"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("../../lib/localton/utils/utils");
var component_1 = require("../../lib/localton/components/PageWithTabs/component");
var AppSymbolAllPage = (function (_super) {
    __extends(AppSymbolAllPage, _super);
    function AppSymbolAllPage(requestService, tradingService, dataService, appConfigService, logic) {
        var _this = _super.call(this) || this;
        _this.requestService = requestService;
        _this.tradingService = tradingService;
        _this.dataService = dataService;
        _this.appConfigService = appConfigService;
        _this.logic = logic;
        _this.listing = [];
        _this.supports = ['BNB', 'BTC', 'ETH', 'USDT'];
        _this.isLoading = true;
        _this.showGraphs = false;
        _this.tradingService.reload();
        _this.logic.BinanceGetLivePrices(function (listing) {
            _this.isLoading = false;
            console.log(listing, utils_1.Crypto.getSymbolsFromPair);
            for (var k in listing) {
                var pair = utils_1.Crypto.getSymbolsFromPair(k);
                _this.listing.push({ symbol: k, supra: pair.supra, infra: pair.infra, price: listing[k] });
            }
            console.log("this", _this.listing);
            _this.listing.sort(function (a, b) {
                var keyA = a.supra, keyB = b.supra;
                if (keyA < keyB)
                    return 1;
                if (keyA > keyB)
                    return -1;
                return 0;
            });
            console.log("this", _this.listing);
        });
        return _this;
    }
    AppSymbolAllPage.prototype.setGraphView = function () {
        this.showGraphs = !this.showGraphs;
    };
    AppSymbolAllPage = __decorate([
        core_1.Component({
            selector: 'app-listing',
            templateUrl: 'template.html'
        }),
        core_1.Injectable()
    ], AppSymbolAllPage);
    return AppSymbolAllPage;
}(component_1.PageWithTabs));
exports.AppSymbolAllPage = AppSymbolAllPage;
