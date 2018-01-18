import {Component, Input, OnInit, Injectable, ViewChild, ViewEncapsulation, Inject} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {EventService} from "../../lib/localton/services/event.service";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {AppSubscribeComponent} from "../subscribe/component";
import {Logic} from "../../logic/Logic";
import {RequestService} from "../../lib/globalton/core/services/request.service";
import {ApiService} from "../../lib/globalton/core/services/api.service";
import {StockChart, Chart} from 'angular-highcharts';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-welcome',
    templateUrl: 'template.html',
    styleUrls: ['styles.css'],

    encapsulation: ViewEncapsulation.None

})
@Injectable()
export class AppWelcomeComponent extends AppSubscribeComponent {
    _this
    constructor(public logic: Logic,public consoleService:ConsoleService,public authService: AuthService,public router:Router, public dialog: MatDialog, public appConfigService: AppConfigService, public eventService: EventService, public apiService: ApiService, public requestService: RequestService) {
        super(logic, consoleService,authService, appConfigService, eventService, apiService, requestService)
        this._this=this;
    }

    close() {
        this.eventService.hideWelcome();
        this.eventService.hideVeil()
    }

    demoBrokers = ['binance', 'kraken', 'hitbtc']

    demoInterval
    demovalue2
    demoPortfolio = {binance: 5045.2, kraken: 2165.55, 'hitbtc': 1989.74}
    dd=new Date("2018/01/16")
    tweets = [{userscreenname: 'Bitcoin News', username: 'BTCTN', retweets: 74, favorites: 140, text: "Cryptocurrency App Users Increase 14-Fold in South Korea http://ift.tt/2B6AS1e  #Bitcoin"}]
    chartOptions = {
        chart: {
            spacingBottom: 0,
            spacingTop: 0,
            spacingLeft: 0,
            spacingRight: 0,

            type: 'pie',  margin: [0, 0, 0, 0], backgroundColor: {
                linearGradient: {x1: 0, y1: 0, x2: 1, y2: 1},
                stops: [
                    [0, 'transparent'],
                    [1, 'transparent']
                ]
            }
        },
        exporting: {enabled: false},
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        subtitle: {
            text: '',
            style: {
                display: 'none'
            }
        },
        credits: {enabled: false},
        series: [{name: "Portfolio", data: [{name: 'BTC', y: 4000}, {name: 'USDT', y: 6000}, {name: 'ETH', y: 1000}, {name: 'TRX', y: 650}, {name: 'NEO', y: 950}]}],
        plotOptions: {
            pie: {colors: ["#CBF078", "#e4c828", "#F1B963", "#E46161", "#35B0AB", "#226B80", "#8785A2"],
            dataLabels:{distance:5}},
            series: {


                animation: false
            }
        }
    }
    chart;
    v = {
        'binance': {ask: 995, bid: 985, oldask: 995, oldbid: 985},
        'kraken': {ask: 1005, bid: 995, oldask: 995, oldbid: 985},
        'hitbtc': {ask: 992, bid: 981, oldask: 995, oldbid: 985}
    };

    ngOnInit() {

        this.demoInterval = setInterval(() => {

            for (let k = 0; k < this.chartOptions.series[0].data.length; ++k) {
                this.chartOptions.series[0].data[k].y = this.chartOptions.series[0].data[k].y + Math.round(10000 * Math.random()) / 10
            }


            this.chart = new Chart(this.chartOptions)
            this.tweets[0].retweets += Math.round(Math.random() * 10)
            this.tweets[0].favorites += Math.round(Math.random() * 15)

            this.demoBrokers.forEach((b) => {
                this.v[b].oldbid = this.v[b].bid
                this.v[b].oldask = this.v[b].ask
                this.v[b].bid = this.v[b].bid + Math.round(Math.random() * 2 * 10) / 10
                this.v[b].ask = this.v[b].ask + Math.round(Math.random() * 2 * 10) / 10


                setTimeout(() => {
                    this.demoPortfolio[b] = (b == "binance" ? 5000 : 2000) + Math.round(Math.random() * 1000 * 100) / 100 - 30

                }, Math.round(100 * Math.random()))

            })
        }, 1800)
    }

    more() {
        let dialogRef = this.dialog.open(WelcomeDialog, {data:{title:"Always stay informed !",resp:"I will !" },width: '250px'});
        dialogRef.afterClosed().subscribe(result => {
            dialogRef.close()
        });
    }
    moreportfolio() {
        let dialogRef = this.dialog.open(WelcomeDialog, {data:{title:"Growing !",resp:"Good news !" },width: '250px'});
        dialogRef.afterClosed().subscribe(result => {
            dialogRef.close()
        });
    }
    afterSignup(){
        this.router.navigate(["/signup/brokers"])
    }

}


@Component({
    selector: 'dialog-welcome',
    template: `<h1 mat-dialog-title>{{data.title}}</h1>
    <div mat-dialog-content>    </div>    <div mat-dialog-actions>

        <button mat-button (click)="onNoClick()" [mat-dialog-close]="" cdkFocusInitial>{{data.resp}}</button>
    </div>`,
})
export class WelcomeDialog {
    constructor(public dialogRef: MatDialogRef<WelcomeDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {

        this.dialogRef.close();
    }

}

