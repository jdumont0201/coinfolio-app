import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';

import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {EventService} from "../../lib/localton/services/event.service"
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Logic} from "../../logic/Logic";

import {ApiService} from "../../lib/globalton/core/services/api.service";

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
  constructor(public logic: Logic, public appConfigService: AppConfigService, public eventService: EventService,  public apiService: ApiService) {

  }

  submit() {
    console.log("Submit")
    let obj = {}
    for (let k in this.form.controls)
      obj[k] = this.form.controls[k].value
    console.log("CONTROLS", this.form.controls, "OBJ", obj)
    this.logic.registerUser(obj, (res) => {

    })
  }


}
