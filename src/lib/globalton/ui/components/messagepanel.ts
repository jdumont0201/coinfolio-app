import {Component, Injectable,ViewChild}         from '@angular/core';
import {MessageService,ErrorMessage,FlashMessage   } from '../../core/services/message.service';
import {ConfigService   } from '../../core/services/config.service';
import {TranslateService} from '@ngx-translate/core'
import {ConsoleService} from "../../core/services/console.service";
@Component({
    selector: 'message-panel',
    templateUrl:'messagepanel.html'

})
@Injectable()
export class MessagePanel {
    errors: ErrorMessage[]=[];
    flashes: FlashMessage[]=[];
    isLoading:boolean=false;
    isSaving:boolean=false;
    flashTimeout:number;
    flashDuration:number=3000;

    loader:any;
    showLoadingPanel:boolean=false;
    openPage(page) {
        //this.nav.setRoot(page.component);
    }

    constructor(public messageService: MessageService,
    public configService:ConfigService,public translateService:TranslateService,public consoleService:ConsoleService) {
        this.errors=[];
        this.flashTimeout=this.configService.FLASH_MSG_TIMEOUT;
        messageService.errorsChanged.subscribe(value => this.updateErrors(value), error => console.log("Error updating errors" + error), () => console.log('done'));
        messageService.flashChanged.subscribe(value => this.updateFlash(value), error => console.log("Error updating flash" + error), () => console.log('done'));
        messageService.loadingChanged.subscribe(value => this.updateLoading(value), error => console.log("Error updating errors" + error), () => console.log('done'));
        messageService.savingChanged.subscribe(value => this.updateSaving(value), error => console.log("Error updating errors" + error), () => console.log('done'));

    }
    hideMessage(error:ErrorMessage):void{
        error.isDisplayed=false;
    }
    showToast(options){
      //todo
//      let toast = this.toastController.create(options);
  //    toast.present();
    }
    updateErrors(error:ErrorMessage): void {
        this.consoleService.eventReceived("errorsChanged --> messagePanel")
        console.log(" messagepanel updateErrors",error);
        if (error.type === "reset")
            this.errors = [];
        else if (error.type === "add") {
//            this.errors.push(error);
            this.translateService.get("errors."+error.code).subscribe((res: string) => {
                let msg = res;// + "<br/>" + JSON.stringify(error.stack);

                this.showToast({
                    message: msg,
                    cssClass:"red",
                    duration: 3000
                });
            });
        }else{
            console.error("messagepanel unknown type",error.type);
        }
    }
    updateFlash(msg:FlashMessage): void {
        this.consoleService.eventReceived("flashChanged --> messagePanel")
        console.log("updateflash");
        if (msg.type === "reset")
            this.flashes = [];
        else if (msg.type === "add") {
            this.translateService.get(msg.message).subscribe((res: string) => {
                var t;
                if(!msg.isLongLasting)


                    t=this.showToast( {message:res,cssClass:msg.classe,duration:this.flashDuration,position:"bottom"});
                else
//                t= Toast.makeText(res);

                  t=this.showToast( {message:res,cssClass:msg.classe,position:"bottom",dismissOnPageChange:true,showCloseButton:true});
               // t.present();
               t.show();
            });


            //this.flashes.push(msg);
            //setTimeout(()=>{this.flashes[this.flashes.length-1].hasAppeared=true},200);
            //if(!msg.isLongLasting)
            //    setTimeout(function(){msg.isDisplayed=false;},this.flashTimeout);
        }
    }
    updateLoading(error):void{
        this.isLoading=error;
        if(this.showLoadingPanel){
        if(error)
          this.loader.present();
        else
          this.loader.dismiss();
        }
    }
    showLoading():void{
        this.isLoading=true;
//
//
//
 }
    hideLoading():void{
        this.isLoading=false;
    //    this.loader.dismiss();
    }
    updateSaving(error):void{
        this.isSaving=error;
    }
    showSaving():void{
        this.isSaving=true;
    }
    hideSaving():void{
        this.isSaving=false;
    }
}
