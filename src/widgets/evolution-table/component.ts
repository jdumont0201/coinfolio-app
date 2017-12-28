import {Component, Injectable,ViewChild}         from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import { StockChart,Chart } from 'angular-highcharts';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";

@Component({
  selector: 'app-evolution-table',
  templateUrl:'template.html'

})
@Injectable()
export class AppEvolutionTableComponent {
  value:string="BTC";
  period:string="60"
  base:string="EUR"
  source:string="kraken"


  length = 100;
  pageSize = 10;
  pageSizeOptions = [10, 25, 100];

  data = [];
  displayedData = [];
  isLoaded = false
  pageIndex = 0;

  displayedColumns = ['period', 'percent'];
  dataSource = new MatTableDataSource([]);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
constructor(public logic:Logic,public appConfigService:AppConfigService){

  this.updateData();

}



  updatePagination(event) {
    this.pageIndex = event.pageIndex;
    this.showData();
  }
  formatData(res){
    let D=[];
    for(let i=0;i<res.length;++i) {
      const r=res[i];
      const line = {period:r.timestamp,percent:(Math.floor(1000*(parseFloat(r.close)-parseFloat(r.open))/parseFloat(r.open)))/10}
      D.unshift(line);
    }
    return D
  }
  updateData() {
    this.logic.getChartData(this.source,this.period,this.value,this.base,(res)=>{
      this.data=this.formatData(res)
      this.showData(res)
    })
  }

  showData(res?) {
    if (res)
      this.data = res;
    this.displayedData = this.data.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
    this.dataSource = new MatTableDataSource(this.displayedData);
    this.length = this.data.length;
    this.isLoaded = true;
  }




  setValue(v:string) {
    this.value=v;
    this.updateData();
  }

  setBase(v:string) {
    this.base=v;
    this.updateData();
  }
  setInterval(v:number) {
    this.period=v.toString();
    this.updateData();
  }
}

export interface Element {

  period: string;

  percent: string;

}

