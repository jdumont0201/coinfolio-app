import {Inject} from '@angular/core';

import {PageService} from '../page.service';
import {ModelService} from '../model.service';
import {ConfigService} from '../config.service';
import {ConsoleService} from '../console.service';import {ApiService}    from '../api.service';

import {Model} from "../../models/Model";
import {ApiInterface} from "./apiinterface"

import {ObjectId, ModelType, RequestQueryOptions, RawHash, RawGetAllHash, Raw} from "../../interfaces/interfaces"
import {API_RETURN_MODES} from "../../services/config.service"
import {Assert, clone, cloneRaw} from "../../utils/utils"

export  class Schema {
    apiInterface: ApiInterface;
    pageService: PageService;

    modelType: ModelType;

    API_RETURN_ARRAYS=false;
    constructor(
        modelType: ModelType,
        public modelService: ModelService,
        private apiService: ApiService,
        private consoleService: ConsoleService,
        private configService: ConfigService
    ) {
        this.modelType = modelType;
        this.apiInterface = new ApiInterface(modelType, configService);
        if (!apiService) console.error("No apiservice in schema")
    }



    //GET
    getMultipleById<T extends Model>(idlist: ObjectId[], options: RequestQueryOptions, f: Function): void {
        if (idlist.length === 1) {
            let id:string = idlist[0];
            this.getById<T>(id, options, function(m:T){
                f([m]);
            });
        } else {
            let idliststr: string = idlist.join("--");
            let url = this.apiInterface.buildUrlSuffix(idliststr, options);
            this.apiService.authget(url, (rawdatas: RawGetAllHash) => {
                console.log("getMultipleById", rawdatas);

                var M :T[]= [];
                for (var id in rawdatas.main) {

                    let raw: Raw = rawdatas.main[id];
                    let returnedModel: T = this.modelService.loader.get<T>(this.modelType, raw, rawdatas.populated, options);
                    M.push(returnedModel);

                }
                if (this.configService.LIBRARY_ENABLED && this.modelService.library.isPreloaded() && this.configService.UPDATE_AFTER_GET)
                    this.modelService.library.partialUpdateAllWithTimestamp(rawdatas, this.modelType);
                console.log("getMultipleById res ", M);
                f(M);



            });
        }
    }

    getById<T extends Model>(id: ObjectId, options: RequestQueryOptions, f: Function): void {
        Assert.exists(id, "schema getbyid has no id");
        let url: string = this.apiInterface.buildUrlSuffix(id, options);
        this.apiService.authget(url, (rawdatas: RawHash) => {
            console.log("schema getById", id, rawdatas);
            let newId;
            if (id === "me") newId = "me";
            else if (id === "mycart") newId = "mycart";
            else if (id === "me/id") newId = "me";
            else if (id.substr(0,4) === "me/a") newId = "me";
            else newId=id;
            console.log(newId);

            //make array
            let raw: Raw;
            if(!rawdatas.hasOwnProperty(newId) ) {raw=rawdatas;raw._id = newId;}//let rawdatas2=[]; rawdatas2[newId]=rawdatas;rawdatas=rawdatas2;}
            else {
                raw = rawdatas[newId];
                if (id !== "me/id")
                    raw._id = newId;
            }
            let returnedModel: T = this.modelService.loader.get<T>(this.modelType, raw, rawdatas, options);
            if (this.configService.LIBRARY_ENABLED && this.modelService.library.isPreloaded() && this.configService.UPDATE_AFTER_GET)
                this.modelService.library.partialUpdateWithTimestamp(raw, this.modelType);
            f(returnedModel);
        });
    } 
    getAll<T extends Model>(options: RequestQueryOptions, f: Function): void {
        console.log("Schema getAll type=", this.modelType, "options=", options)
        let url = this.apiInterface.buildUrlSuffix("", options);
        this.apiService.authget(url, (rawdata: RawGetAllHash) => {
            console.log("Schema getAll data=", rawdata);
            let M: T[] = this.modelService.loader.getAll<T>(this.modelType, rawdata, null, options);
            this.consoleService.load("getAll [models]=", M, M.length + " items");
            if (this.configService.LIBRARY_ENABLED && this.modelService.library.isPreloaded() && this.configService.UPDATE_AFTER_GET)
                this.modelService.library.partialUpdateAllWithTimestamp(rawdata, this.modelType);
            f(M);
        });
    }

    put<T extends Model>(model: T, f: Function, overridedUrl?: string): void {
        let url = this.apiInterface.getUrl(model._id);
        console.log("Schema put", url)
        if (overridedUrl) url = overridedUrl;
        this.apiService.authput(url, model, (rawdata: RawHash) => {
            //let returnedModel = this.buildModel(data, model.modelType);
            let id = model._id;
            let raw: Raw;
            if(id in rawdata) raw= rawdata[id];
            else raw=rawdata;
            let returnedModel :T = this.modelService.loader.get<T>(this.modelType, raw, rawdata);
            console.log("Schema putdata ", returnedModel);
            if (this.configService.LIBRARY_ENABLED && this.modelService.library.isPreloaded() && this.configService.UPDATE_AFTER_POSTPUTPATCH)
                this.modelService.library.completeUpdate(raw, this.modelType);
            f(returnedModel);
        });
    }
    patch<T extends Model>(model: T, referenceRaw: Raw, f: Function, overridedUrl?: string): void {
        console.log("Schema patch ", model, " ref", referenceRaw);
        let url = this.apiInterface.getUrl(model._id);
        console.log("Schema patch url", url)
        if (overridedUrl) url = overridedUrl;
        this.apiService.authpatch(url, model, referenceRaw, (rawdata: RawHash) => {
            console.log("Schema patchdata ", rawdata);
            let id: ObjectId = model._id;
            let raw: Raw;
            if(id in rawdata) raw= rawdata[id];
            else raw=rawdata;

            let returnedModel: T = this.modelService.loader.get<T>(model.modelType, raw, rawdata);
            console.log("Schema patchdata ", returnedModel);
            if (this.configService.LIBRARY_ENABLED && this.modelService.library.isPreloaded() && this.configService.UPDATE_AFTER_POSTPUTPATCH)
                this.modelService.library.partialUpdate(raw, this.modelType);
            f(returnedModel);
        });
    }
    post<T extends Model>(model: T, f: Function): void {
        let url = this.apiInterface.getUrl();
        console.log("Schema post url", url);
        this.apiService.authpost(url, model, (rawdata) => {
            console.log("Schema postdata ", rawdata);

            //let id = Object.keys(rawdata)[0];

            if (!rawdata.returnMultiple) {//obsolete?
                let returnedModel :T = this.modelService.loader.get<T>(model.modelType, rawdata, rawdata);
                console.log("Schema postdata returned model ", returnedModel);
                //TODO ADD TO LIBRARY
                f(returnedModel);
            } else {
                let raw: Raw = rawdata;//rawdata[id];
                let returnedModel:T  = this.modelService.loader.get<T>(this.modelType, raw, rawdata);
                if (this.configService.LIBRARY_ENABLED && this.modelService.library.isPreloaded())
                    this.modelService.library.addRaw(raw, this.modelType);
                f(rawdata);
            }
        });
    }
    noauthpost<T extends Model>(model: T, f: Function,forcedRoute?:string): void {
        let url = forcedRoute?forcedRoute:this.apiInterface.getUrl(model._id);
        console.log("Schema noauthpost url", url);
        this.apiService.noauthpost(url, model, (data) => {
            console.log("noauthpostdata ", data);
            f(data);
        });
    }
    delete(id: ObjectId, f: Function): void {
        let url = this.apiInterface.getUrl(id);
        this.apiService.authdelete(url, (data) => {
            console.log("deletedata", data);
            f(data);
        });
    }
    postId(id: ObjectId, f: Function): void {
        let url = this.apiInterface.getUrl(id);
        this.apiService.authpost(url, null, (data) => {
            console.log("deletedata", data);
            f(data);
        });
    }

}
