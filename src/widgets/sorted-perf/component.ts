import {Component, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {StockChart, Chart} from 'angular-highcharts';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";

import {ConsoleService} from "../../lib/globalton/core/services/console.service";
@Component({
  selector: 'app-sorted-performance',
  templateUrl: 'template.html'

})
@Injectable()
export class AppSortedPerformanceComponent {
  value: string = "BTC";
  period: string = "60"
  base: string = "EUR"
  source: string = "kraken"

  timestamp = 1512925200

  displayedColumns = ['value', 'percent'];
  dataSource = new MatTableDataSource([]);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(public consoleService:ConsoleService,public logic: Logic, public appConfigService: AppConfigService) {
    this.updateData();
  }


  updateData() {
    this.logic.getAllChartData(this.source, this.period, this.timestamp, this.base, (res) => {
      //console.log("res", res, res.length);
      let D = [];
      for (let i = 0; i < res.length; ++i) {
        let r = res[i];

        const line = {
          value: r.value,
          percent: (Math.floor(1000 * (parseFloat(r.close) - parseFloat(r.open)) / parseFloat(r.open))) / 10
        }
        D.unshift(line);
      }
      this.dataSource = new MatTableDataSource(D);
      ;


      console.log("formated", D);
    })
  }


  setValue(v: string) {
    this.value = v;
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

export interface Element {
  value:string;
  percent: string;

}

