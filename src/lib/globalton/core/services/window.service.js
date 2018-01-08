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
Object.defineProperty(exports, "__esModule", { value: true });
//import {window} from '@angular/platform-browser/src/facade/browser';
//import {unimplemented} from '@angular/core/src/facade/exceptions';
function _window() {
    return window;
}
var WINDOW = (function () {
    function WINDOW() {
    }
    Object.defineProperty(WINDOW.prototype, "nativeWindow", {
        get: function () {
            return null; //unimplemented();
        },
        enumerable: true,
        configurable: true
    });
    return WINDOW;
}());
exports.WINDOW = WINDOW;
var WindowService = (function (_super) {
    __extends(WindowService, _super);
    function WindowService() {
        return _super.call(this) || this;
    }
    Object.defineProperty(WindowService.prototype, "nativeWindow", {
        get: function () {
            return _window();
        },
        enumerable: true,
        configurable: true
    });
    WindowService.prototype.scrollToTop = function () {
        console.log("scroll");
        this.nativeWindow.scrollTo(0, 0);
    };
    return WindowService;
}(WINDOW));
exports.WindowService = WindowService;
//# sourceMappingURL=window.service.js.map