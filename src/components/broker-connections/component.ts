import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {StockChart, Chart} from 'angular-highcharts';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {EventService} from "../../lib/localton/services/event.service"
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";

import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {TradingService} from "../../lib/localton/services/trading.service";

@Component({
    selector: 'app-broker-connections',
    templateUrl: 'template.html',
    styleUrls:['styles.css']
})
@Injectable()
export class AppBrokerConnectionsComponent {
    user;
    checks = {}

    constructor(public eventService: EventService,public tradingService:TradingService, public appConfigService: AppConfigService, public authService: AuthService, public logic: Logic, public snackBar: MatSnackBar) {
        if (this.authService.isAuthenticated()) {
            console.log("logged")
            this.logic.getMe((user) => {
                this.user = user;
                if (!user.ConnectionBinance) user.ConnectionBinance = false;
                if (!user.ConnectionKraken) user.ConnectionKraken = false;
                this.appConfigService.possibleBrokers.forEach((b)=>{
                    this.check(b)
                })

                console.log("this.user", this.user)
            })
        } else
            console.log("notlogged")

    }

    canAcccessPublicData(brokerName) {
        return this.checks[brokerName].publicdata;
    }

    canAcccessPrivateData(brokerName) {
        return this.checks[brokerName].privatedata;
    }

    canSendOrders(brokerName) {
        return this.checks[brokerName].orders;
    }

    check(name) {
        if (name === "binance") {
            this.checks[name] = {publicdata: false, privatedata: false, orders: false}
            this.logic.BinanceGetAllocation((res) => {
                this.checks[name].privatedata = true
            })
            this.logic.BinanceGetOHLC("ETHBTC", "1m", (res) => {
                this.checks[name].publicdata = true
            })

            //this.logic.BinanceGetOHLC("ETHBTC","1m",(res)=>{this.checks["binance"].publicd=true })
        }

    }

    submit(name) {
        setTimeout(() => {
            this.logic.saveUser(this.user, (res) => {
                this.snackBar.open("User saved. Loading broker...", null, {duration: 3000})
                this.check(name)
                this.tradingService.getBrokerByName(name).loadBroker((res)=>{
                    this.snackBar.open("Broker loaded", null, {duration: 3000})
                })
            })
        }, 1000)
    }
    goTo(link){
        window.open(link, "_blank");
    }
}
