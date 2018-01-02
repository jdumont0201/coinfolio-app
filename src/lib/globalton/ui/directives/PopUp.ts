import {Component, Directive, Input, ElementRef, ViewChild, Inject}         from '@angular/core';
import { MessageService }    from '../../core/services/message.service';
//import {CUSTOM_PIPES} from "../pipes/pipes";
import {WindowService} from '../../core/services/window.service';

@Component({
    selector: 'popup',
    template: `<div class="popup-in" [hidden]="!isPopUpShowing">
                    <div class="popup-header"><div class="form-header">{{title}}</div>
                    <button class="cbutton close" (click)="close()">{{'buttons.close' | translate }}</button></div>
                    <div class="fieldset-compact"><ng-content></ng-content></div>
                </div>`


})

export class PopUp {
    isPopUpShowing: boolean = false;
    @Input() title: string;
    @Input() popupid: number;

    constructor(private messageService: MessageService, private windowService: WindowService) {

        messageService.popupChanged.subscribe(value => this.updatePopup(value), error => console.log("Error updating popup" + error), () => console.log('done'));

    }
    updatePopup(msg: { value: boolean, id: number }, isall?:boolean): void {
        if (msg.id === -1) { //all popups
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
    }
    close() {
        this.messageService.cloakChanged.next(false);
        this.isPopUpShowing = false;
    }
}
