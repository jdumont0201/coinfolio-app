
import {Component, Injectable,ViewChild}         from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import { StockChart,Chart } from 'angular-highcharts';
import {AppConfigService} from "../../lib/localton/services/appconfig.service";

@Component({
  selector: 'app-symbol-all',
  templateUrl:'template.html'

})
@Injectable()
export class AppSymbolAllPage {

  constructor(public requestService: RequestService, public dataService:DataService,public appConfigService:AppConfigService) {

  }
}
