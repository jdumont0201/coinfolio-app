"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var message_service_1 = require("../services/message.service");
var api_service_1 = require("../services/api.service");
var auth_service_1 = require("../services/auth.service");
var console_service_1 = require("../services/console.service");
var config_service_1 = require("../services/config.service");
var ModelLoader_1 = require("./ModelService/ModelLoader");
var Library_1 = require("./ModelService/Library");
var assert_1 = require("../utils/assert");
var DataAdapter_1 = require("./ModelService/DataAdapter");
var ModelService = (function () {
    function ModelService(apiService, consoleService, configService, messageService, authService) {
        var _this = this;
        this.apiService = apiService;
        this.consoleService = consoleService;
        this.configService = configService;
        this.messageService = messageService;
        this.authService = authService;
        this.modelUpdated = new core_1.EventEmitter();
        this.modelUpdateSubscribed = false;
        this.MODELS = {};
        this.isModelListLoaded = false;
        this.SERVER_RETURNS_ARRAYS = false;
        consoleService.serv("+ ModelService", configService);
        this.consoleService = consoleService;
        this.configService = configService;
        this.dataAdapter = new DataAdapter_1.DataAdapter(this, configService);
        this.apiService = apiService;
        //this.buildSchemas();
        this.library = new Library_1.Library(this, this.consoleService, this.messageService);
        this.loader = new ModelLoader_1.ModelLoader(this);
        this.authService.loginChanged.subscribe(function (value) { return _this.preloadAssetsIfLogged(value); }, function (error) { return console.log("Error updating flash" + error); }, function () { return console.log('done'); });
        if (this.authService.isAuthenticated()) {
            this.preload();
        }
        this.configService.perSiteConfigured.subscribe(function (value) { return _this.postConfigEvent(value); }, function (error) { return console.log("Error postConfigEvent" + error); }, function () { return console.log('done'); });
    }
    ModelService.prototype.setModelTypes = function (M) {
        this.MODELTYPES = M;
    };
    ModelService.prototype.postConfigEvent = function (value) {
        if (value.type == "models")
            this.isModelListLoaded = true;
        if (!this.authService.CONTENT_AUTHENTIFICATION)
            this.library.setPreloaded();
    };
    ModelService.prototype.emitModelUpdated = function (model, key) {
        this.modelUpdated.emit({ model: model, key: key });
    };
    ModelService.prototype.preloadAssetsIfLogged = function (value) {
        if (value) {
            this.preload();
        }
        else {
        }
    };
    ModelService.prototype.getInstance = function (modelType, rawdata) {
        assert_1.Assert.exists(modelType, "getInstance: get has no modelType, =" + modelType);
        var m = this.instancer.getInstance(modelType);
        if (rawdata)
            this.loader.loadObject(rawdata, m);
        m.modelType = modelType; //force modeltype for me vs user
        return m;
    };
    ModelService.prototype.preloadAssets = function (f) {
        this.apiService.authget("assets", function (A) {
            //this.library.readAssets(A);
            f(A);
        });
    };
    ModelService.prototype.preload = function () {
        var _this = this;
        if (this.configService.LIBRARY_ENABLED) {
            if (!this.library.isPreloaded()) {
                this.consoleService.library("PRELOAD");
                this.preloadAssets(function (T) {
                    _this.library.setPreloaded();
                });
            }
        }
    };
    /* Posts with auth at url and returns model */
    ModelService.prototype.post = function (url, model, f) {
        var _this = this;
        var modelType = model.modelType;
        this.apiService.authpost(url, model, function (rawdata) {
            console.log("Model postdata ", rawdata);
            var raw;
            if (_this.SERVER_RETURNS_ARRAYS) {
                var id = Object.keys(rawdata)[0];
                ;
                raw = rawdata[id];
            }
            else
                raw = rawdata;
            if (!rawdata.returnMultiple) {
                var returnedModel = _this.loader.get(modelType, raw, rawdata);
                console.log("Schema postdata returned model ", returnedModel);
                //TODO ADD TO LIBRARY
                f(returnedModel);
            }
            else {
                var returnedModel = _this.loader.get(modelType, raw, rawdata);
                if (_this.configService.LIBRARY_ENABLED && _this.library.isPreloaded())
                    _this.library.addRaw(raw, modelType);
                f(rawdata);
            }
        });
    };
    ModelService.prototype.put = function (url, model, f) {
        var _this = this;
        var modelType = model.modelType;
        console.log("Schema put", url);
        this.apiService.authput(url, model, function (rawdata) {
            //let returnedModel = this.buildModel(data, model.modelType);
            var id;
            console.log(Object.keys(rawdata));
            var k = Object.keys(rawdata);
            var raw;
            if (_this.SERVER_RETURNS_ARRAYS) {
                if (model._id && model._id in rawdata)
                    id = model._id;
                else
                    id = k[0];
                raw = rawdata[id];
            }
            else
                raw = rawdata;
            var returnedModel = _this.loader.get(modelType, raw, rawdata);
            console.log("Schema putdata ", returnedModel);
            if (_this.configService.LIBRARY_ENABLED && _this.library.isPreloaded() && _this.configService.UPDATE_AFTER_POSTPUTPATCH)
                _this.library.completeUpdate(raw, modelType);
            f(returnedModel);
        });
    };
    ModelService.prototype.patch = function (url, model, referenceRaw, f) {
        var _this = this;
        console.log("Schema patch url", url);
        var modelType = model.modelType;
        this.apiService.authpatch(url, model, referenceRaw, function (rawdata) {
            console.log("Schema patchdata ", rawdata);
            var id = model._id;
            var raw;
            if (_this.SERVER_RETURNS_ARRAYS)
                raw = rawdata[id];
            else
                raw = rawdata;
            var returnedModel = _this.loader.get(model.modelType, raw, rawdata);
            console.log("Schema patchdata ", returnedModel);
            if (_this.configService.LIBRARY_ENABLED && _this.library.isPreloaded() && _this.configService.UPDATE_AFTER_POSTPUTPATCH)
                _this.library.partialUpdate(raw, modelType);
            f(returnedModel);
        });
    };
    /* get many with url and returns models */
    ModelService.prototype.getAll = function (url, options, f, modelType) {
        var _this = this;
        this.apiService.authget(url, function (rawdata) {
            console.log("ModelService getAll data=", rawdata);
            var M;
            if (_this.SERVER_RETURNS_ARRAYS)
                M = _this.loader.getAll(modelType, rawdata.main, rawdata.populated, options);
            else
                M = _this.loader.getAll(modelType, rawdata, {}, options);
            _this.consoleService.load("getAll [models]=", M, M.length + " items");
            if (_this.configService.LIBRARY_ENABLED && _this.library.isPreloaded() && _this.configService.UPDATE_AFTER_GET)
                _this.library.partialUpdateAllWithTimestamp(rawdata, modelType);
            f(M);
        });
    };
    /* get many with url and returns models */
    ModelService.prototype.getOne = function (url, options, f, modelType) {
        var _this = this;
        this.apiService.authget(url, function (rawdatas) {
            if (!rawdatas) {
                console.error("ModelService getOne but no result");
                return null;
            }
            var id;
            var raw;
            if (_this.SERVER_RETURNS_ARRAYS) {
                if ("main" in rawdatas)
                    rawdatas = rawdatas["main"];
                id = Object.keys(rawdatas)[0];
                raw = rawdatas[id];
                raw._id = id;
            }
            else {
                raw = rawdatas;
            }
            var returnedModel = _this.loader.get(modelType, raw, rawdatas, options);
            if (_this.configService.LIBRARY_ENABLED && _this.library.isPreloaded() && _this.configService.UPDATE_AFTER_GET)
                _this.library.partialUpdateWithTimestamp(raw, modelType);
            f(returnedModel);
        });
    };
    ModelService.prototype.modelOne = function (raw, modelType, options) {
        if (options === void 0) { options = {}; }
        raw._id = raw.id;
        var returnedModel = this.loader.get(modelType, raw, raw, options);
        return returnedModel;
    };
    return ModelService;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ModelService.prototype, "modelUpdated", void 0);
ModelService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_service_1.ApiService,
        console_service_1.ConsoleService,
        config_service_1.ConfigService,
        message_service_1.MessageService,
        auth_service_1.AuthService])
], ModelService);
exports.ModelService = ModelService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vZGVsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUY7QUFPakYsK0RBQTJEO0FBQzNELHVEQUFzRDtBQUN0RCx5REFBd0Q7QUFDeEQsK0RBQTJEO0FBQzNELDZEQUF5RDtBQUN6RCwwREFBc0Q7QUFFdEQsa0RBQThDO0FBQzlDLDBDQUFzQztBQUN0QywwREFBdUQ7QUFzQnZELElBQWEsWUFBWTtJQWVyQixzQkFBbUIsVUFBc0IsRUFDdEIsY0FBOEIsRUFDOUIsYUFBNEIsRUFDM0IsY0FBOEIsRUFDOUIsV0FBd0I7UUFKNUMsaUJBb0JDO1FBcEJrQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMzQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFsQmxDLGlCQUFZLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRS9ELDBCQUFxQixHQUFZLEtBQUssQ0FBQztRQUV2QyxXQUFNLEdBQVEsRUFBRSxDQUFDO1FBSWpCLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUluQywwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFPMUIsY0FBYyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkseUJBQVcsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0Isc0JBQXNCO1FBRXRCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFB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eEUsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBeE5ELElBd05DO0FBdk5hO0lBQVQsYUFBTSxFQUFFOzhCQUFlLG1CQUFZO2tEQUEyQjtBQUR0RCxZQUFZO0lBRHhCLGlCQUFVLEVBQUU7cUNBZ0JzQix3QkFBVTtRQUNOLGdDQUFjO1FBQ2YsOEJBQWE7UUFDWCxnQ0FBYztRQUNqQiwwQkFBVztHQW5CbkMsWUFBWSxDQXdOeEI7QUF4Tlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIEluamVjdG9yLCBJbmplY3QsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIE9iamVjdElkLCBNb2RlbFR5cGUsIFJlcXVlc3RRdWVyeU9wdGlvbnMsIFJhd0hhc2gsIFJhd0dldEFsbEhhc2gsIFJhd1xyXG59IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ludGVyZmFjZXNcIlxyXG5pbXBvcnQge01vZGVsfSBmcm9tIFwiLi4vbW9kZWxzL01vZGVsXCJcclxuXHJcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9tZXNzYWdlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtBcGlTZXJ2aWNlfSAgICBmcm9tICcuLi9zZXJ2aWNlcy9hcGkuc2VydmljZSc7XHJcbmltcG9ydCB7QXV0aFNlcnZpY2V9ICAgIGZyb20gJy4uL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7Q29uc29sZVNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2NvbnNvbGUuc2VydmljZSc7XHJcbmltcG9ydCB7Q29uZmlnU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQge01vZGVsTG9hZGVyfSBmcm9tIFwiLi9Nb2RlbFNlcnZpY2UvTW9kZWxMb2FkZXJcIlxyXG5cclxuaW1wb3J0IHtMaWJyYXJ5fSBmcm9tIFwiLi9Nb2RlbFNlcnZpY2UvTGlicmFyeVwiXHJcbmltcG9ydCB7QXNzZXJ0fSBmcm9tIFwiLi4vdXRpbHMvYXNzZXJ0XCJcclxuaW1wb3J0IHtEYXRhQWRhcHRlcn0gZnJvbSBcIi4vTW9kZWxTZXJ2aWNlL0RhdGFBZGFwdGVyXCI7XHJcblxyXG5cclxuLy9pbXBvcnQgeyBHZW5lcmljSW5zdGFuY2VySW50ZXJmYWNlfSBmcm9tIFwiaGlyZXRvblwiXHJcbmludGVyZmFjZSBJQWN0aXZhdGFibGUge1xyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIG5hbWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHZW5lcmljSW5zdGFuY2VySW50ZXJmYWNlIHtcclxuICAgIGdldEluc3RhbmNlKG1vZGVsVHlwZSk6IGFueTtcclxuICAgIE1PREVMUzogYW55O1xyXG59XHJcblxyXG5cclxuaW50ZXJmYWNlIElBY3RpdmF0YWJsZSB7XHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG59XHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTW9kZWxTZXJ2aWNlIHtcclxuICAgIEBPdXRwdXQoKSBtb2RlbFVwZGF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIG1vZGVsVXBkYXRlU3Vic2NyaWJlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgbGlicmFyeTogTGlicmFyeTtcclxuICAgIE1PREVMUzogYW55ID0ge307XHJcbiAgICBNT0RFTFRZUEVTOiBhbnk7XHJcbiAgICBpbnN0YW5jZXI6IEdlbmVyaWNJbnN0YW5jZXJJbnRlcmZhY2U7XHJcbiAgICBsb2FkZXI6IE1vZGVsTG9hZGVyO1xyXG4gICAgaXNNb2RlbExpc3RMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBkYXRhQWRhcHRlcjogRGF0YUFkYXB0ZXI7XHJcblxyXG4gICAgU0VSVkVSX1JFVFVSTlNfQVJSQVlTID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgY29uc29sZVNlcnZpY2U6IENvbnNvbGVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHVibGljIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcbiAgICAgICAgY29uc29sZVNlcnZpY2Uuc2VydihcIisgTW9kZWxTZXJ2aWNlXCIsIGNvbmZpZ1NlcnZpY2UpO1xyXG4gICAgICAgIHRoaXMuY29uc29sZVNlcnZpY2UgPSBjb25zb2xlU2VydmljZTtcclxuICAgICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UgPSBjb25maWdTZXJ2aWNlO1xyXG4gICAgICAgIHRoaXMuZGF0YUFkYXB0ZXIgPSBuZXcgRGF0YUFkYXB0ZXIodGhpcywgY29uZmlnU2VydmljZSk7XHJcbiAgICAgICAgdGhpcy5hcGlTZXJ2aWNlID0gYXBpU2VydmljZTtcclxuICAgICAgICAvL3RoaXMuYnVpbGRTY2hlbWFzKCk7XHJcblxyXG4gICAgICAgIHRoaXMubGlicmFyeSA9IG5ldyBMaWJyYXJ5KHRoaXMsIHRoaXMuY29uc29sZVNlcnZpY2UsIHRoaXMubWVzc2FnZVNlcnZpY2UpO1xyXG4gICAgICAgIHRoaXMubG9hZGVyID0gbmV3IE1vZGVsTG9hZGVyKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ2luQ2hhbmdlZC5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5wcmVsb2FkQXNzZXRzSWZMb2dnZWQodmFsdWUpLCBlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yIHVwZGF0aW5nIGZsYXNoXCIgKyBlcnJvciksICgpID0+IGNvbnNvbGUubG9nKCdkb25lJykpO1xyXG4gICAgICAgIGlmICh0aGlzLmF1dGhTZXJ2aWNlLmlzQXV0aGVudGljYXRlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJlbG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UucGVyU2l0ZUNvbmZpZ3VyZWQuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMucG9zdENvbmZpZ0V2ZW50KHZhbHVlKSwgZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvciBwb3N0Q29uZmlnRXZlbnRcIiArIGVycm9yKSwgKCkgPT4gY29uc29sZS5sb2coJ2RvbmUnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TW9kZWxUeXBlcyhNOiBhbnkpIHtcclxuICAgICAgICB0aGlzLk1PREVMVFlQRVMgPSBNO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc3RDb25maWdFdmVudCh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZS50eXBlID09IFwibW9kZWxzXCIpXHJcbiAgICAgICAgICAgIHRoaXMuaXNNb2RlbExpc3RMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICghdGhpcy5hdXRoU2VydmljZS5DT05URU5UX0FVVEhFTlRJRklDQVRJT04pXHJcbiAgICAgICAgICAgIHRoaXMubGlicmFyeS5zZXRQcmVsb2FkZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBlbWl0TW9kZWxVcGRhdGVkKG1vZGVsOiBNb2RlbCwga2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1vZGVsVXBkYXRlZC5lbWl0KHttb2RlbDogbW9kZWwsIGtleToga2V5fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJlbG9hZEFzc2V0c0lmTG9nZ2VkKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJlbG9hZCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRJbnN0YW5jZTxUIGV4dGVuZHMgTW9kZWw+KG1vZGVsVHlwZTogTW9kZWxUeXBlLCByYXdkYXRhPzogYW55KSB7XHJcbiAgICAgICAgQXNzZXJ0LmV4aXN0cyhtb2RlbFR5cGUsIFwiZ2V0SW5zdGFuY2U6IGdldCBoYXMgbm8gbW9kZWxUeXBlLCA9XCIgKyBtb2RlbFR5cGUpO1xyXG5cclxuICAgICAgICBsZXQgbSA9IHRoaXMuaW5zdGFuY2VyLmdldEluc3RhbmNlKG1vZGVsVHlwZSk7XHJcbiAgICAgICAgaWYgKHJhd2RhdGEpXHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVyLmxvYWRPYmplY3Q8VD4ocmF3ZGF0YSwgbSk7XHJcbiAgICAgICAgbS5tb2RlbFR5cGUgPSBtb2RlbFR5cGU7Ly9mb3JjZSBtb2RlbHR5cGUgZm9yIG1lIHZzIHVzZXJcclxuICAgICAgICByZXR1cm4gbTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJlbG9hZEFzc2V0cyhmOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYXBpU2VydmljZS5hdXRoZ2V0KFwiYXNzZXRzXCIsIChBKSA9PiB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5saWJyYXJ5LnJlYWRBc3NldHMoQSk7XHJcbiAgICAgICAgICAgIGYoQSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJlbG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWdTZXJ2aWNlLkxJQlJBUllfRU5BQkxFRCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubGlicmFyeS5pc1ByZWxvYWRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnNvbGVTZXJ2aWNlLmxpYnJhcnkoXCJQUkVMT0FEXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVsb2FkQXNzZXRzKChUKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saWJyYXJ5LnNldFByZWxvYWRlZCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qIFBvc3RzIHdpdGggYXV0aCBhdCB1cmwgYW5kIHJldHVybnMgbW9kZWwgKi9cclxuICAgIHBvc3Q8VCBleHRlbmRzIE1vZGVsPih1cmw6IHN0cmluZywgbW9kZWw6IFQsIGY6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG1vZGVsVHlwZTogTW9kZWxUeXBlID0gbW9kZWwubW9kZWxUeXBlO1xyXG4gICAgICAgIHRoaXMuYXBpU2VydmljZS5hdXRocG9zdCh1cmwsIG1vZGVsLCAocmF3ZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1vZGVsIHBvc3RkYXRhIFwiLCByYXdkYXRhKTtcclxuICAgICAgICAgICAgbGV0IHJhdzogUmF3O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TRVJWRVJfUkVUVVJOU19BUlJBWVMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpZCA9IE9iamVjdC5rZXlzKHJhd2RhdGEpWzBdO1xyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgcmF3ID0gcmF3ZGF0YVtpZF07XHJcbiAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgcmF3ID0gcmF3ZGF0YTtcclxuXHJcbiAgICAgICAgICAgIGlmICghcmF3ZGF0YS5yZXR1cm5NdWx0aXBsZSkgey8vb2Jzb2xldGU/XHJcbiAgICAgICAgICAgICAgICBsZXQgcmV0dXJuZWRNb2RlbDogVCA9IHRoaXMubG9hZGVyLmdldDxUPihtb2RlbFR5cGUsIHJhdywgcmF3ZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNjaGVtYSBwb3N0ZGF0YSByZXR1cm5lZCBtb2RlbCBcIiwgcmV0dXJuZWRNb2RlbCk7XHJcbiAgICAgICAgICAgICAgICAvL1RPRE8gQUREIFRPIExJQlJBUllcclxuICAgICAgICAgICAgICAgIGYocmV0dXJuZWRNb2RlbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmV0dXJuZWRNb2RlbDogVCA9IHRoaXMubG9hZGVyLmdldDxUPihtb2RlbFR5cGUsIHJhdywgcmF3ZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWdTZXJ2aWNlLkxJQlJBUllfRU5BQkxFRCAmJiB0aGlzLmxpYnJhcnkuaXNQcmVsb2FkZWQoKSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpYnJhcnkuYWRkUmF3KHJhdywgbW9kZWxUeXBlKTtcclxuICAgICAgICAgICAgICAgIGYocmF3ZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdXQ8VCBleHRlbmRzIE1vZGVsPih1cmw6IHN0cmluZywgbW9kZWw6IFQsIGY6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG1vZGVsVHlwZTogTW9kZWxUeXBlID0gbW9kZWwubW9kZWxUeXBlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2NoZW1hIHB1dFwiLCB1cmwpXHJcblxyXG4gICAgICAgIHRoaXMuYXBpU2VydmljZS5hdXRocHV0KHVybCwgbW9kZWwsIChyYXdkYXRhOiBSYXdIYXNoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vbGV0IHJldHVybmVkTW9kZWwgPSB0aGlzLmJ1aWxkTW9kZWwoZGF0YSwgbW9kZWwubW9kZWxUeXBlKTtcclxuICAgICAgICAgICAgbGV0IGlkO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhPYmplY3Qua2V5cyhyYXdkYXRhKSk7XHJcbiAgICAgICAgICAgIGxldCBrID0gT2JqZWN0LmtleXMocmF3ZGF0YSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmF3OiBSYXc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNFUlZFUl9SRVRVUk5TX0FSUkFZUykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsLl9pZCAmJiBtb2RlbC5faWQgaW4gcmF3ZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICBpZCA9IG1vZGVsLl9pZDtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBpZCA9IGtbMF07XHJcbiAgICAgICAgICAgICAgICByYXcgPSByYXdkYXRhW2lkXTtcclxuICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICByYXcgPSByYXdkYXRhO1xyXG4gICAgICAgICAgICBsZXQgcmV0dXJuZWRNb2RlbDogVCA9IHRoaXMubG9hZGVyLmdldDxUPihtb2RlbFR5cGUsIHJhdywgcmF3ZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2NoZW1hIHB1dGRhdGEgXCIsIHJldHVybmVkTW9kZWwpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWdTZXJ2aWNlLkxJQlJBUllfRU5BQkxFRCAmJiB0aGlzLmxpYnJhcnkuaXNQcmVsb2FkZWQoKSAmJiB0aGlzLmNvbmZpZ1NlcnZpY2UuVVBEQVRFX0FGVEVSX1BPU1RQVVRQQVRDSClcclxuICAgICAgICAgICAgICAgIHRoaXMubGlicmFyeS5jb21wbGV0ZVVwZGF0ZShyYXcsIG1vZGVsVHlwZSk7XHJcbiAgICAgICAgICAgIGYocmV0dXJuZWRNb2RlbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGF0Y2g8VCBleHRlbmRzIE1vZGVsPih1cmwsIG1vZGVsOiBULCByZWZlcmVuY2VSYXc6IFJhdywgZjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNjaGVtYSBwYXRjaCB1cmxcIiwgdXJsKVxyXG4gICAgICAgIGxldCBtb2RlbFR5cGU6IE1vZGVsVHlwZSA9IG1vZGVsLm1vZGVsVHlwZTtcclxuXHJcbiAgICAgICAgdGhpcy5hcGlTZXJ2aWNlLmF1dGhwYXRjaCh1cmwsIG1vZGVsLCByZWZlcmVuY2VSYXcsIChyYXdkYXRhOiBSYXdIYXNoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2NoZW1hIHBhdGNoZGF0YSBcIiwgcmF3ZGF0YSk7XHJcbiAgICAgICAgICAgIGxldCBpZDogT2JqZWN0SWQgPSBtb2RlbC5faWQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmF3OiBSYXc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNFUlZFUl9SRVRVUk5TX0FSUkFZUylcclxuICAgICAgICAgICAgICAgIHJhdyA9IHJhd2RhdGFbaWRdO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByYXcgPSByYXdkYXRhO1xyXG4gICAgICAgICAgICBsZXQgcmV0dXJuZWRNb2RlbDogVCA9IHRoaXMubG9hZGVyLmdldDxUPihtb2RlbC5tb2RlbFR5cGUsIHJhdywgcmF3ZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2NoZW1hIHBhdGNoZGF0YSBcIiwgcmV0dXJuZWRNb2RlbCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZ1NlcnZpY2UuTElCUkFSWV9FTkFCTEVEICYmIHRoaXMubGlicmFyeS5pc1ByZWxvYWRlZCgpICYmIHRoaXMuY29uZmlnU2VydmljZS5VUERBVEVfQUZURVJfUE9TVFBVVFBBVENIKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saWJyYXJ5LnBhcnRpYWxVcGRhdGUocmF3LCBtb2RlbFR5cGUpO1xyXG4gICAgICAgICAgICBmKHJldHVybmVkTW9kZWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKiBnZXQgbWFueSB3aXRoIHVybCBhbmQgcmV0dXJucyBtb2RlbHMgKi9cclxuICAgIGdldEFsbDxUIGV4dGVuZHMgTW9kZWw+KHVybDogc3RyaW5nLCBvcHRpb25zLCBmOiBGdW5jdGlvbiwgbW9kZWxUeXBlOiBNb2RlbFR5cGUpIHtcclxuICAgICAgICB0aGlzLmFwaVNlcnZpY2UuYXV0aGdldCh1cmwsIChyYXdkYXRhOiBSYXdHZXRBbGxIYXNoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTW9kZWxTZXJ2aWNlIGdldEFsbCBkYXRhPVwiLCByYXdkYXRhKTtcclxuICAgICAgICAgICAgbGV0IE06IFRbXVxyXG4gICAgICAgICAgICBpZih0aGlzLlNFUlZFUl9SRVRVUk5TX0FSUkFZUylcclxuICAgICAgICAgICAgTSA9IHRoaXMubG9hZGVyLmdldEFsbDxUPihtb2RlbFR5cGUsIHJhd2RhdGEubWFpbiwgcmF3ZGF0YS5wb3B1bGF0ZWQsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICBNID0gdGhpcy5sb2FkZXIuZ2V0QWxsPFQ+KG1vZGVsVHlwZSwgcmF3ZGF0YSwge30sIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb25zb2xlU2VydmljZS5sb2FkKFwiZ2V0QWxsIFttb2RlbHNdPVwiLCBNLCBNLmxlbmd0aCArIFwiIGl0ZW1zXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWdTZXJ2aWNlLkxJQlJBUllfRU5BQkxFRCAmJiB0aGlzLmxpYnJhcnkuaXNQcmVsb2FkZWQoKSAmJiB0aGlzLmNvbmZpZ1NlcnZpY2UuVVBEQVRFX0FGVEVSX0dFVClcclxuICAgICAgICAgICAgICAgIHRoaXMubGlicmFyeS5wYXJ0aWFsVXBkYXRlQWxsV2l0aFRpbWVzdGFtcChyYXdkYXRhLCBtb2RlbFR5cGUpO1xyXG4gICAgICAgICAgICBmKE0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIGdldCBtYW55IHdpdGggdXJsIGFuZCByZXR1cm5zIG1vZGVscyAqL1xyXG4gICAgZ2V0T25lPFQgZXh0ZW5kcyBNb2RlbD4odXJsOiBzdHJpbmcsIG9wdGlvbnMsIGY6IEZ1bmN0aW9uLCBtb2RlbFR5cGU6IE1vZGVsVHlwZSkge1xyXG5cclxuICAgICAgICB0aGlzLmFwaVNlcnZpY2UuYXV0aGdldCh1cmwsIChyYXdkYXRhczogUmF3SGFzaCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJhd2RhdGFzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTW9kZWxTZXJ2aWNlIGdldE9uZSBidXQgbm8gcmVzdWx0XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGlkO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJhdzogUmF3O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TRVJWRVJfUkVUVVJOU19BUlJBWVMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcIm1haW5cIiBpbiByYXdkYXRhcykgcmF3ZGF0YXMgPSByYXdkYXRhc1tcIm1haW5cIl07XHJcbiAgICAgICAgICAgICAgICBpZCA9IE9iamVjdC5rZXlzKHJhd2RhdGFzKVswXTtcclxuICAgICAgICAgICAgICAgIHJhdyA9IHJhd2RhdGFzW2lkXTtcclxuICAgICAgICAgICAgICAgIHJhdy5faWQgPSBpZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJhdyA9IHJhd2RhdGFzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByZXR1cm5lZE1vZGVsOiBUID0gdGhpcy5sb2FkZXIuZ2V0PFQ+KG1vZGVsVHlwZSwgcmF3LCByYXdkYXRhcywgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZ1NlcnZpY2UuTElCUkFSWV9FTkFCTEVEICYmIHRoaXMubGlicmFyeS5pc1ByZWxvYWRlZCgpICYmIHRoaXMuY29uZmlnU2VydmljZS5VUERBVEVfQUZURVJfR0VUKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saWJyYXJ5LnBhcnRpYWxVcGRhdGVXaXRoVGltZXN0YW1wKHJhdywgbW9kZWxUeXBlKTtcclxuICAgICAgICAgICAgZihyZXR1cm5lZE1vZGVsKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZGVsT25lPFQgZXh0ZW5kcyBNb2RlbD4ocmF3LCBtb2RlbFR5cGU6IE1vZGVsVHlwZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgcmF3Ll9pZCA9IHJhdy5pZDtcclxuICAgICAgICBsZXQgcmV0dXJuZWRNb2RlbDogVCA9IHRoaXMubG9hZGVyLmdldDxUPihtb2RlbFR5cGUsIHJhdywgcmF3LCBvcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gcmV0dXJuZWRNb2RlbDtcclxuICAgIH1cclxufSJdfQ==