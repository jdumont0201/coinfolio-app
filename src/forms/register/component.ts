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
    selector: 'app-form-register',
    templateUrl: 'template.html',

})
@Injectable()
export class AppFormRegister {
    @Input() successCallback: Function;
    hide = true;
    form: FormGroup;
@Input() submitText="Continue"
    constructor(public logic: Logic, public authService: AuthService, public appConfigService: AppConfigService, public eventService: EventService, public apiService: ApiService, public requestService: RequestService, public snackBar: MatSnackBar) {
    }


    ngOnInit() {

        this.form = new FormGroup({
                email: new FormControl('', {
                    validators: [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]
                }),
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
            this.logic.registerUser(obj, (res) => {
                if (res.success) {
                    this.snackBar.open("You signed up successfully.", null, { duration: 3000})

                    if(this.successCallback)
                        this.successCallback();
                } else {
                    if (res.desc === "EMAIL_EXISTING") {
                        this.snackBar.open("E-mail already existing. Would you like to login instead ?", null, {panelClass: "warning", duration: 3000})
                    } else {
                        this.snackBar.open("Error signing up.", null, {panelClass: "red", duration: 3000})

                    }
                }
            })
        }, 1000)
    }
}
