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
    return Model;
}());
Model.EXTRA_FIELDS = ["created", "updated", "deleted", "record", "archived"];
exports.Model = Model;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBO0lBYUksZUFBbUIsTUFBb0I7UUFBcEIsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQUZ2QyxpQkFBWSxHQUFhLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsUUFBUSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0lBSS9FLENBQUM7SUFFRDs7Ozs7Ozs7UUFRSTtJQUVKLG9CQUFJLEdBQUosVUFBUSxDQUFVO1FBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCx5QkFBUyxHQUFUO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxpQ0FBaUIsR0FBakIsVUFBa0IsWUFBaUI7UUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFDLFlBQVksQ0FBQyxDQUFDO0lBRTVELENBQUM7SUFDRCw2QkFBYSxHQUFiLFVBQWlCLENBQVU7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCw4QkFBYyxHQUFkLFVBQWUsQ0FBVztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELG9CQUFJLEdBQUosVUFBSyxHQUFHO1FBQ0osR0FBRyxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUEsQ0FBQztZQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7SUFDTCxDQUFDO0lBRUQsMkJBQVcsR0FBWCxVQUFZLEtBQVU7UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sS0FBSyxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFBO0lBQ2xHLENBQUM7SUFDRDs7Ozs7UUFLSTtJQUVKLHdCQUFRLEdBQVIsVUFBUyxTQUFpQjtRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCx5QkFBUyxHQUFULFVBQVUsUUFBa0I7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksRUFBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsK0JBQWUsR0FBZixVQUFnQixHQUFRLEVBQUUsR0FBUTtRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsMEJBQVUsR0FBVixVQUFXLFNBQWlCLEVBQUUsR0FBUSxFQUFFLEdBQVE7UUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxpQ0FBaUIsR0FBakIsVUFBa0IsR0FBUTtRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVMLFlBQUM7QUFBRCxDQUFDLEFBbEZEO0FBWVcsa0JBQVksR0FBYSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLFFBQVEsRUFBQyxVQUFVLENBQUMsQ0FBQztBQVo3RSxzQkFBSyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge09iamVjdElkLE1vZGVsSW50ZXJmYWNlLFJhdyxEYXRhSW50ZXJmYWNlLE1vZGVsVHlwZSxQcmljZX0gZnJvbSBcIi4uL2ludGVyZmFjZXMvaW50ZXJmYWNlc1wiXHJcblxyXG5leHBvcnQgY2xhc3MgTW9kZWwgaW1wbGVtZW50cyBNb2RlbEludGVyZmFjZSB7XHJcbiAgICBfaWQ6T2JqZWN0SWQ7XHJcbiAgICBpZDpPYmplY3RJZDtcclxuICAgIGNyZWF0ZWQ6c3RyaW5nO1xyXG4gICAgdXBkYXRlZDpzdHJpbmc7XHJcbiAgICBkZWxldGVkOmJvb2xlYW47XHJcbiAgICBhcmNoaXZlZDpib29sZWFuO1xyXG4gICAgbW9kZWxUeXBlOk1vZGVsVHlwZTtcclxuICAgIGRhdGFmaWVsZHM6c3RyaW5nW107XHJcbiAgICByZWNvcmQ6c3RyaW5nO1xyXG4gICAgc3RhdGljIGxvYWRlcjtcclxuICAgIEVYVFJBX0ZJRUxEUzogc3RyaW5nW10gPSBbXCJjcmVhdGVkXCIsIFwidXBkYXRlZFwiLCBcImRlbGV0ZWRcIixcInJlY29yZFwiLFwiYXJjaGl2ZWRcIl07XHJcbiAgICBzdGF0aWMgRVhUUkFfRklFTERTOiBzdHJpbmdbXSA9IFtcImNyZWF0ZWRcIiwgXCJ1cGRhdGVkXCIsIFwiZGVsZXRlZFwiLFwicmVjb3JkXCIsXCJhcmNoaXZlZFwiXTtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2FkZXI6RGF0YUludGVyZmFjZSl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qYWRkVG9Qb3B1bGFibGVJdGVtQXJyYXk8VCBleHRlbmRzIE1vZGVsPihtOlR8T2JqZWN0SWQsZmllbGRuYW1lOnN0cmluZyl7XHJcbiAgICAgaWYgKCF0aGlzW2ZpZWxkbmFtZV0pIHRoaXNbZmllbGRuYW1lXSA9IFtdO1xyXG4gICAgIGxldCBzPW5ldyBQb3B1bGFibGVJdGVtPFQ+KG0pO1xyXG4gICAgIHRoaXNbZmllbGRuYW1lXS5wdXNoKHMpO1xyXG4gICAgIH1cclxuICAgICBzZXRUb1BvcHVsYWJsZUl0ZW08VCBleHRlbmRzIE1vZGVsPihtOlR8T2JqZWN0SWQsZmllbGRuYW1lOnN0cmluZyl7XHJcbiAgICAgbGV0IHM9bmV3IFBvcHVsYWJsZUl0ZW08VD4obSk7XHJcbiAgICAgdGhpc1tmaWVsZG5hbWVdPXM7XHJcbiAgICAgfSovXHJcblxyXG4gICAgc2F2ZTxUPihmOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmxvYWRlci5zYXZlKHRoaXMsZik7XHJcbiAgICB9XHJcbiAgICBzZXJpYWxpemUoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVyLnNlcmlhbGl6ZSh0aGlzKTtcclxuICAgIH1cclxuICAgIHNlcmlhbGl6ZU1vZGlmaWVkKHJlZmVyZW5jZVJhdzogUmF3KTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVyLnNlcmlhbGl6ZU1vZGlmaWVkKHRoaXMscmVmZXJlbmNlUmF3KTtcclxuXHJcbiAgICB9XHJcbiAgICBkZWxldGVBbmRTYXZlPFQ+KGY6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuZGVsZXRlZD10cnVlO1xyXG4gICAgICAgIHRoaXMubG9hZGVyLnNhdmUodGhpcyxmKTtcclxuICAgIH1cclxuICAgIGFyY2hpdmVBbmRTYXZlKGY6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hcmNoaXZlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5sb2FkZXIuc2F2ZSh0aGlzLGYpO1xyXG4gICAgfVxyXG4gICAgY29weShvYmope1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIG9iail7XHJcbiAgICAgICAgICAgIHRoaXNba2V5XT1vYmpba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNQb3B1bGF0ZWQodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiICAgIHZhbFwiLCB2YWx1ZSwgdHlwZW9mIHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gISh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpXHJcbiAgICB9XHJcbiAgICAvKmdldFBvcHVsYXRlZEl0ZW0oa2V5OnN0cmluZyk6UG9wdWxhYmxlSXRlbTxhbnk+e1xyXG4gICAgIHJldHVybiB0aGlzLmxvYWRlci5nZXRQb3B1bGF0ZWRJdGVtKHRoaXMsa2V5KTtcclxuICAgICB9XHJcbiAgICAgZ2V0UG9wdWxhdGVkQXJyYXkoa2V5OnN0cmluZyk6UG9wdWxhYmxlSXRlbTxhbnk+W117XHJcbiAgICAgcmV0dXJuIHRoaXMubG9hZGVyLmdldFBvcHVsYXRlZEFycmF5KHRoaXMsa2V5KTtcclxuICAgICB9Ki9cclxuXHJcbiAgICBnZXRGaWVsZChmaWVsZE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlci5nZXRGaWVsZCh0aGlzLGZpZWxkTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmllbGRzKHVzZUV4dHJhPzogYm9vbGVhbik6IFJhdyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVyLmdldEZpZWxkcyh0aGlzLHVzZUV4dHJhKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0ZpZWxkTW9kaWZpZWQob2xkOiBhbnksIG5ldTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVyLmlzRmllbGRNb2RpZmllZCh0aGlzLG9sZCxuZXUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzTW9kaWZpZWQoZmllbGROYW1lOiBzdHJpbmcsIHJlZjogUmF3LCBjdXI6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlci5pc01vZGlmaWVkKHRoaXMsZmllbGROYW1lLHJlZixjdXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1vZGlmaWVkRmllbGRzKHJlZjogUmF3KTogUmF3IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZXIuZ2V0TW9kaWZpZWRGaWVsZHModGhpcyxyZWYpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==