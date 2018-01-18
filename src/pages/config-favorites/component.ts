import {ChangeDetectionStrategy, Component, Injectable, ViewChild, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";
import {EventService} from "../../lib/localton/services/event.service";
import {Logic} from "../../logic/Logic";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {MatSnackBar} from "@angular/material";
import {FormGroup} from "@angular/forms";
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";
import {TradingService} from "../../lib/localton/services/trading.service";
import {Structures} from "../../lib/globalton/core/utils/utils";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {CheckValid} from "../../lib/localton/components/CheckValid/component";
import {RefreshService} from "../../lib/localton/services/refresh.service";

@Component({
    selector: 'app-config-favorites',
    templateUrl: 'template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class AppConfigFavoritesPage extends CheckValid implements OnDestroy{
    user;
    listing

    ngOnDestroy(){
       this.unsubscribeAllEvents()
    }
    constructor(public authService: AuthService,public refreshService:RefreshService, public tradingService: TradingService, public requestService: RequestService, public consoleService: ConsoleService, public dataService: DataService, public eventService: EventService, public logic: Logic, public snackBar: MatSnackBar, public cd: ChangeDetectorRef) {
        super(consoleService)
        console.log("favinit")
        this.logic.getMe((res) => {
            this.user = res;
            console.log("favinit", this.user)
            this.cd.markForCheck()
        })
        this.doSubscribe("loginChanged", this.authService.loginChanged, (val) => {
            this.consoleService.eventReceived("loginChanged --> configFavorites")
            this.logic.getMe((res) => {
                this.user = res;
                this.cd.markForCheck()
            })
        }, "config-favorites")
        this.doSubscribe("brokerLoadedEvent", this.eventService.brokerLoadedEvent, (val) => {
            this.consoleService.eventReceived("brokerLoadedEvent --> configFavorites")
            this.update();
        }, "config-favorites")

        this.update();
        this.doSubscribe("searchUpdatedEvent", this.eventService.searchUpdatedEvent, (val) => {
            this.searchUpdated(val)
        }, "config-favorites")
    }

    filterValue;

    searchUpdated(val) {
        console.log("favori search", val)
        this.filterValue = val
        this.cd.markForCheck()
    }

    isMatchingFilter(p) {

        if (!this.filterValue) return true;
        let s = this.filterValue.split(" ")
        let n = s.length;
        let b = p.brokers.join("").toLowerCase()
        let name = p.name.toLowerCase();
        if (n == 1) {
            let matchBroker = b.indexOf(this.filterValue) > -1;
            let matchName = name.indexOf(this.filterValue) > -1;
            //console.log("favori",p,this.filterValue,matchBroker,matchName)
            if (matchBroker || matchName)
                return true
        } else {
            let res = true;

            for (let i = 0; i < n; ++i) {
                let w = s[i]
                let matchBroker = b.indexOf(w) > -1;
                let matchName = name.indexOf(w) > -1;
                //  console.log("favori mul test",p,w,matchBroker,matchName)
                if (b.indexOf(w) > -1 || name.indexOf(w) > -1)
                    res = true
                else {
                    res = false;
                    return false

                }
            }
            return res;
        }
    }

    update() {
        this.listing = this.tradingService.getListing()
        console.log("favinit upd ", this.listing)
        this.cd.markForCheck()
    }

    add(pair, broker) {
        if (!this.user.favoritePairs)
            this.user.favoritePairs = [];
        this.user.favoritePairs.push({pair: pair, broker: broker})


        this.logic.saveUser(this.user, (u) => {
            if (u) {
                this.authService.favoritePairs = this.user.favoritePairs;
                this.snackBar.open('Pair ' + pair + ' added', null, {duration: 3000});
                this.eventService.updateFavorites(this.user.favoritePairs)
            } else {

                this.snackBar.open('Cannot add pair ' + pair + ' to favorites', null, {duration: 3000});
            }
        })
    }

    remove(favorite) {
        console.log("REMOVE", favorite)
        if (!this.user.favoritePairs)
            return;

        let idx: number = Structures.getIndexByMatch(this.user.favoritePairs, {pair: favorite.pair, broker: favorite.broker})
        if (idx == -1) {
            console.log("notf", idx);
            return;
        }
        this.user.favoritePairs.splice(idx, 1)
        this.authService.favoritePairs = this.user.favoritePairs;
        this.logic.saveUser(this.user, (u) => {
            if (u) {
                this.snackBar.open('Favorite ' + favorite.pair + ' removed', null, {duration: 3000});
                this.authService.favoritePairs = this.user.favoritePairs;
                    this.eventService.updateFavorites(this.user.favoritePairs)
                this.refreshService.getPool(favorite.broker+"-change-"+favorite.pair).stop()
            } else {
                this.snackBar.open('Cannot add pair ' + favorite.pair + ' to favorites', null, {duration: 3000});
            }
        })
    }
}
