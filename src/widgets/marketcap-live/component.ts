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
import {RefreshService} from "../../lib/localton/services/refresh.service";

@Component({
    selector: 'app-marketcap-live',
    templateUrl: 'template.html'

})
@Injectable()
export class AppMarketCapLiveWidget extends DataAndChartTemplate {


    displayedColumns = [ 'name', 'market_cap_usd'];


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


    constructor(public logic: Logic, public appConfigService: AppConfigService, public eventService: EventService, public refreshService: RefreshService, public requestService: RequestService) {
        super(refreshService, logic, appConfigService, eventService)
    }

    isLoading = true;

    updateData() {
        let url = "https://api.coinmarketcap.com/v1/ticker/"
        this.requestService.get(url, (res) => {
            this.data = res.file;
            this.dataSource = new MatTableDataSource(this.data);
            this.isLoading = false

        }, this)
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
