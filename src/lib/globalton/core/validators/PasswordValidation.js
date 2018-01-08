"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PasswordValidation = (function () {
    function PasswordValidation() {
    }
    PasswordValidation.MatchPassword = function (AC) {
        console.log("AC", AC);
        var password = AC.get('password').value; // to get value in input tag
        var confirmPassword = AC.get('confpassword').value; // to get value in input tag
        if (password != confirmPassword) {
            console.log('false pw=', password, "cp", confirmPassword);
            AC.get('confpassword').setErrors({ MatchPassword: true });
        }
        else {
            console.log('true');
            return null;
        }
    };
    return PasswordValidation;
}());
exports.PasswordValidation = PasswordValidation;
//# sourceMappingURL=PasswordValidation.js.map