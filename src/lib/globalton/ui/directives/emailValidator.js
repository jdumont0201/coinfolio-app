"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {NumberWrapper} from "@angular/core/src/facade/lang";
/********* Email Validator **********/
function emailValidator(control) {
    console.log('emailValidator processing');
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (control.value == '' || re.test(control.value)) {
        return null;
    }
    else {
        return { "invalidEMail": true };
    }
}
exports.emailValidator = emailValidator;
//# sourceMappingURL=emailValidator.js.map