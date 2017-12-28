import {Component, Output, Input, Injectable, ViewChild, OnInit} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";
import {EventService} from "../../lib/localton/services/event.service";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {WorkspaceService} from "../../lib/localton/services/workspace.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-generic',
  templateUrl: 'template.html'

})
@Injectable()
export class AppGenericPage implements OnInit {

  @Input() currentPanel;
  boardId;
  constructor(public requestService: RequestService, public dataService: DataService, public eventService: EventService,public consoleService:ConsoleService  , public authService: AuthService,public workspaceService:WorkspaceService, private route: ActivatedRoute) {

    this.route.params.subscribe((params: Params) => {
      this.boardId = params['id'];
      console.log(this.boardId);
      console.log("+ GENERIC",this.boardId)
      this.loadPanel()
    });


  }

  ngOnInit() {
    this.consoleService.ui("GENERIC > INIT", this.currentPanel)
    this.eventService.panelChangedEvent.subscribe((val) => this.panelUpdated(val));
    this.eventService.workspaceUpdatedEvent.subscribe((val) => this.workspacelUpdated(val));


  }
  workspacelUpdated(val){
    console.log("GENERIC workspacelUpdated")
this.loadPanel();
  }
  loadPanel(){
    if(!this.boardId)
      this.currentPanel=this.workspaceService.getFirstPanel()
    else
      this.currentPanel=this.workspaceService.getPanel(this.boardId)
  }
  panelUpdated(w) {
    this.consoleService.ui("GENERIC > panel updated", w)
    this.currentPanel = w;
    this.readPanel()
  }

  editPanel() {
    this.eventService.showPanelCreator()
  }

  readPanel() {
    //this.consoleService.ui("readpanel",this.contentstr)
    this.currentPanel.tabs = JSON.parse(this.currentPanel.content)
    this.consoleService.ui("GENERIC > readPanel", this.currentPanel)

  }

  openPanelEditor(p) {
    this.consoleService.ui("GENERIC > openPanelEditor")
    this.eventService.showPanelCreator()
    this.eventService.loadPanelCreator(p)
  }
}
