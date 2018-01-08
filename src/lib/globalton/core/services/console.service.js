"use strict";
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
var ConsoleService = (function () {
    function ConsoleService() {
        this.showConsole = true;
        this.serv("+ ConsoleService");
        /*  if(this.configService.env===ENVIRONMENTS.Prod)
              this.showConsole=false;
          else
              this.showConsole=true;
     */ var u = location.host;
        //        if (u.indexOf("app.") > -1 )
        //          this.showConsole=false;
    }
    ConsoleService.prototype.log = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[LOG]", 'padding:2px 5px;border-radius:3px;background: #fff000; color: #000;display:block');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.constr = function (s) {
        if (this.showConsole) {
            console.log("%c[CONSTR] " + s, 'padding:2px 5px;border-radius:3px;background: #ff0000; color: #000;display:block;');
        }
    };
    //auth(s:string) {
    //        console.log("%c[AUTH] "+s, 'padding:2px 5px;border-radius:3px;background: #FF69A9; color: #000;display:block;'    );
    //  }
    ConsoleService.prototype.cart = function (s) {
        if (this.showConsole) {
            console.log("%c[CART] " + s, 'padding:2px 5px;border-radius:3px;background: #3369A9; color: #000;display:block;');
        }
    };
    ConsoleService.prototype.auth = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[SERVI]", 'padding:2px 5px;border-radius:3px;background: #69D0FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.request = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[REQUEST]", 'padding:2px 5px;border-radius:3px;background: #999999; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.subs = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[SUBS]", 'padding:2px 5px;border-radius:3px;background: #999999; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.config = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[CONFIG]", 'padding:2px 5px;border-radius:3px;background: #999999; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.trade = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[TRADE]", 'padding:2px 5px;border-radius:3px;background: #0000FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.serv = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[SERVI]", 'padding:2px 5px;border-radius:3px;background: #69D0FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.translate = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[TRANSLATE]", 'padding:2px 5px;border-radius:3px;background: #444; color: #fff;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.library = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[LIBRARY]", 'padding:2px 5px;border-radius:3px;background: #FFAA00; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.load = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[LOAD]", 'padding:2px 5px;border-radius:3px;background: #FFF000; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.curr = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[CURRENCY]", 'padding:2px 5px;border-radius:3px;background: #FF00FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.canvas = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[CANVAS]", 'padding:2px 5px;border-radius:3px;background: #666666; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.post = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[POST]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.patch = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[PATCH]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.api = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[API]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.delete = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[DELETE]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.put = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[PUT]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.get = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[GET]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.ui = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[UI]", 'padding:2px 5px;border-radius:3px;background: #EEBBFF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.emit = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[EMIT]", 'padding:2px 5px;border-radius:3px;background: darkgreen; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ConsoleService);
    return ConsoleService;
}());
exports.ConsoleService = ConsoleService;
//# sourceMappingURL=console.service.js.map