"use strict";
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
    return CurrencyService;
}());
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
exports.CurrencyService = CurrencyService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3kuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1cnJlbmN5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUU7QUFDakUsc0NBQXdEO0FBQ3hELHNDQUE0QztBQUM1QyxpQ0FBK0I7QUFDL0IscUNBQW1DO0FBT25DLG1DQUFpQztBQUdqQyxxREFBaUQ7QUFDakQscURBQWlEO0FBQ2pELG1EQUErQztBQU8vQyxJQUFhLGVBQWU7SUFTeEIseUJBQ1ksSUFBVSxFQUNWLGFBQTRCLEVBQzVCLGNBQThCLEVBQzlCLGNBQThCO1FBSDlCLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBWmhDLHdCQUFtQixHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUM1RCxvQkFBZSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUlsRSxVQUFLLEdBQThCLEVBQUUsQ0FBQztRQUN0QyxlQUFVLEdBQWUsRUFBRSxDQUFDO1FBT3hCLGNBQWMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUV6QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFFNUIsQ0FBQztJQUNELDBDQUFnQixHQUFoQjtRQUNJLElBQUksR0FBRyxHQUFXLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7UUFFdEQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFBLENBQUM7WUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLENBQUMsQ0FB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QUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFbEcsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBQ0QscUNBQVcsR0FBWCxVQUFZLFlBQW9CO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxZQUFZLENBQUM7UUFDeEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBQ0QseUNBQWUsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDcEMsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQTNHRCxJQTJHQztBQTFHYTtJQUFULGFBQU0sRUFBRTs4QkFBc0IsbUJBQVk7NERBQTJCO0FBQzVEO0lBQVQsYUFBTSxFQUFFOzhCQUFrQixtQkFBWTt3REFBMkI7QUFGekQsZUFBZTtJQUQzQixpQkFBVSxFQUFFO3FDQVdTLFdBQUk7UUFDSyw4QkFBYTtRQUNaLGdDQUFjO1FBQ2QsZ0NBQWM7R0FiakMsZUFBZSxDQTJHM0I7QUEzR1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIFByb3ZpZGVyLCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbXBvbmVudCwgT3V0cHV0fSAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0hlYWRlcnMsIEh0dHB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdGltZW91dCc7XHJcblxyXG5pbXBvcnQge0luamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBSZXNwb25zZX0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJ1xyXG5cclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9zaGFyZSc7XHJcblxyXG5pbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tICcuL21lc3NhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7UmVxdWVzdFNlcnZpY2V9IGZyb20gJy4vcmVxdWVzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHtDb25zb2xlU2VydmljZX0gZnJvbSAnLi9jb25zb2xlLnNlcnZpY2UnO1xyXG5pbXBvcnQge0NvbmZpZ1NlcnZpY2V9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5cclxuXHJcbmltcG9ydCB7UHJpY2V9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ludGVyZmFjZXNcIlxyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEN1cnJlbmN5U2VydmljZSB7XHJcbiAgICBAT3V0cHV0KCkgY3VycmVuY3lSYXRlc0xvYWRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgY3VycmVuY3lDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBwcml2YXRlIGN1cnJlbnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuXHJcbiAgICByYXRlczogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xyXG4gICAgcmF0ZXNUYWJsZTogbnVtYmVyW11bXSA9IFtdO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHAsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29uc29sZVNlcnZpY2U6IENvbnNvbGVTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcmVxdWVzdFNlcnZpY2U6IFJlcXVlc3RTZXJ2aWNlKSB7XHJcbiAgICAgICAgY29uc29sZVNlcnZpY2Uuc2VydihcIisgQ3VycmVuY3lTZXJ2aWNlXCIpO1xyXG5cclxuICAgICAgICB0aGlzLnByb2Nlc3NGaWxlKEpTT04ucGFyc2UodGhpcy5jb25maWdTZXJ2aWNlLmRlZmF1bHRDdXJyZW5jeVJhdGVzKSk7XHJcbiAgICAgICAgdGhpcy5sb2FkQ3VycmVuY3lGaWxlKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBsb2FkQ3VycmVuY3lGaWxlKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuY29uZmlnU2VydmljZS5jdXJyZW5jeVJhdGVzQXBpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuY29uZmlnU2VydmljZS5yZW5ld0N1cnJlbmN5RmlsZUF0U3RhcnR1cCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ3VycmVuY3lTZXJ2aWNlIGxvYWRpbmcgXCIsIHVybCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdFNlcnZpY2UuZ2V0KHVybCxmdW5jdGlvbihyZXN1bHQpe1xyXG4gICAgICAgICAgICAgIGlmKHJlc3VsdC5lcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NGaWxlKHJlc3VsdC5maWxlKTtcclxuICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgfSAsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICBjb252ZXJ0VG9Vc2VyQ3VycmVuY3kocHJpY2U6UHJpY2UpOlByaWNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0KHByaWNlLCB0aGlzLmdldFVzZXJDdXJyZW5jeSgpKTtcclxuICAgIH1cclxuICAgIGNvbnZlcnQob3JpZ2luYWxQcmljZTpQcmljZSwgZGVzdGluYXRpb25DdXJyZW5jeTogc3RyaW5nKTogUHJpY2Uge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJjb252ZXJ0XCIsIG9yaWdpbmFsVmFsdWUsIG9yaWdpbmFsQ3VycmVuY3ksIGRlc3RpbmF0aW9uQ3VycmVuY3ksIHRoaXMucmF0ZXNUYWJsZSk7XHJcbiAgICAgICAgaWYgKCFvcmlnaW5hbFByaWNlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkN1cnJlbmN5U2VydmljZSBjb252ZXJ0IG9yaWdpbmFsVmFsdWU9XCIsIG9yaWdpbmFsUHJpY2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghKG9yaWdpbmFsUHJpY2UuY3VycmVuY3lDb2RlIGluIHRoaXMuY29uZmlnU2VydmljZS51c2VkQ3VycmVuY2llcykpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ3VycmVuY3lTZXJ2aWNlIGNvbnZlcnQgdW5rbm93biBvcmlnaW5hbEN1cnJlbmN5PVwiLCBvcmlnaW5hbFByaWNlLmN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIShkZXN0aW5hdGlvbkN1cnJlbmN5IGluIHRoaXMuY29uZmlnU2VydmljZS5zdXBwb3J0ZWRDdXJyZW5jaWVzKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJDdXJyZW5jeVNlcnZpY2UgY29udmVydCB1bmtub3duIGRlc3RpbmF0aW9uQ3VycmVuY3k9XCIsIGRlc3RpbmF0aW9uQ3VycmVuY3kpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcmlnaW5hbFByaWNlLmN1cnJlbmN5Q29kZSA9PT0gZGVzdGluYXRpb25DdXJyZW5jeSlcclxuICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsUHJpY2U7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmF0ZVwiLHRoaXMucmF0ZXNUYWJsZSxvcmlnaW5hbEN1cnJlbmN5LGRlc3RpbmF0aW9uQ3VycmVuY3kpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJhdGVcIix0aGlzLnJhdGVzVGFibGVbb3JpZ2luYWxDdXJyZW5jeV1bZGVzdGluYXRpb25DdXJyZW5jeV0pXHJcbiAgICAgICAgICAgIHJldHVybiB7dmFsdWU6b3JpZ2luYWxQcmljZS52YWx1ZSAqIHRoaXMucmF0ZXNUYWJsZVtvcmlnaW5hbFByaWNlLmN1cnJlbmN5Q29kZV1bZGVzdGluYXRpb25DdXJyZW5jeV0sY3VycmVuY3lDb2RlOmRlc3RpbmF0aW9uQ3VycmVuY3l9O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG4gICAgcHJvY2Vzc0ZpbGUoZmlsZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXJyZW5jeVNlcnZpY2UgZG9uZSBkb3dubG9hZGluZyBmaWxlPVwiLCBmaWxlLCBcInJhdGVzPVwiLCBmaWxlLnJhdGVzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRoaXNcIiwgdGhpcyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzcmF0ZXNcIiwgdGhpcy5yYXRlcyk7XHJcbiAgICAgICAgdGhpcy5yYXRlcyA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGN1cnJlbmN5IGluIGZpbGUucmF0ZXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaGVja1wiLCBjdXJyZW5jeSwgZmlsZS5yYXRlc1tjdXJyZW5jeV0pO1xyXG4gICAgICAgICAgICBsZXQgdmFsID0gcGFyc2VGbG9hdChmaWxlLnJhdGVzW2N1cnJlbmN5XSk7XHJcbiAgICAgICAgICAgIHRoaXMucmF0ZXNbY3VycmVuY3ldID0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5idWlsZFRhYmxlKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXJyZW5jeVRhYmxlXCIsIHRoaXMucmF0ZXNUYWJsZSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW5jeVJhdGVzTG9hZGVkLm5leHQoe30pO1xyXG4gICAgfVxyXG4gICAgYnVpbGRUYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImJ1aWxkVGFibGVcIiwgdGhpcy5yYXRlcyk7XHJcbiAgICAgICAgdGhpcy5yYXRlc1RhYmxlID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgY3VycmVuY3kgaW4gdGhpcy5jb25maWdTZXJ2aWNlLnVzZWRDdXJyZW5jaWVzKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnJhdGVzVGFibGVbY3VycmVuY3ldID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGN1cnJlbmN5RGVzdCBpbiB0aGlzLmNvbmZpZ1NlcnZpY2UudXNlZEN1cnJlbmNpZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVuY3kgPT09IGN1cnJlbmN5RGVzdClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJhdGVzVGFibGVbY3VycmVuY3ldW2N1cnJlbmN5RGVzdF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVuY3kgPT09IFwiVVNEXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yYXRlc1RhYmxlW2N1cnJlbmN5XVtjdXJyZW5jeURlc3RdID0gdGhpcy5yYXRlc1tjdXJyZW5jeURlc3RdO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVuY3lEZXN0ID09PSBcIlVTRFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmF0ZXNUYWJsZVtjdXJyZW5jeV1bY3VycmVuY3lEZXN0XSA9IDEgLyB0aGlzLnJhdGVzW2N1cnJlbmN5XTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJhdGVzVGFibGVbY3VycmVuY3ldW2N1cnJlbmN5RGVzdF0gPSB0aGlzLnJhdGVzW2N1cnJlbmN5RGVzdF0gLyB0aGlzLnJhdGVzW2N1cnJlbmN5XTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXRDdXJyZW5jeShjdXJyZW5jeUNvZGU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2V0TGFuZ3VhZ2VcIiwgY3VycmVuY3lDb2RlKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRDdXJyZW5jeUNvZGUgPSBjdXJyZW5jeUNvZGU7XHJcbiAgICAgICAgdGhpcy5jdXJyZW5jeVJhdGVzTG9hZGVkLm5leHQodGhpcy5jdXJyZW50Q3VycmVuY3lDb2RlKTtcclxuICAgIH1cclxuICAgIGdldFVzZXJDdXJyZW5jeSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRDdXJyZW5jeUNvZGU7XHJcbiAgICB9XHJcbn0iXX0=