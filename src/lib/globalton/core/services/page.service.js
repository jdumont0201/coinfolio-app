"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var message_service_1 = require("./message.service");
var model_service_1 = require("./model.service");
var api_service_1 = require("./api.service");
var console_service_1 = require("./console.service");
var config_service_1 = require("./config.service");
//import { SelectOptionSet} from '../directives/elements/Forms';
var optionsbar_service_1 = require("./optionsbar.service");
var auth_service_1 = require("./auth.service");
var header_service_1 = require("./header.service");
var currency_service_1 = require("../services/currency.service");
var PageConfig = (function () {
    function PageConfig(headerInterface, optionsBarConfig) {
        this.headerInterface = headerInterface;
        this.optionsBarConfig = optionsBarConfig;
    }
    ;
    return PageConfig;
}());
exports.PageConfig = PageConfig;
var PageService = (function () {
    function PageService(messageService, configService, headerService, modelService, authService, apiService, currencyService, consoleService, optionsBarService, location) {
        this.messageService = messageService;
        this.configService = configService;
        this.headerService = headerService;
        this.modelService = modelService;
        this.authService = authService;
        this.apiService = apiService;
        this.currencyService = currencyService;
        this.consoleService = consoleService;
        this.optionsBarService = optionsBarService;
        this.location = location;
        consoleService.serv("+ PageService");
    }
    PageService.prototype.setHeader = function (h) {
        this.consoleService.serv("setHeader", h);
        this.headerService.setHeader(new header_service_1.Header(h));
    };
    PageService.prototype.preparePage = function (pageConfig) {
        this.consoleService.serv("Prepage Page", pageConfig);
        if (this.authService) {
            // console.log(" ✓ PageService authService set");
        }
        else {
            console.warn(" ✘ PageService authService not set");
        }
        if (this.headerService) {
            console.log("setheader", pageConfig);
            // console.log(" ✓ PageService headerService set",pageConfig.headerInterface);
            this.headerService.setHeader(new header_service_1.Header(pageConfig.headerInterface));
        }
        else
            console.warn(" ✘ PageService headerService not set");
        if (this.optionsBarService) {
            this.optionsBarService.setOptions(pageConfig.optionsBarConfig);
            // console.log(" ✓ PageService optionsBarService set");
        }
        else
            console.warn(" ✘ PageService optionsBarService not set");
        if (this.messageService) {
            //this.messageService.resetErrors();
            this.messageService.resetFlash();
            // console.log(" ✓ PageService messageService set");
        }
        else
            console.warn(" ✘ PageService messageService not set");
    };
    PageService.prototype.loadCountryStates = function (countryCode, thi) {
        /*  this.apiService.noauthget("country/" + countryCode, (r) => {
              if (r.states)
                  thi.selectContent["region"]=new SelectOptionSet(r.states).getSet();
              else {
                  thi.model.region = countryCode;
                  thi.selectContent["region"]=new SelectOptionSet({ countryCode: this.configService.countryList[countryCode] }).getSet();
              }
          });*/
    };
    return PageService;
}());
PageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        config_service_1.ConfigService,
        header_service_1.HeaderService,
        model_service_1.ModelService,
        auth_service_1.AuthService,
        api_service_1.ApiService,
        currency_service_1.CurrencyService,
        console_service_1.ConsoleService,
        optionsbar_service_1.OptionsBarService,
        common_1.Location])
], PageService);
exports.PageService = PageService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQXVFO0FBRXZFLDBDQUF5QztBQUN6QyxxREFBaUQ7QUFDakQsaURBQTZDO0FBQzdDLDZDQUF5QztBQUN6QyxxREFBaUQ7QUFDakQsbURBQStDO0FBRS9DLGdFQUFnRTtBQUVoRSwyREFBeUU7QUFDekUsK0NBQTJDO0FBQzNDLG1EQUF3RTtBQUN4RSxpRUFBNkQ7QUFHN0Q7SUFHSSxvQkFBWSxlQUFnQyxFQUFFLGdCQUFrQztRQUM1RSxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7SUFDN0MsQ0FBQztJQUFBLENBQUM7SUFDTixpQkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBUFksZ0NBQVU7QUFTdkIsSUFBYSxXQUFXO0lBQ3BCLHFCQUNXLGNBQThCLEVBQzlCLGFBQTRCLEVBQzVCLGFBQTRCLEVBQzVCLFlBQTBCLEVBQzFCLFdBQXdCLEVBQ3hCLFVBQXNCLEVBQ3RCLGVBQWdDLEVBQ2hDLGNBQThCLEVBQzlCLGlCQUFvQyxFQUVwQyxRQUFrQjtRQVZsQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFFcEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUV6QixjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRXpDLENBQUM7SUFJRCwrQkFBUyxHQUFULFVBQVUsQ0FBa0I7UUFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksdUJBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDRCxpQ0FBVyxHQUFYLFVBQVksVUFBc0I7UUFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25CLGlEQUFpRDtRQUNyRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixPQUFPLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLDhFQUE4RTtZQUM5RSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHVCQUFNLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFFekUsQ0FBQztRQUFDLElBQUk7WUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDekQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQy9ELHVEQUF1RDtRQUMzRCxDQUFDO1FBQUMsSUFBSTtZQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsMENBQTBDLENBQUMsQ0FBQztRQUM3RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN0QixvQ0FBb0M7WUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNqQyxvREFBb0Q7UUFDeEQsQ0FBQztRQUFDLElBQUk7WUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUNELHVDQUFpQixHQUFqQixVQUFrQixXQUFtQixFQUFFLEdBQU87UUFDNUM7Ozs7Ozs7ZUFPTztJQUNULENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUE1REQsSUE0REM7QUE1RFksV0FBVztJQUR2QixpQkFBVSxFQUFFO3FDQUdrQixnQ0FBYztRQUNmLDhCQUFhO1FBQ2IsOEJBQWE7UUFDZCw0QkFBWTtRQUNiLDBCQUFXO1FBQ1osd0JBQVU7UUFDTCxrQ0FBZTtRQUNoQixnQ0FBYztRQUNYLHNDQUFpQjtRQUUxQixpQkFBUTtHQVpwQixXQUFXLENBNER2QjtBQTVEWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SHR0cCwgSGVhZGVyc30gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gJy4vbWVzc2FnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHtNb2RlbFNlcnZpY2V9IGZyb20gJy4vbW9kZWwuc2VydmljZSc7XHJcbmltcG9ydCB7QXBpU2VydmljZX0gZnJvbSAnLi9hcGkuc2VydmljZSc7XHJcbmltcG9ydCB7Q29uc29sZVNlcnZpY2V9IGZyb20gJy4vY29uc29sZS5zZXJ2aWNlJztcclxuaW1wb3J0IHtDb25maWdTZXJ2aWNlfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuXHJcbi8vaW1wb3J0IHsgU2VsZWN0T3B0aW9uU2V0fSBmcm9tICcuLi9kaXJlY3RpdmVzL2VsZW1lbnRzL0Zvcm1zJztcclxuXHJcbmltcG9ydCB7T3B0aW9uc0JhclNlcnZpY2UsIE9wdGlvbnNCYXJDb25maWd9IGZyb20gJy4vb3B0aW9uc2Jhci5zZXJ2aWNlJztcclxuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQge0hlYWRlciwgSGVhZGVySW50ZXJmYWNlLCBIZWFkZXJTZXJ2aWNlfSBmcm9tICcuL2hlYWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHtDdXJyZW5jeVNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2N1cnJlbmN5LnNlcnZpY2UnO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBQYWdlQ29uZmlnIHtcclxuICAgIGhlYWRlckludGVyZmFjZTogSGVhZGVySW50ZXJmYWNlO1xyXG4gICAgb3B0aW9uc0JhckNvbmZpZzogT3B0aW9uc0JhckNvbmZpZ1xyXG4gICAgY29uc3RydWN0b3IoaGVhZGVySW50ZXJmYWNlOiBIZWFkZXJJbnRlcmZhY2UsIG9wdGlvbnNCYXJDb25maWc6IE9wdGlvbnNCYXJDb25maWcpIHtcclxuICAgICAgICB0aGlzLmhlYWRlckludGVyZmFjZSA9IGhlYWRlckludGVyZmFjZTtcclxuICAgICAgICB0aGlzLm9wdGlvbnNCYXJDb25maWcgPSBvcHRpb25zQmFyQ29uZmlnO1xyXG4gICAgfTtcclxufVxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQYWdlU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyBoZWFkZXJTZXJ2aWNlOiBIZWFkZXJTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyBtb2RlbFNlcnZpY2U6IE1vZGVsU2VydmljZSxcclxuICAgICAgICBwdWJsaWMgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyBhcGlTZXJ2aWNlOiBBcGlTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyBjdXJyZW5jeVNlcnZpY2U6IEN1cnJlbmN5U2VydmljZSxcclxuICAgICAgICBwdWJsaWMgY29uc29sZVNlcnZpY2U6IENvbnNvbGVTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyBvcHRpb25zQmFyU2VydmljZTogT3B0aW9uc0JhclNlcnZpY2UsXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIGxvY2F0aW9uOiBMb2NhdGlvblxyXG4gICAgKSB7XHJcbiAgICAgICAgY29uc29sZVNlcnZpY2Uuc2VydihcIisgUGFnZVNlcnZpY2VcIik7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgc2V0SGVhZGVyKGg6IEhlYWRlckludGVyZmFjZSkge1xyXG4gICAgICAgIHRoaXMuY29uc29sZVNlcnZpY2Uuc2VydihcInNldEhlYWRlclwiLCBoKTtcclxuICAgICAgICB0aGlzLmhlYWRlclNlcnZpY2Uuc2V0SGVhZGVyKG5ldyBIZWFkZXIoaCkpO1xyXG4gICAgfVxyXG4gICAgcHJlcGFyZVBhZ2UocGFnZUNvbmZpZzogUGFnZUNvbmZpZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29uc29sZVNlcnZpY2Uuc2VydihcIlByZXBhZ2UgUGFnZVwiLCBwYWdlQ29uZmlnKTtcclxuICAgICAgICBpZiAodGhpcy5hdXRoU2VydmljZSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiDinJMgUGFnZVNlcnZpY2UgYXV0aFNlcnZpY2Ugc2V0XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIiDinJggUGFnZVNlcnZpY2UgYXV0aFNlcnZpY2Ugbm90IHNldFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyU2VydmljZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNldGhlYWRlclwiLCBwYWdlQ29uZmlnKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIg4pyTIFBhZ2VTZXJ2aWNlIGhlYWRlclNlcnZpY2Ugc2V0XCIscGFnZUNvbmZpZy5oZWFkZXJJbnRlcmZhY2UpO1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRlclNlcnZpY2Uuc2V0SGVhZGVyKG5ldyBIZWFkZXIocGFnZUNvbmZpZy5oZWFkZXJJbnRlcmZhY2UpKTtcclxuXHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIiDinJggUGFnZVNlcnZpY2UgaGVhZGVyU2VydmljZSBub3Qgc2V0XCIpO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNCYXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0JhclNlcnZpY2Uuc2V0T3B0aW9ucyhwYWdlQ29uZmlnLm9wdGlvbnNCYXJDb25maWcpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiDinJMgUGFnZVNlcnZpY2Ugb3B0aW9uc0JhclNlcnZpY2Ugc2V0XCIpO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCIg4pyYIFBhZ2VTZXJ2aWNlIG9wdGlvbnNCYXJTZXJ2aWNlIG5vdCBzZXRcIik7XHJcbiAgICAgICAgaWYgKHRoaXMubWVzc2FnZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgLy90aGlzLm1lc3NhZ2VTZXJ2aWNlLnJlc2V0RXJyb3JzKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UucmVzZXRGbGFzaCgpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiDinJMgUGFnZVNlcnZpY2UgbWVzc2FnZVNlcnZpY2Ugc2V0XCIpO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCIg4pyYIFBhZ2VTZXJ2aWNlIG1lc3NhZ2VTZXJ2aWNlIG5vdCBzZXRcIik7XHJcbiAgICB9XHJcbiAgICBsb2FkQ291bnRyeVN0YXRlcyhjb3VudHJ5Q29kZTogc3RyaW5nLCB0aGk6YW55KTogdm9pZCB7XHJcbiAgICAgIC8qICB0aGlzLmFwaVNlcnZpY2Uubm9hdXRoZ2V0KFwiY291bnRyeS9cIiArIGNvdW50cnlDb2RlLCAocikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoci5zdGF0ZXMpXHJcbiAgICAgICAgICAgICAgICB0aGkuc2VsZWN0Q29udGVudFtcInJlZ2lvblwiXT1uZXcgU2VsZWN0T3B0aW9uU2V0KHIuc3RhdGVzKS5nZXRTZXQoKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGkubW9kZWwucmVnaW9uID0gY291bnRyeUNvZGU7XHJcbiAgICAgICAgICAgICAgICB0aGkuc2VsZWN0Q29udGVudFtcInJlZ2lvblwiXT1uZXcgU2VsZWN0T3B0aW9uU2V0KHsgY291bnRyeUNvZGU6IHRoaXMuY29uZmlnU2VydmljZS5jb3VudHJ5TGlzdFtjb3VudHJ5Q29kZV0gfSkuZ2V0U2V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTsqL1xyXG4gICAgfVxyXG59XHJcbiJdfQ==