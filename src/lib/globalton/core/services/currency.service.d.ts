import { EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/observable/fromArray';
import 'rxjs/add/operator/share';
import { RequestService } from './request.service';
import { ConsoleService } from './console.service';
import { ConfigService } from './config.service';
import { Price } from "../interfaces/interfaces";
export declare class CurrencyService {
    private http;
    private configService;
    private consoleService;
    private requestService;
    currencyRatesLoaded: EventEmitter<any>;
    currencyChanged: EventEmitter<any>;
    private currentCurrencyCode;
    rates: {
        [key: string]: number;
    };
    ratesTable: number[][];
    constructor(http: Http, configService: ConfigService, consoleService: ConsoleService, requestService: RequestService);
    loadCurrencyFile(): void;
    convertToUserCurrency(price: Price): Price;
    convert(originalPrice: Price, destinationCurrency: string): Price;
    processFile(file: any): void;
    buildTable(): void;
    setCurrency(currencyCode: string): void;
    getUserCurrency(): string;
}
