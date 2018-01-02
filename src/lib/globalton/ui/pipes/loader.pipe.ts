import {Inject, Input, Injectable, Injector, Pipe, ChangeDetectionStrategy} from '@angular/core';
//import {ModelService} from '../../core/services/model.service';
import {Headers, Http} from '@angular/http';
@Injectable()
@Pipe({
    name: 'loader',
    pure: false
})
export class LoaderPipe {

  //  modelService: ModelService;

    constructor( ) {
        // console.log("Translate Pipe");
//        this.modelService = modelService;
    }
    transform(p: any, args: string[]): any { //improve : set ChangeDetectionStrategy to update only once
        if(!p){

        //    this.modelService.cacheLoadOne()
            return null;
        } else {
            return [p.city, p.region, p.country].join(", ");
        }

    }
}
