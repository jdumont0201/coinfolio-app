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
var request_service_1 = require("./request.service");
var http_1 = require("@angular/http");
var WikipediaService = (function () {
    function WikipediaService(requestService) {
        this.requestService = requestService;
    }
    WikipediaService.prototype.getSummary = function (title, f) {
        var ftitle = title;
        var url = "https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + ftitle;
        var h = new http_1.Headers();
        h.append("Content-Type", "application/json; charset=UTF-8");
        h.append("Accept", "application/json; charset=UTF-8");
        this.requestService.getWithHeaders(url, h, function (res) {
            f(res);
        });
    };
    return WikipediaService;
}());
WikipediaService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [request_service_1.RequestService])
], WikipediaService);
exports.WikipediaService = WikipediaService;
//# sourceMappingURL=wikipedia.service.js.map