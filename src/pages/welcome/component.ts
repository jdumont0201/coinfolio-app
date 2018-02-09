import {Component, Injectable,ViewChild}         from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import { StockChart,Chart } from 'angular-highcharts';
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {EventService} from "../../lib/localton/services/event.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
@Component({
  selector: 'app-page-welcome',
  templateUrl:'template.html'

})
@Injectable()
export class AppWelcomePage extends PageWithTabs {

  constructor(public requestService: RequestService, public consoleService:ConsoleService  , public dataService:DataService,public refreshService:RefreshService,public eventService:EventService) {
      super(refreshService,eventService,consoleService)

  }


}