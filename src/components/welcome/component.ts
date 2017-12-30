import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {EventService} from "../../lib/localton/services/event.service";
import {AuthService} from "../../lib/globalton/core/services/auth.service";

@Component({
  selector: 'app-welcome',
  templateUrl: 'template.html'

})
@Injectable()
export class AppWelcomeComponent{

  constructor(public eventService:EventService,public appConfigService:AppConfigService){

  }
  close(){
    this.eventService.hideWelcome();
    this.eventService.hideVeil()
  }
}
