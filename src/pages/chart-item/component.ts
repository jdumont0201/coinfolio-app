import {Component, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";
import {Logic} from "../../logic/Logic";
import {StockChart, Chart} from 'angular-highcharts';
import {AppConfigService} from "../../lib/localton/services/appconfig.service";
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";

@Component({
  selector: 'app-price-page',
  templateUrl: 'template.html'

})
@Injectable()
export class AppChartItemPage extends PageWithTabs{

  constructor(public logic: Logic, public appConfigService: AppConfigService) {
  super()
  }

}
