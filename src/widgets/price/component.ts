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
  selector: 'app-price',
  templateUrl: 'template.html'

})
@Injectable()
export class AppPriceComponent extends DataAndChartTemplate {
  displayedColumns = ['ts', 'open', 'high', 'low', 'close'];

  @Input() symbol: string
  period: string = "60"
  base: string = "USD"
  source: string = "kraken"

  options = {
      chart: {type: 'candlestick', margin: 0,backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
          stops: [
              [0, '#18565f'],
              [1, '#023647']
          ]
      }},
    credits: {enabled: false},
    plotOptions: {
        candlestick: {lineColor: '#3e91a0', color: '#b18215', upColor: 'transparent', downColor: '#b18215'},
        series: {
        animation: false
      }
    },navigator: {
      series: {

        fillColor: '#cccccc',
        fillOpacity:0.1,
        lineColor: 'grey'
      }
    },
    rangeSelector: {
      selected: 4,
      inputEnabled: false,
      buttonTheme: {
        visibility: 'hidden'
      },
      labelStyle: {
        visibility: 'hidden'
      }
    }
  }


    constructor(public consoleService:ConsoleService,public logic: Logic, public appConfigService: AppConfigService, public eventService:EventService,public refreshService:RefreshService) {
        super(consoleService,refreshService,logic,appConfigService,eventService,"stock")
  }

ngOnInit(){
    this.updateData()
}
  updateData() {
    this.logic.getChartData(this.source, this.period, this.symbol, this.base, (res) => {
      this.checkData();
      let D = [];
      let minVal = 10000000;
      for (let i = 0; i < res.length; ++i) {
        const line = [parseInt(res[i].ts) * 1000, parseFloat(res[i].open), parseFloat(res[i].high), parseFloat(res[i].low), parseFloat(res[i].close)];
        minVal = Math.min(minVal, parseFloat(res[i].low))
        D.push(line);
      }
      this.dataSource = new MatTableDataSource(res);
      this.data = D;
      this.updateOptions({yAxis: {
          crosshair:{
              snap:false,
              color:"#437173",
              label: {
                  enabled: true,
                  padding: 8
              }},
          gridLineColor: '#2f5c64',
          labels: {
              style: {
                  color: '#E0E0E3'
              },opposite:false
          },

          lineColor: '#707073',
          minorGridLineColor: '#505053'
      },series: [{
        name: this.symbol,
        data: D
      }]})
      this.chart = new StockChart(this.options);

    })
  }


  setValue(v: string) {
    this.symbol = v;
    this.updateData();
  }

  setBase(v: string) {
    this.base = v;
    this.updateData();
  }

  setInterval(v: number) {
    this.period = v.toString();
    this.updateData();
  }

}
