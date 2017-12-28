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
var common_1 = require("@angular/common");
var auth_service_1 = require("../services/auth.service");
var ProtectedDirective = (function () {
    function ProtectedDirective(authService, router, location) {
        this.router = router;
        this.location = location;
        this.sub = null;
        console.log("protected");
        /*
                if (!authService.isAuthenticated()) {
                    let originRoute=router.hostComponent.name;
                    console.log("protected not auth");
                    this.location.replaceState('/'); // clears browser history so they can't navigate with back button
                    this.router.navigate(['Login', {redirect:originRoute}]);
                }
        
                this.sub = authService.subscribe((val) => {
                    console.log("protected sub");
                    if (!val.authenticated) {
                        console.log("protected not auth not auth");
                        this.location.replaceState('/'); // clears browser history so they can't navigate with back button
                        // this.router.navigate(['LoggedoutPage']); // tells them they've been logged out (somehow)
                    }
                });*/
    }
    ProtectedDirective.prototype.ngOnDestroy = function () {
        if (this.sub != null) {
            this.sub.unsubscribe();
        }
    };
    return ProtectedDirective;
}());
ProtectedDirective = __decorate([
    core_1.Directive({
        selector: '[protected]',
    }),
    __param(0, core_1.Inject(auth_service_1.AuthService)),
    __metadata("design:paramtypes", [auth_service_1.AuthService, Object, common_1.Location])
], ProtectedDirective);
exports.ProtectedDirective = ProtectedDirective;
//# sourceMappingURL=ProtectedDirective.js.map