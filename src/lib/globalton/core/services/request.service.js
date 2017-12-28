"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var console_service_1 = require("./console.service");
var message_service_1 = require("./message.service");
var RequestService = (function () {
    function RequestService(http, consoleService, messageService) {
        this.http = http;
        this.consoleService = consoleService;
        this.messageService = messageService;
        consoleService.serv("+ RequestService");
    }
    RequestService.prototype.error = function (f, err, desc) {
        console.error('REQUEST ERR', err);
        this.messageService.addError("REQUEST_GET", err, desc);
        f({ error: true });
    };
    RequestService.prototype.success = function (f, data) {
        f({ error: false, file: data });
    };
    RequestService.prototype.getWithHeaders = function (url, headers, f) {
        var _this = this;
        console.log("RequestService get", url, headers);
        this.consoleService.get("RequestService Getting", url);
        this.http.get(url, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return _this.success(f, data); }, function (err) { return _this.error(f, err, "Error downloading " + url); }, 
        // err => this.error(err),
        function () { return console.log('Done getting.', url); });
    };
    RequestService.prototype.get = function (url, f, context) {
        this.getWithHeaders(url, new http_1.Headers(), f.bind(context));
    };
    RequestService.prototype.getJSON = function (url, f, context) {
        var h = new http_1.Headers();
        h.append("Content-Type", "application/json; charset=UTF-8");
        this.getWithHeaders(url, h, f.bind(context));
    };
    return RequestService;
}());
RequestService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        console_service_1.ConsoleService,
        message_service_1.MessageService])
], RequestService);
exports.RequestService = RequestService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVxdWVzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdEO0FBQ2hELHNDQUE0QztBQUM1QyxxREFBaUQ7QUFDakQscURBQWlEO0FBR2pELElBQWEsY0FBYztJQUd2Qix3QkFDWSxJQUFVLEVBQ1YsY0FBOEIsRUFDOUIsY0FBOEI7UUFGOUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDdEMsY0FBYyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRTVDLENBQUM7SUFDRCw4QkFBSyxHQUFMLFVBQU0sQ0FBQyxFQUFDLEdBQU8sRUFBQyxJQUFZO1FBQ3hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUNELGdDQUFPLEdBQVAsVUFBUSxDQUFDLEVBQUMsSUFBSTtRQUNWLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELHVDQUFjLEdBQWQsVUFBZSxHQUFXLEVBQUUsT0FBZ0IsRUFBRSxDQUFVO1FBQXhELGlCQVdDO1FBVkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ25DLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUM7YUFDdEIsU0FBUyxDQUNWLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQXBCLENBQW9CLEVBQzVCLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixHQUFDLEdBQUcsQ0FBQyxFQUExQyxDQUEwQztRQUNqRCwwQkFBMEI7UUFDMUIsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFDLEdBQUcsQ0FBQyxFQUFoQyxDQUFnQyxDQUNyQyxDQUFDO0lBQ1YsQ0FBQztJQUVELDRCQUFHLEdBQUgsVUFBSSxHQUFXLEVBQUUsQ0FBVSxFQUFDLE9BQVc7UUFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxjQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUNELGdDQUFPLEdBQVAsVUFBUSxHQUFXLEVBQUUsQ0FBVSxFQUFDLE9BQVc7UUFDdkMsSUFBSSxDQUFDLEdBQUMsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQXZDRCxJQXVDQztBQXZDWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7cUNBS1MsV0FBSTtRQUNNLGdDQUFjO1FBQ2QsZ0NBQWM7R0FOakMsY0FBYyxDQXVDMUI7QUF2Q1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIlxyXG5pbXBvcnQge0h0dHAsIEhlYWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQge0NvbnNvbGVTZXJ2aWNlfSBmcm9tICcuL2NvbnNvbGUuc2VydmljZSc7XHJcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gJy4vbWVzc2FnZS5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlcXVlc3RTZXJ2aWNlIHtcclxuXHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cCxcclxuICAgICAgICBwcml2YXRlIGNvbnNvbGVTZXJ2aWNlOiBDb25zb2xlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSkge1xyXG4gICAgICAgIGNvbnNvbGVTZXJ2aWNlLnNlcnYoXCIrIFJlcXVlc3RTZXJ2aWNlXCIpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgZXJyb3IoZixlcnI6YW55LGRlc2M/OnN0cmluZyk6dm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignUkVRVUVTVCBFUlInLCBlcnIpO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuYWRkRXJyb3IoXCJSRVFVRVNUX0dFVFwiLCBlcnIsZGVzYyk7XHJcbiAgICAgICAgZih7ZXJyb3I6dHJ1ZX0pO1xyXG4gICAgfVxyXG4gICAgc3VjY2VzcyhmLGRhdGEpe1xyXG4gICAgICAgIGYoe2Vycm9yOmZhbHNlLGZpbGU6ZGF0YX0pO1xyXG4gICAgfVxyXG4gICAgZ2V0V2l0aEhlYWRlcnModXJsOiBzdHJpbmcsIGhlYWRlcnM6IEhlYWRlcnMsIGY6RnVuY3Rpb24pOnZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVxdWVzdFNlcnZpY2UgZ2V0XCIsdXJsLCBoZWFkZXJzKTtcclxuICAgICAgICB0aGlzLmNvbnNvbGVTZXJ2aWNlLmdldChcIlJlcXVlc3RTZXJ2aWNlIEdldHRpbmdcIiwgdXJsKTtcclxuICAgICAgICB0aGlzLmh0dHAuZ2V0KHVybCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4gdGhpcy5zdWNjZXNzKGYsZGF0YSksXHJcbiAgICAgICAgICAgIGVyciA9PiB0aGlzLmVycm9yKGYsZXJyLFwiRXJyb3IgZG93bmxvYWRpbmcgXCIrdXJsKSxcclxuICAgICAgICAgICAgLy8gZXJyID0+IHRoaXMuZXJyb3IoZXJyKSxcclxuICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coJ0RvbmUgZ2V0dGluZy4nLHVybClcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQodXJsOiBzdHJpbmcsIGY6RnVuY3Rpb24sY29udGV4dDphbnkpOnZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2V0V2l0aEhlYWRlcnModXJsLCBuZXcgSGVhZGVycygpLCBmLmJpbmQoY29udGV4dCkpO1xyXG4gICAgfVxyXG4gICAgZ2V0SlNPTih1cmw6IHN0cmluZywgZjpGdW5jdGlvbixjb250ZXh0OmFueSk6dm9pZCB7XHJcbiAgICAgICAgbGV0IGg9bmV3IEhlYWRlcnMoKTtcclxuICAgICAgICBoLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIik7XHJcbiAgICAgICAgdGhpcy5nZXRXaXRoSGVhZGVycyh1cmwsIGgsIGYuYmluZChjb250ZXh0KSk7XHJcbiAgICB9XHJcbn0iXX0=