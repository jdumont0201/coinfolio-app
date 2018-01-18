import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {StockChart, Chart} from 'angular-highcharts';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {EventService} from "../../lib/localton/services/event.service"
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";

import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {TradingService} from "../../lib/localton/services/trading.service";
import {Strings} from "../../lib/globalton/core/utils/utils";
import {CheckValid} from "../../lib/localton/components/CheckValid/component";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
    selector: 'app-broker-allpanels',
    templateUrl: 'template.html',
    styleUrls: ['styles.css']
})
@Injectable()
export class AppBrokerAllPanelsComponent extends CheckValid implements OnInit {
    user;
    checks = {}
    @Input() broker;
    enabledKey;

    constructor(public eventService: EventService, public tradingService: TradingService, public appConfigService: AppConfigService, public authService: AuthService, public logic: Logic, public snackBar: MatSnackBar,public consoleService:ConsoleService) {

    super(consoleService)
    }
ngOnInit(){

}
}
