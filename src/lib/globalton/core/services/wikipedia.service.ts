import {Injectable, Provider} from '@angular/core'


import {RequestService} from "./request.service"
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable()
export class WikipediaService {
    constructor(public requestService:RequestService) {

    }
    getSummary(title:string, f:Function):any{
        let ftitle=title;
        let url="https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles="+ftitle;
        let h:HttpHeaders=new HttpHeaders();

        h.append("Content-Type", "application/json; charset=UTF-8");
        h.append("Accept", "application/json; charset=UTF-8");
        this.requestService.getWithHeaders(url,h,function (res) {
            f(res);
        });
    }
}

