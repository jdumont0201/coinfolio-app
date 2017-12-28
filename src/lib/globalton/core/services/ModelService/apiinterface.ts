import {ConfigService} from '../config.service';
import {RequestQueryOptions,ModelType,ObjectId} from "../../interfaces/interfaces"

export class ApiInterface{
    baseurl:string;
    urlprefix:string;
    modelType:ModelType;
    
    
    constructor(
        modelType:ModelType,
        private configService:ConfigService
        ){
            //console.log("Creating APIInterface",modelType)
        
        this.baseurl=configService.getApiUrl();
        this.urlprefix=configService.APIMODELKEYS[modelType];
        
        if(!this.urlprefix)
            console.error("Urlprefix for model",modelType,"not found in",configService.APIMODELKEYS);
        
        this.modelType=modelType;    
      
            
    }
    //for POST PUT DELETE queries
    getUrl(id?:string):string{
        /*if(this.modelType===MODELTYPES.Cart)
            if(id!=="mycart")
            return "mycart"+"/"+id;
            else
            return "mycart";
        else if (this.modelType===MODELTYPES.Me)
            return "me/"+this.configService.app;
        else if (this.modelType===MODELTYPES.Register)
            return "register/"+this.configService.app;
        else*/ if(id)
            return this.urlprefix+"/"+id;
        else
            return this.urlprefix;
    }
    
    //for GET queries
    buildUrlSuffix(id: ObjectId, options: RequestQueryOptions):string {
        let base:string="";
       /* if(this.modelType===MODELTYPES.Cart)
         base="mycart";
        else if(this.modelType===MODELTYPES.Me)
         base=id;
        else*/
         if(id)
         base=this.urlprefix+"/"+id;
         else
         base=this.urlprefix;
         
         
        let hasOptions = options.populate || options.select || options.match || options.sort || options.limit || options.skip;
        if (hasOptions) base += "?";
        let hasAlreadyOptions = "";
        if (options.select) {
            base += "select=" + options.select;
            hasAlreadyOptions = "&"
        }
        if (options.sort) {
            base += hasAlreadyOptions+"sort=" + options.sort;
            hasAlreadyOptions = "&"
        }
        if (options.populate) {
            base += hasAlreadyOptions + "populate=" + JSON.stringify(options.populate);
            hasAlreadyOptions = "&"
        }
         if (options.limit) {
            base += hasAlreadyOptions + "limit=" + JSON.stringify(options.limit);
            hasAlreadyOptions = "&"
        }
        if (options.match) {
            base += hasAlreadyOptions + "match=" + JSON.stringify(options.match);
            hasAlreadyOptions = "&"
        }
        if (options.skip) {
            base += hasAlreadyOptions + "skip=" + JSON.stringify(options.skip);
            hasAlreadyOptions = "&"
        }
        
        console.log("buildurlsuffix",base);
        return base;

    }
}