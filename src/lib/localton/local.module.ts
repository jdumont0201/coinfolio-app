import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {DataService} from "./services/data.service"
import {AppConfigService} from "./services/appconfig.service";
import {ImportService} from "./services/import.service";
import {EventService} from "./services/event.service";
import {WorkspaceService} from "./services/workspace.service";
import {TradingService} from "./services/trading.service";

@NgModule({
    imports: [
        CommonModule,
      HttpClientModule

    ],
    declarations: [

    ],
    exports: [],
    entryComponents:[],
    providers: [DataService,TradingService,AppConfigService,ImportService,EventService,WorkspaceService]
})
export class LocalModule {

}
