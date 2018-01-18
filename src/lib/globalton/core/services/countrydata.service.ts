import {Http, Headers} from '@angular/http';
import {Injectable, Output, EventEmitter} from "@angular/core";

import {MessageService} from './message.service';
// import * as countrydata from 'country-data';
import 'rxjs/add/operator/map';
export class SelectData {
  data:[{key:string, value:string}]
}
@Injectable()
export class CountryDataService {
    countryData:SelectData;

    constructor() {
        //console.log("+ CountryDataService");
        // console.log("data",countrydata   .countries);

    }


}
