import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {RequestService} from '../../../../lib/globalton/core/services/request.service';
import {DataService} from "../../../../lib/localton/services/data.service";

import {Logic} from "../../../../logic/Logic";
import {StockChart, Chart} from 'angular-highcharts';
import {AppConfigService} from "../../../../lib/localton/services/appconfig.service";
import {MatTableDataSource} from '@angular/material';

export abstract class DataAndChartTemplate implements OnInit {

  displayedColumns
  dataSource = new MatTableDataSource([]);
  showDataTable = false;
  data: any = [];
  options: any;
  chart;

  stockChartDefOptions= {

    chart: {
      type: 'candlestick'
    },
    title: {
      text: 'Loading'
    },
    credits: {
      enabled: false
    }, rangeSelector: {
      selected: 4,
      inputEnabled: false,
      buttonTheme: {
        visibility: 'hidden'
      },
      labelStyle: {
        visibility: 'hidden'
      }
    },
    series: [{
      name: 'Line 1',
      data: [1, 1]
    }]
  }

  plainChartDefOptions= {

    chart: {
      type: 'column'
    },
    title: {
      text: 'Loading'
    },
    credits: {
      enabled: false
    }, rangeSelector: {
      selected: 4,
      inputEnabled: false,
      buttonTheme: {
        visibility: 'hidden'
      },
      labelStyle: {
        visibility: 'hidden'
      }
    },
    series: [{
      name: 'Line 1',
      data: [1, 1]
    }]
  }


  constructor(public logic: Logic, public appConfigService: AppConfigService,type?) {
    if(type==="stock") this.chart=new StockChart(this.stockChartDefOptions)
    if(type==="plain") this.chart=new Chart(this.plainChartDefOptions)
    else this.chart=new StockChart(this.stockChartDefOptions)

  }

  ngOnInit() {
    this.updateData();
  }

  abstract updateData()

  checkData(): boolean {
    console.log("checkData data=", this.data)
    if (!this.data || this.data.length === 0) {
      this.showNotEnoughData()
      return false
    }
    else
      this.dataSource = new MatTableDataSource(this.data);
  }

  updateOptions(opt) {
    this.options = Object.assign(this.options, opt);
  };
findLastUpdate(){

}
  showNotEnoughData() {
    this.chart = new StockChart({
      chart: {
        type: 'candlestick'
      },
      title: {
        text: 'Not enough data. Please change plot options.'
      },
      credits: {
        enabled: false
      }, rangeSelector: {
        selected: 4,
        inputEnabled: false,
        buttonTheme: {
          visibility: 'hidden'
        },
        labelStyle: {
          visibility: 'hidden'
        }
      },
      series: [{
        name: 'Line 1',
        data: [1, 1]
      }]
    });
  }


}
