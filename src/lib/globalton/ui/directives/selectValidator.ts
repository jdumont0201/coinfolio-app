import {Directive} from '@angular/core';
import { FormControl } from '@angular/forms';


function selectValidator(c: FormControl): {[key: string]: any} {
      console.log("CustomValidatorDirective",c);
    return {"custom": true};
  
}
