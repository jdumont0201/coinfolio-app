import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {StockChart, Chart} from 'angular-highcharts';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";

import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";

import {TwitterService} from 'ng2-twitter';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-twitter',
  templateUrl: 'template.html'

})
@Injectable()
export class AppTwitterComponent implements OnInit {
  @Input() symbol;

  tweets;
  consumerKey = '26kAxes56Um1yJ0FV9jQ4Vtb4';
  consumerSecret = 'FSiP827AQVGdm2G6XivWOKtrAEQGoaubWAFbTqDBksSdnXEK01';
  token = '614294914-1Y5IJr5JIbTjIsJpL1vn4GE7XOazu4l0FztQtz8c';
  tokenSecret = 'krh7tQLXDdEVot4xEK7NdsVwD2Ex9hDvaB6NOHy5BENYw';
  key;

  constructor(public logic: Logic, public appConfigService: AppConfigService, public requestService: RequestService) {


  }

  ngOnInit() {
    this.symbol = this.symbol == "GLOBAL" ? "cryptocurrency" : this.symbol;
    this.symbol
    this.load(this.symbol, (res) => {

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
        text: tweet.text,
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
      let A = this.parseTweets(res);
      this.tweets = A;
      f(A)
    });
  }
}
