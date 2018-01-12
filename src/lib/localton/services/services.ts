import {RefreshService} from "./refresh.service";
import {Injectable} from "@angular/core";
import {EventService} from "./event.service";
import {AppConfigService} from "./appconfig.service";
import {RequestService} from "../../globalton/core/services/request.service";
import {ConsoleService} from "../../globalton/core/services/console.service";
@Injectable()
export class Services{
 constructor(public refreshService:RefreshService, public eventService:EventService,public appConfigService:AppConfigService, public consoleService:ConsoleService,public requestService:RequestService){

 }
}