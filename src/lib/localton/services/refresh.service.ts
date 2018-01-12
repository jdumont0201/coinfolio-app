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

    constructor(public name: string, public refreshService: RefreshService, public consoleService: ConsoleService) {

    }

    enable() {
        this.consoleService.refresh("POOL enable ", this.name)
        if(!this.f || !this.delay) this.consoleService.refresh("POOL error no f or delay")
        this.active = true;
        if (!this.refreshService.isPaused)
            this.interval = setInterval(() => {
                this.consoleService.refresh("POOL run ",this.name)
                this.f(() => {
                    this.event.emit({refreshed: true, name: name})
                });

            }, this.delay)
    }

    define(delay, f) {
        this.consoleService.refresh("POOL define ", this.name,delay)
        this.delay = delay;
        this.f = f;
    }

    disable() {
        this.active = false;
        clearInterval(this.interval);
    }

    stop() {

        clearInterval(this.interval);
    }

}

@Injectable()
export class RefreshService {
    isPaused = false;
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

    getEventByKey(key): EventEmitter<any> {
        if (key in this.pools)
            return this.pools[key].event
        else {
            console.log("REFRSH notfound rs", this.pools, key)
        }
    }

    constructor(public authService: AuthService, public appConfigService: AppConfigService, public consoleService: ConsoleService, public eventService: EventService, public logic: Logic) {
        this.eventService.brokerLoadedEvent.subscribe((val) => this.brokerLoaded(val))
        this.init();
    }

    tradingService: TradingService

    setTradingService(t: TradingService) {
        this.tradingService = t;
        this.tradingService.EnabledBrokersLoadingFinishedEvent.subscribe((val) => this.allBrokersLoaded(val))
    }

    allBrokersLoaded(val) {
        let k = "ticker"
        if (!(k in this.pools)) this.create(k)
        this.getPool(k).define(5000, (f) => {
            this.tradingService.enabledBrokers.forEach((b) => {
                this.tradingService.getBrokerByName(b).getPortfolio().refresh(() => {
                    this.tradingService.getBrokerByName(b).getTicker().refresh(() => {
                        this.tradingService.getBrokerByName(b).getPortfolio().setUSDValues(this.tradingService.getBrokerByName(b).getTicker())
                    })
                })
            })

            /*let L=this.tradingService.getListTickerRefresh();
            async.eachSeries(L,(l:{pair:string,broker:string},cb:Function)=>{
                let T=this.tradingService.getBrokerByName(l.broker).getTicker();
                T.getPairChange(l.pair,(res)=>{
                    if(res)
                        console.log("  Refreshed",l,res.current)

                    cb()
                })
            },(err)=>{
                this.tradingService.enabledBrokers.forEach((b)=>{
                    this.tradingService.getBrokerByName(b).getPortfolio().setUSDValues(this.tradingService.getBrokerByName(b).getTicker())
                })
                f();
            })*/
        })
        this.getPool(k).enable()
    }


    getPool(k) {
        if (!(k in this.pools)) this.create(k)
        return this.pools[k]
    }

    brokerLoaded(broker: { key: string, loaded: boolean }) {
        let k = broker.key + "-portfolio-ticker";
        this.getPool(k).define(10000, (f: Function) => {
            let B = this.tradingService.getBrokerByName(broker.key)
            B.getPortfolio().refresh(() => {
                B.getTicker().refresh(() => {
                    console.log("refreshed")
                    f()
                })
            })
        })
        this.getPool(k).enable()

    }

    create(key: string) {
        this.pools[key] = new Pool(key, this, this.consoleService)

    }

    init() {


    }

}