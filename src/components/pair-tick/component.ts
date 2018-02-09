import {Component, Input, OnInit, Injectable, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {TradingService} from "../../lib/localton/services/trading.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {Refreshing} from "../../lib/localton/components/Refreshing/component";
import {EventService} from "../../lib/localton/services/event.service";
import {Tick} from "../../lib/localton/structures/Ticker";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {PublicDataService} from "../../lib/localton/services/publicdata.service";
import {CryptoPair} from "../../lib/localton/structures/Listing";

@Component({
    selector: 'app-pair-tick',
    templateUrl: 'template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class AppPairTickComponent extends Refreshing implements OnInit, OnDestroy {
    @Input() pair: string;
    @Input() broker: string;
    @Input() showPrice: boolean = true;
    value;
    lastprice;
    currentprice;
    lastTime;
    closeTime;
    p;

    constructor(public tradingService: TradingService, public publicDataService: PublicDataService, public authService: AuthService, public refreshService: RefreshService, private cd: ChangeDetectorRef, public consoleService: ConsoleService, public eventService: EventService) {
        super(refreshService, eventService, consoleService)
        //this.tradingService.PriceUpdatedEvent.subscribe((param) => this.priceUpdated(param))


    }

    ngOnInit() {
        console.log("AppPairTickComponent init", this.broker, this.pair);
        this.cd.markForCheck();
        if (!this.usePublicData) {
            let pool = this.broker + "-" + "change-" + this.pair;
            this.refreshService.createPool(pool);
            this.refreshService.getPool(pool).define(4000, (f) => {
                let B = this.tradingService.getBrokerByName(this.broker)
                if (!B) {
                    f();
                    return
                }
                let T = B.getTicker();
                let c: Tick = T.getTick(this.pair)
                if (c) {
                    T.load24hChangePerPair(this.pair, (res) => {
                        c.change = res.change;
                        c.p = res.current;
                        c.changeCloseTime = res.closeTime;
                        c.changeLastTime = res.lastTime;
                        c.changelastprice = res.last;
                        f({last: res.last, current: res.current, change: res.change, p: c.p, changeCloseTime: c.changeCloseTime, changeLastTime: c.changeLastTime});
                    });
                } else {
                    console.log("Load 24h but no tick ", c, this.pair)
                }

            })
            this.refreshService.getPool(pool).enable()

            let update = () => {
                console.log("AppPairTickComponent update")
                if (this.usePublicData) {
                    let L = this.publicDataService.getListingByName(this.broker)
                    let c: CryptoPair = L.content[this.pair]
                    if (c) {
                        this.currentprice = c.last;//T.content[this.pair].p;
                        //this.lastprice = c.changelastprice;
                        //this.lastTime = c.changeLastTime;
                        //this.closeTime = new Date(c.changeCloseTime).toString();
                        this.p = c.last
//                    let v = ((this.currentprice - c.changelastprice) / c.changelastprice) * 100;
                        this.value = null;
                    }

                } else {
                    let B = this.tradingService.getBrokerByName(this.broker)
                    let T = B.getTicker();
                    let c: Tick = T.getTick(this.pair)
                    this.currentprice = c.p;//T.content[this.pair].p;
                    this.lastprice = c.changelastprice;
                    this.lastTime = c.changeLastTime;
                    this.closeTime = new Date(c.changeCloseTime).toString();
                    this.p = c.p;
                    let v = ((this.currentprice - c.changelastprice) / c.changelastprice) * 100;
                    this.value = v;

                }
                this.cd.markForCheck();
            }
            this.subscribeToRefresh(pool, update)
            update();
        }
    }

    usePublicData=true;

    ngOnDestroy() {
        if(!this.usePublicData){
        let pool = this.broker + "-" + "change-" + this.pair;

        this.unsubscribeToRefresh(pool)
        let isFav = this.authService.isInFavorites(this.broker, this.pair);
        console.log("destroy pair-tick", pool, isFav)
        if (!isFav) {//stop pools created by page, but do not stop ticker favorite pool
            this.refreshService.getPool(pool).stop()
        }
        }
    }

}
