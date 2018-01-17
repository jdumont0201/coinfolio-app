import {Component, Injectable,ViewChild}         from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";

import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";
import {EventService} from "../../lib/localton/services/event.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";import {ConsoleService} from "../../lib/globalton/core/services/console.service";
@Component({
  selector: 'app-top-performance-daily',
  templateUrl:'template.html'

})
@Injectable()
export class AppTopPerformanceDailyComponent extends DataAndChartTemplate{
  displayedColumns = ['symbol', 'perf'];
  dataSource = new MatTableDataSource([]);

  ts:number=1512509400
  base: string = "EUR"
  source: string = "kraken"

  length = 100;
  pageSize = 10;
  pageSizeOptions = [10, 25, 100];

  data = [];
  displayedData = [];
  isLoaded = false
  pageIndex = 0;

  date = new FormControl(new Date(this.ts*1000));
  serializedDate = new FormControl((new Date()).toISOString());


    constructor(public consoleService:ConsoleService,public logic: Logic, public appConfigService: AppConfigService, public eventService:EventService,public refreshService:RefreshService) {
        super(consoleService,refreshService,logic,appConfigService,eventService)
  }
  showData(res?) {
    if (res)
      this.data = res;
    if(this.data){
      this.displayedData = this.data.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
      this.dataSource = new MatTableDataSource(this.displayedData);
      this.length = this.data.length;
      this.isLoaded = true;
    }
  }

  updatePagination(event) {
    this.pageIndex = event.pageIndex;
    this.showData();
  }


  updateData() {
    this.logic.getDailyTopPerformance(this.source, this.ts, this.base, (res) => {
      this.data = res;
      this.showData()
    })
  }

  yesterday(){
    this.updateDate(this.ts-86400)
  }
  tomorrow(){
    this.updateDate(this.ts+86400)
  }
  updateDate(ts){
    this.ts=ts;
    this.date= new FormControl(new Date(this.ts*1000));
    this.updateData()
  }
  dateChanged(event: MatDatepickerInputEvent<Date>) {
        this.updateDate(new Date(event.value).getTime()/1000)
  }
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
