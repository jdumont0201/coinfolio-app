"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aW5kb3cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNFQUFzRTtBQUN0RSxvRUFBb0U7QUFFcEU7SUFDRSxNQUFNLENBQUMsTUFBTSxDQUFBO0FBQ2YsQ0FBQztBQUVEO0lBQUE7SUFJQSxDQUFDO0lBSEMsc0JBQUksZ0NBQVk7YUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUEsa0JBQWtCO1FBQ2xDLENBQUM7OztPQUFBO0lBQ0gsYUFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSnFCLHdCQUFNO0FBTTVCO0lBQW1DLGlDQUFNO0lBQ3JDO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBQ0Qsc0JBQUksdUNBQVk7YUFBaEI7WUFDSSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFDRCxtQ0FBVyxHQUFYO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQVhELENBQW1DLE1BQU0sR0FXeEM7QUFYWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgUHJvdmlkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbi8vaW1wb3J0IHt3aW5kb3d9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2ZhY2FkZS9icm93c2VyJztcclxuLy9pbXBvcnQge3VuaW1wbGVtZW50ZWR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcclxuXHJcbmZ1bmN0aW9uIF93aW5kb3coKTogV2luZG93IHtcclxuICByZXR1cm4gd2luZG93XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXSU5ET1cge1xyXG4gIGdldCBuYXRpdmVXaW5kb3coKTogV2luZG93IHtcclxuICAgICAgcmV0dXJuIG51bGw7Ly91bmltcGxlbWVudGVkKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2luZG93U2VydmljZSBleHRlbmRzIFdJTkRPVyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgZ2V0IG5hdGl2ZVdpbmRvdygpOiBXaW5kb3cge1xyXG4gICAgICAgIHJldHVybiBfd2luZG93KCk7XHJcbiAgICB9XHJcbiAgICBzY3JvbGxUb1RvcCgpOnZvaWR7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzY3JvbGxcIik7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVXaW5kb3cuc2Nyb2xsVG8oMCwwKTtcclxuICAgIH1cclxufVxyXG5cclxuIl19