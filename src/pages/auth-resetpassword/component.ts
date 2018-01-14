import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";
import {EventService} from "../../lib/localton/services/event.service";
import {Logic} from "../../logic/Logic";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {MatSnackBar} from "@angular/material";
import {FormGroup} from "@angular/forms";
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: 'app-auth-resetpassword',
    templateUrl: 'template.html'
})
@Injectable()
export class AppAuthResetpassword implements OnInit{

token;
    constructor(public requestService: RequestService, public dataService:DataService,private route: ActivatedRoute,public logic:Logic) {
        this.route.params.subscribe(  (params)=>{
            this.token=params["token"];
        } );
    }
    ngOnInit(){

    }
    afterReset(){

    }
}
