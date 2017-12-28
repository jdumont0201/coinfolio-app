"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var currency_service_1 = require("../services/currency.service");
var UserCurrencyPipe = (function () {
    function UserCurrencyPipe(currencyService) {
        this.currencyService = currencyService;
    }
    UserCurrencyPipe.prototype.transform = function (price, args) {
        if (!price) {
            return null;
        }
        if (!price.currencyCode) {
            console.warn("no price currency", price);
            return null;
        }
        var originalPrice = price;
        var userCurrency = this.currencyService.getUserCurrency();
        if (originalPrice.currencyCode !== userCurrency) {
            price = this.currencyService.convert(originalPrice, userCurrency);
        }
        price.value = Math.ceil(price.value);
        if (!userCurrency) {
            userCurrency = "USD";
            console.error("User Currency not defined");
        }
        var locale = "fr"; //todo
        var c = new common_1.CurrencyPipe(locale);
        return c.transform(price.value, userCurrency, true, ".2-2");
    };
    return UserCurrencyPipe;
}());
UserCurrencyPipe = __decorate([
    core_1.Injectable(),
    core_1.Pipe({
        name: 'usercurrency',
        pure: false
    }),
    __param(0, core_1.Inject(currency_service_1.CurrencyService)),
    __metadata("design:paramtypes", [currency_service_1.CurrencyService])
], UserCurrencyPipe);
exports.UserCurrencyPipe = UserCurrencyPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcmN1cnJlbmN5LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyY3VycmVuY3kucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNDQUE2RztBQUU3RywwQ0FBNkM7QUFDN0MsaUVBQTZEO0FBUzdELElBQWEsZ0JBQWdCO0lBRXhCLDBCQUM4QixlQUFnQztRQUUzRCxJQUFJLENBQUMsZUFBZSxHQUFDLGVBQWUsQ0FBQztJQUN6QyxDQUFDO0lBQ0Qsb0NBQVMsR0FBVCxVQUFVLEtBQVcsRUFBRSxJQUFjO1FBQ2pDLEVBQUUsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFBQSxDQUFDO1FBQ2pCLEVBQUUsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBLENBQUM7WUFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBQyxLQUFLLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRixJQUFJLGFBQWEsR0FBTyxLQUFLLENBQUM7UUFDOUIsSUFBSSxZQUFZLEdBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4RCxFQUFFLENBQUEsQ0FBQyxhQUFhLENBQUMsWUFBWSxLQUFHLFlBQVksQ0FBQyxDQUFBLENBQUM7WUFDMUMsS0FBSyxHQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBQyxZQUFZLENBQUMsQ0FBQztRQUNuRSxDQUFDO1FBRUQsS0FBSyxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxFQUFFLENBQUEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFBLENBQUM7WUFDaEIsWUFBWSxHQUFDLEtBQUssQ0FBQztZQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUNELElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxDQUFBLE1BQU07UUFDdEIsSUFBSSxDQUFDLEdBQUMsSUFBSSxxQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxNQUFNLENBQUMsQ0FBQztJQUU3RCxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBL0JELElBK0JDO0FBL0JZLGdCQUFnQjtJQU41QixpQkFBVSxFQUFFO0lBQ1osV0FBSSxDQUFDO1FBQ0YsSUFBSSxFQUFFLGNBQWM7UUFFcEIsSUFBSSxFQUFFLEtBQUs7S0FDZCxDQUFDO0lBSVMsV0FBQSxhQUFNLENBQUMsa0NBQWUsQ0FBQyxDQUFBO3FDQUFrQixrQ0FBZTtHQUh0RCxnQkFBZ0IsQ0ErQjVCO0FBL0JZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge0luamVjdCxJbnB1dCwgSW5qZWN0YWJsZSwgSW5qZWN0b3IsUGlwZVRyYW5zZm9ybSwgUGlwZSxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7SGVhZGVycywgSHR0cH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7Q3VycmVuY3lQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xyXG5pbXBvcnQge0N1cnJlbmN5U2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvY3VycmVuY3kuc2VydmljZSc7XHJcblxyXG5pbXBvcnQge1ByaWNlfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9pbnRlcmZhY2VzXCJcclxuQEluamVjdGFibGUoKVxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAndXNlcmN1cnJlbmN5JyxcclxuXHJcbiAgICBwdXJlOiBmYWxzZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVXNlckN1cnJlbmN5UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gICAgY3VycmVuY3lTZXJ2aWNlOkN1cnJlbmN5U2VydmljZTtcclxuICAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgIEBJbmplY3QoQ3VycmVuY3lTZXJ2aWNlKSBjdXJyZW5jeVNlcnZpY2U6IEN1cnJlbmN5U2VydmljZVxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW5jeVNlcnZpY2U9Y3VycmVuY3lTZXJ2aWNlO1xyXG4gICAgfVxyXG4gICAgdHJhbnNmb3JtKHByaWNlOlByaWNlLCBhcmdzOiBzdHJpbmdbXSk6IGFueSB7IC8vaW1wcm92ZSA6IHNldCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB0byB1cGRhdGUgb25seSBvbmNlXHJcbiAgICAgICAgaWYoIXByaWNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO31cclxuICAgICAgICBpZighcHJpY2UuY3VycmVuY3lDb2RlKXtcclxuICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIm5vIHByaWNlIGN1cnJlbmN5XCIscHJpY2UpO1xyXG4gICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgIH1cclxuICAgICAgICBsZXQgb3JpZ2luYWxQcmljZTpQcmljZT1wcmljZTtcclxuICAgICAgICBsZXQgdXNlckN1cnJlbmN5PXRoaXMuY3VycmVuY3lTZXJ2aWNlLmdldFVzZXJDdXJyZW5jeSgpO1xyXG4gICAgICAgICBcclxuICAgICAgICBpZihvcmlnaW5hbFByaWNlLmN1cnJlbmN5Q29kZSE9PXVzZXJDdXJyZW5jeSl7XHJcbiAgICAgICAgICAgIHByaWNlPXRoaXMuY3VycmVuY3lTZXJ2aWNlLmNvbnZlcnQob3JpZ2luYWxQcmljZSx1c2VyQ3VycmVuY3kpOyAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpY2UudmFsdWU9TWF0aC5jZWlsKHByaWNlLnZhbHVlKTtcclxuICAgICAgICBpZighdXNlckN1cnJlbmN5KXtcclxuICAgICAgICAgIHVzZXJDdXJyZW5jeT1cIlVTRFwiO1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlVzZXIgQ3VycmVuY3kgbm90IGRlZmluZWRcIik7ICBcclxuICAgICAgICB9IFxyXG4gICAgICAgIHZhciBsb2NhbGU9XCJmclwiOy8vdG9kb1xyXG4gICAgICAgIHZhciBjPW5ldyBDdXJyZW5jeVBpcGUobG9jYWxlKTtcclxuICAgICAgICByZXR1cm4gYy50cmFuc2Zvcm0ocHJpY2UudmFsdWUsdXNlckN1cnJlbmN5LHRydWUsXCIuMi0yXCIpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59Il19