import {Component, Output, Injectable, ViewChild, OnInit} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";
import {EventService} from "../../lib/localton/services/event.service";
import {StockChart, Chart} from 'angular-highcharts';
import {Workspace, Panel, Item, Row, Tab} from "../../lib/localton/interfaces/interfaces";

@Component({
  selector: 'app-generic-content',
  templateUrl: 'template.html'

})
@Injectable()
export class AppGenericContent implements OnInit {
  widgetList = {0: "AppMarketCap"}
  panel;

  constructor(public requestService: RequestService, public dataService: DataService, public eventService: EventService) {

  }

  ngOnInit() {
    console.log("subsc")
    this.eventService.panelChangedEvent.subscribe((val) => this.panelUpdated(val));
  }

  panelUpdated(p: Panel) {
    console.log("panel updated", p)
    this.panel = p;
    this.readPanel()
  }

  readPanel() {
    //console.log("readpanel",this.contentstr)
    this.panel.tabs=JSON.parse(this.panel.content)
    console.log(this.panel)
  }
}
