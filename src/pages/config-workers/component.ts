import {Component, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";
import {EventService} from "../../lib/localton/services/event.service";
import {Logic} from "../../logic/Logic";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {MatSnackBar} from "@angular/material";
import {FormGroup} from "@angular/forms";
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";
import {TradingService} from "../../lib/localton/services/trading.service";
import {Structures} from "../../lib/globalton/core/utils/utils";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
    selector: 'app-config-workers',
    templateUrl: 'template.html'
})
@Injectable()
export class AppConfigWorkersPage {
    user;
    listing

    constructor(public authService: AuthService, public tradingService: TradingService, public requestService: RequestService, public consoleService:ConsoleService,public dataService: DataService, public eventService: EventService, public logic: Logic, public snackBar: MatSnackBar) {



    }

}
