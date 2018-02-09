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
    selector: 'app-twitter',
    templateUrl: 'template.html'

})
@Injectable()
export class AppTwitterComponent implements OnInit {
    @Input() symbol;
    @Input() possibleSymbols;
    @Input() mode;
    tweets;
    key;
    isLoading = true;

    constructor(public consoleService:ConsoleService,public logic: Logic, public appConfigService: AppConfigService, public requestService: RequestService) {


    }

    ngOnInit() {
        this.init()
    }

    hashtags = [];

    possibleSuffixes=[
        {type:"suffix",val:"",selected:true}
        ,{type:"suffix",val:" cryptocurrency",selected:true}
        ,{type:"prefix",val:"$",selected:true}
        ,{type:"prefix",val:"#",selected:true},
        {type:"suffix",val:" coin",selected:true}]
    buildHashtags(){
        let A=[]
        this.possibleSuffixes.forEach((s)=>{
            if(s.selected)
            if(s.type=="suffix") A.push(this.symbol+" "+s.val)
            else if(s.type=="prefix") A.push(s.val + this.symbol)
        })
        this.hashtags=A;
    }
    init() {
        this.isLoading = true;
        this.symbol = this.symbol === "GLOBAL" ? "cryptocurrency" : this.symbol;

        let query;

        this.buildHashtags()
        if (this.mode == 'general')
            query = this.hashtags.join(' OR ')
        else
            query = this.symbol;
        console.log("query",query,this.hashtags)
        this.load(query, (res) => {
            this.isLoading = false;
        });
    }

    parseTweets(res): any[] {
        console.log(res)
        const R = res.searchTweets.statuses;
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
        this.logic.getTweets(q, (res) => {
            console.log("tw", q, res);
            let A = this.parseTweets(res);
            this.tweets = A;

            f(A)
        });
    }
}
