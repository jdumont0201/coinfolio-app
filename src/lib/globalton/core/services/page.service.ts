import {Http, Headers} from '@angular/http';
import {Injectable, Inject, Output, EventEmitter} from "@angular/core";

import {Location} from '@angular/common';
import {MessageService} from './message.service';
import {ApiService} from './api.service';
import {ConsoleService} from './console.service';
import {ConfigService} from './config.service';

//import { SelectOptionSet} from '../directives/elements/Forms';

import {OptionsBarService, OptionsBarConfig} from './optionsbar.service';
import {AuthService} from './auth.service';
import {Header, HeaderInterface, HeaderService} from './header.service';
import {CurrencyService} from '../services/currency.service';


export class PageConfig {
    headerInterface: HeaderInterface;
    optionsBarConfig: OptionsBarConfig
    constructor(headerInterface: HeaderInterface, optionsBarConfig: OptionsBarConfig) {
        this.headerInterface = headerInterface;
        this.optionsBarConfig = optionsBarConfig;
    };
}
@Injectable()
export class PageService {
    constructor(
        public messageService: MessageService,
        public configService: ConfigService,
        public headerService: HeaderService,

        public authService: AuthService,
        public apiService: ApiService,
        public currencyService: CurrencyService,
        public consoleService: ConsoleService,
        public optionsBarService: OptionsBarService,
        
        public location: Location
    ) {
        consoleService.serv("+ PageService");

    }



    setHeader(h: HeaderInterface) {
        this.consoleService.serv("setHeader", h);
        this.headerService.setHeader(new Header(h));
    }
    preparePage(pageConfig: PageConfig): void {
        this.consoleService.serv("Prepage Page", pageConfig);
        if (this.authService) {
            // console.log(" ✓ PageService authService set");
        } else {
            console.warn(" ✘ PageService authService not set");
        }
        if (this.headerService) {
            console.log("setheader", pageConfig);
            // console.log(" ✓ PageService headerService set",pageConfig.headerInterface);
            this.headerService.setHeader(new Header(pageConfig.headerInterface));

        } else
            console.warn(" ✘ PageService headerService not set");
        if (this.optionsBarService) {
            this.optionsBarService.setOptions(pageConfig.optionsBarConfig);
            // console.log(" ✓ PageService optionsBarService set");
        } else
            console.warn(" ✘ PageService optionsBarService not set");
        if (this.messageService) {
            //this.messageService.resetErrors();
            this.messageService.resetFlash();
            // console.log(" ✓ PageService messageService set");
        } else
            console.warn(" ✘ PageService messageService not set");
    }
    loadCountryStates(countryCode: string, thi:any): void {
      /*  this.apiService.noauthget("country/" + countryCode, (r) => {
            if (r.states)
                thi.selectContent["region"]=new SelectOptionSet(r.states).getSet();
            else {
                thi.model.region = countryCode;
                thi.selectContent["region"]=new SelectOptionSet({ countryCode: this.configService.countryList[countryCode] }).getSet();
            }
        });*/
    }
}
