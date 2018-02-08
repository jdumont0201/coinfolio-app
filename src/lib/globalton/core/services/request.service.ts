import {Inject, Injectable} from "@angular/core"
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConsoleService} from './console.service';
import {MessageService} from './message.service';
import {ProxyService} from "./proxy.service";

@Injectable()
export class RequestService {
    W;
    serviceWorkerEnabled = false;

    constructor(private http: HttpClient,
                private consoleService: ConsoleService,
                private proxyService: ProxyService,
                private messageService: MessageService) {
        consoleService.serv("+ RequestService");

        if ('serviceWorker' in navigator) {
            this.serviceWorkerEnabled = true;
           // console.log("sw try init")
            this.W = new Worker("assets/js/requestservice.js")
           // console.log("sw try init", this.W)

            this.W.onmessage = (e) => {
             //   console.log('sw Message received from worker', e);
                let reqId = e.data.reqId;
                if (e.data.success) {
               //     console.log('  sw result ', e.data.result);
                    let f = this.pool[reqId];
                    this.success(f, e.data.result, e.data.reqId)
                } else {
                    console.log("  sw failed")
                }
            };



        }
        ;

    }

    error(f, err: any, desc: string, reqId: number, url: string): void {
        console.error('REQUEST ERR', err);
        this.proxyService.completeRequestErrorResult(reqId)
        this.messageService.addError("REQUEST_GET", err, desc, url);
        f({error: true});
    }

    success(f, data, reqId) {
        this.proxyService.completeRequestSuccessResult(reqId)
        f({error: false, file: data});
    }

    pool: { [reqId: number]: Function } = {}

    getWithHeaders(url: string, headers: HttpHeaders, f: Function): void {
        //console.log("RequestService get", url, headers);
        this.consoleService.get("RequestService Getting", url);
        //navigator.serviceWorker.controller.postMessage("Client 1 says '"+url+"'");

        let reqId: number = this.proxyService.addNewExternalRequest(url, "GET")
        this.pool[reqId] = f;
        if (this.serviceWorkerEnabled)
            this.W.postMessage({url: url, headers: headers, reqId: reqId});
        else {
            this.http.get(url, {headers: headers})
                .subscribe(
                    data => this.success(f, data, reqId),
                    err => this.error(f, err, "Error downloading " + url, reqId, url),
                    // err => this.error(err),
                    () => {
                    }//console.log('Done getting.', url)
                );
        }
    }
    post(url: string, obj, headers: HttpHeaders, f: Function) {
        let reqId: number = this.proxyService.addNewExternalRequest(url, "POST")
        this.http.post(url, obj, {headers: headers})
            .subscribe(
                data => this.success(f, data, reqId),
                err => this.error(f, err, "Error downloading " + url, reqId, url),
                // err => this.error(err),
                () => console.log('Done post.', url)
            );
    }

    get(url: string, f: Function, context: any): void {
        this.getWithHeaders(url, new HttpHeaders(), f.bind(context));
    }

    getJSON(url: string, f: Function, context: any): void {
        let h = new HttpHeaders();
        h.append("Content-Type", "application/json; charset=UTF-8");
        this.getWithHeaders(url, h, f.bind(context));
    }
}
