import {ObjectId, Raw} from '../interfaces/interfaces'
import {Model} from "../models/Model";



export function findById(id: ObjectId, list: any[], f: Function): any {
    for (let i = 0, n = list.length; i < n; ++i) {
        let e = list[i];
        if (e._id === id) {
            f(e);
        }
    }
    return null;
}

export function isValidEmail(value){
    //let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //console.log("test",value,",res",re.test(value));
    return re.test(value);
    //return EMAIL_REGEXP.test(value) ;
}
export function   orderByLastname(list){
    let alphalist="abcdefghijklmnopqrstuvwxyz";
    let contactAlphaObj=[];
    let contactOther=[];
    for(var k in list){
        let c=list[k];
        let fl=c.lastname.substring(0,1).toLowerCase();
        if(alphalist.indexOf(fl)>-1 ){
            if(!(fl in contactAlphaObj))
                contactAlphaObj[fl]=new Array();
            contactAlphaObj[fl].push(c);
        }else{
            contactOther.push(c);
        }
    }
    let contactAlpha=new Array();
    Object.keys(contactAlphaObj)
        .sort()
        .forEach((v, i) =>{
            contactAlpha.push({fl:v,contacts:contactAlphaObj[v]});
        });

    let alphaUsed=Object.keys(contactAlpha);
    return {used:alphaUsed,alpha:contactAlpha,other:contactOther};
}
export function daysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    if ((firstDate.getHours() * 60 + firstDate.getMinutes()) > (secondDate.getHours() * 60 + secondDate.getMinutes())) diffDays++;
    return diffDays;
}
export function daysUpToNow(d: Date): number {
    return daysBetweenTwoDates(d, new Date())
}
export class Assert {
    static throwError(msg?: string) {
        if (typeof Error !== "undefined") {
            throw new Error(msg);
        }
        throw msg; // Fallback
    }
    static exists(obj: any, message?: string) {
        if (!obj) {
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


export function cloneRaw(obj: Raw): Raw {
    //console.log("cloneRaw",obj,"type=",typeof obj,"pro=",Object.prototype.toString.call(obj));
    if ("EXTRA_FIELDS" in obj) {
        throw new Error("EXTRA_FIELDS in obj");
    } else {


        var res = {};
        for (let key in obj) {
            //console.log("clone key",key,obj[key]);
            let ref = obj[key];
            if (Object.prototype.toString.call(ref) === '[object Array]') {
                res[key] = [];
                for (var i = 0, n = ref.length; i < n; ++i) {
                    res[key][i] = ref[i];
                }
            } else if (Object.prototype.toString.call(ref) === '[object Object]') {
                res[key] = cloneRaw(ref);
            } else {
                res[key] = ref;
            }


        }
        //console.log("cloneRaw",obj,"to",res);
        return res;
    }

}

export function clone(obj: Raw): Raw {
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