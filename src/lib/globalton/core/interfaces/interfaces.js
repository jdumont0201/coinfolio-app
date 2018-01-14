"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PopulableItem = (function () {
    function PopulableItem(val) {
        this.val = val;
        this.populated = (typeof val !== "string");
        //  this.addProperties();
    }
    PopulableItem.prototype.addProperties = function () {
        if (this.populated) {
            var df = this.val.datafields;
            var _loop_1 = function (i, n) {
                var key = df[i];
                Object.defineProperty(this_1, key, {
                    get: function () { return this.val[key]; },
                    set: function (value) { this.val[key] = value; }
                });
            };
            var this_1 = this;
            for (var i = 0, n = df.length; i < n; ++i) {
                _loop_1(i, n);
            }
        }
    };
    PopulableItem.prototype.getObjectId = function () {
        //Assert.exists(this.val);
        if (!this.val)
            return null;
        if (this.val._id)
            return this.val._id;
        else
            return this.val;
    };
    PopulableItem.prototype.getObject = function () {
        if (this.val._id)
            return this.val;
        else
            return {}; //<ObjectId>this.item;
    };
    PopulableItem.prototype.isPopulated = function () {
        return this.isPopulated;
    };
    PopulableItem.prototype.set = function (v) {
        this.val = v;
        this.populated = (typeof v !== "string");
        //  this.addProperties();
    };
    PopulableItem.prototype.toString = function () {
        return this.getObjectId();
    };
    return PopulableItem;
}());
exports.PopulableItem = PopulableItem;
