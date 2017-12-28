import {Component, Injectable,ViewChild}         from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";
import {Logic} from "../../logic/Logic";
import { StockChart,Chart } from 'angular-highcharts';
@Component({
  selector: 'app-market-page',
  templateUrl:'template.html'

})
@Injectable()
export class AppMarketPage {
  base:string="EUR"
  source:string="kraken"
  constructor(public requestService: RequestService, public dataService:DataService,public logic:Logic) {

  }
  options:Object;
  data:any=[];
}
