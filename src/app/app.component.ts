import {Component, Output, Injectable, ViewChild, OnInit} from '@angular/core';
import {RequestService} from '../lib/globalton/core/services/request.service';
import {DataService} from "../lib/localton/services/data.service";
import {EventService} from "../lib/localton/services/event.service";
import {Logic} from "../logic/Logic";
import {ActivatedRoute, Params} from "@angular/router";
import {MessageService} from "../lib/globalton/core/services/message.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent   {
  showLogin = false;
  showPanelCreator = false;
  showSubscribe = false;
  editedPanel=null;
  //workspace: any = []

  currentPanel;// = this.workspace[0]
  myPanels;

  constructor(public requestService: RequestService,public eventService: EventService, public messageService:MessageService,public logic: Logic, private route: ActivatedRoute,public snackBar: MatSnackBar ) {
    this.eventService.panelCreatorEvent.subscribe((val) => this.panelCreatorUpdated(val));
    this.eventService.loginEvent.subscribe((val) => this.loginUpdated(val));
    this.eventService.subscribeEvent.subscribe((val) => this.subscribeUpdated(val))
    this.eventService.workspaceUpdatedEvent.subscribe((val) => this.workspaceUpdated(val))
    this.messageService.errorsChanged.subscribe((val)=>this.errorsUpdated(val))
  }

  errorsUpdated(msg:any){
    console.log("error changed",msg)
    this.snackBar.open("Error :"+msg.code,null,{panelClass:"red",duration:3000})
  }
  workspaceUpdated(val: any) {

  }
  panelCreatorUpdated(msg: any) {
    console.log("MAIN > panelCreatorUpdated",msg)
    if(msg && "display" in msg){
      console.log("MAIN > panelCreatorUpdated display",msg.display)
      this.showPanelCreator = msg.display;

    }else if(msg && msg.load){
      this.editedPanel=msg.load;
    }else if(msg && msg.unload){
      this.editedPanel=null;
    }
  }
  subscribeUpdated(val: boolean) {
    this.showSubscribe = val;
  }
  loginUpdated(val: boolean) {
    this.showLogin = val;
  }
}
