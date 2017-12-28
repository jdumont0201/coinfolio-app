import {Component, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {StockChart, Chart} from 'angular-highcharts';
import {Logic} from "../../logic/Logic";
import {ImportService} from "../../lib/localton/services/import.service";

@Component({
  selector: 'app-import-cmc',
  templateUrl: 'template.html'

})
@Injectable()
export class AppImportCMCPage {
  file: string;

  source: string = "coinmarketcap";
  base: string;

  constructor(public requestService: RequestService, public dataService: DataService, public logic: Logic,public importService:ImportService) {

  }

  doImport() {
    this.importService.importCoinMarketCapTicker(this.source,this.file,this.base)
  }


}
