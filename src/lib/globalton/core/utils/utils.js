"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function appendArrayToObject(res, A) {
    for (var i = 0; i < res.length; ++i)
        A[res[i].id] = res[i];
}
exports.appendArrayToObject = appendArrayToObject;
function appendArrayToArray(res, A) {
    for (var i = 0; i < res.length; ++i)
        A.push(res[i]);
}
exports.appendArrayToArray = appendArrayToArray;
function findById(id, list, f) {
    for (var i = 0, n = list.length; i < n; ++i) {
        var e = list[i];
        if (e._id === id) {
            f(e);
        }
    }
    return null;
}
exports.findById = findById;
function isValidEmail(value) {
    //let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //console.log("test",value,",res",re.test(value));
    return re.test(value);
    //return EMAIL_REGEXP.test(value) ;
}
exports.isValidEmail = isValidEmail;
function orderByLastname(list) {
    var alphalist = "abcdefghijklmnopqrstuvwxyz";
    var contactAlphaObj = [];
    var contactOther = [];
    for (var k in list) {
        var c = list[k];
        var fl = c.lastname.substring(0, 1).toLowerCase();
        if (alphalist.indexOf(fl) > -1) {
            if (!(fl in contactAlphaObj))
                contactAlphaObj[fl] = new Array();
            contactAlphaObj[fl].push(c);
        }
        else {
            contactOther.push(c);
        }
    }
    var contactAlpha = new Array();
    Object.keys(contactAlphaObj)
        .sort()
        .forEach(function (v, i) {
        contactAlpha.push({ fl: v, contacts: contactAlphaObj[v] });
    });
    var alphaUsed = Object.keys(contactAlpha);
    return { used: alphaUsed, alpha: contactAlpha, other: contactOther };
}
exports.orderByLastname = orderByLastname;
function daysBetweenTwoDates(firstDate, secondDate) {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    if ((firstDate.getHours() * 60 + firstDate.getMinutes()) > (secondDate.getHours() * 60 + secondDate.getMinutes()))
        diffDays++;
    return diffDays;
}
exports.daysBetweenTwoDates = daysBetweenTwoDates;
function daysUpToNow(d) {
    return daysBetweenTwoDates(d, new Date());
}
exports.daysUpToNow = daysUpToNow;
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
        if (!obj) {
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
function cloneRaw(obj) {
    //console.log("cloneRaw",obj,"type=",typeof obj,"pro=",Object.prototype.toString.call(obj));
    if ("EXTRA_FIELDS" in obj) {
        throw new Error("EXTRA_FIELDS in obj");
    }
    else {
        var res = {};
        for (var key in obj) {
            //console.log("clone key",key,obj[key]);
            var ref = obj[key];
            if (Object.prototype.toString.call(ref) === '[object Array]') {
                res[key] = [];
                for (var i = 0, n = ref.length; i < n; ++i) {
                    res[key][i] = ref[i];
                }
            }
            else if (Object.prototype.toString.call(ref) === '[object Object]') {
                res[key] = cloneRaw(ref);
            }
            else {
                res[key] = ref;
            }
        }
        //console.log("cloneRaw",obj,"to",res);
        return res;
    }
}
exports.cloneRaw = cloneRaw;
function clone(obj) {
    console.log("clone", obj);
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = clone(obj[key]);
    }
    return temp;
}
exports.clone = clone;
//# sourceMappingURL=utils.js.map