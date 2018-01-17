import {ConsoleService} from './console.service';

//import * as Toast from 'nativescript-toast';
export class ErrorMessage {
    date:Date;
    isDisplayed:boolean = true;

    constructor(public type:string, public code:string, public stack:any, public desc:any,public url:any) {
        this.date = new Date();
    }
}

export class FlashMessage {
    date:Date;
    isDisplayed:boolean = true;
    hasAppeared:boolean=false;
    constructor(public type:string, public message?:string,  public isLongLasting?:boolean, public classe?:string,public link?:{target:string[],msg:string}) {
        this.date = new Date();
    }
}

import {Injectable, Output, EventEmitter} from "@angular/core";

@Injectable()
export class MessageService {
    @Output() errorsChanged:EventEmitter<any> = new EventEmitter();
    @Output() flashChanged:EventEmitter<any> = new EventEmitter();
    @Output() loadingChanged:EventEmitter<any> = new EventEmitter();
    @Output() updateActivity:EventEmitter<any> = new EventEmitter();

    @Output() savingChanged:EventEmitter<any> = new EventEmitter();
    @Output() sideMenuChanged:EventEmitter<any> = new EventEmitter();
    @Output() omnibarRequested:EventEmitter<any> = new EventEmitter();
    @Output() cloakChanged:EventEmitter<any> = new EventEmitter();
    @Output() popupChanged:EventEmitter<any> = new EventEmitter();
    @Output() menuPinned:EventEmitter<any> = new EventEmitter();
    @Output() hideHeader:EventEmitter<any> = new EventEmitter();
    @Output() showMask:EventEmitter<any> = new EventEmitter();
    @Output() libraryLoaded:EventEmitter<any> = new EventEmitter();
    @Output() pipelineContactChanged:EventEmitter<any> = new EventEmitter();

    constructor(private consoleService:ConsoleService) {

        this.consoleService.serv("+ MessageService");
    }
    addAlert(message:string, isLongLasting?:boolean,link?:{target:string[],msg:string}):void {
        console.log("addflash", message);
        let E = new FlashMessage("add", message, isLongLasting,"orange",link);
        this.flashChanged.emit(E);
    }
    addError(errorCode:string, error:any, desc:string,url:string):void {
        console.log("adderrror", errorCode, error, "desc", desc);
        let errstr:string = JSON.stringify(error);
        let E = new ErrorMessage("add", errorCode,errstr , desc,url);
        this.consoleService.eventSent("errorsChanged <-- messageService")
        this.errorsChanged.emit(E);
    }
    readError(serverErrMsg:any):void {
        console.log("Messageservice readrrror", serverErrMsg);
        let stackString:string = JSON.stringify(serverErrMsg.stack);
        let E = new ErrorMessage("add", serverErrMsg.code,stackString,serverErrMsg.opt,serverErrMsg.url);
        this.consoleService.eventSent("errorsChanged <-- messageService")
        this.errorsChanged.emit(E);
    }

    addConfirm(msg:any):void {
        console.log("Messageservice addConfirm", msg);
        //let E = new ErrorMessage("add", msg.code,{},msg.opt);
        //this.errorsChanged.emit(E);
       /* let toast = Toast.makeText(
        msg
        );
        toast.show();
    */}

    addFlash(message:string, isLongLasting?:boolean,classe?:string,link?:{target:string[],msg:string}):void {
        console.log("addflash", message);
        let E = new FlashMessage("add", message, isLongLasting,classe,link);
        this.flashChanged.emit(E);
    }
    updateActivityMenu(show:boolean){
        this.updateActivity.emit(show);
    }
    addMessage(message:string):void {
        console.log("addMessage", message);
        let E = new FlashMessage("add", message, true);
        this.flashChanged.emit(E);
    }

    resetFlash():void {
        let E = new ErrorMessage("reset",null,null,null,null);
        this.flashChanged.emit(E);
    }

    resetErrors():void {
        let E = new ErrorMessage("reset",null,null,null,null);
        this.errorsChanged.emit(E);
    }

    showLoading() {
        this.loadingChanged.emit(true);
    }

    hideLoading() {
        this.loadingChanged.emit(false);
    }

    showSaving() {
        this.savingChanged.emit(true);
    }

    hideSaving() {
        this.savingChanged.emit(false);
    }

    showCloak():void {
        this.cloakChanged.emit(true);
    }

    hideCloak():void {
        this.cloakChanged.emit(false);
    }

    showPopup(id:number):void {
        this.popupChanged.emit({value: true, id: id});
    }

    hidePopup(id:number):void {
        this.popupChanged.emit({value: false, id: id});
    }

    hideAllPopups():void {
        console.log("Hide all popups")
        this.popupChanged.emit({value: false, id: -1});
    }
    
    fadeTo(router,navigate:string[], params?:any) {
        this.showMask.emit(true);
        setTimeout(()=> {
            if (params)
                router.navigate(navigate);
            else
                router.navigate(navigate);
        }, 300);
    }

    fadeIn() {
        //setTimeout(()=> {
        this.showMask.emit(false);
        //},300);
    }
}
