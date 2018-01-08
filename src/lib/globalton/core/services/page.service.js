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
var common_1 = require("@angular/common");
var message_service_1 = require("./message.service");
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
    function PageService(messageService, configService, headerService, authService, apiService, currencyService, consoleService, optionsBarService, location) {
        this.messageService = messageService;
        this.configService = configService;
        this.headerService = headerService;
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
    PageService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [message_service_1.MessageService,
            config_service_1.ConfigService,
            header_service_1.HeaderService,
            auth_service_1.AuthService,
            api_service_1.ApiService,
            currency_service_1.CurrencyService,
            console_service_1.ConsoleService,
            optionsbar_service_1.OptionsBarService,
            common_1.Location])
    ], PageService);
    return PageService;
}());
exports.PageService = PageService;
//# sourceMappingURL=page.service.js.map