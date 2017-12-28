/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, ChangeDetectorRef, PipeTransform, EventEmitter, OnDestroy} from '@angular/core';
import {daysUpToNow} from "../../core/utils/utils";

import {TranslateService} from '@ngx-translate/core';
@Pipe({ name: 'calendar', pure: true })
export class CalendarPipe implements PipeTransform {

    constructor(private translateService: TranslateService) {

    }


    transform(value: Date, args?: any[]): any {
        console.log("tr",value);
        let n = daysUpToNow(value);

        let da;
        if (n == 0)
            da = this.translateService.get("date.today");
        else if (n == 1)
            da = this.translateService.get("date.yesterday");
        else
            da = n +" "+ this.translateService.get("date.daysago");
        let at = this.translateService.get("date.at");
        let m=value.getMinutes();
        let h=value.getHours();
        let dd = (h <10?("0"+h):h)+ ":" + (m < 10?("0"+m):m);
        return da+" "+at+" "+dd;
    }



}
