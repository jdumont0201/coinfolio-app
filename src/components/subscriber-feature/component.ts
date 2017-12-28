import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {StockChart, Chart} from 'angular-highcharts';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";

import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {EventService} from "../../lib/localton/services/event.service";
@Component({
  selector: 'app-plus-icon',
  templateUrl: 'template.html'

})
@Injectable()
export class AppSubscriberFeatureComponent{
  @Input() text:string;
  @Input() event;
  constructor(public appConfigService:AppConfigService,public authService:AuthService,public eventService:EventService){

  }
  showSubscribe(){
    console.log("subscribe")
    this.eventService.showSubscribe()
  }
}
