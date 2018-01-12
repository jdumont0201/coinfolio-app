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
    providers: [DataService,RefreshService, TradingService, AppConfigService, ImportService, EventService, WorkspaceService,DecimalPipe]
})
export class LocalModule {

}
