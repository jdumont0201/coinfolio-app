import {Injectable} from "@angular/core"
import {Output} from "@angular/core"
import {EventEmitter} from '@angular/core';
import {Logic} from "../../../logic/Logic";
import {ConfigService} from "../../globalton/core/services/config.service";
import {EventService} from "./event.service";
import {AppConfigProfilePage} from "../../../pages/config-profile/component";
import {AppConfigService} from "./appconfig.service";

@Injectable()
export class WorkspaceService {
  constructor(public logic: Logic, public configService: ConfigService, public eventService: EventService, public appConfigService:AppConfigService) {
    console.log("MENU > Loading Sidebar")
    this.logic.loadMyPanels((res) => {
      this.panelsObject = res.object;
      this.panelsArray = res.array;
      this.setSpecialPanels()
      this.loadWorkspaces(() => {
        //this.loadFirstPanel()
      });
    })
  }

  setSpecialPanels() {
    for(let i=0;i<this.appConfigService.specialPanels.length;++i){
      let p=this.appConfigService.specialPanels[i]

        this.panelsObject[p.id] = p;
        this.panelsArray.push(p)
    }
  }

  workspaces;
  currentWorkspace;
  panelsObject;
  panelsArray;

  setWorkspaces(w) {

  }

  getWorkspace() {

  }

  getCurrentWorkspace() {
    console.log("GETCUR", this.currentWorkspace)
    return this.currentWorkspace
  }

  getPanelArray() {
    console.log("gpa", this.panelsArray)
    return this.panelsArray
  }

  getPanelsObject() {
    console.log("gpa", this.panelsObject)
    return this.panelsObject
  }

  getAllWorkspaces() {
    return this.workspaces
  }

  getPanel(boardId: string): any {
    console.log("this.getpanel", boardId, this.panelsObject)
    if (boardId)
      if (this.panelsObject && boardId in this.panelsObject) {
        let p = this.panelsObject[boardId];
        p.tabs = JSON.parse(p.content)
        return p;
      }

  }

  parsePanel(p) {
    p.tabs = JSON.parse(p.content)
  }

  loadSidebar() {

  }

  loadWorkspaces(f) {
    console.log("MENU > loading workspaces")
    this.logic.getMyWorkspaces((res) => {
      console.log("MENU > WORKSPACES", res)
      this.workspaces = res;
      if (this.workspaces.length == 0)
        this.logic.saveWorkspace({panels: [], name: "Main workspace"}, (res) => {
          this.workspaces = [res]
        })
      this.setCurrentWorkspace();


      f();
    });
  }

  setCurrentWorkspace() {
    if (this.workspaces.length == 1)
      this.currentWorkspace = this.workspaces[0]
    else if (this.workspaces.length > 1)
      this.currentWorkspace = this.workspaces[0]
    this.eventService.workspaceUpdatedEvent.emit(this.currentWorkspace)
  }

  getFirstPanel() {
    console.log("MENU > loadFirstPanel", this.currentWorkspace, this.panelsObject)


    if (this.currentWorkspace && this.currentWorkspace.panels && this.currentWorkspace.panels.length > 0) {

      let boardId = this.currentWorkspace.panels[0];
      if (boardId in this.panelsObject) {
        let p = this.panelsObject[boardId];
        console.log("MAIN > currentpanel", p)
        p.tabs = JSON.parse(p.content)
        return p
      }
    } else {
      console.log("empty panels", this.currentWorkspace)
    }
  }
}
