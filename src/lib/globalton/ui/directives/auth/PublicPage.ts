
import {Component, Injectable, Injector} from '@angular/core';

import {ProtectedPage} from "./ProtectedPage";
import {PageService} from "../../../core/services/page.service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable()
export abstract class PublicPage extends ProtectedPage {
    protected:boolean=false;
    constructor( pageService: PageService,route:ActivatedRoute,router:Router) {
        super(pageService,route,router,false)
    }

}
