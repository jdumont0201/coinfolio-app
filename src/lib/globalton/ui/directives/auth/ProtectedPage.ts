import {OptionsBarItem,OptionsBarConfig} from "../../../core/services/optionsbar.service";
import {Inject} from '@angular/core';
import {PageService,PageConfig} from '../../../core/services/page.service';
import {ConfigService} from '../../../core/services/config.service';
import {HeaderCustomInterface, HeaderDefaultInterface} from '../../../core/services/header.service';


import {Component, Injectable, Injector} from '@angular/core';


import {LoginChangedInterface} from '../../../core/interfaces/interfaces'

@Injectable()
export abstract class ProtectedPage {

    pageService: PageService;
    configService: ConfigService;

    classname: string;
    pagename:string;
    //options:any={};
    actions:number[]=null;
    actionsbar:any[]=[];
    routeParams:any={};
    protected:boolean=true;
    pageConfig:PageConfig;
    noAuthPageConfig:PageConfig;
    isHidden:boolean=false;
    isAuthenticated: boolean = false;
    abstract run();
    console;
    cons(){

    }
    addOptionsBarDashboard(){
        this.actionsbar.push(new OptionsBarItem("bar.backtodashboard","back","/")) ;
    }
    addOptionsBarCompany(id){
        this.actionsbar.push(new OptionsBarItem("bar.backtocompany","back","/company/"+id) );
    }

    addOptionsBarPosition(id,poid){
        this.actionsbar.push(new OptionsBarItem("bar.backtoposition","back","/company/"+id+"/job/"+poid) );
    }
    addOptionsBarLogin(){
        this.actionsbar.push(new OptionsBarItem("bar.backtologin","back","/") );
    }
    addOptionsBarConfig(){
        this.actionsbar.push(new OptionsBarItem("bar.backtoconfig","back","/config-all/all") );
    }
    addOptionsBarContact(id){
        this.actionsbar.push(new OptionsBarItem("bar.backtocontact","back","/contact/"+id) );
    }
    addOptionsBarAnnounce(positionId,companyId){
        this.actionsbar.push(new OptionsBarItem("bar.backtoannounces","back","/company/"+companyId+"/job/"+positionId+"/announce") );
    }
    updateLoginForm(loginValue:LoginChangedInterface) {
        //this.console.serv("ProtectedPage updateLoginForm",loginValue);
        if (!this.isAuthenticated) {
            this.isAuthenticated = loginValue.authentificated;
            this.dorun();
        }
    }

    constructor( pageService: PageService,route:any,router:any,isprotected?:boolean ) {
        console.log("--------------------------------------------------");
        if (typeof isprotected !== 'undefined')   this.protected=isprotected;
        //console.log("ISPROTECTED",this.protected);
        this.pageService = pageService;
       // this.router=router;
        //this.pagename=this.classname = this.__proto__.constructor.key;
        this.pagename=this.classname = Object.getPrototypeOf(this).constructor.name;
        this.console=this.pageService.consoleService;
        this.console.constr(this.classname);
        //this.route=route;
        this.routeParams=route.params;
        //this.console.log("Route params",this.routeParams);
        /*if(routeParam){
         this.routeParams = routeParam.params;

         }
         */
        this.isAuthenticated = this.pageService.authService.isAuthenticated();
        this.console.auth(this.isAuthenticated);
        this.pageService.authService.loginChanged.subscribe(value => this.updateLoginForm(value), error => console.log("Error updating loginform" + error), () => console.log('done'));
        this.pageService.messageService.updateActivityMenu(false);

    }
    ngOnInit(){
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
    }
    ngOnDestroy() {
        //console.log("destroy PPage");
        //this.modelService.modelUpdated.unsubscribe();
    }
/*    getOptionsByClassname():OptionsBarConfig{
        return this.pageService.configService.getActionBar(this.classname,this.routeParams);
    }

    buildActionButtons():OptionsBarConfig{
        return this.pageService.configService.getActionBar2(this.actions,this.routeParams);
    }
*/

    dorun():void{
        //     this.pageService.consoleService.log("RUN",this.pageConfig);
        this.pageService.preparePage(this.pageConfig);
        this.run();
    }

}
