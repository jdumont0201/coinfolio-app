import {Directive, Provider, forwardRef, Attribute} from '@angular/core'
import { FormControl } from '@angular/forms';
//import {NumberWrapper} from "@angular/core/src/facade/lang";

/********* Email Validator **********/

export function emailValidator(control: FormControl):{[key: string]: boolean} {
    console.log('emailValidator processing');
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (control.value == '' || re.test(control.value)) {
        return null;
    } else {
        return {"invalidEMail": true};
    }
}
