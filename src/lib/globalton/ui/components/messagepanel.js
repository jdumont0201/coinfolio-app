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
var config_service_1 = require("../services/config-all.service");
var core_2 = require("@ngx-translate/core");
var Toast = require("nativescript-toast");
var MessagePanel = (function () {
    function MessagePanel(messageService, configService, translateService) {
        var _this = this;
        this.messageService = messageService;
        this.configService = configService;
        this.translateService = translateService;
        this.errors = [];
        this.flashes = [];
        this.isLoading = false;
        this.isSaving = false;
        this.flashDuration = 3000;
        this.showLoadingPanel = false;
        this.errors = [];
        this.flashTimeout = this.configService.FLASH_MSG_TIMEOUT;
        messageService.errorsChanged.subscribe(function (value) { return _this.updateErrors(value); }, function (error) { return console.log("Error updating errors" + error); }, function () { return console.log('done'); });
        messageService.flashChanged.subscribe(function (value) { return _this.updateFlash(value); }, function (error) { return console.log("Error updating flash" + error); }, function () { return console.log('done'); });
        messageService.loadingChanged.subscribe(function (value) { return _this.updateLoading(value); }, function (error) { return console.log("Error updating errors" + error); }, function () { return console.log('done'); });
        messageService.savingChanged.subscribe(function (value) { return _this.updateSaving(value); }, function (error) { return console.log("Error updating errors" + error); }, function () { return console.log('done'); });
    }
    MessagePanel.prototype.openPage = function (page) {
        //this.nav.setRoot(page.component);
    };
    MessagePanel.prototype.hideMessage = function (error) {
        error.isDisplayed = false;
    };
    MessagePanel.prototype.updateErrors = function (error) {
        console.log(" messagepanel updateErrors", error);
        if (error.type === "reset")
            this.errors = [];
        else if (error.type === "add") {
            //            this.errors.push(error);
            this.translateService.get("errors." + error.code).subscribe(function (res) {
                var msg = res; // + "<br/>" + JSON.stringify(error.stack);
                var toast = Toast.makeText(msg);
                toast.show();
                /*let toast = this.toastController.create({
                    message: msg,
                    cssClass:"red",
                    duration: 3000
                });
                toast.present();*/
            });
        }
        else {
            console.error("messagepanel unknown type", error.type);
        }
    };
    MessagePanel.prototype.updateFlash = function (msg) {
        console.log("updateflash");
        if (msg.type === "reset")
            this.flashes = [];
        else if (msg.type === "add") {
            this.translateService.get(msg.message).subscribe(function (res) {
                var t;
                if (!msg.isLongLasting)
                    t = Toast.makeText(res);
                else
                    t = Toast.makeText(res);
                //                  t=this.toastController.create( {message:res,cssClass:msg.classe,position:"bottom",dismissOnPageChange:true,showCloseButton:true});
                // t.present();
                t.show();
            });
            //this.flashes.push(msg);
            //setTimeout(()=>{this.flashes[this.flashes.length-1].hasAppeared=true},200);
            //if(!msg.isLongLasting)
            //    setTimeout(function(){msg.isDisplayed=false;},this.flashTimeout);
        }
    };
    MessagePanel.prototype.updateLoading = function (error) {
        this.isLoading = error;
        if (this.showLoadingPanel) {
            if (error)
                this.loader.present();
            else
                this.loader.dismiss();
        }
    };
    MessagePanel.prototype.showLoading = function () {
        this.isLoading = true;
        //
        //
        //
    };
    MessagePanel.prototype.hideLoading = function () {
        this.isLoading = false;
        //    this.loader.dismiss();
    };
    MessagePanel.prototype.updateSaving = function (error) {
        this.isSaving = error;
    };
    MessagePanel.prototype.showSaving = function () {
        this.isSaving = true;
    };
    MessagePanel.prototype.hideSaving = function () {
        this.isSaving = false;
    };
    return MessagePanel;
}());
MessagePanel = __decorate([
    core_1.Component({
        selector: 'message-panel',
        template: "<div id=\"errors-panel\">\n    <div *ngFor=\"let e of errors\">\n        <span class=\"error\" *ngIf=\"e.isDisplayed\">\n            <span class=\"title\">{{'errors.'+e.code | translate }}</span>\n            <span class=\"date\">{{e.date | date:'medium'}}</span>\n            <span class=\"content\">{{e.stack }}</span>\n            <span class=\"close\" (click)=\"hideMessage(e)\">X</span>\n        </span>\n    </div>\n</div>  \n<div id=\"loading-indicator\" [hidden]=\"!isLoading\"> <ion-spinner name=\"crescent\"></ion-spinner>   </div>\n<div id=\"saving-indicator\" [hidden]=\"!isSaving\">    Saving</div>\n"
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        config_service_1.ConfigService, core_2.TranslateService])
], MessagePanel);
exports.MessagePanel = MessagePanel;
//# sourceMappingURL=messagepanel.js.map
