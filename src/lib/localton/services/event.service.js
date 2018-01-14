"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var EventService = (function () {
    function EventService(consoleService, authService, appConfigService, configService, messageService, snackBar) {
        var _this = this;
        this.consoleService = consoleService;
        this.authService = authService;
        this.appConfigService = appConfigService;
        this.configService = configService;
        this.messageService = messageService;
        this.snackBar = snackBar;
        this.panelCreatorEvent = new core_3.EventEmitter();
        this.loginEvent = new core_3.EventEmitter();
        this.subscribeEvent = new core_3.EventEmitter();
        this.panelChangedEvent = new core_3.EventEmitter();
        this.workspaceUpdatedEvent = new core_3.EventEmitter();
        this.menuDisplayUpdatedEvent = new core_3.EventEmitter();
        this.windowResizedEvent = new core_3.EventEmitter();
        this.brokerLoadedEvent = new core_3.EventEmitter();
        this.isFullscreenEvent = new core_3.EventEmitter();
        this.favoriteUpdatedEvent = new core_3.EventEmitter();
        this.poolDefinedEvent = new core_3.EventEmitter();
        this.rightMenuUpdatedEvent = new core_3.EventEmitter();
        this.isTickerVisible = true;
        this.isMenuDisplayed = true;
        this.isMobile = false;
        this.isMenuPinned = true;
        this.isVeilVisible = false;
        this.isLoadingVisible = true;
        this.isWelcomeVisible = false;
        this.isFullscreen = false;
        this.consoleService.event("+");
        this.init();
        //    this.configService.perSiteConfigured.subscribe(value => this.postConfigEvent(value), error => console.log("Error postConfigEvent" + error), () => console.log('done'));
        this.messageService.errorsChanged.subscribe(function (err) { return _this.errorsUpdated(err); });
    }
    EventService.prototype.enableFullscreen = function () {
        this.isFullscreen = true;
        this.isFullscreenEvent.emit(true);
    };
    EventService.prototype.openRightMenu = function (tab) {
        this.rightMenuUpdatedEvent.emit(tab);
    };
    EventService.prototype.disableFullscreen = function () {
        this.isFullscreen = false;
        this.isFullscreenEvent.emit(false);
    };
    EventService.prototype.showWelcome = function () {
        this.consoleService.ui("showwelcome");
        this.isWelcomeVisible = true;
    };
    EventService.prototype.hideWelcome = function () {
        this.consoleService.ui("hidewelcome");
        this.isWelcomeVisible = false;
    };
    EventService.prototype.showVeil = function () {
        this.consoleService.ui("showVeil");
        this.isVeilVisible = true;
    };
    EventService.prototype.hideVeil = function () {
        this.consoleService.ui("hideVeil");
        this.isVeilVisible = false;
    };
    EventService.prototype.hideLoading = function () {
        this.consoleService.ui("hideLoading");
        this.isLoadingVisible = false;
    };
    EventService.prototype.showLoading = function () {
        this.consoleService.ui("showLoading");
        this.isLoadingVisible = true;
    };
    EventService.prototype.getIsLoadingVisible = function () {
        //console.log("getisloading",this.isLoadingVisible)
        return this.isLoadingVisible;
    };
    EventService.prototype.errorsUpdated = function (err) {
        this.snackBar.open(err.code, null, { duration: 3000 });
    };
    EventService.prototype.ngOnInit = function () {
        var _this = this;
        this.consoleService.event("ONINIT");
        this.authService.loginChanged.subscribe(function (value) { return _this.loginChanged(value); }, function (error) { return console.log("Error postConfigEvent" + error); }, function () { return console.log('done'); });
    };
    EventService.prototype.loginChanged = function (value) {
        this.consoleService.event("loginChanged");
        if (this.authService.isAuthenticated()) {
            //this.hideLoading();
        }
        else {
            //            this.showWelcome()
            //          this.showVeil()
        }
        //this.isWelcomeVisible=this.isVeilVisible= this.authService.isAuthenticated()?false:true;
    };
    EventService.prototype.windowResized = function () {
        if (window.innerWidth < 800)
            this.isMobile = true;
        else
            this.isMobile = false;
        if (this.isMobile)
            this.isMenuDisplayed = false;
        else
            this.isMenuDisplayed = this.isMenuPinned ? true : false;
    };
    EventService.prototype.init = function () {
        this.consoleService.event("init");
        this.windowResized();
        this.loginChanged();
    };
    EventService.prototype.resized = function () {
        this.consoleService.event("resized", window.innerWidth);
        this.windowResizedEvent.emit({ w: window.innerWidth, h: window.innerHeight });
        this.windowResized();
    };
    EventService.prototype.showPanelCreator = function () {
        this.panelCreatorEvent.emit({ display: true });
    };
    EventService.prototype.hidePanelCreator = function () {
        this.consoleService.event("hidePanelCreator");
        this.panelCreatorEvent.emit({ display: false });
    };
    EventService.prototype.loadPanelCreator = function (p) {
        this.consoleService.event("loadPanelCreator", p);
        this.panelCreatorEvent.emit({ load: p });
    };
    EventService.prototype.unloadPanelCreator = function () {
        this.consoleService.event("unloadPanelCreator");
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
        this.consoleService.event("set panel", p);
        this.showPanel(p);
    };
    EventService.prototype.updateFavorites = function (favorites) {
        this.favoriteUpdatedEvent.emit(favorites);
    };
    __decorate([
        core_2.Output()
    ], EventService.prototype, "panelCreatorEvent", void 0);
    __decorate([
        core_2.Output()
    ], EventService.prototype, "loginEvent", void 0);
    __decorate([
        core_2.Output()
    ], EventService.prototype, "subscribeEvent", void 0);
    __decorate([
        core_2.Output()
    ], EventService.prototype, "panelChangedEvent", void 0);
    __decorate([
        core_2.Output()
    ], EventService.prototype, "workspaceUpdatedEvent", void 0);
    __decorate([
        core_2.Output()
    ], EventService.prototype, "menuDisplayUpdatedEvent", void 0);
    __decorate([
        core_2.Output()
    ], EventService.prototype, "windowResizedEvent", void 0);
    __decorate([
        core_2.Output()
    ], EventService.prototype, "brokerLoadedEvent", void 0);
    __decorate([
        core_2.Output()
    ], EventService.prototype, "isFullscreenEvent", void 0);
    __decorate([
        core_2.Output()
    ], EventService.prototype, "favoriteUpdatedEvent", void 0);
    __decorate([
        core_2.Output()
    ], EventService.prototype, "poolDefinedEvent", void 0);
    __decorate([
        core_2.Output()
    ], EventService.prototype, "rightMenuUpdatedEvent", void 0);
    EventService = __decorate([
        core_1.Injectable()
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
