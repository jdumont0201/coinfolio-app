import { ObjectId, Raw } from '../interfaces/interfaces';
export declare function findById(id: ObjectId, list: any[], f: Function): any;
export declare function daysBetweenTwoDates(firstDate: Date, secondDate: Date): number;
export declare function daysUpToNow(d: Date): number;
export declare class Assert {
    static throwError(msg?: string): void;
    static exists(obj: any, message?: string): void;
    static isTrue(obj: boolean, message?: string): void;
    static isString(obj: any, message?: string): void;
    static isArray(obj: any, message?: string): void;
    static isObject(obj: any, message?: string): void;
}
export declare function cloneRaw(obj: Raw): Raw;
export declare function clone(obj: Raw): Raw;
