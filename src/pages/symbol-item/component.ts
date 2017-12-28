import {Component, Injectable,ViewChild}         from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import { StockChart,Chart } from 'angular-highcharts';
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-symbol-item',
  templateUrl:'template.html'

})
@Injectable()
export class AppSymbolItemPage {
  symbolId:string;
  constructor(public requestService: RequestService, public dataService:DataService,private route: ActivatedRoute) {
    this.route.params.subscribe(  (params)=>{
      this.symbolId=params["id"];
    } );
  }
}
