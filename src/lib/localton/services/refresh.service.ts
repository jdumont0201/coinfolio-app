import {EventEmitter, Injectable, OnInit, Output} from "@angular/core"
import {AuthService} from "../../globalton/core/services/auth.service";
import {Logic} from "../../../logic/Logic";
import {ConsoleService} from "../../globalton/core/services/console.service";
import {Broker, BrokerCollection} from "../structures/Broker";
import {EventService} from "./event.service";
import {AppConfigService} from "./appconfig.service";
import {Crypto} from "../../../lib/localton/utils/utils";
import {Structures} from "../../../lib/globalton/core/utils/utils"
import {TradingService} from "./trading.service";
import * as async from 'async';
import {ConfigService} from "../../globalton/core/services/config.service";

export class Pool {
    active: boolean = false;
    @Output() event: EventEmitter<any> = new EventEmitter();
    delay: number;
    interval;
    f: Function;
    lastTriggered:Date;
    outcome:number=-1;
    status:string;
    constructor(public name: string, public refreshService: RefreshService, public eventService: EventService, public consoleService: ConsoleService) {

    }

    enable() {
        this.consoleService.refresh("POOL enable ", this.name)
        if (!this.f || !this.delay) this.consoleService.refresh("POOL error no f or delay")
        this.active = true;
        if (this.refreshService.isRunning)
            this.interval = setInterval(() => {
                this.consoleService.refresh("POOL run ", this.name)
                if(!this.refreshService.isRunning || !this.active) this.stop()
                else{
                    this.outcome=-1;
                    this.status="EXECUTING"
                    this.f(() => {
                        this.status="WAITING"
                        this.outcome=1;
                        this.lastTriggered=new Date()
                        this.consoleService.eventSent("POOL-" + this.name)
                        this.event.emit({refreshed: true, name: name})
                    });
                }

            }, this.delay)
    }

    define(delay, f) {
        this.status="READY"
        this.consoleService.refresh("POOL define ", this.name, delay)
        this.delay = delay;
        this.f = f;
        this.eventService.poolDefinedEvent.emit({name: this.name, delay: this.delay})
    }


    stop() {
        this.consoleService.refresh("POOL-"+this.name+" STOP")
        this.status="STOPPED";
        this.active=false;
        clearInterval(this.interval);
    }

}

@Injectable()
export class RefreshService {
    isRunning = true;
    pools: { [name: string]: Pool } = {}

    stopRefresh() {
        for (let k in this.pools)
            this.pools[k].stop()
    }

    startRefresh() {
        for (let k in this.pools)
            if (this.pools[k].active)
                this.pools[k].enable();
    }
    getPools(){
        return this.pools
    }
    subscribe(key, f) {
        if (!this.getPool(key).delay || !this.getPool(key).f) {
            this.consoleService.refresh(" !!! pool subscribe but not defined", key);
            return null;
        }
        else {
            this.consoleService.refresh("pool" + key + " subscribed");
            return this.getPool(key).event.subscribe(f)
        }
    }

    getEventByKey(key): EventEmitter<any> {
        if (key in this.pools)
            return this.pools[key].event
        else {
            console.log("REFRSH notfound rs", this.pools, key)
        }
    }

    constructor(public authService: AuthService, public appConfigService: AppConfigService, public consoleService: ConsoleService, public eventService: EventService, public logic: Logic) {
        //this.eventService.brokerLoadedEvent.subscribe((val) => this.brokerLoaded(val))

        this.init();
    }

    tradingService: TradingService

    setTradingService(t: TradingService) {
        this.tradingService = t;
        //this.tradingService.EnabledBrokersLoadingFinishedEvent.subscribe((val) => this.allBrokersLoaded(val))
        this.tradingService.TickerUpdatedEvent.subscribe((val) => this.tickerCreated(val))
        this.tradingService.PortfolioUpdatedEvent.subscribe((val) => this.portfolioCreated(val))
    }

    allBrokersLoaded(val) {
        let pool = "ticker"
        this.getPool(pool).define(5000, (f) => {
            this.tradingService.enabledBrokers.forEach((b) => {
                this.tradingService.getBrokerByName(b).getPortfolio().refresh(() => {
                    this.tradingService.getBrokerByName(b).getTicker().refresh(() => {
                        this.tradingService.getBrokerByName(b).getPortfolio().setUSDValues(this.tradingService.getBrokerByName(b).getTicker())
                        f()
                    })
                })
            })
        })
        this.getPool(pool).enable()
    }


    getPool(k) {
        if (!(k in this.pools)) {
            console.log("!!! POOL" +k+" getPool pool not created");
            this.createPool(k)
        }
        return this.pools[k]
    }

    brokerLoaded(broker: { key: string, loaded: boolean }) {
        let k = broker.key + "-portfolio-ticker";
        this.getPool(k).define(10000, (f: Function) => {
            let B = this.tradingService.getBrokerByName(broker.key)
            B.getPortfolio().refresh(() => {
                B.getTicker().refresh(() => {
                    f()
                })
            })
        })
        this.getPool(k).enable()
    }
    portfolioCreated(val: { broker: string, success: boolean }) {
        this.consoleService.eventReceived("portfolioUpdated --> refreshService",val)
        let k = val.broker + "-portfolio";
        this.getPool(k).define(5000, (f: Function) => {
            let B = this.tradingService.getBrokerByName(val.broker)
            B.getPortfolio().refresh(() => {
                    f()
            })
        })
        this.getPool(k).enable()
    }
    tickerCreated(val: { broker: string, success: boolean }) {
        this.consoleService.eventReceived("tickerUpdated --> refreshService",val)
        let k = val.broker + "-ticker";
        this.getPool(k).define(5000, (f: Function) => {
            let B = this.tradingService.getBrokerByName(val.broker)
            B.getTicker().refresh(() => {
                B.getPortfolio().setUSDValues(B.getTicker())
                    f()
            })
        })
        this.getPool(k).enable()
    }

    createPool(key: string) {
        if(!(key in this.pools)){
            this.consoleService.refresh("POOL "+key+" CREATE")
            this.pools[key] = new Pool(key, this,this.eventService, this.consoleService)
        }    else
            this.consoleService.refresh("POOL "+key+" CREATING POOL BUT ALREADY EXISTING")

    }

    init() {


    }

}