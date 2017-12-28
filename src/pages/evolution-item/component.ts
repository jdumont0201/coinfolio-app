import {Component, Injectable,ViewChild}         from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";
import {Logic} from "../../logic/Logic";
import { StockChart,Chart } from 'angular-highcharts';
@Component({
  selector: 'app-chart-item',
  templateUrl:'template.html'

})
@Injectable()
export class AppEvolutionPage {
  value:string="BTC";
  period:string="60"
  base:string="EUR"
  source:string="kraken"
  constructor(public requestService: RequestService, public dataService:DataService,public logic:Logic) {

  }
  options:Object;
  data:any=[];



}
