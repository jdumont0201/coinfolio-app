import {Component, Input, OnInit, Injectable, ViewChild, ChangeDetectionStrategy} from '@angular/core';
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
export class AppPairTickComponent{
  @Input() pair:string;
  @Input() broker:string;

  value;
  constructor(public tradingService:TradingService){

  }

  getChange(){
    console.log("gpc getchange",this.broker,this.pair)
    if(this.broker) {
    let T=  this.tradingService.getBrokerByName(this.broker).getTicker();
    if(this.pair in T.content){
        console.log("gpc getchange",this.broker,this.pair,this.pair in T.content)
        T.getPairChange(this.pair,(res)=>{this.value=res})
    }

    }else{
      return null
    }
  }
}
