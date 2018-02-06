import {NgModule, ModuleWithProviders} from '@angular/core';

import {CommonModule, DecimalPipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {DataService} from "./services/data.service"
import {AppConfigService} from "./services/appconfig.service";
import {ImportService} from "./services/import.service";
import {EventService} from "./services/event.service";
import {WorkspaceService} from "./services/workspace.service";
import {TradingService} from "./services/trading.service";
import {FixedNbPipe} from "./pipes/fixednb";
import {RefreshService} from "./services/refresh.service";
import {Services} from "./services/services";
import {ProxyService} from "../globalton/core/services/proxy.service";
import {PublicDataService} from "./services/publicdata.service";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule

    ],
    declarations: [
        FixedNbPipe
    ],
    exports: [FixedNbPipe],
    entryComponents: [],
    providers: [DataService,RefreshService, Services,TradingService, AppConfigService, ImportService, EventService,PublicDataService, WorkspaceService,DecimalPipe]
})
export class LocalModule {

}
