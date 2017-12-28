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
var message_service_1 = require("../services/message.service");
var GenericPartial = (function () {
    function GenericPartial(modelService, messageService) {
        this.modelService = modelService;
        this.messageService = messageService;
    }
    GenericPartial.prototype.cacheLoadOne = function (type, id, options, f) {
        if (!id) {
            console.log("GenericPartial cacheLoadOne error no id");
        }
        else {
            this.modelService.cacheLoadOne(type, id, options, f);
        }
    };
    GenericPartial.prototype.cacheLoadMultiple = function (type, idlist, options, f) {
        this.modelService.cacheLoadMultiple(type, idlist, options, f);
    };
    GenericPartial.prototype.cacheLoad = function (type, options, f) {
        this.modelService.cacheLoadAll(type, options, f);
    };
    return GenericPartial;
}());
GenericPartial = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [Object, message_service_1.MessageService])
], GenericPartial);
exports.GenericPartial = GenericPartial;
//# sourceMappingURL=GenericPartial.js.map