import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service";
import {EventService} from "../../lib/localton/services/event.service";
import {Logic} from "../../logic/Logic";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {WorkspaceService} from "../../lib/localton/services/workspace.service";
import {Router} from "@angular/router";
import {TradingService} from "../../lib/localton/services/trading.service";
import {ApiService} from "../../lib/globalton/core/services/api.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {Refreshing} from "../../lib/localton/components/Refreshing/component";


@Component({
    selector: 'app-top-right-buttons',
    templateUrl: 'template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class AppTopRightButtons {

    @Input() searchCallback: Function
    @Input() placeholder: string
    searchedText: string;
    showSearch:boolean=true;


    constructor(public refreshService: RefreshService, public appConfigService: AppConfigService, public consoleService: ConsoleService, public eventService: EventService, public tradingService: TradingService, public apiService: ApiService, public logic: Logic, public authService: AuthService, public workspaceService: WorkspaceService, public router: Router, private cd: ChangeDetectorRef) {

    }

    doSearchCallback() {
        this.searchCallback(this.searchedText)
    }

}
