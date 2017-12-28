import { PageService } from '../page.service';
import { ModelService } from '../model.service';
import { ConfigService } from '../config.service';
import { ConsoleService } from '../console.service';
import { ApiService } from '../api.service';
import {Model} from "../../models/Model";
import { ApiInterface } from "./apiinterface";
import { ObjectId, ModelType, RequestQueryOptions, Raw } from "../../interfaces/interfaces";
export declare abstract class Schema {
    modelService: ModelService;
    private apiService;
    private consoleService;
    private configService;
    apiInterface: ApiInterface;
    pageService: PageService;
    modelType: ModelType;
    constructor(modelType: ModelType, modelService: ModelService, apiService: ApiService, consoleService: ConsoleService, configService: ConfigService);
    getMultipleById<T extends Model>(idlist: ObjectId[], options: RequestQueryOptions, f: Function): void;
    getById<T extends Model>(id: ObjectId, options: RequestQueryOptions, f: Function): void;
    getAll<T extends Model>(options: RequestQueryOptions, f: Function): void;
    put<T extends Model>(model: T, f: Function, overridedUrl?: string): void;
    patch<T extends Model>(model: T, referenceRaw: Raw, f: Function, overridedUrl?: string): void;
    post<T extends Model>(model: T, f: Function): void;
    noauthpost<T extends Model>(model: T, f: Function,forcedRoute?:string): void;
    delete(id: ObjectId, f: Function): void;
    postId(id: ObjectId, f: Function): void;
}
