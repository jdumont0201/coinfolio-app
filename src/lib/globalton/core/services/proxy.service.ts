import {Injectable, OnInit} from "@angular/core"
import {Output} from "@angular/core"
import {EventEmitter} from '@angular/core';
import {ConsoleService} from "./console.service";
import {AuthService} from "./auth.service";
import {AppConfigService} from "../../../localton/services/appconfig.service";
import {ConfigService} from "./config.service";
import {MessageService} from "./message.service";
import {MatSnackBar} from "@angular/material";

export class Request {

    starttime;
    endtime;
    time;
    status;

    constructor(public id: number, public type: string, public url: string, public tag: string) {
        this.starttime = new Date().getTime()
        this.status = "INIT"

    }
    complete(status:string){
        this.status=status;
        this.endtime=new Date().getTime();
        this.time=this.endtime-this.starttime
    }
}

@Injectable()
export class ProxyService {
    requests: Request[] = []

    addNewRequest(url, type) {
        let id = this.requests.push(new Request(this.getNewId(), type, url, null))
    }

    addNewExternalRequest(url, type) {
        let id = this.getNewId();
        this.requests.push(new Request(id, type, url, "external"))
        return id;
    }

    addNewInternalRequest(url, type): number {
        let id = this.getNewId();
        this.requests.push(new Request(id, type, url, "internal"))
        return id;
    }

    addNewDBRequest(url, type) {
        let id = this.getNewId();
        this.requests.push(new Request(id, type, url, "db"))
        return id;
    }

    getNewId() {
        return this.requests.length
    }

    completeRequestSuccessResult(id) {
        console.log(id,this.requests)
        if(id)
        this.getRequest(id).complete( "SUCCESS")
    }

    completeRequestErrorResult(id) {
        if(id)
        this.getRequest(id).complete( "ERROR_RESULT")
    }

    completeRequestError(id) {
        if(id)
        this.getRequest(id).complete( "ERRORED")

    }

    getRequest(id) {
        if(id)
            return this.requests[id]
    }

}