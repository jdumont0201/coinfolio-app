import {Component, Input, OnInit, Injectable, ViewChild, OnChanges} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {EventService} from "../../lib/localton/services/event.service"
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";


import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {TradingService} from "../../lib/localton/services/trading.service";
import {Strings} from "../../lib/globalton/core/utils/utils";
import {CheckValid} from "../../lib/localton/components/CheckValid/component";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
    selector: 'app-broker-connect',
    templateUrl: 'template.html',
    styleUrls: ['styles.css']
})
@Injectable()
export class AppBrokerConnectionComponent extends CheckValid implements OnInit {
    user;
    checks = {}
    @Input() broker;
    @ViewChild('stepper') stepper;
    enabledKey;
    brokerName;
    selectedIndex

    constructor(public eventService: EventService, public tradingService: TradingService, public appConfigService: AppConfigService, public authService: AuthService, public logic: Logic, public snackBar: MatSnackBar, public consoleService: ConsoleService) {

        super(consoleService)

    }

    ngOnInit() {
        if (this.broker)
            this.brokerName = Strings.Capitalize(this.broker)
        this.checkValid(this.broker, "unvalid broker" + this.broker)
        this.enabledKey = "Connection" + Strings.Capitalize(this.broker)
        if (this.authService.isAuthenticated()) {
//            console.log("logged")
            this.logic.getMe((user) => {
                this.user = user;
                console.log("checkv", this.user, this.enabledKey)
                if (!user[this.enabledKey]) user[this.enabledKey] = false;
                if (user[this.enabledKey] == "false") user[this.enabledKey] = false;
                this.appConfigService.possibleBrokers.forEach((b) => {
                    this.check(b)
                })
            })
        } else {

        }
        //console.log("notlogged")
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

    isBeingConfigured = false;
    configuringMsg;

    restore() {
        this.progress = 0
        this.configuringMsg = "Restoring previous " + this.brokerName + " parameters"
        this.isBeingConfigured = true
        this.user[this.enabledKey] = true
        setTimeout(() => {
            this.progress = 5
            this.logic.saveUser(this.user, (res) => {
                this.progress = 20
                this.snackBar.open("Loading " + this.broker + "...", null, {duration: 3000})
                this.check(name)
                this.tradingService.getBrokerByName(this.broker).loadBroker((res) => {
                    this.progress = 90
                    this.snackBar.open("Broker loaded", null, {duration: 3000})
                    this.tradingService.enabledBrokers.push(this.broker);
                    this.tradingService.brokersLoadedAfterConfigEvent.emit(this.broker)
                    this.progress = 100
                    this.isBeingConfigured = false
                })
            })
        }, 1000)
    }

    check(name) {
        if (name === "binance") {
            this.checks[name] = {publicdata: false, privatedata: false, orders: false}
            this.logic.BinanceGetAllocation((res) => {
                this.checks[name].privatedata = true
            })
            //this.logic.BinanceGetOHLC("ETHBTC", "1m", (res) => {
            //    this.checks[name].publicdata = true
            //})

            //this.logic.BinanceGetOHLC("ETHBTC","1m",(res)=>{this.checks["binance"].publicd=true })
        }

    }

    progress = 0

    submit(status) {
        this.configuringMsg = "Enabling " + this.brokerName + "..."
        this.progress = 0
        this.isBeingConfigured = true
        this.user[this.enabledKey] = true
        setTimeout(() => {
            this.progress = 5
            this.logic.saveUser(this.user, (res) => {
                this.progress = 20
                this.tradingService.getBrokerByName(this.broker).unloadBroker()
                this.progress = 30
                if (status == "firsttime") {
                    this.snackBar.open("Loading exchange...", null, {duration: 3000})
                } else {
                    this.snackBar.open("Keys saved. Restarting " + this.brokerName + "...", null, {duration: 3000})

                }
                let name=this.broker;
                this.check(name)
                this.tradingService.getBrokerByName(name).loadBroker((res) => {
                    this.progress = 90
                    this.snackBar.open(this.brokerName + " loaded successfully.", null, {duration: 3000})
                    this.tradingService.enabledBrokers.push(this.broker);
                    this.tradingService.brokersLoadedAfterConfigEvent.emit(this.broker)
                    this.progress = 100
                    this.isBeingConfigured = false;
                })


            })
        }, 1000)
    }

    saveExisting() {

    }

    goTo(link) {
        window.open(link, "_blank");
    }

    disable() {
        this.progress = 0
        this.configuringMsg = "Disabling " + this.brokerName + ""
        this.isBeingConfigured = true
        this.snackBar.open("Unloading " + this.brokerName + "...", null, {duration: 3000})

        setTimeout(() => {
            this.progress = 5
            this.user[this.enabledKey] = false
            this.logic.saveUser(this.user, (res) => {
                this.progress = 20
                this.tradingService.getBrokerByName(this.broker).unloadBroker()
                this.progress = 100
                this.snackBar.open(this.brokerName + " unloaded.", null, {duration: 3000})
                this.isBeingConfigured = false
            })
        }, 1000);
    }
}
