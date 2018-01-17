import {Component, Input, OnInit, Injectable, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit} from '@angular/core';

import {TradingService} from "../../lib/localton/services/trading.service";
import {EventService} from "../../lib/localton/services/event.service";
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";
import {RefreshService} from "../../lib/localton/services/refresh.service";

@Component({
    selector: 'app-wrong-param',
    templateUrl: 'template.html'

})
@Injectable()
export class AppWrongParamComponent implements OnInit{
    @Input() isErrored
    @Input() errorMessage
    constructor(public tradingService: TradingService, public eventService: EventService, private cd: ChangeDetectorRef, public refreshService: RefreshService) {



    }

    ngOnInit() {

    }

}
