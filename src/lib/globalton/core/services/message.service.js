"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var console_service_1 = require("./console.service");
var Toast = require("nativescript-toast");
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
        var toast = Toast.makeText(msg);
        toast.show();
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
    return MessageService;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MessageService.prototype, "errorsChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MessageService.prototype, "flashChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MessageService.prototype, "loadingChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MessageService.prototype, "updateActivity", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MessageService.prototype, "savingChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MessageService.prototype, "sideMenuChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MessageService.prototype, "omnibarRequested", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MessageService.prototype, "cloakChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MessageService.prototype, "popupChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MessageService.prototype, "menuPinned", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MessageService.prototype, "hideHeader", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MessageService.prototype, "showMask", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MessageService.prototype, "libraryLoaded", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MessageService.prototype, "pipelineContactChanged", void 0);
MessageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [console_service_1.ConsoleService])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVzc2FnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQWlEO0FBRWpELDBDQUE0QztBQUM1QztJQUlJLHNCQUFtQixJQUFXLEVBQVMsSUFBWSxFQUFTLEtBQVUsRUFBUyxHQUFRO1FBQXBFLFNBQUksR0FBSixJQUFJLENBQU87UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBSztRQUFTLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFGdkYsZ0JBQVcsR0FBVyxJQUFJLENBQUM7UUFHdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBUFksb0NBQVk7QUFTekI7SUFJSSxzQkFBbUIsSUFBVyxFQUFTLE9BQWUsRUFBVSxhQUFzQixFQUFTLE1BQWMsRUFBUSxJQUFrQztRQUFwSSxTQUFJLEdBQUosSUFBSSxDQUFPO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFTO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFRLFNBQUksR0FBSixJQUFJLENBQThCO1FBRnZKLGdCQUFXLEdBQVcsSUFBSSxDQUFDO1FBQzNCLGdCQUFXLEdBQVMsS0FBSyxDQUFDO1FBRXRCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQVBZLG9DQUFZO0FBU3pCLHNDQUErRDtBQUcvRCxJQUFhLGNBQWM7SUFpQnZCLHdCQUFvQixjQUE2QjtRQUE3QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQWhCdkMsa0JBQWEsR0FBcUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDckQsaUJBQVksR0FBcUIs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Q0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDSSxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsU0FBUztJQUNiLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUE3SEQsSUE2SEM7QUE1SGE7SUFBVCxhQUFNLEVBQUU7OEJBQWUsbUJBQVk7cURBQTJCO0FBQ3JEO0lBQVQsYUFBTSxFQUFFOzhCQUFjLG1CQUFZO29EQUEyQjtBQUNwRDtJQUFULGFBQU0sRUFBRTs4QkFBZ0IsbUJBQVk7c0RBQTJCO0FBQ3REO0lBQVQsYUFBTSxFQUFFOzhCQUFnQixtQkFBWTtzREFBMkI7QUFFdEQ7SUFBVCxhQUFNLEVBQUU7OEJBQWUsbUJBQVk7cURBQTJCO0FBQ3JEO0lBQVQsYUFBTSxFQUFFOzhCQUFpQixtQkFBWTt1REFBMkI7QUFDdkQ7SUFBVCxhQUFNLEVBQUU7OEJBQWtCLG1CQUFZO3dEQUEyQjtBQUN4RDtJQUFULGFBQU0sRUFBRTs4QkFBYyxtQkFBWTtvREFBMkI7QUFDcEQ7SUFBVCxhQUFNLEVBQUU7OEJBQWMsbUJBQVk7b0RBQTJCO0FBQ3BEO0lBQVQsYUFBTSxFQUFFOzhCQUFZLG1CQUFZO2tEQUEyQjtBQUNsRDtJQUFULGFBQU0sRUFBRTs4QkFBWSxtQkFBWTtrREFBMkI7QUFDbEQ7SUFBVCxhQUFNLEVBQUU7OEJBQVUsbUJBQVk7Z0RBQTJCO0FBQ2hEO0lBQVQsYUFBTSxFQUFFOzhCQUFlLG1CQUFZO3FEQUEyQjtBQUNyRDtJQUFULGFBQU0sRUFBRTs4QkFBd0IsbUJBQVk7OERBQTJCO0FBZi9ELGNBQWM7SUFEMUIsaUJBQVUsRUFBRTtxQ0FrQjBCLGdDQUFjO0dBakJ4QyxjQUFjLENBNkgxQjtBQTdIWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29uc29sZVNlcnZpY2V9IGZyb20gJy4vY29uc29sZS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gJ25hdGl2ZXNjcmlwdC10b2FzdCc7XHJcbmV4cG9ydCBjbGFzcyBFcnJvck1lc3NhZ2Uge1xyXG4gICAgZGF0ZTpEYXRlO1xyXG4gICAgaXNEaXNwbGF5ZWQ6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHR5cGU6c3RyaW5nLCBwdWJsaWMgY29kZT86c3RyaW5nLCBwdWJsaWMgc3RhY2s/OmFueSwgcHVibGljIG9wdD86YW55KSB7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZsYXNoTWVzc2FnZSB7XHJcbiAgICBkYXRlOkRhdGU7XHJcbiAgICBpc0Rpc3BsYXllZDpib29sZWFuID0gdHJ1ZTtcclxuICAgIGhhc0FwcGVhcmVkOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZTpzdHJpbmcsIHB1YmxpYyBtZXNzYWdlPzpzdHJpbmcsICBwdWJsaWMgaXNMb25nTGFzdGluZz86Ym9vbGVhbiwgcHVibGljIGNsYXNzZT86c3RyaW5nLHB1YmxpYyBsaW5rPzp7dGFyZ2V0OnN0cmluZ1tdLG1zZzpzdHJpbmd9KSB7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuaW1wb3J0IHtJbmplY3RhYmxlLCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VTZXJ2aWNlIHtcclxuICAgIEBPdXRwdXQoKSBlcnJvcnNDaGFuZ2VkOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIGZsYXNoQ2hhbmdlZDpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBsb2FkaW5nQ2hhbmdlZDpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSB1cGRhdGVBY3Rpdml0eTpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgc2F2aW5nQ2hhbmdlZDpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBzaWRlTWVudUNoYW5nZWQ6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgb21uaWJhclJlcXVlc3RlZDpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBjbG9ha0NoYW5nZWQ6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgcG9wdXBDaGFuZ2VkOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIG1lbnVQaW5uZWQ6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgaGlkZUhlYWRlcjpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBzaG93TWFzazpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBsaWJyYXJ5TG9hZGVkOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIHBpcGVsaW5lQ29udGFjdENoYW5nZWQ6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25zb2xlU2VydmljZTpDb25zb2xlU2VydmljZSkge1xyXG5cclxuICAgICAgICB0aGlzLmNvbnNvbGVTZXJ2aWNlLnNlcnYoXCIrIE1lc3NhZ2VTZXJ2aWNlXCIpO1xyXG4gICAgfVxyXG4gICAgYWRkQWxlcnQobWVzc2FnZTpzdHJpbmcsIGlzTG9uZ0xhc3Rpbmc/OmJvb2xlYW4sbGluaz86e3RhcmdldDpzdHJpbmdbXSxtc2c6c3RyaW5nfSk6dm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhZGRmbGFzaFwiLCBtZXNzYWdlKTtcclxuICAgICAgICBsZXQgRSA9IG5ldyBGbGFzaE1lc3NhZ2UoXCJhZGRcIiwgbWVzc2FnZSwgaXNMb25nTGFzdGluZyxcIm9yYW5nZVwiLGxpbmspO1xyXG4gICAgICAgIHRoaXMuZmxhc2hDaGFuZ2VkLmVtaXQoRSk7XHJcbiAgICB9XHJcbiAgICBhZGRFcnJvcihlcnJvckNvZGU6c3RyaW5nLCBlcnJvcjphbnksIGRlc2M/OnN0cmluZyk6dm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhZGRlcnJyb3JcIiwgZXJyb3JDb2RlLCBlcnJvciwgXCJkZXNjXCIsIGRlc2MpO1xyXG4gICAgICAgIGxldCBlcnJzdHI6c3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXJyb3IpO1xyXG4gICAgICAgIGxldCBFID0gbmV3IEVycm9yTWVzc2FnZShcImFkZFwiLCBlcnJvckNvZGUsZXJyc3RyICwgZGVzYyk7XHJcbiAgICAgICAgdGhpcy5lcnJvcnNDaGFuZ2VkLmVtaXQoRSk7XHJcbiAgICB9XHJcbiAgICByZWFkRXJyb3Ioc2VydmVyRXJyTXNnOmFueSk6dm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNZXNzYWdlc2VydmljZSByZWFkcnJyb3JcIiwgc2VydmVyRXJyTXNnKTtcclxuICAgICAgICBsZXQgc3RhY2tTdHJpbmc6c3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoc2VydmVyRXJyTXNnLnN0YWNrKTtcclxuICAgICAgICBsZXQgRSA9IG5ldyBFcnJvck1lc3NhZ2UoXCJhZGRcIiwgc2VydmVyRXJyTXNnLmNvZGUsc3RhY2tTdHJpbmcsc2VydmVyRXJyTXNnLm9wdCk7XHJcbiAgICAgICAgdGhpcy5lcnJvcnNDaGFuZ2VkLmVtaXQoRSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQ29uZmlybShtc2c6YW55KTp2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NhZ2VzZXJ2aWNlIGFkZENvbmZpcm1cIiwgbXNnKTtcclxuICAgICAgICAvL2xldCBFID0gbmV3IEVycm9yTWVzc2FnZShcImFkZFwiLCBtc2cuY29kZSx7fSxtc2cub3B0KTtcclxuICAgICAgICAvL3RoaXMuZXJyb3JzQ2hhbmdlZC5lbWl0KEUpO1xyXG4gICAgICAgIGxldCB0b2FzdCA9IFRvYXN0Lm1ha2VUZXh0KFxyXG4gICAgICAgIG1zZ1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgdG9hc3Quc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEZsYXNoKG1lc3NhZ2U6c3RyaW5nLCBpc0xvbmdMYXN0aW5nPzpib29sZWFuLGNsYXNzZT86c3RyaW5nLGxpbms/Ont0YXJnZXQ6c3RyaW5nW10sbXNnOnN0cmluZ30pOnZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWRkZmxhc2hcIiwgbWVzc2FnZSk7XHJcbiAgICAgICAgbGV0IEUgPSBuZXcgRmxhc2hNZXNzYWdlKFwiYWRkXCIsIG1lc3NhZ2UsIGlzTG9uZ0xhc3RpbmcsY2xhc3NlLGxpbmspO1xyXG4gICAgICAgIHRoaXMuZmxhc2hDaGFuZ2VkLmVtaXQoRSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVBY3Rpdml0eU1lbnUoc2hvdzpib29sZWFuKXtcclxuICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2aXR5LmVtaXQoc2hvdyk7XHJcbiAgICB9XHJcbiAgICBhZGRNZXNzYWdlKG1lc3NhZ2U6c3RyaW5nKTp2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFkZE1lc3NhZ2VcIiwgbWVzc2FnZSk7XHJcbiAgICAgICAgbGV0IEUgPSBuZXcgRmxhc2hNZXNzYWdlKFwiYWRkXCIsIG1lc3NhZ2UsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuZmxhc2hDaGFuZ2VkLmVtaXQoRSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRGbGFzaCgpOnZvaWQge1xyXG4gICAgICAgIGxldCBFID0gbmV3IEVycm9yTWVzc2FnZShcInJlc2V0XCIpO1xyXG4gICAgICAgIHRoaXMuZmxhc2hDaGFuZ2VkLmVtaXQoRSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRFcnJvcnMoKTp2b2lkIHtcclxuICAgICAgICBsZXQgRSA9IG5ldyBFcnJvck1lc3NhZ2UoXCJyZXNldFwiKTtcclxuICAgICAgICB0aGlzLmVycm9yc0NoYW5nZWQuZW1pdChFKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93TG9hZGluZygpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmdDaGFuZ2VkLmVtaXQodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZUxvYWRpbmcoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQ2hhbmdlZC5lbWl0KGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93U2F2aW5nKCkge1xyXG4gICAgICAgIHRoaXMuc2F2aW5nQ2hhbmdlZC5lbWl0KHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVTYXZpbmcoKSB7XHJcbiAgICAgICAgdGhpcy5zYXZpbmdDaGFuZ2VkLmVtaXQoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dDbG9haygpOnZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xvYWtDaGFuZ2VkLmVtaXQodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZUNsb2FrKCk6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbG9ha0NoYW5nZWQuZW1pdChmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1BvcHVwKGlkOm51bWJlcik6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3B1cENoYW5nZWQuZW1pdCh7dmFsdWU6IHRydWUsIGlkOiBpZH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVQb3B1cChpZDpudW1iZXIpOnZvaWQge1xyXG4gICAgICAgIHRoaXMucG9wdXBDaGFuZ2VkLmVtaXQoe3ZhbHVlOiBmYWxzZSwgaWQ6IGlkfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZUFsbFBvcHVwcygpOnZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGlkZSBhbGwgcG9wdXBzXCIpXHJcbiAgICAgICAgdGhpcy5wb3B1cENoYW5nZWQuZW1pdCh7dmFsdWU6IGZhbHNlLCBpZDogLTF9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZmFkZVRvKHJvdXRlcixuYXZpZ2F0ZTpzdHJpbmdbXSwgcGFyYW1zPzphbnkpIHtcclxuICAgICAgICB0aGlzLnNob3dNYXNrLmVtaXQodHJ1ZSk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcclxuICAgICAgICAgICAgaWYgKHBhcmFtcylcclxuICAgICAgICAgICAgICAgIHJvdXRlci5uYXZpZ2F0ZShuYXZpZ2F0ZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJvdXRlci5uYXZpZ2F0ZShuYXZpZ2F0ZSk7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmYWRlSW4oKSB7XHJcbiAgICAgICAgLy9zZXRUaW1lb3V0KCgpPT4ge1xyXG4gICAgICAgIHRoaXMuc2hvd01hc2suZW1pdChmYWxzZSk7XHJcbiAgICAgICAgLy99LDMwMCk7XHJcbiAgICB9XHJcbn1cclxuIl19