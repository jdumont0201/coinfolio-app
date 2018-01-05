import {Component, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {EventService} from "../../lib/localton/services/event.service";
import {Logic} from "../../logic/Logic";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {MatSnackBar} from "@angular/material";
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-config-all',
    templateUrl: 'template.html'

})
@Injectable()
export class AppConfigAllPage {
    user;
imports;
ConnectionBinance=false;
    formBinance: FormGroup;

    constructor(public authService: AuthService, public requestService: RequestService, public dataService: DataService, public eventService: EventService, public logic: Logic,public snackBar: MatSnackBar) {
        if (this.authService.isAuthenticated()){
            console.log("logged")
            this.logic.getMe((user) => {
                this.user = user;
                if(!user.ConnectionBinance) user.ConnectionBinance=false;
                if(!user.ConnectionKraken) user.ConnectionKraken=false;
                console.log("this.user",this.user)
            })
            this.logic.getImports((res)=>{
                this.imports=res;
            })
        }else
            console.log("notlogged")

    }

    logout(){
     this.authService.doLogout()
        this.snackBar.open('You signed off',null,{duration:3000});
    }
    submit(form) {
        setTimeout(() => {
            this.logic.saveUser(this.user, (res) => {
                this.snackBar.open("User saved",null,{duration:3000})
            })
        }, 1000)
    }
}
