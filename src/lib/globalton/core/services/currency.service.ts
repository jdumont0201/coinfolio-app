import {Injectable, Provider, EventEmitter} from '@angular/core';
import {Component, Output}         from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import {Inject} from '@angular/core';

import { Response} from '@angular/http';
import {Observable} from 'rxjs/Observable'

import 'rxjs/add/operator/share';

import {MessageService} from './message.service';
import {RequestService} from './request.service';
import {ConsoleService} from './console.service';
import {ConfigService} from './config.service';


import {Price} from "../interfaces/interfaces"


@Injectable()
export class CurrencyService {
    @Output() currencyRatesLoaded: EventEmitter<any> = new EventEmitter();
    @Output() currencyChanged: EventEmitter<any> = new EventEmitter();

    private currentCurrencyCode: string;

    rates: { [key: string]: number } = {};
    ratesTable: number[][] = [];
    
    constructor(
        private http: Http,
        private configService: ConfigService,
        private consoleService: ConsoleService,
        private requestService: RequestService) {
        consoleService.serv("+ CurrencyService");

        this.processFile(JSON.parse(this.configService.defaultCurrencyRates));
        this.loadCurrencyFile();
        
    }
    loadCurrencyFile(): void {
        const url: string = this.configService.currencyRatesApi;
        
        if(this.configService.renewCurrencyFileAtStartup){
            this.consoleService.curr("CurrencyService loading ", url);
            this.requestService.get(url,function(result){
              if(result)
                  this.processFile(result);

            } , this);
        }
            
    }
    convertToUserCurrency(price:Price):Price {
        return this.convert(price, this.getUserCurrency());
    }
    convert(originalPrice:Price, destinationCurrency: string): Price {
        //console.log("convert", originalValue, originalCurrency, destinationCurrency, this.ratesTable);
        if (!originalPrice) {
            console.warn("CurrencyService convert originalValue=", originalPrice);
            return null;
        }

        if (!(originalPrice.currencyCode in this.configService.usedCurrencies)) {
            console.warn("CurrencyService convert unknown originalCurrency=", originalPrice.currencyCode);
            return null;
        }
        if (!(destinationCurrency in this.configService.supportedCurrencies)) {
            console.warn("CurrencyService convert unknown destinationCurrency=", destinationCurrency);
            return null;
        }

        if (originalPrice.currencyCode === destinationCurrency)
            return originalPrice;
        else {
            // console.log("rate",this.ratesTable,originalCurrency,destinationCurrency);
            // console.log("rate",this.ratesTable[originalCurrency][destinationCurrency])
            return {value:originalPrice.value * this.ratesTable[originalPrice.currencyCode][destinationCurrency],currencyCode:destinationCurrency};
        }


    }
    processFile(file: any): void {
        console.log("CurrencyService done downloading file=", file, "rates=", file.rates);
        console.log("this", this);
        console.log("thisrates", this.rates);
        this.rates = {};
        for (var currency in file.rates) {
            this.consoleService.curr("check", currency, file.rates[currency]);
            let val = parseFloat(file.rates[currency]);
            this.rates[currency] = val;
        }

        this.buildTable();
        this.consoleService.curr("CurrencyTable", this.ratesTable);
        this.currencyRatesLoaded.next({});
    }
    buildTable(): void {
        this.consoleService.curr("buildTable", this.rates);
        this.ratesTable = [];
        for (var currency in this.configService.usedCurrencies) {
            
            this.ratesTable[currency] = [];
            for (var currencyDest in this.configService.usedCurrencies) {

                if (currency === currencyDest)
                    this.ratesTable[currency][currencyDest] = 1;
                else if (currency === "USD")
                    this.ratesTable[currency][currencyDest] = this.rates[currencyDest];
                else if (currencyDest === "USD")
                    this.ratesTable[currency][currencyDest] = 1 / this.rates[currency];
                else
                    this.ratesTable[currency][currencyDest] = this.rates[currencyDest] / this.rates[currency];

            }
        }
    }
    setCurrency(currencyCode: string): void {
        this.consoleService.curr("SetCurrency", currencyCode);
        this.currentCurrencyCode = currencyCode;
        this.currencyRatesLoaded.next(this.currentCurrencyCode);
    }
    getUserCurrency(): string {
        return this.currentCurrencyCode;
    }
}