"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var console_service_1 = require("./console.service");
var config_service_1 = require("./config.service");
//import {TranslateService} from './translate.service';
var HeaderInterface = (function () {
    function HeaderInterface() {
    }
    return HeaderInterface;
}());
exports.HeaderInterface = HeaderInterface;
var HeaderDefaultInterface = (function (_super) {
    __extends(HeaderDefaultInterface, _super);
    function HeaderDefaultInterface(classname) {
        var _this = _super.call(this) || this;
        _this.classname = classname;
        return _this;
    }
    return HeaderDefaultInterface;
}(HeaderInterface));
exports.HeaderDefaultInterface = HeaderDefaultInterface;
var HeaderCustomInterface = (function (_super) {
    __extends(HeaderCustomInterface, _super);
    function HeaderCustomInterface(h1) {
        var _this = _super.call(this) || this;
        _this.h1 = h1;
        return _this;
    }
    return HeaderCustomInterface;
}(HeaderInterface));
exports.HeaderCustomInterface = HeaderCustomInterface;
var Header = (function () {
    function Header(h) {
        console.log("+ Header", h);
        if (h.classname)
            this.setDefault(h.classname.toLowerCase());
        else
            this.set(h.h1, h.sub);
    }
    Header.prototype.setDefault = function (classname) {
        this.h1 = classname + ".title",
            this.sub = classname + ".sub";
    };
    Header.prototype.set = function (h1, sub) {
        this.h1 = h1;
        this.sub = sub;
    };
    return Header;
}());
exports.Header = Header;
var HeaderService = (function () {
    function HeaderService(titleService, 
        //        private translateService:TranslateService,
        configService, consoleService) {
        this.titleService = titleService;
        this.configService = configService;
        this.consoleService = consoleService;
        this.headerChanged = new core_1.EventEmitter();
        this.suffix = "- Hireton";
        this.consoleService.serv("+ HeaderService");
        //translateService.languageLoaded.subscribe(   value =>this.updateHeaderAfterTranslationLoad(value),   error => console.log("Error updating header"+error),   () => console.log('done') );
    }
    HeaderService.prototype.setPageTitle = function (value) {
        console.log("setpagetitle");
        //  this.title=this.translateService.t(value);
        //   this.titlesuffix=this.translateService.t("titlesuffix");
        this.titleService.setTitle(this.title + this.titlesuffix);
        console.log("done");
    };
    HeaderService.prototype.updateHeaderAfterTranslationLoad = function (value) {
        this.setPageTitle(this.title);
    };
    HeaderService.prototype.preciseTopHeader = function (h1, sub) {
        console.log(" > HeaderService preciseTopHeader", h1);
        this.h1 = h1;
        var s = sub ? sub : this.h1sub;
        this.setPageTitle(h1);
        this.headerChanged.emit({ h1: h1, h1sub: s });
    };
    HeaderService.prototype.replaceHeaderParts = function (opt) {
        console.log(" > HeaderService replaceHeaderParts", opt, this.h1, this.h1.replace("#v1", "kkk"));
        for (var key in opt)
            this.h1 = this.h1.replace("#" + key, opt[key]);
        this.headerChanged.emit({ h1: this.h1, h1sub: this.h1sub });
    };
    HeaderService.prototype.setHeader = function (h) {
        console.log(" > HeaderService setheaders", h);
        this.h = h;
        this.h1 = h.h1;
        this.h1sub = h.sub;
        this.setPageTitle(this.h1);
        this.headerChanged.emit({ h1: h.h1, h1sub: h.sub });
    };
    HeaderService.prototype.ngOnDestroy = function () {
        console.log("dest");
    };
    return HeaderService;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], HeaderService.prototype, "headerChanged", void 0);
HeaderService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [platform_browser_1.Title,
        config_service_1.ConfigService,
        console_service_1.ConsoleService])
], HeaderService);
exports.HeaderService = HeaderService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoZWFkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw4REFBZ0Q7QUFDaEQscURBQWlEO0FBQ2pELG1EQUErQztBQUMvQyx1REFBdUQ7QUFFdkQ7SUFBQTtJQUlBLENBQUM7SUFBRCxzQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSlksMENBQWU7QUFLNUI7SUFBNEMsMENBQWU7SUFDdkQsZ0NBQVksU0FBZ0I7UUFBNUIsWUFDSSxpQkFBTyxTQUVWO1FBREcsS0FBSSxDQUFDLFNBQVMsR0FBQyxTQUFTLENBQUM7O0lBQzdCLENBQUM7SUFDTCw2QkFBQztBQUFELENBQUMsQUFMRCxDQUE0QyxlQUFlLEdBSzFEO0FBTFksd0RBQXNCO0FBTW5DO0lBQTJDLHlDQUFlO0lBR3RELCtCQUFZLEVBQVM7UUFBckIsWUFDSSxpQkFBTyxTQUVWO1FBREcsS0FBSSxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUM7O0lBQ2YsQ0FBQztJQUVMLDRCQUFDO0FBQUQsQ0FBQyxBQVJELENBQTJDLGVBQWUsR0FRekQ7QUFSWSxzREFBcUI7QUFTbEM7SUFPSSxnQkFBWSxDQUFpQjtRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSTtZQUNBLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQVZELDJCQUFVLEdBQVYsVUFBVyxTQUFnQjtRQUN2QixJQUFJLENBQUMsRUFBRSxHQUFDLFNBQVMsR0FBQyxRQUFRO1lB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LElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBeERELElBd0RDO0FBdkRhO0lBQVQsYUFBTSxFQUFFOzhCQUFnQixtQkFBWTtvREFBMkI7QUFEdkQsYUFBYTtJQUR6QixpQkFBVSxFQUFFO3FDQWF3Qix3QkFBSztRQUVaLDhCQUFhO1FBQ1osZ0NBQWM7R0FmaEMsYUFBYSxDQXdEekI7QUF4RFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsT3V0cHV0LEV2ZW50RW1pdHRlcn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtUaXRsZX0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcclxuaW1wb3J0IHtDb25zb2xlU2VydmljZX0gZnJvbSAnLi9jb25zb2xlLnNlcnZpY2UnO1xyXG5pbXBvcnQge0NvbmZpZ1NlcnZpY2V9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG4vL2ltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnLi90cmFuc2xhdGUuc2VydmljZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgSGVhZGVySW50ZXJmYWNle1xyXG4gICAgY2xhc3NuYW1lOnN0cmluZztcclxuICAgIGgxOnN0cmluZztcclxuICAgIHN1YjpzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGNsYXNzIEhlYWRlckRlZmF1bHRJbnRlcmZhY2UgZXh0ZW5kcyBIZWFkZXJJbnRlcmZhY2V7XHJcbiAgICBjb25zdHJ1Y3RvcihjbGFzc25hbWU6c3RyaW5nKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuY2xhc3NuYW1lPWNsYXNzbmFtZTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgSGVhZGVyQ3VzdG9tSW50ZXJmYWNlIGV4dGVuZHMgSGVhZGVySW50ZXJmYWNle1xyXG4gICAgaDE6c3RyaW5nO1xyXG4gICAgc3ViOnN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGgxOnN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmgxPWgxO1xyXG4gICAgfVxyXG5cclxufVxyXG5leHBvcnQgY2xhc3MgSGVhZGVye1xyXG4gICAgaDE6c3RyaW5nO1xyXG4gICAgc3ViOnN0cmluZztcclxuICAgIHNldERlZmF1bHQoY2xhc3NuYW1lOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5oMT1jbGFzc25hbWUrXCIudGl0bGVcIixcclxuICAgICAgICB0aGlzLnN1Yj1jbGFzc25hbWUrXCIuc3ViXCI7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihoOkhlYWRlckludGVyZmFjZSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIrIEhlYWRlclwiLGgpO1xyXG4gICAgICAgIGlmKGguY2xhc3NuYW1lKVxyXG4gICAgICAgICAgICB0aGlzLnNldERlZmF1bHQoaC5jbGFzc25hbWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnNldChoLmgxLGguc3ViKTtcclxuICAgIH1cclxuICAgIHNldChoMTpzdHJpbmcsc3ViOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5oMT1oMTtcclxuICAgICAgICB0aGlzLnN1Yj1zdWI7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEhlYWRlclNlcnZpY2Uge1xyXG4gICAgQE91dHB1dCgpIGhlYWRlckNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIGgxOnN0cmluZztcclxuICAgIGgxc3ViOnN0cmluZztcclxuICAgIHRpdGxlOnN0cmluZztcclxuXHJcbiAgICB0aXRsZXN1ZmZpeDpzdHJpbmc7XHJcblxyXG4gICAgaDpIZWFkZXI7XHJcbiAgICBcclxuICAgIHN1ZmZpeDpzdHJpbmc9XCItIEhpcmV0b25cIjtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdGl0bGVTZXJ2aWNlOlRpdGxlLFxyXG4vLyAgICAgICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOlRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOkNvbmZpZ1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25zb2xlU2VydmljZTpDb25zb2xlU2VydmljZSkge1xyXG5cclxuICAgICAgICB0aGlzLmNvbnNvbGVTZXJ2aWNlLnNlcnYoXCIrIEhlYWRlclNlcnZpY2VcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90cmFuc2xhdGVTZXJ2aWNlLmxhbmd1YWdlTG9hZGVkLnN1YnNjcmliZSggwqAgdmFsdWUgPT50aGlzLnVwZGF0ZUhlYWRlckFmdGVyVHJhbnNsYXRpb25Mb2FkKHZhbHVlKSwgwqAgZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvciB1cGRhdGluZyBoZWFkZXJcIitlcnJvciksIMKgICgpID0+IGNvbnNvbGUubG9nKCdkb25lJykgKTtcclxuICAgIH1cclxuICAgIHNldFBhZ2VUaXRsZSh2YWx1ZTpzdHJpbmcpOnZvaWR7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZXRwYWdldGl0bGVcIik7XHJcbiAgICAgIC8vICB0aGlzLnRpdGxlPXRoaXMudHJhbnNsYXRlU2VydmljZS50KHZhbHVlKTtcclxuICAgICAvLyAgIHRoaXMudGl0bGVzdWZmaXg9dGhpcy50cmFuc2xhdGVTZXJ2aWNlLnQoXCJ0aXRsZXN1ZmZpeFwiKTtcclxuICAgICAgICB0aGlzLnRpdGxlU2VydmljZS5zZXRUaXRsZSh0aGlzLnRpdGxlK3RoaXMudGl0bGVzdWZmaXgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZG9uZVwiKVxyXG4gICAgfVxyXG4gICAgIHVwZGF0ZUhlYWRlckFmdGVyVHJhbnNsYXRpb25Mb2FkKHZhbHVlOmFueSl7XHJcbiAgICAgICAgIHRoaXMuc2V0UGFnZVRpdGxlKHRoaXMudGl0bGUpO1xyXG4gICAgIH1cclxuICAgIHByZWNpc2VUb3BIZWFkZXIoaDE6c3RyaW5nLHN1Yj86c3RyaW5nKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIiA+IEhlYWRlclNlcnZpY2UgcHJlY2lzZVRvcEhlYWRlclwiLGgxKTtcclxuICAgICAgICB0aGlzLmgxPWgxO1xyXG4gICAgICAgIGxldCBzPXN1Yj9zdWI6dGhpcy5oMXN1YlxyXG4gICAgICAgIHRoaXMuc2V0UGFnZVRpdGxlKGgxKTtcclxuICAgICAgICB0aGlzLmhlYWRlckNoYW5nZWQuZW1pdCh7aDE6aDEsaDFzdWI6c30pO1xyXG4gICAgfVxyXG4gICAgcmVwbGFjZUhlYWRlclBhcnRzKG9wdDphbnkpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiID4gSGVhZGVyU2VydmljZSByZXBsYWNlSGVhZGVyUGFydHNcIixvcHQsIHRoaXMuaDEsIHRoaXMuaDEucmVwbGFjZShcIiN2MVwiLFwia2trXCIpKTtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiBvcHQpXHJcbiAgICAgICAgICAgIHRoaXMuaDE9dGhpcy5oMS5yZXBsYWNlKFwiI1wiK2tleSxvcHRba2V5XSk7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJDaGFuZ2VkLmVtaXQoe2gxOnRoaXMuaDEsaDFzdWI6dGhpcy5oMXN1Yn0pO1xyXG4gICAgfVxyXG4gICAgc2V0SGVhZGVyKGg6SGVhZGVyKTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiID4gSGVhZGVyU2VydmljZSBzZXRoZWFkZXJzXCIsaCk7XHJcbiAgICAgICAgdGhpcy5oPWg7XHJcbiAgICAgICAgdGhpcy5oMT1oLmgxO1xyXG4gICAgICAgIHRoaXMuaDFzdWI9aC5zdWI7XHJcbiAgICAgICAgdGhpcy5zZXRQYWdlVGl0bGUodGhpcy5oMSk7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJDaGFuZ2VkLmVtaXQoe2gxOmguaDEsaDFzdWI6aC5zdWJ9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbmdPbkRlc3Ryb3koKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImRlc3RcIilcclxuICAgIH1cclxufVxyXG4iXX0=