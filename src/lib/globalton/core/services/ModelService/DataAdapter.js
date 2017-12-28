"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GenericDataAdapter_1 = require("./GenericDataAdapter");
var DataAdapter = (function (_super) {
    __extends(DataAdapter, _super);
    function DataAdapter(modelService, configService) {
        var _this = _super.call(this) || this;
        _this.modelService = modelService;
        _this.configService = configService;
        return _this;
    }
    /*
     Sends a save request to store the object to the db :
     PUT     send the complete unhydrated model
     PATCH   sends only modified fields, if exists in library and can be compared
     POST    no id, creates new object
     */
    DataAdapter.prototype.save = function (obj, f) {
        /*
         let id:ObjectId = obj._id;
         console.log("    SAVE", obj, id, obj.modelType);
         if (id) {
         if (this.configService.LIBRARY_ENABLED && this.modelService.library.isPreloaded() && this.modelService.library.isCached(id)) {
         let ref:Raw = this.modelService.library.loadOneRaw(id);
         console.log("PATCH REF", ref);
         this.modelService.patch(obj, ref, function (o:T) {
         f(o);
         });
         } else {
         this.modelService.put(obj, function (o:T) {
         f(o);
         });
         }
         } else {
         this.modelService.post(obj, function (o:T) {
         f(o);
         });
         }*/
    };
    /* unused */
    DataAdapter.prototype.crypt = function (p) {
        return "";
    };
    DataAdapter.prototype.findOne = function (modelType, crit) {
        return new Promise(null);
    };
    return DataAdapter;
}(GenericDataAdapter_1.GenericDataAdapter));
exports.DataAdapter = DataAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YUFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEYXRhQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU1BLDJEQUF1RDtBQUV2RDtJQUFpQywrQkFBa0I7SUFFL0MscUJBQW1CLFlBQXlCLEVBQVMsYUFBMkI7UUFBaEYsWUFDSSxpQkFBTyxTQUNWO1FBRmtCLGtCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVMsbUJBQWEsR0FBYixhQUFhLENBQWM7O0lBRWhGLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILDBCQUFJLEdBQUosVUFBUSxHQUFTLEVBQUUsQ0FBVTtRQUV6Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQW1CSTtJQUNSLENBQUM7SUFDRCxZQUFZO0lBQ1osMkJBQUssR0FBTCxVQUFNLENBQVE7UUFDVixNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUNELDZCQUFPLEdBQVAsVUFBUSxTQUFvQixFQUFFLElBQVM7UUFDbkMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTCxrQkFBQztBQUFELENBQUMsQUEzQ0QsQ0FBaUMsdUNBQWtCLEdBMkNsRDtBQTNDWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kZWxTZXJ2aWNlfSAgICBmcm9tICcuLi9tb2RlbC5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7Q29uZmlnU2VydmljZX0gICAgZnJvbSAnLi4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQge1NjaGVtYX0gZnJvbSBcIi4vc2NoZW1hXCI7XHJcbmltcG9ydCB7TW9kZWx9IGZyb20gXCIuLi8uLi9tb2RlbHMvTW9kZWxcIlxyXG5pbXBvcnQge01vZGVsVHlwZSxPYmplY3RJZCwgTW9kZWxDYWxsYmFjayxSYXcsIERhdGFJbnRlcmZhY2V9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2ludGVyZmFjZXNcIlxyXG5pbXBvcnQge0dlbmVyaWNEYXRhQWRhcHRlcn0gZnJvbSBcIi4vR2VuZXJpY0RhdGFBZGFwdGVyXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRhQWRhcHRlciBleHRlbmRzIEdlbmVyaWNEYXRhQWRhcHRlcntcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbW9kZWxTZXJ2aWNlOk1vZGVsU2VydmljZSwgcHVibGljIGNvbmZpZ1NlcnZpY2U6Q29uZmlnU2VydmljZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTZW5kcyBhIHNhdmUgcmVxdWVzdCB0byBzdG9yZSB0aGUgb2JqZWN0IHRvIHRoZSBkYiA6XHJcbiAgICAgUFVUICAgICBzZW5kIHRoZSBjb21wbGV0ZSB1bmh5ZHJhdGVkIG1vZGVsXHJcbiAgICAgUEFUQ0ggICBzZW5kcyBvbmx5IG1vZGlmaWVkIGZpZWxkcywgaWYgZXhpc3RzIGluIGxpYnJhcnkgYW5kIGNhbiBiZSBjb21wYXJlZFxyXG4gICAgIFBPU1QgICAgbm8gaWQsIGNyZWF0ZXMgbmV3IG9iamVjdFxyXG4gICAgICovXHJcbiAgICBzYXZlPFQ+KG9iajpNb2RlbCwgZjpGdW5jdGlvbikge1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICBsZXQgaWQ6T2JqZWN0SWQgPSBvYmouX2lkO1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhcIiAgICBTQVZFXCIsIG9iaiwgaWQsIG9iai5tb2RlbFR5cGUpO1xyXG4gICAgICAgICBpZiAoaWQpIHtcclxuICAgICAgICAgaWYgKHRoaXMuY29uZmlnU2VydmljZS5MSUJSQVJZX0VOQUJMRUQgJiYgdGhpcy5tb2RlbFNlcnZpY2UubGlicmFyeS5pc1ByZWxvYWRlZCgpICYmIHRoaXMubW9kZWxTZXJ2aWNlLmxpYnJhcnkuaXNDYWNoZWQoaWQpKSB7XHJcbiAgICAgICAgIGxldCByZWY6UmF3ID0gdGhpcy5tb2RlbFNlcnZpY2UubGlicmFyeS5sb2FkT25lUmF3KGlkKTtcclxuICAgICAgICAgY29uc29sZS5sb2coXCJQQVRDSCBSRUZcIiwgcmVmKTtcclxuICAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UucGF0Y2gob2JqLCByZWYsIGZ1bmN0aW9uIChvOlQpIHtcclxuICAgICAgICAgZihvKTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLnB1dChvYmosIGZ1bmN0aW9uIChvOlQpIHtcclxuICAgICAgICAgZihvKTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UucG9zdChvYmosIGZ1bmN0aW9uIChvOlQpIHtcclxuICAgICAgICAgZihvKTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgIH0qL1xyXG4gICAgfVxyXG4gICAgLyogdW51c2VkICovXHJcbiAgICBjcnlwdChwOnN0cmluZyk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgZmluZE9uZShtb2RlbFR5cGU6IE1vZGVsVHlwZSwgY3JpdDogYW55KTogUHJvbWlzZTxNb2RlbD57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKG51bGwpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==