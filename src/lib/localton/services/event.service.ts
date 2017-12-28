import {Injectable} from "@angular/core"
import {Output} from "@angular/core"
import {EventEmitter} from '@angular/core';
@Injectable()
export class EventService {
  @Output() panelCreatorEvent:EventEmitter<any>=new EventEmitter<boolean>()
  @Output() loginEvent:EventEmitter<boolean>=new EventEmitter<boolean>()
  @Output() subscribeEvent:EventEmitter<boolean>=new EventEmitter<boolean>()
  @Output() panelChangedEvent:EventEmitter<boolean>=new EventEmitter<boolean>()
  @Output() workspaceUpdatedEvent:EventEmitter<any>=new EventEmitter<boolean>()
  constructor(){

  }

  showPanelCreator(){
    this.panelCreatorEvent.emit({display:true})
  }
  hidePanelCreator(){
    console.log("EVENT > hidePanelCreator")
    this.panelCreatorEvent.emit({display:false})
  }
  loadPanelCreator(p){
    console.log("EVENT > loadPanelCreator",p)
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
