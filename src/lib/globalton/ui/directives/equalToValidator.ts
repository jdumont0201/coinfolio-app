/*import {provide, Directive, Attribute, Input} from '@angular/core';
import {NG_VALIDATORS, Control, Validators, Validator} from '@angular/common';



@Directive({
    selector: '[equal-to][ng-control],[equal-to][ng-form-control],[equal-to][ng-model]',
    providers: [
        provide(NG_VALIDATORS, {
            useExisting: EqualToValidator,
            multi: true
        })
    ]
})

export class EqualToValidator implements Validator {
    @Input('equalTo') target: Control;
    constructor() {
        // this.target.valueChanges.subscribe((...args) => {
        //  console.log(args);
        // });
    }
    validate(control: Control): {[key: string]: any} {
        
        console.log(control);
        return this.target.value !== control.value
            ? {'equalTo': true}
            : null;
    }
}
*/