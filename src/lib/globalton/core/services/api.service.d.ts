import { Http } from '@angular/http';
import { EventEmitter } from "@angular/core";
import { MessageService } from './message.service';
import { ConsoleService } from './console.service';

import { ToastController } from 'ionic-angular';
import { ConfigService } from './config.service';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/retry';
import {Model} from "../models/Model";
import { Raw } from "../interfaces/interfaces";
export declare class ApiService {
    http: Http;
    private authService;
    messageService: MessageService;
    private router;
    private consoleService;
    private configService;
    errorsChanged: EventEmitter<any>;
    baseurl: string;
    timer: number;
    timeout: number;
    retry: number;
    isUp: boolean;
    constructor(http: Http, authService: AuthService, messageService: MessageService,
                 toastCtrl: ToastController, consoleService: ConsoleService, configService: ConfigService);
    processError(errorCode: string, err: any): void;
    processData(data: any, f: Function): void;
    pingResult(isUp: boolean, f: Function): void;
    ping(f: Function): void;
    authget(url: string, f: Function): void;
    noauthget(url: string, f: Function): void;
    authput(url: string, model: Model, f: any): void;
    authpatch(url: string, model: Model, referenceRaw: Raw, f: Function): void;
    authpost(url: string, model: Model, f: Function): void;
    authrawpost(url: string, raw: any, f: Function): void;
    noauthpost(url: string, model: Model, f: Function): void;
    authdelete(url: string, f: Function): void;
    private post(url, raw, headers, f);
    private delete(url, headers, f);
    private put(url, model, headers, f);
    private patch(url, model, referenceRaw, headers, f);
    private get(url, headers, f);
}
