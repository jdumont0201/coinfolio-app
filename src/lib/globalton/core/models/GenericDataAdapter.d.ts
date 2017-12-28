import { Model } from "../models/Model";
import { ModelType, PopulableItem, Raw, DataInterface } from "../interfaces/interfaces";
export declare abstract class GenericDataAdapter implements DataInterface {
    constructor();
    POPULABLE_SINGLE_FIELDS:any;
    POPULABLE_ARRAY_FIELDS:any;
    POPULABLE_INNER_ARRAY_FIELD:any;
    abstract save<T>(obj: Model, f: Function): any;
    abstract crypt(p: string): any;
    abstract findOne(modelType: ModelType, crit: any): Promise<Model>;
    /**
     * Returns the string version of the model
     * @method serialize
     * @returns {string} the serialized version of the data fields for this object
     */
    serialize(obj: Model): string;
    /**
     * Returns the string version of the modified fields of the model
     * @method serialize
     * @returns {string} the serialized version of the data fields for this object
     */
    serializeModified(obj: Model, referenceRaw: Raw): string;
    isPopulableField(name: string): boolean;
    isPopulableArrayField(name: string): boolean;
    isPopulableInnerArrayField(name: string): boolean;
    isPopulated(obj: Model, value: any): boolean;
    getPopulatedItem(obj: Model, key: string): PopulableItem<any>;
    getPopulatedArray(obj: Model, key: string): PopulableItem<any>[];
    getField(obj: Model, fieldName: string): any;
    getFields(obj: Model, useExtra?: boolean): Raw;
    isFieldModified(obj: Model, old: any, neu: any): boolean;
    isModified(obj: Model, fieldName: string, ref: Raw, cur: any): boolean;
    getModifiedFields(obj: Model, ref: Raw): Raw;
}
