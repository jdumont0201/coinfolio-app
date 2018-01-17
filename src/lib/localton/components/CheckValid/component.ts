import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {RequestService} from '../../../../lib/globalton/core/services/request.service';
import {DataService} from "../../../../lib/localton/services/data.service";

import {Logic} from "../../../../logic/Logic";
import {StockChart, Chart} from 'angular-highcharts';
import {AppConfigService} from "../../../../lib/localton/services/appconfig.service";
import {MatTableDataSource} from '@angular/material';
import {RefreshService} from "../../services/refresh.service";
import {EventService} from "../../services/event.service";

@Injectable()
export abstract class CheckValid {
    isErrored = false;
    errorMessage;
    checkValid(condition,message){
        if(!condition){
            this.isErrored=true;
            this.errorMessage=message
        }
    }
}
