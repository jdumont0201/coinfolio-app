"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require("@angular/router-deprecated");
var Forms_1 = require('../../directives/elements/Forms');
var translate_pipe_1 = require('../../pipes/translate.pipe');
var FacebookRegister = (function () {
    function FacebookRegister() {
        console.log("+ LoginForm  constr");
    }
    FacebookRegister = __decorate([
        core_1.Component({
            selector: 'facebook-register',
            directives: [Forms_1.FORM_ELEMENTS, router_deprecated_1.ROUTER_DIRECTIVES],
            pipes: [translate_pipe_1.TranslatePipe],
            template: "\n     <script>\n  function statusChangeCallback(response) {\n    console.log('statusChangeCallback');\n    console.log(response);\n    if (response.status === 'connected') {\n      testAPI();\n    } else if (response.status === 'not_authorized') {\n      document.getElementById('status').innerHTML = 'Please log ' +        'into this app.';\n    } else {\n      document.getElementById('status').innerHTML = 'Please log ' +        'into Facebook.';\n    }\n  }\nfunction checkLoginState() {\n    FB.getLoginStatus(function(response) {      statusChangeCallback(response);    });\n  }\n  window.fbAsyncInit = function() {\n  FB.init({\n    appId      : '{your-app-id}',\n    cookie     : true,                        \n    xfbml      : true,  \n    version    : 'v2.2' \n  });\n\n  FB.getLoginStatus(function(response) {    statusChangeCallback(response);  });\n\n  };\n\n  (function(d, s, id) {\n    var js, fjs = d.getElementsByTagName(s)[0];\n    if (d.getElementById(id)) return;\n    js = d.createElement(s); js.id = id;\n    js.src = \"//connect.facebook.net/en_US/sdk.js\";\n    fjs.parentNode.insertBefore(js, fjs);\n  }(document, 'script', 'facebook-jssdk'));\n\n  function testAPI() {\n    console.log('Welcome!  Fetching your information.... ');\n    FB.api('/me', function(response) {\n      console.log('Successful login for: ' + response.key);\n      document.getElementById('status').innerHTML =\n        'Thanks for logging in, ' + response.key + '!';\n    });\n  }\n</script>\n\n<fb:login-button scope=\"public_profile,email\" onlogin=\"checkLoginState();\">\n</fb:login-button>\n"
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FacebookRegister);
    return FacebookRegister;
}());
exports.FacebookRegister = FacebookRegister;

//# sourceMappingURL=../../maps/directives/auth/FacebookRegister.js.map
