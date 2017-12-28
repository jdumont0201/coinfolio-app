import {Component, Injectable,ViewChild}         from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import { StockChart,Chart } from 'angular-highcharts';
@Component({
  selector: 'app-account',
  templateUrl:'template.html'

})
@Injectable()
export class AppAccountPage {

  constructor(public requestService: RequestService, public dataService:DataService) {

  }
}
