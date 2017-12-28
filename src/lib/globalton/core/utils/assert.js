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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXNzZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0E7SUFBQTtJQW1DQSxDQUFDO0lBbENVLGlCQUFVLEdBQWpCLFVBQWtCLEdBQVk7UUFDMUIsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFDRCxNQUFNLEdBQUcsQ0FBQyxDQUFDLFdBQVc7SUFDMUIsQ0FBQztJQUNNLGFBQU0sR0FBYixVQUFjLEdBQVEsRUFBRSxPQUFnQjtRQUVwQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxPQUFPLElBQUksd0JBQXdCLENBQUM7WUFDOUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixDQUFDO0lBQ0wsQ0FBQztJQUNNLGFBQU0sR0FBYixVQUFjLEdBQVksRUFBRSxPQUFnQjtRQUN4QyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDUCxPQUFPLEdBQUcsT0FBTyxJQUFJLDBCQUEwQixDQUFDO1lBQ2hELE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsQ0FBQztJQUNMLENBQUM7SUFDTSxlQUFRLEdBQWYsVUFBZ0IsR0FBUSxFQUFFLE9BQWdCO1FBQ3RDLElBQUksU0FBUyxHQUFHLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUM7UUFDMUMsSUFBSSxVQUFVLEdBQUcseUJBQXlCLENBQUM7UUFDM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNNLGNBQU8sR0FBZCxVQUFlLEdBQVEsRUFBRSxPQUFnQjtRQUNyQyxJQUFJLFNBQVMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzNFLElBQUksVUFBVSxHQUFHLDBCQUEwQixDQUFDO1FBQzVDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFDTSxlQUFRLEdBQWYsVUFBZ0IsR0FBUSxFQUFFLE9BQWdCO1FBQ3RDLElBQUksU0FBUyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGlCQUFpQixDQUFDLENBQUM7UUFDNUUsSUFBSSxVQUFVLEdBQUcseUJBQXlCLENBQUM7UUFDM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDLEFBbkNELElBbUNDO0FBbkNZLHdCQUFNIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmV4cG9ydCBjbGFzcyBBc3NlcnQge1xyXG4gICAgc3RhdGljIHRocm93RXJyb3IobXNnPzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBFcnJvciAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbXNnOyAvLyBGYWxsYmFja1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGV4aXN0cyhvYmo6IGFueSwgbWVzc2FnZT86IHN0cmluZykge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBtZXNzYWdlID0gbWVzc2FnZSB8fCBcIkV4aXN0IGFzc2VydGlvbiBmYWlsZWRcIjtcclxuICAgICAgICAgICAgQXNzZXJ0LnRocm93RXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGlzVHJ1ZShvYmo6IGJvb2xlYW4sIG1lc3NhZ2U/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIW9iaikge1xyXG4gICAgICAgICAgICBtZXNzYWdlID0gbWVzc2FnZSB8fCBcIkJvb2xlYW4gYXNzZXJ0aW9uIGZhaWxlZFwiO1xyXG4gICAgICAgICAgICBBc3NlcnQudGhyb3dFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNTdHJpbmcob2JqOiBhbnksIG1lc3NhZ2U/OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgY29uZGl0aW9uID0gKHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCIpO1xyXG4gICAgICAgIGxldCBkZWZhdWx0TXNnID0gXCJTdHJpbmcgYXNzZXJ0aW9uIGZhaWxlZFwiO1xyXG4gICAgICAgIEFzc2VydC5pc1RydWUoY29uZGl0aW9uLCBkZWZhdWx0TXNnKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBpc0FycmF5KG9iajogYW55LCBtZXNzYWdlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGNvbmRpdGlvbiA9IChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJyk7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRNc2cgPSBcImlzQXJyYXkgYXNzZXJ0aW9uIGZhaWxlZFwiO1xyXG4gICAgICAgIEFzc2VydC5pc1RydWUoY29uZGl0aW9uLCBkZWZhdWx0TXNnKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBpc09iamVjdChvYmo6IGFueSwgbWVzc2FnZT86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjb25kaXRpb24gPSAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE9iamVjdF0nKTtcclxuICAgICAgICBsZXQgZGVmYXVsdE1zZyA9IFwiT2JqZWN0IGFzc2VydGlvbiBmYWlsZWRcIjtcclxuICAgICAgICBBc3NlcnQuaXNUcnVlKGNvbmRpdGlvbiwgZGVmYXVsdE1zZyk7XHJcbiAgICB9XHJcbn1cclxuIl19