"use strict";
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
    return ConsoleService;
}());
ConsoleService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ConsoleService);
exports.ConsoleService = ConsoleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uc29sZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBS3pDLElBQWEsY0FBYztJQUV2QjtRQURBLGdCQUFXLEdBQVMsSUFBSSxDQUFDO1FBSXJCLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoQzs7OztPQUlELENBQUcsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUM5QixzQ0FBc0M7UUFDcEMsbUNBQW1DO0lBRWpDLENBQUM7SUFDRCw0QkFBRyxHQUFIO1FBQUksYUFBWTthQUFaLFVBQVksRUFBWixxQkFBWSxFQUFaLElBQVk7WUFBWix3QkFBWTs7UUFDWixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQztZQUNqQixJQUFJLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDdEMsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGtGQUFrRixDQUFLLENBQUM7WUFDaEgsbUJBQW1CLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxDQUFDO0lBQ0wsQ0FBQztJQUNELCtCQUFNLEdBQU4sVUFBTyxDQUFRO1FBQ1gsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFLG1GQUFtRixDQUFDLENBQUM7UUFDeEgsQ0FBQztJQUNMLENBQUM7SUFDRCxrQkFBa0I7SUFDdEIsOEhBQThIO0lBQzFILEtBQUs7SUFDTCw2QkFBSSxHQUFKLFVBQUssQ0FBUTtRQUNU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QUUsSUFBSSxDQUFDLENBQUM7UUFDN0MsQ0FBQztJQUNMLENBQUM7SUFFTCxxQkFBQztBQUFELENBQUMsQUF4TEQsSUF3TEM7QUF4TFksY0FBYztJQUQxQixpQkFBVSxFQUFFOztHQUNBLGNBQWMsQ0F3TDFCO0FBeExZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuaW1wb3J0IHtDb25maWdTZXJ2aWNlLEVOVklST05NRU5UU30gZnJvbSBcIi4vY29uZmlnLnNlcnZpY2VcIlxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29uc29sZVNlcnZpY2Uge1xyXG4gICAgc2hvd0NvbnNvbGU6Ym9vbGVhbj10cnVlO1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAvLyAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6Q29uZmlnU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2KFwiKyBDb25zb2xlU2VydmljZVwiKTtcclxuICAgICAgLyogIGlmKHRoaXMuY29uZmlnU2VydmljZS5lbnY9PT1FTlZJUk9OTUVOVFMuUHJvZClcclxuICAgICAgICAgICAgdGhpcy5zaG93Q29uc29sZT1mYWxzZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0NvbnNvbGU9dHJ1ZTtcclxuICAgKi8gICBsZXQgdSA9IGxvY2F0aW9uLmhvc3Q7XHJcbi8vICAgICAgICBpZiAodS5pbmRleE9mKFwiYXBwLlwiKSA+IC0xIClcclxuICAvLyAgICAgICAgICB0aGlzLnNob3dDb25zb2xlPWZhbHNlO1xyXG5cclxuICAgIH1cclxuICAgIGxvZyguLi5hcmc6YW55W10pIHtcclxuICAgICAgICBpZih0aGlzLnNob3dDb25zb2xlKXtcclxuICAgICAgICAgICAgdmFyIHByZXNlcnZlZENvbnNvbGVMb2cgPSBjb25zb2xlLmxvZztcclxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICBhcmdzLnVuc2hpZnQoXCIlY1tMT0ddXCIsICdwYWRkaW5nOjJweCA1cHg7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZDogI2ZmZjAwMDsgY29sb3I6ICMwMDA7ZGlzcGxheTpibG9jaycgICAgKTtcclxuICAgICAgICAgICAgcHJlc2VydmVkQ29uc29sZUxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdHIoczpzdHJpbmcpIHtcclxuICAgICAgICBpZih0aGlzLnNob3dDb25zb2xlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWNbQ09OU1RSXSBcIiArIHMsICdwYWRkaW5nOjJweCA1cHg7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZDogI2ZmMDAwMDsgY29sb3I6ICMwMDA7ZGlzcGxheTpibG9jazsnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL2F1dGgoczpzdHJpbmcpIHtcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKFwiJWNbQVVUSF0gXCIrcywgJ3BhZGRpbmc6MnB4IDVweDtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kOiAjRkY2OUE5OyBjb2xvcjogIzAwMDtkaXNwbGF5OmJsb2NrOycgICAgKTtcclxuICAgIC8vICB9XHJcbiAgICBjYXJ0KHM6c3RyaW5nKSB7XHJcbiAgICAgICAgaWYodGhpcy5zaG93Q29uc29sZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjW0NBUlRdIFwiICsgcywgJ3BhZGRpbmc6MnB4IDVweDtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kOiAjMzM2OUE5OyBjb2xvcjogIzAwMDtkaXNwbGF5OmJsb2NrOycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGF1dGgoLi4uYXJnOmFueVtdKSB7XHJcbiAgICAgICAgaWYodGhpcy5zaG93Q29uc29sZSkge1xyXG4gICAgICAgICAgICB2YXIgcHJlc2VydmVkQ29uc29sZUxvZyA9IGNvbnNvbGUubG9nO1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIGFyZ3MudW5zaGlmdChcIiVjW1NFUlZJXVwiLCAncGFkZGluZzoycHggNXB4O2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQ6ICM2OUQwRkY7IGNvbG9yOiAjMDAwO2Rpc3BsYXk6YmxvY2s7Jyk7XHJcbiAgICAgICAgICAgIHByZXNlcnZlZENvbnNvbGVMb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHJlcXVlc3QoLi4uYXJnOmFueVtdKSB7XHJcbiAgICAgICAgaWYodGhpcy5zaG93Q29uc29sZSkge1xyXG4gICAgICAgICAgICB2YXIgcHJlc2VydmVkQ29uc29sZUxvZyA9IGNvbnNvbGUubG9nO1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIGFyZ3MudW5zaGlmdChcIiVjW1JFUVVFU1RdXCIsICdwYWRkaW5nOjJweCA1cHg7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZDogIzk5OTk5OTsgY29sb3I6ICMwMDA7ZGlzcGxheTpibG9jazsnKTtcclxuICAgICAgICAgICAgcHJlc2VydmVkQ29uc29sZUxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgc3VicyguLi5hcmc6YW55W10pIHtcclxuICAgICAgICBpZih0aGlzLnNob3dDb25zb2xlKSB7XHJcbiAgICAgICAgICAgIHZhciBwcmVzZXJ2ZWRDb25zb2xlTG9nID0gY29uc29sZS5sb2c7XHJcbiAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgYXJncy51bnNoaWZ0KFwiJWNbU1VCU11cIiwgJ3BhZGRpbmc6MnB4IDVweDtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kOiAjOTk5OTk5OyBjb2xvcjogIzAwMDtkaXNwbGF5OmJsb2NrOycpO1xyXG4gICAgICAgICAgICBwcmVzZXJ2ZWRDb25zb2xlTG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBjb25maWcoLi4uYXJnOmFueVtdKSB7XHJcbiAgICAgICAgaWYodGhpcy5zaG93Q29uc29sZSkge1xyXG4gICAgICAgICAgICB2YXIgcHJlc2VydmVkQ29uc29sZUxvZyA9IGNvbnNvbGUubG9nO1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIGFyZ3MudW5zaGlmdChcIiVjW0NPTkZJR11cIiwgJ3BhZGRpbmc6MnB4IDVweDtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kOiAjOTk5OTk5OyBjb2xvcjogIzAwMDtkaXNwbGF5OmJsb2NrOycpO1xyXG4gICAgICAgICAgICBwcmVzZXJ2ZWRDb25zb2xlTG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBzZXJ2KC4uLmFyZzphbnlbXSkge1xyXG4gICAgICAgIGlmKHRoaXMuc2hvd0NvbnNvbGUpIHtcclxuICAgICAgICAgICAgdmFyIHByZXNlcnZlZENvbnNvbGVMb2cgPSBjb25zb2xlLmxvZztcclxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICBhcmdzLnVuc2hpZnQoXCIlY1tTRVJWSV1cIiwgJ3BhZGRpbmc6MnB4IDVweDtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kOiAjNjlEMEZGOyBjb2xvcjogIzAwMDtkaXNwbGF5OmJsb2NrOycpO1xyXG4gICAgICAgICAgICBwcmVzZXJ2ZWRDb25zb2xlTG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICB0cmFuc2xhdGUoLi4uYXJnOmFueVtdKSB7XHJcbiAgICAgICAgaWYodGhpcy5zaG93Q29uc29sZSkge1xyXG4gICAgICAgICAgICB2YXIgcHJlc2VydmVkQ29uc29sZUxvZyA9IGNvbnNvbGUubG9nO1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIGFyZ3MudW5zaGlmdChcIiVjW1RSQU5TTEFURV1cIiwgJ3BhZGRpbmc6MnB4IDVweDtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kOiAjNDQ0OyBjb2xvcjogI2ZmZjtkaXNwbGF5OmJsb2NrOycpO1xyXG4gICAgICAgICAgICBwcmVzZXJ2ZWRDb25zb2xlTG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBsaWJyYXJ5KC4uLmFyZzphbnlbXSkge1xyXG4gICAgICAgIGlmKHRoaXMuc2hvd0NvbnNvbGUpe1xyXG4gICAgICAgICAgICB2YXIgcHJlc2VydmVkQ29uc29sZUxvZyA9IGNvbnNvbGUubG9nO1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIGFyZ3MudW5zaGlmdChcIiVjW0xJQlJBUlldXCIsICdwYWRkaW5nOjJweCA1cHg7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZDogI0ZGQUEwMDsgY29sb3I6ICMwMDA7ZGlzcGxheTpibG9jazsnICAgICk7XHJcbiAgICAgICAgICAgIHByZXNlcnZlZENvbnNvbGVMb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGxvYWQoLi4uYXJnOmFueVtdKSB7XHJcbiAgICAgICAgaWYodGhpcy5zaG93Q29uc29sZSkge1xyXG4gICAgICAgICAgICB2YXIgcHJlc2VydmVkQ29uc29sZUxvZyA9IGNvbnNvbGUubG9nO1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIGFyZ3MudW5zaGlmdChcIiVjW0xPQURdXCIsICdwYWRkaW5nOjJweCA1cHg7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZDogI0ZGRjAwMDsgY29sb3I6ICMwMDA7ZGlzcGxheTpibG9jazsnKTtcclxuICAgICAgICAgICAgcHJlc2VydmVkQ29uc29sZUxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgY3VyciguLi5hcmc6YW55W10pIHtcclxuICAgICAgICBpZih0aGlzLnNob3dDb25zb2xlKSB7XHJcbiAgICAgICAgICAgIHZhciBwcmVzZXJ2ZWRDb25zb2xlTG9nID0gY29uc29sZS5sb2c7XHJcbiAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgYXJncy51bnNoaWZ0KFwiJWNbQ1VSUkVOQ1ldXCIsICdwYWRkaW5nOjJweCA1cHg7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZDogI0ZGMDBGRjsgY29sb3I6ICMwMDA7ZGlzcGxheTpibG9jazsnKTtcclxuICAgICAgICAgICAgcHJlc2VydmVkQ29uc29sZUxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgY2FudmFzKC4uLmFyZzphbnlbXSkge1xyXG4gICAgICAgIGlmKHRoaXMuc2hvd0NvbnNvbGUpIHtcclxuICAgICAgICAgICAgdmFyIHByZXNlcnZlZENvbnNvbGVMb2cgPSBjb25zb2xlLmxvZztcclxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICBhcmdzLnVuc2hpZnQoXCIlY1tDQU5WQVNdXCIsICdwYWRkaW5nOjJweCA1cHg7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZDogIzY2NjY2NjsgY29sb3I6ICMwMDA7ZGlzcGxheTpibG9jazsnKTtcclxuICAgICAgICAgICAgcHJlc2VydmVkQ29uc29sZUxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcG9zdCguLi5hcmc6YW55W10pIHtcclxuICAgICAgICBpZih0aGlzLnNob3dDb25zb2xlKSB7XHJcbiAgICAgICAgICAgIHZhciBwcmVzZXJ2ZWRDb25zb2xlTG9nID0gY29uc29sZS5sb2c7XHJcbiAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgYXJncy51bnNoaWZ0KFwiJWNbUE9TVF1cIiwgJ3BhZGRpbmc6MnB4IDVweDtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kOiAjQ0Y2OUZGOyBjb2xvcjogIzAwMDtkaXNwbGF5OmJsb2NrOycpO1xyXG4gICAgICAgICAgICBwcmVzZXJ2ZWRDb25zb2xlTG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwYXRjaCguLi5hcmc6YW55W10pIHtcclxuICAgICAgICBpZih0aGlzLnNob3dDb25zb2xlKSB7XHJcbiAgICAgICAgICAgIHZhciBwcmVzZXJ2ZWRDb25zb2xlTG9nID0gY29uc29sZS5sb2c7XHJcbiAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgYXJncy51bnNoaWZ0KFwiJWNbUEFUQ0hdXCIsICdwYWRkaW5nOjJweCA1cHg7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZDogI0NGNjlGRjsgY29sb3I6ICMwMDA7ZGlzcGxheTpibG9jazsnKTtcclxuICAgICAgICAgICAgcHJlc2VydmVkQ29uc29sZUxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhcGkoLi4uYXJnOmFueVtdKSB7XHJcbiAgICAgICAgaWYodGhpcy5zaG93Q29uc29sZSkge1xyXG4gICAgICAgICAgICB2YXIgcHJlc2VydmVkQ29uc29sZUxvZyA9IGNvbnNvbGUubG9nO1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIGFyZ3MudW5zaGlmdChcIiVjW0FQSV1cIiwgJ3BhZGRpbmc6MnB4IDVweDtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kOiAjQ0Y2OUZGOyBjb2xvcjogIzAwMDtkaXNwbGF5OmJsb2NrOycpO1xyXG4gICAgICAgICAgICBwcmVzZXJ2ZWRDb25zb2xlTG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9IGRlbGV0ZSguLi5hcmc6YW55W10pIHtcclxuICAgIGlmKHRoaXMuc2hvd0NvbnNvbGUpIHtcclxuICAgICAgICB2YXIgcHJlc2VydmVkQ29uc29sZUxvZyA9IGNvbnNvbGUubG9nO1xyXG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgICBhcmdzLnVuc2hpZnQoXCIlY1tERUxFVEVdXCIsICdwYWRkaW5nOjJweCA1cHg7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZDogI0NGNjlGRjsgY29sb3I6ICMwMDA7ZGlzcGxheTpibG9jazsnKTtcclxuICAgICAgICBwcmVzZXJ2ZWRDb25zb2xlTG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxufSBwdXQoLi4uYXJnOmFueVtdKSB7XHJcbiAgICBpZih0aGlzLnNob3dDb25zb2xlKSB7XHJcbiAgICAgICAgdmFyIHByZXNlcnZlZENvbnNvbGVMb2cgPSBjb25zb2xlLmxvZztcclxuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgYXJncy51bnNoaWZ0KFwiJWNbUFVUXVwiLCAncGFkZGluZzoycHggNXB4O2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQ6ICNDRjY5RkY7IGNvbG9yOiAjMDAwO2Rpc3BsYXk6YmxvY2s7Jyk7XHJcbiAgICAgICAgcHJlc2VydmVkQ29uc29sZUxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcclxuICAgIH1cclxufVxyXG4gICAgZ2V0KC4uLmFyZzphbnlbXSkge1xyXG4gICAgICAgIGlmKHRoaXMuc2hvd0NvbnNvbGUpIHtcclxuICAgICAgICAgICAgdmFyIHByZXNlcnZlZENvbnNvbGVMb2cgPSBjb25zb2xlLmxvZztcclxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICBhcmdzLnVuc2hpZnQoXCIlY1tHRVRdXCIsICdwYWRkaW5nOjJweCA1cHg7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZDogI0NGNjlGRjsgY29sb3I6ICMwMDA7ZGlzcGxheTpibG9jazsnKTtcclxuICAgICAgICAgICAgcHJlc2VydmVkQ29uc29sZUxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbWl0KC4uLmFyZzphbnlbXSkge1xyXG4gICAgICAgIGlmKHRoaXMuc2hvd0NvbnNvbGUpIHtcclxuICAgICAgICAgICAgdmFyIHByZXNlcnZlZENvbnNvbGVMb2cgPSBjb25zb2xlLmxvZztcclxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICBhcmdzLnVuc2hpZnQoXCIlY1tFTUlUXVwiLCAncGFkZGluZzoycHggNXB4O2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQ6IGRhcmtncmVlbjsgY29sb3I6ICMwMDA7ZGlzcGxheTpibG9jazsnKTtcclxuICAgICAgICAgICAgcHJlc2VydmVkQ29uc29sZUxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59Il19