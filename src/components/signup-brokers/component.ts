import {Component, Input, OnInit, Injectable, ViewChild, ViewEncapsulation, Inject} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {EventService} from "../../lib/localton/services/event.service";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {AppSubscribeComponent} from "../subscribe/component";
import {Logic} from "../../logic/Logic";
import {RequestService} from "../../lib/globalton/core/services/request.service";
import {ApiService} from "../../lib/globalton/core/services/api.service";
import {MatDialog} from "@angular/material";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signup-brokers',
    templateUrl: 'template.html',
    styleUrls: ['styles.css'],
    encapsulation: ViewEncapsulation.None

})
@Injectable()
export class AppSignupBrokersComponent extends AppSubscribeComponent {
    constructor(public logic: Logic, public consoleService: ConsoleService, public authService: AuthService, public router: Router, public dialog: MatDialog, public appConfigService: AppConfigService, public eventService: EventService, public apiService: ApiService, public requestService: RequestService) {
        super(logic, consoleService, authService, appConfigService, eventService, apiService, requestService)
        console.log("sign")
    }
}




