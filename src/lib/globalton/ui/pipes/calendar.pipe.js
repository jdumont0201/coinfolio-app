"use strict";
/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("../utils/utils");
//import {TranslateService} from "../services/translate.service"
var core_2 = require("@ngx-translate/core");
var CalendarPipe = (function () {
    function CalendarPipe(translateService) {
        this.translateService = translateService;
    }
    CalendarPipe.prototype.transform = function (value, args) {
        console.log("tr", value);
        var n = utils_1.daysUpToNow(value);
        var da;
        if (n == 0)
            da = this.translateService.get("date.today");
        else if (n == 1)
            da = this.translateService.get("date.yesterday");
        else
            da = n + " " + this.translateService.get("date.daysago");
        var at = this.translateService.get("date.at");
        var m = value.getMinutes();
        var h = value.getHours();
        var dd = (h < 10 ? ("0" + h) : h) + ":" + (m < 10 ? ("0" + m) : m);
        return da + " " + at + " " + dd;
    };
    return CalendarPipe;
}());
CalendarPipe = __decorate([
    core_1.Pipe({ name: 'calendar', pure: true }),
    __metadata("design:paramtypes", [core_2.TranslateService])
], CalendarPipe);
exports.CalendarPipe = CalendarPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhbGVuZGFyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZEQUE2RDs7QUFFN0Qsc0NBQThGO0FBQzlGLHdDQUEyQztBQUMzQyxnRUFBZ0U7QUFDaEUsNENBQXFEO0FBRXJELElBQWEsWUFBWTtJQUVyQixzQkFBb0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFFdEQsQ0FBQztJQUdELGdDQUFTLEdBQVQsVUFBVSxLQUFXLEVBQUUsSUFBWTtRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsR0FBRyxtQkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNCLElBQUksRUFBRSxDQUFDO1FBQ1AsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNQLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1osRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRCxJQUFJO1lBQ0EsRUFBRSxHQUFHLENBQUMsR0FBRSxHQUFHLEdBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzRCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxHQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUUsRUFBRSxHQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLEVBQUUsR0FBQyxHQUFHLEdBQUMsRUFBRSxHQUFDLEdBQUcsR0FBQyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUlMLG1CQUFDO0FBQUQsQ0FBQyxBQTNCRCxJQTJCQztBQTNCWSxZQUFZO0lBRHhCLFdBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO3FDQUdHLHVCQUFnQjtHQUY3QyxZQUFZLENBMkJ4QjtBQTNCWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGFuZ3VsYXIyLW1vbWVudCAoYykgMjAxNSwgMjAxNiBVcmkgU2hha2VkIC8gTUlUIExpY2VuY2UgKi9cclxuXHJcbmltcG9ydCB7UGlwZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFBpcGVUcmFuc2Zvcm0sIEV2ZW50RW1pdHRlciwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtkYXlzVXBUb05vd30gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XHJcbi8vaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvdHJhbnNsYXRlLnNlcnZpY2VcIlxyXG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5AUGlwZSh7IG5hbWU6ICdjYWxlbmRhcicsIHB1cmU6IHRydWUgfSlcclxuZXhwb3J0IGNsYXNzIENhbGVuZGFyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBEYXRlLCBhcmdzPzogYW55W10pOiBhbnkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidHJcIix2YWx1ZSk7XHJcbiAgICAgICAgbGV0IG4gPSBkYXlzVXBUb05vdyh2YWx1ZSk7XHJcblxyXG4gICAgICAgIGxldCBkYTtcclxuICAgICAgICBpZiAobiA9PSAwKVxyXG4gICAgICAgICAgICBkYSA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoXCJkYXRlLnRvZGF5XCIpO1xyXG4gICAgICAgIGVsc2UgaWYgKG4gPT0gMSlcclxuICAgICAgICAgICAgZGEgPSB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KFwiZGF0ZS55ZXN0ZXJkYXlcIik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBkYSA9IG4gK1wiIFwiKyB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KFwiZGF0ZS5kYXlzYWdvXCIpO1xyXG4gICAgICAgIGxldCBhdCA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoXCJkYXRlLmF0XCIpO1xyXG4gICAgICAgIGxldCBtPXZhbHVlLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICBsZXQgaD12YWx1ZS5nZXRIb3VycygpO1xyXG4gICAgICAgIGxldCBkZCA9IChoIDwxMD8oXCIwXCIraCk6aCkrIFwiOlwiICsgKG0gPCAxMD8oXCIwXCIrbSk6bSk7XHJcbiAgICAgICAgcmV0dXJuIGRhK1wiIFwiK2F0K1wiIFwiK2RkO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59Il19