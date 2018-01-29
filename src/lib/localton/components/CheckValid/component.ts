import {Component, EventEmitter, Injectable, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {RequestService} from '../../../../lib/globalton/core/services/request.service';
import {DataService} from "../../../../lib/localton/services/data.service";

import {Logic} from "../../../../logic/Logic";
import {StockChart, Chart} from 'angular-highcharts';
import {AppConfigService} from "../../../../lib/localton/services/appconfig.service";
import {MatTableDataSource} from '@angular/material';
import {RefreshService} from "../../services/refresh.service";
import {EventService} from "../../services/event.service";
import {Observable} from "rxjs/Observable";
import {ConsoleService} from "../../../globalton/core/services/console.service";

@Injectable()
export abstract class CheckValid implements OnDestroy{
    isErrored = false;
    errorMessage;
    constructor(public consoleService:ConsoleService){

    }

    ngOnDestroy() {
        this.unsubscribeAllEvents()
    }
    checkValid(condition,message){
        if(!condition){
            this.isErrored=true;
            this.errorMessage=message
        }
    }

    eventSubscriptions={}
    doSubscribe(id,event:Observable<any>,f:any,name?:string){
        if(id in this.eventSubscriptions){
            this.consoleService.sub(" Already subscribed")
        }else{
            this.consoleService.sub("subscribe",id)
            this.eventSubscriptions[id]=event.subscribe((val)=>{
                this.consoleService.eventReceived(id + " --> "+(name?name:""))
                f(val)
            })
        }
    }
    unsubscribeAllEvents(){
        for(let k in this.eventSubscriptions){
            this.consoleService.sub(" Unsubscribe",k)
            this.eventSubscriptions[k].unsubscribe()
        }
    }
}
