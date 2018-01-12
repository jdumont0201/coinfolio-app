import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        //console.log("AC",AC)
        let password = AC.get('password').value; // to get value in input tag
        let confirmPassword = AC.get('confpassword').value; // to get value in input tag
        if(password != confirmPassword) {
          //  console.log('false pw=',password,"cp",confirmPassword);
            AC.get('confpassword').setErrors( {MatchPassword: true} )
        } else {
            //console.log('true');
            return null
        }
    }
}