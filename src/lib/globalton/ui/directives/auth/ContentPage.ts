
import {Component, Injectable, Injector} from '@angular/core';

import {ProtectedPage} from "./ProtectedPage";
import {PageService} from "../../../core/services/page.service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable()
export abstract class ContentPage extends ProtectedPage {
    protected:boolean=false;
    constructor( pageService: PageService,route:ActivatedRoute,router:Router,isprotected?:boolean) {
        super(pageService,route,router,false)
    }
}
