import {Component, Injectable, ViewChild, Input} from '@angular/core';
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
import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
    selector: 'app-marketcap-evol2',
    templateUrl: 'template.html'

})
@Injectable()
export class AppMarketCapEvol2Component extends DataAndChartTemplate {
    @Input() symbol: string;
    @Input() period: string;
    displayedColumns = ['symbol', 'diff'];
    dataSource = new MatTableDataSource([]);

    displayedColumnsRef = ['symbol', 'ts_from', 'cap_from', 'ts_to', 'cap_to'];
    dataSourceRef = new MatTableDataSource([]);

    ts: number = 1451692800
    base: string = "USD"
    source: string = "cmc"

    length = 100;
    pageSize = 10;
    pageSizeOptions = [10, 25, 100];

    data = [];
    displayedData = [];
    isLoaded = false
    pageIndex = 0;
    isFuture = false;
    from: number;
    to: number;

    date = new FormControl(new Date(this.ts * 1000));
    serializedDate = new FormControl((new Date()).toISOString());


    options = {
        chart: {type: 'column'},
        credits: {enabled: false},
        tooltip: {
            valueSuffix: '%'
        },
        title: {text: ""},
        plotOptions: {
            column: {
                colorByPoint: true
            },
            series: {
                animation: false
            }
        },
        yAxis: {
            stackLabels: {
                enabled: true, style: {
                    fontWeight: 'bold',
                    color: 'gray'
                },
                formatter: function () {
                    // var s = this.series.options.QTotal;
                    //      return Highcharts.numberFormat(Math.round(s*100)/100,2)+'%';

                    return "aa"
                }
            }
        }
    }


    constructor(public consoleService: ConsoleService, public logic: Logic, public appConfigService: AppConfigService, public eventService: EventService, public refreshService: RefreshService) {
        super(consoleService, refreshService, logic, appConfigService, eventService, "plain")

    }

    ngOnInit() {
        this.initDate()
        this.updateData();
    }

    initDate() {
        this.setDates();

        let d = new Date();
        d.setHours(0, 0, 0, 0);

        this.ts = d.getTime() / 1000;
        this.updateDate(this.ts)
        console.log("init", this.ts);
    }

    setPeriod(p) {
        this.period = p;
        this.setDates();
        this.updateData()
    }

    setDates() {
        if (this.period === "last24h") {
            this.from = Math.floor(new Date().getTime() / 1000) - 86400;
            this.to = Math.floor(new Date().getTime() / 1000 - 60*10);
        } else if (this.period === "last7d") {
            this.from = Math.floor(new Date().getTime() / 1000) - 86400 * 7;
            this.to = Math.floor(new Date().getTime() / 1000 - 60*10);
        } else if (this.period === "last1h") {
            this.from = Math.floor(new Date().getTime() / 1000) - 3600;
            this.to = Math.floor(new Date().getTime() / 1000 - 60*10);
        } else if (this.period === "last30d") {
            this.from = Math.floor(new Date().getTime() / 1000) - 86400 * 30;
            this.to = Math.floor(new Date().getTime() / 1000);
        }
    }

    showData(res?) {
        if (res)
            this.data = res;
        if (this.data) {
            this.displayedData = this.data.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
            this.dataSource = new MatTableDataSource(this.displayedData);
            this.length = this.data.length;
            this.isLoaded = true;
        }
    }

    updatePagination(event) {
        this.pageIndex = event.pageIndex;
        this.showData();
    }

    first: number;
    firsttime: string;
    second: number;
    secondtime: string;
    diff: number;
    diffpc: number;

    updateData() {
        this.logic.getLastCap(this.symbol,(res)=>{
            console.log("ttt2", res,res[0].change_pc_24h)
            res=res[0];
            this.diffpc=res.change_pc_24h;
            this.diff=res.change_pc_24h*res.marketcap;

        //this.logic.getMarketCapEvol2(this.source, this.base, this.symbol, this.from, this.to, (res) => {
            /*
            console.log("ttt2", res)
            if (res && res.length >= 2) {
                this.first = res[0].marketcap
                this.firsttime = res[0].ts
                this.second = res[1].marketcap
                this.secondtime = res[1].ts
                this.diff = this.second - this.first;
            }*/

        })
    }

    yesterday() {
        this.updateDate(this.ts - 86400)
    }

    tomorrow() {
        this.updateDate(this.ts + 86400)
    }

    updateDate(ts) {
        if (new Date().getTime() / 1000 - ts < 0)
            this.isFuture = true
        else
            this.isFuture = false
        this.ts = ts;
        this.date = new FormControl(new Date(this.ts * 1000));
        this.updateData()
    }

    dateChanged(event: MatDatepickerInputEvent<Date>) {
        this.updateDate(new Date(event.value).getTime() / 1000)
    }
}
