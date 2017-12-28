import {Component, Injectable,ViewChild}         from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import { StockChart,Chart } from 'angular-highcharts';
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";
@Component({
  selector: 'app-dashboard',
  templateUrl:'template.html'

})
@Injectable()
export class AppDashboardPage extends PageWithTabs {

  constructor(public requestService: RequestService, public dataService:DataService) {
super()

  }


}
