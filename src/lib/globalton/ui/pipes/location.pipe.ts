
import {Inject, Input, Injectable, Injector, Pipe, ChangeDetectionStrategy} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';
@Injectable()
@Pipe({
    name: 'location',
    pure: false
})
export class LocationPipe {

    translateService: TranslateService;

    constructor( @Inject(TranslateService) translateService: TranslateService) {
        this.translateService = translateService;
    }
    transform(p: any, args: string[]): any { //improve : set ChangeDetectionStrategy to update only once
        // console.log("trans", value,this.translateService.currentLanguageLoaded);
        if(!p) return null;
        let c = p.country;


        if(p.isinternational){
            let rem;
            rem = "country.internationalremotejob";
      //      if (this.translateService.currentLanguageLoaded)
                rem = this.translateService.get("country.internationalremotejob");
                return rem;
        }

        let country;
        if (!c)
            country = "country.undefined";
        //if (this.translateService.currentLanguageLoaded)
            country = this.translateService.get("country." + c);
        //else
          //  country = c;
            
            
        if (p.isremote) {
            let rem;
            rem = "country.remotejob";
         //   if (this.translateService.currentLanguageLoaded)
                rem = this.translateService.get("country.remotejob");
                return rem+", "+country;
        } else {
            return [p.city, p.region, country].join(", ");
        }

    }
}
