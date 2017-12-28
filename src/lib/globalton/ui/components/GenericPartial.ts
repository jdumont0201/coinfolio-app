import {Component, Input, Host, Injectable, Inject, forwardRef} from '@angular/core';


import {ModelService} from '../../core/services/model.service';
import {MessageService} from '../../core/services/message.service'
import {ObjectId, ModelType} from "../../core/interfaces/interfaces"

@Injectable()
export class GenericPartial {

    constructor(protected modelService, protected messageService: MessageService) {

    }

    cacheLoadOne(type:ModelType, id:ObjectId, options:any, f):void {
        if (!id) {
            console.log("GenericPartial cacheLoadOne error no id");

        } else {
            this.modelService.cacheLoadOne(type, id, options, f);
        }


    }

    cacheLoadMultiple(type:number, idlist:string[], options:any, f):void {
        this.modelService.cacheLoadMultiple(type, idlist, options, f);
    }

    cacheLoad(type:number, options:any, f):void {
        this.modelService.cacheLoadAll(type, options, f);
    }


}
