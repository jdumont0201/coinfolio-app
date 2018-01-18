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
  selector: 'app-headlines',
  templateUrl: 'template.html'

})
@Injectable()
export class AppHeadlinesComponent implements OnInit{
  @Input() source;
  @Input() symbol;
  @Input() possibleSymbols;
  @Input() possibleSources;
  tweets;
  key;
    isLoading=true;
  constructor(public consoleService:ConsoleService,public logic: Logic, public appConfigService: AppConfigService, public requestService: RequestService) {

  }
  ngOnInit(){
    this.init()
  }
  init(){
    this.isLoading=true;
      this.symbol=this.symbol=="GLOBAL"?"cryptocurrency":this.symbol;this.symbol
      this.load(this.symbol,(res)=>{
          this.isLoading=false
      });
  }
  parseNews(res):any[]{

    const R = res;
    let A = [];
    for (let k=0;k<R.length;++k) {
      const news = R[k];
      if(news && typeof news==="object" && "title" in news)
      A.push({
        title: news.title,
        desc: news.content,
        publisher: null,//news.publisher,
        link: news.link,
        image: null,
        date:news.pubDate
      })
    }
    return A;
  }
  load(q: string, f: Function) {
    this.logic.getNews(q,(res)=>{
      this.tweets=this.parseNews(res);

      f();
    });

  }
}
