
import {Inject,Input, Injectable, Injector,PipeTransform, Pipe,ChangeDetectionStrategy} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {CurrencyPipe } from '@angular/common'
import {CurrencyService} from '../../core/services/currency.service';

import {Price} from "../../core/interfaces/interfaces"
@Injectable()
@Pipe({
    name: 'usercurrency',

    pure: false
})
export class UserCurrencyPipe implements PipeTransform {
    currencyService:CurrencyService;
     constructor(
          @Inject(CurrencyService) currencyService: CurrencyService
          ) {
        this.currencyService=currencyService;
    }
    transform(price:Price, args: string[]): any { //improve : set ChangeDetectionStrategy to update only once
        if(!price) {
            return null;}
        if(!price.currencyCode){
             console.warn("no price currency",price);
             return null;
         }
        let originalPrice:Price=price;
        let userCurrency=this.currencyService.getUserCurrency();

        if(originalPrice.currencyCode!==userCurrency){
            price=this.currencyService.convert(originalPrice,userCurrency);
        }

        price.value=Math.ceil(price.value);
        if(!userCurrency){
          userCurrency="USD";
          console.error("User Currency not defined");
        }
        var locale="fr";//todo
        var c=new CurrencyPipe(locale);
        return c.transform(price.value,userCurrency,true,".2-2");

    }
}
