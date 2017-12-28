
import {Injectable, Injector, Inject, Output, EventEmitter} from "@angular/core";

import {Model} from "../../models/Model";
//import {ApiInterface} from "../ModelService/apiinterface";
import {Schema} from "../ModelService/schema";


import {ApiService}    from '../../services/api.service';
import {ModelService}    from '../../services/model.service';
import {ConsoleService} from '../../services/console.service';
import {ConfigService} from '../../services/config.service';

import {ReturnMode, ModelType, ObjectId, RequestQueryOptions,Raw} from "../../interfaces/interfaces"

import {DataAdapter} from "./DataAdapter";


export class ModelConfig {
    //apiInterface: ApiInterface;
    schema:Schema;
    dataAdapter:DataAdapter;
    constructor(
        modelType: ModelType,
        public clas: any,
        public modelService: ModelService,
        private apiService: ApiService,
        private consoleService: ConsoleService,
        private configService: ConfigService

    ) {
        this.schema=new Schema( modelType,  modelService,  apiService, consoleService, configService);
//        this.dataAdapter=new DataAdapter(modelService,configService,this.schema);
    }
    getInstance<T extends Model>(rawdata?: any):T {
        //let m = new (this.clas)(this.modelService, this.configSerivce);
        let m=new (this.clas)(this.dataAdapter);
        if (rawdata)
            this.modelService.loader.loadObject<T>(rawdata, m);
        return m;
    }

    getClass() {
        return this.clas;
    }
}