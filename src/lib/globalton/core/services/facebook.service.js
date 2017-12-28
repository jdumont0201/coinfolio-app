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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var auth_service_1 = require("./auth.service");
var FacebookService = (function () {
    function FacebookService(authService) {
        this.authService = authService;
        this.logged = false;
        this.user = {};
        console.log("+ FacebookService");
    }
    FacebookService.prototype.init = function () {
        FB.init({
            appId: '1546195959023538',
            xfbml: true,
            version: 'v2.6'
        });
    };
    FacebookService.prototype.statusChangeCallback = function (response) {
        if (response.status === 'connected') {
            console.log('connected', response);
        }
        else {
            this.login();
        }
    };
    FacebookService.prototype.login = function () {
        var _this = this;
        FB.login(function (result) {
            console.log("login connected", result);
            _this.logged = true;
            _this.userId = result.authResponse.userID;
            _this.token = result.authResponse.accessToken;
            _this.authService.loginFB(_this.userId, _this.token, function (response) {
                if (response.error) {
                }
                else {
                    if (response.success) {
                    }
                    else {
                    }
                }
            });
        }, { scope: 'user_friends' });
    };
    FacebookService.prototype.logout = function () {
        FB.logout(function (result) {
        });
    };
    FacebookService.prototype.me = function () {
        var _this = this;
        FB.api('/me?fields=id,name,first_name,gender,picture.width(150).height(150),age_range,friends', function (result) {
            if (result && !result.error) {
                _this.user = result;
                console.log(_this.user);
            }
            else {
                console.log(result.error);
            }
        });
    };
    return FacebookService;
}());
FacebookService = __decorate([
    __param(0, core_1.Inject(auth_service_1.AuthService)),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], FacebookService);
exports.FacebookService = FacebookService;
//# sourceMappingURL=facebook.service.js.map