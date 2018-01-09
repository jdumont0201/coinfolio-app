import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';

import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {EventService} from "../../lib/localton/services/event.service"
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Logic} from "../../logic/Logic";

import {ApiService} from "../../lib/globalton/core/services/api.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: 'template.html'

})
@Injectable()
export class AppLoginComponent {
  @Input() popup;
  hide:boolean=true
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]
    }),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]})
  });

  constructor(public logic: Logic, public appConfigService: AppConfigService, public eventService: EventService,  public apiService: ApiService, public snackBar: MatSnackBar) {

  }

  submit() {
    console.log("Submit");
    let obj = {}
    for (let k in this.form.controls)
      obj[k] = this.form.controls[k].value
    console.log("CONTROLS", this.form.controls, "OBJ", obj)
    this.logic.registerUser(obj, (res) => {

    })
  }


    login() {
        console.log("Submit");
        let obj = {}
        for (let k in this.form.controls)
            obj[k] = this.form.controls[k].value
        console.log("CONTROLS", this.form.controls, "OBJ", obj)
        this.logic.loginUser(obj, (res) => {
            if(res.error) this.snackBar.open('Login failed. Please check your credentials.', null, {panelClass:"warning",duration: 3000});
        })
    }

  close() {
    this.eventService.hideLogin()
  }


}
