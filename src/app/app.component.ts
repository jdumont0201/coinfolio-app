import {Component, Output, Injectable, ViewChild, OnInit} from '@angular/core';
import {RequestService} from '../lib/globalton/core/services/request.service';
import {DataService} from "../lib/localton/services/data.service";
import {EventService} from "../lib/localton/services/event.service";
import {Logic} from "../logic/Logic";
import {ActivatedRoute, Params} from "@angular/router";
import {MessageService} from "../lib/globalton/core/services/message.service";
import {MatSnackBar} from "@angular/material";
import {TradingService} from "../lib/localton/services/trading.service";
import {ConsoleService} from "../lib/globalton/core/services/console.service";
import {PublicDataService} from "../lib/localton/services/publicdata.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
    showLogin = false;
    showPanelCreator = false;
    showSubscribe = false;
    editedPanel = null;
    //workspace: any = []

    currentPanel;// = this.workspace[0]
    myPanels;

    @ViewChild("sidenav") sidenav;
    @ViewChild("rightsidenav") rightsidenav;

    constructor(public requestService: RequestService, public consoleService: ConsoleService, public eventService: EventService, public messageService: MessageService,
                public logic: Logic, private route: ActivatedRoute, public snackBar: MatSnackBar, public tradingService: TradingService, public publicDataTrading: PublicDataService) {
        this.eventService.panelCreatorEvent.subscribe((val) => this.panelCreatorUpdated(val));
        this.eventService.loginEvent.subscribe((val) => this.loginUpdated(val));
        this.eventService.subscribeEvent.subscribe((val) => this.subscribeUpdated(val))
        this.eventService.workspaceUpdatedEvent.subscribe((val) => this.workspaceUpdated(val))
        this.eventService.isFullscreenEvent.subscribe((val) => this.fullscreenUpdated(val))
        this.eventService.brokerLoadedEvent.subscribe((val) => this.brokerLoaded(val))
        this.eventService.rightMenuUpdatedEvent.subscribe((val) => this.rightMenuUpdated(val))

        this.messageService.errorsChanged.subscribe((val) => this.errorsUpdated(val))
        //this.eventService.showLoading()
    }


    fullscreenUpdated(val) {


    }

    brokerLoaded(val) {
        //this.eventService.hideLoading()
    }

    errorsUpdated(msg: any) {
        //    console.log("error changed", msg)
        //   this.snackBar.open("Error :" + msg.code, null, {panelClass: "red", duration: 3000})
    }

    workspaceUpdated(val: any) {

    }

    panelCreatorUpdated(msg: any) {
        console.log("MAIN > panelCreatorUpdated", msg)
        if (msg && "display" in msg) {
            console.log("MAIN > panelCreatorUpdated display", msg.display)
            this.showPanelCreator = msg.display;

        } else if (msg && msg.load) {
            this.editedPanel = msg.load;
        } else if (msg && msg.unload) {
            this.editedPanel = null;
        }
    }

    subscribeUpdated(val: boolean) {
        this.showSubscribe = val;
    }

    loginUpdated(val: boolean) {
        this.showLogin = val;
    }

    switchMenu() {
        console.log("changing switch", this.eventService.isMenuPinned)
        this.sidenav.toggle();

        if (this.eventService.isMenuDisplayed)
            this.eventService.closeMenu()
        else
            this.eventService.openMenu(false)
        this.eventService.isMenuPinned = false;

    }

    rightMenuUpdated(tab) {
        this.consoleService.eventReceived("rightMenuUpdatedEvent --> appComponent", tab)
        this.rightsidenav.toggle();

    }

    processPin() {
        console.log("changing switch prpin", this.eventService.isMenuPinned)
        if (this.eventService.isMenuPinned) {
            console.log("changing switch prpin", this.eventService.isMenuPinned)
            this.eventService.closeMenu()
            this.eventService.isMenuPinned = false
        } else {
            this.eventService.openMenu(true)
            this.eventService.isMenuPinned = true
        }

    }

    backdrop() {
        //if (!this.eventService.isMobile) {
        console.log("BBBack")
        this.sidenav.close();
        this.eventService.closeMenu()
        //}
    }
}
