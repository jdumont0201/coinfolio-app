import {Component, Injectable,ViewChild}         from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import { StockChart,Chart } from 'angular-highcharts';
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {EventService} from "../../lib/localton/services/event.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-page-welcome',
  templateUrl:'template.html'

})
@Injectable()
export class AppWelcomePage extends PageWithTabs {

  constructor(public authService:AuthService,public router:Router,public requestService: RequestService, public consoleService:ConsoleService  , public dataService:DataService,public refreshService:RefreshService,public eventService:EventService) {
      super(refreshService,eventService,consoleService)
      console.log("redirect welc")
        if(this.authService.isAuthenticated()){
          console.log("redirect")
            this.router.navigate(["/dashboard/today"]);
        }
  }


}
