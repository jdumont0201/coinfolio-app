"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@ngx-translate/core");
var LocationPipe = (function () {
    function LocationPipe(translateService) {
        this.translateService = translateService;
    }
    LocationPipe.prototype.transform = function (p, args) {
        // console.log("trans", value,this.translateService.currentLanguageLoaded);
        if (!p)
            return null;
        var c = p.country;
        if (p.isinternational) {
            var rem = void 0;
            rem = "country.internationalremotejob";
            //      if (this.translateService.currentLanguageLoaded)
            rem = this.translateService.get("country.internationalremotejob");
            return rem;
        }
        var country;
        if (!c)
            country = "country.undefined";
        //if (this.translateService.currentLanguageLoaded)
        country = this.translateService.get("country." + c);
        //else
        //  country = c;
        if (p.isremote) {
            var rem = void 0;
            rem = "country.remotejob";
            //   if (this.translateService.currentLanguageLoaded)
            rem = this.translateService.get("country.remotejob");
            return rem + ", " + country;
        }
        else {
            return [p.city, p.region, country].join(", ");
        }
    };
    return LocationPipe;
}());
LocationPipe = __decorate([
    core_1.Injectable(),
    core_1.Pipe({
        name: 'location',
        pure: false
    }),
    __param(0, core_1.Inject(core_2.TranslateService)),
    __metadata("design:paramtypes", [core_2.TranslateService])
], LocationPipe);
exports.LocationPipe = LocationPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvY2F0aW9uLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBaUc7QUFFakcsNENBQXFEO0FBTXJELElBQWEsWUFBWTtJQUlyQixzQkFBdUMsZ0JBQWtDO1FBQ3JFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztJQUM3QyxDQUFDO0lBQ0QsZ0NBQVMsR0FBVCxVQUFVLENBQU0sRUFBRSxJQUFjO1FBQzVCLDJFQUEyRTtRQUMzRSxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUdsQixFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUEsQ0FBQztZQUNsQixJQUFJLEdBQUcsU0FBQSxDQUFDO1lBQ1IsR0FBRyxHQUFHLGdDQUFnQyxDQUFDO1lBQzdDLHdEQUF3RDtZQUM5QyxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDbkIsQ0FBQztRQUVELElBQUksT0FBTyxDQUFDO1FBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDbEMsa0RBQWtEO1FBQzlDLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4RCxNQUFNO1FBQ0osZ0JBQWdCO1FBR2xCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxHQUFHLFNBQUEsQ0FBQztZQUNSLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQztZQUM3QixxREFBcUQ7WUFDOUMsR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNyRCxNQUFNLENBQUMsR0FBRyxHQUFDLElBQUksR0FBQyxPQUFPLENBQUM7UUFDaEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxDQUFDO0lBRUwsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQXpDRCxJQXlDQztBQXpDWSxZQUFZO0lBTHhCLGlCQUFVLEVBQUU7SUFDWixXQUFJLENBQUM7UUFDRixJQUFJLEVBQUUsVUFBVTtRQUNoQixJQUFJLEVBQUUsS0FBSztLQUNkLENBQUM7SUFLZ0IsV0FBQSxhQUFNLENBQUMsdUJBQWdCLENBQUMsQ0FBQTtxQ0FBbUIsdUJBQWdCO0dBSmhFLFlBQVksQ0F5Q3hCO0FBekNZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7SW5qZWN0LCBJbnB1dCwgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIFBpcGUsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbkBJbmplY3RhYmxlKClcclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ2xvY2F0aW9uJyxcclxuICAgIHB1cmU6IGZhbHNlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2NhdGlvblBpcGUge1xyXG5cclxuICAgIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIEBJbmplY3QoVHJhbnNsYXRlU2VydmljZSkgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMudHJhbnNsYXRlU2VydmljZSA9IHRyYW5zbGF0ZVNlcnZpY2U7XHJcbiAgICB9XHJcbiAgICB0cmFuc2Zvcm0ocDogYW55LCBhcmdzOiBzdHJpbmdbXSk6IGFueSB7IC8vaW1wcm92ZSA6IHNldCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB0byB1cGRhdGUgb25seSBvbmNlXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0cmFuc1wiLCB2YWx1ZSx0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuY3VycmVudExhbmd1YWdlTG9hZGVkKTtcclxuICAgICAgICBpZighcCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgbGV0IGMgPSBwLmNvdW50cnk7XHJcblxyXG5cclxuICAgICAgICBpZihwLmlzaW50ZXJuYXRpb25hbCl7XHJcbiAgICAgICAgICAgIGxldCByZW07XHJcbiAgICAgICAgICAgIHJlbSA9IFwiY291bnRyeS5pbnRlcm5hdGlvbmFscmVtb3Rlam9iXCI7XHJcbiAgICAgIC8vICAgICAgaWYgKHRoaXMudHJhbnNsYXRlU2VydmljZS5jdXJyZW50TGFuZ3VhZ2VMb2FkZWQpXHJcbiAgICAgICAgICAgICAgICByZW0gPSB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KFwiY291bnRyeS5pbnRlcm5hdGlvbmFscmVtb3Rlam9iXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb3VudHJ5O1xyXG4gICAgICAgIGlmICghYylcclxuICAgICAgICAgICAgY291bnRyeSA9IFwiY291bnRyeS51bmRlZmluZWRcIjtcclxuICAgICAgICAvL2lmICh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuY3VycmVudExhbmd1YWdlTG9hZGVkKVxyXG4gICAgICAgICAgICBjb3VudHJ5ID0gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldChcImNvdW50cnkuXCIgKyBjKTtcclxuICAgICAgICAvL2Vsc2VcclxuICAgICAgICAgIC8vICBjb3VudHJ5ID0gYztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGlmIChwLmlzcmVtb3RlKSB7XHJcbiAgICAgICAgICAgIGxldCByZW07XHJcbiAgICAgICAgICAgIHJlbSA9IFwiY291bnRyeS5yZW1vdGVqb2JcIjtcclxuICAgICAgICAgLy8gICBpZiAodGhpcy50cmFuc2xhdGVTZXJ2aWNlLmN1cnJlbnRMYW5ndWFnZUxvYWRlZClcclxuICAgICAgICAgICAgICAgIHJlbSA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoXCJjb3VudHJ5LnJlbW90ZWpvYlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZW0rXCIsIFwiK2NvdW50cnk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtwLmNpdHksIHAucmVnaW9uLCBjb3VudHJ5XS5qb2luKFwiLCBcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iXX0=