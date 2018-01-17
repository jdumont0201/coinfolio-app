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
import {EventService} from "../../lib/localton/services/event.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
  selector: 'app-volume',
  templateUrl: 'template.html'

})
@Injectable()
export class AppVolumeComponent extends DataAndChartTemplate {


  displayedColumns = ['ts', 'volume'];


 @Input() symbol: string;
  base: string = "USD"
  source: string = "ccc"

  options = {
      chart: {type: 'area', margin: 0,backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
          stops: [
              [0, '#205f44'],
              [1, '#083d16']
          ]
      }},
    candlestick: {color: 'green', upColor: 'red'},
    credits: {enabled: false},
    plotOptions: {
      series: {
        animation: false
      }
    },
    rangeSelector: {
      selected: 4,
      inputEnabled: false,
      buttonTheme: {
        visibility: 'hidden'
      },
      labelStyle: {
        visibility: 'hidden'
      }
    }
  }


    constructor(public consoleService:ConsoleService,public logic: Logic, public appConfigService: AppConfigService, public eventService:EventService,public refreshService:RefreshService) {
        super(consoleService,refreshService,logic,appConfigService,eventService)
  }

  interval =1;
   getDateOfWeek(w, y){
    var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week

    return new Date(y, 0, d);
  }
  updateData() {
    if (this.interval === 7) {
      this.logic.getVolumeWeekData(this.source, this.symbol, this.base, (res) => {
        this.data = res;
        this.checkData();
        let D = [];
        for (let i = 0; i < res.length; ++i) {
          let comp=res[i].week.split("-");
          let w=comp[0]
          let y=comp[1]
          let dd=this.getDateOfWeek(w,y)

          const line = [dd.getTime(), parseFloat(res[i].volume)];
          D.push(line);
        }
        console.log(D)
        this.dataSource = new MatTableDataSource(this.data);
        this.data = D;
        this.updateOptions({
          chart: {type: 'column'},
          series: [{
            name: this.symbol,
            data: D, color: '#2ca917'
          }], yAxis: {}
        })
        this.chart = new StockChart(this.options);
      });
      }    else      {
        this.logic.getVolumeData(this.source, this.symbol, this.base, (res) => {
          this.data = res;
          this.checkData();
          let D = [];
          for (let i = 0; i < res.length; ++i) {
            const line = [parseInt(res[i].ts) * 1000, Math.round(parseFloat(res[i].volume))];
            D.push(line);
          }
          console.log(D)
          this.dataSource = new MatTableDataSource(this.data);
          this.data = D;
          this.updateOptions({
              chart: {type: 'area', margin: 0,backgroundColor: {
                  linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                  stops: [
                      [0, '#205f44'],
                      [1, '#083d16']
                  ]
              }},
            series: [{
              name: this.symbol,
              data: D, color: '#2ca917'
            }], yAxis: {}
          })
          this.chart = new StockChart(this.options);
        })
      }
    }


  setValue(v
             :
             string
  )
  {
    this.symbol = v;
    this.updateData();
  }

  setInterval(v
             :
             number
  )
  {
    this.interval = v;
    this.updateData();
  }

    setBase(v
  :
    string
  )
    {
      this.base = v;
      this.updateData();
    }

  }
