"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GenericDataAdapter = (function () {
    function GenericDataAdapter() {
    }
    /**
     * Returns the string version of the model
     * @method serialize
     * @returns {string} the serialized version of the data fields for this object
     */
    GenericDataAdapter.prototype.serialize = function (obj) {
        return JSON.stringify(obj.getFields());
    };
    /**
     * Returns the string version of the modified fields of the model
     * @method serialize
     * @returns {string} the serialized version of the data fields for this object
     */
    GenericDataAdapter.prototype.serializeModified = function (obj, referenceRaw) {
        return JSON.stringify(obj.getModifiedFields(referenceRaw));
    };
    GenericDataAdapter.prototype.isPopulableField = function (name) {
        return name in this.POPULABLE_SINGLE_FIELDS;
    };
    GenericDataAdapter.prototype.isPopulableArrayField = function (name) {
        return name in this.POPULABLE_ARRAY_FIELDS;
    };
    GenericDataAdapter.prototype.isPopulableInnerArrayField = function (name) {
        return name in this.POPULABLE_INNER_ARRAY_FIELD;
    };
    GenericDataAdapter.prototype.isPopulated = function (obj, value) {
        console.log("    val", value, typeof value);
        return !(typeof value === "string" || typeof value === "number" || typeof value === "boolean");
    };
    GenericDataAdapter.prototype.getPopulatedItem = function (obj, key) {
        if (key in this.POPULABLE_SINGLE_FIELDS) {
            if (obj[key])
                return obj[key].getObject();
            else {
                console.warn("this", key, "not set");
            }
        }
        else {
            console.error("Getpopulated on not populated prop", key, "val=", this[key]);
            return null;
        }
    };
    GenericDataAdapter.prototype.getPopulatedArray = function (obj, key) {
        console.log("GETPOPULATED");
        if (key in this.POPULABLE_ARRAY_FIELDS) {
            if (obj[key]) {
                var res_1 = [];
                obj[key].forEach(function (e, index, array) { res_1.push(e.getObject()); });
                return res_1;
            }
            else {
                console.warn("this", key, "not set");
            }
        }
        else {
            console.error("Getpopulated on not populated prop", key, "val=", this[key]);
            return [];
        }
    };
    /*
     Returns the raw value of the field fieldName of the current model
     In particular, extracts the value from Populated objects.
     */
    GenericDataAdapter.prototype.getField = function (obj, fieldName) {
        var fieldValue = obj[fieldName];
        if (!fieldValue)
            return null;
        if (this.isPopulableField(fieldName)) {
            var fieldValue_1 = obj[fieldName];
            if (typeof fieldValue_1 === "string")
                return fieldValue_1;
            else
                return fieldValue_1.getObjectId();
        }
        else if (this.isPopulableArrayField(fieldName)) {
            var fieldValue_2 = obj[fieldName];
            if (fieldValue_2.length == 0)
                return [];
            var re = [];
            for (var j = 0, m = fieldValue_2.length; j < m; ++j) {
                var oid = fieldValue_2[j].getObjectId();
                if (oid)
                    re.push(oid);
            }
            return re;
        }
        else if (this.isPopulableInnerArrayField(fieldName)) {
            //TODO
        }
        else {
            if (Object.prototype.toString.call(fieldValue) === '[object Array]') {
                return JSON.parse(JSON.stringify(fieldValue));
            }
            else {
                return fieldValue;
            }
        }
    };
    /*
     Returns the raw unpopulated object of the current model
     */
    GenericDataAdapter.prototype.getFields = function (obj, useExtra) {
        var fieldSet = {};
        for (var i = 0, n = obj.datafields.length; i < n; ++i) {
            var fieldName = obj.datafields[i];
            if (obj[fieldName]) {
                fieldSet[fieldName] = obj.getField(fieldName);
            }
        }
        if (useExtra) {
            for (var i = 0, n = obj.EXTRA_FIELDS.length; i < n; ++i) {
                var fieldName = obj.EXTRA_FIELDS[i];
                if (obj[fieldName]) {
                    fieldSet[fieldName] = obj.getField(fieldName);
                }
            }
        }
        fieldSet["record"] = obj.record;
        fieldSet["modelType"] = obj.modelType;
        return fieldSet;
    };
    /*
     Check if the value if modified from the reference value from the db (typically, comes from the Library)
     returns true if val1 is different from val2
     */
    GenericDataAdapter.prototype.isFieldModified = function (obj, old, neu) {
        console.log("    compare ", old, neu);
        if (typeof old === 'undefined' && typeof neu === 'undefined') {
            console.log("    null compa");
            return false;
        }
        if ((typeof old === 'undefined' && (typeof neu !== 'undefined')) || (typeof neu === 'undefined' && typeof old !== 'undefined')) {
            console.log("    is oe null");
            return true;
        }
        if (typeof old === "string" || typeof old === "number" || typeof old === "boolean") {
            console.log("    string compa", old, neu, old !== neu);
            return old !== neu;
        }
        else {
            console.log("    obj array compa");
            if (Object.prototype.toString.call(old) === '[object Object]') {
                for (var i in neu) {
                    var isModified = obj.isFieldModified(old[i], neu[i]);
                    if (isModified)
                        return true;
                }
                return false;
            }
            else if (Object.prototype.toString.call(old) === '[object Array]') {
                return old.toString() !== neu.toString();
            }
            else {
                return !((old.length == neu.length) && old.every(function (element, index) { return element === neu[index]; }));
            }
        }
    };
    /*
     Returns true if the current model has a different field compared to the reference object (typicall, stored in the library)
     */
    GenericDataAdapter.prototype.isModified = function (obj, fieldName, ref, cur) {
        if (!ref)
            return true;
        if (!(fieldName in ref) && (fieldName in cur))
            return true;
        var old = ref[fieldName];
        var val = cur[fieldName];
        console.log("    model isModified compare field=", fieldName, ": old=", old, "new=", val);
        var res = obj.isFieldModified(old, val);
        console.log(res, typeof old, typeof val);
        return res;
    };
    /*
     Returns a raw unhydrated copy of the model, with only modified fields
     */
    GenericDataAdapter.prototype.getModifiedFields = function (obj, ref) {
        console.log("    model getModifiedFields", ref, this);
        var cur = obj.getFields();
        var modified = {};
        for (var i = 0, n = obj.datafields.length; i < n; ++i) {
            var fieldName = obj.datafields[i];
            if (obj.isModified(fieldName, ref, cur)) {
                modified[fieldName] = cur[fieldName];
            }
        }
        console.log("    model getModifiedFields=", modified);
        return modified;
    };
    return GenericDataAdapter;
}());
exports.GenericDataAdapter = GenericDataAdapter;
//# sourceMappingURL=GenericDataAdapter.js.map