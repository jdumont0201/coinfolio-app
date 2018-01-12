import { Pipe, PipeTransform } from '@angular/core';
import {Crypto} from "../utils/utils"
import {DecimalPipe} from "@angular/common";

@Pipe({name: 'price'})
export class FixedNbPipe implements PipeTransform {

    constructor(public decimalPipe: DecimalPipe){

    }
    transform(value: number): string {
        return this.decimalPipe.transform(value,Crypto.getNbFormat(value));
    }
}