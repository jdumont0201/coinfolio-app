import {Injectable} from "@angular/core"
import {RequestService} from "../../globalton/core/services/request.service";
import {HttpHeaders} from "@angular/common/http"

import {RestangularModule, Restangular} from 'ngx-restangular';
import {ProxyService} from "../../globalton/core/services/proxy.service";

@Injectable()
export class DataService {
    baseUrl='https://data.coinamics.io/';
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
    getQueryString(q):string{
        let a=""
        for(let k in q)
            a+=k+"="+q[k]+"&"
        return a.substr(0,a.length-1);
    }
    getAll(table: string, f: Function, where?: any, order?: { key: string, dir: string }, limit?) {
        console.log("[GET ALL]", table, where)
        let q = this.getQueryParam(where, order, limit);
        let queryString:string=this.getQueryString(q);
        let url=this.baseUrl+table+"?"+queryString

        this.requestService.get(url,(res)=>{
            console.log("getall",res)
            f(res.file)
        },this)

    }

    getById(table: string, id, f: Function) {
        let dt = this.restangular.one(table, id);
        dt.get().subscribe(obj => {
            f(obj);
        });
    }
}

