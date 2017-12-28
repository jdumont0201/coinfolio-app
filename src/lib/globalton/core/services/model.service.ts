import {Injectable, Injector, Inject, Output, EventEmitter} from "@angular/core";

import {
    ObjectId, ModelType, RequestQueryOptions, RawHash, RawGetAllHash, Raw
} from "../interfaces/interfaces"
import {Model} from "../models/Model"

import {MessageService} from "../services/message.service";
import {ApiService}    from '../services/api.service';
import {AuthService}    from '../services/auth.service';
import {ConsoleService} from '../services/console.service';
import {ConfigService} from '../services/config.service';
import {ModelLoader} from "./ModelService/ModelLoader"

import {Library} from "./ModelService/Library"
import {Assert} from "../utils/assert"
import {DataAdapter} from "./ModelService/DataAdapter";


//import { GenericInstancerInterface} from "hireton"
interface IActivatable {
    id: number;
    name: string;
}

export interface GenericInstancerInterface {
    getInstance(modelType): any;
    MODELS: any;
}


interface IActivatable {
    id: number;
    name: string;
}


@Injectable()
export class ModelService {
    @Output() modelUpdated: EventEmitter<any> = new EventEmitter();

    modelUpdateSubscribed: boolean = false;
    library: Library;
    MODELS: any = {};
    MODELTYPES: any;
    instancer: GenericInstancerInterface;
    loader: ModelLoader;
    isModelListLoaded: boolean = false;

    dataAdapter: DataAdapter;

    SERVER_RETURNS_ARRAYS = false;

    constructor(public apiService: ApiService,
                public consoleService: ConsoleService,
                public configService: ConfigService,
                private messageService: MessageService,
                private authService: AuthService) {
        consoleService.serv("+ ModelService", configService);
        this.consoleService = consoleService;
        this.configService = configService;
        this.dataAdapter = new DataAdapter(this, configService);
        this.apiService = apiService;
        //this.buildSchemas();

        this.library = new Library(this, this.consoleService, this.messageService);
        this.loader = new ModelLoader(this);

        this.authService.loginChanged.subscribe(value => this.preloadAssetsIfLogged(value), error => console.log("Error updating flash" + error), () => console.log('done'));
        if (this.authService.isAuthenticated()) {
            this.preload();
        }
        this.configService.perSiteConfigured.subscribe(value => this.postConfigEvent(value), error => console.log("Error postConfigEvent" + error), () => console.log('done'));
    }

    setModelTypes(M: any) {
        this.MODELTYPES = M;
    }

    postConfigEvent(value) {
        if (value.type == "models")
            this.isModelListLoaded = true;
        if (!this.authService.CONTENT_AUTHENTIFICATION)
            this.library.setPreloaded();
    }

    emitModelUpdated(model: Model, key: string): void {
        this.modelUpdated.emit({model: model, key: key});
    }

    preloadAssetsIfLogged(value: boolean): void {
        if (value) {
            this.preload();
        } else {

        }
    }

    getInstance<T extends Model>(modelType: ModelType, rawdata?: any) {
        Assert.exists(modelType, "getInstance: get has no modelType, =" + modelType);

        let m = this.instancer.getInstance(modelType);
        if (rawdata)
            this.loader.loadObject<T>(rawdata, m);
        m.modelType = modelType;//force modeltype for me vs user
        return m;
    }


    preloadAssets(f: Function): void {
        this.apiService.authget("assets", (A) => {
            //this.library.readAssets(A);
            f(A);
        });
    }

    preload(): void {
        if (this.configService.LIBRARY_ENABLED) {
            if (!this.library.isPreloaded()) {
                this.consoleService.library("PRELOAD");
                this.preloadAssets((T) => {
                    this.library.setPreloaded();
                });
            }
        }
    }


    /* Posts with auth at url and returns model */
    post<T extends Model>(url: string, model: T, f: Function): void {
        let modelType: ModelType = model.modelType;
        this.apiService.authpost(url, model, (rawdata) => {
            console.log("Model postdata ", rawdata);
            let raw: Raw;
            if (this.SERVER_RETURNS_ARRAYS) {
                let id = Object.keys(rawdata)[0];
                ;
                raw = rawdata[id];
            } else
                raw = rawdata;

            if (!rawdata.returnMultiple) {//obsolete?
                let returnedModel: T = this.loader.get<T>(modelType, raw, rawdata);
                console.log("Schema postdata returned model ", returnedModel);
                //TODO ADD TO LIBRARY
                f(returnedModel);
            } else {
                let returnedModel: T = this.loader.get<T>(modelType, raw, rawdata);
                if (this.configService.LIBRARY_ENABLED && this.library.isPreloaded())
                    this.library.addRaw(raw, modelType);
                f(rawdata);
            }
        });
    }

    put<T extends Model>(url: string, model: T, f: Function): void {
        let modelType: ModelType = model.modelType;
        console.log("Schema put", url)

        this.apiService.authput(url, model, (rawdata: RawHash) => {
            //let returnedModel = this.buildModel(data, model.modelType);
            let id;
            console.log(Object.keys(rawdata));
            let k = Object.keys(rawdata);

            let raw: Raw;
            if (this.SERVER_RETURNS_ARRAYS) {
                if (model._id && model._id in rawdata)
                    id = model._id;
                else
                    id = k[0];
                raw = rawdata[id];
            } else
                raw = rawdata;
            let returnedModel: T = this.loader.get<T>(modelType, raw, rawdata);
            console.log("Schema putdata ", returnedModel);
            if (this.configService.LIBRARY_ENABLED && this.library.isPreloaded() && this.configService.UPDATE_AFTER_POSTPUTPATCH)
                this.library.completeUpdate(raw, modelType);
            f(returnedModel);
        });
    }

    patch<T extends Model>(url, model: T, referenceRaw: Raw, f: Function): void {
        console.log("Schema patch url", url)
        let modelType: ModelType = model.modelType;

        this.apiService.authpatch(url, model, referenceRaw, (rawdata: RawHash) => {
            console.log("Schema patchdata ", rawdata);
            let id: ObjectId = model._id;

            let raw: Raw;
            if (this.SERVER_RETURNS_ARRAYS)
                raw = rawdata[id];
            else
                raw = rawdata;
            let returnedModel: T = this.loader.get<T>(model.modelType, raw, rawdata);
            console.log("Schema patchdata ", returnedModel);
            if (this.configService.LIBRARY_ENABLED && this.library.isPreloaded() && this.configService.UPDATE_AFTER_POSTPUTPATCH)
                this.library.partialUpdate(raw, modelType);
            f(returnedModel);
        });
    }


    /* get many with url and returns models */
    getAll<T extends Model>(url: string, options, f: Function, modelType: ModelType) {
        this.apiService.authget(url, (rawdata: RawGetAllHash) => {
            console.log("ModelService getAll data=", rawdata);
            let M: T[]
            if(this.SERVER_RETURNS_ARRAYS)
            M = this.loader.getAll<T>(modelType, rawdata.main, rawdata.populated, options);
            else
             M = this.loader.getAll<T>(modelType, rawdata, {}, options);

            this.consoleService.load("getAll [models]=", M, M.length + " items");
            if (this.configService.LIBRARY_ENABLED && this.library.isPreloaded() && this.configService.UPDATE_AFTER_GET)
                this.library.partialUpdateAllWithTimestamp(rawdata, modelType);
            f(M);
        });
    }

    /* get many with url and returns models */
    getOne<T extends Model>(url: string, options, f: Function, modelType: ModelType) {

        this.apiService.authget(url, (rawdatas: RawHash) => {
            if (!rawdatas) {
                console.error("ModelService getOne but no result");
                return null;
            }
            let id;

            let raw: Raw;
            if (this.SERVER_RETURNS_ARRAYS) {
                if ("main" in rawdatas) rawdatas = rawdatas["main"];
                id = Object.keys(rawdatas)[0];
                raw = rawdatas[id];
                raw._id = id;
            } else {
                raw = rawdatas;
            }
            let returnedModel: T = this.loader.get<T>(modelType, raw, rawdatas, options);
            if (this.configService.LIBRARY_ENABLED && this.library.isPreloaded() && this.configService.UPDATE_AFTER_GET)
                this.library.partialUpdateWithTimestamp(raw, modelType);
            f(returnedModel);
        });


    }

    modelOne<T extends Model>(raw, modelType: ModelType, options = {}) {
        raw._id = raw.id;
        let returnedModel: T = this.loader.get<T>(modelType, raw, raw, options);
        return returnedModel;
    }
}
