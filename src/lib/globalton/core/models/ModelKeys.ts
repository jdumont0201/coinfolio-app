//import {MODELTYPES} from "../models/ModelTypes"
import {ModelType} from "../interfaces/interfaces"


//suboptimal, to store
export function modelTypeToName(modelType,MT):string{
   // if(modelType===MODELTYPES.Me) return "User";
    //if(modelType===MODELTYPES.Me) return "User";
    for(var key in MT){
        if(modelType == MT[key])
            return key;
    }
    console.log("modelTypeToName not found", modelType, MT);
}