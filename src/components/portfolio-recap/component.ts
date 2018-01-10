import {Component, Input, OnInit, Injectable, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {StockChart, Chart} from 'angular-highcharts';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";

import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";
import {TradingService} from "../../lib/localton/services/trading.service";
import {EventService} from "../../lib/localton/services/event.service";

@Component({
    selector: 'app-portfolio-recap',
    templateUrl: 'template.html',
    //changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class AppPortfolioRecapComponent implements OnInit {

    constructor(public tradingService: TradingService,public eventService:EventService, private cd: ChangeDetectorRef) {
        this.eventService.brokerLoadedEvent.subscribe((val) => {
            this.brokerLoaded(val)
        })
        this.tradingService.PriceUpdatedEvent.subscribe((param) => this.brokerLoaded(param))


    }
    brokerLoaded(val){
        console.log("rr",this.tradingService.brokers.getConnectedBrokers())
        this.cd.markForCheck()

    }
    ngOnInit() {

    }


}
