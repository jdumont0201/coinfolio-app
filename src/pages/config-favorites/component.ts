import {Component, Injectable, ViewChild} from '@angular/core';
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

@Component({
    selector: 'app-config-favorites',
    templateUrl: 'template.html'
})
@Injectable()
export class AppConfigFavoritesPage {
    user;
    listing

    constructor(public authService: AuthService, public tradingService: TradingService, public requestService: RequestService, public consoleService:ConsoleService,public dataService: DataService, public eventService: EventService, public logic: Logic, public snackBar: MatSnackBar) {

        console.log("favinit")
        this.logic.getMe((res) => {
            this.user = res;
        })
        this.authService.loginChanged.subscribe((val) => {
            this.consoleService.eventReceived("loginChanged --> configFavorites")
            this.logic.getMe((res) => {
                this.user = res;
            })
        })
        this.eventService.brokerLoadedEvent.subscribe((val) => {
            this.consoleService.eventReceived("brokerLoadedEvent --> configFavorites")
            this.update();
        });

        this.update();


    }

    update() {
        this.listing = this.tradingService.getListing()
        console.log("favinit upd ", this.listing)
    }

    add(pair, broker) {
        if (!this.user.favoritePairs)
            this.user.favoritePairs = [];
        this.user.favoritePairs.push({pair: pair, broker: broker})


        this.logic.saveUser(this.user, (u) => {
            if (u) {
                this.authService.favoritePairs=this.user.favoritePairs ;
                this.snackBar.open('Pair ' + pair + ' added', null, {duration: 3000});
            } else {

                this.snackBar.open('Cannot add pair ' + pair + ' to favorites', null, {duration: 3000});
            }
        })
    }

    remove(favorite) {
        console.log("REMOVE",favorite)
        if (!this.user.favoritePairs)
            return;

        let idx:number = Structures.getIndexByMatch(this.user.favoritePairs, {pair: favorite.pair, broker: favorite.broker})
        if (idx == -1) {
            console.log("notf",idx);
            return;
        }
        this.user.favoritePairs.splice(idx, 1)
        this.authService.favoritePairs=this.user.favoritePairs ;
        this.logic.saveUser(this.user, (u) => {
            if (u) {
                this.snackBar.open('Favorite ' + favorite.pair + ' removed', null, {duration: 3000});
                this.authService.favoritePairs=this.user.favoritePairs ;
                this.eventService.updateFavorites(this.user.favoritePairs)

            } else {

                this.snackBar.open('Cannot add pair ' + favorite.pair + ' to favorites', null, {duration: 3000});
            }
        })
    }
}
