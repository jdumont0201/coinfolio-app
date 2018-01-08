"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    return HeaderService;
}());
exports.HeaderService = HeaderService;
//# sourceMappingURL=header.service.js.map