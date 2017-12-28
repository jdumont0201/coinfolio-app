
export class Assert {
    static throwError(msg?: string) {
        if (typeof Error !== "undefined") {
            throw new Error(msg);
        }
        throw msg; // Fallback
    }
    static exists(obj: any, message?: string) {

        if (typeof obj == 'undefined') {
            message = message || "Exist assertion failed";
            Assert.throwError(message);
        }
    }
    static isTrue(obj: boolean, message?: string) {
        if (!obj) {
            message = message || "Boolean assertion failed";
            Assert.throwError(message);
        }
    }
    static isString(obj: any, message?: string) {
        let condition = (typeof obj === "string");
        let defaultMsg = "String assertion failed";
        Assert.isTrue(condition, defaultMsg);
    }
    static isArray(obj: any, message?: string) {
        let condition = (Object.prototype.toString.call(obj) === '[object Array]');
        let defaultMsg = "isArray assertion failed";
        Assert.isTrue(condition, defaultMsg);
    }
    static isObject(obj: any, message?: string) {
        let condition = (Object.prototype.toString.call(obj) === '[object Object]');
        let defaultMsg = "Object assertion failed";
        Assert.isTrue(condition, defaultMsg);
    }
}
