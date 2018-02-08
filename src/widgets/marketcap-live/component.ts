import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {StockChart, Chart} from 'angular-highcharts';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";

import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";
import {EventService} from "../../lib/localton/services/event.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
    selector: 'app-marketcap-live',
    templateUrl: 'template.html'

})
@Injectable()
export class AppMarketCapLiveWidget extends DataAndChartTemplate {


    displayedColumns = [ 'symbol', 'marketcap','change_pc_24h'];


    @Input() symbol: string;
    base: string = "USD"
    source: string = "ccc"

    options = {
        chart: {type: 'area'},
        candlestick: {color: 'green', upColor: 'red'},
        credits: {enabled: false},
        plotOptions: {
            series: {
                animation: false
            }
        },
        navigator: {
            series: {

                fillColor: '#cccccc',
                fillOpacity: 0.1,
                lineColor: 'grey'
            }
        },
        rangeSelector: {
            selected: 4,
            inputEnabled: false,
            buttonTheme: {
                visibility: 'hidden'
            },
            labelStyle: {
                visibility: 'hidden'
            }
        }
    }


    constructor(public consoleService:ConsoleService,public logic: Logic, public appConfigService: AppConfigService, public eventService: EventService, public refreshService: RefreshService, public requestService: RequestService, public dataService:DataService) {
        super(consoleService,refreshService, logic, appConfigService, eventService)
    }

    isLoading = true;

    updateData() {
        this.dataService.perform("topmarketcap2",{}, (res) => {
            console.log("resutop",res)
            this.data = res;
            this.dataSource = new MatTableDataSource(this.data);
            this.isLoading = false

        })
    }


    setValue(v: string) {
        this.symbol = v;
        if (v === "GLOBA") this.source = "cmc"
        else this.source = "ccc"
        this.updateData();

    }

    setBase(v: string) {
        this.base = v;
        this.updateData();
    }

}
