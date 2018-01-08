"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Assert = (function () {
    function Assert() {
    }
    Assert.throwError = function (msg) {
        if (typeof Error !== "undefined") {
            throw new Error(msg);
        }
        throw msg; // Fallback
    };
    Assert.exists = function (obj, message) {
        if (typeof obj == 'undefined') {
            message = message || "Exist assertion failed";
            Assert.throwError(message);
        }
    };
    Assert.isTrue = function (obj, message) {
        if (!obj) {
            message = message || "Boolean assertion failed";
            Assert.throwError(message);
        }
    };
    Assert.isString = function (obj, message) {
        var condition = (typeof obj === "string");
        var defaultMsg = "String assertion failed";
        Assert.isTrue(condition, defaultMsg);
    };
    Assert.isArray = function (obj, message) {
        var condition = (Object.prototype.toString.call(obj) === '[object Array]');
        var defaultMsg = "isArray assertion failed";
        Assert.isTrue(condition, defaultMsg);
    };
    Assert.isObject = function (obj, message) {
        var condition = (Object.prototype.toString.call(obj) === '[object Object]');
        var defaultMsg = "Object assertion failed";
        Assert.isTrue(condition, defaultMsg);
    };
    return Assert;
}());
exports.Assert = Assert;
//# sourceMappingURL=assert.js.map