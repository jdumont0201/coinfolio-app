import {Component, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {StockChart, Chart} from 'angular-highcharts';
import {Logic} from "../../logic/Logic";
import {AppConfigService} from "../../lib/localton/services/appconfig.service";
import {ImportService} from "../../lib/localton/services/import.service";

@Component({
  selector: 'app-import',
  templateUrl: 'template.html'

})
@Injectable()
export class AppImportPage {
  file: string;
  interval: string;
  source: string = "kraken";
  value: string;
  base: string;

  lastimport: string;
  links = [];

  constructor(public requestService: RequestService, public dataService: DataService, public appConfigService: AppConfigService, public logic: Logic,public importService:ImportService) {
    this.importService.getLastImport(this.source,(res)=> {
      this.lastimport=res;
      this.links=this.importService.getImportLinks(this.source,this.lastimport)
    })
  }

  doImport() {
    this.importService.importKrakenPrices(this.source,this.file,this.base,this.value,this.interval)

  }

}
