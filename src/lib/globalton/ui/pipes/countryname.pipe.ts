
import {Inject,Input, Injectable, Injector, Pipe,ChangeDetectionStrategy} from '@angular/core';
//import {TranslateService} from '../services/translate.service';

import {TranslateService} from '@ngx-translate/core';
import {Headers, Http} from '@angular/http';
@Injectable()
@Pipe({
    name: 'countryname',

    pure: false
})
export class CountryNamePipe {

    translateService: TranslateService;

    constructor( @Inject(TranslateService) translateService: TranslateService) {
        this.translateService = translateService;
    }
    transform(value: string, args: string[]): any { //improve : set ChangeDetectionStrategy to update only once
        if(!value)
            return "country.undefined";
      //  if (this.translateService.currentLanguageLoaded)
            return this.translateService.get("country."+value);
       // else
         //   return value;
    }
}
