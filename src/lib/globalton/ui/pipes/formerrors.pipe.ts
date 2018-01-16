import {Inject, Input, Injectable, Injector, Pipe} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';
@Injectable()
@Pipe({
    name: 'formerrors',

    pure: true
})
export class FormErrorsPipe {

    translateService: TranslateService;

    constructor(@Inject(TranslateService) translateService: TranslateService) {
        this.translateService = translateService;
    }

    transform(resul: any, args: string[]): any {
        console.log("formerrorsd", resul);
        if (!resul)
            return "";
        let res: string = "";
        //return this.translateService.get(value).subscribe((resul) => {
            console.log("resul=", resul);
            if (typeof resul === "string")
                return resul;
            else {
                for (let i in resul) {
                    //console.log("add", resul[i]);
                    res += resul[i] + ". ";
                }
                res = res.substring(0, res.length - 2);
                console.log("res=", res);
                return res;
            }

        //});

    }

}
