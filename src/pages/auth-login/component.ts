import {Component, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";
import {EventService} from "../../lib/localton/services/event.service";
import {Logic} from "../../logic/Logic";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {MatSnackBar} from "@angular/material";
import {FormGroup} from "@angular/forms";
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";
import {RefreshService} from "../../lib/localton/services/refresh.service";


@Component({
    selector: 'app-page-auth',
    templateUrl: 'template.html'
})
@Injectable()
export class AppAuthPage extends PageWithTabs  {

    selectedIndex = 0

    constructor(public authService: AuthService, public requestService: RequestService, public dataService: DataService,  public refreshService: RefreshService ,public eventService: EventService, public logic: Logic, public snackBar: MatSnackBar) {
        super(refreshService, eventService)

    }

    ngOnInit() {
        this.eventService.UIEvent.subscribe((val)=>{if(val && val.key=="showforgottenpassword") this.setTab(2)});
    }
    afterSignup() {

    }

    afterLogin() {

    }
afterRenewPassword(obj){
    this.snackBar.open('Password renewal instructions have been sent to '+obj.email+'.', null, {duration: 3000});
}
    afterForgottenPasswordClick() {

        this.eventService.showForgottenPasswordTab()
//this.selectedIndex=2
    }


}
