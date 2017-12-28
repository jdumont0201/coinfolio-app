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
var optionsbar_service_1 = require("../../services/optionsbar.service");
var page_service_1 = require("../../services/page.service");
var core_1 = require("@angular/core");
var ProtectedPage = (function () {
    function ProtectedPage(pageService, route, router, isprotected) {
        var _this = this;
        //options:any={};
        this.actions = null;
        this.actionsbar = [];
        this.routeParams = {};
        this.protected = true;
        this.isHidden = false;
        this.isAuthenticated = false;
        console.log("--------------------------------------------------");
        if (typeof isprotected !== 'undefined')
            this.protected = isprotected;
        //console.log("ISPROTECTED",this.protected);
        this.pageService = pageService;
        // this.router=router;
        //this.pagename=this.classname = this.__proto__.constructor.name;
        this.pagename = this.classname = Object.getPrototypeOf(this).constructor.name;
        this.console = this.pageService.consoleService;
        this.console.constr(this.classname);
        //this.route=route;
        this.routeParams = route.params;
        //this.console.log("Route params",this.routeParams);
        /*if(routeParam){
         this.routeParams = routeParam.params;

         }
         */
        this.isAuthenticated = this.pageService.authService.isAuthenticated();
        this.console.auth(this.isAuthenticated);
        this.pageService.authService.loginChanged.subscribe(function (value) { return _this.updateLoginForm(value); }, function (error) { return console.log("Error updating loginform" + error); }, function () { return console.log('done'); });
        this.pageService.messageService.updateActivityMenu(false);
    }
    ProtectedPage.prototype.cons = function () {
    };
    ProtectedPage.prototype.addOptionsBarDashboard = function () {
        this.actionsbar.push(new optionsbar_service_1.OptionsBarItem("bar.backtodashboard", "back", "/"));
    };
    ProtectedPage.prototype.addOptionsBarCompany = function (id) {
        this.actionsbar.push(new optionsbar_service_1.OptionsBarItem("bar.backtocompany", "back", "/company/" + id));
    };
    ProtectedPage.prototype.addOptionsBarPosition = function (id, poid) {
        this.actionsbar.push(new optionsbar_service_1.OptionsBarItem("bar.backtoposition", "back", "/company/" + id + "/job/" + poid));
    };
    ProtectedPage.prototype.addOptionsBarLogin = function () {
        this.actionsbar.push(new optionsbar_service_1.OptionsBarItem("bar.backtologin", "back", "/"));
    };
    ProtectedPage.prototype.addOptionsBarConfig = function () {
        this.actionsbar.push(new optionsbar_service_1.OptionsBarItem("bar.backtoconfig", "back", "/config-all/all"));
    };
    ProtectedPage.prototype.addOptionsBarContact = function (id) {
        this.actionsbar.push(new optionsbar_service_1.OptionsBarItem("bar.backtocontact", "back", "/contact/" + id));
    };
    ProtectedPage.prototype.addOptionsBarAnnounce = function (positionId, companyId) {
        this.actionsbar.push(new optionsbar_service_1.OptionsBarItem("bar.backtoannounces", "back", "/company/" + companyId + "/job/" + positionId + "/announce"));
    };
    ProtectedPage.prototype.updateLoginForm = function (loginValue) {
        //this.console.serv("ProtectedPage updateLoginForm",loginValue);
        if (!this.isAuthenticated) {
            this.isAuthenticated = loginValue.authentificated;
            this.dorun();
        }
    };
    ProtectedPage.prototype.ngOnInit = function () {
        //console.log("compo init");
        /*
                let o:OptionsBarConfig=new OptionsBarConfig([]);
                this.noAuthPageConfig=new PageConfig(new HeaderDefaultInterface("Login"),o);
                if(this.actionsbar){
                    let O=new OptionsBarConfig(this.actionsbar)
                    this.pageService.optionsBarService.setOptions(O);
                    this.pageConfig=new PageConfig(new HeaderDefaultInterface(this.classname),O);
                }else{
                    if(this.actions){
                        //console.log("hasaction",this.buildActionButtons());
                        this.pageConfig=new PageConfig(new HeaderDefaultInterface(this.classname),this.buildActionButtons());
                    }else{
                        //console.log("hasactionno");
                        this.pageConfig=new PageConfig(new HeaderDefaultInterface(this.classname),this.getOptionsByClassname());
                    }
                }
                //console.log(" > PageConfig",this.pageConfig);
        
                if (!this.isAuthenticated && this.protected) {
                    this.pageService.preparePage(this.noAuthPageConfig);
                }else{
                    this.dorun();
                }*/
    };
    ProtectedPage.prototype.ngOnDestroy = function () {
        //console.log("destroy PPage");
        //this.modelService.modelUpdated.unsubscribe();
    };
    /*    getOptionsByClassname():OptionsBarConfig{
            return this.pageService.configService.getActionBar(this.classname,this.routeParams);
        }
    
        buildActionButtons():OptionsBarConfig{
            return this.pageService.configService.getActionBar2(this.actions,this.routeParams);
        }
    */
    ProtectedPage.prototype.dorun = function () {
        //     this.pageService.consoleService.log("RUN",this.pageConfig);
        this.pageService.preparePage(this.pageConfig);
        this.run();
    };
    return ProtectedPage;
}());
ProtectedPage = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [page_service_1.PageService, Object, Object, Boolean])
], ProtectedPage);
exports.ProtectedPage = ProtectedPage;
//# sourceMappingURL=ProtectedPage.js.map
