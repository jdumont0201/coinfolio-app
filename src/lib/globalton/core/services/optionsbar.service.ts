import {Injectable,Output,EventEmitter} from "@angular/core";


export class OptionsBarItem{

    constructor(public text : string,public icon:string,public link:string,public popup?:number){
        this.icon="icon-"+icon;
    }
}
export class OptionsBarConfig{

    constructor(public options:OptionsBarItem[]){

    }
}

@Injectable()
export class OptionsBarService {
    @Output() optionsChanged: EventEmitter<any> = new EventEmitter();

    options:OptionsBarConfig;

    constructor() {

    }
    setByPagename(pagename:string):void{

    }
    setOptions(o:OptionsBarConfig):void{
        console.log(" > HeaderService setheaders");
        this.options=o;
        this.optionsChanged.emit(o);
    }
    ngOnDestroy(){
        console.log("dest")
    }
}