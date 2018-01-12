import {Component,Input,OnInit, Injectable,ViewChild}         from '@angular/core';
import { StockChart,Chart } from 'angular-highcharts';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"

import {Logic} from "../../logic/Logic";

import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";
import {EventService} from "../../lib/localton/services/event.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";
@Component({
  selector: 'app-perf-lastweek',
  templateUrl:'template.html'

})
@Injectable()
export class AppPerfLastWeekComponent extends  DataAndChartTemplate{
  displayedColumns = ['ts', 'perf'];

  ts:number
  base: string = "EUR"
  source: string = "kraken"
  @Input() symbol:string
@Input() format:string;
  length = 100;

  options={
    chart: {          type: 'column'        },
    title: {text: " "},

    tooltip:{valueSuffix:"%",  valueDecimals: 2},
    credits: {          enabled: false        },
  }

    constructor(public logic: Logic, public appConfigService: AppConfigService, public eventService:EventService,public refreshService:RefreshService) {
        super(refreshService,logic,appConfigService,eventService)
    this.ts=Math.round(new Date().getTime()/1000)
  }

  updateData() {
    this.logic.getPerfLastWeek(this.source,7, this.ts,this.symbol, this.base, (res) => {
      this.data = res.reverse();
      this.checkData()
      let X =[];
      let Y=[];
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      for(let i=0;i<this.data.length;++i){
        X.push(days[new Date(this.data[i].ts*1000).getDay()])
        Y.push(this.data[i].perf)
      }
      this.updateOptions({xAxis:{categories:X},series:[{
        name: this.symbol,
        data: Y
      }]});
      this.chart=new Chart(this.options);
    })
  }

}
