import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {StockChart, Chart} from 'angular-highcharts';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";

import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";
@Component({
  selector: 'app-cap-lastweek',
  templateUrl: 'template.html'

})
@Injectable()
export class AppCapLastWeekComponent extends DataAndChartTemplate {
  displayedColumns = ['ts', 'cap'];


  ts: number = 1512509400
  base: string = "USD"
  source: string = "ccc"
  @Input() symbol: string

  length = 100;


  options={
    chart: {          type: 'column'        },
    title: {text: " "},
    credits: {          enabled: false        },
    tooltip:{valueSuffix:"%",  valueDecimals: 2},
  }

  constructor(public logic: Logic, public appConfigService: AppConfigService) {
  super(logic,appConfigService)
  }


  updateData() {
    this.logic.getCapLastWeek(this.source, 7, this.ts, this.symbol, this.base, (res) => {
      this.data = res;
      this.checkData()

      let X = [];
      let Y = [];
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      for (let i = 0; i < this.data.length-1; ++i) {
        X.unshift(days[new Date(this.data[i].ts * 1000).getDay()])
        Y.unshift((this.data[i].cap-this.data[i+1].cap)/this.data[i].cap*100)
      }



      this.updateOptions({xAxis:{categories:X},series:[{
        name: this.symbol,
        data: Y
      }]});
      this.chart=new Chart(this.options);



    })
  }


}
