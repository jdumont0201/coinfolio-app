"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var message_service_1 = require("./message.service");
var console_service_1 = require("./console.service");
var config_service_1 = require("./config.service");
require("rxjs/add/operator/map");
require("rxjs/add/operator/timeout");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/retry");
require("rxjs/Rx");
var ApiService = (function () {
    function ApiService(http, messageService, consoleService, configService) {
        this.http = http;
        this.messageService = messageService;
        this.consoleService = consoleService;
        this.configService = configService;
        this.errorsChanged = new core_1.EventEmitter();
        this.pingOnError = false;
        this.isUp = false;
        this.consoleService.serv("+ ApiService");
        this.timeout = configService.API_TIMEOUT;
        this.retry = configService.API_NB_RETRY;
        this.baseurl = this.configService.getApiUrl();
    }
    ApiService.prototype.setAuthService = function (authService, f) {
        this.authService = authService;
        f();
    };
    //TEST WHETHER API IS LIVE
    /*if (this.pingOnError) {
     this.ping((isUp) => {
     if (isUp) {
     this.doProcessError(errorCode,err);
     } else {
     this.messageService.addError("API_DOWN", null, "API is unreachable.");
     }
     });
     */
    ApiService.prototype.processError = function (errorCode, err) {
        this.messageService.hideLoading();
        this.messageService.hideSaving();
        console.error(errorCode, err);
        var desc;
        if (err.name == "TimeoutError") {
            this.messageService.addError("API_DOWN", null, "API is unreachable.");
        }
        else if (err.message == "Unauthorized") {
            this.messageService.addError("API_UNAUTHORIZED", null, "You don't have access to this ressource.");
        }
        else {
            console.log("other error");
            if (err && err._body && typeof err._body === "string") {
                try {
                    var parsed = JSON.parse(err._body);
                    if (parsed.errordesc)
                        desc = parsed.errordesc;
                    else if (parsed.message)
                        desc = parsed.message;
                    this.messageService.readError(parsed.error);
                }
                catch (e) {
                    desc = err._body;
                    this.messageService.addError(err.url, parsed.error, "Unparsable error");
                }
            }
            /*          let toast = this.toastCtrl.create({
                          message: errorCode + " " + err + " " + (desc ? desc.toString() : ""),
                          cssClass: "red",
                          dismissOnPageChange: true, showCloseButton: true,
                          position: 'bottom'
                      });
                      toast.present();
          */
        }
    };
    ApiService.prototype.processData = function (data, f) {
        this.messageService.hideLoading();
        this.messageService.hideSaving();
        console.log("ApiService processData", data);
        if (data.error) {
            this.processError("API_PROCESS", data.errordesc);
        }
        else {
            f(data);
        }
    };
    ApiService.prototype.pingResult = function (isUp, f) {
        var diff = new Date().getTime() - this.timer;
        this.isUp = isUp;
        this.messageService.hideLoading();
        this.messageService.hideSaving();
        if (isUp) {
            console.log("PING Server up ", diff, "ms");
        }
        else {
            console.error("PING Server down", diff, "ms");
        }
        f(isUp);
    };
    ApiService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        //return Promise.reject(error.message || error);
    };
    ApiService.prototype.ping = function (f) {
        var _this = this;
        var fullurl = this.baseurl + "ping";
        console.log("PING", fullurl);
        this.timer = new Date().getTime();
        var h = this.authService.noauthGetHeaders;
        this.http.get(fullurl, { headers: h })
            .toPromise()
            .then(function (res) { return _this.pingResult(true, f); })
            .catch(this.handleError);
        ;
    };
    ApiService.prototype.authget = function (url, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.authGetHeaders;
        this.get(fullurl, h, f);
    };
    ApiService.prototype.noauthget = function (url, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.noauthGetHeaders;
        this.get(fullurl, h, f);
    };
    ApiService.prototype.authput = function (url, model, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.authPostHeaders;
        var ser = model ? model.serialize() : "";
        this.put(fullurl, ser, h, f);
    };
    ApiService.prototype.authpatch = function (url, model, referenceRaw, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.authPostHeaders;
        this.patch(fullurl, model, referenceRaw, h, f);
    };
    ApiService.prototype.authpost = function (url, model, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.authPostHeaders;
        var ser = model ? model.serialize() : "";
        this.post(fullurl, ser, h, f);
    };
    ApiService.prototype.authrawpost = function (url, raw, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.authPostHeaders;
        var ser = JSON.stringify(raw);
        this.post(fullurl, ser, h, f);
    };
    ApiService.prototype.noauthpost = function (url, model, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.noauthPostHeaders;
        var ser = model.serialize();
        this.post(fullurl, ser, h, f);
    };
    ApiService.prototype.noauthrawpost = function (url, raw, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.noauthPostHeaders;
        var ser = JSON.stringify(raw);
        this.post(fullurl, ser, h, f);
    };
    ApiService.prototype.authdelete = function (url, f) {
        var fullurl = this.baseurl + url;
        var h = this.authService.authPostHeaders;
        this.delete(fullurl, h, f);
    };
    ApiService.prototype.post = function (url, raw, headers, f) {
        var _this = this;
        this.consoleService.post("Posting", url, "obj", raw, "seralized", raw, "headers", headers);
        this.messageService.showSaving();
        this.http.post(url, raw, { headers: headers })
            .map(function (res) { return res.json(); })
            .timeout(this.timeout)
            .retry(this.retry)
            .subscribe(function (data) { return _this.processData(data, f); }, function (err) { return _this.processError("API_POST", err); }, 
        // err => this.error(err),
        function () { return console.log('Done posting.'); });
    };
    ApiService.prototype.delete = function (url, headers, f) {
        var _this = this;
        this.consoleService.delete("Deleting", url);
        this.messageService.showSaving();
        this.http.delete(url, { headers: headers })
            .map(function (res) { return res.json(); })
            .timeout(this.timeout)
            .retry(this.retry)
            .subscribe(function (data) { return _this.processData(data, f); }, function (err) { return _this.processError("API_DELETE", err); }, 
        // err => this.error(err),
        function () { return console.log('Done deleting.'); });
    };
    ApiService.prototype.put = function (url, ser, headers, f) {
        var _this = this;
        this.consoleService.put("Putting", url, "obj", ser, "serialized", ser);
        this.messageService.showSaving();
        this.http.put(url, ser, { headers: headers })
            .map(function (res) { return res.json(); })
            .timeout(this.timeout)
            .retry(this.retry)
            .subscribe(function (data) { return _this.processData(data, f); }, function (err) { return _this.processError("API_PUT", err); }, 
        // err => this.error(err),
        function () { return console.log('Done putting.'); });
    };
    ApiService.prototype.patch = function (url, model, referenceRaw, headers, f) {
        var _this = this;
        var ser = model.serializeModified(referenceRaw);
        this.consoleService.patch("Patching", url, "obj", model, "serialized", ser);
        this.messageService.showSaving();
        this.http.patch(url, ser, { headers: headers })
            .map(function (res) { return res.json(); })
            .timeout(this.timeout)
            .retry(this.retry)
            .subscribe(function (data) { return _this.processData(data, f); }, function (err) { return _this.processError("API_PATCH", err); }, 
        // err => this.error(err),
        function () { return console.log('Done patching.'); });
    };
    ApiService.prototype.get = function (url, headers, f) {
        var _this = this;
        this.timer = new Date().getTime();
        this.consoleService.get("ApiService Get", url, headers);
        this.messageService.showLoading();
        this.http.get(url, { headers: headers })
            .map(function (res) { return res.json(); })
            .timeout(this.timeout)
            .retry(this.retry)
            .subscribe(function (data) { return _this.processData(data, f); }, function (err) { return _this.processError("API_GET", err); }, 
        // err => this.error(err),
        function () { return console.log('Done.'); });
    };
    return ApiService;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ApiService.prototype, "errorsChanged", void 0);
ApiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        message_service_1.MessageService,
        console_service_1.ConsoleService,
        config_service_1.ConfigService])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcGkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE0QztBQUM1QyxzQ0FBdUU7QUFFdkUscURBQWlEO0FBQ2pELHFEQUFpRDtBQUNqRCxtREFBK0M7QUFLL0MsaUNBQStCO0FBQy9CLHFDQUFtQztBQUNuQyx1Q0FBcUM7QUFDckMsbUNBQWlDO0FBQ2pDLG1CQUFpQjtBQUlqQixJQUFhLFVBQVU7SUFXbkIsb0JBQW1CLElBQVUsRUFDVixjQUE4QixFQUM3QixjQUE4QixFQUM5QixhQUE0QjtRQUg3QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzdCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWJ0QyxrQkFBYSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQU1oRSxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixTQUFJLEdBQVksS0FBSyxDQUFDO1FBT2xCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQztRQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUM7UUFFeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRWxELENBQUM7SUFFRCxtQ0FBYyxHQUFkLFVBQWUsV0FBVyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsQ0FBQyxFQUFFLENBQUM7SUFDUixDQUFDO0lBRUQsMEJBQTBCO0lBQzFCOzs7Ozs7OztPQVFHO0lBRUgsaUNBQVksR0FBWixVQUFhLFNBQWlCLEVBQUUsR0FBRztRQUMvQixJQUFJ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QyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUM7YUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDckIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDakIsU0FBUyxDQUNOLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQXpCLENBQXlCLEVBQ2pDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQWpDLENBQWlDO1FBQ3hDLDBCQUEwQjtRQUMxQixjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBcEIsQ0FBb0IsQ0FDN0IsQ0FBQztJQUNWLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUFqUUQsSUFpUUM7QUFoUWE7SUFBVCxhQUFNLEVBQUU7OEJBQWdCLG1CQUFZO2lEQUEyQjtBQUR2RCxVQUFVO0lBRHRCLGlCQUFVLEVBQUU7cUNBWWdCLFdBQUk7UUFDTSxnQ0FBYztRQUNiLGdDQUFjO1FBQ2YsOEJBQWE7R0FkdkMsVUFBVSxDQWlRdEI7QUFqUVksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0h0dHAsIEhlYWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5pbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tICcuL21lc3NhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7Q29uc29sZVNlcnZpY2V9IGZyb20gJy4vY29uc29sZS5zZXJ2aWNlJztcclxuaW1wb3J0IHtDb25maWdTZXJ2aWNlfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xyXG5cclxuLy9pbXBvcnQge1RvYXN0Q29udHJvbGxlcn0gZnJvbSAnaW9uaWMtYW5ndWxhcic7XHJcbmltcG9ydCB7TW9kZWxTZXJ2aWNlfSBmcm9tICcuL21vZGVsLnNlcnZpY2UnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdGltZW91dCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9yZXRyeSc7XHJcbmltcG9ydCAncnhqcy9SeCc7XHJcbmltcG9ydCB7TW9kZWx9IGZyb20gXCIuLi9tb2RlbHMvTW9kZWxcIjtcclxuaW1wb3J0IHtSYXd9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ludGVyZmFjZXNcIlxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBcGlTZXJ2aWNlIHtcclxuICAgIEBPdXRwdXQoKSBlcnJvcnNDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBiYXNldXJsOiBzdHJpbmc7XHJcbiAgICB0aW1lcjogbnVtYmVyO1xyXG4gICAgdGltZW91dDogbnVtYmVyO1xyXG4gICAgcmV0cnk6IG51bWJlcjtcclxuICAgIHBpbmdPbkVycm9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBpc1VwOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBhdXRoU2VydmljZTogQXV0aFNlcnZpY2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHAsXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb25zb2xlU2VydmljZTogQ29uc29sZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLmNvbnNvbGVTZXJ2aWNlLnNlcnYoXCIrIEFwaVNlcnZpY2VcIik7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gY29uZmlnU2VydmljZS5BUElfVElNRU9VVDtcclxuICAgICAgICB0aGlzLnJldHJ5ID0gY29uZmlnU2VydmljZS5BUElfTkJfUkVUUlk7XHJcblxyXG4gICAgICAgIHRoaXMuYmFzZXVybCA9IHRoaXMuY29uZmlnU2VydmljZS5nZXRBcGlVcmwoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0QXV0aFNlcnZpY2UoYXV0aFNlcnZpY2UsIGYpIHtcclxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlID0gYXV0aFNlcnZpY2U7XHJcbiAgICAgICAgZigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVEVTVCBXSEVUSEVSIEFQSSBJUyBMSVZFXHJcbiAgICAvKmlmICh0aGlzLnBpbmdPbkVycm9yKSB7XHJcbiAgICAgdGhpcy5waW5nKChpc1VwKSA9PiB7XHJcbiAgICAgaWYgKGlzVXApIHtcclxuICAgICB0aGlzLmRvUHJvY2Vzc0Vycm9yKGVycm9yQ29kZSxlcnIpO1xyXG4gICAgIH0gZWxzZSB7XHJcbiAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5hZGRFcnJvcihcIkFQSV9ET1dOXCIsIG51bGwsIFwiQVBJIGlzIHVucmVhY2hhYmxlLlwiKTtcclxuICAgICB9XHJcbiAgICAgfSk7XHJcbiAgICAgKi9cclxuXHJcbiAgICBwcm9jZXNzRXJyb3IoZXJyb3JDb2RlOiBzdHJpbmcsIGVycikge1xyXG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmhpZGVTYXZpbmcoKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yQ29kZSwgZXJyKTtcclxuICAgICAgICBsZXQgZGVzYzogc3RyaW5nO1xyXG4gICAgICAgIGlmIChlcnIubmFtZSA9PSBcIlRpbWVvdXRFcnJvclwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuYWRkRXJyb3IoXCJBUElfRE9XTlwiLCBudWxsLCBcIkFQSSBpcyB1bnJlYWNoYWJsZS5cIik7XHJcbiAgICAgICAgfWVsc2UgaWYgKGVyci5tZXNzYWdlID09IFwiVW5hdXRob3JpemVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5hZGRFcnJvcihcIkFQSV9VTkFVVEhPUklaRURcIiwgbnVsbCwgXCJZb3UgZG9uJ3QgaGF2ZSBhY2Nlc3MgdG8gdGhpcyByZXNzb3VyY2UuXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm90aGVyIGVycm9yXCIpO1xyXG4gICAgICAgICAgICBpZiAoZXJyICYmIGVyci5fYm9keSAmJiB0eXBlb2YgZXJyLl9ib2R5ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJzZWQgPSBKU09OLnBhcnNlKGVyci5fYm9keSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlZC5lcnJvcmRlc2MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2MgPSBwYXJzZWQuZXJyb3JkZXNjO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBhcnNlZC5tZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjID0gcGFyc2VkLm1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnJlYWRFcnJvcihwYXJzZWQuZXJyb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjID0gZXJyLl9ib2R5O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuYWRkRXJyb3IoZXJyLnVybCxwYXJzZWQuZXJyb3IsXCJVbnBhcnNhYmxlIGVycm9yXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gIC8qICAgICAgICAgIGxldCB0b2FzdCA9IHRoaXMudG9hc3RDdHJsLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvckNvZGUgKyBcIiBcIiArIGVyciArIFwiIFwiICsgKGRlc2MgPyBkZXNjLnRvU3RyaW5nKCkgOiBcIlwiKSxcclxuICAgICAgICAgICAgICAgIGNzc0NsYXNzOiBcInJlZFwiLFxyXG4gICAgICAgICAgICAgICAgZGlzbWlzc09uUGFnZUNoYW5nZTogdHJ1ZSwgc2hvd0Nsb3NlQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdib3R0b20nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0b2FzdC5wcmVzZW50KCk7XHJcbiovXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NEYXRhKGRhdGEsIGY6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaGlkZVNhdmluZygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXBpU2VydmljZSBwcm9jZXNzRGF0YVwiLCBkYXRhKTtcclxuICAgICAgICBpZiAoZGF0YS5lcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NFcnJvcihcIkFQSV9QUk9DRVNTXCIsIGRhdGEuZXJyb3JkZXNjKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwaW5nUmVzdWx0KGlzVXA6IGJvb2xlYW4sIGY6IEZ1bmN0aW9uKSB7XHJcblxyXG4gICAgICAgIGxldCBkaWZmID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLnRpbWVyO1xyXG4gICAgICAgIHRoaXMuaXNVcCA9IGlzVXA7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaGlkZVNhdmluZygpO1xyXG4gICAgICAgIGlmIChpc1VwKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBJTkcgU2VydmVyIHVwIFwiLCBkaWZmLCBcIm1zXCIpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUElORyBTZXJ2ZXIgZG93blwiLCBkaWZmLCBcIm1zXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmKGlzVXApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkJywgZXJyb3IpO1xyXG4gICAgICAgIC8vcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHBpbmcoZjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBsZXQgZnVsbHVybDogc3RyaW5nID0gdGhpcy5iYXNldXJsICsgXCJwaW5nXCI7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQSU5HXCIsIGZ1bGx1cmwpO1xyXG4gICAgICAgIHRoaXMudGltZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBsZXQgaDogSGVhZGVycyA9IHRoaXMuYXV0aFNlcnZpY2Uubm9hdXRoR2V0SGVhZGVycztcclxuICAgICAgICB0aGlzLmh0dHAuZ2V0KGZ1bGx1cmwsIHtoZWFkZXJzOiBofSlcclxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB0aGlzLnBpbmdSZXN1bHQodHJ1ZSwgZikpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgICAgICA7XHJcbiAgICB9XHJcblxyXG4gICAgYXV0aGdldCh1cmw6IHN0cmluZywgZjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBsZXQgZnVsbHVybDogc3RyaW5nID0gdGhpcy5iYXNldXJsICsgdXJsO1xyXG4gICAgICAgIGxldCBoOiBIZWFkZXJzID0gdGhpcy5hdXRoU2VydmljZS5hdXRoR2V0SGVhZGVycztcclxuICAgICAgICB0aGlzLmdldChmdWxsdXJsLCBoLCBmKTtcclxuICAgIH1cclxuXHJcbiAgICBub2F1dGhnZXQodXJsOiBzdHJpbmcsIGY6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGZ1bGx1cmw6IHN0cmluZyA9IHRoaXMuYmFzZXVybCArIHVybDtcclxuICAgICAgICBsZXQgaDogSGVhZGVycyA9IHRoaXMuYXV0aFNlcnZpY2Uubm9hdXRoR2V0SGVhZGVycztcclxuICAgICAgICB0aGlzLmdldChmdWxsdXJsLCBoLCBmKTtcclxuICAgIH1cclxuXHJcbiAgICBhdXRocHV0KHVybDogc3RyaW5nLCBtb2RlbDogTW9kZWwsIGYpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZnVsbHVybDogc3RyaW5nID0gdGhpcy5iYXNldXJsICsgdXJsO1xyXG4gICAgICAgIGxldCBoOiBIZWFkZXJzID0gdGhpcy5hdXRoU2VydmljZS5hdXRoUG9zdEhlYWRlcnM7XHJcblxyXG4gICAgICAgIGxldCBzZXI6IHN0cmluZyA9IG1vZGVsID8gbW9kZWwuc2VyaWFsaXplKCkgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMucHV0KGZ1bGx1cmwsIHNlciwgaCwgZik7XHJcbiAgICB9XHJcblxyXG4gICAgYXV0aHBhdGNoKHVybDogc3RyaW5nLCBtb2RlbDogTW9kZWwsIHJlZmVyZW5jZVJhdzogUmF3LCBmOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGxldCBmdWxsdXJsOiBzdHJpbmcgPSB0aGlzLmJhc2V1cmwgKyB1cmw7XHJcbiAgICAgICAgbGV0IGg6IEhlYWRlcnMgPSB0aGlzLmF1dGhTZXJ2aWNlLmF1dGhQb3N0SGVhZGVycztcclxuICAgICAgICB0aGlzLnBhdGNoKGZ1bGx1cmwsIG1vZGVsLCByZWZlcmVuY2VSYXcsIGgsIGYpO1xyXG4gICAgfVxyXG5cclxuICAgIGF1dGhwb3N0KHVybDogc3RyaW5nLCBtb2RlbDogTW9kZWwsIGY6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGZ1bGx1cmw6IHN0cmluZyA9IHRoaXMuYmFzZXVybCArIHVybDtcclxuICAgICAgICBsZXQgaDogSGVhZGVycyA9IHRoaXMuYXV0aFNlcnZpY2UuYXV0aFBvc3RIZWFkZXJzO1xyXG4gICAgICAgIGxldCBzZXI6IHN0cmluZyA9IG1vZGVsID8gbW9kZWwuc2VyaWFsaXplKCkgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMucG9zdChmdWxsdXJsLCBzZXIsIGgsIGYpO1xyXG4gICAgfVxyXG5cclxuICAgIGF1dGhyYXdwb3N0KHVybDogc3RyaW5nLCByYXc6IGFueSwgZjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBsZXQgZnVsbHVybDogc3RyaW5nID0gdGhpcy5iYXNldXJsICsgdXJsO1xyXG4gICAgICAgIGxldCBoOiBIZWFkZXJzID0gdGhpcy5hdXRoU2VydmljZS5hdXRoUG9zdEhlYWRlcnM7XHJcbiAgICAgICAgbGV0IHNlcjogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkocmF3KTtcclxuICAgICAgICB0aGlzLnBvc3QoZnVsbHVybCwgc2VyLCBoLCBmKTtcclxuICAgIH1cclxuXHJcbiAgICBub2F1dGhwb3N0KHVybDogc3RyaW5nLCBtb2RlbDogTW9kZWwsIGY6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGZ1bGx1cmw6IHN0cmluZyA9IHRoaXMuYmFzZXVybCArIHVybDtcclxuICAgICAgICBsZXQgaDogSGVhZGVycyA9IHRoaXMuYXV0aFNlcnZpY2Uubm9hdXRoUG9zdEhlYWRlcnM7XHJcbiAgICAgICAgbGV0IHNlcjogc3RyaW5nID0gbW9kZWwuc2VyaWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5wb3N0KGZ1bGx1cmwsIHNlciwgaCwgZik7XHJcbiAgICB9XHJcbiAgICBub2F1dGhyYXdwb3N0KHVybDogc3RyaW5nLCByYXc6IGFueSwgZjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBsZXQgZnVsbHVybDogc3RyaW5nID0gdGhpcy5iYXNldXJsICsgdXJsO1xyXG4gICAgICAgIGxldCBoOiBIZWFkZXJzID0gdGhpcy5hdXRoU2VydmljZS5ub2F1dGhQb3N0SGVhZGVycztcclxuICAgICAgICBsZXQgc2VyOiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShyYXcpO1xyXG4gICAgICAgIHRoaXMucG9zdChmdWxsdXJsLCBzZXIsIGgsIGYpO1xyXG4gICAgfVxyXG5cclxuICAgIGF1dGhkZWxldGUodXJsOiBzdHJpbmcsIGY6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IGZ1bGx1cmw6IHN0cmluZyA9IHRoaXMuYmFzZXVybCArIHVybDtcclxuICAgICAgICBsZXQgaDogSGVhZGVycyA9IHRoaXMuYXV0aFNlcnZpY2UuYXV0aFBvc3RIZWFkZXJzO1xyXG4gICAgICAgIHRoaXMuZGVsZXRlKGZ1bGx1cmwsIGgsIGYpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcG9zdCh1cmw6IHN0cmluZywgcmF3OiBhbnksIGhlYWRlcnM6IEhlYWRlcnMsIGY6IEZ1bmN0aW9uKSB7XHJcblxyXG4gICAgICAgIHRoaXMuY29uc29sZVNlcnZpY2UucG9zdChcIlBvc3RpbmdcIiwgdXJsLCBcIm9ialwiLCByYXcsIFwic2VyYWxpemVkXCIsIHJhdywgXCJoZWFkZXJzXCIsIGhlYWRlcnMpO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc2hvd1NhdmluZygpO1xyXG4gICAgICAgIHRoaXMuaHR0cC5wb3N0KHVybCwgcmF3LCB7aGVhZGVyczogaGVhZGVyc30pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aW1lb3V0KHRoaXMudGltZW91dClcclxuICAgICAgICAgICAgLnJldHJ5KHRoaXMucmV0cnkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBkYXRhID0+IHRoaXMucHJvY2Vzc0RhdGEoZGF0YSwgZiksXHJcbiAgICAgICAgICAgICAgICBlcnIgPT4gdGhpcy5wcm9jZXNzRXJyb3IoXCJBUElfUE9TVFwiLCBlcnIpLFxyXG4gICAgICAgICAgICAgICAgLy8gZXJyID0+IHRoaXMuZXJyb3IoZXJyKSxcclxuICAgICAgICAgICAgICAgICgpID0+IGNvbnNvbGUubG9nKCdEb25lIHBvc3RpbmcuJylcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlbGV0ZSh1cmw6IHN0cmluZywgaGVhZGVyczogSGVhZGVycywgZjogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmNvbnNvbGVTZXJ2aWNlLmRlbGV0ZShcIkRlbGV0aW5nXCIsIHVybCk7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zaG93U2F2aW5nKCk7XHJcbiAgICAgICAgdGhpcy5odHRwLmRlbGV0ZSh1cmwsIHtoZWFkZXJzOiBoZWFkZXJzfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRpbWVvdXQodGhpcy50aW1lb3V0KVxyXG4gICAgICAgICAgICAucmV0cnkodGhpcy5yZXRyeSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4gdGhpcy5wcm9jZXNzRGF0YShkYXRhLCBmKSxcclxuICAgICAgICAgICAgICAgIGVyciA9PiB0aGlzLnByb2Nlc3NFcnJvcihcIkFQSV9ERUxFVEVcIiwgZXJyKSxcclxuICAgICAgICAgICAgICAgIC8vIGVyciA9PiB0aGlzLmVycm9yKGVyciksXHJcbiAgICAgICAgICAgICAgICAoKSA9PiBjb25zb2xlLmxvZygnRG9uZSBkZWxldGluZy4nKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHV0KHVybDogc3RyaW5nLCBzZXI6IHN0cmluZywgaGVhZGVyczogSGVhZGVycywgZjogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmNvbnNvbGVTZXJ2aWNlLnB1dChcIlB1dHRpbmdcIiwgdXJsLCBcIm9ialwiLCBzZXIsIFwic2VyaWFsaXplZFwiLCBzZXIpO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc2hvd1NhdmluZygpO1xyXG4gICAgICAgIHRoaXMuaHR0cC5wdXQodXJsLCBzZXIsIHtoZWFkZXJzOiBoZWFkZXJzfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRpbWVvdXQodGhpcy50aW1lb3V0KVxyXG4gICAgICAgICAgICAucmV0cnkodGhpcy5yZXRyeSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4gdGhpcy5wcm9jZXNzRGF0YShkYXRhLCBmKSxcclxuICAgICAgICAgICAgICAgIGVyciA9PiB0aGlzLnByb2Nlc3NFcnJvcihcIkFQSV9QVVRcIiwgZXJyKSxcclxuICAgICAgICAgICAgICAgIC8vIGVyciA9PiB0aGlzLmVycm9yKGVyciksXHJcbiAgICAgICAgICAgICAgICAoKSA9PiBjb25zb2xlLmxvZygnRG9uZSBwdXR0aW5nLicpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYXRjaCh1cmw6IHN0cmluZywgbW9kZWw6IE1vZGVsLCByZWZlcmVuY2VSYXc6IFJhdywgaGVhZGVyczogSGVhZGVycywgZjogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgc2VyOiBzdHJpbmcgPSBtb2RlbC5zZXJpYWxpemVNb2RpZmllZChyZWZlcmVuY2VSYXcpO1xyXG4gICAgICAgIHRoaXMuY29uc29sZVNlcnZpY2UucGF0Y2goXCJQYXRjaGluZ1wiLCB1cmwsIFwib2JqXCIsIG1vZGVsLCBcInNlcmlhbGl6ZWRcIiwgc2VyKTtcclxuICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnNob3dTYXZpbmcoKTtcclxuICAgICAgICB0aGlzLmh0dHAucGF0Y2godXJsLCBzZXIsIHtoZWFkZXJzOiBoZWFkZXJzfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRpbWVvdXQodGhpcy50aW1lb3V0KVxyXG4gICAgICAgICAgICAucmV0cnkodGhpcy5yZXRyeSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4gdGhpcy5wcm9jZXNzRGF0YShkYXRhLCBmKSxcclxuICAgICAgICAgICAgICAgIGVyciA9PiB0aGlzLnByb2Nlc3NFcnJvcihcIkFQSV9QQVRDSFwiLCBlcnIpLFxyXG4gICAgICAgICAgICAgICAgLy8gZXJyID0+IHRoaXMuZXJyb3IoZXJyKSxcclxuICAgICAgICAgICAgICAgICgpID0+IGNvbnNvbGUubG9nKCdEb25lIHBhdGNoaW5nLicpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQodXJsOiBzdHJpbmcsIGhlYWRlcnM6IEhlYWRlcnMsIGY6IEZ1bmN0aW9uKSB7XHJcblxyXG4gICAgICAgIHRoaXMudGltZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB0aGlzLmNvbnNvbGVTZXJ2aWNlLmdldChcIkFwaVNlcnZpY2UgR2V0XCIsIHVybCwgaGVhZGVycyk7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zaG93TG9hZGluZygpO1xyXG4gICAgICAgIHRoaXMuaHR0cC5nZXQodXJsLCB7aGVhZGVyczogaGVhZGVyc30pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aW1lb3V0KHRoaXMudGltZW91dClcclxuICAgICAgICAgICAgLnJldHJ5KHRoaXMucmV0cnkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBkYXRhID0+IHRoaXMucHJvY2Vzc0RhdGEoZGF0YSwgZiksXHJcbiAgICAgICAgICAgICAgICBlcnIgPT4gdGhpcy5wcm9jZXNzRXJyb3IoXCJBUElfR0VUXCIsIGVyciksXHJcbiAgICAgICAgICAgICAgICAvLyBlcnIgPT4gdGhpcy5lcnJvcihlcnIpLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coJ0RvbmUuJylcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iXX0=