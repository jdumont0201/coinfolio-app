import {
    Component, Input,
    trigger, state, animate, transition, style, OnInit, ElementRef, Injectable, ViewChild
} from '@angular/core';

import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {EventService} from "../../lib/localton/services/event.service"
import {FormGroup, FormControl, Validators, FormBuilder, ValidatorFn} from "@angular/forms";
import {Logic} from "../../logic/Logic";
import {ApiService} from "../../lib/globalton/core/services/api.service";
import {RequestService} from "../../lib/globalton/core/services/request.service";
import {AuthService} from "../../lib/globalton/core/services/auth.service";


import {PasswordValidation} from '../../lib/globalton/core/validators/PasswordValidation';
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'app-form-renewpassword',
    templateUrl: 'template.html',

})
@Injectable()
export class AppFormRenewPassword {
    @Input() successCallback: Function;
    hide = true;
    form: FormGroup;

    constructor(public logic: Logic, public authService: AuthService, public appConfigService: AppConfigService, public eventService: EventService, public apiService: ApiService, public requestService: RequestService, public snackBar: MatSnackBar) {
    }


    ngOnInit() {

        this.form = new FormGroup({
                email: new FormControl('', {
                    validators: [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]
                })
            }
        );
    }

    /*********************************
     * FORM
     **********************************/
    submit() {
        setTimeout(() => {
            const obj = this.form.value;

            /*let obj = {}
            for (let k in this.form.controls)
                obj[k] = this.form.controls[k].value
            console.log("CONTROLS", this.form.controls, "OBJ", obj)
           */ this.logic.renewPassword(obj, (res) => {
                if(res.error) this.snackBar.open('Password renewal instructions have been sent to '+obj.email+'.', null, {duration: 3000});
                else
                if(this.successCallback) this.successCallback()
            })

        }, 1000)
    }

}
