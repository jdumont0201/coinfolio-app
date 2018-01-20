import {OptionsBarItem,OptionsBarConfig} from "../../../core/services/optionsbar.service";
import {Inject} from '@angular/core';
import {PageService,PageConfig} from '../../../core/services/page.service';
import {ConfigService} from '../../../core/services/config.service';
import {HeaderCustomInterface, HeaderDefaultInterface} from '../../../core/services/header.service';


import {Component, Injectable, Injector} from '@angular/core';


import {LoginChangedInterface} from '../../../core/interfaces/interfaces'
import {ActivatedRoute, Router} from "@angular/router";

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

    updateLoginForm(loginValue:LoginChangedInterface) {
        //this.console.serv("ProtectedPage updateLoginForm",loginValue);
        if (!this.isAuthenticated) {
            this.isAuthenticated = loginValue.authentificated;
            this.dorun();
        }
    }

    constructor( pageService: PageService,route:ActivatedRoute,router:Router,isprotected:boolean ) {
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

    }
    ngOnDestroy() {
        //console.log("destroy PPage");
        //this.modelService.modelUpdated.unsubscribe();
    }


    dorun():void{
        //     this.pageService.consoleService.log("RUN",this.pageConfig);
        this.pageService.preparePage(this.pageConfig);
        this.run();
    }

}
