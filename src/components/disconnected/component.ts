import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {ApiService} from "../../lib/globalton/core/services/api.service";
@Component({
    selector: 'app-disconnected',
    templateUrl: 'template.html',
    styleUrls: ['styles.css']
})
@Injectable()
export class AppDisconnectedComponent {
    pingInterval;
    retryIn=3;
    constructor(public apiService: ApiService, public appConfigService: AppConfigService) {
        if (!this.pingInterval)
            this.pingInterval = window.setInterval(() => {
                if(this.retryIn===0) this.retryIn=4;
                this.retryIn=this.retryIn-1;
            },1000);
    }

}
