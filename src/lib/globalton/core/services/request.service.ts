import {Inject, Injectable} from "@angular/core"
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConsoleService} from './console.service';
import {MessageService} from './message.service';

@Injectable()
export class RequestService {


    constructor(
        private http: HttpClient,
        private consoleService: ConsoleService,
        private messageService: MessageService) {
        consoleService.serv("+ RequestService");

    }
    error(f,err:any,desc?:string):void {
        console.error('REQUEST ERR', err);
        this.messageService.addError("REQUEST_GET", err,desc);
        f({error:true});
    }
    success(f,data){
        f({error:false,file:data});
    }
    getWithHeaders(url: string, headers: HttpHeaders, f:Function):void {
        console.log("RequestService get",url, headers);
        this.consoleService.get("RequestService Getting", url);
        this.http.get(url, { headers: headers })

            .subscribe(
            data => this.success(f,data),
            err => this.error(f,err,"Error downloading "+url),
            // err => this.error(err),
            () => console.log('Done getting.',url)
            );
    }
    post(url:string,obj,headers:HttpHeaders,f:Function){
      this.http.post(url, obj,{ headers: headers })
        .subscribe(
          data => this.success(f,data),
          err => this.error(f,err,"Error downloading "+url),
          // err => this.error(err),
          () => console.log('Done post.',url)
        );
    }
    get(url: string, f:Function,context:any):void {
        this.getWithHeaders(url, new HttpHeaders(), f.bind(context));
    }
    getJSON(url: string, f:Function,context:any):void {
        let h=new HttpHeaders();
        h.append("Content-Type", "application/json; charset=UTF-8");
        this.getWithHeaders(url, h, f.bind(context));
    }
}
