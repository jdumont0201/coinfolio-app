import {Inject, Injectable} from "@angular/core"
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConsoleService} from './console.service';
import {MessageService} from './message.service';
import {ProxyService} from "./proxy.service";

@Injectable()
export class RequestService {


    constructor(private http: HttpClient,
                private consoleService: ConsoleService,
                private proxyService: ProxyService,
                private messageService: MessageService) {
        consoleService.serv("+ RequestService");

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

    getWithHeaders(url: string, headers: HttpHeaders, f: Function): void {
        //console.log("RequestService get", url, headers);
        this.consoleService.get("RequestService Getting", url);
        let reqId: number = this.proxyService.addNewExternalRequest(url, "GET")
        this.http.get(url, {headers: headers})

            .subscribe(
                data => this.success(f, data, reqId),
                err => this.error(f, err, "Error downloading " + url, reqId, url),
                // err => this.error(err),
                () => {}//console.log('Done getting.', url)
            );
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
