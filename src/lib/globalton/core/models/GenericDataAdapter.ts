import {Model} from "../models/Model"
import {ObjectId, ModelType,PopulableItem,ModelCallback,Raw, DataInterface} from "../interfaces/interfaces"


export abstract class GenericDataAdapter implements DataInterface {

    constructor() {

    }
    POPULABLE_SINGLE_FIELDS:any;
    POPULABLE_ARRAY_FIELDS:any;
    POPULABLE_INNER_ARRAY_FIELD:any;
    abstract save<T>(obj:Model,f:Function);
    abstract crypt(p:string);
    abstract findOne(modelType:ModelType,crit:any):Promise<Model>;


    /**
     * Returns the string version of the model
     * @method serialize
     * @returns {string} the serialized version of the data fields for this object
     */
    serialize(obj:Model): string {
        return JSON.stringify(obj.getFields());
    }
    /**
     * Returns the string version of the modified fields of the model
     * @method serialize
     * @returns {string} the serialized version of the data fields for this object
     */
    serializeModified(obj:Model,referenceRaw: Raw): string {
        return JSON.stringify(obj.getModifiedFields(referenceRaw));
    }

    isPopulableField(name: string): boolean {
        return name in this.POPULABLE_SINGLE_FIELDS;
    }
    isPopulableArrayField(name: string): boolean {
        return name in this.POPULABLE_ARRAY_FIELDS;
    }
    isPopulableInnerArrayField(name: string): boolean {
        return name in this.POPULABLE_INNER_ARRAY_FIELD;
    }
    isPopulated(obj:Model,value: any): boolean {
        console.log("    val", value, typeof value);
        return !(typeof value === "string" || typeof value === "number" || typeof value === "boolean")
    }
    getPopulatedItem(obj:Model,key:string):PopulableItem<any>{
        if(key in this.POPULABLE_SINGLE_FIELDS){
            if(obj[key])
                return <PopulableItem<any>>obj[key].getObject();
            else{
                console.warn("this",key,"not set");
            }
        }else{
            console.error("Getpopulated on not populated prop",key,"val=",this[key]);
            return null
        }
    }
    getPopulatedArray(obj:Model,key:string):PopulableItem<any>[]{
        console.log("GETPOPULATED");
        if(key in this.POPULABLE_ARRAY_FIELDS){
            if(obj[key]){
                let res=[];
                obj[key].forEach((e:PopulableItem<any>,index,array)=>{res.push(e.getObject())})
                return res;
            }else{
                console.warn("this",key,"not set");
            }
        }else{
            console.error("Getpopulated on not populated prop",key,"val=",this[key]);
            return [];
        }
    }
    /*
     Returns the raw value of the field fieldName of the current model
     In particular, extracts the value from Populated objects.
     */
    getField(obj:Model,fieldName: string) {
        let fieldValue = obj[fieldName];
        if (!fieldValue) return null;
        if (this.isPopulableField(fieldName)) {
            let fieldValue: PopulableItem<any> = obj[fieldName];
            if(typeof fieldValue==="string")
                return fieldValue;
            else
                return fieldValue.getObjectId();
        } else if (this.isPopulableArrayField(fieldName)) {
            let fieldValue:PopulableItem<any>[] = obj[fieldName];
            if (fieldValue.length == 0)
                return [];

            let re = [];
            for (var j = 0, m = fieldValue.length; j < m; ++j) {
                let oid = fieldValue[j].getObjectId();
                if (oid)
                    re.push(oid);
            }
            return re;
        }else if(this.isPopulableInnerArrayField(fieldName)){
                //TODO
        } else {
            if (Object.prototype.toString.call(fieldValue) === '[object Array]') {
                return JSON.parse(JSON.stringify(fieldValue));
            } else {
                return fieldValue;
            }
        }
    }
    /*
     Returns the raw unpopulated object of the current model
     */
    getFields(obj:Model,useExtra?: boolean): Raw {
        var fieldSet = {};
        for (let i = 0, n = obj.datafields.length; i < n; ++i) {
            let fieldName: string = obj.datafields[i];
            if (obj[fieldName]) {
                fieldSet[fieldName] = obj.getField(fieldName);
            }

        }
        if (useExtra) {
            for (let i = 0, n = obj.EXTRA_FIELDS.length; i < n; ++i) {
                let fieldName: string = obj.EXTRA_FIELDS[i];
                if (obj[fieldName]) {
                    fieldSet[fieldName] = obj.getField(fieldName);
                }

            }
        }
        fieldSet["record"]=obj.record;
        fieldSet["modelType"]=obj.modelType;
        return fieldSet;
    }

    /*
     Check if the value if modified from the reference value from the db (typically, comes from the Library)
     returns true if val1 is different from val2
     */
    isFieldModified(obj:Model,old: any, neu: any): boolean {
        console.log("    compare ", old, neu);
        if (typeof old === 'undefined' && typeof neu === 'undefined') {
            console.log("    null compa"); return false;
        }
        if ((typeof old === 'undefined' && (typeof neu !== 'undefined')) || (typeof neu === 'undefined' && typeof old !== 'undefined')) {
            console.log("    is oe null"); return true;
        }
        if (typeof old === "string" || typeof old === "number" || typeof old === "boolean") {
            console.log("    string compa", old, neu, old !== neu)
            return old !== neu;
        } else {
            console.log("    obj array compa")
            if (Object.prototype.toString.call(old) === '[object Object]') { //if populated
                for (let i in neu) {
                    let isModified = obj.isFieldModified(old[i], neu[i]);
                    if (isModified)
                        return true;
                }
                return false;
            } else if (Object.prototype.toString.call(old) === '[object Array]') { //if populated
                return old.toString() !== neu.toString();
            } else {

                return !((old.length == neu.length) && old.every(function(element, index) { return element === neu[index]; }));
            }
        }
    }
    /*
     Returns true if the current model has a different field compared to the reference object (typicall, stored in the library)
     */
    isModified(obj:Model,fieldName: string, ref: Raw, cur: any): boolean {
        if (!ref) return true;
        if (!(fieldName in ref) && (fieldName in cur)) return true;
        let old = ref[fieldName];
        let val = cur[fieldName];
        console.log("    model isModified compare field=", fieldName, ": old=", old, "new=", val);
        let res = obj.isFieldModified(old, val);
        console.log(res, typeof old, typeof val);
        return res;
    }
    /*
     Returns a raw unhydrated copy of the model, with only modified fields
     */
    getModifiedFields(obj:Model,ref: Raw): Raw {
        console.log("    model getModifiedFields", ref, this);
        let cur = obj.getFields();
        let modified = {};
        for (var i = 0, n = obj.datafields.length; i < n; ++i) {
            let fieldName: string = obj.datafields[i];
            if (obj.isModified(fieldName, ref, cur)) {
                modified[fieldName] = cur[fieldName];
            }
        }
        console.log("    model getModifiedFields=", modified);
        return modified;
    }

}