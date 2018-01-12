import {Injectable, OnInit} from "@angular/core"
import {Output} from "@angular/core"
import {EventEmitter} from '@angular/core';
import {ConsoleService} from "../../globalton/core/services/console.service";
import {AuthService} from "../../globalton/core/services/auth.service";
import {AppConfigService} from "./appconfig.service";
import {ConfigService} from "../../globalton/core/services/config.service";
import {MessageService} from "../../globalton/core/services/message.service";
import {MatSnackBar} from "@angular/material";

@Injectable()
export class EventService implements OnInit {
    @Output() panelCreatorEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() loginEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
    @Output() subscribeEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
    @Output() panelChangedEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
    @Output() workspaceUpdatedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() menuDisplayUpdatedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() windowResizedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() brokerLoadedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() isFullscreenEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() favoriteUpdatedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() poolDefinedEvent: EventEmitter<any> = new EventEmitter<string>()

    isTickerVisible:boolean=true;
    isMenuDisplayed: boolean = true;
    isMobile: boolean = false;
    isMenuPinned: boolean = true;
    isVeilVisible: boolean = false;
    private isLoadingVisible: boolean = true;
    isWelcomeVisible: boolean = false;
    isFullscreen:boolean=false;
    enableFullscreen(){
        this.isFullscreen=true
        this.isFullscreenEvent.emit(true)
    }
    disableFullscreen(){
        this.isFullscreen=false
        this.isFullscreenEvent.emit(false)
    }
    showWelcome() {
        this.consoleService.ui("showwelcome");
        this.isWelcomeVisible = true
    }

    hideWelcome() {
        this.consoleService.ui("hidewelcome");
        this.isWelcomeVisible = false;
    }

    showVeil() {
        this.consoleService.ui("showVeil");
        this.isVeilVisible = true
    }

    hideVeil() {
        this.consoleService.ui("hideVeil");
        this.isVeilVisible = false;
    }

    hideLoading() {
        this.consoleService.ui("hideLoading");
        this.isLoadingVisible = false;
    }
showLoading() {
        this.consoleService.ui("showLoading");
        this.isLoadingVisible = true;
    }
getIsLoadingVisible(){
        //console.log("getisloading",this.isLoadingVisible)
        return this.isLoadingVisible
}
    constructor(public consoleService: ConsoleService, public authService: AuthService, public appConfigService: AppConfigService, public configService: ConfigService,public messageService:MessageService,public snackBar: MatSnackBar) {
        this.consoleService.event("+")
        this.init();
//    this.configService.perSiteConfigured.subscribe(value => this.postConfigEvent(value), error => console.log("Error postConfigEvent" + error), () => console.log('done'));
        this.messageService.errorsChanged.subscribe((err)=>this.errorsUpdated(err))
    }

    errorsUpdated(err:any){
        this.snackBar.open(err.code,null,{duration:3000});
    }
    ngOnInit() {
        this.consoleService.event("ONINIT")
        this.authService.loginChanged.subscribe(value => this.loginChanged(value), error => console.log("Error postConfigEvent" + error), () => console.log('done'));
    }

    loginChanged(value?) {
        this.consoleService.event("loginChanged")
        if (this.authService.isAuthenticated()){
            //this.hideLoading();
        }else {
//            this.showWelcome()
  //          this.showVeil()
        }

        //this.isWelcomeVisible=this.isVeilVisible= this.authService.isAuthenticated()?false:true;
    }

    windowResized() {
        if (window.innerWidth < 800)
            this.isMobile = true;
        else
            this.isMobile = false;
        if (this.isMobile) this.isMenuDisplayed = false; else this.isMenuDisplayed = this.isMenuPinned?true:false;
    }

    init() {
        this.consoleService.event("init")
        this.windowResized()
        this.loginChanged()
    }

    resized() {
        this.consoleService.event("resized", window.innerWidth)
        this.windowResizedEvent.emit({w:window.innerWidth,h:window.innerHeight})
        this.windowResized()
    }

    showPanelCreator() {
        this.panelCreatorEvent.emit({display: true})
    }

    hidePanelCreator() {
        this.consoleService.event("hidePanelCreator")
        this.panelCreatorEvent.emit({display: false})
    }

    loadPanelCreator(p) {
        this.consoleService.event("loadPanelCreator", p)
        this.panelCreatorEvent.emit({load: p})
    }

    unloadPanelCreator() {
        this.consoleService.event("unloadPanelCreator")
        this.panelCreatorEvent.emit({unload: true})
    }

    showLogin() {
        this.loginEvent.emit(true)
    }

    hideSubscribe() {
        this.subscribeEvent.emit(false)
    }

    showSubscribe() {
        this.subscribeEvent.emit(true)
    }

    hideLogin() {
        this.loginEvent.emit(false)
    }

    showPanel(w) {
        this.panelChangedEvent.emit(w)
    }

    setPanel(p) {
        this.consoleService.event("set panel", p)
        this.showPanel(p)
    }
    updateFavorites(favorites){
        this.favoriteUpdatedEvent.emit(favorites);
    }
}
