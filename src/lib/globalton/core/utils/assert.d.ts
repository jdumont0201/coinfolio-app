export declare class Assert {
    static throwError(msg?: string): void;
    static exists(obj: any, message?: string): void;
    static isTrue(obj: boolean, message?: string): void;
    static isString(obj: any, message?: string): void;
    static isArray(obj: any, message?: string): void;
    static isObject(obj: any, message?: string): void;
}
