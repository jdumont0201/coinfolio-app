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

@Component({
    selector: 'app-pair-tick',
    templateUrl: 'template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class AppPairTickComponent implements OnInit{
    @Input() pair: string;
    @Input() broker: string;

    value;
    lastprice;
    currentprice;
    lastTime;
    closeTime;
    constructor(public tradingService: TradingService,private cd: ChangeDetectorRef) {
        this.tradingService.PriceUpdatedEvent.subscribe((param) => this.priceUpdated(param))
    }
    ngOnInit(){

        this.getChange("pairtick init")
    }
    priceUpdated(param) {
        if(param.pair==this.pair || param.pair=="all")
            this.getChange("update")
    }

    getChange(t) {
        //console.log("gpc "+t+"update", this.broker, this.pair)
        if (this.broker) {
            let T = this.tradingService.getBrokerByName(this.broker).getTicker();
            if (this.pair in T.content) {
                T.getPairChange(this.pair, (res) => {
                    if (res) {
                        console.log("rese",this.pair,res)
                        this.currentprice=res.current;//T.content[this.pair].p;
                        this.lastprice=res.last;
                        this.lastTime=res.changeLastTime;
                        this.closeTime=new Date(res.changeCloseTime).toString();
                        let v=((this.currentprice-res.last)/res.last)*100;
                        this.value = v; this.cd.markForCheck();
                    }
                })
            } else {
          //      console.log("gpc update this.pair not in ", this.pair, T.content)
            }
        } else {
            return null
        }
    }
}
