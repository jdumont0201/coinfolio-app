import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {RequestService} from '../../../../lib/globalton/core/services/request.service';
import {DataService} from "../../../../lib/localton/services/data.service";

import {Logic} from "../../../../logic/Logic";
import {StockChart, Chart} from 'angular-highcharts';
import {AppConfigService} from "../../../../lib/localton/services/appconfig.service";
import {MatTableDataSource} from '@angular/material';


export abstract class DataWithPaginationTemplate implements OnInit {
  length = 100;
  pageSize = 10;
  pageSizeOptions = [10, 25, 100];
  pageIndex = 0;

  displayedColumns;
  dataSource = new MatTableDataSource([]);
  data = [];
  displayedData = [];
  isLoaded = false;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  constructor(public logic: Logic, public appConfigService: AppConfigService) {


  }

  ngOnInit() {
    this.updateData();
  }

  updatePagination(event) {
    this.pageIndex = event.pageIndex;
    this.showData();
  }

  showData(res?) {
    if (res)
      this.data = res;
    this.displayedData = this.data.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
    this.dataSource = new MatTableDataSource(this.displayedData);
    this.length = this.data.length;
    this.isLoaded = true;
  }
abstract updateData();


}
