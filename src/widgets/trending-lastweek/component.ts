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
import {EventService} from "../../lib/localton/services/event.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
  selector: 'app-trending-lastweek',
  templateUrl: 'template.html'

})
@Injectable()
export class AppTrendingLastWeekComponent extends DataAndChartTemplate {
  displayedColumns = ['ts', 'symbol', 'price', 'cap'];


  ts: number = 1512509400
  base: string = "USD"
  source: string = "kraken"
  sourcecap: string = "ccc"
  @Input() symbol: string

  length = 100;

  options = {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    credits: {
      enabled: false},
    title: {text: "ΔPrice vs MarketCap"},
    yAxis: {title: {text: "ΔPrice"}},
    xAxis: {
      title: {
        text: "Market Cap (m"+this.base+")",

      }
    },
    tooltip: {valueSuffix: "%", valueDecimals: 2},

  }


    constructor(public consoleService:ConsoleService,public logic: Logic, public appConfigService: AppConfigService, public eventService:EventService,public refreshService:RefreshService) {
        super(consoleService,refreshService,logic,appConfigService,eventService)
  }


  updateData() {
    this.logic.getTrendingPriceCapLastWeek(this.source, 7, this.ts, this.base, this.sourcecap, (res) => {
      this.data = res;
      this.checkData()
      let XY = [];
      this.dataSource = new MatTableDataSource(this.data);
      for (let i = 0; i < this.data.length; ++i) {
        const ev = Math.round(100 * (this.data[i + 1].price - this.data[i].price) / this.data[i].price * 100) / 100;
        //console.log(this.data[i].symbol, this.data[i + 1].price - this.data[i].price)
        //XY.push({x:ev,y:this.data[i+1].cap,z:1,name:this.data[i].symbol})
        XY.push({name: this.data[i].symbol, data: [[Math.round(this.data[i + 1].cap / 1000000), ev]]})
        i++;
      }
      this.updateOptions({series:XY})
      this.chart = new Chart(this.options);


    })
  }


}

