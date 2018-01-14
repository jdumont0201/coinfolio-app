"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageWithTabs = (function () {
    function PageWithTabs() {
        this.tabIndex = 0;
    }
    PageWithTabs.prototype.tabChanged = function (event) {
        this.tabIndex = event.index;
        console.log("tabchanged", this.tabIndex);
    };
    PageWithTabs.prototype.ngOnInit = function () {
    };
    return PageWithTabs;
}());
exports.PageWithTabs = PageWithTabs;
