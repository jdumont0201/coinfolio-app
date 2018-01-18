import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';
@Component({
    selector: 'app-broker-icon',
    templateUrl: 'template.html',
    styleUrls:['styles.css']
})
@Injectable()
export class AppBrokerIconComponent {
@Input() broker;
    constructor() {

    }

}
