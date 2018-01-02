import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';

import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {EventService} from "../../lib/localton/services/event.service"
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Logic} from "../../logic/Logic";

import {ApiService} from "../../lib/globalton/core/services/api.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-register',
  templateUrl: 'template.html'

})
@Injectable()
export class AppRegisterComponent {
    hide:boolean=false;
    form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.pattern("[^ @]*@[^ @]*")],
      updateOn: 'submit'
    }),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)], updateOn: 'submit'})
  });
  constructor(public logic: Logic, public appConfigService: AppConfigService, public eventService: EventService,  public apiService: ApiService,public snackBar: MatSnackBar) {

  }

  submit() {
    let obj = {}
    for (let k in this.form.controls)
      obj[k] = this.form.controls[k].value
    this.logic.registerUser(obj, (res) => {
        if(res.error)
            this.snackBar.open('Error signing you up',null,{duration:3000});
        else
        this.snackBar.open('You signed up successfully',null,{duration:3000});
    })
  }


}
