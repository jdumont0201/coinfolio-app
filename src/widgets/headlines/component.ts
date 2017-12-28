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


import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-headlines',
  templateUrl: 'template.html'

})
@Injectable()
export class AppHeadlinesComponent implements OnInit{
  @Input() symbol;
  tweets;
  key;

  constructor(public logic: Logic, public appConfigService: AppConfigService, public requestService: RequestService) {

  }
  ngOnInit(){
    this.symbol=this.symbol=="GLOBAL"?"cryptocurrency":this.symbol;this.symbol
    this.load(this.symbol,(res)=>{

    });
  }
  parseNews(res):any[]{
    console.log(res)
    const R = res.searchNews;
    let A = [];
    for (let k in R) {
      const news = R[k];
      A.push({
        title: news.title,
        desc: news.description,
        publisher: news.publisher,
        link: news.link,
        image: news.thumbnailUrl,
        date:news.pubDate
      })
    }
    return A;
  }
  load(q: string, f: Function) {
    this.logic.getNews(q,(res)=>{this.tweets=this.parseNews(res)});

  }
}
