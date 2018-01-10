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
    selector: 'app-portfolio-value',
    templateUrl: 'template.html',
//    changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class AppPortfolioValueComponent implements OnInit {
    value;
    @Input() broker;

    constructor(public tradingService: TradingService, public eventService:EventService, private cd: ChangeDetectorRef) {
        this.tradingService.PriceUpdatedEvent.subscribe((param) => this.priceUpdated(param))
        this.eventService.brokerLoadedEvent.subscribe((param) => this.priceUpdated(param))
    }

    ngOnInit() {
        console.log("apvc:",this.broker ,"init")
        //this.update("pairtick ini")
        this.update("init");
    }

    priceUpdated(param:{pair:string,broker:string}) {
        console.log("apvc:",this.broker,"param",param,param.broker,param.pair == "all" &&  (param.broker==this.broker || this.broker =="global"))
        if (param.pair == "all" && (param.broker==this.broker || this.broker =="global"))
            this.update("update")
    }

    update(t) {
        this.value = this.tradingService.getBrokerByName(this.broker).getTotalUSDValue()
        console.log("APVC:",t,this.broker,JSON.stringify(this.tradingService.getBrokerByName("global").getPortfolio().content))
        this.cd.markForCheck();
    }
}
