import {Component, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";
import {EventService} from "../../lib/localton/services/event.service";
import {Logic} from "../../logic/Logic";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {MatSnackBar} from "@angular/material";
import {FormGroup} from "@angular/forms";
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";


@Component({
    selector: 'app-config-subscription',
    templateUrl: 'template.html'
})
@Injectable()
export class AppConfigSubscriptionPage{
    user;


    constructor(public authService: AuthService, public requestService: RequestService, public dataService: DataService, public eventService: EventService, public logic: Logic, public snackBar: MatSnackBar) {

        this.logic.getMe((res) => {
            this.user = res;
        })
        this.authService.loginChanged.subscribe((val)=>{
            this.logic.getMe((res) => {
                this.user = res;
            })
        })
    }


}