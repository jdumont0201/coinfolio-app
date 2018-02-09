import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {StockChart, Chart} from 'angular-highcharts';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";

import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
    selector: 'app-widget-twitter-timeline',
    templateUrl: 'template.html'

})
@Injectable()
export class AppTwitterTimelineComponent implements OnInit {
    @Input() username;

    tweets;
    key;
    isLoading = true;

    constructor(public consoleService:ConsoleService,public logic: Logic, public appConfigService: AppConfigService, public requestService: RequestService) {


    }

    ngOnInit() {
        this.init()
    }

    init() {
        this.isLoading = true;
        this.load(this.username, (res) => {
            this.isLoading = false;
        });
    }

    parseTweets(res): any[] {
        console.log(res)
        const R = res.result;
        let A = [];
        for (let k in R) {
            const tweet = R[k];
            A.push({
                id: tweet.id_str,
                text: tweet.full_text,
                image: tweet.user.profile_image_url,
                userscreenname: tweet.user.screen_name,
                url: tweet.entities.urls.length > 0 ? tweet.entities.urls[0].url : "no",
                userid: tweet.user.id,
                username: tweet.user.name,
                date: tweet.created_at,
                retweets: tweet.retweet_count,
                favorites: tweet.favorite_count
            })
        }
        return A;
    }

    load(q: string, f: Function) {
        this.logic.getTwitterTimeline(q, (res) => {
            console.log("tw", q, res);
            let A = this.parseTweets(res);
            this.tweets = A;

            f(A)
        });
    }
}
