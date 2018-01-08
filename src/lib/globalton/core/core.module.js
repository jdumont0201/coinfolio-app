"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var request_service_1 = require("./services/request.service");
var console_service_1 = require("./services/console.service");
var message_service_1 = require("./services/message.service");
var config_service_1 = require("./services/config.service");
var api_service_1 = require("./services/api.service");
var auth_service_1 = require("./services/auth.service");
var core_2 = require("@ngx-translate/core");
var ngx_facebook_1 = require("ngx-facebook");
var currency_service_1 = require("./services/currency.service");
var websocket_service_1 = require("./services/websocket.service");
var GlobaltonCoreModule = (function () {
    function GlobaltonCoreModule() {
    }
    GlobaltonCoreModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule
                /*TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [Http]
                    }
                })*/
                // NativeScriptModule
                //        IonicModule.forRoot(null)
            ],
            declarations: [],
            exports: [],
            entryComponents: [],
            providers: [request_service_1.RequestService, websocket_service_1.WebsocketService, api_service_1.ApiService, auth_service_1.AuthService, core_2.TranslateService, ngx_facebook_1.FacebookService, currency_service_1.CurrencyService, console_service_1.ConsoleService, message_service_1.MessageService, config_service_1.ConfigService]
        })
    ], GlobaltonCoreModule);
    return GlobaltonCoreModule;
}());
exports.GlobaltonCoreModule = GlobaltonCoreModule;
//# sourceMappingURL=core.module.js.map