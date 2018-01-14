import {Component, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {StockChart, Chart} from 'angular-highcharts';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";

import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";
import {EventService} from "../../lib/localton/services/event.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";
@Component({
    selector: 'app-widget-calendar',
    templateUrl: 'template.html'

})
@Injectable()
export class AppCalendarWidget  implements  OnInit {


    possibleEvents=[
        {name:"New exchange Listings",selected:true},
        {name:"New coins",selected:true},
        {name:"New tokens",selected:true}]
    @Input() period;
    @Input() showOptions;


    constructor(public logic: Logic, public appConfigService: AppConfigService, public eventService: EventService, public refreshService: RefreshService) {

    }

    ngOnInit() {
    }
}
