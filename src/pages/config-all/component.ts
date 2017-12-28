import {Component, Injectable,ViewChild}         from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {EventService} from "../../lib/localton/services/event.service";
import {Logic} from "../../logic/Logic";
@Component({
  selector: 'app-config-all',
  templateUrl:'template.html'

})
@Injectable()
export class AppConfigAllPage {
  user;
  constructor(public requestService: RequestService, public dataService: DataService, public eventService: EventService, public logic: Logic) {
    this.logic.getMe((user)=>{
      this.user=user;
    })
  }

}
