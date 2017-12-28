
import {ObjectId,ModelInterface,Raw,DataInterface,ModelType,Price} from "../interfaces/interfaces"

export class Model implements ModelInterface {
    _id:ObjectId;
    id:ObjectId;
    created:string;
    updated:string;
    deleted:boolean;
    archived:boolean;
    modelType:ModelType;
    datafields:string[];
    record:string;
    static loader;
    EXTRA_FIELDS: string[] = ["created", "updated", "deleted","record","archived"];
    static EXTRA_FIELDS: string[] = ["created", "updated", "deleted","record","archived"];
    constructor(public loader:DataInterface){

    }

    /*addToPopulableItemArray<T extends Model>(m:T|ObjectId,fieldname:string){
     if (!this[fieldname]) this[fieldname] = [];
     let s=new PopulableItem<T>(m);
     this[fieldname].push(s);
     }
     setToPopulableItem<T extends Model>(m:T|ObjectId,fieldname:string){
     let s=new PopulableItem<T>(m);
     this[fieldname]=s;
     }*/

    save<T>(f:Function){
        this.loader.save(this,f);
    }
    serialize():string{
        return this.loader.serialize(this);
    }
    serializeModified(referenceRaw: Raw):string{
        return this.loader.serializeModified(this,referenceRaw);

    }
    deleteAndSave<T>(f:Function){
        this.deleted=true;
        this.loader.save(this,f);
    }
    archiveAndSave(f: Function): void {
        this.archived = true;
        this.loader.save(this,f);
    }
    copy(obj){
        for(var key in obj){
            this[key]=obj[key];
        }
    }

    isPopulated(value: any): boolean {
        console.log("    val", value, typeof value);
        return !(typeof value === "string" || typeof value === "number" || typeof value === "boolean")
    }
    /*getPopulatedItem(key:string):PopulableItem<any>{
     return this.loader.getPopulatedItem(this,key);
     }
     getPopulatedArray(key:string):PopulableItem<any>[]{
     return this.loader.getPopulatedArray(this,key);
     }*/

    getField(fieldName: string) {
        return this.loader.getField(this,fieldName);
    }

    getFields(useExtra?: boolean): Raw {
        return this.loader.getFields(this,useExtra);
    }

    isFieldModified(old: any, neu: any): boolean {
        return this.loader.isFieldModified(this,old,neu);
    }

    isModified(fieldName: string, ref: Raw, cur: any): boolean {
        return this.loader.isModified(this,fieldName,ref,cur);
    }

    getModifiedFields(ref: Raw): Raw {
        return this.loader.getModifiedFields(this,ref);
    }

}