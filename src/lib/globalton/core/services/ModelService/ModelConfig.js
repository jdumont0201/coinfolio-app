"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {ApiInterface} from "../ModelService/apiinterface";
var schema_1 = require("../ModelService/schema");
var ModelConfig = (function () {
    function ModelConfig(modelType, clas, modelService, apiService, consoleService, configService) {
        this.clas = clas;
        this.modelService = modelService;
        this.apiService = apiService;
        this.consoleService = consoleService;
        this.configService = configService;
        this.schema = new schema_1.Schema(modelType, modelService, apiService, consoleService, configService);
        //        this.dataAdapter=new DataAdapter(modelService,configService,this.schema);
    }
    ModelConfig.prototype.getInstance = function (rawdata) {
        //let m = new (this.clas)(this.modelService, this.configSerivce);
        var m = new (this.clas)(this.dataAdapter);
        if (rawdata)
            this.modelService.loader.loadObject(rawdata, m);
        return m;
    };
    ModelConfig.prototype.getClass = function () {
        return this.clas;
    };
    return ModelConfig;
}());
exports.ModelConfig = ModelConfig;
//# sourceMappingURL=ModelConfig.js.map