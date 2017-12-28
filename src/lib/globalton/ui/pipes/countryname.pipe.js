"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import {TranslateService} from '../services/translate.service';
var core_2 = require("@ngx-translate/core");
var CountryNamePipe = (function () {
    function CountryNamePipe(translateService) {
        this.translateService = translateService;
    }
    CountryNamePipe.prototype.transform = function (value, args) {
        if (!value)
            return "country.undefined";
        //  if (this.translateService.currentLanguageLoaded)
        return this.translateService.get("country." + value);
        // else
        //   return value;
    };
    return CountryNamePipe;
}());
CountryNamePipe = __decorate([
    core_1.Injectable(),
    core_1.Pipe({
        name: 'countryname',
        pure: false
    }),
    __param(0, core_1.Inject(core_2.TranslateService)),
    __metadata("design:paramtypes", [core_2.TranslateService])
], CountryNamePipe);
exports.CountryNamePipe = CountryNamePipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRyeW5hbWUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvdW50cnluYW1lLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBK0Y7QUFDL0YsaUVBQWlFO0FBRWpFLDRDQUFxRDtBQVFyRCxJQUFhLGVBQWU7SUFJeEIseUJBQXVDLGdCQUFrQztRQUNyRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7SUFDN0MsQ0FBQztJQUNELG1DQUFTLEdBQVQsVUFBVSxLQUFhLEVBQUUsSUFBYztRQUNuQyxFQUFFLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNOLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztRQUNqQyxvREFBb0Q7UUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hELE9BQU87UUFDTCxrQkFBa0I7SUFDdkIsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFmWSxlQUFlO0lBTjNCLGlCQUFVLEVBQUU7SUFDWixXQUFJLENBQUM7UUFDRixJQUFJLEVBQUUsYUFBYTtRQUVuQixJQUFJLEVBQUUsS0FBSztLQUNkLENBQUM7SUFLZ0IsV0FBQSxhQUFNLENBQUMsdUJBQWdCLENBQUMsQ0FBQTtxQ0FBbUIsdUJBQWdCO0dBSmhFLGVBQWUsQ0FlM0I7QUFmWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge0luamVjdCxJbnB1dCwgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIFBpcGUsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vL2ltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvdHJhbnNsYXRlLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHtIZWFkZXJzLCBIdHRwfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuQEluamVjdGFibGUoKVxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnY291bnRyeW5hbWUnLFxyXG5cclxuICAgIHB1cmU6IGZhbHNlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb3VudHJ5TmFtZVBpcGUge1xyXG5cclxuICAgIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIEBJbmplY3QoVHJhbnNsYXRlU2VydmljZSkgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMudHJhbnNsYXRlU2VydmljZSA9IHRyYW5zbGF0ZVNlcnZpY2U7XHJcbiAgICB9XHJcbiAgICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgYXJnczogc3RyaW5nW10pOiBhbnkgeyAvL2ltcHJvdmUgOiBzZXQgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgdG8gdXBkYXRlIG9ubHkgb25jZVxyXG4gICAgICAgIGlmKCF2YWx1ZSlcclxuICAgICAgICAgICAgcmV0dXJuIFwiY291bnRyeS51bmRlZmluZWRcIjtcclxuICAgICAgLy8gIGlmICh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuY3VycmVudExhbmd1YWdlTG9hZGVkKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldChcImNvdW50cnkuXCIrdmFsdWUpO1xyXG4gICAgICAgLy8gZWxzZVxyXG4gICAgICAgICAvLyAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufVxyXG4iXX0=