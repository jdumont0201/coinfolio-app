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
  selector: 'app-ratio-pricecap',
  templateUrl: 'template.html'

})
@Injectable()
export class AppPriceDivMarketComponent extends DataAndChartTemplate {


  displayedColumns = ['ts', 'ratio'];


  symbol: string = "BTC";
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

  constructor(public logic: Logic, public appConfigService: AppConfigService) {
  super(logic,appConfigService)
  }


  updateData() {

    this.logic.getPriceDivMarketCapData(this.source, this.symbol, this.base, (res) => {
      this.data=res;
      this.checkData();
      let D = [];

      for (let i = 0; i < res.length; ++i) {
        const line = [parseInt(res[i].ts) * 1000,parseFloat(res[i].ratio)];

        D.push(line);
      }
      console.log(D)
      this.dataSource = new MatTableDataSource(this.data);

      this.data = D;

      this.updateOptions({series: [{
        name: this.symbol,
        data: D,color: '#b59b4c'
      }],yAxis : {

      }})
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

}
