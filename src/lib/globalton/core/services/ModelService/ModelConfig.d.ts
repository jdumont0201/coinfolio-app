
import {Model} from "../../models/Model";
import { ApiInterface } from "../ModelService/apiinterface";
import { Schema } from "../ModelService/schema";
import { ApiService } from '../../services/api.service';
import { ModelService } from '../../services/model.service';
import { ConfigService } from '../../services/config.service';
import { ConsoleService } from '../../services/console.service';
import { ModelType} from "../../interfaces/interfaces"
export declare class ModelConfig {
    schema: Schema;
    clas: any;
    apiService: ApiService;
    modelService: ModelService;
    configSerivce: ConfigService;
    apiInterface: ApiInterface;
    constructor(
        modelType: ModelType,
         clas: any,
         modelService: ModelService,
         apiService: ApiService,
         consoleService: ConsoleService,
         configService: ConfigService

    );
    getInstance<T extends Model>(rawdata?: any): T;
    getClass(): any;
}
