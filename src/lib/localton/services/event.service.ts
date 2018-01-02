import {Injectable, OnInit} from "@angular/core"
import {Output} from "@angular/core"
import {EventEmitter} from '@angular/core';
import {ConsoleService} from "../../globalton/core/services/console.service";
import {AuthService} from "../../globalton/core/services/auth.service";
import {AppConfigService} from "./appconfig.service";
import {ConfigService} from "../../globalton/core/services/config.service";
@Injectable()
export class EventService implements OnInit {
  @Output() panelCreatorEvent:EventEmitter<any>=new EventEmitter<boolean>()
  @Output() loginEvent:EventEmitter<boolean>=new EventEmitter<boolean>()
  @Output() subscribeEvent:EventEmitter<boolean>=new EventEmitter<boolean>()
  @Output() panelChangedEvent:EventEmitter<boolean>=new EventEmitter<boolean>()
  @Output() workspaceUpdatedEvent:EventEmitter<any>=new EventEmitter<boolean>()
    @Output() menuDisplayUpdatedEvent:EventEmitter<any>=new EventEmitter<boolean>()


  isMenuDisplayed:boolean=true;
  isMobile:boolean=false;
  isMenuPinned:boolean=false;
  isVeilVisible:boolean=false;
  isLoadingVisible:boolean=true;
  isWelcomeVisible:boolean=false;


  showWelcome(){
    this.consoleService.ui("showwelcome");
    this.isWelcomeVisible=true
  }
  hideWelcome(){
    this.consoleService.ui("hidewelcome");
    this.isWelcomeVisible=false;
  }

  showVeil(){
    this.consoleService.ui("showVeil");
    this.isVeilVisible=true
  }
  hideVeil(){
    this.consoleService.ui("hideVeil");
    this.isVeilVisible=false;
  }
  hideLoading(){
    this.consoleService.ui("hideLoading");
    this.isLoadingVisible=false;
  }
  constructor(public consoleService:ConsoleService,public authService:AuthService, public appConfigService:AppConfigService,public configService:ConfigService){
    this.init();
//    this.configService.perSiteConfigured.subscribe(value => this.postConfigEvent(value), error => console.log("Error postConfigEvent" + error), () => console.log('done'));

  }
  ngOnInit(){
    console.log("[EVENT] ONINIT")
      this.authService.loginChanged.subscribe(value => this.loginChanged(value), error => console.log("Error postConfigEvent" + error), () => console.log('done'));
  }
  loginChanged(value?   ){
    console.log("[EVENT] POSTCONFIG")
      if(this.authService.isAuthenticated())
        this.hideLoading();
    else{
      this.showWelcome()
      this.showVeil()
      }

      //this.isWelcomeVisible=this.isVeilVisible= this.authService.isAuthenticated()?false:true;
  }

  init(){
    console.log("[EVENT] initEvent")
    if(window.innerWidth<800)
      this.isMobile=true;
    else
      this.isMobile=false;
    if(this.isMobile) this.isMenuDisplayed=false; else this.isMenuDisplayed=true;
    this.loginChanged()
  }
  resized() {
    console.log("[EVENT] resized",window.innerWidth)
    this.init();
  }

  showPanelCreator(){
    this.panelCreatorEvent.emit({display:true})
  }
  hidePanelCreator(){
    console.log("[EVENT] > hidePanelCreator")
    this.panelCreatorEvent.emit({display:false})
  }
  loadPanelCreator(p){
    console.log("[EVENT] > loadPanelCreator",p)
    this.panelCreatorEvent.emit({load:p})
  }
  unloadPanelCreator(){
    console.log("EVENT > unloadPanelCreator")
    this.panelCreatorEvent.emit({unload:true})
  }
  showLogin(){
    this.loginEvent.emit(true)
  }
  hideSubscribe(){
    this.subscribeEvent.emit(false)
  }
  showSubscribe(){
    this.subscribeEvent.emit(true)
  }
  hideLogin(){
    this.loginEvent.emit(false)
  }
  showPanel(w){
    this.panelChangedEvent.emit(w)
  }
  setPanel(p){
    console.log("set panel",p)
    this.showPanel(p)
  }
}
