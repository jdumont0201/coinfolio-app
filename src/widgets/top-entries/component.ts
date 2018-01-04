import {Component, Injectable, Input, ViewChild} from '@angular/core';
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
  selector: 'app-widget-top-entries',
  templateUrl:'template.html'

})
@Injectable()
export class AppWidgetTopEntriesWidget extends DataAndChartTemplate  {
  displayedColumns = ['symbol', 'diff'];
  dataSource = new MatTableDataSource([]);

  displayedColumnsRef = ['symbol', 'ts_from','cap_from','ts_to','cap_to'];
  dataSourceRef = new MatTableDataSource([]);

  ts:number=1451692800
  base: string = "USD"
  source: string = "cmc"

  length = 100;
  pageSize = 10;
  pageSizeOptions = [10, 25, 100];

  data = [];
  displayedData = [];
  isLoaded = false
  pageIndex = 0;
  isFuture=false;
  from:number;
  to:number;

  date = new FormControl(new Date(this.ts*1000));
  serializedDate = new FormControl((new Date()).toISOString());

 @Input() period;
 @Input() showOptions;

  options = {
    chart: {type: 'column'},
    credits: {enabled: false},
    tooltip: {
      valueSuffix: '%'
    },
    title:{text:""},
    plotOptions: {
      column: {
        colorByPoint: true
      },
      series: {
        animation: false
      }
    },
    yAxis:{stackLabels: {
      enabled: true, style: {
        fontWeight: 'bold',
        color:  'gray'
      }
    }}
  }



  constructor(public logic: Logic, public appConfigService: AppConfigService) {
    super(logic,appConfigService,"plain")

  }
  ngOnInit(){
    this.initDate()
    this.updateData();
  }
  initDate(){
    this.setDates();

    const d = new Date();
    d.setHours(0,0,0,0);

    this.ts=d.getTime()/1000;
    this.updateDate(this.ts)
    console.log("init",this.ts);
  }
  setPeriod(p){
    this.period=p;
    this.setDates();
    this.updateData()
  }
  setDates(){
    const d=Math.floor(new Date().getTime()/1000);

      this.to=d;
    console.log("setDates",d,new Date(d*1000),new Date(this.from*1000),new Date(this.to*1000));
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
    this.logic.getTopEntries(this.source,this.base,this.to, (res) => {
      console.log("data",res);
      this.data = res;
      this.dataSourceRef = new MatTableDataSource(this.data);
      this.showData()

      /* CHART*/
      let X = [], Y=[],C=[];
      for (let i = 0; i < res.length; ++i) {
        X.push(res[i].symbol);
        Y.push(Math.round(100*(res[i].cap_to-res[i].cap_from)/res[i].cap_from*100)/100);
        C.push(res[i].perf>0?"#559e4f":"#bb0f0f")
      }
      console.log("perf",this.data,"X=",X,"Y=",Y);

      this.updateOptions(
        {
          colors:C,
          xAxis:{
                categories:X},

              series:[{
        name: "Performance",
        data: Y
      }]});
      this.chart = new Chart(this.options);
    })
  }

  yesterday(){
    this.updateDate(this.ts-86400)
  }
  tomorrow(){
    this.updateDate(this.ts+86400)
  }
  updateDate(ts){
    if(new Date().getTime()/1000-ts<0)
      this.isFuture=true
    else
      this.isFuture=false
    this.ts=ts;
        this.date= new FormControl(new Date(this.ts*1000));
        this.updateData()
  }
  dateChanged(event: MatDatepickerInputEvent<Date>) {
    this.updateDate(new Date(event.value).getTime()/1000)
  }
}
