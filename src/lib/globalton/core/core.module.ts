import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import{RequestService} from "./services/request.service"
import {ConsoleService} from "./services/console.service"
import {MessageService} from "./services/message.service"
import {ConfigService} from "./services/config.service"
import {ApiService} from "./services/api.service";
import {AuthService} from "./services/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {FacebookService} from "ngx-facebook";
import {CurrencyService} from "./services/currency.service";
import {WebsocketService} from "./services/websocket.service";
import {ProxyService} from "./services/proxy.service";

@NgModule({
    imports: [
        CommonModule,
      HttpClientModule
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
    declarations: [

    ],
    exports: [],
    entryComponents:[],
    providers: [RequestService,WebsocketService,ProxyService,ApiService,AuthService, TranslateService,FacebookService,CurrencyService,ConsoleService, MessageService,ConfigService]
})
export class GlobaltonCoreModule {

}
