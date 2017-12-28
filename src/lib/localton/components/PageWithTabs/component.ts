import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {RequestService} from '../../../../lib/globalton/core/services/request.service';
import {DataService} from "../../../../lib/localton/services/data.service";

import {Logic} from "../../../../logic/Logic";
import {StockChart, Chart} from 'angular-highcharts';
import {AppConfigService} from "../../../../lib/localton/services/appconfig.service";
import {MatTableDataSource} from '@angular/material';

export abstract class PageWithTabs implements OnInit {
  tabIndex:number;
  tabChanged(event){

    this.tabIndex=event.index
  }
ngOnInit(){

}
}
