"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var OptionsBarItem = (function () {
    function OptionsBarItem(text, icon, link, popup) {
        this.text = text;
        this.icon = icon;
        this.link = link;
        this.popup = popup;
        this.icon = "icon-" + icon;
    }
    return OptionsBarItem;
}());
exports.OptionsBarItem = OptionsBarItem;
var OptionsBarConfig = (function () {
    function OptionsBarConfig(options) {
        this.options = options;
    }
    return OptionsBarConfig;
}());
exports.OptionsBarConfig = OptionsBarConfig;
var OptionsBarService = (function () {
    function OptionsBarService() {
        this.optionsChanged = new core_1.EventEmitter();
    }
    OptionsBarService.prototype.setByPagename = function (pagename) {
    };
    OptionsBarService.prototype.setOptions = function (o) {
        console.log(" > HeaderService setheaders");
        this.options = o;
        this.optionsChanged.emit(o);
    };
    OptionsBarService.prototype.ngOnDestroy = function () {
        console.log("dest");
    };
    return OptionsBarService;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], OptionsBarService.prototype, "optionsChanged", void 0);
OptionsBarService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], OptionsBarService);
exports.OptionsBarService = OptionsBarService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uc2Jhci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib3B0aW9uc2Jhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBRzdEO0lBRUksd0JBQW1CLElBQWEsRUFBUSxJQUFXLEVBQVEsSUFBVyxFQUFRLEtBQWE7UUFBeEUsU0FBSSxHQUFKLElBQUksQ0FBUztRQUFRLFNBQUksR0FBSixJQUFJLENBQU87UUFBUSxTQUFJLEdBQUosSUFBSSxDQUFPO1FBQVEsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUN2RixJQUFJLENBQUMsSUFBSSxHQUFDLE9BQU8sR0FBQyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFMWSx3Q0FBYztBQU0zQjtJQUVJLDBCQUFtQixPQUF3QjtRQUF4QixZQUFPLEdBQVAsT0FBTyxDQUFpQjtJQUUzQyxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxZLDRDQUFnQjtBQVE3QixJQUFhLGlCQUFpQjtJQUsxQjtRQUpVLG1CQUFjLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO0lBTWpFLENBQUM7SUFDRCx5Q0FBYSxHQUFiLFVBQWMsUUFBZTtJQUU3QixDQUFDO0lBQ0Qsc0NBQVUsR0FBVixVQUFXLENBQWtCO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCx1Q0FBVyxHQUFYO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBbEJhO0lBQVQsYUFBTSxFQUFFOzhCQUFpQixtQkFBWTt5REFBMkI7QUFEeEQsaUJBQWlCO0lBRDdCLGlCQUFVLEVBQUU7O0dBQ0EsaUJBQWlCLENBbUI3QjtBQW5CWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsT3V0cHV0LEV2ZW50RW1pdHRlcn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgT3B0aW9uc0Jhckl0ZW17XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRleHQgOiBzdHJpbmcscHVibGljIGljb246c3RyaW5nLHB1YmxpYyBsaW5rOnN0cmluZyxwdWJsaWMgcG9wdXA/Om51bWJlcil7XHJcbiAgICAgICAgdGhpcy5pY29uPVwiaWNvbi1cIitpY29uO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zQmFyQ29uZmlne1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOk9wdGlvbnNCYXJJdGVtW10pe1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgT3B0aW9uc0JhclNlcnZpY2Uge1xyXG4gICAgQE91dHB1dCgpIG9wdGlvbnNDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBvcHRpb25zOk9wdGlvbnNCYXJDb25maWc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgc2V0QnlQYWdlbmFtZShwYWdlbmFtZTpzdHJpbmcpOnZvaWR7XHJcblxyXG4gICAgfVxyXG4gICAgc2V0T3B0aW9ucyhvOk9wdGlvbnNCYXJDb25maWcpOnZvaWR7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIgPiBIZWFkZXJTZXJ2aWNlIHNldGhlYWRlcnNcIik7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPW87XHJcbiAgICAgICAgdGhpcy5vcHRpb25zQ2hhbmdlZC5lbWl0KG8pO1xyXG4gICAgfVxyXG4gICAgbmdPbkRlc3Ryb3koKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImRlc3RcIilcclxuICAgIH1cclxufSJdfQ==