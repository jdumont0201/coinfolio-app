
import {Assert} from "../utils/utils"

export interface DataInterface{
    save<T>(obj:Model,f:Function);
    serialize(obj:Model):string;
    serializeModified(obj:Model,referenceRaw: Raw):string;
    getPopulatedItem(obj:Model,key:string):PopulableItem<any>;
    getPopulatedArray(obj:Model,key:string):PopulableItem<any>[];
    getField(obj:Model,fieldName: string) ;
    getFields(obj:Model,useExtra?: boolean): Raw ;
    isFieldModified(obj:Model,old: any, neu: any): boolean ;
    isModified(obj:Model,fieldName: string, ref: Raw, cur: any): boolean;
    getModifiedFields(obj:Model,ref: Raw): Raw ;
    crypt(password:string);
}

 export type LoginChangedInterface ={    authentificated:boolean,   isTourDone:boolean};
 
 export interface Price{
     value:number;
     currencyCode:string;
 }
 export interface RecurrentPayment{
     name:string;
     price:Price;
     frequency:string;

 }
 
 export interface ModelInterface {
     _id: ObjectId;
     datafields: string[];
     save<T>(f:Function);
     serialize():string;
     serializeModified(referenceRaw: Raw):string;
 }
 interface Model {
     _id: ObjectId;
     datafields: string[];
 }
 export class PopulableItem<T extends Model> {

     populated: boolean;
     constructor(public val: ObjectId | T) {
         this.populated = (typeof val !== "string");
        //  this.addProperties();
     }
     addProperties(){
         if(this.populated){
             let df=(<T>this.val).datafields;
             for(let i=0, n= df.length ; i < n ; ++i){
                 let key:string= df[i];
                Object.defineProperty(this, key, {
                    get: function() {return this.val[key]; },
                    set: function(value) { this.val[key] = value; }
                });
            }
         }

     }
     getObjectId(): ObjectId {
         //Assert.exists(this.val);
         if(!this.val) return null;
         if ((<T>this.val)._id) return (<T>this.val)._id;
         else return <ObjectId>this.val;

     }
     getObject(): T {
         if ((<T>this.val)._id) return <T>this.val;
         else return <T>{};//<ObjectId>this.item;
     }
     isPopulated() {
         return this.isPopulated;
     }
     set(v: ObjectId | T) {
         this.val = v;
         this.populated = (typeof v !== "string");
        //  this.addProperties();
     }
     toString():string{ 
         return this.getObjectId();
     }
 }
 
 export type PopItem<T extends Model> = ObjectId | T;

 export type QueryPopulateOption={model?:any,populate?:any,path?:any,select?:any,match?:any};
 export type QuerySelectOption=any;
 export type QuerySortOption=any;
 export type QueryLimitOption=any;
 export type QuerySkipOption=any;
 export type QueryMatchOption=any;
 
 
// export type Step = { code: StepCode, name: string, todefine: PopItem<Contact>[], qualified: PopItem<Contact>[], disqualified: PopItem<Contact>[] }
 export type StepCode=string;
 export type StepStatus=number;
 export type ReturnMode=number;
 
 export type Raw=any;
 export type RawHash={[key:string]:Raw};
 
 export type RawGetAllHash={main:RawHash,populated:RawHash};
 
 export type LangCode = string;
 export type DomainDefinition = { defaultLanguage: LangCode };

 export type ModelType=number;
 export type UserRight={_id:any,level:string}; 
 export type InvitedUserRight={email:string,level:string}; 
 export type DiscussionRelation={related:ObjectId,doid:ObjectId,relationtype:string};
 export type OwnerTag={ownertype:string,ownerid: ObjectId};
  export type ObjectId=string;
  export type AssociativeArray={[key:string]:any[]};
  export type FormFields={[key:string]:any};
  export type StringAssociativeArray={[key:string]:string[]};
 export type ActionBarItemCode=number;
  export type RequestQueryOptions={
      populate?:QueryPopulateOption,
      select?:QuerySelectOption,
      match?:QuerySortOption,
      sort?:QuerySortOption,
      limit?:QueryLimitOption,
      skip?:QuerySkipOption};
  
  
  export interface ModelCallback<T> {(obj:T):void;}
  export interface ModelArrayCallback<T> {(obj:T[]):void;}

