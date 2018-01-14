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
    selector: 'app-form-resetpassword',
    templateUrl: 'template.html',

})
@Injectable()
export class AppFormResetPassword {
    @Input() successCallback: Function;
    @Input() token:string;
    hide = true;
    form: FormGroup;

    constructor(public logic: Logic, public authService: AuthService, public appConfigService: AppConfigService, public eventService: EventService, public apiService: ApiService, public requestService: RequestService, public snackBar: MatSnackBar) {
    } 


    ngOnInit() {

        this.form = new FormGroup({
            password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]}),
            confpassword: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]})
        }, PasswordValidation.MatchPassword

        );
    }

    /*********************************
     * FORM
     **********************************/
    submit() {
        setTimeout(() => {
            const obj = this.form.value;

     /*       let obj = {}
            for (let k in this.form.controls)
                obj[k] = this.form.controls[k].value
            console.log("CONTROLS", this.form.controls, "OBJ", obj)
       */
     obj.token=this.token;
     this.logic.renewPassword(obj, (res) => {
                if (res.error) this.snackBar.open('Error sending your new password.', null, {panelClass:"red",duration: 3000});
                else {
                    this.snackBar.open('Your password has been renewed. Signing in...', null, {duration: 3000});
                    if(this.successCallback) this.successCallback()
                }
            })

        }, 1000)
    }

}
