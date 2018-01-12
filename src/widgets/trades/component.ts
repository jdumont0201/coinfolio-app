import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";
import {Crypto} from "../../lib/localton/utils/utils";

import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";
import {EventService} from "../../lib/localton/services/event.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";

@Component({
    selector: 'app-my-trades',
    templateUrl: 'template.html'

})
@Injectable()
export class AppMyTradesWidget extends DataAndChartTemplate implements OnInit {
    trades=[]
    @Input() pairId;
    isLoading=true;
    isError=false;
    constructor(public logic: Logic, public appConfigService: AppConfigService, public eventService:EventService,public refreshService:RefreshService) {
        super(refreshService,logic,appConfigService,eventService, "stock")
    }

    ngOnInit() {


        this.updateData()
    }

    updateData() {
        this.isLoading = true;
        this.isError = false;
        this.logic.BinanceGetMyTrades(this.pairId,(trades)=>{
            this.isLoading=false;
            if(!trades || trades.error) {this.isError=true;return}
            this.trades=trades;
        })
    }



}
