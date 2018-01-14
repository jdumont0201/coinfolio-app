"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model = (function () {
    function Model(loader) {
        this.loader = loader;
        this.EXTRA_FIELDS = ["created", "updated", "deleted", "record", "archived"];
    }
    /*addToPopulableItemArray<T extends Model>(m:T|ObjectId,fieldname:string){
     if (!this[fieldname]) this[fieldname] = [];
     let s=new PopulableItem<T>(m);
     this[fieldname].push(s);
     }
     setToPopulableItem<T extends Model>(m:T|ObjectId,fieldname:string){
     let s=new PopulableItem<T>(m);
     this[fieldname]=s;
     }*/
    Model.prototype.save = function (f) {
        this.loader.save(this, f);
    };
    Model.prototype.serialize = function () {
        return this.loader.serialize(this);
    };
    Model.prototype.serializeModified = function (referenceRaw) {
        return this.loader.serializeModified(this, referenceRaw);
    };
    Model.prototype.deleteAndSave = function (f) {
        this.deleted = true;
        this.loader.save(this, f);
    };
    Model.prototype.archiveAndSave = function (f) {
        this.archived = true;
        this.loader.save(this, f);
    };
    Model.prototype.copy = function (obj) {
        for (var key in obj) {
            this[key] = obj[key];
        }
    };
    Model.prototype.isPopulated = function (value) {
        console.log("    val", value, typeof value);
        return !(typeof value === "string" || typeof value === "number" || typeof value === "boolean");
    };
    /*getPopulatedItem(key:string):PopulableItem<any>{
     return this.loader.getPopulatedItem(this,key);
     }
     getPopulatedArray(key:string):PopulableItem<any>[]{
     return this.loader.getPopulatedArray(this,key);
     }*/
    Model.prototype.getField = function (fieldName) {
        return this.loader.getField(this, fieldName);
    };
    Model.prototype.getFields = function (useExtra) {
        return this.loader.getFields(this, useExtra);
    };
    Model.prototype.isFieldModified = function (old, neu) {
        return this.loader.isFieldModified(this, old, neu);
    };
    Model.prototype.isModified = function (fieldName, ref, cur) {
        return this.loader.isModified(this, fieldName, ref, cur);
    };
    Model.prototype.getModifiedFields = function (ref) {
        return this.loader.getModifiedFields(this, ref);
    };
    Model.EXTRA_FIELDS = ["created", "updated", "deleted", "record", "archived"];
    return Model;
}());
exports.Model = Model;
