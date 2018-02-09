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
    @Output() socketDefinedEvent: EventEmitter<any> = new EventEmitter<string>()
    @Output() UIEvent: EventEmitter<any> = new EventEmitter<string>()
    @Output() rightMenuUpdatedEvent: EventEmitter<any> = new EventEmitter<string>()
    @Output() searchUpdatedEvent: EventEmitter<any> = new EventEmitter<string>()
    @Output() nonSeenEventsUpdated: EventEmitter<any> = new EventEmitter<string>()

    nbNonSeenEvents=0;
    theme="blue"
    isTickerVisible: boolean = true;
    isMenuDisplayed: boolean = true;
    isMenu2Displayed: boolean = false;
    isMobile: boolean = false;
    isMenuPinned: boolean = true;
    isVeilVisible: boolean = false;
    private isLoadingVisible: boolean = false;
    isWelcomeVisible: boolean = false;
    isFullscreen: boolean = false;

    setTheme(t){
        this.theme=t;
    }
    openMenu(broadcast?:boolean){
        this.isMenuDisplayed = true
        if(this.isMenuPinned || broadcast) {
            console.log("changing view -> update")
            this.consoleService.eventSent("menuDisplayUpdatedEvent <-- eventService")
            this.menuDisplayUpdatedEvent.emit(true)
        }else{
            console.log("no changing view",this.isMenuPinned)
        }
    }
    closeMenu(){
        this.isMenuDisplayed = false
        if(this.isMenuPinned){
            console.log("changing view -> update")
        this.consoleService.eventSent("menuDisplayUpdatedEvent <-- eventService")
        this.menuDisplayUpdatedEvent.emit(false)
        }else{
            console.log("no changing view",this.isMenuPinned)
        }

    }
    enableFullscreen(chartId) {
        this.isFullscreen = true
        this.isFullscreenEvent.emit({fullscreen:true,id:chartId})
    }
    showForgottenPasswordTab(){
        this.UIEvent.emit({key:"showforgottenpassword"})
    }
    openRightMenu(tab) {
        this.consoleService.eventSent("rightMenuUpdatedEvent <-- eventService")
        this.isMenu2Displayed=true;
        this.rightMenuUpdatedEvent.emit(tab)

    }
    closeMenu2(){
        this.rightMenuUpdatedEvent.emit(false)
    }
    updateNbUnseenEvents(){
        this.consoleService.eventSent("nonSeenEventsUpdated <-- eventService")
        this.nonSeenEventsUpdated.emit()
    }
    disableFullscreen(chartId) {
        this.isFullscreen = false
        this.isFullscreenEvent.emit({fullscreen:false,id:chartId})
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
    getIsLoadingVisible() {
        //console.log("getisloading",this.isLoadingVisible)
        return this.isLoadingVisible
    }
    constructor(public consoleService: ConsoleService, public authService: AuthService, public appConfigService: AppConfigService, public configService: ConfigService, public messageService: MessageService, public snackBar: MatSnackBar) {
        this.consoleService.event("+")
        this.authService.setEventService(this)


        this.init();
        this.messageService.errorsChanged.subscribe((err) => this.errorsUpdated(err))
    }

    errorsUpdated(err: any) {
        this.consoleService.eventReceived("errorsChanged --> eventService")
        //this.snackBar.open(err.code+" "+err.desc+" "+err.url, null, {panelClass:'red',duration: 3000});
    }

    ngOnInit() {
        this.consoleService.event("ONINIT")
        this.authService.loginChanged.subscribe(value => this.loginChanged(value), error => console.log("Error postConfigEvent" + error), () => console.log('done'));
    }

    loginChanged(value?) {
        this.consoleService.event("loginChanged")
        if (this.authService.isAuthenticated()) {
            //this.hideLoading();
        } else {
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
        if (this.isMobile) this.isMenuDisplayed = false; else this.isMenuDisplayed = this.isMenuPinned ? true : false;
    }

    init() {
        this.consoleService.event("init")
        this.windowResized()
        this.loginChanged()
    }

    resized() {
        this.consoleService.event("resized", window.innerWidth)
        this.windowResizedEvent.emit({w: window.innerWidth, h: window.innerHeight})
        this.windowResized()
    }

    showPanelCreator() {
        this.panelCreatorEvent.emit({display: true})
    }

    hidePanelCreator() {
        this.consoleService.event("hidePanelCreator")
        this.panelCreatorEvent.emit({display: false})
    }
    defineNewSocket(id){
        this.consoleService.eventSent("socketDefinedEvent <-- eventService"+id)
        this.socketDefinedEvent.emit({display: false})
    }
  updateSearch(v) {
        this.consoleService.eventSent("searchUpdated")
        this.searchUpdatedEvent.emit(v)
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

    updateFavorites(favorites) {
        this.consoleService.eventSent("favoriteUpdatedEvent <-- eventService"+favorites)
        this.favoriteUpdatedEvent.emit(favorites);
    }
}
