/*import {Component, Input}         from '@angular/core';
import {CUSTOM_PIPES} from '../../pipes/pipes'

import {NgClass} from '@angular/common';


@Component({
    selector: 'section-small',
    template: '<section class="grey det flatrows cleared"><h2 (click)="toggle()">{{title}}</h2><div class="det-in" [hidden]="!visible"><ng-content></ng-content></div></section>'
})
export class SectionSmall {
    @Input() title: string;
    visible:boolean=true;
    toggle(){
        this.visible=!this.visible;
    }
}








@Component({
    selector: 'section-configurable-small',
    
    template: `<section class="grey det flatrows cleared" [class.gridmode]="displayMode=='grid'"  [class.squaremode]="displayMode=='square'"  [class.rowmode]="displayMode=='row'">
                <h2 (click)="toggle()">{{title}}</h2>
                <div class="tweakmenu">
                    <div (click)="toggleMenu()" class="tweakbutton"></div>
                    <div class="sectionmenu" [hidden]="menuvisible">
                        <div (click)="setDisplay('row')">{{'buttons.viewasrow' | translate}}</div>
                        <div (click)="setDisplay('grid')">{{'buttons.viewasgrid' | translate}}</div>
                        <div (click)="setDisplay('square')">{{'buttons.viewassquare' | translate}}</div>
                        <div (click)="setMode('delete')">{{'buttons.batchdelete' | translate}}</div>
                        <div (click)="setMode('archive')">{{'buttons.batcharchive' | translate}}</div>
                    </div>
                </div><div class="det-in" [hidden]="!visible"><ng-content></ng-content></div></section>`
})


export class SectionConfigurableSmall {
    @Input() title: string;
    @Input() sellected:any[];
    @Input() selected:any[]=[];
    menuvisible:boolean=false;
    visible:boolean=true;
    @Input() displayMode:string="row";

    setMode(mode:string){

    }

    toggleMenu(){
        this.menuvisible=true;
    }

    setDisplay(mode:string):void{
        this.displayMode=mode;
    }
    toggle(){
        this.visible=!this.visible;

    }
}




@Component({
    selector: 'section-small-add',
    
    template: `<section class="grey det flatrows cleared" [class.gridmode]="displayMode=='grid'"  [class.squaremode]="displayMode=='square'"  [class.rowmode]="displayMode=='row'">
                <h2 (click)="toggle()">{{title}}</h2>
                <div class="tweakmenu">
                    <div (click)="toggleMenu()" class="tweakbutton"></div>
                    <div class="sectionmenu" [hidden]="menuvisible">
                        
                    </div>
                </div><div class="det-in" [hidden]="!visible"><ng-content></ng-content></div></section>`
})







@Component({
    selector: 'section-small-menued',
    
    
  
    template: `<section class="grey det flatrows cleared menued {{extraclass}}" >
                <h2 class="color-{{theme}}" (click)="toggle()">{{title}}</h2>
                <div class="" [hidden]="!visible"><ng-content></ng-content></div></section>`
})


export class SectionSmallMenued {
    @Input() title: string;
    @Input() selected:any[];
    @Input() theme:string="standard";
    @Input() extraclass:string="standard";
        
    menuvisible:boolean=false; 
    visible:boolean=true;
    @Input() displayMode:string="row";
    
    setMode(mode:string){
        
    }
    
    toggleMenu(){
        this.menuvisible=true;
    }
    
    setDisplay(mode:string):void{
        this.displayMode=mode;
    }
    toggle(){
        this.visible=!this.visible;
        
    }
}









@Component({
    selector: 'section-small-optioned',
    template: '<section class="grey det flatrows optioned cleared"><h2 (click)="toggle()">{{title}}</h2><div [hidden]="!visible"><ng-content></ng-content></div></section>'
})
export class SectionSmallOptioned {
    @Input() title: string;
    visible:boolean=true;
    toggle(){
        this.visible=!this.visible;
    }
}



@Component({
    selector: 'section-objective',
    template: '<section class="objective {{color}}"><h2 (click)="toggle()">{{title}}</h2><ng-content></ng-content></section>'
})
export class SectionObjective {
    @Input() title: string;
    @Input() color: string;
    visible:boolean=true;
    toggle(){
        this.visible=!this.visible;
    }
}
@Component({
    selector: 'section-objective-small',
    template: '<section class="objective objective-small {{color}}"><h2 (click)="toggle()">{{title}}</h2><ng-content></ng-content></section>'
})
export class SectionObjectiveSmall {
    @Input() title: string;
    @Input() color: string;
    visible:boolean=true;
    toggle(){
        this.visible=!this.visible;
    }
}



@Component({
    selector: 'section-block',
    template: '<section class="det light {{extraclass}}"><h2 (click)="toggle()">{{title}}</h2><div class="det-in" [hidden]="!visible"><ng-content></ng-content></div></section>'
})
export class SectionBlock {
    @Input() title: string;
    @Input() extraclass:string="";
     visible:boolean=true;
    toggle(){
        this.visible=!this.visible;
    }
    
}



@Component({
    selector: 'section-large',
    template: '<section class="det light trans flatrows"><h2 (click)="toggle()">{{title}}</h2><div class="det-in" [hidden]="!visible"><ng-content></ng-content></div></section>'
})
export class SectionLarge {
    @Input() title: string;
     visible:boolean=true;
    toggle(){
        this.visible=!this.visible;
    }
}



@Component({
    selector: 'section-flat',
    template: '<section class="det light flatrows"><h2 (click)="toggle()">{{title}}</h2><div class="det-in" [hidden]="!visible"><ng-content></ng-content></div></section>'
})
export class SectionFlat {
    @Input() title: string;
     visible:boolean=true;
    toggle(){
        this.visible=!this.visible;
    }
}


@Component({
    selector: 'section-scroll',
    template: '<section class="det grey flatrows scroll"><h2 class="color-{{theme}}" (click)="toggle()">{{title}}</h2><div class="det-in" [hidden]="!visible"><ng-content></ng-content></div></section>'
})
export class SectionScroll {
    @Input() title: string;
    @Input() theme:string="standard";
     visible:boolean=true;
    toggle(){
        this.visible=!this.visible;
    }
}
/*
export const SECTIONS_DIRECTIVES: any[] =[
  SectionBlock,
  SectionScroll,
  SectionFlat,
  SectionObjective,
  SectionSmall,
  SectionSmallMenued,
  SectionSmallOptioned,
  SectionLarge,
  SectionConfigurableSmall,
    SectionObjectiveSmall
  ];
  */