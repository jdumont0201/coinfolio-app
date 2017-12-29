webpackJsonp([0],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_chart_item_component__ = __webpack_require__("../../../../../src/pages/chart-item/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_dashboard_component__ = __webpack_require__("../../../../../src/pages/dashboard/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_allocation_item_component__ = __webpack_require__("../../../../../src/pages/allocation-item/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_news_component__ = __webpack_require__("../../../../../src/pages/news/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_config_all_component__ = __webpack_require__("../../../../../src/pages/config-all/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_account_component__ = __webpack_require__("../../../../../src/pages/account/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_import_component__ = __webpack_require__("../../../../../src/pages/import/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_import_cmc_component__ = __webpack_require__("../../../../../src/pages/import-cmc/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_evolution_item_component__ = __webpack_require__("../../../../../src/pages/evolution-item/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_market_component__ = __webpack_require__("../../../../../src/pages/market/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_generic_component__ = __webpack_require__("../../../../../src/pages/generic/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_symbol_all_component__ = __webpack_require__("../../../../../src/pages/symbol-all/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_symbol_item_component__ = __webpack_require__("../../../../../src/pages/symbol-item/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_config_profile_component__ = __webpack_require__("../../../../../src/pages/config-profile/component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var routes = [
    { path: 'charts', component: __WEBPACK_IMPORTED_MODULE_2__pages_chart_item_component__["a" /* AppChartItemPage */] },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_12__pages_generic_component__["a" /* AppGenericPage */] },
    { path: 'board/:id', component: __WEBPACK_IMPORTED_MODULE_12__pages_generic_component__["a" /* AppGenericPage */] },
    { path: 'listing', component: __WEBPACK_IMPORTED_MODULE_13__pages_symbol_all_component__["a" /* AppSymbolAllPage */] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_3__pages_dashboard_component__["a" /* AppDashboardPage */] },
    { path: 'allocation', component: __WEBPACK_IMPORTED_MODULE_4__pages_allocation_item_component__["a" /* AppAllocationPage */] },
    { path: 'account', component: __WEBPACK_IMPORTED_MODULE_7__pages_account_component__["a" /* AppAccountPage */] },
    { path: 'evolution', component: __WEBPACK_IMPORTED_MODULE_10__pages_evolution_item_component__["a" /* AppEvolutionPage */] },
    { path: 'market', component: __WEBPACK_IMPORTED_MODULE_11__pages_market_component__["a" /* AppMarketPage */] },
    { path: 'config/all', component: __WEBPACK_IMPORTED_MODULE_6__pages_config_all_component__["a" /* AppConfigAllPage */] },
    { path: 'config/profile', component: __WEBPACK_IMPORTED_MODULE_15__pages_config_profile_component__["a" /* AppConfigProfilePage */] },
    { path: 'news', component: __WEBPACK_IMPORTED_MODULE_5__pages_news_component__["a" /* AppNewsPage */] },
    { path: 'symbol/all', component: __WEBPACK_IMPORTED_MODULE_13__pages_symbol_all_component__["a" /* AppSymbolAllPage */] },
    { path: 'generic', component: __WEBPACK_IMPORTED_MODULE_12__pages_generic_component__["a" /* AppGenericPage */] },
    { path: 'symbol/:id', component: __WEBPACK_IMPORTED_MODULE_14__pages_symbol_item_component__["a" /* AppSymbolItemPage */] },
    { path: 'admin/import', component: __WEBPACK_IMPORTED_MODULE_8__pages_import_component__["a" /* AppImportPage */] },
    { path: 'admin/import/marketcap', component: __WEBPACK_IMPORTED_MODULE_9__pages_import_cmc_component__["a" /* AppImportCMCPage */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n\r\n\r\n<mat-sidenav-container fullscreen *ngIf=\"!showPanelCreator\"  >\r\n  <mat-sidenav #sidenav opened=\"true\" disableClose=\"true\" mode=\"side\">\r\n    <app-menu-list></app-menu-list>\r\n  </mat-sidenav>\r\n  <mat-sidenav-content>\r\n    <router-outlet></router-outlet>\r\n  </mat-sidenav-content>\r\n</mat-sidenav-container>\r\n<app-panel-creator  *ngIf=\"showPanelCreator\" [editedPanel]=\"editedPanel\"></app-panel-creator>\r\n<app-subscribe [popup]=\"true\" *ngIf=\"showSubscribe\"></app-subscribe>\r\n\r\n<app-login *ngIf=\"showLogin\"></app-login>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__ = __webpack_require__("../../../../../src/lib/localton/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_event_service__ = __webpack_require__("../../../../../src/lib/localton/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppComponent = (function () {
    function AppComponent(requestService, dataService, eventService, logic, route) {
        var _this = this;
        this.requestService = requestService;
        this.dataService = dataService;
        this.eventService = eventService;
        this.logic = logic;
        this.route = route;
        this.showLogin = false;
        this.showPanelCreator = false;
        this.showSubscribe = false;
        this.editedPanel = null;
        this.eventService.panelCreatorEvent.subscribe(function (val) { return _this.panelCreatorUpdated(val); });
        this.eventService.loginEvent.subscribe(function (val) { return _this.loginUpdated(val); });
        this.eventService.subscribeEvent.subscribe(function (val) { return _this.subscribeUpdated(val); });
        this.eventService.workspaceUpdatedEvent.subscribe(function (val) { return _this.workspaceUpdated(val); });
    }
    AppComponent.prototype.workspaceUpdated = function (val) {
    };
    AppComponent.prototype.panelCreatorUpdated = function (msg) {
        console.log("MAIN > panelCreatorUpdated", msg);
        if (msg && "display" in msg) {
            console.log("MAIN > panelCreatorUpdated display", msg.display);
            this.showPanelCreator = msg.display;
        }
        else if (msg && msg.load) {
            this.editedPanel = msg.load;
        }
        else if (msg && msg.unload) {
            this.editedPanel = null;
        }
    };
    AppComponent.prototype.subscribeUpdated = function (val) {
        this.showSubscribe = val;
    };
    AppComponent.prototype.loginUpdated = function (val) {
        this.showLogin = val;
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_event_service__["a" /* EventService */], __WEBPACK_IMPORTED_MODULE_4__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* ActivatedRoute */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export highchartsModules */
/* unused harmony export RestangularConfigFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_globalton_core_core_module__ = __webpack_require__("../../../../../src/lib/globalton/core/core.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_globalton_ui_ui_module__ = __webpack_require__("../../../../../src/lib/globalton/ui/ui.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_localton_local_module__ = __webpack_require__("../../../../../src/lib/localton/local.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular_highcharts__ = __webpack_require__("../../../../angular-highcharts/angular-highcharts.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_highcharts_modules_stock_src__ = __webpack_require__("../../../../highcharts/modules/stock.src.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_highcharts_modules_stock_src___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_highcharts_modules_stock_src__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_highcharts_modules_exporting_src__ = __webpack_require__("../../../../highcharts/modules/exporting.src.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_highcharts_modules_exporting_src___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_highcharts_modules_exporting_src__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_material_sidenav__ = __webpack_require__("../../../material/esm5/sidenav.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_material_menu__ = __webpack_require__("../../../material/esm5/menu.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_material_icon__ = __webpack_require__("../../../material/esm5/icon.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_material_toolbar__ = __webpack_require__("../../../material/esm5/toolbar.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_material_list__ = __webpack_require__("../../../material/esm5/list.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_material_table__ = __webpack_require__("../../../material/esm5/table.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_material_form_field__ = __webpack_require__("../../../material/esm5/form-field.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_material_card__ = __webpack_require__("../../../material/esm5/card.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_material_grid_list__ = __webpack_require__("../../../material/esm5/grid-list.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_material_datepicker__ = __webpack_require__("../../../material/esm5/datepicker.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__angular_material_paginator__ = __webpack_require__("../../../material/esm5/paginator.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__angular_material_tabs__ = __webpack_require__("../../../material/esm5/tabs.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__angular_material_dialog__ = __webpack_require__("../../../material/esm5/dialog.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_dashboard_component__ = __webpack_require__("../../../../../src/pages/dashboard/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_allocation_item_component__ = __webpack_require__("../../../../../src/pages/allocation-item/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_news_component__ = __webpack_require__("../../../../../src/pages/news/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_chart_item_component__ = __webpack_require__("../../../../../src/pages/chart-item/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_config_all_component__ = __webpack_require__("../../../../../src/pages/config-all/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_account_component__ = __webpack_require__("../../../../../src/pages/account/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_import_component__ = __webpack_require__("../../../../../src/pages/import/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_import_cmc_component__ = __webpack_require__("../../../../../src/pages/import-cmc/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_evolution_item_component__ = __webpack_require__("../../../../../src/pages/evolution-item/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_market_component__ = __webpack_require__("../../../../../src/pages/market/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_generic_component__ = __webpack_require__("../../../../../src/pages/generic/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_symbol_all_component__ = __webpack_require__("../../../../../src/pages/symbol-all/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_symbol_item_component__ = __webpack_require__("../../../../../src/pages/symbol-item/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__canvas_menu_component__ = __webpack_require__("../../../../../src/canvas/menu/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43_angular2_qrcode__ = __webpack_require__("../../../../angular2-qrcode/lib/angular2-qrcode.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__widgets_top_performance_component__ = __webpack_require__("../../../../../src/widgets/top-performance/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__widgets_top_performance_daily_component__ = __webpack_require__("../../../../../src/widgets/top-performance-daily/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__widgets_evolution_table_component__ = __webpack_require__("../../../../../src/widgets/evolution-table/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__widgets_sorted_perf_component__ = __webpack_require__("../../../../../src/widgets/sorted-perf/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__widgets_market_table_component__ = __webpack_require__("../../../../../src/widgets/market-table/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__widgets_perf_lastweek_component__ = __webpack_require__("../../../../../src/widgets/perf-lastweek/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__widgets_trending_lastweek_component__ = __webpack_require__("../../../../../src/widgets/trending-lastweek/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__widgets_cap_lastweek_component__ = __webpack_require__("../../../../../src/widgets/cap-lastweek/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__widgets_price_component__ = __webpack_require__("../../../../../src/widgets/price/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__widgets_marketcap_component__ = __webpack_require__("../../../../../src/widgets/marketcap/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__widgets_pricedivmarket_component__ = __webpack_require__("../../../../../src/widgets/pricedivmarket/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__widgets_volume_component__ = __webpack_require__("../../../../../src/widgets/volume/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__widgets_twitter_component__ = __webpack_require__("../../../../../src/widgets/twitter/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__widgets_headlines_component__ = __webpack_require__("../../../../../src/widgets/headlines/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__components_cryptoicon_component__ = __webpack_require__("../../../../../src/components/cryptoicon/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__widgets_marketcap_evol_component__ = __webpack_require__("../../../../../src/widgets/marketcap-evol/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__components_login_component__ = __webpack_require__("../../../../../src/components/login/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__components_subscribe_component__ = __webpack_require__("../../../../../src/components/subscribe/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__angular_material_stepper__ = __webpack_require__("../../../material/esm5/stepper.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__widgets_marketcap_evol_mini_component__ = __webpack_require__("../../../../../src/widgets/marketcap-evol-mini/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__components_subscriber_feature_component__ = __webpack_require__("../../../../../src/components/subscriber-feature/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__components_register_component__ = __webpack_require__("../../../../../src/components/register/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__pages_config_profile_component__ = __webpack_require__("../../../../../src/pages/config-profile/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__angular_material_snack_bar__ = __webpack_require__("../../../material/esm5/snack-bar.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__components_panel_creator_component__ = __webpack_require__("../../../../../src/components/panel-creator/component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69_ng2_dnd__ = __webpack_require__("../../../../ng2-dnd/ng2-dnd.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70_ngx_restangular__ = __webpack_require__("../../../../ngx-restangular/dist/esm/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70_ngx_restangular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_70_ngx_restangular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__lib_globalton_core_handlers_GlobalErrorHandler__ = __webpack_require__("../../../../../src/lib/globalton/core/handlers/GlobalErrorHandler.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72_angular2_token__ = __webpack_require__("../../../../angular2-token/angular2-token.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72_angular2_token___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_72_angular2_token__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










function highchartsModules() {
    // apply Highstock Modules to this array
    return [__WEBPACK_IMPORTED_MODULE_7_highcharts_modules_stock_src___default.a, __WEBPACK_IMPORTED_MODULE_8_highcharts_modules_exporting_src___default.a];
}



/*MATERIAL*/

















/*PAGES*/













/*CANVAS*/

/*ROUTER*/




//import { Ng4TwitterTimelineModule } from 'ng4-twitter-timeline/lib/index';
/*COMPONENTS*/





























function RestangularConfigFactory(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://34.242.69.165:3000');
    //RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtX3VzZXIifQ.V2Jh0ImjSe1TvDuImncT1nG9W0zh6FFkmh7UhWWeJnI'});
    RestangularProvider.addFullRequestInterceptor(function (element, operation, path, url, headers, params) {
        console.log("[REQ] ", url, "params", params, "headers", headers);
        return {
            params: params,
            headers: headers,
            element: element
        };
    });
    RestangularProvider.addErrorInterceptor(function (response, subject, responseHandler) {
        console.log("error!!", response.status, subject);
        return false;
    });
}
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_40__canvas_menu_component__["a" /* AppMenuList */],
                __WEBPACK_IMPORTED_MODULE_68__components_panel_creator_component__["b" /* AskNameDialog */],
                __WEBPACK_IMPORTED_MODULE_30__pages_chart_item_component__["a" /* AppChartItemPage */], __WEBPACK_IMPORTED_MODULE_27__pages_dashboard_component__["a" /* AppDashboardPage */], __WEBPACK_IMPORTED_MODULE_28__pages_allocation_item_component__["a" /* AppAllocationPage */], __WEBPACK_IMPORTED_MODULE_29__pages_news_component__["a" /* AppNewsPage */], __WEBPACK_IMPORTED_MODULE_32__pages_account_component__["a" /* AppAccountPage */], __WEBPACK_IMPORTED_MODULE_31__pages_config_all_component__["a" /* AppConfigAllPage */], __WEBPACK_IMPORTED_MODULE_33__pages_import_component__["a" /* AppImportPage */], __WEBPACK_IMPORTED_MODULE_35__pages_evolution_item_component__["a" /* AppEvolutionPage */], __WEBPACK_IMPORTED_MODULE_34__pages_import_cmc_component__["a" /* AppImportCMCPage */], __WEBPACK_IMPORTED_MODULE_36__pages_market_component__["a" /* AppMarketPage */], __WEBPACK_IMPORTED_MODULE_39__pages_symbol_item_component__["a" /* AppSymbolItemPage */], __WEBPACK_IMPORTED_MODULE_38__pages_symbol_all_component__["a" /* AppSymbolAllPage */], __WEBPACK_IMPORTED_MODULE_37__pages_generic_component__["a" /* AppGenericPage */],
                __WEBPACK_IMPORTED_MODULE_68__components_panel_creator_component__["a" /* AppPanelCreatorComponent */], __WEBPACK_IMPORTED_MODULE_60__components_login_component__["a" /* AppLoginComponent */], __WEBPACK_IMPORTED_MODULE_64__components_subscriber_feature_component__["a" /* AppSubscriberFeatureComponent */], __WEBPACK_IMPORTED_MODULE_61__components_subscribe_component__["a" /* AppSubscribeComponent */], __WEBPACK_IMPORTED_MODULE_65__components_register_component__["a" /* AppRegisterComponent */], __WEBPACK_IMPORTED_MODULE_66__pages_config_profile_component__["a" /* AppConfigProfilePage */],
                __WEBPACK_IMPORTED_MODULE_58__components_cryptoicon_component__["a" /* AppCryptoIconComponent */], __WEBPACK_IMPORTED_MODULE_59__widgets_marketcap_evol_component__["a" /* AppMarketCapEvolComponent */], __WEBPACK_IMPORTED_MODULE_63__widgets_marketcap_evol_mini_component__["a" /* AppMarketCapEvolMiniComponent */], __WEBPACK_IMPORTED_MODULE_44__widgets_top_performance_component__["a" /* AppTopPerformanceComponent */], __WEBPACK_IMPORTED_MODULE_45__widgets_top_performance_daily_component__["a" /* AppTopPerformanceDailyComponent */], __WEBPACK_IMPORTED_MODULE_57__widgets_headlines_component__["a" /* AppHeadlinesComponent */], __WEBPACK_IMPORTED_MODULE_56__widgets_twitter_component__["a" /* AppTwitterComponent */], __WEBPACK_IMPORTED_MODULE_46__widgets_evolution_table_component__["a" /* AppEvolutionTableComponent */], __WEBPACK_IMPORTED_MODULE_47__widgets_sorted_perf_component__["a" /* AppSortedPerformanceComponent */], __WEBPACK_IMPORTED_MODULE_48__widgets_market_table_component__["a" /* AppMarketCapTableComponent */], __WEBPACK_IMPORTED_MODULE_49__widgets_perf_lastweek_component__["a" /* AppPerfLastWeekComponent */], __WEBPACK_IMPORTED_MODULE_51__widgets_cap_lastweek_component__["a" /* AppCapLastWeekComponent */], __WEBPACK_IMPORTED_MODULE_50__widgets_trending_lastweek_component__["a" /* AppTrendingLastWeekComponent */], __WEBPACK_IMPORTED_MODULE_55__widgets_volume_component__["a" /* AppVolumeComponent */], __WEBPACK_IMPORTED_MODULE_52__widgets_price_component__["a" /* AppPriceComponent */], __WEBPACK_IMPORTED_MODULE_53__widgets_marketcap_component__["a" /* AppMarketCapComponent */], __WEBPACK_IMPORTED_MODULE_54__widgets_pricedivmarket_component__["a" /* AppPriceDivMarketComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                //Ng4TwitterTimelineModule.forRoot(),
                __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */], __WEBPACK_IMPORTED_MODULE_11__angular_forms__["g" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_11__angular_forms__["l" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__lib_globalton_core_core_module__["a" /* GlobaltonCoreModule */],
                __WEBPACK_IMPORTED_MODULE_6_angular_highcharts__["b" /* ChartModule */],
                __WEBPACK_IMPORTED_MODULE_4__lib_globalton_ui_ui_module__["a" /* GlobaltonUIModule */], __WEBPACK_IMPORTED_MODULE_5__lib_localton_local_module__["a" /* LocalModule */],
                __WEBPACK_IMPORTED_MODULE_70_ngx_restangular__["RestangularModule"].forRoot(RestangularConfigFactory),
                __WEBPACK_IMPORTED_MODULE_42__angular_router__["c" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_41__app_routing_module__["b" /* routes */]),
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */], __WEBPACK_IMPORTED_MODULE_69_ng2_dnd__["a" /* DndModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_43_angular2_qrcode__["a" /* QRCodeModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["b" /* MatButtonModule */], __WEBPACK_IMPORTED_MODULE_13__angular_material_sidenav__["a" /* MatSidenavModule */], __WEBPACK_IMPORTED_MODULE_67__angular_material_snack_bar__["b" /* MatSnackBarModule */], __WEBPACK_IMPORTED_MODULE_25__angular_material_tabs__["a" /* MatTabsModule */], __WEBPACK_IMPORTED_MODULE_14__angular_material_menu__["a" /* MatMenuModule */], __WEBPACK_IMPORTED_MODULE_15__angular_material_icon__["a" /* MatIconModule */], __WEBPACK_IMPORTED_MODULE_62__angular_material_stepper__["a" /* MatStepperModule */], __WEBPACK_IMPORTED_MODULE_26__angular_material_dialog__["c" /* MatDialogModule */], __WEBPACK_IMPORTED_MODULE_16__angular_material_toolbar__["a" /* MatToolbarModule */], __WEBPACK_IMPORTED_MODULE_17__angular_material_list__["a" /* MatListModule */], __WEBPACK_IMPORTED_MODULE_18__angular_material_table__["b" /* MatTableModule */], __WEBPACK_IMPORTED_MODULE_12__angular_material__["c" /* MatCheckboxModule */], __WEBPACK_IMPORTED_MODULE_19__angular_material_form_field__["c" /* MatFormFieldModule */], __WEBPACK_IMPORTED_MODULE_24__angular_material_paginator__["a" /* MatPaginatorModule */], __WEBPACK_IMPORTED_MODULE_12__angular_material__["f" /* MatInputModule */], __WEBPACK_IMPORTED_MODULE_20__angular_material_card__["a" /* MatCardModule */], __WEBPACK_IMPORTED_MODULE_21__angular_material_grid_list__["a" /* MatGridListModule */], __WEBPACK_IMPORTED_MODULE_23__angular_material_datepicker__["a" /* MatDatepickerModule */], __WEBPACK_IMPORTED_MODULE_12__angular_material__["g" /* MatNativeDateModule */],
                __WEBPACK_IMPORTED_MODULE_41__app_routing_module__["a" /* AppRoutingModule */]
            ],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_68__components_panel_creator_component__["b" /* AskNameDialog */]],
            providers: [__WEBPACK_IMPORTED_MODULE_22__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_72_angular2_token__["Angular2TokenService"], { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_71__lib_globalton_core_handlers_GlobalErrorHandler__["a" /* GlobalErrorHandler */] },
                { provide: __WEBPACK_IMPORTED_MODULE_6_angular_highcharts__["c" /* HIGHCHARTS_MODULES */], useFactory: highchartsModules }
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/canvas/menu/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMenuList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_event_service__ = __webpack_require__("../../../../../src/lib/localton/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_globalton_core_services_auth_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_localton_services_workspace_service__ = __webpack_require__("../../../../../src/lib/localton/services/workspace.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppMenuList = (function () {
    function AppMenuList(appConfigService, eventService, logic, authService, workspaceService) {
        this.appConfigService = appConfigService;
        this.eventService = eventService;
        this.logic = logic;
        this.authService = authService;
        this.workspaceService = workspaceService;
        this.showLogin = false;
        this.showPanelCreator = false;
        this.showSubscribe = false;
        this.editedPanel = null;
        this.myPanels = {};
        this.panels = [];
        console.log("+MENU");
        this.loadWorkspaceData();
    }
    AppMenuList.prototype.loadWorkspaceData = function () {
        this.currentWorkspace = this.workspaceService.getCurrentWorkspace();
        this.myPanels = this.workspaceService.getPanelsObject();
    };
    AppMenuList.prototype.workspaceUpdated = function (val) {
        this.loadWorkspaceData();
    };
    AppMenuList.prototype.ngOnInit = function () {
        var _this = this;
        this.eventService.workspaceUpdatedEvent.subscribe(function (val) { return _this.workspaceUpdated(val); });
        console.log("MENU WORKSPACES", this.currentWorkspace);
    };
    AppMenuList.prototype.select = function (p) {
        this.selected = p;
    };
    AppMenuList.prototype.addPanel = function () {
        this.eventService.showPanelCreator();
    };
    AppMenuList.prototype.setPanel = function (p) {
        console.log("Set Panel menu");
        this.eventService.setPanel(p);
    };
    AppMenuList = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-menu-list',
            template: __webpack_require__("../../../../../src/canvas/menu/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__["a" /* AppConfigService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_event_service__["a" /* EventService */], __WEBPACK_IMPORTED_MODULE_3__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_4__lib_globalton_core_services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_5__lib_localton_services_workspace_service__["a" /* WorkspaceService */]])
    ], AppMenuList);
    return AppMenuList;
}());



/***/ }),

/***/ "../../../../../src/canvas/menu/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-nav-list>\r\n<div id=\"header\">\r\n  <div class=\"logo-img\"><mat-icon>trending_up</mat-icon></div>\r\n  <div class=\"logo-in\" routerLink=\"/\">\r\n    <span id=\"logo\"> CoinFolio  </span>\r\n    <span id=\"slogan\">Crypto dashboard builder</span>\r\n  </div><br>\r\n\r\n\r\n  <button mat-button routerLink=\"/config/all\">\r\n    <mat-icon>settings</mat-icon>\r\n    {{authService.isAuthenticated()?\"Settings\":\"Sign in\"}}\r\n  </button>\r\n\r\n</div>\r\n\r\n  <div *ngFor=\"let p of currentWorkspace?.panels\" >\r\n\r\n    <div *ngIf=\"myPanels[p].type=='separator'\" mat-list-item class=\"mat-list-item  menu-separator\"> {{myPanels[p].title}}</div>\r\n    <a *ngIf=\" myPanels[p].type=='panel'\"  [routerLink]=\"'/board/'+p\" matLine mat-list-item > {{myPanels[p].title}}</a>\r\n    <a *ngIf=\" myPanels[p].type=='special'\"  [routerLink]=\"appConfigService.specialLinks[myPanels[p].id]\" matLine mat-list-item > {{myPanels[p].title}}</a>\r\n  </div>\r\n\r\n\r\n\r\n  <button mat-button *ngIf=\"authService.isSubscriptionActive()\" (click)=\"addPanel()\" id=\"button-editmode\">Edit dashboards...</button>\r\n  <button mat-button *ngIf=\"!authService.isSubscriptionActive()\"  (click)=\"eventService.showSubscribe()\"  id=\"button-editmode\">Edit dashboards...<span class=\"subscriber-feature\">+</span></button>\r\n\r\n</mat-nav-list>\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/components/cryptoicon/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppCryptoIconComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppCryptoIconComponent = (function () {
    function AppCryptoIconComponent(appConfigService) {
        this.appConfigService = appConfigService;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AppCryptoIconComponent.prototype, "symbol", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AppCryptoIconComponent.prototype, "display", void 0);
    AppCryptoIconComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-crypto-icon',
            template: __webpack_require__("../../../../../src/components/cryptoicon/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__["a" /* AppConfigService */]])
    ], AppCryptoIconComponent);
    return AppCryptoIconComponent;
}());



/***/ }),

/***/ "../../../../../src/components/cryptoicon/template.html":
/***/ (function(module, exports) {

module.exports = "<span *ngIf=\"display=='name'\"><span class=\"crypto-iconed icon-crypto-{{symbol}}\"></span>{{appConfigService.names[symbol]}}</span>\r\n<span *ngIf=\"display=='symbol'\"><span class=\"crypto-iconed icon-crypto-{{symbol}}\"></span>{{symbol}}</span>\r\n<span *ngIf=\"display=='pure'\">{{symbol}}</span>\r\n"

/***/ }),

/***/ "../../../../../src/components/login/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppLoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_event_service__ = __webpack_require__("../../../../../src/lib/localton/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_token__ = __webpack_require__("../../../../angular2-token/angular2-token.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_token___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_token__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_globalton_core_services_api_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/api.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppLoginComponent = (function () {
    function AppLoginComponent(logic, appConfigService, eventService, tokenService, apiService) {
        this.logic = logic;
        this.appConfigService = appConfigService;
        this.eventService = eventService;
        this.tokenService = tokenService;
        this.apiService = apiService;
        this.form = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */]('', {
                validators: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].pattern("[^ @]*@[^ @]*")]
            }),
            password: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */]('', { validators: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].minLength(8)] })
        });
    }
    AppLoginComponent.prototype.submit = function () {
        console.log("Submit");
        var obj = {};
        for (var k in this.form.controls)
            obj[k] = this.form.controls[k].value;
        console.log("CONTROLS", this.form.controls, "OBJ", obj);
        this.logic.registerUser(obj, function (res) {
        });
    };
    AppLoginComponent.prototype.close = function () {
        this.eventService.hideLogin();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AppLoginComponent.prototype, "popup", void 0);
    AppLoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/components/login/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__["a" /* AppConfigService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_event_service__["a" /* EventService */], __WEBPACK_IMPORTED_MODULE_5_angular2_token__["Angular2TokenService"], __WEBPACK_IMPORTED_MODULE_6__lib_globalton_core_services_api_service__["a" /* ApiService */]])
    ], AppLoginComponent);
    return AppLoginComponent;
}());



/***/ }),

/***/ "../../../../../src/components/login/template.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"{{popup?'login':''}}\">\r\n  <div *ngIf=\"popup\" class=\"close\" (click)=\"close()\">X</div>\r\n\r\n  <mat-tab-group>\r\n    <mat-tab label=\"Login\">\r\n\r\n      <h3 class=\"title\">Login</h3>\r\n      <span class=\"info\">You need to login to access this page</span>\r\n      <div class=\"form\">\r\n        <div>\r\n          <mat-form-field>\r\n            <input matInput placeholder=\"email\">\r\n          </mat-form-field>\r\n        </div>\r\n        <div>\r\n          <mat-form-field>\r\n            <input matInput placeholder=\"Enter your password\" [type]=\"hide ? 'password' : 'text'\" type=\"password\" required>\r\n            <mat-icon matSuffix (click)=\"hide = !hide\">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>\r\n          </mat-form-field>\r\n        </div>\r\n        <button mat-raised-button=\"\" color=\"primary\">Send</button>\r\n      </div>\r\n    </mat-tab>\r\n    <mat-tab label=\"Sign up\">\r\n\r\n      <h3 class=\"title\">Sign up</h3><br><br>\r\n\r\n      <div class=\"form\">\r\n        <form [formGroup]=\"form\">\r\n\r\n          <div>\r\n            <mat-form-field><input matInput formControlName=\"email\" placeholder=\"email\" required></mat-form-field>\r\n          </div>\r\n\r\n          <div>\r\n            <mat-form-field>\r\n              <input formControlName=\"password\" matInput placeholder=\"Enter your password\" type=\"password\" required>\r\n              <mat-icon matSuffix (click)=\"hide = !hide\">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>\r\n            </mat-form-field>\r\n          </div>\r\n\r\n          <div>\r\n            <mat-form-field>\r\n              <input matInput placeholder=\"Confirm your password\" [type]=\"password\" type=\"password\" required>\r\n              <mat-icon matSuffix (click)=\"hide = !hide\">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>\r\n            </mat-form-field>\r\n          </div>\r\n          <button mat-raised-button=\"\"  (click)=\"submit()\" color=\"primary\">Send</button>\r\n        </form>\r\n      </div>\r\n    </mat-tab>\r\n  </mat-tab-group>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/components/panel-creator/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppPanelCreatorComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AskNameDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_event_service__ = __webpack_require__("../../../../../src/lib/localton/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_globalton_core_services_console_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/console.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_localton_services_workspace_service__ = __webpack_require__("../../../../../src/lib/localton/services/workspace.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_globalton_core_services_auth_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var AppPanelCreatorComponent = (function () {
    function AppPanelCreatorComponent(logic, appConfigService, eventService, dialog, consoleService, workspaceService, authService, snackBar) {
        var _this = this;
        this.logic = logic;
        this.appConfigService = appConfigService;
        this.eventService = eventService;
        this.dialog = dialog;
        this.consoleService = consoleService;
        this.workspaceService = workspaceService;
        this.authService = authService;
        this.snackBar = snackBar;
        this.mode = "";
        this.nRows = 0;
        this.nTabs = 0;
        this.selectedTab = 0;
        this.myPanels = {};
        this.panels = [];
        this.isNewPanel = true;
        this.selectedLibraryTab = 0;
        this.askedTabName = "";
        this.components = this.appConfigService.widgets;
        this.loadWorkspaceData();
        this.initNewPanel();
        this.readPanel();
        this.eventService.workspaceUpdatedEvent.subscribe(function (val) { return _this.workspaceUpdated(val); });
    }
    AppPanelCreatorComponent.prototype.isSet = function (p) {
        return typeof p == "string";
    };
    AppPanelCreatorComponent.prototype.workspaceUpdated = function (val) {
        this.loadWorkspaceData();
    };
    AppPanelCreatorComponent.prototype.loadWorkspaceData = function () {
        this.myPanels = this.workspaceService.panelsObject;
        this.panels = this.workspaceService.panelsArray;
        this.myWorkspaces = this.workspaceService.getAllWorkspaces();
        this.myWorkspace = this.workspaceService.getCurrentWorkspace();
        console.log("panels", this.panels, "workspace", this.myWorkspace);
    };
    AppPanelCreatorComponent.prototype.ngOnInit = function () {
        if (this.editedPanel)
            this.editPanel(this.editedPanel);
    };
    AppPanelCreatorComponent.prototype.ngAfterViewInit = function () {
        if (this.tabGroup)
            this.consoleService.ui('afterViewInit => ', this.tabGroup.selectedIndex);
    };
    AppPanelCreatorComponent.prototype.libraryTabChange = function (ev) {
        this.selectedLibraryTab = ev.index;
    };
    AppPanelCreatorComponent.prototype.initNewPanel = function () {
        var t = [];
        t.push(this.getNewTabObj(0, "Main"));
        this.panel = { title: "New panel", content: JSON.stringify(t), tabs: t, type: "panel" };
        this.consoleService.ui("init panel", this.panel);
    };
    AppPanelCreatorComponent.prototype.readPanel = function () {
        this.panel.tabs = JSON.parse(this.panel.content);
        this.consoleService.ui("Read Panel", this.panel);
    };
    AppPanelCreatorComponent.prototype.findComponentById = function (id) {
        this.consoleService.ui(id, this.components.find(function (obj) {
            return obj.id === id;
        }));
        return this.components.find(function (obj) {
            return obj.id === id;
        });
    };
    AppPanelCreatorComponent.prototype.findRowByIdInTab = function (id, tabId) {
        var f = function (obj) {
            return obj.id === id;
        };
        for (var i = 0; i < this.panel.tabs[tabId].rows.length; ++i) {
            if (this.panel.tabs[tabId].rows[i].id == id)
                return this.panel.tabs[tabId].rows[i];
        }
    };
    AppPanelCreatorComponent.prototype.findRowById = function (id) {
        for (var i = 0; i < this.panel.tabs.length; ++i) {
            var f = this.findRowByIdInTab(id, i);
            if (f)
                return f;
        }
    };
    AppPanelCreatorComponent.prototype.addComponent = function (id) {
    };
    AppPanelCreatorComponent.prototype.itemDropped = function (event, tabid, rowid) {
        //const row: Row = this.findRowById(rowid)
        var draggedId = event.dragData;
        var dragged = this.findComponentById(draggedId);
        var draggedCopy = {};
        for (var k in dragged)
            draggedCopy[k] = dragged[k];
        this.consoleService.ui(tabid, rowid, event, dragged);
        this.panel.tabs[tabid].rows[rowid].content.push(draggedCopy);
    };
    AppPanelCreatorComponent.prototype.getNewRowObj = function (n) {
        return { id: n, content: [], title: "Row " + (n + 1) };
    };
    AppPanelCreatorComponent.prototype.getNewTabObj = function (n, name) {
        var title = name ? name : ("Tab " + (n + 1));
        return { id: n, rows: [this.getNewRowObj(0)], title: title };
    };
    AppPanelCreatorComponent.prototype.close = function () {
        this.eventService.hidePanelCreator();
    };
    AppPanelCreatorComponent.prototype.addRow = function (tabId) {
        if (!tabId)
            tabId = this.selectedTab;
        this.panel.tabs[tabId].rows.push(this.getNewRowObj(++this.nRows));
    };
    AppPanelCreatorComponent.prototype.getExportedPanel = function (p) {
        if (!p)
            p = this.panel;
        var obj = {};
        for (var k in p) {
            obj[k] = p[k];
        }
        //obj=this.replaceSelectByValue(obj)
        obj.content = JSON.stringify(p.tabs);
        delete obj.tabs;
        return obj;
    };
    AppPanelCreatorComponent.prototype.replaceSelectByValue = function (obj) {
        this.consoleService.ui("REPLACE SELECTS");
        for (var i = 0; i < this.panel.tabs.length; ++i) {
            var t = obj.tabs[i];
            this.consoleService.ui("REPLACE TAB", t);
            for (var j = 0; j < t.rows[j].content.length; ++j) {
                var r = t.rows[j];
                this.consoleService.ui("REPLACE ROW", r, r.content);
                for (var k = 0; k < r.content.length; ++k) {
                    this.consoleService.ui("REPALCE ", r.content[k].symbol, r.content[k].symbolValue);
                    r.content[k].symbol = r.content[k].symbolValue;
                    r.content[k].time = r.content[k].timeValue;
                }
            }
        }
        return obj;
    };
    AppPanelCreatorComponent.prototype.savePanel = function (f) {
        var _this = this;
        this.consoleService.ui("CREATOR > SAVEPANEL", this.panel, this.panel.tabs);
        var obj = this.getExportedPanel();
        this.consoleService.ui(obj);
        this.logic.savePanel(obj, function (res) {
            _this.consoleService.ui("CREATOR > SAVEPANEL res", _this.panel, res);
            _this.refreshPanel(res);
            _this.snackBar.open('Panel saved', null, { duration: 3000 });
            _this.mode = '';
            _this.backup = null;
            if (_this.editedPanel) {
                _this.eventService.unloadPanelCreator();
                _this.eventService.hidePanelCreator();
                f(res);
            }
        });
    };
    AppPanelCreatorComponent.prototype.saveExistingPanel = function (obj, f) {
        var _this = this;
        this.consoleService.ui("CREATOR > SAVEPANEL", this.panel, this.panel.tabs);
        obj = this.getExportedPanel(obj);
        this.consoleService.ui(obj);
        this.logic.savePanel(obj, function (res) {
            _this.consoleService.ui("CREATOR > SAVEPANEL res", _this.panel, res);
            _this.refreshPanel(res);
            f(res);
        });
    };
    AppPanelCreatorComponent.prototype.saveSeparator = function (name) {
        var _this = this;
        this.consoleService.ui("CREATOR > SAVEsEP");
        var obj = { title: name, type: "separator" };
        this.consoleService.ui(obj);
        this.logic.savePanel(obj, function (res) {
            _this.consoleService.ui("CREATOR > SAVESEPes", obj, res);
            _this.snackBar.open('Separator saved', null, { duration: 3000 });
            _this.refreshPanel(res);
        });
    };
    AppPanelCreatorComponent.prototype.saveExistingSeparator = function (obj, f) {
        var _this = this;
        this.consoleService.ui("CREATOR > SAVEsEP");
        this.consoleService.ui(obj);
        this.logic.savePanel(obj, function (res) {
            _this.consoleService.ui("CREATOR > SAVESEPes", obj, res);
            _this.refreshPanel(res);
            f(res);
        });
    };
    AppPanelCreatorComponent.prototype.removeWidget = function (row, item, index) {
        this.consoleService.ui("CREATOR > removeWidget", row, item);
        row.content.splice(index, 1);
    };
    AppPanelCreatorComponent.prototype.refreshPanel = function (p) {
        this.consoleService.ui("CREATOR > refreshPanels", p);
        this.myPanels[p.id] = p;
        var f = false;
        for (var i = 0; i < this.panels.length; ++i)
            if (this.panels[i].id == p.id) {
                f = true;
                this.panels[i] = p;
            }
        if (!f)
            this.panels.push(p);
        if (this.editedPanel)
            this.editedPanel = p;
    };
    AppPanelCreatorComponent.prototype.askName = function (isNew, currentName, tabIndex) {
        var _this = this;
        var name;
        var dialogRef = this.dialog.open(AskNameDialog, { width: '250px', data: { name: isNew ? this.askedTabName : currentName, response: null, title: "Name the tab" } });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.consoleService.ui('The dialog was closed', result);
            if (result && result.response !== "cancel")
                if (isNew)
                    _this.panel.tabs.push(_this.getNewTabObj(_this.nTabs++, result));
                else
                    _this.panel.tabs[tabIndex].title = result;
        });
    };
    AppPanelCreatorComponent.prototype.addTab = function () {
        this.askName(true);
    };
    AppPanelCreatorComponent.prototype.editPanel = function (p) {
        this.consoleService.ui("CREATOR > editPanel", p);
        this.panel = p;
        p.tabs = JSON.parse(p.content);
        this.mode = "create";
        this.backup = this.panel;
    };
    AppPanelCreatorComponent.prototype.editSeparator = function (panelId) {
        var _this = this;
        console.log("wo", this.myWorkspace, this.myPanels, panelId);
        var name = this.myPanels[panelId].title;
        var dialogRef = this.dialog.open(AskNameDialog, { width: '250px', data: { name: name, response: null, title: "Name the separator" } });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.consoleService.ui('The dialog was closed', result);
            if (result && result.response !== "cancel")
                _this.myPanels[panelId].title = result;
            _this.saveExistingSeparator(_this.myPanels[panelId], function (res) {
                _this.snackBar.open('Separator saved', null, { duration: 3000 });
            });
        });
    };
    AppPanelCreatorComponent.prototype.deletePanel = function (index) {
        var _this = this;
        this.consoleService.ui("deletePanel", this.myWorkspace.panels, index);
        this.myWorkspace.panels.splice(index, 1);
        this.saveWorkspace(function (res) {
            _this.snackBar.open('Panel deleted');
        });
    };
    AppPanelCreatorComponent.prototype.createNewBoard = function () {
        this.mode = 'create';
        this.initNewPanel();
    };
    AppPanelCreatorComponent.prototype.archivePanel = function (p) {
        var _this = this;
        this.consoleService.ui("archivePanel", this.myWorkspace.panels);
        this.myPanels[p.id].archived = "true";
        this.saveExistingPanel(p, function (res) {
            _this.snackBar.open('Panel archived');
        });
    };
    AppPanelCreatorComponent.prototype.deleteRow = function (tabindex, rowindex) {
        this.panel.tabs[tabindex].rows.splice(rowindex, 1);
    };
    AppPanelCreatorComponent.prototype.createSeparator = function () {
        var _this = this;
        var name = "";
        var dialogRef = this.dialog.open(AskNameDialog, { width: '250px', data: { name: name, response: null, title: "Name the separator" } });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.consoleService.ui('The dialog was closed', result);
            if (result && result.response !== "cancel") {
                _this.saveSeparator(result);
            }
        });
    };
    AppPanelCreatorComponent.prototype.deleteTab = function () {
        var tabIndex = this.tabGroup._selectedIndex;
        this.panel.tabs.splice(tabIndex, 1);
    };
    AppPanelCreatorComponent.prototype.deleteSeparatordeleteSeparatorFromWorkspace = function (index) {
        var _this = this;
        this.myWorkspace.panels.splice(index, 1);
        this.saveWorkspace(function (res) {
            _this.snackBar.open('Separator deleted', null, {
                duration: 3000
            });
        });
    };
    AppPanelCreatorComponent.prototype.archiveSeparator = function (p) {
        var _this = this;
        console.log("archive", p, this.myPanels);
        this.myPanels[p.id].archived = true;
        this.saveExistingSeparator(this.myPanels[p.id], function (res) {
            _this.snackBar.open('Separator archive', null, { duration: 3000 });
        });
    };
    AppPanelCreatorComponent.prototype.renameTab = function () {
        this.consoleService.ui("this.tabGroup", this.tabGroup);
        var tabIndex = this.tabGroup._selectedIndex;
        var currentName = this.panel.tabs[tabIndex].title;
        this.askName(false, currentName, tabIndex);
    };
    AppPanelCreatorComponent.prototype.tabChanged = function (event) {
        this.consoleService.ui("tabchanged", event);
    };
    AppPanelCreatorComponent.prototype.panelDropped = function (event) {
        var _this = this;
        var panelId = event.dragData;
        if (!this.myWorkspace.panels || this.myWorkspace.panels == "")
            this.myWorkspace.panels = [];
        this.myWorkspace.panels.push(panelId);
        this.consoleService.ui("CREATOR > panelDropped", panelId, this.myWorkspace);
        this.saveWorkspace(function (res) {
            _this.snackBar.open('Panel added', null, { duration: 3000 });
        });
    };
    AppPanelCreatorComponent.prototype.saveWorkspace = function (f) {
        var _this = this;
        this.logic.saveWorkspace(this.myWorkspace, function (res) {
            _this.eventService.workspaceUpdatedEvent.emit({ workspace: res });
            f(res);
        });
    };
    AppPanelCreatorComponent.prototype.cancel = function () {
        if (this.editedPanel) {
            this.eventService.unloadPanelCreator();
            this.eventService.hidePanelCreator();
        }
        else {
            this.panel = this.backup;
        }
        this.mode = "";
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AppPanelCreatorComponent.prototype, "editedPanel", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('tabGroup'),
        __metadata("design:type", Object)
    ], AppPanelCreatorComponent.prototype, "tabGroup", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('tabGroup2'),
        __metadata("design:type", Object)
    ], AppPanelCreatorComponent.prototype, "tabGroup2", void 0);
    AppPanelCreatorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-panel-creator',
            template: __webpack_require__("../../../../../src/components/panel-creator/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__["a" /* AppConfigService */], __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_event_service__["a" /* EventService */], __WEBPACK_IMPORTED_MODULE_4__angular_material__["d" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_5__lib_globalton_core_services_console_service__["a" /* ConsoleService */], __WEBPACK_IMPORTED_MODULE_6__lib_localton_services_workspace_service__["a" /* WorkspaceService */], __WEBPACK_IMPORTED_MODULE_7__lib_globalton_core_services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_4__angular_material__["h" /* MatSnackBar */]])
    ], AppPanelCreatorComponent);
    return AppPanelCreatorComponent;
}());

var AskNameDialog = (function () {
    function AskNameDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    AskNameDialog.prototype.onNoClick = function () {
        this.data.response = "cancel";
        this.dialogRef.close();
    };
    AskNameDialog = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'dialog-askname',
            template: "<h1 mat-dialog-title>{{data.title}}</h1>\n  <div mat-dialog-content>\n\n    <mat-form-field>\n      <input matInput tabindex=\"1\" [(ngModel)]=\"data.name\">\n    </mat-form-field>\n  </div>\n  <div mat-dialog-actions>\n    <button mat-button (click)=\"onNoClick()\">Cancel</button>\n    <button mat-button [mat-dialog-close]=\"data.name\" cdkFocusInitial>Ok</button>\n  </div>",
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_4__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_material__["e" /* MatDialogRef */], Object])
    ], AskNameDialog);
    return AskNameDialog;
}());



/***/ }),

/***/ "../../../../../src/components/panel-creator/template.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"panel-creator\">\r\n  <div id=\"panel-creator-box\">\r\n    <div id=\"panel-creator-workspace\" >\r\n      <div id=\"panel-creator-top\">    Edit mode   </div>\r\n      <button mat-raised-button color=\"primary\" class=\"panel-creator-button-end\" (click)=\"close()\" *ngIf=\"mode==''\">Leave edit mode</button>\r\n      <div *ngIf=\"mode=='create'\">\r\n        <button mat-raised-button color=\"accent\" class=\"save\" (click)=\"savePanel()\">Save panel</button>\r\n        <button mat-raised-button color=\"primary\" class=\"cancel\" (click)=\"cancel()\">Cancel</button>\r\n        <div  class=\"library-separator\">Widget library</div>\r\n        <div class=\"creator-component-list\">\r\n          <div class=\"creator-component draggable\"  dnd-draggable [dragEnabled]=\"true\" [dragData]=\"item.id\"               *ngFor=\"let item of components\">\r\n            <span class=\"grippytall\"  dnd-draggable-handle ></span>\r\n            <div class=\"title\">{{item.title}}</div>\r\n            <div class=\"size\">{{item.size}}</div>\r\n            <button *ngIf=\"false\" mat-button (click)=\"addComponent(item.id)\">Add</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"mode==''\">\r\n      <mat-nav-list  dnd-sortable-container [dropZones]=\"['boxers-zone']\" [sortableData]=\"myWorkspace?.panels\">\r\n        <div *ngFor=\"let p of myWorkspace?.panels; let index=index\" dnd-sortable [sortableIndex]=\"index\">\r\n          <div *ngIf=\"isSet(p)\">\r\n            <div *ngIf=\"myPanels[p].type=='separator'\" mat-list-item class=\"mat-list-item  menu-separator\"> <span   class=\"grippytall\"></span> {{myPanels[p].title}}<br><a class=\"link\" (click)=\"editSeparator(p)\">Rename</a> <a class=\"link\"                                                                                                  (click)=\"deleteSeparatorFromWorkspace(index)\">Remove</a>          </div>\r\n          <div *ngIf=\"myPanels[p].type=='panel'\" (click)=\"editPanel(myPanels[p])\" matLine mat-list-item class=\"mat-list-item \"> <span   class=\"grippytall\"></span> {{myPanels[p].title}}            <br> <a class=\"link\" (click)=\"editPanel(myPanels[p])\">Edit</a> <a class=\"link\"                                                                              (click)=\"deletePanel(index)\">Remove</a>          </div>\r\n          <div *ngIf=\"myPanels[p].type=='special'\" (click)=\"editPanel(myPanels[p])\" matLine mat-list-item class=\"mat-list-item \">  <span   class=\"grippytall\"></span>{{myPanels[p].title}}            <br> <a class=\"link\" (click)=\"editPanel(myPanels[p])\">Edit</a> <a class=\"link\"                                                                              (click)=\"deletePanel(index)\">Remove</a>          </div>\r\n          </div>\r\n          <div *ngIf=\"!isSet(p)\">\r\n            <div  (click)=\"editPanel(p)\" matLine mat-list-item class=\"mat-list-item \"><span  class=\"grippytall\"></span>{{p.title}}      <br> <a class=\"link\" (click)=\"editPanel(p)\">Edit</a> <a class=\"link\"                                                                              (click)=\"deletePanel(index)\">Delete</a>          </div>\r\n          </div>\r\n          </div>\r\n      </mat-nav-list>\r\n      <div id=\"panel-creator-workspace-droppable\" dnd-droppable (onDropSuccess)=\"panelDropped($event)\">Drop panels here        to add to your sidebar...      </div>\r\n      <button *ngIf=\"false\" mat-button (click)=\"isNewPanel=true\">Add new panel</button>\r\n      </div>\r\n    </div>\r\n    <div id=\"panel-creator-panels\">\r\n      <div *ngIf=\"isNewPanel\">\r\n        <div *ngIf=\"mode==''\" style=\"padding: 10px 20px;\">\r\n          <h3 class=\"title\" *ngIf=\"mode==''\">Compose your boards </h3>\r\n          <span class=\"info\">Drag panels by the handle and drop them on the side bar to compose your workspace.</span>\r\n          <div id=\"panel-creator-moded\">\r\n            <div id=\"panel-creator-mypanels-box\">\r\n              <button *ngIf=\"selectedLibraryTab==0\" mat-raised-button color=\"accent\" class=\"newboard\"(click)=\"createNewBoard()\">New board           </button>\r\n              <button *ngIf=\"selectedLibraryTab==1\"  mat-raised-button color=\"accent\" class=\"newboard\" (click)=\"createSeparator()\">New separator</button>\r\n            <mat-tab-group #tabGroup2 (selectedTabChange)=\"libraryTabChange($event)\">\r\n              <mat-tab label=\"My panels\">\r\n\r\n\r\n                <div *ngFor=\"let p of panels; let index=index\">\r\n                  <div [dragEnabled]=\"true\" [dragData]=\"p.id\" dnd-draggable class=\"draggable creator-panel-icon\"   *ngIf=\"!p.archived && p.type=='panel'\"  mat-list-item >\r\n                    <div  dnd-draggable-handle class=\"draghandle\"><span class=\"grippytall\"></span>{{p.title}}</div>\r\n                    <div class=\"paneloptions\"> <a class=\"link\" (click)=\"editPanel(p)\">Edit</a> <a class=\"link\"                                                                                              (click)=\"archivePanel(p)\">Archive</a></div>\r\n                  </div>\r\n                </div>\r\n\r\n              </mat-tab>\r\n              <mat-tab label=\"Separators\">\r\n\r\n                <div *ngFor=\"let p of panels; let index=index\">\r\n                  <div [dragEnabled]=\"true\" [dragData]=\"p.id\" dnd-draggable *ngIf=\"!p.archived && p.type=='separator'\" mat-list-item    class=\"draggable mat-list-item   creator-panel-icon menu-separator\">\r\n                    <div  dnd-draggable-handle class=\"draghandle\"><span  class=\"grippytall\"></span> {{p.title}}</div>\r\n                    <div class=\"paneloptions\">  <a class=\"link\"  (click)=\"editSeparator(p)\">Edit</a>                  <a class=\"link\" (click)=\"archiveSeparator(p)\">Archive</a></div>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n              </mat-tab>\r\n              <mat-tab label=\"Templates\">\r\n                <div *ngFor=\"let p of panels; let index=index\">\r\n                  <a *ngIf=\"p.type=='special'\" [dragEnabled]=\"true\" [dragData]=\"p.id\" dnd-draggable class=\"draggable creator-panel-icon\"  matLine mat-list-item (click)=\"setPanel(p)\">\r\n                    <div  dnd-draggable-handle class=\"draghandle\"><span class=\"grippytall\"></span>{{p.title}}</div>\r\n                    <div class=\"paneloptions\"></div>\r\n                  </a>\r\n                </div>\r\n              </mat-tab>\r\n            </mat-tab-group>\r\n\r\n\r\n          </div>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"mode=='create'\">\r\n          <div class=\"creator-panel-edit-box\">\r\n            <div class=\"creator-panel\">\r\n              <input class=\"title editable-text\" type=\"text\" [(ngModel)]=\"panel.title\"/><br>\r\n              <mat-tab-group  (selectedTabChange)=\"tabChanged($event)\" #tabGroup>\r\n                <mat-tab label=\"{{tab.title}}\" *ngFor=\"let tab of panel.tabs ; let tabindex = index\">\r\n                  <button mat-raised-button (click)=\"addTab()\">Add tab</button>\r\n                  <button mat-raised-button (click)=\"deleteTab()\">Delete tab</button>\r\n                  <button mat-raised-button (click)=\"renameTab()\">Rename active tab</button><br>\r\n                  <ul>\r\n                    <li *ngFor=\"let row of tab.rows ; let rowindex = index\">\r\n                      <div class=\"creator-panel-line-title\"><input class=\"editable-text\" type=\"text\"  [(ngModel)]=\"row.title\"/><br> <button mat-button (click)=\"deleteRow(tabindex,index)\">Delete row</button><br> </div>\r\n                      <div class=\"creator-panel-line-drop\">\r\n                        <div class=\"creator-panel-line-ph\" dnd-droppable (onDropSuccess)=\"itemDropped($event,tabindex,rowindex)\">\r\n                          <div *ngIf=\"row.content.length>0\" class=\"creator-panel-line-existing\">\r\n                            <div class=\"creator-component\"  dnd-draggable [dragEnabled]=\"true\" [dragData]=\"item.id\" *ngFor=\"let item of row.content; let index = index\" >\r\n                              <span class=\"grippytall\"  dnd-draggable-handle ></span>\r\n                              <div class=\"xclose\" (click)=\"removeWidget(row,item,index)\">X</div>\r\n                              <div class=\"title\">{{item.title}}</div>\r\n                              <div class=\"param\" *ngIf=\"appConfigService.widgetConfig[item.code].time\"><label>Time</label><select  [(ngModel)]=\"item.time\" >    <option *ngFor=\"let s of appConfigService.times\">{{s}}</option>                              </select></div>\r\n                              <div class=\"param\" *ngIf=\"appConfigService.widgetConfig[item.code].symbol\"><label>Symbol</label><select [(ngModel)]=\"item.symbol\" ><option *ngFor=\"let s of appConfigService.valuesandglobal\">{{s}}</option>                              </select></div>\r\n                              <div class=\"param\" *ngIf=\"appConfigService.widgetConfig[item.code].format\"><label>Format</label><select [(ngModel)]=\"item.format\" ><option *ngFor=\"let s of appConfigService.formats\">{{s}}</option>                              </select></div>\r\n                            </div>\r\n                          </div>\r\n                          <span>Drop components here...</span>\r\n                        </div>\r\n                      </div>\r\n                    </li>\r\n\r\n                  </ul>\r\n                  <button mat-button (click)=\"addRow()\">Add row</button><br>\r\n                </mat-tab>\r\n              </mat-tab-group>\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/components/register/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRegisterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_event_service__ = __webpack_require__("../../../../../src/lib/localton/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_token__ = __webpack_require__("../../../../angular2-token/angular2-token.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_token___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_token__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_globalton_core_services_api_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/api.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppRegisterComponent = (function () {
    function AppRegisterComponent(logic, appConfigService, eventService, tokenService, apiService) {
        this.logic = logic;
        this.appConfigService = appConfigService;
        this.eventService = eventService;
        this.tokenService = tokenService;
        this.apiService = apiService;
        this.form = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */]('', {
                validators: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].pattern("[^ @]*@[^ @]*")],
                updateOn: 'submit'
            }),
            password: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */]('', { validators: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].minLength(8)], updateOn: 'submit' })
        });
    }
    AppRegisterComponent.prototype.submit = function () {
        console.log("Submit");
        var obj = {};
        for (var k in this.form.controls)
            obj[k] = this.form.controls[k].value;
        console.log("CONTROLS", this.form.controls, "OBJ", obj);
        this.logic.registerUser(obj, function (res) {
        });
    };
    AppRegisterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-register',
            template: __webpack_require__("../../../../../src/components/register/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__["a" /* AppConfigService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_event_service__["a" /* EventService */], __WEBPACK_IMPORTED_MODULE_5_angular2_token__["Angular2TokenService"], __WEBPACK_IMPORTED_MODULE_6__lib_globalton_core_services_api_service__["a" /* ApiService */]])
    ], AppRegisterComponent);
    return AppRegisterComponent;
}());



/***/ }),

/***/ "../../../../../src/components/register/template.html":
/***/ (function(module, exports) {

module.exports = "      <div class=\"form\">\r\n        <form [formGroup]=\"form\">\r\n          <div>\r\n            <mat-form-field><input matInput formControlName=\"email\" placeholder=\"email\" required></mat-form-field>\r\n          </div>\r\n          <div>\r\n            <mat-form-field>\r\n              <input formControlName=\"password\" matInput placeholder=\"Enter your password\" type=\"password\" required>\r\n              <mat-icon matSuffix (click)=\"hide = !hide\">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>\r\n            </mat-form-field>\r\n          </div>\r\n          <div>\r\n            <mat-form-field>\r\n              <input matInput placeholder=\"Confirm your password\" [type]=\"password\">\r\n              <mat-icon matSuffix (click)=\"hide = !hide\">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>\r\n            </mat-form-field>\r\n          </div>\r\n          <button mat-raised-button=\"\"  (click)=\"submit()\" color=\"primary\">Send</button>\r\n        </form>\r\n      </div>\r\n"

/***/ }),

/***/ "../../../../../src/components/subscribe/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppSubscribeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_event_service__ = __webpack_require__("../../../../../src/lib/localton/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_token__ = __webpack_require__("../../../../angular2-token/angular2-token.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_token___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_token__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_globalton_core_services_api_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_globalton_core_services_auth_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AppSubscribeComponent = (function () {
    function AppSubscribeComponent(logic, fb, authService, appConfigService, eventService, tokenService, apiService, requestService) {
        var _this = this;
        this.logic = logic;
        this.fb = fb;
        this.authService = authService;
        this.appConfigService = appConfigService;
        this.eventService = eventService;
        this.tokenService = tokenService;
        this.apiService = apiService;
        this.requestService = requestService;
        this.isPaid = false;
        this.isPlanSelected = false;
        this.amount = 0;
        this.qrcode = "";
        this.retryCheck = 3000;
        this.logic.getPlans(function (res) {
            console.log("plans", res);
            _this.plans = res;
        });
    }
    AppSubscribeComponent.prototype.close = function () {
        this.eventService.hideSubscribe();
    };
    AppSubscribeComponent.prototype.startCheckPaymentLoop = function () {
        var _this = this;
        console.log("Start loop");
        var isPaymentReceived = false;
        this.interval = window.setInterval(function () {
            if (!_this.isPaid)
                _this.logic.checkBitcoinPayment(_this.paymentId, function (res) {
                    _this.paymentStatus = res;
                    _this.isPaid = res.payment == "paid";
                    if (_this.isPaid) {
                        _this.authService.paymentExpiration = res.expiration;
                    }
                    _this.stepper.next();
                });
            //setTimeout(()=>{this.retryCheck=2000;setTimeout(()=>{this.retryCheck=1000},1000);setTimeout(()=>{this.retryCheck=0},1000);setTimeout(()=>{this.retryCheck=3000},1000)},1000)
        }, 3000);
    };
    AppSubscribeComponent.prototype.processChoice = function (p) {
        this.bitcoinAddress = "";
        this.qrcode = "";
        this.amount = 0;
        this.planSelected = p.id;
        this.isPlanSelected = true;
        clearInterval(this.interval);
        this.stepper.next();
        if (this.authService.isAuthenticated())
            this.prePay();
    };
    AppSubscribeComponent.prototype.setCountDown = function (expiration) {
        var _this = this;
        this.addressExpiration = expiration;
        clearInterval(this.expirationInterval);
        this.expirationInterval = window.setInterval(function () {
            _this.addressExpirationCountdown = -Math.round((new Date().getTime() - _this.addressExpiration) / 1000);
            _this.addressExpirationCountdownMin = Math.floor(_this.addressExpirationCountdown / 60);
            _this.addressExpirationCountdownSec = _this.addressExpirationCountdown - 60 * _this.addressExpirationCountdownMin;
        }, 1000);
    };
    AppSubscribeComponent.prototype.loadQRCode = function () {
        this.qrcode = "bitcoin:" + this.bitcoinAddress + "?amount=" + this.amount;
    };
    AppSubscribeComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.interval);
    };
    AppSubscribeComponent.prototype.ngOnInit = function () {
        this.form = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */]('', {
                validators: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].pattern("[^ @]*@[^ @]*")]
            }),
            password: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */]('', { validators: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].minLength(8)] })
        });
    };
    AppSubscribeComponent.prototype.prePay = function () {
        var _this = this;
        this.logic.generateAddress(this.planSelected, function (obj) {
            _this.bitcoinAddress = obj.address;
            _this.amount = obj.amount;
            _this.paymentId = obj.paymentId;
            _this.setCountDown(obj.expiration);
            _this.loadQRCode();
            _this.startCheckPaymentLoop();
        });
    };
    /*********************************
     * FORM
     **********************************/
    AppSubscribeComponent.prototype.submit = function () {
        var _this = this;
        setTimeout(function () {
            var obj = _this.form.value;
            _this.logic.registerUser(obj, function (res) {
                if (res.success) {
                    _this.stepper.next();
                    _this.prePay();
                }
            });
        }, 1000);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AppSubscribeComponent.prototype, "popup", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('stepper'),
        __metadata("design:type", Object)
    ], AppSubscribeComponent.prototype, "stepper", void 0);
    AppSubscribeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-subscribe',
            template: __webpack_require__("../../../../../src/components/subscribe/template.html"),
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_8__lib_globalton_core_services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__["a" /* AppConfigService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_event_service__["a" /* EventService */], __WEBPACK_IMPORTED_MODULE_5_angular2_token__["Angular2TokenService"], __WEBPACK_IMPORTED_MODULE_6__lib_globalton_core_services_api_service__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_7__lib_globalton_core_services_request_service__["a" /* RequestService */]])
    ], AppSubscribeComponent);
    return AppSubscribeComponent;
}());



/***/ }),

/***/ "../../../../../src/components/subscribe/template.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"{{popup?'subscribe':''}}\">\r\n  <div *ngIf=\"popup\" class=\"close\" (click)=\"close()\">X</div>\r\n\r\n\r\n  <h3 class=\"title\">Subscribe</h3>\r\n\r\nYou are trying to access a Plus feature. Plus features are premium features marked with <span  class=\"subscriber-feature\">+</span>&nbsp;&nbsp;&nbsp;icons.<br><br>\r\n  <mat-horizontal-stepper [linear]=\"true\" #stepper>\r\n    <mat-step label=\"Choose plan\">\r\n\r\n      <h3>All features from $19/mo</h3>\r\n      <ul>\r\n        <li><h4>Access a wide collection of widgets</h4>Edit data panels <button mat-button >View all</button></li>\r\n        <li><h4>Access exclusive dashboards</h4>Edit data panels <button mat-button >View all</button></li>\r\n        <li><h4>Customize data display</h4>Edit data panels</li>\r\n        <li><h4>Build your data boards</h4>Create custom panels with all the widgets</li>\r\n        <li><h4>Receive alerts</h4>\r\n          <span>Receive alerts</span></li>\r\n        <li></li>\r\n      </ul>\r\n      <br>\r\n\r\n      <h3>Choose a plan</h3>\r\n      <div class=\"subscribe-plans\">\r\n        <button mat-raised-button *ngFor=\"let p of plans\" [color]=\"planSelected==p.id?'accent':'primary'\" (click)=\"processChoice(p,stepper)\">{{p.name}} at\r\n          ${{p.amount}} - {{p.btcamount}}BTC\r\n        </button>\r\n\r\n      </div>\r\n\r\n    </mat-step>\r\n\r\n    <mat-step label=\"Sign up\" *ngIf=\"!authService.isAuthenticated()\">\r\n      <div class=\"form\">\r\n\r\n        <form [formGroup]=\"form\">\r\n          <div>\r\n            <mat-form-field><input  name=\"email\" matInput [formControlName]=\"'email'\" placeholder=\"email\" required></mat-form-field>\r\n          </div>\r\n          <div>\r\n            <mat-form-field>\r\n              <input formControlName=\"password\" name=\"password\" matInput placeholder=\"Enter your password\" type=\"password\" required>\r\n              <mat-icon matSuffix (click)=\"hide = !hide\">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>\r\n            </mat-form-field>\r\n          </div>\r\n          <div>\r\n            <mat-form-field>\r\n              <input matInput placeholder=\"Confirm your password\" type=\"password\" required>\r\n              <mat-icon matSuffix (click)=\"hide = !hide\">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>\r\n            </mat-form-field>\r\n          </div>\r\n          <button mat-raised-button=\"\" [disabled]=\"!form.valid\" (click)=\"submit()\" color=\"primary\">Continue</button>\r\n        </form>\r\n      </div>\r\n\r\n    </mat-step>\r\n    <mat-step label=\"Pay\">\r\n      Send payment to this address:\r\n      <div class=\"subscribe-address\">\r\n        <div>{{bitcoinAddress}}</div>\r\n        <div>Amount: {{amount}} BTC</div>\r\n\r\n\r\n        <qr-code *ngIf=\"qrcode\" [value]=\"qrcode\" [size]=\"150\"></qr-code>\r\n        <div *ngIf=\"addressExpirationCountdown\">The address will expire in {{addressExpirationCountdownMin}}min\r\n          {{addressExpirationCountdownSec}}s\r\n        </div>\r\n      </div><br>\r\n      The transaction will be automatically scanned until confirmation.<br><br><br>\r\n      Status: {{isPaid?\"Paid\":\"Waiting for payment confirmation\"}}<br>\r\n      Balance: {{paymentStatus?paymentStatus?.balance:\"Checking...\"}}\r\n\r\n    </mat-step>\r\n    <mat-step label=\"Confirmed !\">\r\n      <h3>Payment status</h3>\r\n      <div>\r\n        Status: {{isPaid?\"Paid\":\"Waiting for payment confirmation\"}}<br>\r\n        Balance: {{paymentStatus?.balance}}\r\n\r\n        <div *ngIf=\"isPaid\">Your payment has been received. Thank you for subscribing. <br>\r\n          <div class=\"centered\">\r\n          <button class=\"centered\" mat-raised-button color=\"primary\">Continue to premium account</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </mat-step>\r\n\r\n  </mat-horizontal-stepper>\r\n\r\n\r\n\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/components/subscriber-feature/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppSubscriberFeatureComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_globalton_core_services_auth_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_event_service__ = __webpack_require__("../../../../../src/lib/localton/services/event.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppSubscriberFeatureComponent = (function () {
    function AppSubscriberFeatureComponent(appConfigService, authService, eventService) {
        this.appConfigService = appConfigService;
        this.authService = authService;
        this.eventService = eventService;
    }
    AppSubscriberFeatureComponent.prototype.showSubscribe = function () {
        console.log("subscribe");
        this.eventService.showSubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AppSubscriberFeatureComponent.prototype, "text", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AppSubscriberFeatureComponent.prototype, "event", void 0);
    AppSubscriberFeatureComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-plus-icon',
            template: __webpack_require__("../../../../../src/components/subscriber-feature/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__["a" /* AppConfigService */], __WEBPACK_IMPORTED_MODULE_2__lib_globalton_core_services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_event_service__["a" /* EventService */]])
    ], AppSubscriberFeatureComponent);
    return AppSubscriberFeatureComponent;
}());



/***/ }),

/***/ "../../../../../src/components/subscriber-feature/template.html":
/***/ (function(module, exports) {

module.exports = "\r\n<button *ngIf=\"authService.isSubscriptionActive()\" (click)=\"apply(event)\" mat-button ><ng-content></ng-content></button>\r\n<button *ngIf=\"!authService.isSubscriptionActive()\" (click)=\"showSubscribe()\" mat-button ><ng-content></ng-content><span  class=\"subscriber-feature\">+</span></button>\r\n"

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/lib/globalton/core/core.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobaltonCoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_console_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/console.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_message_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_config_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_api_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_auth_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/@ngx-translate/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ngx_facebook__ = __webpack_require__("../../../../ngx-facebook/dist/esm/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_currency_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/currency.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var GlobaltonCoreModule = (function () {
    function GlobaltonCoreModule() {
    }
    GlobaltonCoreModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */]
                /*TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [Http]
                    }
                })*/
                // NativeScriptModule
                //        IonicModule.forRoot(null)
            ],
            declarations: [],
            exports: [],
            entryComponents: [],
            providers: [__WEBPACK_IMPORTED_MODULE_3__services_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_7__services_api_service__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_8__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_10_ngx_facebook__["a" /* FacebookService */], __WEBPACK_IMPORTED_MODULE_11__services_currency_service__["a" /* CurrencyService */], __WEBPACK_IMPORTED_MODULE_4__services_console_service__["a" /* ConsoleService */], __WEBPACK_IMPORTED_MODULE_5__services_message_service__["a" /* MessageService */], __WEBPACK_IMPORTED_MODULE_6__services_config_service__["a" /* ConfigService */]]
        })
    ], GlobaltonCoreModule);
    return GlobaltonCoreModule;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/core/handlers/GlobalErrorHandler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalErrorHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GlobalErrorHandler = (function () {
    function GlobalErrorHandler() {
    }
    GlobalErrorHandler.prototype.handleError = function (error) {
        // IMPORTANT: Rethrow the error otherwise it gets swallowed
        throw error;
    };
    GlobalErrorHandler = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], GlobalErrorHandler);
    return GlobalErrorHandler;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/core/interfaces/interfaces.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopulableItem; });
var PopulableItem = (function () {
    function PopulableItem(val) {
        this.val = val;
        this.populated = (typeof val !== "string");
        //  this.addProperties();
    }
    PopulableItem.prototype.addProperties = function () {
        if (this.populated) {
            var df = this.val.datafields;
            var _loop_1 = function (i, n) {
                var key = df[i];
                Object.defineProperty(this_1, key, {
                    get: function () { return this.val[key]; },
                    set: function (value) { this.val[key] = value; }
                });
            };
            var this_1 = this;
            for (var i = 0, n = df.length; i < n; ++i) {
                _loop_1(i, n);
            }
        }
    };
    PopulableItem.prototype.getObjectId = function () {
        //Assert.exists(this.val);
        if (!this.val)
            return null;
        if (this.val._id)
            return this.val._id;
        else
            return this.val;
    };
    PopulableItem.prototype.getObject = function () {
        if (this.val._id)
            return this.val;
        else
            return {}; //<ObjectId>this.item;
    };
    PopulableItem.prototype.isPopulated = function () {
        return this.isPopulated;
    };
    PopulableItem.prototype.set = function (v) {
        this.val = v;
        this.populated = (typeof v !== "string");
        //  this.addProperties();
    };
    PopulableItem.prototype.toString = function () {
        return this.getObjectId();
    };
    return PopulableItem;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/core/services/api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__console_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/console.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/timeout.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_retry__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/retry.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ApiService = (function () {
    function ApiService(http, messageService, consoleService, configService) {
        this.http = http;
        this.messageService = messageService;
        this.consoleService = consoleService;
        this.configService = configService;
        this.errorsChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.pingOnError = false;
        this.isUp = false;
        this.consoleService.serv("+ ApiService");
        this.timeout = configService.API_TIMEOUT;
        this.retry = configService.API_NB_RETRY;
        this.baseurl = this.configService.apiURL;
    }
    ApiService.prototype.setApiUrl = function (v) {
        this.baseurl = v;
    };
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
        if (!err) {
            this.messageService.addError("API_ERROR", null, "No error desc available");
            return;
        }
        if (err.name === "TimeoutError") {
            this.messageService.addError("API_DOWN", null, "API is unreachable.");
        }
        else if (err.message === "Unauthorized") {
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
        var ser = typeof model == "object" ? JSON.stringify(model) : model.serialize();
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
        var ser = typeof model == "object" ? JSON.stringify(model) : model.serialize();
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
        var ser = typeof model == "object" ? JSON.stringify(model) : model.serialize();
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
        this.consoleService.post("Posting", url, "seralized", raw, "headers", headers);
        this.messageService.showSaving();
        this.http.post(url, raw, { headers: headers })
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
            .timeout(this.timeout)
            .retry(this.retry)
            .subscribe(function (data) { return _this.processData(data, f); }, function (err) { return _this.processError("API_GET", err); }, 
        // err => this.error(err),
        function () { return console.log('Done.'); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], ApiService.prototype, "errorsChanged", void 0);
    ApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1__message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_2__console_service__["a" /* ConsoleService */],
            __WEBPACK_IMPORTED_MODULE_3__config_service__["a" /* ConfigService */]])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/core/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_facebook__ = __webpack_require__("../../../../ngx-facebook/dist/esm/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/timeout.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__message_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_currency_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/currency.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__console_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/console.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__config_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__api_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/@ngx-translate/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








//SERVICES





//import {TranslateService} from './translate.service';


var AuthService = (function () {
    function AuthService(http, messageService, fb, consoleService, translateService, currencyService, apiService, configService, requestService) {
        var _this = this;
        this.http = http;
        this.messageService = messageService;
        this.fb = fb;
        this.consoleService = consoleService;
        this.translateService = translateService;
        this.currencyService = currencyService;
        this.apiService = apiService;
        this.configService = configService;
        this.requestService = requestService;
        this.loginChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.loginHeaderChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.isPostConfigured = false;
        this.authenticated = false;
        this.isTourDone = false;
        this.FB_initParams = {
            appId: '276517919486522',
            xfbml: true,
            version: 'v2.8'
        };
        this.consoleService.serv("+ AuthService");
        this.baseurl = this.configService.getApiUrl();
        this.configService.perSiteConfigured.subscribe(function (value) { return _this.postConfigEvent(value); }, function (error) { return console.log("Error postConfigEvent" + error); }, function () { return console.log('done'); });
        this.createNoAuthHeaders();
        this.apiService.setAuthService(this, function () {
            _this.apiService.ping(function () {
            });
        });
        this.initFB();
    }
    //WHEN CONFIG IS DONE
    AuthService.prototype.postConfigEvent = function (value) {
        console.log("auth.service postconfigevent", value);
        if (value.type == "general") {
            this.CONTENT_AUTHENTIFICATION = value.CONTENT_AUTHENTIFICATION;
            this.setLocalStorageKey();
            var jwt = localStorage.getItem(this.localStorageKey);
            if (jwt !== null) {
                this.consoleService.log("has local storage");
                this.setTokenFromLocalStorage();
                this.postLogin();
            }
            else {
                this.consoleService.auth("No Local Storage");
            }
            this.isPostConfigured = true;
        }
    };
    AuthService.prototype.setLocalStorageKey = function () {
        var sitename = this.configService.sitename;
        var appname = this.configService.app;
        if (appname) {
            this.localStorageKey = sitename + "-" + appname + "-jwt";
        }
        else {
            console.error("Error no app name");
        }
    };
    AuthService.prototype.getStoredUserId = function () {
        if (!this.userId)
            console.error("Stored userid undefined");
        return this.userId;
    };
    AuthService.prototype.getUserId = function (f) {
        f(this.userId);
    };
    AuthService.prototype.loadFromLoginResponse = function () {
        this.timezone = this.loginResponse.timezone;
        this.currencyService.setCurrency(this.loginResponse.currency);
        this.translateService.use(this.loginResponse.lang);
        this.user = this.loginResponse.user;
        this.userId = this.loginResponse.userId;
        this.entityId = this.loginResponse.entityId;
        this.token = this.loginResponse.token;
        this.cartId = this.loginResponse.cartId;
    };
    AuthService.prototype.postLogin = function () {
        console.log("postlogin", this.loginResponse);
        this.loadFromLoginResponse();
        this.createAuthHeaders();
        this.authenticated = true;
        console.log("postlogin userid=", this.userId, "authenticated=", this.authenticated);
        this.configService.setEntityPrefix("entity/" + this.entityId + "/");
        this.emitAuthStatus();
        this.updateLocalStorage();
    };
    AuthService.prototype.processError = function (err, f) {
        console.log("proceseerror");
        this.messageService.addError("AUTH", err);
        f({ error: true, desc: err, user: null });
    };
    AuthService.prototype.getToken = function () {
        return this.token;
    };
    AuthService.prototype.isSubscriptionActive = function () {
        return true;
        // return this.authenticated && this.paymentExpiration && this.paymentExpiration>new Date().getTime()/1000
    };
    AuthService.prototype.isAuthenticated = function () {
        return this.authenticated;
    };
    AuthService.prototype.setTokenFromLocalStorage = function () {
        this.loginResponse = JSON.parse(localStorage.getItem(this.localStorageKey));
        if (this.loginResponse) {
            console.log("loginResponseFromLocalstorage", this.loginResponse);
            this.loadFromLoginResponse();
            return true;
        }
        return false;
        //this.decodedJwt = this.token && jwt_decode(this.token);
    };
    AuthService.prototype.updateLocalStorage = function () {
        this.loginResponse.currency = this.currencyService.getUserCurrency();
        this.loginResponse.lang = this.translateService.currentLang;
        console.log("updateLocal", this.loginResponse);
        var localStorageLoginResponse = JSON.stringify(this.loginResponse);
        localStorage.setItem(this.localStorageKey, localStorageLoginResponse);
    };
    AuthService.prototype.processLogin = function (data, rememberme, f) {
        console.log(" > authService processLogin");
        if (data.error) {
            f({ error: data.error, errordesc: data.errordesc, user: null });
        }
        else {
            if (!data.success) {
                f({ error: false, success: false, user: data });
            }
            else {
                console.log("login:logged:response", data);
                this.loginResponse = data;
                this.token = data.token;
                if (rememberme) {
                    var localStorageLoginResponse = JSON.stringify(this.loginResponse);
                    localStorage.setItem(this.localStorageKey, localStorageLoginResponse);
                }
                this.isTourDone = data.istourdone;
                this.postLogin();
                f({ error: false, success: true, user: data });
            }
        }
    };
    AuthService.prototype.processLoginFB = function (data, f) {
        console.log(" > authService processLoginFB", data);
        if (data.error) {
            f({ error: data.error, errordesc: data.errordesc, user: null });
        }
        else {
            if (!data.success) {
                console.log("no success");
                f({ error: false, success: false, user: data });
            }
            else {
                console.log("login:logged:response", data);
                this.loginResponse = data.data;
                this.token = data.token;
                if (true) {
                    var localStorageLoginResponse = JSON.stringify(this.loginResponse);
                    localStorage.setItem(this.localStorageKey, localStorageLoginResponse);
                }
                this.isTourDone = data.istourdone;
                this.postLogin();
                f({ error: false, success: true, user: data });
            }
        }
    };
    AuthService.prototype.createAuthHeaders = function () {
        console.log(" > authService createAuthHeaders");
        this.authGetHeaders = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpHeaders */]();
        if (this.token) {
            this.authGetHeaders = this.authGetHeaders.set('Authorization', this.token);
        }
        else {
            console.warn(" > authService createAuthHeaders token not set");
        }
        this.authGetHeaders = this.authGetHeaders.set('Content-Type', 'application/json');
        this.authPostHeaders = this.authGetHeaders;
        console.log("AUTH headers", this.authPostHeaders);
    };
    AuthService.prototype.createNoAuthHeaders = function () {
        console.log(" > authService createNoAuthHeaders");
        this.noauthPostHeaders = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpHeaders */]();
        this.noauthPostHeaders = this.noauthPostHeaders.set('Content-Type', 'application/json');
        this.noauthGetHeaders = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpHeaders */]();
        this.noauthGetHeaders = this.noauthGetHeaders.set('Content-Type', 'application/json');
        if (!this.authGetHeaders) {
            this.authGetHeaders = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpHeaders */]();
            this.authGetHeaders = this.authGetHeaders.set('Content-Type', 'application/json');
        }
        if (!this.authPostHeaders) {
            this.authPostHeaders = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpHeaders */]();
            this.authPostHeaders = this.authPostHeaders.set('Content-Type', 'application/json');
        }
    };
    AuthService.prototype.emitAuthStatus = function () {
        console.log("authService emitAuthStatus user=", this.user, "auth=", this.authenticated);
        this.loginChanged.emit({ authentificated: this.authenticated, isTourDone: this.isTourDone, user: this.user });
    };
    AuthService.prototype.logError = function (err) {
        console.error('There was an error: ' + err);
    };
    AuthService.prototype.doLogout = function () {
        this.authenticated = false;
        this.token = null;
        this.userId = null;
        this.user = null;
        localStorage.removeItem(this.localStorageKey);
        this.emitAuthStatus();
        console.log('Session has been cleared');
    };
    AuthService.prototype.loginWithFacebook = function (response, f) {
        var _this = this;
        console.log("loginWithFacebook", response);
        this.facebookAccessToken = response.authResponse.accessToken;
        this.facebookUserId = response.authResponse.userID;
        var url = "user/login/app/fb?token=" + this.facebookAccessToken + "&userId=" + this.facebookUserId + "&force=false";
        console.log(" > authService loginWithFacebook", url);
        this.apiService.noauthget(url, function (data) {
            console.log("Answ", data);
            if ("login" in data)
                data = data.login;
            console.log("Answ", data);
            if (data.success)
                _this.processLoginFB(data, f);
            else
                f(data);
        });
    };
    AuthService.prototype.linkWithFacebook = function (response, password, f) {
        var _this = this;
        console.log("linkWithFacebook", response);
        this.facebookAccessToken = response.authResponse.accessToken;
        this.facebookUserId = response.authResponse.userID;
        var url = "user/auth/app/fb/link"; //?p="+password+"&token=" + this.facebookAccessToken+ "&userId=" + this.facebookUserId+"&force=true";
        var data = { p: password, token: this.facebookAccessToken, userId: this.facebookUserId };
        console.log(" > authService fblogin", url);
        this.apiService.noauthrawpost(url, data, function (data) {
            console.log("linkWithFacebook answ", data);
            if ("login" in data)
                data = data.login;
            console.log("Answ", data);
            if (data.success)
                _this.processLoginFB(data, f);
            else
                f(data);
        });
    };
    AuthService.prototype.initFB = function () {
        //init facebook
        this.fb.init(this.FB_initParams).then(function (valeur) {
            console.log("[Facebook] init ok");
        }, function (raison) {
            console.log("[Facebook] init failed");
        });
        ;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], AuthService.prototype, "loginChanged", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], AuthService.prototype, "loginHeaderChanged", void 0);
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_13__angular_http__["Http"],
            __WEBPACK_IMPORTED_MODULE_5__message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_1_ngx_facebook__["a" /* FacebookService */],
            __WEBPACK_IMPORTED_MODULE_8__console_service__["a" /* ConsoleService */],
            __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_7__services_currency_service__["a" /* CurrencyService */],
            __WEBPACK_IMPORTED_MODULE_11__api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_10__config_service__["a" /* ConfigService */],
            __WEBPACK_IMPORTED_MODULE_9__request_service__["a" /* RequestService */]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/core/services/config.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export API_RETURN_MODES */
/* unused harmony export ENVIRONMENTS */
/* unused harmony export LANGUAGES */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import {SelectOption, SelectOptionSet} from '../directives/elements/Forms';

//import {Platform} from 'ionic-angular';
var API_RETURN_MODES;
(function (API_RETURN_MODES) {
    API_RETURN_MODES[API_RETURN_MODES["HASH"] = 0] = "HASH";
    API_RETURN_MODES[API_RETURN_MODES["OBJECT"] = 1] = "OBJECT";
})(API_RETURN_MODES || (API_RETURN_MODES = {}));
var ENVIRONMENTS;
(function (ENVIRONMENTS) {
    ENVIRONMENTS[ENVIRONMENTS["Local"] = 0] = "Local";
    ENVIRONMENTS[ENVIRONMENTS["Dev"] = 1] = "Dev";
    ENVIRONMENTS[ENVIRONMENTS["Stag"] = 2] = "Stag";
    ENVIRONMENTS[ENVIRONMENTS["Prod"] = 3] = "Prod";
})(ENVIRONMENTS || (ENVIRONMENTS = {}));
;
var LANGUAGES;
(function (LANGUAGES) {
    LANGUAGES[LANGUAGES["AmericanEnglish"] = 0] = "AmericanEnglish";
})(LANGUAGES || (LANGUAGES = {}));
;
var DeviceInfo = (function () {
    function DeviceInfo(model, deviceType, os, osVersion, sdkVersion, language, manufacturer, uuid) {
        this.model = model;
        this.deviceType = deviceType;
        this.os = os;
        this.osVersion = osVersion;
        this.sdkVersion = sdkVersion;
        this.language = language;
        this.manufacturer = manufacturer;
        this.uuid = uuid;
    }
    return DeviceInfo;
}());
var ScreenInfo = (function () {
    function ScreenInfo(heightDIPs, heightPixels, scale, widthDIPs, widthPixels) {
        this.heightDIPs = heightDIPs;
        this.heightPixels = heightPixels;
        this.scale = scale;
        this.widthDIPs = widthDIPs;
        this.widthPixels = widthPixels;
    }
    return ScreenInfo;
}());
var ConfigService = (function () {
    function ConfigService() {
        this.perSiteConfigured = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.perSiteConfiguredTranslate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.perSiteConfiguredAuth = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.CART_ENABLED = false;
        this.isPerSiteConfigured = false;
        this.siteConfigService = null;
        this.validationMessages = {};
        this.selectOptions = {};
        this.actionBarRules = {};
        this.actionBarButtons = [];
        //PARAMS
        //INTERFACE
        this.FLASH_MSG_TIMEOUT = 60000;
        this.usedCurrencies = {
            "USD": "US Dollars",
            "EUR": "Euro",
            "GBP": "British Pound",
            "CAD": "Canadian Dollars"
        };
        this.currencyRatesApi = "http://api.fixer.io/latest?base=USD&symbols=EUR,GBP,CAD";
        this.defaultCurrencyRates = '{"base":"USD","date":"2016-03-08","rates":{"CAD":1.3325,"GBP":0.70374,"EUR":0.90678}}';
        this.renewCurrencyFileAtStartup = false;
        this.matchingDomain = null;
        this.currentApiEntrypoint = "";
        //HISTORY
        this.historyTypes = [];
        //AUTH
        this.storeUserId = true;
        //API CONFIG
        this.API_TIMEOUT = 5000; //timeout in ms
        this.API_NB_RETRY = 0;
        this.APIMODELKEYS = {};
        this.API_USE_ENTITY_PREFIX = {};
        this.API_RETURN_MODE = API_RETURN_MODES.HASH; //HASH OR OBJECT
        this.entityPrefix = null;
        //CACHE
        this.LIBRARY_ENABLED = true;
        this.UPDATE_AFTER_GET = true;
        this.UPDATE_AFTER_POSTPUTPATCH = true;
        this.countryList = {
            "BD": "Bangladesh",
            "BE": "Belgium",
            "BF": "Burkina Faso",
            "BG": "Bulgaria",
            "BA": "Bosnia and Herzegovina",
            "BB": "Barbados",
            "WF": "Wallis and Futuna",
            "BL": "Saint Barthelemy",
            "BM": "Bermuda",
            "BN": "Brunei",
            "BO": "Bolivia",
            "BH": "Bahrain",
            "BI": "Burundi",
            "BJ": "Benin",
            "BT": "Bhutan",
            "JM": "Jamaica",
            "BV": "Bouvet Island",
            "BW": "Botswana",
            "WS": "Samoa",
            "BQ": "Bonaire, Saint Eustatius and Saba ",
            "BR": "Brazil",
            "BS": "Bahamas",
            "JE": "Jersey",
            "BY": "Belarus",
            "BZ": "Belize",
            "RU": "Russia",
            "RW": "Rwanda",
            "RS": "Serbia",
            "TL": "East Timor",
            "RE": "Reunion",
            "TM": "Turkmenistan",
            "TJ": "Tajikistan",
            "RO": "Romania",
            "TK": "Tokelau",
            "GW": "Guinea-Bissau",
            "GU": "Guam",
            "GT": "Guatemala",
            "GS": "South Georgia and the South Sandwich Islands",
            "GR": "Greece",
            "GQ": "Equatorial Guinea",
            "GP": "Guadeloupe",
            "JP": "Japan",
            "GY": "Guyana",
            "GG": "Guernsey",
            "GF": "French Guiana",
            "GE": "Georgia",
            "GD": "Grenada",
            "GB": "United Kingdom",
            "GA": "Gabon",
            "SV": "El Salvador",
            "GN": "Guinea",
            "GM": "Gambia",
            "GL": "Greenland",
            "GI": "Gibraltar",
            "GH": "Ghana",
            "OM": "Oman",
            "TN": "Tunisia",
            "JO": "Jordan",
            "HR": "Croatia",
            "HT": "Haiti",
            "HU": "Hungary",
            "HK": "Hong Kong",
            "HN": "Honduras",
            "HM": "Heard Island and McDonald Islands",
            "VE": "Venezuela",
            "PR": "Puerto Rico",
            "PS": "Palestinian Territory",
            "PW": "Palau",
            "PT": "Portugal",
            "SJ": "Svalbard and Jan Mayen",
            "PY": "Paraguay",
            "IQ": "Iraq",
            "PA": "Panama",
            "PF": "French Polynesia",
            "PG": "Papua New Guinea",
            "PE": "Peru",
            "PK": "Pakistan",
            "PH": "Philippines",
            "PN": "Pitcairn",
            "PL": "Poland",
            "PM": "Saint Pierre and Miquelon",
            "ZM": "Zambia",
            "EH": "Western Sahara",
            "EE": "Estonia",
            "EG": "Egypt",
            "ZA": "South Africa",
            "EC": "Ecuador",
            "IT": "Italy",
            "VN": "Vietnam",
            "SB": "Solomon Islands",
            "ET": "Ethiopia",
            "SO": "Somalia",
            "ZW": "Zimbabwe",
            "SA": "Saudi Arabia",
            "ES": "Spain",
            "ER": "Eritrea",
            "ME": "Montenegro",
            "MD": "Moldova",
            "MG": "Madagascar",
            "MF": "Saint Martin",
            "MA": "Morocco",
            "MC": "Monaco",
            "UZ": "Uzbekistan",
            "MM": "Myanmar",
            "ML": "Mali",
            "MO": "Macao",
            "MN": "Mongolia",
            "MH": "Marshall Islands",
            "MK": "Macedonia",
            "MU": "Mauritius",
            "MT": "Malta",
            "MW": "Malawi",
            "MV": "Maldives",
            "MQ": "Martinique",
            "MP": "Northern Mariana Islands",
            "MS": "Montserrat",
            "MR": "Mauritania",
            "IM": "Isle of Man",
            "UG": "Uganda",
            "TZ": "Tanzania",
            "MY": "Malaysia",
            "MX": "Mexico",
            "IL": "Israel",
            "FR": "France",
            "IO": "British Indian Ocean Territory",
            "SH": "Saint Helena",
            "FI": "Finland",
            "FJ": "Fiji",
            "FK": "Falkland Islands",
            "FM": "Micronesia",
            "FO": "Faroe Islands",
            "NI": "Nicaragua",
            "NL": "Netherlands",
            "NO": "Norway",
            "NA": "Namibia",
            "VU": "Vanuatu",
            "NC": "New Caledonia",
            "NE": "Niger",
            "NF": "Norfolk Island",
            "NG": "Nigeria",
            "NZ": "New Zealand",
            "NP": "Nepal",
            "NR": "Nauru",
            "NU": "Niue",
            "CK": "Cook Islands",
            "XK": "Kosovo",
            "CI": "Ivory Coast",
            "CH": "Switzerland",
            "CO": "Colombia",
            "CN": "China",
            "CM": "Cameroon",
            "CL": "Chile",
            "CC": "Cocos Islands",
            "CA": "Canada",
            "CG": "Republic of the Congo",
            "CF": "Central African Republic",
            "CD": "Democratic Republic of the Congo",
            "CZ": "Czech Republic",
            "CY": "Cyprus",
            "CX": "Christmas Island",
            "CR": "Costa Rica",
            "CW": "Curacao",
            "CV": "Cape Verde",
            "CU": "Cuba",
            "SZ": "Swaziland",
            "SY": "Syria",
            "SX": "Sint Maarten",
            "KG": "Kyrgyzstan",
            "KE": "Kenya",
            "SS": "South Sudan",
            "SR": "Suriname",
            "KI": "Kiribati",
            "KH": "Cambodia",
            "KN": "Saint Kitts and Nevis",
            "KM": "Comoros",
            "ST": "Sao Tome and Principe",
            "SK": "Slovakia",
            "KR": "South Korea",
            "SI": "Slovenia",
            "KP": "North Korea",
            "KW": "Kuwait",
            "SN": "Senegal",
            "SM": "San Marino",
            "SL": "Sierra Leone",
            "SC": "Seychelles",
            "KZ": "Kazakhstan",
            "KY": "Cayman Islands",
            "SG": "Singapore",
            "SE": "Sweden",
            "SD": "Sudan",
            "DO": "Dominican Republic",
            "DM": "Dominica",
            "DJ": "Djibouti",
            "DK": "Denmark",
            "VG": "British Virgin Islands",
            "DE": "Germany",
            "YE": "Yemen",
            "DZ": "Algeria",
            "US": "United States",
            "UY": "Uruguay",
            "YT": "Mayotte",
            "UM": "United States Minor Outlying Islands",
            "LB": "Lebanon",
            "LC": "Saint Lucia",
            "LA": "Laos",
            "TV": "Tuvalu",
            "TW": "Taiwan",
            "TT": "Trinidad and Tobago",
            "TR": "Turkey",
            "LK": "Sri Lanka",
            "LI": "Liechtenstein",
            "LV": "Latvia",
            "TO": "Tonga",
            "LT": "Lithuania",
            "LU": "Luxembourg",
            "LR": "Liberia",
            "LS": "Lesotho",
            "TH": "Thailand",
            "TF": "French Southern Territories",
            "TG": "Togo",
            "TD": "Chad",
            "TC": "Turks and Caicos Islands",
            "LY": "Libya",
            "VA": "Vatican",
            "VC": "Saint Vincent and the Grenadines",
            "AE": "United Arab Emirates",
            "AD": "Andorra",
            "AG": "Antigua and Barbuda",
            "AF": "Afghanistan",
            "AI": "Anguilla",
            "VI": "U.S. Virgin Islands",
            "IS": "Iceland",
            "IR": "Iran",
            "AM": "Armenia",
            "AL": "Albania",
            "AO": "Angola",
            "AQ": "Antarctica",
            "AS": "American Samoa",
            "AR": "Argentina",
            "AU": "Australia",
            "AT": "Austria",
            "AW": "Aruba",
            "IN": "India",
            "AX": "Aland Islands",
            "AZ": "Azerbaijan",
            "IE": "Ireland",
            "ID": "Indonesia",
            "UA": "Ukraine",
            "QA": "Qatar",
            "MZ": "Mozambique"
        };
        console.log("+ ConfigService");
        /*        this.deviceInformation = new DeviceInfo(
                    device.model,
                    device.model,
                    device.os,
                    device.osVersion,
                    device.sdkVersion,
                    device.language,
                    device.manufacturer,
                    device.uuid);
        */ /*        this.screenInformation = new ScreenInfo(
                    screen.mainScreen.heightDIPs,
                    screen.mainScreen.heightPixels,
                    screen.mainScreen.scale,
                    screen.mainScreen.widthDIPs,
                    screen.mainScreen.widthPixels);
        */
        this.setParameters();
    }
    ConfigService.prototype.configure = function () {
        console.log("+ ConfigService > configure");
        //this.buildApiKeys();
        this.setLanguage();
        //this.buildSelectOptions();
        this.setShowConsole();
        //this.buildActionBarRules();
        //this.buildHistoryTypes();
        this.applyMailSuffix = "@apply" + (this.env === ENVIRONMENTS.Prod ? "" : ".dev") + ".hireton.com";
    };
    ConfigService.prototype.setShowConsole = function () {
    };
    ConfigService.prototype.setModelTypes = function (MT) {
        this.MODELTYPES = MT;
    };
    ConfigService.prototype.getTranslationFilePaths = function (langCode) {
        if (!langCode)
            return null;
        return [
            this.staticURL + "/locales/" + langCode + "/" + this.sitename + "-common.json",
            this.staticURL + "/locales/" + langCode + "/" + this.sitename + "-" + this.app + ".json"
        ];
    };
    ConfigService.prototype.setEntityPrefix = function (e) {
        this.entityPrefix = e;
    };
    ConfigService.prototype.setEnvironment = function () {
        var suffixes = ["local.", "dev.", "stag.", ""];
        var ENVNAMES = ["LOCAL", "DEV", "STAG", "PROD"];
        var u = location.host;
        //  this.deviceUUID=device.uuid;//this.device.uuid;
        if (!this.isMobileDevice()) {
            if (u.indexOf("localhost") > -1)
                this.env = ENVIRONMENTS.Local;
            else if (u.indexOf(".local.") > -1)
                this.env = ENVIRONMENTS.Local;
            else if (u.indexOf(".dev.") > -1)
                this.env = ENVIRONMENTS.Dev;
            else if (u.indexOf(".stag.") > -1)
                this.env = ENVIRONMENTS.Stag;
            else
                this.env = ENVIRONMENTS.Prod;
        }
        else {
            console.log("uuid=", this.deviceUUID, "ref=145ef0269066c8d4 equal?", this.deviceUUID == "145ef0269066c8d4");
            if (this.deviceUUID == "145ef0269066c8d4")
                this.env = ENVIRONMENTS.Dev;
            else
                this.env = ENVIRONMENTS.Prod;
        }
        console.log("ENV=", ENVNAMES[this.env]);
        this.prefix = suffixes[this.env];
        if (this.platform === "ios" || this.platform === "android")
            this.prefix = "";
    };
    ConfigService.prototype.setParameters = function () {
        this.setPlatform();
        this.setEnvironment();
        this.setDomain();
        this.setURLs();
        if (this.isMobileDevice()) {
            /*
             AppVersion.getVersionName().then((v: string) =>{
                     this.appliVersion = v;
             });
             AppVersion.getVersionCode().then(   (v)=> {
                     this.versionCode = v;
               });
               AppVersion.getAppId().then(function(id) {
  this.appId=id });
         */
        }
    };
    ConfigService.prototype.setPlatform = function () {
        var message = "";
        //if (isAndroid) {
        //   this.platform="android"
        //} else if (isIOS) {
        //   this.platform="ios"
        //}else{
        //  this.platform="other";
        //}
        this.platform = "web";
        console.log("PLATFORM=", this.platform);
    };
    ConfigService.prototype.setApiUrl = function () {
        var apiSuffix = "/latest/";
        if (this.isMobileDevice()) {
            //DEBUG MOBILE ON STAG API
            if (this.env == ENVIRONMENTS.Dev)
                this.apiURL = "http://192.168.0.16:8030" + apiSuffix;
            else if (this.env == ENVIRONMENTS.Stag)
                this.apiURL = "http://api.stag." + this.domain + apiSuffix;
            else
                this.apiURL = "http://api." + this.domain + apiSuffix;
        }
        else {
            if (location.host.indexOf("localhost") > -1)
                this.apiURL = "http://34.242.69.165:3001/";
            else
                this.apiURL = "http://api." + this.prefix + this.domain + apiSuffix;
        }
    };
    ConfigService.prototype.setURLs = function () {
        this.setApiUrl();
        //this.consoleService.log("ConfigService setURLs pref", this.prefix,"dom=", this.domain);
        if (!this.staticURL)
            //this.staticURL = "http://static." + this.prefix + this.domain;
            this.staticURL = "http://static." + this.prefix + "hireton.com";
        console.log("APIURL", this.apiURL);
        console.log("ConfigService setURLs prefix=", this.prefix, "dom=", this.domain, " api=", this.apiURL);
    };
    ConfigService.prototype.isMobileDevice = function () {
        return this.isMobileApp();
    };
    ConfigService.prototype.getApiUrl = function () {
        if (this.apiURL)
            return this.apiURL;
        else
            console.error("Api URL Not set");
    };
    ConfigService.prototype.isMobileApp = function () {
        return this.platform === "ios" || this.platform === "android";
    };
    ConfigService.prototype.setDomain = function () {
        console.log("Set domain");
        if (this.isMobileApp()) {
            this.domain = "hireton.com";
        }
        var u = window.location.hostname;
        var domainParts = u.split(".");
        var n = domainParts.length;
        if (n > 1) {
            this.domain = domainParts[n - 2] + "." + domainParts[n - 1];
            /* let found :boolean= false;
             for (var dom in this.availableDomains) {
             if (u.indexOf(dom) > -1) {
             this.domain = dom;
             found = true;
             break;
             }
             }
             console.log("setDomain href=", u, "domain=", this.domain);
             if (!found) {
             console.error("Domain not found from href", u);
             }*/
        }
        else {
            console.log("Domain has less than 3 components", u);
            this.domain = "hireton.com";
        }
    };
    ConfigService.prototype.getUrl = function (includeSubdomain) {
        return (includeSubdomain ? this.app : "") + this.prefix + this.domain;
    };
    ConfigService.prototype.enableProdModeIfNecessary = function () {
        if (this.env === ENVIRONMENTS.Prod)
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
    };
    ConfigService.prototype.setLanguage = function () {
        console.log("SetLanguage", this.domain, this.availableDomains);
        if (this.domain in this.availableDomains)
            this.lang = this.availableDomains[this.domain].defaultLanguage;
        else
            console.error("Cannot find domain", this.domain, "to available domains", this.availableDomains);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], ConfigService.prototype, "perSiteConfigured", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], ConfigService.prototype, "perSiteConfiguredTranslate", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], ConfigService.prototype, "perSiteConfiguredAuth", void 0);
    ConfigService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], ConfigService);
    return ConfigService;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/core/services/console.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConsoleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ConsoleService = (function () {
    function ConsoleService() {
        this.showConsole = true;
        this.serv("+ ConsoleService");
        /*  if(this.configService.env===ENVIRONMENTS.Prod)
              this.showConsole=false;
          else
              this.showConsole=true;
     */ var u = location.host;
        //        if (u.indexOf("app.") > -1 )
        //          this.showConsole=false;
    }
    ConsoleService.prototype.log = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[LOG]", 'padding:2px 5px;border-radius:3px;background: #fff000; color: #000;display:block');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.constr = function (s) {
        if (this.showConsole) {
            console.log("%c[CONSTR] " + s, 'padding:2px 5px;border-radius:3px;background: #ff0000; color: #000;display:block;');
        }
    };
    //auth(s:string) {
    //        console.log("%c[AUTH] "+s, 'padding:2px 5px;border-radius:3px;background: #FF69A9; color: #000;display:block;'    );
    //  }
    ConsoleService.prototype.cart = function (s) {
        if (this.showConsole) {
            console.log("%c[CART] " + s, 'padding:2px 5px;border-radius:3px;background: #3369A9; color: #000;display:block;');
        }
    };
    ConsoleService.prototype.auth = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[SERVI]", 'padding:2px 5px;border-radius:3px;background: #69D0FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.request = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[REQUEST]", 'padding:2px 5px;border-radius:3px;background: #999999; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.subs = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[SUBS]", 'padding:2px 5px;border-radius:3px;background: #999999; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.config = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[CONFIG]", 'padding:2px 5px;border-radius:3px;background: #999999; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.serv = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[SERVI]", 'padding:2px 5px;border-radius:3px;background: #69D0FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.translate = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[TRANSLATE]", 'padding:2px 5px;border-radius:3px;background: #444; color: #fff;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.library = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[LIBRARY]", 'padding:2px 5px;border-radius:3px;background: #FFAA00; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.load = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[LOAD]", 'padding:2px 5px;border-radius:3px;background: #FFF000; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.curr = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[CURRENCY]", 'padding:2px 5px;border-radius:3px;background: #FF00FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.canvas = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[CANVAS]", 'padding:2px 5px;border-radius:3px;background: #666666; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.post = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[POST]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.patch = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[PATCH]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.api = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[API]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.delete = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[DELETE]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.put = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[PUT]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.get = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[GET]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.ui = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[UI]", 'padding:2px 5px;border-radius:3px;background: #EEBBFF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService.prototype.emit = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[EMIT]", 'padding:2px 5px;border-radius:3px;background: darkgreen; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    };
    ConsoleService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], ConsoleService);
    return ConsoleService;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/core/services/currency.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrencyService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/timeout.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_share__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/share.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__console_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/console.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/config.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var CurrencyService = (function () {
    function CurrencyService(http, configService, consoleService, requestService) {
        this.http = http;
        this.configService = configService;
        this.consoleService = consoleService;
        this.requestService = requestService;
        this.currencyRatesLoaded = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.currencyChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.rates = {};
        this.ratesTable = [];
        consoleService.serv("+ CurrencyService");
        this.processFile(JSON.parse(this.configService.defaultCurrencyRates));
        this.loadCurrencyFile();
    }
    CurrencyService.prototype.loadCurrencyFile = function () {
        var url = this.configService.currencyRatesApi;
        if (this.configService.renewCurrencyFileAtStartup) {
            console.log("CurrencyService loading ", url);
            this.requestService.get(url, function (result) {
                if (result.error) {
                }
                else {
                    this.processFile(result.file);
                }
            }, this);
        }
    };
    CurrencyService.prototype.convertToUserCurrency = function (price) {
        return this.convert(price, this.getUserCurrency());
    };
    CurrencyService.prototype.convert = function (originalPrice, destinationCurrency) {
        //console.log("convert", originalValue, originalCurrency, destinationCurrency, this.ratesTable);
        if (!originalPrice) {
            console.warn("CurrencyService convert originalValue=", originalPrice);
            return null;
        }
        if (!(originalPrice.currencyCode in this.configService.usedCurrencies)) {
            console.warn("CurrencyService convert unknown originalCurrency=", originalPrice.currencyCode);
            return null;
        }
        if (!(destinationCurrency in this.configService.supportedCurrencies)) {
            console.warn("CurrencyService convert unknown destinationCurrency=", destinationCurrency);
            return null;
        }
        if (originalPrice.currencyCode === destinationCurrency)
            return originalPrice;
        else {
            // console.log("rate",this.ratesTable,originalCurrency,destinationCurrency);
            // console.log("rate",this.ratesTable[originalCurrency][destinationCurrency])
            return { value: originalPrice.value * this.ratesTable[originalPrice.currencyCode][destinationCurrency], currencyCode: destinationCurrency };
        }
    };
    CurrencyService.prototype.processFile = function (file) {
        console.log("CurrencyService done downloading file=", file, "rates=", file.rates);
        console.log("this", this);
        console.log("thisrates", this.rates);
        this.rates = {};
        for (var currency in file.rates) {
            console.log("check", currency, file.rates[currency]);
            var val = parseFloat(file.rates[currency]);
            this.rates[currency] = val;
        }
        this.buildTable();
        console.log("CurrencyTable", this.ratesTable);
        this.currencyRatesLoaded.next({});
    };
    CurrencyService.prototype.buildTable = function () {
        console.log("buildTable", this.rates);
        this.ratesTable = [];
        for (var currency in this.configService.usedCurrencies) {
            this.ratesTable[currency] = [];
            for (var currencyDest in this.configService.usedCurrencies) {
                if (currency === currencyDest)
                    this.ratesTable[currency][currencyDest] = 1;
                else if (currency === "USD")
                    this.ratesTable[currency][currencyDest] = this.rates[currencyDest];
                else if (currencyDest === "USD")
                    this.ratesTable[currency][currencyDest] = 1 / this.rates[currency];
                else
                    this.ratesTable[currency][currencyDest] = this.rates[currencyDest] / this.rates[currency];
            }
        }
    };
    CurrencyService.prototype.setCurrency = function (currencyCode) {
        console.log("SetLanguage", currencyCode);
        this.currentCurrencyCode = currencyCode;
        this.currencyRatesLoaded.next(this.currentCurrencyCode);
    };
    CurrencyService.prototype.getUserCurrency = function () {
        return this.currentCurrencyCode;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CurrencyService.prototype, "currencyRatesLoaded", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CurrencyService.prototype, "currencyChanged", void 0);
    CurrencyService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"],
            __WEBPACK_IMPORTED_MODULE_7__config_service__["a" /* ConfigService */],
            __WEBPACK_IMPORTED_MODULE_6__console_service__["a" /* ConsoleService */],
            __WEBPACK_IMPORTED_MODULE_5__request_service__["a" /* RequestService */]])
    ], CurrencyService);
    return CurrencyService;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/core/services/message.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ErrorMessage */
/* unused harmony export FlashMessage */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__console_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/console.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import * as Toast from 'nativescript-toast';
var ErrorMessage = (function () {
    function ErrorMessage(type, code, stack, opt) {
        this.type = type;
        this.code = code;
        this.stack = stack;
        this.opt = opt;
        this.isDisplayed = true;
        this.date = new Date();
    }
    return ErrorMessage;
}());

var FlashMessage = (function () {
    function FlashMessage(type, message, isLongLasting, classe, link) {
        this.type = type;
        this.message = message;
        this.isLongLasting = isLongLasting;
        this.classe = classe;
        this.link = link;
        this.isDisplayed = true;
        this.hasAppeared = false;
        this.date = new Date();
    }
    return FlashMessage;
}());


var MessageService = (function () {
    function MessageService(consoleService) {
        this.consoleService = consoleService;
        this.errorsChanged = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.flashChanged = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.loadingChanged = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.updateActivity = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.savingChanged = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.sideMenuChanged = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.omnibarRequested = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.cloakChanged = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.popupChanged = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.menuPinned = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.hideHeader = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.showMask = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.libraryLoaded = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.pipelineContactChanged = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.consoleService.serv("+ MessageService");
    }
    MessageService.prototype.addAlert = function (message, isLongLasting, link) {
        console.log("addflash", message);
        var E = new FlashMessage("add", message, isLongLasting, "orange", link);
        this.flashChanged.emit(E);
    };
    MessageService.prototype.addError = function (errorCode, error, desc) {
        console.log("adderrror", errorCode, error, "desc", desc);
        var errstr = JSON.stringify(error);
        var E = new ErrorMessage("add", errorCode, errstr, desc);
        this.errorsChanged.emit(E);
    };
    MessageService.prototype.readError = function (serverErrMsg) {
        console.log("Messageservice readrrror", serverErrMsg);
        var stackString = JSON.stringify(serverErrMsg.stack);
        var E = new ErrorMessage("add", serverErrMsg.code, stackString, serverErrMsg.opt);
        this.errorsChanged.emit(E);
    };
    MessageService.prototype.addConfirm = function (msg) {
        console.log("Messageservice addConfirm", msg);
        //let E = new ErrorMessage("add", msg.code,{},msg.opt);
        //this.errorsChanged.emit(E);
        /* let toast = Toast.makeText(
         msg
         );
         toast.show();
     */ 
    };
    MessageService.prototype.addFlash = function (message, isLongLasting, classe, link) {
        console.log("addflash", message);
        var E = new FlashMessage("add", message, isLongLasting, classe, link);
        this.flashChanged.emit(E);
    };
    MessageService.prototype.updateActivityMenu = function (show) {
        this.updateActivity.emit(show);
    };
    MessageService.prototype.addMessage = function (message) {
        console.log("addMessage", message);
        var E = new FlashMessage("add", message, true);
        this.flashChanged.emit(E);
    };
    MessageService.prototype.resetFlash = function () {
        var E = new ErrorMessage("reset");
        this.flashChanged.emit(E);
    };
    MessageService.prototype.resetErrors = function () {
        var E = new ErrorMessage("reset");
        this.errorsChanged.emit(E);
    };
    MessageService.prototype.showLoading = function () {
        this.loadingChanged.emit(true);
    };
    MessageService.prototype.hideLoading = function () {
        this.loadingChanged.emit(false);
    };
    MessageService.prototype.showSaving = function () {
        this.savingChanged.emit(true);
    };
    MessageService.prototype.hideSaving = function () {
        this.savingChanged.emit(false);
    };
    MessageService.prototype.showCloak = function () {
        this.cloakChanged.emit(true);
    };
    MessageService.prototype.hideCloak = function () {
        this.cloakChanged.emit(false);
    };
    MessageService.prototype.showPopup = function (id) {
        this.popupChanged.emit({ value: true, id: id });
    };
    MessageService.prototype.hidePopup = function (id) {
        this.popupChanged.emit({ value: false, id: id });
    };
    MessageService.prototype.hideAllPopups = function () {
        console.log("Hide all popups");
        this.popupChanged.emit({ value: false, id: -1 });
    };
    MessageService.prototype.fadeTo = function (router, navigate, params) {
        this.showMask.emit(true);
        setTimeout(function () {
            if (params)
                router.navigate(navigate);
            else
                router.navigate(navigate);
        }, 300);
    };
    MessageService.prototype.fadeIn = function () {
        //setTimeout(()=> {
        this.showMask.emit(false);
        //},300);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
    ], MessageService.prototype, "errorsChanged", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
    ], MessageService.prototype, "flashChanged", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
    ], MessageService.prototype, "loadingChanged", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
    ], MessageService.prototype, "updateActivity", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
    ], MessageService.prototype, "savingChanged", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
    ], MessageService.prototype, "sideMenuChanged", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
    ], MessageService.prototype, "omnibarRequested", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
    ], MessageService.prototype, "cloakChanged", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
    ], MessageService.prototype, "popupChanged", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
    ], MessageService.prototype, "menuPinned", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
    ], MessageService.prototype, "hideHeader", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
    ], MessageService.prototype, "showMask", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
    ], MessageService.prototype, "libraryLoaded", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
    ], MessageService.prototype, "pipelineContactChanged", void 0);
    MessageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__console_service__["a" /* ConsoleService */]])
    ], MessageService);
    return MessageService;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/core/services/request.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__console_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/console.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__message_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/message.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




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
            .subscribe(function (data) { return _this.success(f, data); }, function (err) { return _this.error(f, err, "Error downloading " + url); }, 
        // err => this.error(err),
        function () { return console.log('Done getting.', url); });
    };
    RequestService.prototype.post = function (url, obj, headers, f) {
        var _this = this;
        this.http.post(url, obj, { headers: headers })
            .subscribe(function (data) { return _this.success(f, data); }, function (err) { return _this.error(f, err, "Error downloading " + url); }, 
        // err => this.error(err),
        function () { return console.log('Done post.', url); });
    };
    RequestService.prototype.get = function (url, f, context) {
        this.getWithHeaders(url, new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */](), f.bind(context));
    };
    RequestService.prototype.getJSON = function (url, f, context) {
        var h = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        h.append("Content-Type", "application/json; charset=UTF-8");
        this.getWithHeaders(url, h, f.bind(context));
    };
    RequestService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__console_service__["a" /* ConsoleService */],
            __WEBPACK_IMPORTED_MODULE_3__message_service__["a" /* MessageService */]])
    ], RequestService);
    return RequestService;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/core/utils/utils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export findById */
/* unused harmony export isValidEmail */
/* unused harmony export orderByLastname */
/* unused harmony export daysBetweenTwoDates */
/* harmony export (immutable) */ __webpack_exports__["a"] = daysUpToNow;
/* unused harmony export Assert */
/* unused harmony export cloneRaw */
/* unused harmony export clone */
function findById(id, list, f) {
    for (var i = 0, n = list.length; i < n; ++i) {
        var e = list[i];
        if (e._id === id) {
            f(e);
        }
    }
    return null;
}
function isValidEmail(value) {
    //let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //console.log("test",value,",res",re.test(value));
    return re.test(value);
    //return EMAIL_REGEXP.test(value) ;
}
function orderByLastname(list) {
    var alphalist = "abcdefghijklmnopqrstuvwxyz";
    var contactAlphaObj = [];
    var contactOther = [];
    for (var k in list) {
        var c = list[k];
        var fl = c.lastname.substring(0, 1).toLowerCase();
        if (alphalist.indexOf(fl) > -1) {
            if (!(fl in contactAlphaObj))
                contactAlphaObj[fl] = new Array();
            contactAlphaObj[fl].push(c);
        }
        else {
            contactOther.push(c);
        }
    }
    var contactAlpha = new Array();
    Object.keys(contactAlphaObj)
        .sort()
        .forEach(function (v, i) {
        contactAlpha.push({ fl: v, contacts: contactAlphaObj[v] });
    });
    var alphaUsed = Object.keys(contactAlpha);
    return { used: alphaUsed, alpha: contactAlpha, other: contactOther };
}
function daysBetweenTwoDates(firstDate, secondDate) {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    if ((firstDate.getHours() * 60 + firstDate.getMinutes()) > (secondDate.getHours() * 60 + secondDate.getMinutes()))
        diffDays++;
    return diffDays;
}
function daysUpToNow(d) {
    return daysBetweenTwoDates(d, new Date());
}
var Assert = (function () {
    function Assert() {
    }
    Assert.throwError = function (msg) {
        if (typeof Error !== "undefined") {
            throw new Error(msg);
        }
        throw msg; // Fallback
    };
    Assert.exists = function (obj, message) {
        if (!obj) {
            message = message || "Exist assertion failed";
            Assert.throwError(message);
        }
    };
    Assert.isTrue = function (obj, message) {
        if (!obj) {
            message = message || "Boolean assertion failed";
            Assert.throwError(message);
        }
    };
    Assert.isString = function (obj, message) {
        var condition = (typeof obj === "string");
        var defaultMsg = "String assertion failed";
        Assert.isTrue(condition, defaultMsg);
    };
    Assert.isArray = function (obj, message) {
        var condition = (Object.prototype.toString.call(obj) === '[object Array]');
        var defaultMsg = "isArray assertion failed";
        Assert.isTrue(condition, defaultMsg);
    };
    Assert.isObject = function (obj, message) {
        var condition = (Object.prototype.toString.call(obj) === '[object Object]');
        var defaultMsg = "Object assertion failed";
        Assert.isTrue(condition, defaultMsg);
    };
    return Assert;
}());

function cloneRaw(obj) {
    //console.log("cloneRaw",obj,"type=",typeof obj,"pro=",Object.prototype.toString.call(obj));
    if ("EXTRA_FIELDS" in obj) {
        throw new Error("EXTRA_FIELDS in obj");
    }
    else {
        var res = {};
        for (var key in obj) {
            //console.log("clone key",key,obj[key]);
            var ref = obj[key];
            if (Object.prototype.toString.call(ref) === '[object Array]') {
                res[key] = [];
                for (var i = 0, n = ref.length; i < n; ++i) {
                    res[key][i] = ref[i];
                }
            }
            else if (Object.prototype.toString.call(ref) === '[object Object]') {
                res[key] = cloneRaw(ref);
            }
            else {
                res[key] = ref;
            }
        }
        //console.log("cloneRaw",obj,"to",res);
        return res;
    }
}
function clone(obj) {
    console.log("clone", obj);
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = clone(obj[key]);
    }
    return temp;
}


/***/ }),

/***/ "../../../../../src/lib/globalton/ui/components/messagepanel.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"errors-panel\">\r\n    <div *ngFor=\"let e of errors\">\r\n        <span class=\"error\" *ngIf=\"e.isDisplayed\">\r\n            <span class=\"title\">{{'errors.'+e.code | translate }}</span>\r\n            <span class=\"date\">{{e.date | date:'medium'}}</span>\r\n            <span class=\"content\">{{e.stack }}</span>\r\n            <span class=\"close\" (click)=\"hideMessage(e)\">X</span>\r\n        </span>\r\n    </div>\r\n</div>\r\n<div id=\"loading-indicator\" [hidden]=\"!isLoading\"> Loading  </div>\r\n<div id=\"saving-indicator\" [hidden]=\"!isSaving\">    Saving</div>\r\n"

/***/ }),

/***/ "../../../../../src/lib/globalton/ui/components/messagepanel.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagePanel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_services_message_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_services_config_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/@ngx-translate/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MessagePanel = (function () {
    function MessagePanel(messageService, configService, translateService) {
        var _this = this;
        this.messageService = messageService;
        this.configService = configService;
        this.translateService = translateService;
        this.errors = [];
        this.flashes = [];
        this.isLoading = false;
        this.isSaving = false;
        this.flashDuration = 3000;
        this.showLoadingPanel = false;
        this.errors = [];
        this.flashTimeout = this.configService.FLASH_MSG_TIMEOUT;
        messageService.errorsChanged.subscribe(function (value) { return _this.updateErrors(value); }, function (error) { return console.log("Error updating errors" + error); }, function () { return console.log('done'); });
        messageService.flashChanged.subscribe(function (value) { return _this.updateFlash(value); }, function (error) { return console.log("Error updating flash" + error); }, function () { return console.log('done'); });
        messageService.loadingChanged.subscribe(function (value) { return _this.updateLoading(value); }, function (error) { return console.log("Error updating errors" + error); }, function () { return console.log('done'); });
        messageService.savingChanged.subscribe(function (value) { return _this.updateSaving(value); }, function (error) { return console.log("Error updating errors" + error); }, function () { return console.log('done'); });
    }
    MessagePanel.prototype.openPage = function (page) {
        //this.nav.setRoot(page.component);
    };
    MessagePanel.prototype.hideMessage = function (error) {
        error.isDisplayed = false;
    };
    MessagePanel.prototype.showToast = function (options) {
        //todo
        //      let toast = this.toastController.create(options);
        //    toast.present();
    };
    MessagePanel.prototype.updateErrors = function (error) {
        var _this = this;
        console.log(" messagepanel updateErrors", error);
        if (error.type === "reset")
            this.errors = [];
        else if (error.type === "add") {
            //            this.errors.push(error);
            this.translateService.get("errors." + error.code).subscribe(function (res) {
                var msg = res; // + "<br/>" + JSON.stringify(error.stack);
                _this.showToast({
                    message: msg,
                    cssClass: "red",
                    duration: 3000
                });
            });
        }
        else {
            console.error("messagepanel unknown type", error.type);
        }
    };
    MessagePanel.prototype.updateFlash = function (msg) {
        var _this = this;
        console.log("updateflash");
        if (msg.type === "reset")
            this.flashes = [];
        else if (msg.type === "add") {
            this.translateService.get(msg.message).subscribe(function (res) {
                var t;
                if (!msg.isLongLasting)
                    t = _this.showToast({ message: res, cssClass: msg.classe, duration: _this.flashDuration, position: "bottom" });
                else
                    //                t= Toast.makeText(res);
                    t = _this.showToast({ message: res, cssClass: msg.classe, position: "bottom", dismissOnPageChange: true, showCloseButton: true });
                // t.present();
                t.show();
            });
            //this.flashes.push(msg);
            //setTimeout(()=>{this.flashes[this.flashes.length-1].hasAppeared=true},200);
            //if(!msg.isLongLasting)
            //    setTimeout(function(){msg.isDisplayed=false;},this.flashTimeout);
        }
    };
    MessagePanel.prototype.updateLoading = function (error) {
        this.isLoading = error;
        if (this.showLoadingPanel) {
            if (error)
                this.loader.present();
            else
                this.loader.dismiss();
        }
    };
    MessagePanel.prototype.showLoading = function () {
        this.isLoading = true;
        //
        //
        //
    };
    MessagePanel.prototype.hideLoading = function () {
        this.isLoading = false;
        //    this.loader.dismiss();
    };
    MessagePanel.prototype.updateSaving = function (error) {
        this.isSaving = error;
    };
    MessagePanel.prototype.showSaving = function () {
        this.isSaving = true;
    };
    MessagePanel.prototype.hideSaving = function () {
        this.isSaving = false;
    };
    MessagePanel = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'message-panel',
            template: __webpack_require__("../../../../../src/lib/globalton/ui/components/messagepanel.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core_services_message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_2__core_services_config_service__["a" /* ConfigService */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]])
    ], MessagePanel);
    return MessagePanel;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/ui/directives/elements/Forms.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MandatoryLabel */
/* unused harmony export FormFieldset */
/* unused harmony export FormGroupTitle */
/* unused harmony export FormField */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IonRequired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RequiredFormError; });
/* unused harmony export SelectOption */
/* unused harmony export SelectOptionSet */
/* unused harmony export AutocompleteInput */
/* unused harmony export InputTags */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_interfaces_interfaces__ = __webpack_require__("../../../../../src/lib/globalton/core/interfaces/interfaces.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

var MandatoryLabel = (function () {
    function MandatoryLabel() {
        console.log("MandatoryLabel");
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], MandatoryLabel.prototype, "value", void 0);
    MandatoryLabel = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'label-mandatory',
            template: '<label><ng-content></ng-content><span class="ob">&nbsp;*</span></label>'
        }),
        __metadata("design:paramtypes", [])
    ], MandatoryLabel);
    return MandatoryLabel;
}());

var FormFieldset = (function () {
    function FormFieldset() {
        // console.log("constr");
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], FormFieldset.prototype, "title", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], FormFieldset.prototype, "info", void 0);
    FormFieldset = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'form-fieldset',
            template: '<fieldset class="fieldset-compact"><h2>{{title}}</h2><div class="det-in"><span class="info" *ngIf="info">{{info}}</span><div class="form-group"><ng-content></ng-content></div></div></fieldset>'
        }),
        __metadata("design:paramtypes", [])
    ], FormFieldset);
    return FormFieldset;
}());

var FormGroupTitle = (function () {
    function FormGroupTitle() {
        // console.log("constr");
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], FormGroupTitle.prototype, "title", void 0);
    FormGroupTitle = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'formgroup-title',
            template: '<span class="subformtitle">{{title}}</span>'
        }),
        __metadata("design:paramtypes", [])
    ], FormGroupTitle);
    return FormGroupTitle;
}());

var FormField = (function () {
    function FormField() {
        // console.log("+ FormField")
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], FormField.prototype, "name", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], FormField.prototype, "required", void 0);
    FormField = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'field',
            template: '<div><label *ngIf="name">{{ name  }}<span *ngIf="required" class="ob">&nbsp;*</span></label><ng-content></ng-content></div>',
        }),
        __metadata("design:paramtypes", [])
    ], FormField);
    return FormField;
}());

var IonRequired = (function () {
    function IonRequired() {
    }
    IonRequired.prototype.getValue = function () {
        var v;
        var isString;
        if (this.formErrors) {
            v = this.formErrors[this.field];
            isString = typeof this.formErrors[this.field] === "string";
            if (isString)
                if (v.length > 0)
                    v = [this.formErrors[this.field]];
                else
                    v = [];
        }
        else
            v = [];
        return v;
    };
    IonRequired.prototype.isDisplayed = function () {
        return false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], IonRequired.prototype, "formErrors", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], IonRequired.prototype, "field", void 0);
    IonRequired = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ion-required',
            template: "<div class=\"required-field\" *ngIf=\"this.getValue().length>0\">\n        <span *ngFor=\"let c of getValue()\" >{{c | translate }} </span></div>"
        }),
        __metadata("design:paramtypes", [])
    ], IonRequired);
    return IonRequired;
}());

var RequiredFormError = (function () {
    function RequiredFormError() {
        // console.log("required field")
    }
    RequiredFormError.prototype.ngOnInit = function () { }; //this.control = this.formModel.form.find(this.controlName); }
    RequiredFormError.prototype.isDisplayed = function () {
        return false; //return this.control.dirty && this.control.hasError(this.error); }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('control'),
        __metadata("design:type", String)
    ], RequiredFormError.prototype, "controlName", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], RequiredFormError.prototype, "error", void 0);
    RequiredFormError = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'form-error-required',
            template: "<span *ngIf=\"isDisplayed()\" class=\"form-alert\"><ng-content></ng-content></span>"
        }),
        __metadata("design:paramtypes", [])
    ], RequiredFormError);
    return RequiredFormError;
}());

var SelectOption = (function () {
    function SelectOption(key, value, selected) {
        this.key = key;
        this.value = value;
        this.selected = selected;
    }
    SelectOption.prototype.getKey = function () {
        return this.key;
    };
    SelectOption.prototype.getValue = function () {
        return this.value;
    };
    return SelectOption;
}());

var SelectOptionSet = (function () {
    function SelectOptionSet(o, sortbyvalue, nobuild) {
        this.set = [];
        if (!nobuild)
            if (sortbyvalue) {
                this.readArray(this.getSortedArray(o));
            }
            else if (Object.prototype.toString.call(o) === '[object Array]') {
                this.readArray2(o);
            }
            else {
                this.read(o);
            }
    }
    SelectOptionSet.prototype.getSortedArray = function (o) {
        var array = [];
        for (var i in o) {
            array.push([i, o[i]]);
        }
        array = array.sort(function (a, b) { return a[1].localeCompare(b[1]); });
        return array;
    };
    SelectOptionSet.prototype.getSet = function () {
        return this.set;
    };
    SelectOptionSet.prototype.readArray = function (a) {
        for (var i = 0, n = a.length; i < n; ++i) {
            this.add(new SelectOption(a[i][0], a[i][1]));
        }
    };
    SelectOptionSet.prototype.read = function (o) {
        for (var i in o) {
            this.add(new SelectOption(i, o[i]));
        }
    };
    SelectOptionSet.prototype.readArray2 = function (o, field) {
        for (var i in o) {
            if (typeof o[i] === "string")
                this.add(new SelectOption(o[i], o[i]));
            else if (field)
                this.add(new SelectOption(o[i]._id, o[i][field]));
            else
                this.add(new SelectOption(o[i]._id, o[i].name));
        }
    };
    SelectOptionSet.prototype.add = function (s) {
        this.set.push(s);
    };
    return SelectOptionSet;
}());



var AutocompleteInput = (function () {
    function AutocompleteInput(requestService) {
        this.requestService = requestService;
        this.suggestions = [];
        this.isSelected = false;
        this.showingSuggestions = false;
        // console.log("constr");
        this.id = "suggest-" + Math.round(Math.random() * 100000);
    }
    AutocompleteInput.prototype.ngOnChanges = function () {
        console.log("ONCHANGE", this.currentValue);
        if (this.currentValue) {
            this.chosenvalue = this.currentValue;
            this.isSelected = true;
        }
    };
    AutocompleteInput.prototype.remove = function () {
        this.chosenvalue = null;
        this.isSelected = false;
        //let cell = document.getElementById(this.id);
        //cell.focus();
        //this.form.controls[this.name].updateValue(null);
    };
    AutocompleteInput.prototype.select = function (s) {
        this.chosenvalue = s;
        this.hideSuggestions();
        this.value = "";
        this.isSelected = true;
        console.log(this.form.controls, this.name);
        this.form.controls[this.name].updateValue(s._id);
    };
    AutocompleteInput.prototype.onKey = function (event) {
        console.log("Key");
        this.suggestions = [];
        if (this.value.length > 2) {
            this.updateAutoCompletion();
            this.showSuggestions();
        }
    };
    AutocompleteInput.prototype.showSuggestions = function () {
        this.showingSuggestions = true;
    };
    AutocompleteInput.prototype.hideSuggestions = function () {
        this.showingSuggestions = false;
    };
    AutocompleteInput.prototype.updateAutoCompletion = function () {
        var _this = this;
        if (!this.apiUrl)
            console.error("Autocomplete empty apiurl");
        else
            console.log("autocompletion", this.value);
        var url = this.apiUrl + "suggest/" + this.type + "/" + this.value;
        this.requestService.getJSON(url, function (res) {
            console.log("res", res);
            for (var i in res.file.suggestions) {
                if (res.file.suggestions[i].firstname)
                    res.file.suggestions[i].name = res.file.suggestions[i].firstname + " " + res.file.suggestions[i].lastname;
                _this.suggestions.push(res.file.suggestions[i]);
            }
        }, this);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AutocompleteInput.prototype, "type", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AutocompleteInput.prototype, "apiUrl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AutocompleteInput.prototype, "currentValue", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AutocompleteInput.prototype, "form", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AutocompleteInput.prototype, "name", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AutocompleteInput.prototype, "chosenvalue", void 0);
    AutocompleteInput = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'input-autocomplete',
            template: "  \n  <div class=\"suggestionInputAll suggestionSingle\">  \n    <input type=\"text\" *ngIf=\"!isSelected\" id=\"{{id}}\" #inpu [(ngModel)]=\"value\" (keyup)=\"onKey($event)\"/>\n    <div class=\"suggestionInputBox\" [hidden]=\"!showingSuggestions\">\n        <div *ngFor=\"let s of suggestions\"  id=\"{{s._id}}\" (click)=\"select(s)\">\n            {{s.name}}\n        </div>\n    </div>\n    <div class=\"alreadySuggested\" *ngIf=\"isSelected\">\n        <div *ngIf=\"chosenvalue\" (click)=\"remove()\">\n            {{chosenvalue?.name}}\n        </div>\n        \n    </div>\n  </div>"
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__core_services_request_service__["a" /* RequestService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core_services_request_service__["a" /* RequestService */]])
    ], AutocompleteInput);
    return AutocompleteInput;
}());


var InputTags = (function () {
    function InputTags(requestService) {
        this.requestService = requestService;
        this.suggestions = [];
        this.isSelected = false;
        this.showingSuggestions = false;
        // console.log("constr");
        this.id = "suggest-" + Math.round(Math.random() * 100000);
    }
    InputTags.prototype.ngOnChanges = function () {
        console.log("ONCHANGE", this.currentValue);
        if (this.currentValue) {
            if (!this.chosenvalues)
                this.chosenvalues = [];
            this.chosenvalues.push(new __WEBPACK_IMPORTED_MODULE_2__core_interfaces_interfaces__["a" /* PopulableItem */](this.currentValue));
            this.isSelected = true;
        }
    };
    InputTags.prototype.remove = function (obj) {
        var id = obj._id ? obj._id : obj.getObjectId();
        for (var i = 0, n = this.chosenvalues.length; i < n; ++i)
            if (this.chosenvalues[i].getObjectId() === id)
                this.chosenvalues.splice(i, 1);
        this.isSelected = false;
    };
    InputTags.prototype.getIdx = function (id) {
        if (!this.chosenvalues)
            return -1;
        var found = false;
        for (var i = 0, n = this.chosenvalues.length; i < n; ++i) {
            if (this.chosenvalues[i].getObjectId() === id) {
                found = true;
                return i;
            }
        }
        if (!found)
            return -1;
    };
    InputTags.prototype.isInSelectedList = function (id) {
        return this.getIdx(id) > -1;
    };
    InputTags.prototype.select = function (s) {
        if (!this.isInSelectedList(s.getObjectId())) {
            if (!this.chosenvalues)
                this.chosenvalues = [];
            this.chosenvalues.push(s);
        }
        this.hideSuggestions();
        this.value = "";
        //this.isSelected=true;
        console.log("select", this.form.controls, this.name);
        this.form.controls[this.name].updateValue(this.chosenvalues);
        this.model[this.name] = this.chosenvalues;
    };
    InputTags.prototype.onKey = function (event) {
        console.log("Key");
        this.suggestions = [];
        if (this.value.length > 2) {
            this.updateAutoCompletion();
            this.showSuggestions();
        }
    };
    InputTags.prototype.showSuggestions = function () {
        this.showingSuggestions = true;
    };
    InputTags.prototype.hideSuggestions = function () {
        this.showingSuggestions = false;
    };
    InputTags.prototype.updateAutoCompletion = function () {
        var _this = this;
        if (!this.apiUrl)
            console.error("Autocomplete empty apiurl");
        else
            console.log("autocompletion", this.value);
        var url = this.apiUrl + "suggest/" + this.type + "/" + this.value;
        this.requestService.getJSON(url, function (res) {
            console.log("res", res);
            for (var i in res.file.suggestions) {
                if (res.file.suggestions[i].firstname)
                    res.file.suggestions[i].name = res.file.suggestions[i].firstname + " " + res.file.suggestions[i].lastname;
                _this.suggestions.push(new __WEBPACK_IMPORTED_MODULE_2__core_interfaces_interfaces__["a" /* PopulableItem */](res.file.suggestions[i]));
            }
        }, this);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], InputTags.prototype, "type", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], InputTags.prototype, "model", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], InputTags.prototype, "apiUrl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], InputTags.prototype, "currentValue", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], InputTags.prototype, "form", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], InputTags.prototype, "name", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], InputTags.prototype, "chosenvalues", void 0);
    InputTags = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'input-tags',
            template: "  \n  <div class=\"suggestionInputAll \">  \n    <input type=\"text\"  #inpu [(ngModel)]=\"value\" (keyup)=\"onKey($event)\"/>\n    <div class=\"suggestionInputBox\" [hidden]=\"!showingSuggestions\">\n        <div *ngFor=\"let s of suggestions\"  (click)=\"select(s)\">\n        \n            {{s?.getObject()?.name}} {{s?.name}}\n        </div>\n    </div>\n    <div class=\"alreadySuggested\" >\n        Selected:\n        <div *ngFor=\"let y of chosenvalues\"  (click)=\"remove(y)\">\n            {{y.getObject()?.name}}\n            \n        </div>\n        \n    </div>\n  </div>"
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__core_services_request_service__["a" /* RequestService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core_services_request_service__["a" /* RequestService */]])
    ], InputTags);
    return InputTags;
}());

/*
export const FORM_ELEMENTS: any[] = [
    MandatoryLabel,
    FormFieldset,
    FormField,
    RequiredFormError,
    FormGroupTitle, AutocompleteInput,InputTags
];
  */


/***/ }),

/***/ "../../../../../src/lib/globalton/ui/pipes/calendar.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils_utils__ = __webpack_require__("../../../../../src/lib/globalton/core/utils/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/@ngx-translate/core.es5.js");
/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CalendarPipe = (function () {
    function CalendarPipe(translateService) {
        this.translateService = translateService;
    }
    CalendarPipe.prototype.transform = function (value, args) {
        console.log("tr", value);
        var n = Object(__WEBPACK_IMPORTED_MODULE_1__core_utils_utils__["a" /* daysUpToNow */])(value);
        var da;
        if (n == 0)
            da = this.translateService.get("date.today");
        else if (n == 1)
            da = this.translateService.get("date.yesterday");
        else
            da = n + " " + this.translateService.get("date.daysago");
        var at = this.translateService.get("date.at");
        var m = value.getMinutes();
        var h = value.getHours();
        var dd = (h < 10 ? ("0" + h) : h) + ":" + (m < 10 ? ("0" + m) : m);
        return da + " " + at + " " + dd;
    };
    CalendarPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'calendar', pure: true }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]])
    ], CalendarPipe);
    return CalendarPipe;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/ui/pipes/countryname.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountryNamePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/@ngx-translate/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

//import {TranslateService} from '../services/translate.service';

var CountryNamePipe = (function () {
    function CountryNamePipe(translateService) {
        this.translateService = translateService;
    }
    CountryNamePipe.prototype.transform = function (value, args) {
        if (!value)
            return "country.undefined";
        //  if (this.translateService.currentLanguageLoaded)
        return this.translateService.get("country." + value);
        // else
        //   return value;
    };
    CountryNamePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'countryname',
            pure: false
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]])
    ], CountryNamePipe);
    return CountryNamePipe;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/ui/pipes/formerrors.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormErrorsPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/@ngx-translate/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var FormErrorsPipe = (function () {
    function FormErrorsPipe(translateService) {
        this.translateService = translateService;
    }
    FormErrorsPipe.prototype.transform = function (resul, args) {
        console.log("formerrorsd", resul);
        if (!resul)
            return "";
        var res = "";
        //return this.translateService.get(value).subscribe((resul) => {
        console.log("resul=", resul);
        if (typeof resul === "string")
            return resul;
        else {
            for (var i in resul) {
                console.log("add", resul[i]);
                res += resul[i] + ". ";
            }
            res = res.substring(0, res.length - 2);
            console.log("res=", res);
            return res;
        }
        //});
    };
    FormErrorsPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'formerrors',
            pure: true
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]])
    ], FormErrorsPipe);
    return FormErrorsPipe;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/ui/pipes/isotodate.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IsoToDatePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
// https://en.wikipedia.org/wiki/ISO_8601
// Example
//    Usage: {{ dateValue | unicodeToDate | date:'MM/dd/yyyy' }}
//    Data: 2014-01-05T18:14:18.32
//    Result: 01/05/2014
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var IsoToDatePipe = (function () {
    function IsoToDatePipe() {
    }
    IsoToDatePipe.prototype.transform = function (value, args) {
        console.log("date", value);
        if (!value)
            return new Date();
        return new Date(value);
    };
    IsoToDatePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'isotodate' })
    ], IsoToDatePipe);
    return IsoToDatePipe;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/ui/pipes/location.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/@ngx-translate/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var LocationPipe = (function () {
    function LocationPipe(translateService) {
        this.translateService = translateService;
    }
    LocationPipe.prototype.transform = function (p, args) {
        // console.log("trans", value,this.translateService.currentLanguageLoaded);
        if (!p)
            return null;
        var c = p.country;
        if (p.isinternational) {
            var rem = void 0;
            rem = "country.internationalremotejob";
            //      if (this.translateService.currentLanguageLoaded)
            rem = this.translateService.get("country.internationalremotejob");
            return rem;
        }
        var country;
        if (!c)
            country = "country.undefined";
        //if (this.translateService.currentLanguageLoaded)
        country = this.translateService.get("country." + c);
        //else
        //  country = c;
        if (p.isremote) {
            var rem = void 0;
            rem = "country.remotejob";
            //   if (this.translateService.currentLanguageLoaded)
            rem = this.translateService.get("country.remotejob");
            return rem + ", " + country;
        }
        else {
            return [p.city, p.region, country].join(", ");
        }
    };
    LocationPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'location',
            pure: false
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]])
    ], LocationPipe);
    return LocationPipe;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/ui/pipes/sanitize.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SanitizeHtmlPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SanitizeHtmlPipe = (function () {
    function SanitizeHtmlPipe(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    SanitizeHtmlPipe.prototype.transform = function (v) {
        return this._sanitizer.bypassSecurityTrustHtml(v);
    };
    SanitizeHtmlPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'sanitizeHtml'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], SanitizeHtmlPipe);
    return SanitizeHtmlPipe;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/ui/pipes/usercurrency.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserCurrencyPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_services_currency_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/currency.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var UserCurrencyPipe = (function () {
    function UserCurrencyPipe(currencyService) {
        this.currencyService = currencyService;
    }
    UserCurrencyPipe.prototype.transform = function (price, args) {
        if (!price) {
            return null;
        }
        if (!price.currencyCode) {
            console.warn("no price currency", price);
            return null;
        }
        var originalPrice = price;
        var userCurrency = this.currencyService.getUserCurrency();
        if (originalPrice.currencyCode !== userCurrency) {
            price = this.currencyService.convert(originalPrice, userCurrency);
        }
        price.value = Math.ceil(price.value);
        if (!userCurrency) {
            userCurrency = "USD";
            console.error("User Currency not defined");
        }
        var locale = "fr"; //todo
        var c = new __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* CurrencyPipe */](locale);
        return c.transform(price.value, userCurrency, true, ".2-2");
    };
    UserCurrencyPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'usercurrency',
            pure: false
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__core_services_currency_service__["a" /* CurrencyService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__core_services_currency_service__["a" /* CurrencyService */]])
    ], UserCurrencyPipe);
    return UserCurrencyPipe;
}());



/***/ }),

/***/ "../../../../../src/lib/globalton/ui/ui.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobaltonUIModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_elements_Forms__ = __webpack_require__("../../../../../src/lib/globalton/ui/directives/elements/Forms.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/@ngx-translate/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_http_loader__ = __webpack_require__("../../../../@ngx-translate/http-loader/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_isotodate_pipe__ = __webpack_require__("../../../../../src/lib/globalton/ui/pipes/isotodate.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipes_countryname_pipe__ = __webpack_require__("../../../../../src/lib/globalton/ui/pipes/countryname.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pipes_calendar_pipe__ = __webpack_require__("../../../../../src/lib/globalton/ui/pipes/calendar.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pipes_location_pipe__ = __webpack_require__("../../../../../src/lib/globalton/ui/pipes/location.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pipes_formerrors_pipe__ = __webpack_require__("../../../../../src/lib/globalton/ui/pipes/formerrors.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pipes_usercurrency_pipe__ = __webpack_require__("../../../../../src/lib/globalton/ui/pipes/usercurrency.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_messagepanel__ = __webpack_require__("../../../../../src/lib/globalton/ui/components/messagepanel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pipes_sanitize_pipe__ = __webpack_require__("../../../../../src/lib/globalton/ui/pipes/sanitize.pipe.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_5__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, 'assets/locales/', '.json');
}








var GlobaltonUIModule = (function () {
    function GlobaltonUIModule() {
    }
    GlobaltonUIModule_1 = GlobaltonUIModule;
    GlobaltonUIModule.forRoot = function () {
        return {
            ngModule: GlobaltonUIModule_1,
            providers: []
        };
    };
    GlobaltonUIModule = GlobaltonUIModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: (createTranslateLoader),
                        deps: [__WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]]
                    }
                })
                //        IonicModule.forRoot(null)
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__directives_elements_Forms__["a" /* IonRequired */], __WEBPACK_IMPORTED_MODULE_12__components_messagepanel__["a" /* MessagePanel */],
                __WEBPACK_IMPORTED_MODULE_2__directives_elements_Forms__["b" /* RequiredFormError */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_isotodate_pipe__["a" /* IsoToDatePipe */],
                __WEBPACK_IMPORTED_MODULE_9__pipes_location_pipe__["a" /* LocationPipe */],
                __WEBPACK_IMPORTED_MODULE_11__pipes_usercurrency_pipe__["a" /* UserCurrencyPipe */],
                __WEBPACK_IMPORTED_MODULE_7__pipes_countryname_pipe__["a" /* CountryNamePipe */],
                __WEBPACK_IMPORTED_MODULE_8__pipes_calendar_pipe__["a" /* CalendarPipe */], __WEBPACK_IMPORTED_MODULE_13__pipes_sanitize_pipe__["a" /* SanitizeHtmlPipe */],
                __WEBPACK_IMPORTED_MODULE_10__pipes_formerrors_pipe__["a" /* FormErrorsPipe */]
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_2__directives_elements_Forms__["a" /* IonRequired */], __WEBPACK_IMPORTED_MODULE_2__directives_elements_Forms__["b" /* RequiredFormError */], __WEBPACK_IMPORTED_MODULE_12__components_messagepanel__["a" /* MessagePanel */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_isotodate_pipe__["a" /* IsoToDatePipe */],
                __WEBPACK_IMPORTED_MODULE_9__pipes_location_pipe__["a" /* LocationPipe */],
                __WEBPACK_IMPORTED_MODULE_11__pipes_usercurrency_pipe__["a" /* UserCurrencyPipe */],
                __WEBPACK_IMPORTED_MODULE_7__pipes_countryname_pipe__["a" /* CountryNamePipe */], __WEBPACK_IMPORTED_MODULE_13__pipes_sanitize_pipe__["a" /* SanitizeHtmlPipe */],
                __WEBPACK_IMPORTED_MODULE_8__pipes_calendar_pipe__["a" /* CalendarPipe */],
                __WEBPACK_IMPORTED_MODULE_10__pipes_formerrors_pipe__["a" /* FormErrorsPipe */]],
            entryComponents: [],
            providers: []
        })
    ], GlobaltonUIModule);
    return GlobaltonUIModule;
    var GlobaltonUIModule_1;
}());



/***/ }),

/***/ "../../../../../src/lib/localton/components/DataWithChart/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataAndChartTemplate; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular_highcharts__ = __webpack_require__("../../../../angular-highcharts/angular-highcharts.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");


var DataAndChartTemplate = (function () {
    function DataAndChartTemplate(logic, appConfigService, type) {
        this.logic = logic;
        this.appConfigService = appConfigService;
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatTableDataSource */]([]);
        this.showDataTable = false;
        this.data = [];
        this.stockChartDefOptions = {
            chart: {
                type: 'candlestick'
            },
            title: {
                text: 'Loading'
            },
            credits: {
                enabled: false
            }, rangeSelector: {
                selected: 4,
                inputEnabled: false,
                buttonTheme: {
                    visibility: 'hidden'
                },
                labelStyle: {
                    visibility: 'hidden'
                }
            },
            series: [{
                    name: 'Line 1',
                    data: [1, 1]
                }]
        };
        this.plainChartDefOptions = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Loading'
            },
            credits: {
                enabled: false
            }, rangeSelector: {
                selected: 4,
                inputEnabled: false,
                buttonTheme: {
                    visibility: 'hidden'
                },
                labelStyle: {
                    visibility: 'hidden'
                }
            },
            series: [{
                    name: 'Line 1',
                    data: [1, 1]
                }]
        };
        if (type === "stock")
            this.chart = new __WEBPACK_IMPORTED_MODULE_0_angular_highcharts__["d" /* StockChart */](this.stockChartDefOptions);
        if (type === "plain")
            this.chart = new __WEBPACK_IMPORTED_MODULE_0_angular_highcharts__["a" /* Chart */](this.plainChartDefOptions);
        else
            this.chart = new __WEBPACK_IMPORTED_MODULE_0_angular_highcharts__["d" /* StockChart */](this.stockChartDefOptions);
    }
    DataAndChartTemplate.prototype.ngOnInit = function () {
        this.updateData();
    };
    DataAndChartTemplate.prototype.checkData = function () {
        console.log("checkData data=", this.data);
        if (!this.data || this.data.length === 0) {
            this.showNotEnoughData();
            return false;
        }
        else
            this.dataSource = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatTableDataSource */](this.data);
    };
    DataAndChartTemplate.prototype.updateOptions = function (opt) {
        this.options = Object.assign(this.options, opt);
    };
    ;
    DataAndChartTemplate.prototype.showNotEnoughData = function () {
        this.chart = new __WEBPACK_IMPORTED_MODULE_0_angular_highcharts__["d" /* StockChart */]({
            chart: {
                type: 'candlestick'
            },
            title: {
                text: 'Not enough data. Please change plot options.'
            },
            credits: {
                enabled: false
            }, rangeSelector: {
                selected: 4,
                inputEnabled: false,
                buttonTheme: {
                    visibility: 'hidden'
                },
                labelStyle: {
                    visibility: 'hidden'
                }
            },
            series: [{
                    name: 'Line 1',
                    data: [1, 1]
                }]
        });
    };
    return DataAndChartTemplate;
}());



/***/ }),

/***/ "../../../../../src/lib/localton/components/DataWithPagination/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataWithPaginationTemplate; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");

var DataWithPaginationTemplate = (function () {
    function DataWithPaginationTemplate(logic, appConfigService) {
        this.logic = logic;
        this.appConfigService = appConfigService;
        this.length = 100;
        this.pageSize = 10;
        this.pageSizeOptions = [10, 25, 100];
        this.pageIndex = 0;
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_0__angular_material__["i" /* MatTableDataSource */]([]);
        this.data = [];
        this.displayedData = [];
        this.isLoaded = false;
    }
    DataWithPaginationTemplate.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    DataWithPaginationTemplate.prototype.ngOnInit = function () {
        this.updateData();
    };
    DataWithPaginationTemplate.prototype.updatePagination = function (event) {
        this.pageIndex = event.pageIndex;
        this.showData();
    };
    DataWithPaginationTemplate.prototype.showData = function (res) {
        if (res)
            this.data = res;
        this.displayedData = this.data.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_0__angular_material__["i" /* MatTableDataSource */](this.displayedData);
        this.length = this.data.length;
        this.isLoaded = true;
    };
    return DataWithPaginationTemplate;
}());



/***/ }),

/***/ "../../../../../src/lib/localton/components/PageWithTabs/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageWithTabs; });
var PageWithTabs = (function () {
    function PageWithTabs() {
    }
    PageWithTabs.prototype.tabChanged = function (event) {
        this.tabIndex = event.index;
    };
    PageWithTabs.prototype.ngOnInit = function () {
    };
    return PageWithTabs;
}());



/***/ }),

/***/ "../../../../../src/lib/localton/local.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_data_service__ = __webpack_require__("../../../../../src/lib/localton/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_import_service__ = __webpack_require__("../../../../../src/lib/localton/services/import.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_event_service__ = __webpack_require__("../../../../../src/lib/localton/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_workspace_service__ = __webpack_require__("../../../../../src/lib/localton/services/workspace.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var LocalModule = (function () {
    function LocalModule() {
    }
    LocalModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */]
            ],
            declarations: [],
            exports: [],
            entryComponents: [],
            providers: [__WEBPACK_IMPORTED_MODULE_3__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_4__services_appconfig_service__["a" /* AppConfigService */], __WEBPACK_IMPORTED_MODULE_5__services_import_service__["a" /* ImportService */], __WEBPACK_IMPORTED_MODULE_6__services_event_service__["a" /* EventService */], __WEBPACK_IMPORTED_MODULE_7__services_workspace_service__["a" /* WorkspaceService */]]
        })
    ], LocalModule);
    return LocalModule;
}());



/***/ }),

/***/ "../../../../../src/lib/localton/services/appconfig.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfigService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globalton_core_services_config_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__globalton_core_services_console_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/console.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__globalton_core_services_api_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__globalton_core_services_auth_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppConfigService = (function () {
    function AppConfigService(configService, consoleService, apiService, authService, logic) {
        var _this = this;
        this.configService = configService;
        this.consoleService = consoleService;
        this.apiService = apiService;
        this.authService = authService;
        this.logic = logic;
        this.values = ["BTC", "ETH", "BCH", "XRP", "DASH", "XMR", "LTC", "ZEC"];
        this.valuesandglobal = ["GLOBAL"];
        this.formats = ["chart", "numeric"];
        this.names = {
            GLOBA: "Global",
            BTC: "Bitcoin",
            "ETH": "Ethereum",
            "BCH": "Bitcoin Cash",
            "XRP": "Ripple",
            "DASH": "Dash",
            "XMR": "Monero",
            "LTC": "LiteCoin",
            "ZEC": "ZCash"
        };
        this.bases = ["USD", "EUR"];
        this.intervals = [1, 5, 15, 30, 60, 240, 1440];
        this.intervalNames = { 1: "1m", 5: "5m", 15: "15m", 30: "30m", 60: "1H", 240: "4H", 1440: "1D" };
        this.sources = { kraken: "kraken.com", "ccc": "cryptocurrencychart.com", "cmc": "coinmarketcap.com" };
        this.lastNames = { "last24h": "Last day", "last7d": "Last week", "last30d": "Last month" };
        this.times = ["last24h", "last7d", "last30d"];
        this.widgetConfig = {
            "PRICE_CHANGE": { time: true, symbol: true },
            "VOLUME_CHANGE": { time: true, symbol: true },
            "LATEST_NEWS": { time: false, symbol: true },
            "LATEST_TWEETS": { time: false, symbol: true },
            "CHART_MARKETCAP": { time: false, symbol: true },
            "CHART_PRICE": { time: false, symbol: true },
            "CHART_VOLUME": { time: false, symbol: true },
            "RANKING_MARKETCAP": { time: false, symbol: false },
            "PERF_LASTWEEK": { time: false, symbol: true, format: true },
            "EVOL_MARKETCAP_MINI": { time: true, symbol: false }
        };
        this.specialPanels = [{ id: 'SP_LISTING', type: "special", title: "Listing" }, { id: 'SP_SEPARATOR', type: "separator", title: "Separator" }];
        this.specialLinks = { 'SP_LISTING': "/listing" };
        this.widgets = [
            {
                code: "PRICE_CHANGE",
                title: "Price change",
                size: "1x1",
                id: 1,
            }, {
                title: "Volume change",
                code: "VOLUME_CHANGE",
                size: "1x1",
                id: 2
            }, {
                title: "Latest news",
                code: "LATEST_NEWS",
                size: "2x4",
                id: 3
            }, {
                title: "Latest tweets",
                code: "LATEST_TWEETS",
                size: "2x4",
                id: 4
            }, {
                title: "Market Cap Chart",
                code: "CHART_MARKETCAP",
                size: "4x4",
                id: 5
            }, {
                title: "Volume Chart",
                code: "CHART_VOLUME",
                size: "4x4",
                id: 7
            }, {
                title: "Price Chart",
                code: "CHART_PRICE",
                size: "4x4",
                id: 6
            }, {
                title: "Market cap rankings",
                code: "RANKING_MARKETCAP",
                size: "4x2",
                id: 8
            }, {
                title: "Market cap evol",
                code: "EVOL_MARKETCAP_MINI",
                size: "1x2",
                id: 9
            }, {
                title: "Perf last week",
                code: "PERF_LASTWEEK",
                size: "1x4",
                id: 10
            }
        ];
        this.valuesandglobal.push.apply(this.valuesandglobal, this.values);
        this.apiService.setApiUrl("http://34.242.69.165:3001/api/");
        this.consoleService.serv("+ AppConfigService");
        this.configService.app = "comeoncoins";
        this.configService.perSiteConfigured.emit({ "type": "general" });
        if (this.authService.isAuthenticated())
            this.logic.readSubscription(function (res) {
                console.log("expiration", res);
                _this.authService.paymentExpiration = res.expiration;
                console.log("active", _this.authService.isSubscriptionActive(), _this.authService.authenticated, _this.authService.paymentExpiration, _this.authService.paymentExpiration > new Date().getTime() / 1000);
            });
    }
    AppConfigService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__globalton_core_services_config_service__["a" /* ConfigService */], __WEBPACK_IMPORTED_MODULE_2__globalton_core_services_console_service__["a" /* ConsoleService */], __WEBPACK_IMPORTED_MODULE_3__globalton_core_services_api_service__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_4__globalton_core_services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_5__logic_Logic__["a" /* Logic */]])
    ], AppConfigService);
    return AppConfigService;
}());



/***/ }),

/***/ "../../../../../src/lib/localton/services/data.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_restangular__ = __webpack_require__("../../../../ngx-restangular/dist/esm/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_restangular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ngx_restangular__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DataService = (function () {
    function DataService(requestService, restangular) {
        this.requestService = requestService;
        this.restangular = restangular;
        this.database = "c";
    }
    DataService.prototype.post = function (table, obj, f) {
        console.log("[POST]", table, obj);
        var dt = this.restangular.all(table);
        var r = dt.post(obj).toPromise();
        r.then(function (res) {
            f(res);
        })
            .catch(function (error) {
            console.log("There was an error performing");
            f(null);
        });
        /*.subscribe(res => {
    
    
          f(res)
        },err=> {
          console.log("There was an error performing");
          f(null)
        });;;*/
    };
    DataService.prototype.perform = function (call, obj, f) {
        call = "rpc/" + call;
        console.log("[PERFORM]", call, obj);
        var dt = this.restangular.all(call);
        var r = dt.post(obj).toPromise();
        r.then(function (res) {
            f(res);
        }, function () {
            console.log("There was an error performing");
            f(null);
        });
        ;
    };
    DataService.prototype.getQueryParam = function (where, order) {
        if (this.database === "c") {
            var res = {};
            for (var k in where) {
                res[k] = "eq." + where[k];
            }
            if (order)
                res["order"] = order.key + "." + order.dir;
            return res;
        }
    };
    DataService.prototype.getAll = function (table, f, where, order) {
        console.log("[GET ALL]", table, where);
        var dt = this.restangular.all(table);
        var q = this.getQueryParam(where, order);
        dt.customGETLIST("", q).subscribe(function (accounts) {
            f(accounts);
        });
    };
    DataService.prototype.getById = function (table, id, f) {
        var dt = this.restangular.one(table, id);
        dt.get().subscribe(function (obj) {
            f(obj);
        });
    };
    DataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__globalton_core_services_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_2_ngx_restangular__["Restangular"]])
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ "../../../../../src/lib/localton/services/event.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EventService = (function () {
    function EventService() {
        this.panelCreatorEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.loginEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.subscribeEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.panelChangedEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.workspaceUpdatedEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    EventService.prototype.showPanelCreator = function () {
        this.panelCreatorEvent.emit({ display: true });
    };
    EventService.prototype.hidePanelCreator = function () {
        console.log("EVENT > hidePanelCreator");
        this.panelCreatorEvent.emit({ display: false });
    };
    EventService.prototype.loadPanelCreator = function (p) {
        console.log("EVENT > loadPanelCreator", p);
        this.panelCreatorEvent.emit({ load: p });
    };
    EventService.prototype.unloadPanelCreator = function () {
        console.log("EVENT > unloadPanelCreator");
        this.panelCreatorEvent.emit({ unload: true });
    };
    EventService.prototype.showLogin = function () {
        this.loginEvent.emit(true);
    };
    EventService.prototype.hideSubscribe = function () {
        this.subscribeEvent.emit(false);
    };
    EventService.prototype.showSubscribe = function () {
        this.subscribeEvent.emit(true);
    };
    EventService.prototype.hideLogin = function () {
        this.loginEvent.emit(false);
    };
    EventService.prototype.showPanel = function (w) {
        this.panelChangedEvent.emit(w);
    };
    EventService.prototype.setPanel = function (p) {
        console.log("set panel", p);
        this.showPanel(p);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], EventService.prototype, "panelCreatorEvent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], EventService.prototype, "loginEvent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], EventService.prototype, "subscribeEvent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], EventService.prototype, "panelChangedEvent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], EventService.prototype, "workspaceUpdatedEvent", void 0);
    EventService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], EventService);
    return EventService;
}());



/***/ }),

/***/ "../../../../../src/lib/localton/services/import.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImportService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ImportService = (function () {
    function ImportService(requestService, logic, appConfigService) {
        this.requestService = requestService;
        this.logic = logic;
        this.appConfigService = appConfigService;
    }
    ImportService.prototype.correctJSON = function (content) {
        return content.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
    };
    ImportService.prototype.importCoinMarketCapTicker = function (source, content, base) {
        console.log("IMPORT", source, content, typeof content, base);
        var correctJson = this.correctJSON(content);
        var file = JSON.parse(correctJson);
        var date = new Date().getTime();
        for (var i = 0; i < file.length; ++i) {
            var d = file[i];
            this.saveCoinMarketCapTicker(source, "USD", d.symbol, d.market_cap_usd, d.total_supply, date, parseFloat(d["24h_volume_usd"]));
        }
    };
    ImportService.prototype.saveCoinMarketCapTicker = function (source, base, symbol, marketcap, supply, timestamp, volume) {
        var obj = {
            source: source,
            base: base,
            symbol: symbol,
            marketcap: marketcap,
            supply: supply,
            ts: timestamp,
            volume: volume
        };
        //this.logic.saveMarketData(obj)
    };
    ImportService.prototype.getImportLinks = function (source, lastimport) {
        var links = [];
        var pairs = this.getKrakenPairList(source); //["XXBTZEUR","XETHZEUR","DASHEUR","BCHEUR","XXRPZEUR","XETCZEUR"]
        if (source === "kraken") {
            for (var i = 0; i < pairs.length; ++i) {
                var p = pairs[i];
                for (var j = 0; j < this.appConfigService.intervals.length; ++j) {
                    var inter = this.appConfigService.intervals[j];
                    var l = "https://api.kraken.com/0/public/OHLC?pair=" + p + "&interval=" + inter + (lastimport ? ("&since=" + lastimport) : "");
                    links.push(l);
                }
            }
            return links;
        }
    };
    ImportService.prototype.getLastImport = function (source, f) {
        this.logic.getLastImport(source, "price", function (res) {
            if (res) {
                f((parseInt(res, 10) - 100000).toString());
            }
            else {
                f(null);
            }
        });
    };
    ImportService.prototype.getPairCode = function (source, symbol, base) {
        if (source === "kraken") {
            if (symbol === "BTC") {
                return "XXBTZ" + base;
            }
            else if (symbol === "ETH") {
                return "XETHZ" + base;
            }
            else if (symbol === "DASH") {
                return "DASH" + base;
            }
            else if (symbol === "BCH") {
                return "BCH" + base;
            }
            else if (symbol === "XRP") {
                return "XXRPZ" + base;
            }
            else if (symbol === "ETC") {
                return "XETCZ" + base;
            }
            else {
                console.log("unimplemented symbol");
            }
        }
    };
    ImportService.prototype.getKrakenPairList = function (source) {
        var A = [];
        for (var i = 0; i < this.appConfigService.values.length; ++i) {
            var s = this.appConfigService.values[i];
            for (var j = 0; j < this.appConfigService.bases.length; ++j) {
                var b = this.appConfigService.bases[j];
                A.push(this.getPairCode(source, s, b));
            }
        }
        return A;
    };
    ImportService.prototype.importKrakenPrices = function (source, content, base, symbol, interval) {
        console.log("IMPORT", source, content, typeof content, base, symbol, interval);
        if (source === "kraken") {
            var file = JSON.parse(content);
            var res = file.result;
            console.log("res", res);
            var key = this.getPairCode(source, symbol, base);
            var data = res[key];
            console.log("data", data, key);
            if (!data) {
                console.log("pair not found");
                return;
            }
            for (var i = 0; i < data.length; ++i) {
                var d = data[i];
                this.savePrice(source, base, symbol, interval, parseInt(d[0]), parseFloat(d[1]), parseFloat(d[2]), parseFloat(d[3]), parseFloat(d[4]), parseFloat(d[6]));
            }
        }
    };
    ImportService.prototype.savePrice = function (source, base, symbol, interval, timestamp, open, high, low, close, volume) {
        var obj = {
            "source": source,
            base: base,
            symbol: symbol,
            interval: interval,
            ts: timestamp,
            open: open,
            high: high, low: low, close: close, volume: volume
        };
        //this.logic.saveOHLC(obj)
    };
    ImportService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__globalton_core_services_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_2__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_3__appconfig_service__["a" /* AppConfigService */]])
    ], ImportService);
    return ImportService;
}());



/***/ }),

/***/ "../../../../../src/lib/localton/services/workspace.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkspaceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__globalton_core_services_config_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__event_service__ = __webpack_require__("../../../../../src/lib/localton/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__globalton_core_services_auth_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var WorkspaceService = (function () {
    function WorkspaceService(logic, authService, configService, eventService, appConfigService) {
        var _this = this;
        this.logic = logic;
        this.authService = authService;
        this.configService = configService;
        this.eventService = eventService;
        this.appConfigService = appConfigService;
        this.defaultWorkspace = [{ panels: ["5a464411996ced000eacecea", "5a4641a4996ced000eacece6", "5a464329996ced000eacece8", "5a464468996ced000eacecec",
                    "5a46447b996ced000eacecee",
                    "5a46448c996ced000eacecf0",
                    "5a46449a996ced000eacecf2",
                    "5a4644d6996ced000eacecf4",
                    "5a4644e3996ced000eacecf6",
                    "5a4644ea996ced000eacecf8",
                    "5a464559996ced000eacecfc",
                    "5a464552996ced000eacecfa"], name: "Default workspace" }];
        console.log("MENU > Loading Sidebar");
        if (this.authService.isAuthenticated()) {
            this.logic.loadMyPanels(function (res) {
                _this.panelsObject = res.object;
                _this.panelsArray = res.array;
                _this.setSpecialPanels();
                _this.loadWorkspaces(function () {
                    //this.loadFirstPanel()
                });
            });
        }
        else {
            this.logic.loadDefaultPanels(this.defaultWorkspace[0].panels, function (res) {
                _this.panelsObject = res.object;
                _this.panelsArray = res.array;
                _this.loadDefaultWorkspace(function () {
                });
            });
        }
    }
    WorkspaceService.prototype.setSpecialPanels = function () {
        for (var i = 0; i < this.appConfigService.specialPanels.length; ++i) {
            var p = this.appConfigService.specialPanels[i];
            this.panelsObject[p.id] = p;
            this.panelsArray.push(p);
        }
    };
    WorkspaceService.prototype.setWorkspaces = function (w) {
    };
    WorkspaceService.prototype.getWorkspace = function () {
    };
    WorkspaceService.prototype.getCurrentWorkspace = function () {
        console.log("GETCUR", this.currentWorkspace);
        return this.currentWorkspace;
    };
    WorkspaceService.prototype.getPanelArray = function () {
        console.log("gpa", this.panelsArray);
        return this.panelsArray;
    };
    WorkspaceService.prototype.getPanelsObject = function () {
        console.log("gpa", this.panelsObject);
        return this.panelsObject;
    };
    WorkspaceService.prototype.getAllWorkspaces = function () {
        return this.workspaces;
    };
    WorkspaceService.prototype.getPanel = function (boardId) {
        console.log("this.getpanel", boardId, this.panelsObject);
        if (boardId)
            if (this.panelsObject && boardId in this.panelsObject) {
                var p = this.panelsObject[boardId];
                p.tabs = JSON.parse(p.content);
                return p;
            }
    };
    WorkspaceService.prototype.parsePanel = function (p) {
        p.tabs = JSON.parse(p.content);
    };
    WorkspaceService.prototype.loadSidebar = function () {
    };
    WorkspaceService.prototype.loadDefaultWorkspace = function (f) {
        this.workspaces = this.defaultWorkspace;
        this.setCurrentWorkspace();
    };
    WorkspaceService.prototype.loadWorkspaces = function (f) {
        var _this = this;
        console.log("MENU > loading workspaces");
        this.logic.getMyWorkspaces(function (res) {
            console.log("MENU > WORKSPACES", res);
            _this.workspaces = res;
            if (_this.workspaces.length == 0)
                _this.logic.saveWorkspace({ panels: [], name: "Main workspace" }, function (res) {
                    _this.workspaces = [res];
                });
            _this.setCurrentWorkspace();
            f();
        });
    };
    WorkspaceService.prototype.setCurrentWorkspace = function () {
        if (this.workspaces.length == 1)
            this.currentWorkspace = this.workspaces[0];
        else if (this.workspaces.length > 1)
            this.currentWorkspace = this.workspaces[0];
        this.eventService.workspaceUpdatedEvent.emit(this.currentWorkspace);
    };
    WorkspaceService.prototype.getFirstPanel = function () {
        console.log("MENU > loadFirstPanel", this.currentWorkspace, this.panelsObject);
        if (this.currentWorkspace && this.currentWorkspace.panels && this.currentWorkspace.panels.length > 0) {
            var boardId = this.currentWorkspace.panels[0];
            if (boardId in this.panelsObject) {
                var p = this.panelsObject[boardId];
                console.log("MAIN > currentpanel", p);
                p.tabs = JSON.parse(p.content);
                return p;
            }
        }
        else {
            console.log("empty panels", this.currentWorkspace);
        }
    };
    WorkspaceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_5__globalton_core_services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_2__globalton_core_services_config_service__["a" /* ConfigService */], __WEBPACK_IMPORTED_MODULE_3__event_service__["a" /* EventService */], __WEBPACK_IMPORTED_MODULE_4__appconfig_service__["a" /* AppConfigService */]])
    ], WorkspaceService);
    return WorkspaceService;
}());



/***/ }),

/***/ "../../../../../src/logic/Logic.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Logic; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_data_service__ = __webpack_require__("../../../../../src/lib/localton/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_globalton_core_services_api_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_globalton_core_services_auth_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Logic = (function () {
    function Logic(dataService, apiService, authService) {
        this.dataService = dataService;
        this.apiService = apiService;
        this.authService = authService;
    }
    Logic.prototype.registerUser = function (obj, f) {
        var _this = this;
        console.log("Register ", obj);
        this.apiService.noauthpost("user", obj, function (res) {
            if (res.token) {
                _this.authService.loginResponse = res;
                _this.authService.postLogin();
                f({ success: true });
            }
            else {
                f({ success: false, error: true });
            }
        });
    };
    Logic.prototype.saveUser = function (obj, f) {
        this.dataService.post("user", obj, f);
    };
    /* PAYMENT */
    Logic.prototype.generateAddress = function (planId, f) {
        var userId = this.authService.userId;
        this.apiService.noauthget("payment/generatebitcoinaddress?userId=" + userId + "&planId=" + planId, function (res) {
            f(res.result);
        });
    };
    Logic.prototype.getPlans = function (f) {
        var userId = this.authService.userId;
        this.apiService.noauthget("plan/getPlans", function (res) {
            f(res.result);
        });
    };
    Logic.prototype.readSubscription = function (f) {
        this.apiService.noauthget("user/getexpiration?userId=" + this.authService.userId, function (res) {
            f(res.result);
        });
    };
    Logic.prototype.checkBitcoinPayment = function (paymentId, f) {
        console.log("checkbitcoinpayment", paymentId);
        this.apiService.noauthget("payment/checkbitcoinpayment?paymentId=" + paymentId, function (res) {
            if (res && res.result)
                f(res.result);
            else
                f(null);
        });
    };
    Logic.prototype.getMe = function (f) {
        this.apiService.noauthget("user/" + this.authService.userId, f);
    };
    Logic.prototype.getChartData = function (source, interval, symbol, base, f) {
        this.dataService.getAll("recordprice", f, {
            source: source,
            interval: interval,
            symbol: symbol,
            base: base
        }, { key: "ts", dir: "asc" });
    };
    Logic.prototype.getMarketCapEvol = function (source, base, from, to, f) {
        this.dataService.perform("marketcapevol", { psource: source, pfrom: from, pto: to, pbase: base }, f);
    };
    Logic.prototype.getMarketCapData = function (source, symbol, base, f) {
        this.dataService.perform("marketcap", { psource: source, psymbol: symbol, pbase: base }, f);
    };
    Logic.prototype.getPriceDivMarketCapData = function (source, symbol, base, f) {
        this.dataService.perform("pricedivmarket", { psource: source, psymbol: symbol, pbase: base }, f);
    };
    Logic.prototype.getVolumeData = function (source, symbol, base, f) {
        this.dataService.perform("volumedd", { psource: source, psymbol: symbol, pbase: base }, f);
    };
    Logic.prototype.getVolumeWeekData = function (source, symbol, base, f) {
        this.dataService.perform("volumeweekccc", { psource: source, psymbol: symbol, pbase: base }, f);
    };
    Logic.prototype.getAllChartData = function (source, interval, timestamp, base, f) {
        this.dataService.getAll("recordprice", f, { source: source, interval: interval, ts: timestamp, base: base });
    };
    /*
  
          PERFORM
  
    * */
    Logic.prototype.getMarketData = function (source, base, ts, f) {
        this.dataService.perform("allsymbolscap", { psource: source, pts: ts, pbase: base }, f);
    };
    Logic.prototype.getDailyTopPerformance = function (source, ts, base, f) {
        this.dataService.perform("dailytopperf", { pts: ts, pbase: base, psource: source }, f);
    };
    Logic.prototype.getTopPerformance = function (source, from, to, base, f) {
        this.dataService.perform("topperf", { pfrom: from, pto: to, pbase: base, psource: source }, f);
    };
    Logic.prototype.getPerfLastWeek = function (source, days, ts, symbol, base, f) {
        this.dataService.perform("lastweekperf", { pts: ts, psymbol: symbol, pdays: days, pbase: base, psource: source }, f);
    };
    Logic.prototype.getCapLastWeek = function (source, days, ts, symbol, base, f) {
        this.dataService.perform("caplastweek", { pts: ts, psymbol: symbol, pdays: days, pbase: base, psource: source }, f);
    };
    Logic.prototype.getTrendingPriceCapLastWeek = function (source, days, ts, base, sourcecap, f) {
        var options = { pts: ts, pdays: days, pbase: base, psourceprice: source, psourcecap: sourcecap };
        this.dataService.perform("pricecaplastweek2d", options, f);
    };
    Logic.prototype.getLastImport = function (source, type, f) {
        this.dataService.getAll("import", function (res) {
            if (res.length > 0)
                f(res[0].timestamp);
            else
                f(null);
        }, { source: source, type: type }, { key: "ts", dir: "DESC" });
    };
    Logic.prototype.savePanel = function (panel, f) {
        panel.userId = this.authService.userId;
        if (panel.id)
            this.apiService.authput("user/" + this.authService.userId + "/panels/" + panel.id, panel, function (res) {
                f(res);
            });
        else
            this.apiService.authpost("user/" + this.authService.userId + "/panels", panel, function (res) {
                f(res);
            });
    };
    Logic.prototype.getMyPanels = function (f) {
        this.apiService.authget("user/" + this.authService.userId + "/panels", function (res) {
            f(res);
        });
    };
    Logic.prototype.getPanels = function (array, f) {
        var url = 'panel?filter={"where":{"id":{"inq":["' + array.join('","') + '"]}}}';
        this.apiService.authget(url, function (res) {
            f(res);
        });
    };
    Logic.prototype.getMyWorkspaces = function (f) {
        this.apiService.authget("user/" + this.authService.userId + "/workspaces", function (res) {
            f(res);
        });
    };
    Logic.prototype.saveWorkspace = function (w, f) {
        if (w.id)
            this.apiService.authput("user/" + this.authService.userId + "/workspaces/" + w.id, w, function (res) {
                f(res);
            });
        else
            this.apiService.authpost("user/" + this.authService.userId + "/workspaces", w, function (res) {
                f(res);
            });
    };
    Logic.prototype.getNews = function (q, f) {
        var url = "widget/searchNews?q=" + q;
        this.apiService.noauthget(url, function (res) {
            f(res.searchNews.feed.entries);
        });
    };
    Logic.prototype.getTweets = function (q, f) {
        var url = "widget/searchTweets?q=" + q;
        this.apiService.noauthget(url, function (res) {
            f(res);
        });
    };
    Logic.prototype.loadMyPanels = function (f) {
        var A = {};
        this.getMyPanels(function (res) {
            for (var i = 0; i < res.length; ++i)
                A[res[i].id] = res[i];
            f({ array: res, object: A });
        });
    };
    Logic.prototype.loadDefaultPanels = function (array, f) {
        var A = {};
        this.getPanels(array, function (res) {
            for (var i = 0; i < res.length; ++i)
                A[res[i].id] = res[i];
            f({ array: res, object: A });
        });
    };
    Logic = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__lib_localton_services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_2__lib_globalton_core_services_api_service__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_3__lib_globalton_core_services_auth_service__["a" /* AuthService */]])
    ], Logic);
    return Logic;
}());



/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_hammerjs__);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "../../../../../src/pages/account/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppAccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__ = __webpack_require__("../../../../../src/lib/localton/services/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppAccountPage = (function () {
    function AppAccountPage(requestService, dataService) {
        this.requestService = requestService;
        this.dataService = dataService;
    }
    AppAccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-account',
            template: __webpack_require__("../../../../../src/pages/account/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__["a" /* DataService */]])
    ], AppAccountPage);
    return AppAccountPage;
}());



/***/ }),

/***/ "../../../../../src/pages/account/template.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"padding:20px\">\r\n<app-login [popup]=\"false\"></app-login>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/pages/allocation-item/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppAllocationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__ = __webpack_require__("../../../../../src/lib/localton/services/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppAllocationPage = (function () {
    function AppAllocationPage(requestService, dataService) {
        this.requestService = requestService;
        this.dataService = dataService;
    }
    AppAllocationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-allocation',
            template: __webpack_require__("../../../../../src/pages/allocation-item/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__["a" /* DataService */]])
    ], AppAllocationPage);
    return AppAllocationPage;
}());



/***/ }),

/***/ "../../../../../src/pages/allocation-item/template.html":
/***/ (function(module, exports) {

module.exports = "\r\n<mat-toolbar>\r\n  <h3>Allocation</h3>\r\n\r\n</mat-toolbar>\r\n"

/***/ }),

/***/ "../../../../../src/pages/chart-item/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppChartItemPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_localton_components_PageWithTabs_component__ = __webpack_require__("../../../../../src/lib/localton/components/PageWithTabs/component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppChartItemPage = (function (_super) {
    __extends(AppChartItemPage, _super);
    function AppChartItemPage(logic, appConfigService) {
        var _this = _super.call(this) || this;
        _this.logic = logic;
        _this.appConfigService = appConfigService;
        return _this;
    }
    AppChartItemPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-price-page',
            template: __webpack_require__("../../../../../src/pages/chart-item/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__["a" /* AppConfigService */]])
    ], AppChartItemPage);
    return AppChartItemPage;
}(__WEBPACK_IMPORTED_MODULE_3__lib_localton_components_PageWithTabs_component__["a" /* PageWithTabs */]));



/***/ }),

/***/ "../../../../../src/pages/chart-item/template.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"price\">\r\n  <mat-toolbar style=\"background-color: #1d36a9\">\r\n  <h3   style=\"color: white\">Price </h3>\r\n</mat-toolbar>\r\n\r\n\r\n\r\n\r\n  <mat-tab-group (selectedTabChange)=\"tabChanged($event)\">\r\n    <mat-tab label=\"Price\">\r\n      <app-price></app-price>\r\n    </mat-tab>\r\n    <mat-tab label=\"Volume\" >\r\n      <app-volume *ngIf=\"tabIndex==1\"></app-volume>\r\n    </mat-tab>\r\n    <mat-tab label=\"Correlations\" >\r\n      <app-volume *ngIf=\"tabIndex==1\"></app-volume>\r\n    </mat-tab>\r\n  </mat-tab-group>\r\n\r\n\r\n\r\n</section>\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/pages/config-all/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfigAllPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__ = __webpack_require__("../../../../../src/lib/localton/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_event_service__ = __webpack_require__("../../../../../src/lib/localton/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_globalton_core_services_auth_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppConfigAllPage = (function () {
    function AppConfigAllPage(authService, requestService, dataService, eventService, logic) {
        var _this = this;
        this.authService = authService;
        this.requestService = requestService;
        this.dataService = dataService;
        this.eventService = eventService;
        this.logic = logic;
        if (this.authService.isAuthenticated())
            this.logic.getMe(function (user) {
                _this.user = user;
            });
    }
    AppConfigAllPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-config-all',
            template: __webpack_require__("../../../../../src/pages/config-all/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__lib_globalton_core_services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_event_service__["a" /* EventService */], __WEBPACK_IMPORTED_MODULE_4__logic_Logic__["a" /* Logic */]])
    ], AppConfigAllPage);
    return AppConfigAllPage;
}());



/***/ }),

/***/ "../../../../../src/pages/config-all/template.html":
/***/ (function(module, exports) {

module.exports = "<ng-template *ngIf=\"authService?.isAuthenticated()\">\r\n    <mat-toolbar>\r\n      <h3>Settings </h3>\r\n\r\n    </mat-toolbar>\r\n\r\n<mat-tab-group>\r\n  <mat-tab label=\"Profile\">\r\n   E-mail: {{user?.email}}\r\n  </mat-tab>\r\n\r\n  <mat-tab label=\"Subscription\">Premium expires on {{\r\n    user?.currentPaymentExpiration | date:\"medium\"}}</mat-tab>\r\n  <mat-tab label=\"Interface\">Language: en_US</mat-tab>\r\n</mat-tab-group>\r\n</ng-template>\r\n<ng-template *ngIf=\"!authService?.isAuthenticated()\">\r\n    <app-login [popup]=\"false\"></app-login>\r\n\r\n</ng-template>"

/***/ }),

/***/ "../../../../../src/pages/config-profile/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfigProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__ = __webpack_require__("../../../../../src/lib/localton/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_event_service__ = __webpack_require__("../../../../../src/lib/localton/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppConfigProfilePage = (function () {
    function AppConfigProfilePage(requestService, dataService, eventService, logic) {
        var _this = this;
        this.requestService = requestService;
        this.dataService = dataService;
        this.eventService = eventService;
        this.logic = logic;
        this.logic.getMe(function (user) {
            _this.user = user;
        });
    }
    AppConfigProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-config-profile',
            template: __webpack_require__("../../../../../src/pages/config-profile/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_event_service__["a" /* EventService */], __WEBPACK_IMPORTED_MODULE_4__logic_Logic__["a" /* Logic */]])
    ], AppConfigProfilePage);
    return AppConfigProfilePage;
}());



/***/ }),

/***/ "../../../../../src/pages/config-profile/template.html":
/***/ (function(module, exports) {

module.exports = "\r\n    <mat-toolbar>\r\n      <h3>Config > Profile </h3>\r\n    </mat-toolbar>\r\n    <mat-list>\r\n\r\n    </mat-list>\r\n"

/***/ }),

/***/ "../../../../../src/pages/dashboard/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppDashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__ = __webpack_require__("../../../../../src/lib/localton/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_localton_components_PageWithTabs_component__ = __webpack_require__("../../../../../src/lib/localton/components/PageWithTabs/component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppDashboardPage = (function (_super) {
    __extends(AppDashboardPage, _super);
    function AppDashboardPage(requestService, dataService) {
        var _this = _super.call(this) || this;
        _this.requestService = requestService;
        _this.dataService = dataService;
        return _this;
    }
    AppDashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__("../../../../../src/pages/dashboard/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__["a" /* DataService */]])
    ], AppDashboardPage);
    return AppDashboardPage;
}(__WEBPACK_IMPORTED_MODULE_3__lib_localton_components_PageWithTabs_component__["a" /* PageWithTabs */]));



/***/ }),

/***/ "../../../../../src/pages/dashboard/template.html":
/***/ (function(module, exports) {

module.exports = "\r\n\r\n<mat-toolbar><h3>Dashboard</h3></mat-toolbar>\r\n\r\n  <mat-tab-group  (selectedTabChange)=\"tabChanged($event)\">\r\n\r\n  <mat-tab label=\"Overview\">\r\n<app-marketcap-evol-mini></app-marketcap-evol-mini>\r\n    <app-trending-lastweek></app-trending-lastweek>\r\n\r\n  </mat-tab>\r\n  <mat-tab label=\"Top 10\">\r\n    <app-top-performance *ngIf=\"tabIndex==1\"></app-top-performance>\r\n  </mat-tab>\r\n  <mat-tab label=\"Market Cap\">\r\n    <app-marketcap-evol *ngIf=\"tabIndex==2\"></app-marketcap-evol>\r\n  </mat-tab>\r\n</mat-tab-group>\r\n\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/pages/evolution-item/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppEvolutionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__ = __webpack_require__("../../../../../src/lib/localton/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppEvolutionPage = (function () {
    function AppEvolutionPage(requestService, dataService, logic) {
        this.requestService = requestService;
        this.dataService = dataService;
        this.logic = logic;
        this.value = "BTC";
        this.period = "60";
        this.base = "EUR";
        this.source = "kraken";
        this.data = [];
    }
    AppEvolutionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-chart-item',
            template: __webpack_require__("../../../../../src/pages/evolution-item/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_3__logic_Logic__["a" /* Logic */]])
    ], AppEvolutionPage);
    return AppEvolutionPage;
}());



/***/ }),

/***/ "../../../../../src/pages/evolution-item/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>\r\n  <h3>Evolution</h3>\r\n  A REFAIRE\r\n</mat-toolbar>\r\n<app-sorted-performance></app-sorted-performance>\r\n<app-evolution-table></app-evolution-table>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/pages/generic/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppGenericPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__ = __webpack_require__("../../../../../src/lib/localton/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_event_service__ = __webpack_require__("../../../../../src/lib/localton/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_globalton_core_services_auth_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_globalton_core_services_console_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/console.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_localton_services_workspace_service__ = __webpack_require__("../../../../../src/lib/localton/services/workspace.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AppGenericPage = (function () {
    function AppGenericPage(requestService, dataService, eventService, consoleService, authService, workspaceService, route) {
        var _this = this;
        this.requestService = requestService;
        this.dataService = dataService;
        this.eventService = eventService;
        this.consoleService = consoleService;
        this.authService = authService;
        this.workspaceService = workspaceService;
        this.route = route;
        this.route.params.subscribe(function (params) {
            _this.boardId = params['id'];
            console.log(_this.boardId);
            console.log("+ GENERIC", _this.boardId);
            _this.loadPanel();
        });
    }
    AppGenericPage.prototype.ngOnInit = function () {
        var _this = this;
        this.consoleService.ui("GENERIC > INIT", this.currentPanel);
        this.eventService.panelChangedEvent.subscribe(function (val) { return _this.panelUpdated(val); });
        this.eventService.workspaceUpdatedEvent.subscribe(function (val) { return _this.workspacelUpdated(val); });
    };
    AppGenericPage.prototype.workspacelUpdated = function (val) {
        console.log("GENERIC workspacelUpdated");
        this.loadPanel();
    };
    AppGenericPage.prototype.loadPanel = function () {
        if (!this.boardId)
            this.currentPanel = this.workspaceService.getFirstPanel();
        else
            this.currentPanel = this.workspaceService.getPanel(this.boardId);
    };
    AppGenericPage.prototype.panelUpdated = function (w) {
        this.consoleService.ui("GENERIC > panel updated", w);
        this.currentPanel = w;
        this.readPanel();
    };
    AppGenericPage.prototype.editPanel = function () {
        this.eventService.showPanelCreator();
    };
    AppGenericPage.prototype.readPanel = function () {
        //this.consoleService.ui("readpanel",this.contentstr)
        this.currentPanel.tabs = JSON.parse(this.currentPanel.content);
        this.consoleService.ui("GENERIC > readPanel", this.currentPanel);
    };
    AppGenericPage.prototype.openPanelEditor = function (p) {
        this.consoleService.ui("GENERIC > openPanelEditor");
        this.eventService.showPanelCreator();
        this.eventService.loadPanelCreator(p);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AppGenericPage.prototype, "currentPanel", void 0);
    AppGenericPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-generic',
            template: __webpack_require__("../../../../../src/pages/generic/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_event_service__["a" /* EventService */], __WEBPACK_IMPORTED_MODULE_5__lib_globalton_core_services_console_service__["a" /* ConsoleService */], __WEBPACK_IMPORTED_MODULE_4__lib_globalton_core_services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_6__lib_localton_services_workspace_service__["a" /* WorkspaceService */], __WEBPACK_IMPORTED_MODULE_7__angular_router__["a" /* ActivatedRoute */]])
    ], AppGenericPage);
    return AppGenericPage;
}());



/***/ }),

/***/ "../../../../../src/pages/generic/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>\r\n  <h3>{{currentPanel?.title}} </h3>\r\n<div id=\"customize-button\">\r\n  <button *ngIf=\"authService.isSubscriptionActive()\" (click)=\"openPanelEditor(currentPanel)\" mat-button>Customize this\r\n    board\r\n  </button>\r\n  <button *ngIf=\"!authService.isSubscriptionActive()\" (click)=\"eventService.showSubscribe()\" mat-button>Customize this\r\n    board<span class=\"subscriber-feature\">+</span></button>\r\n</div>\r\n\r\n</mat-toolbar>\r\n\r\n\r\n<mat-tab-group>\r\n  <mat-tab label=\"{{t.title}}\" *ngFor=\"let t of currentPanel?.tabs\">\r\n    <div class=\"panel-row\" *ngFor=\"let r of t.rows\">\r\n      <div  *ngIf=\"r?.content && r?.content.length>0\">\r\n        <span class=\"panel-row-title\">{{r.title}}</span>\r\n        <div class=\"panel-content-box\">\r\n          <div class=\"panel-content panel-content-{{r.content.length}}\" *ngFor=\"let c of r.content\">\r\n            <div [ngSwitch]=\"c.code\" class=\"panel-component\">\r\n              <div *ngSwitchCase=\"'PRICE_CHANGE'\">\r\n                <app-marketcap-evol-mini></app-marketcap-evol-mini>\r\n              </div>\r\n              <div *ngSwitchCase=\"'EVOL_MARKETCAP_MINI'\">\r\n                <app-marketcap-evol-mini [period]=\"c.time\"></app-marketcap-evol-mini>\r\n              </div>\r\n              <div *ngSwitchCase=\"'VOLUME_CHANGE'\">\r\n                <app-marketcap-evol-mini></app-marketcap-evol-mini>\r\n              </div>\r\n              <div *ngSwitchCase=\"'LATEST_NEWS'\">\r\n                <app-headlines [symbol]=\"c.symbol\"></app-headlines>\r\n              </div>\r\n              <div *ngSwitchCase=\"'CHART_MARKETCAP'\">\r\n                <app-marketcap  [symbol]=\"c.symbol\"></app-marketcap>\r\n              </div>\r\n              <div *ngSwitchCase=\"'CHART_PRICE'\">\r\n                <app-price  [symbol]=\"c.symbol\"></app-price>\r\n              </div>\r\n              <div *ngSwitchCase=\"'CHART_VOLUME'\">\r\n                <app-volume  [symbol]=\"c.symbol\"></app-volume>\r\n              </div>\r\n              <div *ngSwitchCase=\"'LATEST_TWEETS'\">\r\n                <app-twitter [symbol]=\"c.symbol\"></app-twitter>\r\n              </div>\r\n              <div *ngSwitchCase=\"'RANKING_MARKETCAP'\">\r\n                <app-marketcap-table></app-marketcap-table>\r\n              </div>\r\n              <div *ngSwitchCase=\"'PERF_LASTWEEK'\">\r\n                <app-perf-lastweek [symbol]=\"c.symbol\" [format]=\"c.format\"></app-perf-lastweek>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </mat-tab>\r\n</mat-tab-group>\r\n\r\n\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/pages/import-cmc/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppImportCMCPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__ = __webpack_require__("../../../../../src/lib/localton/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_localton_services_import_service__ = __webpack_require__("../../../../../src/lib/localton/services/import.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppImportCMCPage = (function () {
    function AppImportCMCPage(requestService, dataService, logic, importService) {
        this.requestService = requestService;
        this.dataService = dataService;
        this.logic = logic;
        this.importService = importService;
        this.source = "coinmarketcap";
    }
    AppImportCMCPage.prototype.doImport = function () {
        this.importService.importCoinMarketCapTicker(this.source, this.file, this.base);
    };
    AppImportCMCPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-import-cmc',
            template: __webpack_require__("../../../../../src/pages/import-cmc/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_3__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_4__lib_localton_services_import_service__["a" /* ImportService */]])
    ], AppImportCMCPage);
    return AppImportCMCPage;
}());



/***/ }),

/***/ "../../../../../src/pages/import-cmc/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>Import</mat-toolbar>\r\n\r\n\r\nSource:\r\n<select [(ngModel)]=\"source\">\r\n  <option value=\"coinmarketcap\" selected>Coin Market Cap</option>\r\n</select>\r\n\r\n\r\n\r\n<button mat-button (click)=\"doImport()\">Import</button>\r\n<br>\r\n<textarea [(ngModel)]=\"file\"></textarea>\r\n"

/***/ }),

/***/ "../../../../../src/pages/import/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppImportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__ = __webpack_require__("../../../../../src/lib/localton/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_localton_services_import_service__ = __webpack_require__("../../../../../src/lib/localton/services/import.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppImportPage = (function () {
    function AppImportPage(requestService, dataService, appConfigService, logic, importService) {
        var _this = this;
        this.requestService = requestService;
        this.dataService = dataService;
        this.appConfigService = appConfigService;
        this.logic = logic;
        this.importService = importService;
        this.source = "kraken";
        this.links = [];
        this.importService.getLastImport(this.source, function (res) {
            _this.lastimport = res;
            _this.links = _this.importService.getImportLinks(_this.source, _this.lastimport);
        });
    }
    AppImportPage.prototype.doImport = function () {
        this.importService.importKrakenPrices(this.source, this.file, this.base, this.value, this.interval);
    };
    AppImportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-import',
            template: __webpack_require__("../../../../../src/pages/import/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_4__lib_localton_services_appconfig_service__["a" /* AppConfigService */], __WEBPACK_IMPORTED_MODULE_3__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_5__lib_localton_services_import_service__["a" /* ImportService */]])
    ], AppImportPage);
    return AppImportPage;
}());



/***/ }),

/***/ "../../../../../src/pages/import/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>Import</mat-toolbar>\r\n\r\n\r\nSource:\r\n<select [(ngModel)]=\"source\">\r\n  <option value=\"kraken\" selected>Kraken</option>\r\n</select>\r\n\r\nValue:\r\n<select [(ngModel)]=\"value\">\r\n  <option *ngFor=\"let val of appConfigService.values\"  value=\"{{val}}\" selected>{{val}}</option>\r\n\r\n</select>\r\nBase:\r\n<select [(ngModel)]=\"base\">\r\n  <option *ngFor=\"let val of appConfigService.bases\" value=\"{{val}}\" selected>{{val}}</option>\r\n\r\n</select>\r\nInterval:\r\n<select [(ngModel)]=\"interval\">\r\n  <option *ngFor=\"let val of appConfigService.intervals\"  value=\"{{val}}\" selected> {{appConfigService.intervalNames[val]}} </option>\r\n\r\n</select>\r\n\r\n\r\n<button mat-raised-button color=\"accent\" (click)=\"doImport()\">Import</button>\r\n<br>\r\n<textarea [(ngModel)]=\"file\"></textarea>\r\n\r\n<hr>\r\n<h4>Files to import</h4>\r\n\r\n<a href=\"{{li}}\"  class=\"import-link\"*ngFor=\"let li of links\">{{li}}</a><br/>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/pages/market/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMarketPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__ = __webpack_require__("../../../../../src/lib/localton/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppMarketPage = (function () {
    function AppMarketPage(requestService, dataService, logic) {
        this.requestService = requestService;
        this.dataService = dataService;
        this.logic = logic;
        this.base = "EUR";
        this.source = "kraken";
        this.data = [];
    }
    AppMarketPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-market-page',
            template: __webpack_require__("../../../../../src/pages/market/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_3__logic_Logic__["a" /* Logic */]])
    ], AppMarketPage);
    return AppMarketPage;
}());



/***/ }),

/***/ "../../../../../src/pages/market/template.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"marketcap\"><mat-toolbar style=\"background-color: #a90000\">\r\n  <h3  style=\"color: white\">Market cap</h3>\r\n</mat-toolbar>\r\n\r\n\r\n  <mat-tab-group>\r\n    <mat-tab label=\"Symbol\">\r\n      <app-marketcap></app-marketcap>\r\n    </mat-tab>\r\n    <mat-tab label=\"Ranking\">\r\n      <app-marketcap-table></app-marketcap-table>\r\n\r\n    </mat-tab>\r\n  </mat-tab-group>\r\n\r\n\r\n\r\n</section>\r\n"

/***/ }),

/***/ "../../../../../src/pages/news/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppNewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__ = __webpack_require__("../../../../../src/lib/localton/services/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppNewsPage = (function () {
    function AppNewsPage(requestService, dataService) {
        this.requestService = requestService;
        this.dataService = dataService;
    }
    AppNewsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-news',
            template: __webpack_require__("../../../../../src/pages/news/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__["a" /* DataService */]])
    ], AppNewsPage);
    return AppNewsPage;
}());



/***/ }),

/***/ "../../../../../src/pages/news/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar >\r\n  <h3  >News </h3>\r\n</mat-toolbar>\r\n\r\n\r\n<mat-tab-group>\r\n  <mat-tab label=\"Headlines\">\r\n    <app-headlines [symbol]=\"'cryptocurrency'\"> </app-headlines>\r\n\r\n  </mat-tab>\r\n  <mat-tab label=\"Social\">\r\n\r\n\r\n\r\n\r\n    <app-twitter [symbol]=\"'cryptocurrency'\"> </app-twitter>\r\n  </mat-tab>\r\n</mat-tab-group>\r\n\r\n\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/pages/symbol-all/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppSymbolAllPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__ = __webpack_require__("../../../../../src/lib/localton/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppSymbolAllPage = (function () {
    function AppSymbolAllPage(requestService, dataService, appConfigService) {
        this.requestService = requestService;
        this.dataService = dataService;
        this.appConfigService = appConfigService;
    }
    AppSymbolAllPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-symbol-all',
            template: __webpack_require__("../../../../../src/pages/symbol-all/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_appconfig_service__["a" /* AppConfigService */]])
    ], AppSymbolAllPage);
    return AppSymbolAllPage;
}());



/***/ }),

/***/ "../../../../../src/pages/symbol-all/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>\r\n  <h3>Listing </h3>\r\n\r\n</mat-toolbar>\r\n<mat-list>\r\n\r\n  <mat-list-item link routerLink=\"/symbol/{{s}}\" *ngFor=\"let s of appConfigService.values\" matLine  mat-list-item  >{{s}}</mat-list-item>\r\n\r\n</mat-list>\r\n"

/***/ }),

/***/ "../../../../../src/pages/symbol-item/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppSymbolItemPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__ = __webpack_require__("../../../../../src/lib/localton/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppSymbolItemPage = (function () {
    function AppSymbolItemPage(requestService, dataService, route) {
        var _this = this;
        this.requestService = requestService;
        this.dataService = dataService;
        this.route = route;
        this.route.params.subscribe(function (params) {
            _this.symbolId = params["id"];
        });
    }
    AppSymbolItemPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-symbol-item',
            template: __webpack_require__("../../../../../src/pages/symbol-item/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]])
    ], AppSymbolItemPage);
    return AppSymbolItemPage;
}());



/***/ }),

/***/ "../../../../../src/pages/symbol-item/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>\r\n  <h3>{{symbolId}} </h3>\r\n\r\n</mat-toolbar>\r\n\r\n\r\n<mat-tab-group>\r\n  <mat-tab label=\"Perf\">\r\n\r\n\r\n    <app-perf-lastweek [symbol]=\"symbolId\"></app-perf-lastweek>\r\n    <app-cap-lastweek [symbol]=\"symbolId\"></app-cap-lastweek>\r\n  </mat-tab>\r\n  <mat-tab label=\"Social\">\r\n\r\n\r\n    <div class=\"grid grid-2-1\">\r\n      <div class=\"grid-in left\">\r\n        <app-headlines [symbol]=\"symbolId\"></app-headlines>\r\n      </div>\r\n      <div class=\"grid-in right\">\r\n        <app-twitter [symbol]=\"symbolId\"></app-twitter>\r\n      </div>\r\n      <br class=\"clear\">\r\n    </div>\r\n\r\n  </mat-tab>\r\n  <mat-tab label=\"Information\">\r\n    <mat-card class=\"example-card\">\r\n      <mat-card-header>\r\n        <mat-card-title>Information</mat-card-title>\r\n        <mat-card-subtitle></mat-card-subtitle>\r\n      </mat-card-header>\r\n      <mat-card-content>\r\n        <mat-list>\r\n          <mat-list-item>\r\n            Symbol: {{symbolId}}\r\n          </mat-list-item>\r\n        </mat-list>\r\n      </mat-card-content>\r\n    </mat-card>\r\n  </mat-tab>\r\n</mat-tab-group>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/widgets/cap-lastweek/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppCapLastWeekComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__ = __webpack_require__("../../../../angular-highcharts/angular-highcharts.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_localton_components_DataWithChart_component__ = __webpack_require__("../../../../../src/lib/localton/components/DataWithChart/component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppCapLastWeekComponent = (function (_super) {
    __extends(AppCapLastWeekComponent, _super);
    function AppCapLastWeekComponent(logic, appConfigService) {
        var _this = _super.call(this, logic, appConfigService) || this;
        _this.logic = logic;
        _this.appConfigService = appConfigService;
        _this.displayedColumns = ['ts', 'cap'];
        _this.ts = 1512509400;
        _this.base = "USD";
        _this.source = "ccc";
        _this.length = 100;
        _this.options = {
            chart: { type: 'column' },
            title: { text: " " },
            credits: { enabled: false },
            tooltip: { valueSuffix: "%", valueDecimals: 2 },
        };
        return _this;
    }
    AppCapLastWeekComponent.prototype.updateData = function () {
        var _this = this;
        this.logic.getCapLastWeek(this.source, 7, this.ts, this.symbol, this.base, function (res) {
            _this.data = res;
            _this.checkData();
            var X = [];
            var Y = [];
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            for (var i = 0; i < _this.data.length - 1; ++i) {
                X.unshift(days[new Date(_this.data[i].ts * 1000).getDay()]);
                Y.unshift((_this.data[i].cap - _this.data[i + 1].cap) / _this.data[i].cap * 100);
            }
            _this.updateOptions({ xAxis: { categories: X }, series: [{
                        name: _this.symbol,
                        data: Y
                    }] });
            _this.chart = new __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__["a" /* Chart */](_this.options);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AppCapLastWeekComponent.prototype, "symbol", void 0);
    AppCapLastWeekComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-cap-lastweek',
            template: __webpack_require__("../../../../../src/widgets/cap-lastweek/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__["a" /* AppConfigService */]])
    ], AppCapLastWeekComponent);
    return AppCapLastWeekComponent;
}(__WEBPACK_IMPORTED_MODULE_4__lib_localton_components_DataWithChart_component__["a" /* DataAndChartTemplate */]));



/***/ }),

/***/ "../../../../../src/widgets/cap-lastweek/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"chart-card\">\r\n  <mat-card-header>\r\n    <mat-card-title>Market cap</mat-card-title>\r\n    <mat-card-subtitle>Last week</mat-card-subtitle>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n    <div [chart]=\"chart\"></div>\r\n<div *ngFor=\"let c of data\" class=\"perf-box\" hidden>\r\n  <div class=\"perf-val\">{{c.cap/1000000000 | number : '1.2-2' }}Mds</div>\r\n  <div class=\"perf-weekday\">{{c.ts*1000| date:'E'}}</div>\r\n</div>\r\n    <br class=\"clear\">\r\n\r\n\r\n\r\n  </mat-card-content>\r\n\r\n\r\n    <mat-card-actions>\r\n      <button mat-button (click)=\"showDataTable=!showDataTable\">{{showDataTable?'Hide':'Show'}} data</button>\r\n    </mat-card-actions>\r\n    <mat-table #table class=\"data\"  [dataSource]=\"dataSource\" *ngIf=\"showDataTable\">\r\n\r\n      <ng-container matColumnDef=\"ts\" >\r\n        <mat-header-cell *matHeaderCellDef> Date </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" >{{element.ts*1000 | date:\"medium\"}} </mat-cell>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"cap\">\r\n        <mat-header-cell *matHeaderCellDef> Cap (m{{base}})</mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" >{{element.cap/1000000 | number:\"1.0-0\" }} </mat-cell>\r\n      </ng-container>\r\n\r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n    </mat-table>\r\n\r\n\r\n\r\n</mat-card>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/widgets/evolution-table/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppEvolutionTableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppEvolutionTableComponent = (function () {
    function AppEvolutionTableComponent(logic, appConfigService) {
        this.logic = logic;
        this.appConfigService = appConfigService;
        this.value = "BTC";
        this.period = "60";
        this.base = "EUR";
        this.source = "kraken";
        this.length = 100;
        this.pageSize = 10;
        this.pageSizeOptions = [10, 25, 100];
        this.data = [];
        this.displayedData = [];
        this.isLoaded = false;
        this.pageIndex = 0;
        this.displayedColumns = ['period', 'percent'];
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_2__angular_material__["i" /* MatTableDataSource */]([]);
        this.updateData();
    }
    AppEvolutionTableComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    AppEvolutionTableComponent.prototype.updatePagination = function (event) {
        this.pageIndex = event.pageIndex;
        this.showData();
    };
    AppEvolutionTableComponent.prototype.formatData = function (res) {
        var D = [];
        for (var i = 0; i < res.length; ++i) {
            var r = res[i];
            var line = { period: r.timestamp, percent: (Math.floor(1000 * (parseFloat(r.close) - parseFloat(r.open)) / parseFloat(r.open))) / 10 };
            D.unshift(line);
        }
        return D;
    };
    AppEvolutionTableComponent.prototype.updateData = function () {
        var _this = this;
        this.logic.getChartData(this.source, this.period, this.value, this.base, function (res) {
            _this.data = _this.formatData(res);
            _this.showData(res);
        });
    };
    AppEvolutionTableComponent.prototype.showData = function (res) {
        if (res)
            this.data = res;
        this.displayedData = this.data.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_2__angular_material__["i" /* MatTableDataSource */](this.displayedData);
        this.length = this.data.length;
        this.isLoaded = true;
    };
    AppEvolutionTableComponent.prototype.setValue = function (v) {
        this.value = v;
        this.updateData();
    };
    AppEvolutionTableComponent.prototype.setBase = function (v) {
        this.base = v;
        this.updateData();
    };
    AppEvolutionTableComponent.prototype.setInterval = function (v) {
        this.period = v.toString();
        this.updateData();
    };
    AppEvolutionTableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-evolution-table',
            template: __webpack_require__("../../../../../src/widgets/evolution-table/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__["a" /* AppConfigService */]])
    ], AppEvolutionTableComponent);
    return AppEvolutionTableComponent;
}());



/***/ }),

/***/ "../../../../../src/widgets/evolution-table/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"example-card\">\r\n  <mat-card-header>\r\n    <mat-card-title>Evolution</mat-card-title>\r\n    <mat-card-subtitle>Week 49</mat-card-subtitle>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n\r\n\r\n    <div>\r\n      <mat-menu [overlapTrigger]=\"false\" #appMenu1=\"matMenu\">\r\n        <button *ngFor=\"let val of appConfigService.values\" mat-menu-item (click)=\"setValue(val)\"> {{val}} </button>\r\n      </mat-menu>\r\n      <button mat-button  [matMenuTriggerFor]=\"appMenu1\">\r\n        Value: {{value}}\r\n      </button>\r\n      <mat-menu [overlapTrigger]=\"false\" #appMenu2=\"matMenu\">\r\n        <button *ngFor=\"let val of appConfigService.bases\" mat-menu-item (click)=\"setBase(val)\"> {{val}} </button>\r\n      </mat-menu>\r\n      <button mat-button  [matMenuTriggerFor]=\"appMenu2\">\r\n        Base: {{base}}\r\n      </button>\r\n      <mat-menu [overlapTrigger]=\"false\" #appMenu5=\"matMenu\">\r\n        <button *ngFor=\"let val of appConfigService.intervals\" mat-menu-item (click)=\"setInterval(val)\"> {{appConfigService.intervalNames[val]}} </button>\r\n\r\n      </mat-menu>\r\n      <button mat-button  [matMenuTriggerFor]=\"appMenu5\">\r\n        Interval: {{appConfigService.intervalNames[period]}}\r\n      </button>\r\n    </div>\r\n\r\n\r\n\r\n\r\n\r\n    <mat-table #table [dataSource]=\"dataSource\">\r\n      <ng-container matColumnDef=\"period\">\r\n        <mat-header-cell *matHeaderCellDef> No. </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\"> {{1000*element.period | date:\"medium\"}} </mat-cell>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"percent\">\r\n        <mat-header-cell *matHeaderCellDef> Evolution </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\">{{element.percent}}% </mat-cell>\r\n      </ng-container>\r\n\r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n    </mat-table>\r\n\r\n\r\n    <mat-paginator [length]=\"length\"\r\n                   [pageSize]=\"pageSize\"\r\n                   [pageSizeOptions]=\"pageSizeOptions\"\r\n                   (page)=\"updatePagination( $event)\">\r\n    </mat-paginator>\r\n\r\n\r\n  </mat-card-content>\r\n\r\n\r\n\r\n  <mat-card-actions>\r\n    <button mat-button>More</button>\r\n\r\n  </mat-card-actions>\r\n</mat-card>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/widgets/headlines/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppHeadlinesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppHeadlinesComponent = (function () {
    function AppHeadlinesComponent(logic, appConfigService, requestService) {
        this.logic = logic;
        this.appConfigService = appConfigService;
        this.requestService = requestService;
    }
    AppHeadlinesComponent.prototype.ngOnInit = function () {
        this.symbol = this.symbol == "GLOBAL" ? "cryptocurrency" : this.symbol;
        this.symbol;
        this.load(this.symbol, function (res) {
        });
    };
    AppHeadlinesComponent.prototype.parseNews = function (res) {
        console.log(res);
        var R = res;
        var A = [];
        for (var k = 0; k < R.length; ++k) {
            var news = R[k];
            if (news && typeof news === "object" && "title" in news)
                A.push({
                    title: news.title,
                    desc: news.content,
                    publisher: null,
                    link: news.link,
                    image: null,
                    date: news.pubDate
                });
        }
        return A;
    };
    AppHeadlinesComponent.prototype.load = function (q, f) {
        var _this = this;
        this.logic.getNews(q, function (res) { _this.tweets = _this.parseNews(res); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AppHeadlinesComponent.prototype, "symbol", void 0);
    AppHeadlinesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-headlines',
            template: __webpack_require__("../../../../../src/widgets/headlines/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__["a" /* AppConfigService */], __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__["a" /* RequestService */]])
    ], AppHeadlinesComponent);
    return AppHeadlinesComponent;
}());



/***/ }),

/***/ "../../../../../src/widgets/headlines/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"tweet-card\">\r\n  <mat-card-header>\r\n    <mat-card-title>Latest news</mat-card-title>\r\n    <mat-card-subtitle>Related to #{{symbol}}</mat-card-subtitle>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n      <ul>\r\n        <li *ngFor=\"let t of tweets\" class=\"tweet\">\r\n          <div>\r\n\r\n            <a  target=\"_blank\"  href=\"http://twitter.com/{{t.userscreenname}}\">\r\n              <div class=\"tweet-image\" [ngStyle]=\"{'background-image': 'url(' + t.image + ')'}\"></div>\r\n              <span class=\"tweet-user\">{{t.publisher}}</span><br>\r\n              <br class=\"clear\">\r\n            </a><br>\r\n            <span class=\"tweet-text\">{{t.title}}</span><br>\r\n            <strong>Related</strong>\r\n            <span class=\"tweet-text\" [innerHTML]=\"t.desc | sanitizeHtml\"></span><br>\r\n            <br>\r\n            <span class=\"tweet-date\">{{t.date | date:\"medium\"}}</span><br>\r\n            <a  target=\"_blank\" href=\"{{t.link}}\" rel=\"external\" class=\"tweet-url\">More...</a>\r\n          </div>\r\n        </li>\r\n      </ul>\r\n  </mat-card-content>\r\n</mat-card>\r\n"

/***/ }),

/***/ "../../../../../src/widgets/market-table/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMarketCapTableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_localton_components_DataWithPagination_component__ = __webpack_require__("../../../../../src/lib/localton/components/DataWithPagination/component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppMarketCapTableComponent = (function (_super) {
    __extends(AppMarketCapTableComponent, _super);
    function AppMarketCapTableComponent(logic, appConfigService) {
        var _this = _super.call(this, logic, appConfigService) || this;
        _this.logic = logic;
        _this.appConfigService = appConfigService;
        _this.base = "USD";
        _this.source = "ccc";
        _this.ts = 1512509400;
        _this.displayedColumns = ['symbol', 'cap'];
        return _this;
    }
    AppMarketCapTableComponent.prototype.updateData = function () {
        var _this = this;
        this.logic.getMarketData(this.source, this.base, this.ts, function (res) {
            _this.showData(res);
        });
    };
    AppMarketCapTableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-marketcap-table',
            template: __webpack_require__("../../../../../src/widgets/market-table/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__["a" /* AppConfigService */]])
    ], AppMarketCapTableComponent);
    return AppMarketCapTableComponent;
}(__WEBPACK_IMPORTED_MODULE_3__lib_localton_components_DataWithPagination_component__["a" /* DataWithPaginationTemplate */]));



/***/ }),

/***/ "../../../../../src/widgets/market-table/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"example-card chart-card\">\r\n  <mat-card-header>\r\n    <mat-card-title>Highest Market Caps</mat-card-title>\r\n    <mat-card-subtitle>Data from  {{ts *1000 |date:\"medium\"}}</mat-card-subtitle>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n\r\n\r\n    <div>\r\n\r\n    </div>\r\n\r\n    <mat-table #table [dataSource]=\"dataSource\">\r\n      <ng-container matColumnDef=\"symbol\">\r\n        <mat-header-cell *matHeaderCellDef> Symbol </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\"> {{element.symbol}} </mat-cell>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"cap\">\r\n        <mat-header-cell *matHeaderCellDef> Market Cap (m{{base}}) </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\">{{element.cap/1000000 | number:\"1.0-0\"}} </mat-cell>\r\n      </ng-container>\r\n\r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n    </mat-table>\r\n\r\n\r\n    <mat-paginator [length]=\"length\"\r\n                   [pageSize]=\"pageSize\"\r\n                   [pageSizeOptions]=\"pageSizeOptions\"\r\n                   (page)=\"updatePagination( $event)\">\r\n    </mat-paginator>\r\n\r\n\r\n  </mat-card-content>\r\n  <div class=\"source\">Source: {{appConfigService.sources[source]}}</div>\r\n\r\n\r\n</mat-card>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/widgets/marketcap-evol-mini/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMarketCapEvolMiniComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__ = __webpack_require__("../../../../angular-highcharts/angular-highcharts.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_localton_components_DataWithChart_component__ = __webpack_require__("../../../../../src/lib/localton/components/DataWithChart/component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppMarketCapEvolMiniComponent = (function (_super) {
    __extends(AppMarketCapEvolMiniComponent, _super);
    function AppMarketCapEvolMiniComponent(logic, appConfigService) {
        var _this = _super.call(this, logic, appConfigService, "plain") || this;
        _this.logic = logic;
        _this.appConfigService = appConfigService;
        _this.displayedColumns = ['symbol', 'diff'];
        _this.dataSource = new __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MatTableDataSource */]([]);
        _this.displayedColumnsRef = ['symbol', 'ts_from', 'cap_from', 'ts_to', 'cap_to'];
        _this.dataSourceRef = new __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MatTableDataSource */]([]);
        _this.ts = 1451692800;
        _this.base = "USD";
        _this.source = "cmc";
        _this.length = 100;
        _this.pageSize = 10;
        _this.pageSizeOptions = [10, 25, 100];
        _this.data = [];
        _this.displayedData = [];
        _this.isLoaded = false;
        _this.pageIndex = 0;
        _this.isFuture = false;
        _this.date = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */](new Date(_this.ts * 1000));
        _this.serializedDate = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */]((new Date()).toISOString());
        _this.options = {
            chart: { type: 'column' },
            credits: { enabled: false },
            tooltip: {
                valueSuffix: '%'
            },
            title: { text: "" },
            plotOptions: {
                column: {
                    colorByPoint: true
                },
                series: {
                    animation: false
                }
            },
            yAxis: { stackLabels: {
                    enabled: true, style: {
                        fontWeight: 'bold',
                        color: 'gray'
                    }
                } }
        };
        return _this;
    }
    AppMarketCapEvolMiniComponent.prototype.ngOnInit = function () {
        this.initDate();
        this.updateData();
    };
    AppMarketCapEvolMiniComponent.prototype.initDate = function () {
        this.setDates();
        var d = new Date();
        d.setHours(0, 0, 0, 0);
        this.ts = d.getTime() / 1000;
        this.updateDate(this.ts);
        console.log("init", this.ts);
    };
    AppMarketCapEvolMiniComponent.prototype.setPeriod = function (p) {
        this.period = p;
        this.setDates();
        this.updateData();
    };
    AppMarketCapEvolMiniComponent.prototype.setDates = function () {
        var d = Math.floor(new Date().getTime() / 1000);
        if (this.period === "last24h") {
            this.from = d - 86400;
            this.to = d;
        }
        else if (this.period === "last7d") {
            this.from = d - 86400 * 7;
            this.to = d;
        }
        else if (this.period === "last30d") {
            this.from = d - 86400 * 30;
            this.to = d;
        }
        console.log("setDates", d, new Date(d * 1000), new Date(this.from * 1000), new Date(this.to * 1000));
    };
    AppMarketCapEvolMiniComponent.prototype.showData = function (res) {
        if (res)
            this.data = res;
        if (this.data) {
            this.displayedData = this.data.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
            this.dataSource = new __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MatTableDataSource */](this.displayedData);
            this.length = this.data.length;
            this.isLoaded = true;
        }
    };
    AppMarketCapEvolMiniComponent.prototype.updatePagination = function (event) {
        this.pageIndex = event.pageIndex;
        this.showData();
    };
    AppMarketCapEvolMiniComponent.prototype.updateData = function () {
        var _this = this;
        this.logic.getMarketCapEvol(this.source, this.base, this.from, this.to, function (res) {
            console.log("data", res);
            _this.data = res;
            _this.dataSourceRef = new __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MatTableDataSource */](_this.data);
            _this.showData();
            /* CHART*/
            var X = [], Y = [], C = [];
            for (var i = 0; i < res.length; ++i) {
                X.push(res[i].symbol);
                Y.push(Math.round(100 * (res[i].cap_to - res[i].cap_from) / res[i].cap_from * 100) / 100);
                C.push(res[i].perf > 0 ? "#559e4f" : "#bb0f0f");
            }
            console.log("perf", _this.data, "X=", X, "Y=", Y);
            _this.updateOptions({
                colors: C,
                xAxis: {
                    categories: X
                },
                series: [{
                        name: "Performance",
                        data: Y
                    }]
            });
            _this.chart = new __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__["a" /* Chart */](_this.options);
        });
    };
    AppMarketCapEvolMiniComponent.prototype.yesterday = function () {
        this.updateDate(this.ts - 86400);
    };
    AppMarketCapEvolMiniComponent.prototype.tomorrow = function () {
        this.updateDate(this.ts + 86400);
    };
    AppMarketCapEvolMiniComponent.prototype.updateDate = function (ts) {
        if (new Date().getTime() / 1000 - ts < 0)
            this.isFuture = true;
        else
            this.isFuture = false;
        this.ts = ts;
        this.date = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */](new Date(this.ts * 1000));
        this.updateData();
    };
    AppMarketCapEvolMiniComponent.prototype.dateChanged = function (event) {
        this.updateDate(new Date(event.value).getTime() / 1000);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AppMarketCapEvolMiniComponent.prototype, "period", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AppMarketCapEvolMiniComponent.prototype, "showOptions", void 0);
    AppMarketCapEvolMiniComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-marketcap-evol-mini',
            template: __webpack_require__("../../../../../src/widgets/marketcap-evol-mini/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_appconfig_service__["a" /* AppConfigService */]])
    ], AppMarketCapEvolMiniComponent);
    return AppMarketCapEvolMiniComponent;
}(__WEBPACK_IMPORTED_MODULE_6__lib_localton_components_DataWithChart_component__["a" /* DataAndChartTemplate */]));



/***/ }),

/***/ "../../../../../src/widgets/marketcap-evol-mini/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"mini-card\">\r\n  <mat-card-header>\r\n    <mat-card-title>Market Cap Evol</mat-card-title>\r\n  <mat-card-subtitle *ngIf=\"period=='last24h'\">Last 24h - All cryptos</mat-card-subtitle>\r\n    <mat-card-subtitle *ngIf=\"period=='last7d'\">Last 7d - All cryptos</mat-card-subtitle>\r\n    <mat-card-subtitle *ngIf=\"period=='last30d'\">Last 30d - All cryptos</mat-card-subtitle>\r\n  </mat-card-header>\r\n  <div class=\"options\" *ngIf=\"showOptions\">\r\n    <div class=\"row\">\r\n      <button class=\"symbol\" mat-button (click)=\"setPeriod('last24h')\"> Last 24h </button>\r\n      <button class=\"symbol\" mat-button (click)=\"setPeriod('last7d')\"> Last 7j </button>\r\n      <button class=\"symbol\" mat-button (click)=\"setPeriod('last30d')\"> Last 30j </button>\r\n    </div>\r\n  </div>\r\n  <mat-card-content >\r\n\r\n\r\n    <div *ngFor=\"let r of data\" class=\"mini\">\r\n      <span class=\"title\"> {{appConfigService.lastNames[period]}}</span>\r\n      <span class=\"large\" [ngClass]=\"r.cap_to > r.cap_from?'valpos':'valneg'\">{{r.cap_to - r.cap_from>0?\"+\":\"\"}}{{(r.cap_to - r.cap_from)/r.cap_from*100 | number:\"1.1-1\"}}%</span>\r\n      <span class=\"detail\"  [ngClass]=\"r.cap_to > r.cap_from?'valpos':'valneg'\">{{r.cap_to - r.cap_from>0?\"+\":\"\"}}{{(r.cap_to - r.cap_from)/1000000}} m{{base}}</span>\r\n    </div>\r\n\r\n\r\n</mat-card-content>\r\n\r\n\r\n  <button class=\"dots\" mat-icon-button [matMenuTriggerFor]=\"menu\">\r\n    <mat-icon>more_vert</mat-icon>\r\n  </button>\r\n  <mat-menu #menu=\"matMenu\">\r\n    <button mat-button class=\"showdata\"  (click)=\"showDataTable=!showDataTable\">{{showDataTable?'Hide':'Show'}} data</button>\r\n   </mat-menu>\r\n<div class=\"data\">\r\n  <span  *ngIf=\"showDataTable\" class=\"source\">Source: {{appConfigService.sources[source]}}</span>\r\n  <mat-table #table class=\"data\"  [dataSource]=\"dataSourceRef\" *ngIf=\"showDataTable\">\r\n    <ng-container matColumnDef=\"symbol\" >\r\n      <mat-header-cell *matHeaderCellDef> Symbol </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.symbol}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"ts_from\" >\r\n      <mat-header-cell *matHeaderCellDef> Start Date </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.ts_from*1000 | date:\"medium\"}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"cap_from\" >\r\n      <mat-header-cell *matHeaderCellDef> Start Price ({{base}}) </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.cap_from | number}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"ts_to\" >\r\n      <mat-header-cell *matHeaderCellDef> End Date </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.ts_to*1000 | date:\"medium\"}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"cap_to\" >\r\n      <mat-header-cell *matHeaderCellDef> End Price ({{base}}) </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.cap_to | number}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"perf\" >\r\n      <mat-header-cell *matHeaderCellDef> Perf  </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{(element.cap_to - element.cap_from)/element.cap_from*100 | number}}% </mat-cell>\r\n    </ng-container>\r\n    <mat-header-row *matHeaderRowDef=\"displayedColumnsRef\"></mat-header-row>\r\n    <mat-row *matRowDef=\"let row; columns: displayedColumnsRef;\"></mat-row>\r\n  </mat-table>\r\n</div>\r\n</mat-card>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/widgets/marketcap-evol/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMarketCapEvolComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__ = __webpack_require__("../../../../angular-highcharts/angular-highcharts.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_localton_components_DataWithChart_component__ = __webpack_require__("../../../../../src/lib/localton/components/DataWithChart/component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppMarketCapEvolComponent = (function (_super) {
    __extends(AppMarketCapEvolComponent, _super);
    function AppMarketCapEvolComponent(logic, appConfigService) {
        var _this = _super.call(this, logic, appConfigService, "plain") || this;
        _this.logic = logic;
        _this.appConfigService = appConfigService;
        _this.displayedColumns = ['symbol', 'diff'];
        _this.dataSource = new __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MatTableDataSource */]([]);
        _this.displayedColumnsRef = ['symbol', 'ts_from', 'cap_from', 'ts_to', 'cap_to'];
        _this.dataSourceRef = new __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MatTableDataSource */]([]);
        _this.ts = 1451692800;
        _this.base = "USD";
        _this.source = "cmc";
        _this.length = 100;
        _this.pageSize = 10;
        _this.pageSizeOptions = [10, 25, 100];
        _this.data = [];
        _this.displayedData = [];
        _this.isLoaded = false;
        _this.pageIndex = 0;
        _this.isFuture = false;
        _this.date = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */](new Date(_this.ts * 1000));
        _this.serializedDate = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */]((new Date()).toISOString());
        _this.period = "last24h";
        _this.options = {
            chart: { type: 'column' },
            credits: { enabled: false },
            tooltip: {
                valueSuffix: '%'
            },
            title: { text: "" },
            plotOptions: {
                column: {
                    colorByPoint: true
                },
                series: {
                    animation: false
                }
            },
            yAxis: { stackLabels: {
                    enabled: true, style: {
                        fontWeight: 'bold',
                        color: 'gray'
                    },
                    formatter: function () {
                        // var s = this.series.options.QTotal;
                        //      return Highcharts.numberFormat(Math.round(s*100)/100,2)+'%';
                        return "aa";
                    }
                } }
        };
        _this.initDate();
        _this.updateData();
        return _this;
    }
    AppMarketCapEvolComponent.prototype.initDate = function () {
        this.setDates();
        var d = new Date();
        d.setHours(0, 0, 0, 0);
        this.ts = d.getTime() / 1000;
        this.updateDate(this.ts);
        console.log("init", this.ts);
    };
    AppMarketCapEvolComponent.prototype.setPeriod = function (p) {
        this.period = p;
        this.setDates();
        this.updateData();
    };
    AppMarketCapEvolComponent.prototype.setDates = function () {
        if (this.period === "last24h") {
            this.from = Math.floor(new Date().getTime() / 1000) - 86400;
            this.to = Math.floor(new Date().getTime() / 1000);
        }
        else if (this.period === "last7d") {
            this.from = Math.floor(new Date().getTime() / 1000) - 86400 * 7;
            this.to = Math.floor(new Date().getTime() / 1000);
        }
        else if (this.period === "last30d") {
            this.from = Math.floor(new Date().getTime() / 1000) - 86400 * 30;
            this.to = Math.floor(new Date().getTime() / 1000);
        }
    };
    AppMarketCapEvolComponent.prototype.showData = function (res) {
        if (res)
            this.data = res;
        if (this.data) {
            this.displayedData = this.data.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
            this.dataSource = new __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MatTableDataSource */](this.displayedData);
            this.length = this.data.length;
            this.isLoaded = true;
        }
    };
    AppMarketCapEvolComponent.prototype.updatePagination = function (event) {
        this.pageIndex = event.pageIndex;
        this.showData();
    };
    AppMarketCapEvolComponent.prototype.updateData = function () {
        var _this = this;
        this.logic.getMarketCapEvol(this.source, this.base, this.from, this.to, function (res) {
            console.log("data", res);
            _this.data = res;
            _this.dataSourceRef = new __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MatTableDataSource */](_this.data);
            _this.showData();
            /* CHART*/
            var X = [], Y = [], C = [];
            for (var i = 0; i < res.length; ++i) {
                X.push(res[i].symbol);
                Y.push(Math.round(100 * (res[i].cap_to - res[i].cap_from) / res[i].cap_from * 100) / 100);
                C.push(res[i].perf > 0 ? "#559e4f" : "#bb0f0f");
            }
            console.log("perf", _this.data, "X=", X, "Y=", Y);
            _this.updateOptions({
                colors: C,
                xAxis: {
                    categories: X
                },
                series: [{
                        name: "Performance",
                        data: Y
                    }]
            });
            _this.chart = new __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__["a" /* Chart */](_this.options);
        });
    };
    AppMarketCapEvolComponent.prototype.yesterday = function () {
        this.updateDate(this.ts - 86400);
    };
    AppMarketCapEvolComponent.prototype.tomorrow = function () {
        this.updateDate(this.ts + 86400);
    };
    AppMarketCapEvolComponent.prototype.updateDate = function (ts) {
        if (new Date().getTime() / 1000 - ts < 0)
            this.isFuture = true;
        else
            this.isFuture = false;
        this.ts = ts;
        this.date = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */](new Date(this.ts * 1000));
        this.updateData();
    };
    AppMarketCapEvolComponent.prototype.dateChanged = function (event) {
        this.updateDate(new Date(event.value).getTime() / 1000);
    };
    AppMarketCapEvolComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-marketcap-evol',
            template: __webpack_require__("../../../../../src/widgets/marketcap-evol/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_appconfig_service__["a" /* AppConfigService */]])
    ], AppMarketCapEvolComponent);
    return AppMarketCapEvolComponent;
}(__WEBPACK_IMPORTED_MODULE_6__lib_localton_components_DataWithChart_component__["a" /* DataAndChartTemplate */]));



/***/ }),

/***/ "../../../../../src/widgets/marketcap-evol/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"chart-card\">\r\n  <mat-card-header>\r\n    <mat-card-title>Market Cap Evol</mat-card-title>\r\n    <mat-card-subtitle *ngIf=\"period=='last24h'\">Last 24h</mat-card-subtitle>\r\n    <mat-card-subtitle *ngIf=\"period=='last7d'\">Last 7j</mat-card-subtitle>\r\n    <mat-card-subtitle *ngIf=\"period=='last30d'\"> </mat-card-subtitle>\r\n  </mat-card-header>\r\n  <div class=\"options\">\r\n    <div class=\"row\">\r\n      <button class=\"symbol\" mat-button (click)=\"setPeriod('last24h')\"> Last 24h </button>\r\n      <button class=\"symbol\" mat-button (click)=\"setPeriod('last7d')\"> Last 7j </button>\r\n      <button class=\"symbol\" mat-button (click)=\"setPeriod('last30d')\"> Last 30j </button>\r\n    </div>\r\n  </div>\r\n  <mat-card-content >\r\n    <div [chart]=\"chart\"></div>\r\n    <br class=\"clear\">\r\n\r\n\r\n    <div *ngIf=\"period=='custom'\">\r\n    <mat-form-field>\r\n      <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\" (dateChange)=\"dateChanged($event)\"  [formControl]=\"date\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker></mat-datepicker>\r\n    </mat-form-field>\r\n    </div>\r\n\r\n  </mat-card-content>\r\n\r\n  <div *ngIf=\"period=='custom'\"><mat-card-actions>\r\n      <button mat-button (click)=\"yesterday()\">Previous day</button>\r\n      <button mat-button *ngIf=\"!isFuture\" (click)=\"tomorrow()\">Next day</button>\r\n\r\n  </mat-card-actions></div>\r\n\r\n  <span *ngIf=\"isFuture\">Future data is not available</span>\r\n\r\n    <mat-table #table *ngIf=\"!isFuture\" [dataSource]=\"dataSource\">\r\n      <ng-container matColumnDef=\"symbol\">\r\n        <mat-header-cell *matHeaderCellDef> Symbol </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\"> {{element.symbol}} </mat-cell>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"diff\">\r\n        <mat-header-cell *matHeaderCellDef> Evol </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" [ngClass]=\"element.perf>0?'valpos':'valneg'\" >{{(element.cap_to - element.cap_from)/element.cap_from*100 | number:\"1.1-1\"}}% </mat-cell>\r\n      </ng-container>\r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n    </mat-table>\r\n\r\n\r\n  <mat-card-actions>\r\n    <button mat-button class=\"showdata\"  (click)=\"showDataTable=!showDataTable\">{{showDataTable?'Hide':'Show'}} data</button>\r\n    <span  *ngIf=\"showDataTable\" class=\"source\">Source: {{appConfigService.sources[source]}}</span>\r\n  </mat-card-actions>\r\n\r\n  <mat-table #table class=\"data\"  [dataSource]=\"dataSourceRef\" *ngIf=\"showDataTable\">\r\n    <ng-container matColumnDef=\"symbol\" >\r\n      <mat-header-cell *matHeaderCellDef> Symbol </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.symbol}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"ts_from\" >\r\n      <mat-header-cell *matHeaderCellDef> Start Date </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.ts_from*1000 | date:\"medium\"}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"cap_from\" >\r\n      <mat-header-cell *matHeaderCellDef> Start Price ({{base}}) </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.cap_from | number}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"ts_to\" >\r\n      <mat-header-cell *matHeaderCellDef> End Date </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.ts_to*1000 | date:\"medium\"}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"cap_to\" >\r\n      <mat-header-cell *matHeaderCellDef> End Price ({{base}}) </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.cap_to | number}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"perf\" >\r\n      <mat-header-cell *matHeaderCellDef> Perf  </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{(element.cap_to - element.cap_from)/element.cap_from*100 | number}}% </mat-cell>\r\n    </ng-container>\r\n    <mat-header-row *matHeaderRowDef=\"displayedColumnsRef\"></mat-header-row>\r\n    <mat-row *matRowDef=\"let row; columns: displayedColumnsRef;\"></mat-row>\r\n  </mat-table>\r\n\r\n\r\n\r\n</mat-card>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/widgets/marketcap/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMarketCapComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__ = __webpack_require__("../../../../angular-highcharts/angular-highcharts.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_localton_components_DataWithChart_component__ = __webpack_require__("../../../../../src/lib/localton/components/DataWithChart/component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppMarketCapComponent = (function (_super) {
    __extends(AppMarketCapComponent, _super);
    function AppMarketCapComponent(logic, appConfigService) {
        var _this = _super.call(this, logic, appConfigService) || this;
        _this.logic = logic;
        _this.appConfigService = appConfigService;
        _this.displayedColumns = ['ts', 'cap'];
        _this.base = "USD";
        _this.source = "ccc";
        _this.options = {
            chart: { type: 'area' },
            candlestick: { color: 'green', upColor: 'red' },
            credits: { enabled: false },
            plotOptions: {
                series: {
                    animation: false
                }
            },
            navigator: {
                series: {
                    fillColor: '#cccccc',
                    fillOpacity: 0.1,
                    lineColor: 'grey'
                }
            },
            rangeSelector: {
                selected: 4,
                inputEnabled: false,
                buttonTheme: {
                    visibility: 'hidden'
                },
                labelStyle: {
                    visibility: 'hidden'
                }
            }
        };
        return _this;
    }
    AppMarketCapComponent.prototype.updateData = function () {
        var _this = this;
        this.logic.getMarketCapData(this.source, this.symbol, this.base, function (res) {
            _this.data = res;
            _this.checkData();
            var D = [];
            var minVal = 10000000;
            for (var i = 0; i < res.length; ++i) {
                var line = [parseInt(res[i].ts) * 1000, Math.round(parseFloat(res[i].cap))];
                D.push(line);
            }
            console.log(D);
            _this.dataSource = new __WEBPACK_IMPORTED_MODULE_3__angular_material__["i" /* MatTableDataSource */](_this.data);
            _this.data = D;
            _this.updateOptions({ series: [{
                        name: _this.symbol,
                        data: D, color: '#FF0000'
                    }], yAxis: {},
                tooltip: { valueSuffix: " " + _this.base, valueDecimals: 0 } });
            _this.chart = new __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__["d" /* StockChart */](_this.options);
        });
    };
    AppMarketCapComponent.prototype.setValue = function (v) {
        this.symbol = v;
        if (v === "GLOBA")
            this.source = "cmc";
        else
            this.source = "ccc";
        this.updateData();
    };
    AppMarketCapComponent.prototype.setBase = function (v) {
        this.base = v;
        this.updateData();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AppMarketCapComponent.prototype, "symbol", void 0);
    AppMarketCapComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-marketcap',
            template: __webpack_require__("../../../../../src/widgets/marketcap/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__["a" /* AppConfigService */]])
    ], AppMarketCapComponent);
    return AppMarketCapComponent;
}(__WEBPACK_IMPORTED_MODULE_5__lib_localton_components_DataWithChart_component__["a" /* DataAndChartTemplate */]));



/***/ }),

/***/ "../../../../../src/widgets/marketcap/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"chart-card\">\r\n  <mat-card-header>\r\n    <mat-card-title>{{symbol===\"GLOBA\"?\"Global\":symbol}} Market cap</mat-card-title>\r\n    <mat-card-subtitle>In {{base}}</mat-card-subtitle>\r\n  </mat-card-header>\r\n\r\n  <div class=\"options\">\r\n    <mat-menu [overlapTrigger]=\"false\" #appMenu1=\"matMenu\" >\r\n      <button *ngFor=\"let val of appConfigService.values\" mat-menu-item (click)=\"setValue(val)\"> {{val}}</button>\r\n    </mat-menu>\r\n    <div class=\"row\">Symbols:\r\n      <button class=\"symbol\" mat-button (click)=\"setValue('GLOBA');\"> Global</button>\r\n        <button class=\"symbol\" mat-button *ngFor=\"let val of appConfigService.values\" (click)=\"setValue(val)\"> <app-crypto-icon  [display]=\"'symbol'\" [symbol]=\"val\"></app-crypto-icon>      </button>\r\n    </div>\r\n    <div class=\"row\">\r\n      <button mat-button [matMenuTriggerFor]=\"appMenu1\" *ngIf=\"false\">\r\n        Symbol: {{symbol}}\r\n      </button>\r\n      <mat-menu [overlapTrigger]=\"false\" #appMenu2=\"matMenu\" >\r\n\r\n        <button *ngFor=\"let val of appConfigService.bases\" mat-menu-item (click)=\"setBase(val)\"> {{val}}</button>\r\n      </mat-menu>\r\n      <button mat-button [matMenuTriggerFor]=\"appMenu2\">\r\n        Base: {{base}}\r\n      </button>\r\n\r\n    </div>\r\n  </div>\r\n\r\n  <button class=\"dots\" mat-icon-button [matMenuTriggerFor]=\"menu\"><mat-icon>more_vert</mat-icon></button>\r\n  <mat-menu #menu=\"matMenu\"><button mat-button class=\"showdata\"  (click)=\"showDataTable=!showDataTable\">{{showDataTable?'Hide':'Show'}} data</button></mat-menu>\r\n\r\n  <mat-card-content>\r\n\r\n    <div [chart]=\"chart\"></div>\r\n\r\n    <br class=\"clear\">\r\n\r\n  </mat-card-content>\r\n\r\n  <span *ngIf=\"showDataTable\" class=\"source\">Source: {{appConfigService.sources[source]}}</span>\r\n  <mat-table #table class=\"data\" [dataSource]=\"dataSource\" *ngIf=\"showDataTable\">\r\n\r\n    <ng-container matColumnDef=\"ts\">\r\n      <mat-header-cell *matHeaderCellDef> Date</mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\">{{element.ts*1000 | date:\"medium\"}}</mat-cell>\r\n    </ng-container>\r\n\r\n    <ng-container matColumnDef=\"cap\">\r\n      <mat-header-cell *matHeaderCellDef> Cap (m{{base}})</mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\">{{element.cap/1000000 | number:\"1.0-0\" }}</mat-cell>\r\n    </ng-container>\r\n\r\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n  </mat-table>\r\n\r\n</mat-card>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/widgets/perf-lastweek/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppPerfLastWeekComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__ = __webpack_require__("../../../../angular-highcharts/angular-highcharts.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_localton_components_DataWithChart_component__ = __webpack_require__("../../../../../src/lib/localton/components/DataWithChart/component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppPerfLastWeekComponent = (function (_super) {
    __extends(AppPerfLastWeekComponent, _super);
    function AppPerfLastWeekComponent(logic, appConfigService) {
        var _this = _super.call(this, logic, appConfigService) || this;
        _this.logic = logic;
        _this.appConfigService = appConfigService;
        _this.displayedColumns = ['ts', 'perf'];
        _this.base = "EUR";
        _this.source = "kraken";
        _this.length = 100;
        _this.options = {
            chart: { type: 'column' },
            title: { text: " " },
            tooltip: { valueSuffix: "%", valueDecimals: 2 },
            credits: { enabled: false },
        };
        _this.ts = Math.round(new Date().getTime() / 1000);
        return _this;
    }
    AppPerfLastWeekComponent.prototype.updateData = function () {
        var _this = this;
        this.logic.getPerfLastWeek(this.source, 7, this.ts, this.symbol, this.base, function (res) {
            _this.data = res.reverse();
            _this.checkData();
            var X = [];
            var Y = [];
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            for (var i = 0; i < _this.data.length; ++i) {
                X.push(days[new Date(_this.data[i].ts * 1000).getDay()]);
                Y.push(_this.data[i].perf);
            }
            _this.updateOptions({ xAxis: { categories: X }, series: [{
                        name: _this.symbol,
                        data: Y
                    }] });
            _this.chart = new __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__["a" /* Chart */](_this.options);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AppPerfLastWeekComponent.prototype, "symbol", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AppPerfLastWeekComponent.prototype, "format", void 0);
    AppPerfLastWeekComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-perf-lastweek',
            template: __webpack_require__("../../../../../src/widgets/perf-lastweek/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__["a" /* AppConfigService */]])
    ], AppPerfLastWeekComponent);
    return AppPerfLastWeekComponent;
}(__WEBPACK_IMPORTED_MODULE_4__lib_localton_components_DataWithChart_component__["a" /* DataAndChartTemplate */]));



/***/ }),

/***/ "../../../../../src/widgets/perf-lastweek/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"chart-card\">\r\n  <mat-card-header>\r\n    <mat-card-title>{{symbol}} Performance</mat-card-title>\r\n    <mat-card-subtitle>Last week</mat-card-subtitle>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n    <div *ngIf=\"format=='chart'\" [chart]=\"chart\"></div>\r\n    <div *ngIf=\"format=='numeric'\" class=\"perf-box-box\">\r\n      <div *ngFor=\"let c of data\" class=\"perf-box\">\r\n      <div class=\"perf-val {{c.perf>0?'valpos':'valneg'}}\">{{c.perf | number : '1.1-1' }}%</div>\r\n      <div class=\"perf-weekday\">{{c.ts*1000| date:'dd   MMM yyyy'}}</div>\r\n    </div></div>\r\n    <br class=\"clear\">\r\n\r\n\r\n\r\n\r\n  </mat-card-content>\r\n\r\n  <button class=\"dots\" mat-icon-button [matMenuTriggerFor]=\"menu\"><mat-icon>more_vert</mat-icon></button>\r\n  <mat-menu #menu=\"matMenu\"><button mat-button class=\"showdata\"  (click)=\"showDataTable=!showDataTable\">{{showDataTable?'Hide':'Show'}} data</button></mat-menu>\r\n\r\n\r\n  <div *ngIf=\"showDataTable\" class=\"source\">Source: {{appConfigService.sources[source]}}</div>\r\n\r\n\r\n\r\n\r\n\r\n  <mat-table #table class=\"data\"  [dataSource]=\"dataSource\" *ngIf=\"showDataTable\">\r\n\r\n    <ng-container matColumnDef=\"ts\" >\r\n      <mat-header-cell *matHeaderCellDef> Date </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.ts*1000 | date:\"medium\"}} </mat-cell>\r\n    </ng-container>\r\n\r\n    <ng-container matColumnDef=\"perf\">\r\n      <mat-header-cell *matHeaderCellDef> Perf ({{base}})</mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.perf | number:\"1.2-2\"}}% </mat-cell>\r\n    </ng-container>\r\n\r\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n  </mat-table>\r\n\r\n</mat-card>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/widgets/price/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppPriceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__ = __webpack_require__("../../../../angular-highcharts/angular-highcharts.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_localton_components_DataWithChart_component__ = __webpack_require__("../../../../../src/lib/localton/components/DataWithChart/component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppPriceComponent = (function (_super) {
    __extends(AppPriceComponent, _super);
    function AppPriceComponent(logic, appConfigService) {
        var _this = _super.call(this, logic, appConfigService, "stock") || this;
        _this.logic = logic;
        _this.appConfigService = appConfigService;
        _this.displayedColumns = ['ts', 'open', 'high', 'low', 'close'];
        _this.period = "60";
        _this.base = "USD";
        _this.source = "kraken";
        _this.options = {
            chart: { type: 'candlestick', margin: 0, },
            credits: { enabled: false },
            plotOptions: {
                candlestick: { color: 'red', upColor: 'green', downColor: 'red' },
                series: {
                    animation: false
                }
            }, navigator: {
                series: {
                    fillColor: '#cccccc',
                    fillOpacity: 0.1,
                    lineColor: 'grey'
                }
            },
            rangeSelector: {
                selected: 4,
                inputEnabled: false,
                buttonTheme: {
                    visibility: 'hidden'
                },
                labelStyle: {
                    visibility: 'hidden'
                }
            }
        };
        return _this;
    }
    AppPriceComponent.prototype.ngOnInit = function () {
        this.updateData();
    };
    AppPriceComponent.prototype.updateData = function () {
        var _this = this;
        this.logic.getChartData(this.source, this.period, this.symbol, this.base, function (res) {
            _this.checkData();
            var D = [];
            var minVal = 10000000;
            for (var i = 0; i < res.length; ++i) {
                var line = [parseInt(res[i].ts) * 1000, parseFloat(res[i].open), parseFloat(res[i].high), parseFloat(res[i].low), parseFloat(res[i].close)];
                minVal = Math.min(minVal, parseFloat(res[i].low));
                D.push(line);
            }
            _this.dataSource = new __WEBPACK_IMPORTED_MODULE_3__angular_material__["i" /* MatTableDataSource */](res);
            _this.data = D;
            _this.updateOptions({ series: [{
                        name: _this.symbol,
                        data: D
                    }], yAxis: {} });
            _this.chart = new __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__["d" /* StockChart */](_this.options);
        });
    };
    AppPriceComponent.prototype.setValue = function (v) {
        this.symbol = v;
        this.updateData();
    };
    AppPriceComponent.prototype.setBase = function (v) {
        this.base = v;
        this.updateData();
    };
    AppPriceComponent.prototype.setInterval = function (v) {
        this.period = v.toString();
        this.updateData();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AppPriceComponent.prototype, "symbol", void 0);
    AppPriceComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-price',
            template: __webpack_require__("../../../../../src/widgets/price/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__["a" /* AppConfigService */]])
    ], AppPriceComponent);
    return AppPriceComponent;
}(__WEBPACK_IMPORTED_MODULE_5__lib_localton_components_DataWithChart_component__["a" /* DataAndChartTemplate */]));



/***/ }),

/***/ "../../../../../src/widgets/price/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"chart-card\">\r\n  <mat-card-header>\r\n    <mat-card-title>{{symbol}} Price</mat-card-title>\r\n    <mat-card-subtitle>Candlestick chart by  {{appConfigService.intervalNames[period]}} in {{base}}</mat-card-subtitle>\r\n  </mat-card-header>\r\n    <div class=\"options\">\r\n      <mat-menu [overlapTrigger]=\"false\" #appMenu1=\"matMenu\">\r\n        <button *ngFor=\"let val of appConfigService.values\" mat-menu-item (click)=\"setValue(val)\"> {{val}} </button>\r\n      </mat-menu>\r\n\r\n      <div class=\"row\">Symbols: <button class=\"symbol\" mat-button *ngFor=\"let val of appConfigService.values\" (click)=\"setValue(val)\"><app-crypto-icon  [display]=\"'symbol'\" [symbol]=\"val\"></app-crypto-icon>  </button>      </div>\r\n      <div class=\"row\">\r\n        <button mat-button  [matMenuTriggerFor]=\"appMenu1\" *ngIf=\"false\">\r\n          Symbol: {{symbol}}\r\n        </button>\r\n        <mat-menu [overlapTrigger]=\"false\" #appMenu2=\"matMenu\">\r\n          <button *ngFor=\"let val of appConfigService.bases\" mat-menu-item (click)=\"setBase(val)\"> {{val}} </button>\r\n        </mat-menu>\r\n        <button mat-button  [matMenuTriggerFor]=\"appMenu2\">\r\n          Base: {{base}}\r\n        </button>\r\n        <mat-menu [overlapTrigger]=\"false\" #appMenu5=\"matMenu\">\r\n          <button *ngFor=\"let val of appConfigService.intervals\" mat-menu-item (click)=\"setInterval(val)\"> {{appConfigService.intervalNames[val]}} </button>\r\n        </mat-menu>\r\n        <button mat-button  [matMenuTriggerFor]=\"appMenu5\">\r\n          Interval: {{appConfigService.intervalNames[period]}}\r\n        </button>\r\n      </div>\r\n    </div>\r\n  <button class=\"dots\" mat-icon-button [matMenuTriggerFor]=\"menu\">\r\n    <mat-icon>more_vert</mat-icon>\r\n  </button>\r\n  <mat-menu #menu=\"matMenu\">\r\n    <button mat-button class=\"showdata\"  (click)=\"showDataTable=!showDataTable\">{{showDataTable?'Hide':'Show'}} data</button>\r\n  </mat-menu>\r\n\r\n  <mat-card-content>\r\n    <div class=\"highchart-box\" [chart]=\"chart\"></div>\r\n\r\n    <br class=\"clear\">\r\n  </mat-card-content>\r\n  <span  *ngIf=\"showDataTable\" class=\"source\">Source: {{appConfigService.sources[source]}}</span>\r\n    <mat-table #table class=\"data\"  [dataSource]=\"dataSource\" *ngIf=\"showDataTable\">\r\n\r\n      <ng-container matColumnDef=\"ts\" >\r\n        <mat-header-cell *matHeaderCellDef> Date </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" >{{element.ts*1000 | date:\"medium\"}} </mat-cell>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"open\" >\r\n        <mat-header-cell *matHeaderCellDef> Open ({{base}}) </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" >{{element.open | number}} </mat-cell>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"high\" >\r\n        <mat-header-cell *matHeaderCellDef> High ({{base}}) </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" >{{element.high | number}} </mat-cell>\r\n      </ng-container>\r\n\r\n\r\n      <ng-container matColumnDef=\"low\" >\r\n        <mat-header-cell *matHeaderCellDef> Low ({{base}}) </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" >{{element.low | number}} </mat-cell>\r\n      </ng-container>\r\n\r\n\r\n      <ng-container matColumnDef=\"close\" >\r\n        <mat-header-cell *matHeaderCellDef> Close ({{base}}) </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" >{{element.close | number}} </mat-cell>\r\n      </ng-container>\r\n\r\n\r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n    </mat-table>\r\n\r\n\r\n\r\n\r\n\r\n</mat-card>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/widgets/pricedivmarket/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppPriceDivMarketComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__ = __webpack_require__("../../../../angular-highcharts/angular-highcharts.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_localton_components_DataWithChart_component__ = __webpack_require__("../../../../../src/lib/localton/components/DataWithChart/component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppPriceDivMarketComponent = (function (_super) {
    __extends(AppPriceDivMarketComponent, _super);
    function AppPriceDivMarketComponent(logic, appConfigService) {
        var _this = _super.call(this, logic, appConfigService) || this;
        _this.logic = logic;
        _this.appConfigService = appConfigService;
        _this.displayedColumns = ['ts', 'ratio'];
        _this.symbol = "BTC";
        _this.base = "USD";
        _this.source = "ccc";
        _this.options = {
            chart: { type: 'area' },
            candlestick: { color: 'green', upColor: 'red' },
            credits: { enabled: false },
            plotOptions: {
                series: {
                    animation: false
                }
            },
            rangeSelector: {
                selected: 4,
                inputEnabled: false,
                buttonTheme: {
                    visibility: 'hidden'
                },
                labelStyle: {
                    visibility: 'hidden'
                }
            }
        };
        return _this;
    }
    AppPriceDivMarketComponent.prototype.updateData = function () {
        var _this = this;
        this.logic.getPriceDivMarketCapData(this.source, this.symbol, this.base, function (res) {
            _this.data = res;
            _this.checkData();
            var D = [];
            for (var i = 0; i < res.length; ++i) {
                var line = [parseInt(res[i].ts) * 1000, parseFloat(res[i].ratio)];
                D.push(line);
            }
            console.log(D);
            _this.dataSource = new __WEBPACK_IMPORTED_MODULE_3__angular_material__["i" /* MatTableDataSource */](_this.data);
            _this.data = D;
            _this.updateOptions({ series: [{
                        name: _this.symbol,
                        data: D, color: '#b59b4c'
                    }], yAxis: {} });
            _this.chart = new __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__["d" /* StockChart */](_this.options);
        });
    };
    AppPriceDivMarketComponent.prototype.setValue = function (v) {
        this.symbol = v;
        this.updateData();
    };
    AppPriceDivMarketComponent.prototype.setBase = function (v) {
        this.base = v;
        this.updateData();
    };
    AppPriceDivMarketComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-ratio-pricecap',
            template: __webpack_require__("../../../../../src/widgets/pricedivmarket/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__["a" /* AppConfigService */]])
    ], AppPriceDivMarketComponent);
    return AppPriceDivMarketComponent;
}(__WEBPACK_IMPORTED_MODULE_5__lib_localton_components_DataWithChart_component__["a" /* DataAndChartTemplate */]));



/***/ }),

/***/ "../../../../../src/widgets/pricedivmarket/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"chart-card\">\r\n  <mat-card-header>\r\n    <mat-card-title>{{symbol}} Price / Market cap</mat-card-title>\r\n    <mat-card-subtitle>In {{base}}</mat-card-subtitle>\r\n  </mat-card-header>\r\n\r\n  <div class=\"options\">\r\n    <mat-menu [overlapTrigger]=\"false\" #appMenu1=\"matMenu\">\r\n      <button *ngFor=\"let val of appConfigService.values\" mat-menu-item (click)=\"setValue(val)\"> {{val}}</button>\r\n    </mat-menu>\r\n    <div class=\"row\">Symbols:\r\n      <button class=\"symbol\" mat-button *ngFor=\"let val of appConfigService.values\" (click)=\"setValue(val)\"> {{val}}\r\n      </button>\r\n    </div>\r\n    <div class=\"row\">\r\n      <button mat-button [matMenuTriggerFor]=\"appMenu1\" *ngIf=\"false\">\r\n        Symbol: {{symbol}}\r\n      </button>\r\n      <mat-menu [overlapTrigger]=\"false\" #appMenu2=\"matMenu\">\r\n        <button *ngFor=\"let val of appConfigService.bases\" mat-menu-item (click)=\"setBase(val)\"> {{val}}</button>\r\n      </mat-menu>\r\n      <button mat-button [matMenuTriggerFor]=\"appMenu2\">\r\n        Base: {{base}}\r\n      </button>\r\n\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <mat-card-content>\r\n\r\n    <div [chart]=\"chart\"></div>\r\n\r\n    <br class=\"clear\">\r\n\r\n  </mat-card-content>\r\n\r\n\r\n  <mat-card-actions>\r\n    <button mat-button class=\"showdata\" (click)=\"showDataTable=!showDataTable\">{{showDataTable?'Hide':'Show'}} data\r\n    </button>\r\n    <span *ngIf=\"showDataTable\" class=\"source\">Source: {{appConfigService.sources[source]}}</span>\r\n  </mat-card-actions>\r\n  <mat-table #table class=\"data\" [dataSource]=\"dataSource\" *ngIf=\"showDataTable\">\r\n\r\n    <ng-container matColumnDef=\"ts\">\r\n      <mat-header-cell *matHeaderCellDef> Date</mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\">{{element.ts*1000 | date:\"medium\"}}</mat-cell>\r\n    </ng-container>\r\n\r\n    <ng-container matColumnDef=\"ratio\">\r\n      <mat-header-cell *matHeaderCellDef> Price/Market Cap (m{{base}})</mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\">{{element.ratio  }}</mat-cell>\r\n    </ng-container>\r\n\r\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n  </mat-table>\r\n\r\n</mat-card>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/widgets/sorted-perf/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppSortedPerformanceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppSortedPerformanceComponent = (function () {
    function AppSortedPerformanceComponent(logic, appConfigService) {
        this.logic = logic;
        this.appConfigService = appConfigService;
        this.value = "BTC";
        this.period = "60";
        this.base = "EUR";
        this.source = "kraken";
        this.timestamp = "1512925200";
        this.displayedColumns = ['value', 'percent'];
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_2__angular_material__["i" /* MatTableDataSource */]([]);
        this.updateData();
    }
    AppSortedPerformanceComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    AppSortedPerformanceComponent.prototype.updateData = function () {
        var _this = this;
        this.logic.getAllChartData(this.source, this.period, this.timestamp, this.base, function (res) {
            console.log("res", res, res.length);
            var D = [];
            for (var i = 0; i < res.length; ++i) {
                var r = res[i];
                var line = {
                    value: r.value,
                    percent: (Math.floor(1000 * (parseFloat(r.close) - parseFloat(r.open)) / parseFloat(r.open))) / 10
                };
                D.unshift(line);
            }
            _this.dataSource = new __WEBPACK_IMPORTED_MODULE_2__angular_material__["i" /* MatTableDataSource */](D);
            ;
            console.log("formated", D);
        });
    };
    AppSortedPerformanceComponent.prototype.setValue = function (v) {
        this.value = v;
        this.updateData();
    };
    AppSortedPerformanceComponent.prototype.setBase = function (v) {
        this.base = v;
        this.updateData();
    };
    AppSortedPerformanceComponent.prototype.setInterval = function (v) {
        this.period = v.toString();
        this.updateData();
    };
    AppSortedPerformanceComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sorted-performance',
            template: __webpack_require__("../../../../../src/widgets/sorted-perf/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_1__lib_localton_services_appconfig_service__["a" /* AppConfigService */]])
    ], AppSortedPerformanceComponent);
    return AppSortedPerformanceComponent;
}());



/***/ }),

/***/ "../../../../../src/widgets/sorted-perf/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"example-card\">\r\n  <mat-card-header>\r\n    <mat-card-title>Ranking</mat-card-title>\r\n    <mat-card-subtitle>  {{timestamp*1000 | date:\"medium\"}}</mat-card-subtitle>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n\r\n\r\n    <div>\r\n      <mat-form-field>\r\n        <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\">\r\n        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n        <mat-datepicker #picker></mat-datepicker>\r\n      </mat-form-field>\r\n\r\n\r\n\r\n      <mat-menu [overlapTrigger]=\"false\" #appMenu1=\"matMenu\">\r\n        <button *ngFor=\"let val of appConfigService.values\" mat-menu-item (click)=\"setValue(val)\"> {{val}} </button>\r\n      </mat-menu>\r\n      <button mat-button  [matMenuTriggerFor]=\"appMenu1\">\r\n        Value: {{value}}\r\n      </button>\r\n      <mat-menu [overlapTrigger]=\"false\" #appMenu2=\"matMenu\">\r\n        <button *ngFor=\"let val of appConfigService.bases\" mat-menu-item (click)=\"setBase(val)\"> {{val}} </button>\r\n      </mat-menu>\r\n      <button mat-button  [matMenuTriggerFor]=\"appMenu2\">\r\n        Base: {{base}}\r\n      </button>\r\n      <mat-menu [overlapTrigger]=\"false\" #appMenu5=\"matMenu\">\r\n        <button *ngFor=\"let val of appConfigService.intervals\" mat-menu-item (click)=\"setInterval(val)\"> {{appConfigService.intervalNames[val]}} </button>\r\n      </mat-menu>\r\n      <button mat-button  [matMenuTriggerFor]=\"appMenu5\">\r\n        Interval: {{appConfigService.intervalNames[period]}}\r\n      </button>\r\n    </div>\r\n\r\n\r\n\r\n\r\n\r\n    <mat-table #table [dataSource]=\"dataSource\">\r\n      <ng-container matColumnDef=\"value\">\r\n        <mat-header-cell *matHeaderCellDef> No. </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\"> {{element.value}} </mat-cell>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"percent\">\r\n        <mat-header-cell *matHeaderCellDef> Evolution </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\">{{element.percent}}% </mat-cell>\r\n      </ng-container>\r\n\r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n    </mat-table>\r\n  </mat-card-content>\r\n\r\n\r\n\r\n  <mat-card-actions>\r\n    <button mat-button>More</button>\r\n\r\n  </mat-card-actions>\r\n</mat-card>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/widgets/top-performance-daily/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppTopPerformanceDailyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_localton_components_DataWithChart_component__ = __webpack_require__("../../../../../src/lib/localton/components/DataWithChart/component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppTopPerformanceDailyComponent = (function (_super) {
    __extends(AppTopPerformanceDailyComponent, _super);
    function AppTopPerformanceDailyComponent(logic, appConfigService) {
        var _this = _super.call(this, logic, appConfigService) || this;
        _this.logic = logic;
        _this.appConfigService = appConfigService;
        _this.displayedColumns = ['symbol', 'perf'];
        _this.dataSource = new __WEBPACK_IMPORTED_MODULE_3__angular_material__["i" /* MatTableDataSource */]([]);
        _this.ts = 1512509400;
        _this.base = "EUR";
        _this.source = "kraken";
        _this.length = 100;
        _this.pageSize = 10;
        _this.pageSizeOptions = [10, 25, 100];
        _this.data = [];
        _this.displayedData = [];
        _this.isLoaded = false;
        _this.pageIndex = 0;
        _this.date = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormControl */](new Date(_this.ts * 1000));
        _this.serializedDate = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormControl */]((new Date()).toISOString());
        return _this;
    }
    AppTopPerformanceDailyComponent.prototype.showData = function (res) {
        if (res)
            this.data = res;
        if (this.data) {
            this.displayedData = this.data.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
            this.dataSource = new __WEBPACK_IMPORTED_MODULE_3__angular_material__["i" /* MatTableDataSource */](this.displayedData);
            this.length = this.data.length;
            this.isLoaded = true;
        }
    };
    AppTopPerformanceDailyComponent.prototype.updatePagination = function (event) {
        this.pageIndex = event.pageIndex;
        this.showData();
    };
    AppTopPerformanceDailyComponent.prototype.updateData = function () {
        var _this = this;
        this.logic.getDailyTopPerformance(this.source, this.ts, this.base, function (res) {
            _this.data = res;
            _this.showData();
        });
    };
    AppTopPerformanceDailyComponent.prototype.yesterday = function () {
        this.updateDate(this.ts - 86400);
    };
    AppTopPerformanceDailyComponent.prototype.tomorrow = function () {
        this.updateDate(this.ts + 86400);
    };
    AppTopPerformanceDailyComponent.prototype.updateDate = function (ts) {
        this.ts = ts;
        this.date = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormControl */](new Date(this.ts * 1000));
        this.updateData();
    };
    AppTopPerformanceDailyComponent.prototype.dateChanged = function (event) {
        this.updateDate(new Date(event.value).getTime() / 1000);
    };
    AppTopPerformanceDailyComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-top-performance-daily',
            template: __webpack_require__("../../../../../src/widgets/top-performance-daily/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__["a" /* AppConfigService */]])
    ], AppTopPerformanceDailyComponent);
    return AppTopPerformanceDailyComponent;
}(__WEBPACK_IMPORTED_MODULE_5__lib_localton_components_DataWithChart_component__["a" /* DataAndChartTemplate */]));



/***/ }),

/***/ "../../../../../src/widgets/top-performance-daily/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"example-card\">\r\n  <mat-card-header>\r\n    <mat-card-title>Top performers</mat-card-title>\r\n    <mat-card-subtitle>Weekly</mat-card-subtitle>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n    <mat-form-field>\r\n      <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\"  (dateChange)=\"dateChanged($event)\" [formControl]=\"date\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker></mat-datepicker>\r\n    </mat-form-field>\r\n\r\n\r\n\r\n    <mat-table #table [dataSource]=\"dataSource\">\r\n\r\n      <ng-container matColumnDef=\"symbol\">\r\n        <mat-header-cell *matHeaderCellDef> Symbol </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\"> {{element.symbol}} </mat-cell>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"perf\">\r\n        <mat-header-cell *matHeaderCellDef> Perf </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\">{{element.perf  | number:\"1.1-1\"}}% </mat-cell>\r\n      </ng-container>\r\n\r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n    </mat-table>\r\n  </mat-card-content>\r\n\r\n\r\n\r\n  <mat-card-actions>\r\n    <button mat-button (click)=\"yesterday()\">Previous day</button>\r\n    <button mat-button (click)=\"tomorrow()\">Next day</button>\r\n\r\n  </mat-card-actions>\r\n</mat-card>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/widgets/top-performance/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppTopPerformanceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__ = __webpack_require__("../../../../angular-highcharts/angular-highcharts.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_localton_components_DataWithChart_component__ = __webpack_require__("../../../../../src/lib/localton/components/DataWithChart/component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppTopPerformanceComponent = (function (_super) {
    __extends(AppTopPerformanceComponent, _super);
    function AppTopPerformanceComponent(logic, appConfigService) {
        var _this = _super.call(this, logic, appConfigService, "plain") || this;
        _this.logic = logic;
        _this.appConfigService = appConfigService;
        _this.displayedColumns = ['symbol', 'perf'];
        _this.dataSource = new __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MatTableDataSource */]([]);
        _this.displayedColumnsRef = ['symbol', 'ts_from', 'val_from', 'ts_to', 'val_to', 'perf'];
        _this.dataSourceRef = new __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MatTableDataSource */]([]);
        _this.ts = 1451692800;
        _this.base = "USD";
        _this.source = "kraken";
        _this.length = 100;
        _this.pageSize = 10;
        _this.pageSizeOptions = [10, 25, 100];
        _this.data = [];
        _this.displayedData = [];
        _this.isLoaded = false;
        _this.pageIndex = 0;
        _this.isFuture = false;
        _this.date = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */](new Date(_this.ts * 1000));
        _this.serializedDate = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */]((new Date()).toISOString());
        _this.period = "last24h";
        _this.options = {
            chart: { type: 'column' },
            credits: { enabled: false },
            tooltip: {
                valueSuffix: '%'
            },
            title: { text: "" },
            plotOptions: {
                column: {
                    colorByPoint: true
                },
                series: {
                    animation: false
                }
            },
            yAxis: { stackLabels: {
                    enabled: true, style: {
                        fontWeight: 'bold',
                        color: 'gray'
                    },
                    formatter: function () {
                        // var s = this.series.options.QTotal;
                        //      return Highcharts.numberFormat(Math.round(s*100)/100,2)+'%';
                        return "aa";
                    }
                } }
        };
        _this.initDate();
        _this.updateData();
        return _this;
    }
    AppTopPerformanceComponent.prototype.initDate = function () {
        this.setDates();
        var d = new Date();
        d.setHours(0, 0, 0, 0);
        this.ts = d.getTime() / 1000;
        this.updateDate(this.ts);
        console.log("init", this.ts);
    };
    AppTopPerformanceComponent.prototype.setPeriod = function (p) {
        this.period = p;
        this.setDates();
        this.updateData();
    };
    AppTopPerformanceComponent.prototype.setDates = function () {
        if (this.period === "last24h") {
            this.from = Math.floor(new Date().getTime() / 1000) - 86400;
            this.to = Math.floor(new Date().getTime() / 1000);
        }
        else if (this.period === "last7d") {
            this.from = Math.floor(new Date().getTime() / 1000) - 86400 * 7;
            this.to = Math.floor(new Date().getTime() / 1000);
        }
        else if (this.period === "last30d") {
            this.from = Math.floor(new Date().getTime() / 1000) - 86400 * 30;
            this.to = Math.floor(new Date().getTime() / 1000);
        }
    };
    AppTopPerformanceComponent.prototype.showData = function (res) {
        if (res)
            this.data = res;
        if (this.data) {
            this.displayedData = this.data.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
            this.dataSource = new __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MatTableDataSource */](this.displayedData);
            this.length = this.data.length;
            this.isLoaded = true;
        }
    };
    AppTopPerformanceComponent.prototype.updatePagination = function (event) {
        this.pageIndex = event.pageIndex;
        this.showData();
    };
    AppTopPerformanceComponent.prototype.updateData = function () {
        var _this = this;
        this.logic.getTopPerformance(this.source, this.from, this.to, this.base, function (res) {
            _this.data = res;
            _this.dataSourceRef = new __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MatTableDataSource */](_this.data);
            _this.showData();
            /* CHART*/
            var X = [], Y = [], C = [];
            for (var i = 0; i < res.length; ++i) {
                X.push(res[i].symbol);
                Y.push(Math.round(100 * res[i].perf * 100) / 100);
                C.push(res[i].perf > 0 ? "#559e4f" : "#bb0f0f");
            }
            console.log("perf", _this.data, "X=", X, "Y=", Y);
            _this.updateOptions({
                colors: C,
                xAxis: {
                    categories: X
                },
                series: [{
                        name: "Performance",
                        data: Y
                    }]
            });
            _this.chart = new __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__["a" /* Chart */](_this.options);
        });
    };
    AppTopPerformanceComponent.prototype.yesterday = function () {
        this.updateDate(this.ts - 86400);
    };
    AppTopPerformanceComponent.prototype.tomorrow = function () {
        this.updateDate(this.ts + 86400);
    };
    AppTopPerformanceComponent.prototype.updateDate = function (ts) {
        if (new Date().getTime() / 1000 - ts < 0)
            this.isFuture = true;
        else
            this.isFuture = false;
        this.ts = ts;
        this.date = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */](new Date(this.ts * 1000));
        this.updateData();
    };
    AppTopPerformanceComponent.prototype.dateChanged = function (event) {
        this.updateDate(new Date(event.value).getTime() / 1000);
    };
    AppTopPerformanceComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-top-performance',
            template: __webpack_require__("../../../../../src/widgets/top-performance/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_3__lib_localton_services_appconfig_service__["a" /* AppConfigService */]])
    ], AppTopPerformanceComponent);
    return AppTopPerformanceComponent;
}(__WEBPACK_IMPORTED_MODULE_6__lib_localton_components_DataWithChart_component__["a" /* DataAndChartTemplate */]));



/***/ }),

/***/ "../../../../../src/widgets/top-performance/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"chart-card\">\r\n  <mat-card-header>\r\n    <mat-card-title>Top performers</mat-card-title>\r\n    <mat-card-subtitle *ngIf=\"period=='last24h'\">Last 24h</mat-card-subtitle>\r\n    <mat-card-subtitle *ngIf=\"period=='last7d'\">Last 7j</mat-card-subtitle>\r\n    <mat-card-subtitle *ngIf=\"period=='last30d'\">Last 30j</mat-card-subtitle>\r\n  </mat-card-header>\r\n  <div class=\"options\">\r\n    <div class=\"row\">\r\n      <button class=\"symbol\" mat-button (click)=\"setPeriod('last24h')\"> Last 24h </button>\r\n      <button class=\"symbol\" mat-button (click)=\"setPeriod('last7d')\"> Last 7j </button>\r\n      <button class=\"symbol\" mat-button (click)=\"setPeriod('last30d')\"> Last 30j </button>\r\n    </div>\r\n  </div>\r\n  <mat-card-content >\r\n    <div [chart]=\"chart\"></div>\r\n    <br class=\"clear\">\r\n\r\n\r\n    <div *ngIf=\"period=='custom'\">\r\n    <mat-form-field>\r\n      <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\" (dateChange)=\"dateChanged($event)\"  [formControl]=\"date\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker></mat-datepicker>\r\n    </mat-form-field>\r\n    </div>\r\n\r\n  </mat-card-content>\r\n\r\n  <div *ngIf=\"period=='custom'\"><mat-card-actions>\r\n      <button mat-button (click)=\"yesterday()\">Previous day</button>\r\n      <button mat-button *ngIf=\"!isFuture\" (click)=\"tomorrow()\">Next day</button>\r\n\r\n  </mat-card-actions></div>\r\n\r\n  <span *ngIf=\"isFuture\">Future data is not available</span>\r\n\r\n    <mat-table #table *ngIf=\"!isFuture\" [dataSource]=\"dataSource\">\r\n      <ng-container matColumnDef=\"symbol\">\r\n        <mat-header-cell *matHeaderCellDef> Symbol </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\"> {{element.symbol}} </mat-cell>\r\n      </ng-container>\r\n      <ng-container matColumnDef=\"perf\">\r\n        <mat-header-cell *matHeaderCellDef> Perf </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" [ngClass]=\"element.perf>0?'valpos':'valneg'\" >{{element.perf*100 | number:\"1.1-1\"}}% </mat-cell>\r\n      </ng-container>\r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n    </mat-table>\r\n\r\n\r\n  <mat-card-actions>\r\n    <button mat-button class=\"showdata\"  (click)=\"showDataTable=!showDataTable\">{{showDataTable?'Hide':'Show'}} data</button>\r\n    <span  *ngIf=\"showDataTable\" class=\"source\">Source: {{appConfigService.sources[source]}}</span>\r\n  </mat-card-actions>\r\n\r\n  <mat-table #table class=\"data\"  [dataSource]=\"dataSourceRef\" *ngIf=\"showDataTable\">\r\n    <ng-container matColumnDef=\"symbol\" >\r\n      <mat-header-cell *matHeaderCellDef> Symbol </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.symbol}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"ts_from\" >\r\n      <mat-header-cell *matHeaderCellDef> Start Date </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.ts_from*1000 | date:\"medium\"}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"val_from\" >\r\n      <mat-header-cell *matHeaderCellDef> Start Price ({{base}}) </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.val_from | number}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"ts_to\" >\r\n      <mat-header-cell *matHeaderCellDef> End Date </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.ts_to*1000 | date:\"medium\"}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"val_to\" >\r\n      <mat-header-cell *matHeaderCellDef> End Price ({{base}}) </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.val_to | number}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"perf\" >\r\n      <mat-header-cell *matHeaderCellDef> Perf  </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" >{{element.perf*100 | number}}% </mat-cell>\r\n    </ng-container>\r\n    <mat-header-row *matHeaderRowDef=\"displayedColumnsRef\"></mat-header-row>\r\n    <mat-row *matRowDef=\"let row; columns: displayedColumnsRef;\"></mat-row>\r\n  </mat-table>\r\n\r\n\r\n\r\n</mat-card>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/widgets/trending-lastweek/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppTrendingLastWeekComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__ = __webpack_require__("../../../../angular-highcharts/angular-highcharts.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_localton_components_DataWithChart_component__ = __webpack_require__("../../../../../src/lib/localton/components/DataWithChart/component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppTrendingLastWeekComponent = (function (_super) {
    __extends(AppTrendingLastWeekComponent, _super);
    function AppTrendingLastWeekComponent(logic, appConfigService) {
        var _this = _super.call(this, logic, appConfigService) || this;
        _this.logic = logic;
        _this.appConfigService = appConfigService;
        _this.displayedColumns = ['ts', 'symbol', 'price', 'cap'];
        _this.ts = 1512509400;
        _this.base = "USD";
        _this.source = "kraken";
        _this.sourcecap = "ccc";
        _this.length = 100;
        _this.options = {
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            credits: {
                enabled: false
            },
            title: { text: "ΔPrice vs MarketCap" },
            yAxis: { title: { text: "ΔPrice" } },
            xAxis: {
                title: {
                    text: "Market Cap (m" + _this.base + ")",
                }
            },
            tooltip: { valueSuffix: "%", valueDecimals: 2 },
        };
        return _this;
    }
    AppTrendingLastWeekComponent.prototype.updateData = function () {
        var _this = this;
        this.logic.getTrendingPriceCapLastWeek(this.source, 7, this.ts, this.base, this.sourcecap, function (res) {
            _this.data = res;
            _this.checkData();
            var XY = [];
            _this.dataSource = new __WEBPACK_IMPORTED_MODULE_3__angular_material__["i" /* MatTableDataSource */](_this.data);
            for (var i = 0; i < _this.data.length; ++i) {
                var ev = Math.round(100 * (_this.data[i + 1].price - _this.data[i].price) / _this.data[i].price * 100) / 100;
                console.log(_this.data[i].symbol, _this.data[i + 1].price - _this.data[i].price);
                //XY.push({x:ev,y:this.data[i+1].cap,z:1,name:this.data[i].symbol})
                XY.push({ name: _this.data[i].symbol, data: [[Math.round(_this.data[i + 1].cap / 1000000), ev]] });
                i++;
            }
            _this.updateOptions({ series: XY });
            _this.chart = new __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__["a" /* Chart */](_this.options);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AppTrendingLastWeekComponent.prototype, "symbol", void 0);
    AppTrendingLastWeekComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-trending-lastweek',
            template: __webpack_require__("../../../../../src/widgets/trending-lastweek/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__["a" /* AppConfigService */]])
    ], AppTrendingLastWeekComponent);
    return AppTrendingLastWeekComponent;
}(__WEBPACK_IMPORTED_MODULE_5__lib_localton_components_DataWithChart_component__["a" /* DataAndChartTemplate */]));



/***/ }),

/***/ "../../../../../src/widgets/trending-lastweek/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"chart-card\">\r\n  <mat-card-header>\r\n    <mat-card-title>ΔPrice vs Market cap</mat-card-title>\r\n    <mat-card-subtitle>Last week</mat-card-subtitle>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n    <div [chart]=\"chart\"></div>\r\n\r\n    <br class=\"clear\">\r\n\r\n\r\n\r\n  </mat-card-content>\r\n\r\n    <mat-card-actions>\r\n      <button mat-button class=\"showdata\" (click)=\"showDataTable=!showDataTable\">{{showDataTable?'Hide':'Show'}} data</button>\r\n      <span *ngIf=\"showDataTable\" class=\"source\">Source: {{appConfigService.sources[source]}}</span>\r\n    </mat-card-actions>\r\n    <mat-table #table class=\"data\"  [dataSource]=\"dataSource\" *ngIf=\"showDataTable\">\r\n\r\n      <ng-container matColumnDef=\"ts\" >\r\n        <mat-header-cell *matHeaderCellDef> Date </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" >{{element.ts*1000 | date:\"medium\"}} </mat-cell>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"symbol\">\r\n        <mat-header-cell *matHeaderCellDef> Symbol </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\"> {{element.symbol}} </mat-cell>\r\n      </ng-container>\r\n\r\n\r\n\r\n      <ng-container matColumnDef=\"price\" >\r\n        <mat-header-cell *matHeaderCellDef> Price ({{base}}) </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" >{{element.price | number}} </mat-cell>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"cap\">\r\n        <mat-header-cell *matHeaderCellDef> Cap (m{{base}})</mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" >{{element.cap/1000000 | number:\"1.0-0\"}} </mat-cell>\r\n      </ng-container>\r\n\r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n\r\n    </mat-table>\r\n\r\n\r\n\r\n\r\n</mat-card>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/widgets/twitter/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppTwitterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__ = __webpack_require__("../../../../../src/lib/globalton/core/services/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppTwitterComponent = (function () {
    function AppTwitterComponent(logic, appConfigService, requestService) {
        this.logic = logic;
        this.appConfigService = appConfigService;
        this.requestService = requestService;
        this.consumerKey = '26kAxes56Um1yJ0FV9jQ4Vtb4';
        this.consumerSecret = 'FSiP827AQVGdm2G6XivWOKtrAEQGoaubWAFbTqDBksSdnXEK01';
        this.token = '614294914-1Y5IJr5JIbTjIsJpL1vn4GE7XOazu4l0FztQtz8c';
        this.tokenSecret = 'krh7tQLXDdEVot4xEK7NdsVwD2Ex9hDvaB6NOHy5BENYw';
    }
    AppTwitterComponent.prototype.ngOnInit = function () {
        this.symbol = this.symbol == "GLOBAL" ? "cryptocurrency" : this.symbol;
        this.symbol;
        this.load(this.symbol, function (res) {
        });
    };
    AppTwitterComponent.prototype.parseTweets = function (res) {
        console.log(res);
        var R = res.searchTweets.statuses;
        var A = [];
        for (var k in R) {
            var tweet = R[k];
            A.push({
                id: tweet.id_str,
                text: tweet.text,
                image: tweet.user.profile_image_url,
                userscreenname: tweet.user.screen_name,
                url: tweet.entities.urls.length > 0 ? tweet.entities.urls[0].url : "no",
                userid: tweet.user.id,
                username: tweet.user.name,
                date: tweet.created_at,
                retweets: tweet.retweet_count,
                favorites: tweet.favorite_count
            });
        }
        return A;
    };
    AppTwitterComponent.prototype.load = function (q, f) {
        var _this = this;
        this.logic.getTweets(q, function (res) {
            var A = _this.parseTweets(res);
            _this.tweets = A;
            f(A);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AppTwitterComponent.prototype, "symbol", void 0);
    AppTwitterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-twitter',
            template: __webpack_require__("../../../../../src/widgets/twitter/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__["a" /* AppConfigService */], __WEBPACK_IMPORTED_MODULE_1__lib_globalton_core_services_request_service__["a" /* RequestService */]])
    ], AppTwitterComponent);
    return AppTwitterComponent;
}());



/***/ }),

/***/ "../../../../../src/widgets/twitter/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"tweet-card\">\r\n  <mat-card-header>\r\n    <mat-card-title>Latest tweets</mat-card-title>\r\n    <mat-card-subtitle>Most popular with hashtag #{{symbol}}</mat-card-subtitle>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n      <ul>\r\n        <li *ngFor=\"let t of tweets\" class=\"tweet\">\r\n          <div>\r\n            <a  target=\"_blank\"  href=\"http://twitter.com/{{t.userscreenname}}\">\r\n\r\n              <div class=\"tweet-image\" [ngStyle]=\"{'background-image': 'url(' + t.image + ')'}\"></div>\r\n              <span class=\"tweet-user\">{{t.username}}</span><br>\r\n              <span class=\"tweet-userscreen\">@{{t.userscreenname}}</span>\r\n              <br class=\"clear\">\r\n            </a><br>\r\n\r\n            <span class=\"tweet-text\">{{t.text}}</span><br>\r\n            <br>\r\n            <span class=\"tweet-date\">{{t.date | date:\"medium\"}}</span><br>\r\n            <mat-icon>cached</mat-icon>\r\n            <span class=\"tweet-retweets\">{{t.retweets}}</span>\r\n            <mat-icon>favorite_border</mat-icon>\r\n            <span class=\"tweet-favorites\">{{t.favorites}}</span>\r\n            <a  target=\"_blank\" href=\"http://twitter.com/statuses/{{t.id}}\" rel=\"external\" class=\"tweet-url\">More...</a>\r\n          </div>\r\n        </li>\r\n      </ul>\r\n\r\n\r\n  </mat-card-content>\r\n\r\n</mat-card>\r\n"

/***/ }),

/***/ "../../../../../src/widgets/volume/component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppVolumeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__ = __webpack_require__("../../../../angular-highcharts/angular-highcharts.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__ = __webpack_require__("../../../../../src/lib/localton/services/appconfig.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logic_Logic__ = __webpack_require__("../../../../../src/logic/Logic.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_localton_components_DataWithChart_component__ = __webpack_require__("../../../../../src/lib/localton/components/DataWithChart/component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppVolumeComponent = (function (_super) {
    __extends(AppVolumeComponent, _super);
    function AppVolumeComponent(logic, appConfigService) {
        var _this = _super.call(this, logic, appConfigService) || this;
        _this.logic = logic;
        _this.appConfigService = appConfigService;
        _this.displayedColumns = ['ts', 'volume'];
        _this.base = "USD";
        _this.source = "ccc";
        _this.options = {
            chart: { type: 'area' },
            candlestick: { color: 'green', upColor: 'red' },
            credits: { enabled: false },
            plotOptions: {
                series: {
                    animation: false
                }
            },
            rangeSelector: {
                selected: 4,
                inputEnabled: false,
                buttonTheme: {
                    visibility: 'hidden'
                },
                labelStyle: {
                    visibility: 'hidden'
                }
            }
        };
        _this.interval = 1;
        return _this;
    }
    AppVolumeComponent.prototype.getDateOfWeek = function (w, y) {
        var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week
        return new Date(y, 0, d);
    };
    AppVolumeComponent.prototype.updateData = function () {
        var _this = this;
        if (this.interval === 7) {
            this.logic.getVolumeWeekData(this.source, this.symbol, this.base, function (res) {
                _this.data = res;
                _this.checkData();
                var D = [];
                for (var i = 0; i < res.length; ++i) {
                    var comp = res[i].week.split("-");
                    var w = comp[0];
                    var y = comp[1];
                    var dd = _this.getDateOfWeek(w, y);
                    var line = [dd.getTime(), parseFloat(res[i].volume)];
                    D.push(line);
                }
                console.log(D);
                _this.dataSource = new __WEBPACK_IMPORTED_MODULE_3__angular_material__["i" /* MatTableDataSource */](_this.data);
                _this.data = D;
                _this.updateOptions({
                    chart: { type: 'column' },
                    series: [{
                            name: _this.symbol,
                            data: D, color: '#2ca917'
                        }], yAxis: {}
                });
                _this.chart = new __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__["d" /* StockChart */](_this.options);
            });
        }
        else {
            this.logic.getVolumeData(this.source, this.symbol, this.base, function (res) {
                _this.data = res;
                _this.checkData();
                var D = [];
                for (var i = 0; i < res.length; ++i) {
                    var line = [parseInt(res[i].ts) * 1000, Math.round(parseFloat(res[i].volume))];
                    D.push(line);
                }
                console.log(D);
                _this.dataSource = new __WEBPACK_IMPORTED_MODULE_3__angular_material__["i" /* MatTableDataSource */](_this.data);
                _this.data = D;
                _this.updateOptions({
                    chart: { type: 'area' },
                    series: [{
                            name: _this.symbol,
                            data: D, color: '#2ca917'
                        }], yAxis: {}
                });
                _this.chart = new __WEBPACK_IMPORTED_MODULE_1_angular_highcharts__["d" /* StockChart */](_this.options);
            });
        }
    };
    AppVolumeComponent.prototype.setValue = function (v) {
        this.symbol = v;
        this.updateData();
    };
    AppVolumeComponent.prototype.setInterval = function (v) {
        this.interval = v;
        this.updateData();
    };
    AppVolumeComponent.prototype.setBase = function (v) {
        this.base = v;
        this.updateData();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AppVolumeComponent.prototype, "symbol", void 0);
    AppVolumeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-volume',
            template: __webpack_require__("../../../../../src/widgets/volume/template.html")
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__logic_Logic__["a" /* Logic */], __WEBPACK_IMPORTED_MODULE_2__lib_localton_services_appconfig_service__["a" /* AppConfigService */]])
    ], AppVolumeComponent);
    return AppVolumeComponent;
}(__WEBPACK_IMPORTED_MODULE_5__lib_localton_components_DataWithChart_component__["a" /* DataAndChartTemplate */]));



/***/ }),

/***/ "../../../../../src/widgets/volume/template.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"chart-card\">\r\n  <mat-card-header>\r\n    <mat-card-title>{{symbol}} Volume</mat-card-title>\r\n    <mat-card-subtitle></mat-card-subtitle>\r\n  </mat-card-header>\r\n\r\n  <div class=\"options\">\r\n    <mat-menu [overlapTrigger]=\"false\" #appMenu1=\"matMenu\">\r\n      <button *ngFor=\"let val of appConfigService.values\" mat-menu-item (click)=\"setValue(val)\"> {{val}}</button>\r\n    </mat-menu>\r\n    <div class=\"row\">Symbols:\r\n      <button class=\"symbol\" mat-button *ngFor=\"let val of appConfigService.values\" (click)=\"setValue(val)\"> {{val}}\r\n      </button>\r\n    </div>\r\n    <div class=\"row\">\r\n      <button mat-button [matMenuTriggerFor]=\"appMenu1\" *ngIf=\"false\">\r\n        Symbol: {{symbol}}\r\n      </button>\r\n      <mat-menu [overlapTrigger]=\"false\" #appMenu2=\"matMenu\">\r\n        <button *ngFor=\"let val of appConfigService.bases\" mat-menu-item (click)=\"setBase(val)\"> {{val}}</button>\r\n      </mat-menu>\r\n      <button mat-button [matMenuTriggerFor]=\"appMenu2\">\r\n        Base: {{base}}\r\n      </button>\r\n      <mat-menu [overlapTrigger]=\"false\" #appMenu5=\"matMenu\">\r\n        <button  mat-menu-item (click)=\"setInterval(1)\">Day </button>\r\n        <button  mat-menu-item (click)=\"setInterval(7)\">Week </button>\r\n      </mat-menu>\r\n      <button mat-button  [matMenuTriggerFor]=\"appMenu5\">\r\n        Group by : {{interval==1?\"Day\":\"Week\"}}\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <button class=\"dots\" mat-icon-button [matMenuTriggerFor]=\"menu\"><mat-icon>more_vert</mat-icon></button>\r\n  <mat-menu #menu=\"matMenu\"><button mat-button class=\"showdata\"  (click)=\"showDataTable=!showDataTable\">{{showDataTable?'Hide':'Show'}} data</button></mat-menu>\r\n\r\n  <mat-card-content>\r\n\r\n    <div [chart]=\"chart\"></div>\r\n\r\n    <br class=\"clear\">\r\n\r\n  </mat-card-content>\r\n\r\n\r\n  <span *ngIf=\"showDataTable\" class=\"source\">Source: {{appConfigService.sources[source]}}</span>\r\n  <mat-table #table class=\"data\" [dataSource]=\"dataSource\" *ngIf=\"showDataTable\">\r\n\r\n    <ng-container matColumnDef=\"ts\">\r\n      <mat-header-cell *matHeaderCellDef> Date</mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\">{{element.ts*1000 | date:\"medium\"}}</mat-cell>\r\n    </ng-container>\r\n\r\n    <ng-container matColumnDef=\"volume\">\r\n      <mat-header-cell *matHeaderCellDef> Volume</mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\">{{element.volume  }}</mat-cell>\r\n    </ng-container>\r\n\r\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n  </mat-table>\r\n\r\n</mat-card>\r\n\r\n"

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);