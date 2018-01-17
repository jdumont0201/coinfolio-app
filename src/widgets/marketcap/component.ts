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
  selector: 'app-widget-marketcap',
  templateUrl: 'template.html'

})
@Injectable()
export class AppMarketCapComponent extends DataAndChartTemplate {


  displayedColumns = ['ts', 'cap'];


  @Input() symbol: string;
  base: string = "USD"
  source: string = "ccc"

  options = {
    chart: {type: 'area'},
    candlestick: {color: 'green', upColor: 'red'},
    credits: {enabled: false},
    plotOptions: {
      series: {
        animation: false
      }
    },
    navigator: {
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
        super(consoleService,refreshService,logic,appConfigService,eventService)
  }


  updateData() {

    this.logic.getMarketCapData(this.source, this.symbol, this.base, (res) => {
      this.data=res;
      this.checkData();
      let D = [];
      let minVal = 10000000;
      for (let i = 0; i < res.length; ++i) {
        const line = [parseInt(res[i].ts) * 1000, Math.round(parseFloat(res[i].cap))];
        D.push(line);
      }
      console.log(D)
      this.dataSource = new MatTableDataSource(this.data);

      this.data = D;

      this.updateOptions({series: [{
        name: this.symbol,
        data: D,color: '#FF0000'
      }],yAxis : {

      },
      tooltip: {valueSuffix: " "+this.base, valueDecimals:0}});
      this.chart = new StockChart(this.options);

    })
  }


  setValue(v: string) {
    this.symbol = v;
    if(v==="GLOBA") this.source="cmc"
    else this.source="ccc"
    this.updateData();

  }

  setBase(v: string) {
    this.base = v;
    this.updateData();
  }

}
