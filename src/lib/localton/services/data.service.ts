import {Injectable} from "@angular/core"
import {RequestService} from "../../globalton/core/services/request.service";
import {HttpHeaders} from "@angular/common/http"

import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class DataService {
  constructor(public requestService:RequestService,public restangular:Restangular){

  }
  database="c"

  post(table:string,obj,f:Function){
    console.log("[POST]",table,obj);
    const dt = this.restangular.all(table);
    const r=dt.post(obj).toPromise();

    r  .then(function(res ) {
      f(res)
    })
      .catch(function(error) {
        console.log("There was an error performing");
        f(null)
      });
    /*.subscribe(res => {


      f(res)
    },err=> {
      console.log("There was an error performing");
      f(null)
    });;;*/
  }
  perform(call:string,obj,f:Function){
    call="rpc/"+call;
    console.log("[PERFORM]",call,obj);
    const dt = this.restangular.all(call);
    const r=dt.post(obj).toPromise()     ;

    r.then(function(res) {
      f(res)
          }, function() {
      console.log("There was an error performing");
      f(null)
    });;
  }
  getQueryParam(where,order?:{key:string,dir:string}):any{
    if(this.database==="c"){
      let res={};
      for(let k in where){

        res[k]="eq."+where[k]
      }
      if(order) res["order"]=order.key+"."+order.dir;
      return res;
    }
  }
  getAll(table:string,f:Function,where?:any,order?:{key:string,dir:string}){
    console.log("[GET ALL]",table,where)
    let dt = this.restangular.all(table);
    let q=this.getQueryParam(where,order);

    dt.customGETLIST("",q).subscribe(accounts => {
      f( accounts);
    });
  }
  getById(table:string,id,f:Function){
    let dt = this.restangular.one(table,id);
    dt.get().subscribe(obj => {
      f( obj);
    });
  }
}
