import {Component, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service";
import {EventService} from "../../lib/localton/services/event.service";
import {Workspace,Panel,Item,Row,Tab} from "../../lib/localton/interfaces/interfaces";
import {Logic} from "../../logic/Logic";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {WorkspaceService} from "../../lib/localton/services/workspace.service";
@Component({
  selector: 'app-menu-list',
  templateUrl: 'template.html'

})
@Injectable()
export class AppMenuList implements OnInit{
  selected: null;
  showLogin = false;
  showPanelCreator = false;
  showSubscribe = false;
  editedPanel=null;
  //workspace: any = []

  currentPanel;// = this.workspace[0]



  myWorkspace;
  boardId: string;



  currentWorkspace:Workspace;
  myPanels={}
  panels=[];
  constructor(public appConfigService: AppConfigService, public eventService: EventService,public logic:Logic,public authService:AuthService,public workspaceService:WorkspaceService) {
    console.log("+MENU")

    this.loadWorkspaceData()

  }
  loadWorkspaceData(){
    this.currentWorkspace=this.workspaceService.getCurrentWorkspace()
    this.myPanels=this.workspaceService.getPanelsObject();
  }
  workspaceUpdated(val){
    this.loadWorkspaceData()
  }
  ngOnInit(){
    this.eventService.workspaceUpdatedEvent.subscribe((val) => this.workspaceUpdated(val))
    console.log("MENU WORKSPACES",this.currentWorkspace)
  }
  select(p) {
    this.selected = p
  }

  addPanel() {
    this.eventService.showPanelCreator()
  }

  setPanel(p:Panel) {
    console.log("Set Panel menu")
    this.eventService.setPanel(p)
  }

  isLoaded(p){return p in this.myPanels}
}
