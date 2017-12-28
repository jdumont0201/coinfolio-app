import {ModelService}    from '../model.service';

import {ConfigService}    from '../config.service';
import {Schema} from "./schema";
import {Model} from "../../models/Model"
import {ModelType,ObjectId, ModelCallback,Raw, DataInterface} from "../../interfaces/interfaces"
import {GenericDataAdapter} from "./GenericDataAdapter"

export class DataAdapter extends GenericDataAdapter{

    constructor(public modelService:ModelService, public configService:ConfigService) {
        super();
    }

    /*
     Sends a save request to store the object to the db :
     PUT     send the complete unhydrated model
     PATCH   sends only modified fields, if exists in library and can be compared
     POST    no id, creates new object
     */
    save<T>(obj:Model, f:Function) {

        /*
         let id:ObjectId = obj._id;
         console.log("    SAVE", obj, id, obj.modelType);
         if (id) {
         if (this.configService.LIBRARY_ENABLED && this.modelService.library.isPreloaded() && this.modelService.library.isCached(id)) {
         let ref:Raw = this.modelService.library.loadOneRaw(id);
         console.log("PATCH REF", ref);
         this.modelService.patch(obj, ref, function (o:T) {
         f(o);
         });
         } else {
         this.modelService.put(obj, function (o:T) {
         f(o);
         });
         }
         } else {
         this.modelService.post(obj, function (o:T) {
         f(o);
         });
         }*/
    }
    /* unused */
    crypt(p:string):string{
        return "";
    }
    findOne(modelType: ModelType, crit: any): Promise<Model>{
        return new Promise(null);
    }

}