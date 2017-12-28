import {Component, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {StockChart, Chart} from 'angular-highcharts';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";

import   {DataWithPaginationTemplate} from "../../lib/localton/components/DataWithPagination/component"
@Component({
  selector: 'app-marketcap-table',
  templateUrl: 'template.html'

})
@Injectable()
export class AppMarketCapTableComponent extends DataWithPaginationTemplate {

  base: string = "USD"
  source: string = "ccc"
ts:number=1512509400;

  displayedColumns = ['symbol', 'cap'];


  constructor(public logic: Logic, public appConfigService: AppConfigService) {
    super(logic,appConfigService)
  }


  updateData() {
    this.logic.getMarketData(this.source, this.base, this.ts,(res) => {
      this.showData(res)
    })
  }

}

