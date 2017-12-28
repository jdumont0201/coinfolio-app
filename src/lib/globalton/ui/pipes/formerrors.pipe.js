"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@ngx-translate/core");
var FormErrorsPipe = (function () {
    function FormErrorsPipe(translateService) {
        this.translateService = translateService;
    }
    FormErrorsPipe.prototype.transform = function (resul, args) {
        console.log("formerrorsd", resul);
        if (!resul)
            return "";
        var res = "";
        //return this.translateService.get(value).subscribe((resul) => {
        console.log("resul=", resul);
        if (typeof resul === "string")
            return resul;
        else {
            for (var i in resul) {
                console.log("add", resul[i]);
                res += resul[i] + ". ";
            }
            res = res.substring(0, res.length - 2);
            console.log("res=", res);
            return res;
        }
        //});
    };
    return FormErrorsPipe;
}());
FormErrorsPipe = __decorate([
    core_1.Injectable(),
    core_1.Pipe({
        name: 'formerrors',
        pure: true
    }),
    __param(0, core_1.Inject(core_2.TranslateService)),
    __metadata("design:paramtypes", [core_2.TranslateService])
], FormErrorsPipe);
exports.FormErrorsPipe = FormErrorsPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWVycm9ycy5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9ybWVycm9ycy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdFO0FBRXhFLDRDQUFxRDtBQU9yRCxJQUFhLGNBQWM7SUFJdkIsd0JBQXNDLGdCQUFrQztRQUNwRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7SUFDN0MsQ0FBQztJQUVELGtDQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUUsSUFBYztRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNQLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDZCxJQUFJLEdBQUcsR0FBVyxFQUFFLENBQUM7UUFDckIsZ0VBQWdFO1FBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztZQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxDQUFDO1lBQ0YsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzNCLENBQUM7WUFDRCxHQUFHLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUVMLEtBQUs7SUFFVCxDQUFDO0lBRUwscUJBQUM7QUFBRCxDQUFDLEFBL0JELElBK0JDO0FBL0JZLGNBQWM7SUFOMUIsaUJBQVUsRUFBRTtJQUNaLFdBQUksQ0FBQztRQUNGLElBQUksRUFBRSxZQUFZO1FBRWxCLElBQUksRUFBRSxJQUFJO0tBQ2IsQ0FBQztJQUtlLFdBQUEsYUFBTSxDQUFDLHVCQUFnQixDQUFDLENBQUE7cUNBQW1CLHVCQUFnQjtHQUovRCxjQUFjLENBK0IxQjtBQS9CWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbnB1dCwgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIFBpcGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuQEluamVjdGFibGUoKVxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnZm9ybWVycm9ycycsXHJcblxyXG4gICAgcHVyZTogdHJ1ZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUVycm9yc1BpcGUge1xyXG5cclxuICAgIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoQEluamVjdChUcmFuc2xhdGVTZXJ2aWNlKSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGVTZXJ2aWNlID0gdHJhbnNsYXRlU2VydmljZTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm0ocmVzdWw6IGFueSwgYXJnczogc3RyaW5nW10pOiBhbnkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZm9ybWVycm9yc2RcIiwgcmVzdWwpO1xyXG4gICAgICAgIGlmICghcmVzdWwpXHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIGxldCByZXM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgLy9yZXR1cm4gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldCh2YWx1ZSkuc3Vic2NyaWJlKChyZXN1bCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3VsPVwiLCByZXN1bCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWwgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWw7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiByZXN1bCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkXCIsIHJlc3VsW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICByZXMgKz0gcmVzdWxbaV0gKyBcIi4gXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXMgPSByZXMuc3Vic3RyaW5nKDAsIHJlcy5sZW5ndGggLSAyKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzPVwiLCByZXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAvL30pO1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIl19