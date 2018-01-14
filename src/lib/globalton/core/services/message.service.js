"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//import * as Toast from 'nativescript-toast';
var ErrorMessage = (function () {
    function ErrorMessage(type, code, stack, opt) {
        this.type = type;
        this.code = code;
        this.stack = stack;
        this.opt = opt;
        this.isDisplayed = true;
        this.date = new Date();
    }
    return ErrorMessage;
}());
exports.ErrorMessage = ErrorMessage;
var FlashMessage = (function () {
    function FlashMessage(type, message, isLongLasting, classe, link) {
        this.type = type;
        this.message = message;
        this.isLongLasting = isLongLasting;
        this.classe = classe;
        this.link = link;
        this.isDisplayed = true;
        this.hasAppeared = false;
        this.date = new Date();
    }
    return FlashMessage;
}());
exports.FlashMessage = FlashMessage;
var core_1 = require("@angular/core");
var MessageService = (function () {
    function MessageService(consoleService) {
        this.consoleService = consoleService;
        this.errorsChanged = new core_1.EventEmitter();
        this.flashChanged = new core_1.EventEmitter();
        this.loadingChanged = new core_1.EventEmitter();
        this.updateActivity = new core_1.EventEmitter();
        this.savingChanged = new core_1.EventEmitter();
        this.sideMenuChanged = new core_1.EventEmitter();
        this.omnibarRequested = new core_1.EventEmitter();
        this.cloakChanged = new core_1.EventEmitter();
        this.popupChanged = new core_1.EventEmitter();
        this.menuPinned = new core_1.EventEmitter();
        this.hideHeader = new core_1.EventEmitter();
        this.showMask = new core_1.EventEmitter();
        this.libraryLoaded = new core_1.EventEmitter();
        this.pipelineContactChanged = new core_1.EventEmitter();
        this.consoleService.serv("+ MessageService");
    }
    MessageService.prototype.addAlert = function (message, isLongLasting, link) {
        console.log("addflash", message);
        var E = new FlashMessage("add", message, isLongLasting, "orange", link);
        this.flashChanged.emit(E);
    };
    MessageService.prototype.addError = function (errorCode, error, desc) {
        console.log("adderrror", errorCode, error, "desc", desc);
        var errstr = JSON.stringify(error);
        var E = new ErrorMessage("add", errorCode, errstr, desc);
        this.errorsChanged.emit(E);
    };
    MessageService.prototype.readError = function (serverErrMsg) {
        console.log("Messageservice readrrror", serverErrMsg);
        var stackString = JSON.stringify(serverErrMsg.stack);
        var E = new ErrorMessage("add", serverErrMsg.code, stackString, serverErrMsg.opt);
        this.errorsChanged.emit(E);
    };
    MessageService.prototype.addConfirm = function (msg) {
        console.log("Messageservice addConfirm", msg);
        //let E = new ErrorMessage("add", msg.code,{},msg.opt);
        //this.errorsChanged.emit(E);
        /* let toast = Toast.makeText(
         msg
         );
         toast.show();
     */ 
    };
    MessageService.prototype.addFlash = function (message, isLongLasting, classe, link) {
        console.log("addflash", message);
        var E = new FlashMessage("add", message, isLongLasting, classe, link);
        this.flashChanged.emit(E);
    };
    MessageService.prototype.updateActivityMenu = function (show) {
        this.updateActivity.emit(show);
    };
    MessageService.prototype.addMessage = function (message) {
        console.log("addMessage", message);
        var E = new FlashMessage("add", message, true);
        this.flashChanged.emit(E);
    };
    MessageService.prototype.resetFlash = function () {
        var E = new ErrorMessage("reset");
        this.flashChanged.emit(E);
    };
    MessageService.prototype.resetErrors = function () {
        var E = new ErrorMessage("reset");
        this.errorsChanged.emit(E);
    };
    MessageService.prototype.showLoading = function () {
        this.loadingChanged.emit(true);
    };
    MessageService.prototype.hideLoading = function () {
        this.loadingChanged.emit(false);
    };
    MessageService.prototype.showSaving = function () {
        this.savingChanged.emit(true);
    };
    MessageService.prototype.hideSaving = function () {
        this.savingChanged.emit(false);
    };
    MessageService.prototype.showCloak = function () {
        this.cloakChanged.emit(true);
    };
    MessageService.prototype.hideCloak = function () {
        this.cloakChanged.emit(false);
    };
    MessageService.prototype.showPopup = function (id) {
        this.popupChanged.emit({ value: true, id: id });
    };
    MessageService.prototype.hidePopup = function (id) {
        this.popupChanged.emit({ value: false, id: id });
    };
    MessageService.prototype.hideAllPopups = function () {
        console.log("Hide all popups");
        this.popupChanged.emit({ value: false, id: -1 });
    };
    MessageService.prototype.fadeTo = function (router, navigate, params) {
        this.showMask.emit(true);
        setTimeout(function () {
            if (params)
                router.navigate(navigate);
            else
                router.navigate(navigate);
        }, 300);
    };
    MessageService.prototype.fadeIn = function () {
        //setTimeout(()=> {
        this.showMask.emit(false);
        //},300);
    };
    __decorate([
        core_1.Output()
    ], MessageService.prototype, "errorsChanged", void 0);
    __decorate([
        core_1.Output()
    ], MessageService.prototype, "flashChanged", void 0);
    __decorate([
        core_1.Output()
    ], MessageService.prototype, "loadingChanged", void 0);
    __decorate([
        core_1.Output()
    ], MessageService.prototype, "updateActivity", void 0);
    __decorate([
        core_1.Output()
    ], MessageService.prototype, "savingChanged", void 0);
    __decorate([
        core_1.Output()
    ], MessageService.prototype, "sideMenuChanged", void 0);
    __decorate([
        core_1.Output()
    ], MessageService.prototype, "omnibarRequested", void 0);
    __decorate([
        core_1.Output()
    ], MessageService.prototype, "cloakChanged", void 0);
    __decorate([
        core_1.Output()
    ], MessageService.prototype, "popupChanged", void 0);
    __decorate([
        core_1.Output()
    ], MessageService.prototype, "menuPinned", void 0);
    __decorate([
        core_1.Output()
    ], MessageService.prototype, "hideHeader", void 0);
    __decorate([
        core_1.Output()
    ], MessageService.prototype, "showMask", void 0);
    __decorate([
        core_1.Output()
    ], MessageService.prototype, "libraryLoaded", void 0);
    __decorate([
        core_1.Output()
    ], MessageService.prototype, "pipelineContactChanged", void 0);
    MessageService = __decorate([
        core_1.Injectable()
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;
