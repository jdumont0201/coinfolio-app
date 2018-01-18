import {Injectable} from "@angular/core"
import {RequestService} from "../../globalton/core/services/request.service";
import {HttpHeaders} from "@angular/common/http"

import {RestangularModule, Restangular} from 'ngx-restangular';
import {ProxyService} from "../../globalton/core/services/proxy.service";

@Injectable()
export class DataService {
    constructor(public requestService: RequestService, public restangular: Restangular,public proxyService:ProxyService) {

    }

    database = "c"

    post(table: string, obj, f: Function) {
        console.log("[POST]", table, obj);
        const dt = this.restangular.all(table);
        const r = dt.post(obj).toPromise();

        r.then(function (res) {
            f(res)
        })
            .catch(function (error) {
                console.log("There was an error performing");
                f(null)
            });

    }

    perform(call: string, obj, f: Function) {
        call = "rpc/" + call;
        console.log("[PERFORM]", call, obj);
        const dt = this.restangular.all(call);
        const r = dt.post(obj).toPromise();
        let reqId:number=this.proxyService.addNewDBRequest(call,"POST")
        r.then( (res) =>{
            this.proxyService.completeRequestSuccessResult(reqId)
            f(res)
        },  () =>{
            this.proxyService.completeRequestErrorResult(reqId)
            console.log("There was an error performing");
            f(null)
        });
        ;
    }

    getQueryParam(where, order?: { key: string, dir: string }, limit?): any {
        if (this.database === "c") {
            let res = {};
            for (let k in where) {

                res[k] = "eq." + where[k]
            }
            if (order) res["order"] = order.key + "." + order.dir;
            if (limit) res["limit"] = limit
            return res;
        }
    }

    getAll(table: string, f: Function, where?: any, order?: { key: string, dir: string }, limit?) {
        console.log("[GET ALL]", table, where)
        let dt = this.restangular.all(table);
        let q = this.getQueryParam(where, order, limit);
        let reqId:number=this.proxyService.addNewDBRequest(table,"GET")
        dt.customGETLIST("", q).subscribe(obj => {
            this.proxyService.completeRequestSuccessResult(reqId)
            f(obj);
        });
    }

    getById(table: string, id, f: Function) {
        let dt = this.restangular.one(table, id);
        dt.get().subscribe(obj => {
            f(obj);
        });
    }
}
