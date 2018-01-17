import {Injectable,Output,EventEmitter} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {ConsoleService} from './console.service';
import {ConfigService} from './config.service';
//import {TranslateService} from './translate.service';

export class HeaderInterface{
    classname:string;
    h1:string;
    sub:string;
}
export class HeaderDefaultInterface extends HeaderInterface{
    constructor(classname:string){
        super();
        this.classname=classname;
    }
}
export class HeaderCustomInterface extends HeaderInterface{
    h1:string;
    sub:string;
    constructor(h1:string){
        super();
        this.h1=h1;
    }

}
export class Header{
    h1:string;
    sub:string;
    setDefault(classname:string){
        this.h1=classname+".title",
        this.sub=classname+".sub";
    }
    constructor(h:HeaderInterface){
        //console.log("+ Header",h);
        if(h.classname)
            this.setDefault(h.classname.toLowerCase());
        else
            this.set(h.h1,h.sub);
    }
    set(h1:string,sub:string){
        this.h1=h1;
        this.sub=sub;
    }
}

@Injectable()
export class HeaderService {
    @Output() headerChanged: EventEmitter<any> = new EventEmitter();

    h1:string;
    h1sub:string;
    title:string;

    titlesuffix:string;

    h:Header;
    
    suffix:string="- Hireton";
    constructor(private titleService:Title,
//        private translateService:TranslateService,
        private configService:ConfigService,
        private consoleService:ConsoleService) {

        this.consoleService.serv("+ HeaderService");
        
        //translateService.languageLoaded.subscribe(   value =>this.updateHeaderAfterTranslationLoad(value),   error => console.log("Error updating header"+error),   () => console.log('done') );
    }
    setPageTitle(value:string):void{
        console.log("setpagetitle");
      //  this.title=this.translateService.t(value);
     //   this.titlesuffix=this.translateService.t("titlesuffix");
        this.titleService.setTitle(this.title+this.titlesuffix);
        console.log("done")
    }
     updateHeaderAfterTranslationLoad(value:any){
         this.setPageTitle(this.title);
     }
    preciseTopHeader(h1:string,sub?:string){
        console.log(" > HeaderService preciseTopHeader",h1);
        this.h1=h1;
        let s=sub?sub:this.h1sub
        this.setPageTitle(h1);
        this.headerChanged.emit({h1:h1,h1sub:s});
    }
    replaceHeaderParts(opt:any){
        console.log(" > HeaderService replaceHeaderParts",opt, this.h1, this.h1.replace("#v1","kkk"));
        for(var key in opt)
            this.h1=this.h1.replace("#"+key,opt[key]);
        this.headerChanged.emit({h1:this.h1,h1sub:this.h1sub});
    }
    setHeader(h:Header):void{
        console.log(" > HeaderService setheaders",h);
        this.h=h;
        this.h1=h.h1;
        this.h1sub=h.sub;
        this.setPageTitle(this.h1);
        this.headerChanged.emit({h1:h.h1,h1sub:h.sub});
    }
    
    ngOnDestroy(){
        console.log("dest")
    }
}
