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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var message_service_1 = require("../services/message.service");
var window_service_1 = require("../services/window.service");
var PopUp = (function () {
    function PopUp(messageService, windowService) {
        var _this = this;
        this.messageService = messageService;
        this.windowService = windowService;
        this.isPopUpShowing = false;
        messageService.popupChanged.subscribe(function (value) { return _this.updatePopup(value); }, function (error) { return console.log("Error updating popup" + error); }, function () { return console.log('done'); });
    }
    PopUp.prototype.updatePopup = function (msg, isall) {
        if (msg.id === -1) {
            this.isPopUpShowing = false;
            this.messageService.cloakChanged.next(false);
            return;
        }
        this.messageService.cloakChanged.next(msg.value);
        if (msg.id === this.popupid) {
            this.isPopUpShowing = msg.value;
            if (msg.value) {
                this.windowService.scrollToTop();
            }
        }
    };
    PopUp.prototype.close = function () {
        this.messageService.cloakChanged.next(false);
        this.isPopUpShowing = false;
    };
    return PopUp;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PopUp.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PopUp.prototype, "popupid", void 0);
PopUp = __decorate([
    core_1.Component({
        selector: 'popup',
        template: "<div class=\"popup-in\" [hidden]=\"!isPopUpShowing\">\n                    <div class=\"popup-header\"><div class=\"form-header\">{{title}}</div>\n                    <button class=\"cbutton close\" (click)=\"close()\">{{'buttons.close' | translate }}</button></div>\n                    <div class=\"fieldset-compact\"><ng-content></ng-content></div>\n                </div>"
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService, window_service_1.WindowService])
], PopUp);
exports.PopUp = PopUp;
//# sourceMappingURL=PopUp.js.map