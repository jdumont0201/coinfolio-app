/*import {Host, OnInit,Component, Input} from '@angular/core';
// import {Transla teService} from 'hireton-common-angular2/services/translate.service';
import {FormBuilder, FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms'


@Component({
    selector: 'label-mandatory',
    template: '<label><ng-content></ng-content><span class="ob">&nbsp;*</span></label>'


})
export class MandatoryLabel {
    @Input() value: string;

    constructor() {
        console.log("MandatoryLabel");

    }
}




@Component({
    selector: 'form-fieldset',
    template: '<fieldset class="fieldset-compact"><h2>{{title}}</h2><div class="det-in"><span class="info" *ngIf="info">{{info}}</span><div class="form-group"><ng-content></ng-content></div></div></fieldset>'
})
export class FormFieldset {
    @Input() title: string;
    @Input() info: string;

    constructor() {
        // console.log("constr");
    }
}



@Component({
    selector: 'formgroup-title',
    template: '<span class="subformtitle">{{title}}</span>'
})
export class FormGroupTitle {
    @Input() title: string;
    constructor() {
        // console.log("constr");
    }
}


@Component({
    selector: 'field',
    template: '<div><label *ngIf="name">{{ name  }}<span *ngIf="required" class="ob">&nbsp;*</span></label><ng-content></ng-content></div>',

    // providers:[TranslateMService]
})
export class FormField {
    @Input() name: string;
    @Input() required: string;

    constructor() {
        // console.log("+ FormField")
    }
}




@Component({
    selector: 'ion-required',
    template: `<div class="required-field" *ngIf="this.getValue().length>0">
        <span *ngFor="let c of getValue()" >{{c | translate }} </span></div>`

})
export class IonRequired {
    @Input() formErrors: any;
    @Input() field: string;
    value;
    getValue():string[]{
        let v:string[];
        let isString;
        if(this.formErrors) {
            v = this.formErrors[this.field];
             isString=typeof this.formErrors[this.field] === "string";
            if (isString)
                if(v.length>0)
                v = [this.formErrors[this.field]];
                else
                    v=[];
        }else
            v=[];
        return v;
    }
    constructor(){
    }
    isDisplayed() { return false;
    }
}



@Component({
    selector: 'form-error-required',
    template: `<span *ngIf="isDisplayed()" class="form-alert"><ng-content></ng-content></span>`
})
export class RequiredFormError implements OnInit {
    @Input('control') controlName: string;
    @Input() error: string;
    control: AbstractControl;
    constructor(){// @Host() private formModel: any) {
        // console.log("required field")
    }
    ngOnInit() { }//this.control = this.formModel.form.find(this.controlName); }
    isDisplayed() { return false;//return this.control.dirty && this.control.hasError(this.error); }
}
}

export class SelectOption {
    constructor(public key: any, public value: string, public selected?: boolean) {

    }
    getKey() {
        return this.key;
    }
    getValue() {
        return this.value;
    }
}
export class SelectOptionSet {
    set: SelectOption[] = [];
    getSortedArray(o: any) {

        var array = [];
        for (var i in o) {
            array.push([i, o[i]])
        }

        array = array.sort(function(a, b) { return a[1].localeCompare(b[1]) });


        return array;
    }
    constructor(o: any, sortbyvalue?: boolean,nobuild?:boolean) {
        if(!nobuild)
            if (sortbyvalue) {
                this.readArray(this.getSortedArray(o));
            } else if (Object.prototype.toString.call(o) === '[object Array]') {
                this.readArray2(o);
            }else{
                this.read(o);
            }
    }
    getSet(): SelectOption[] {
        return this.set;
    }
    readArray(a: any[]) {
        for (var i = 0, n = a.length; i < n; ++i) {
            this.add(new SelectOption(a[i][0], a[i][1]));
        }
    }
    read(o: any): void {
        for (var i in o) {
            this.add(new SelectOption(i, o[i]));
        }
    }
    readArray2(o: any,field?:string): void {
        for (var i in o) {
            if(typeof o[i]==="string")
                this.add(new SelectOption(o[i], o[i]));
            else
            if(field)
                this.add(new SelectOption(o[i]._id, o[i][field]));
            else
                this.add(new SelectOption(o[i]._id, o[i].name));
        }
    }
    add(s: SelectOption): void {
        this.set.push(s);
    }
}




import {Inject,Injectable} from "@angular/core"
import {ApiService} from "../../../core/services/api.service"
import {RequestService} from "../../../core/services/request.service"
import {ConfigService} from "../../../core/services/config.service"
@Component({
    selector: 'input-autocomplete',
    template: `  
  <div class="suggestionInputAll suggestionSingle">  
    <input type="text" *ngIf="!isSelected" id="{{id}}" #inpu [(ngModel)]="value" (keyup)="onKey($event)"/>
    <div class="suggestionInputBox" [hidden]="!showingSuggestions">
        <div *ngFor="let s of suggestions"  id="{{s._id}}" (click)="select(s)">
            {{s.name}}
        </div>
    </div>
    <div class="alreadySuggested" *ngIf="isSelected">
        <div *ngIf="chosenvalue" (click)="remove()">
            {{chosenvalue?.name}}
        </div>
        
    </div>
  </div>`
})
@Injectable()
export class AutocompleteInput {
    value: string;
    suggestions=[];
    isSelected:boolean=false;
    @Input() type:string;
    @Input() apiUrl:string;
    @Input() currentValue;
    id:string;
    @Input() form;
    @Input() name:string;
    @Input() chosenvalue:string;
    showingSuggestions = false;
    constructor(@Inject(RequestService) public requestService:RequestService) {
        // console.log("constr");
        this.id="suggest-"+Math.round(Math.random()*100000);

    }
    ngOnChanges(){
        console.log("ONCHANGE",this.currentValue);
        if(this.currentValue){
            this.chosenvalue=this.currentValue;
            this.isSelected=true;
        }
    }
    remove(){
        this.chosenvalue=null;
        this.isSelected=false;
        //let cell = document.getElementById(this.id);
        //cell.focus();
        //this.form.controls[this.name].updateValue(null);
    }
    select(s){
        this.chosenvalue=s;
        this.hideSuggestions();
        this.value="";
        this.isSelected=true;
        console.log(this.form.controls,this.name);
        this.form.controls[this.name].updateValue(s._id);
    }
    onKey(event:any) {
        console.log("Key");
        this.suggestions=[];
        if (this.value.length > 2) {
            this.updateAutoCompletion();
            this.showSuggestions();
        }

    }
    showSuggestions() {
        this.showingSuggestions = true;
    }

    hideSuggestions() {
        this.showingSuggestions = false;
    }
    updateAutoCompletion() {
        if(!this.apiUrl)
            console.error("Autocomplete empty apiurl");
        else
            console.log("autocompletion", this.value);
        let url = this.apiUrl+"suggest/" + this.type+"/"+this.value;
        this.requestService.getJSON(url, (res)=> {
            console.log("res",res);
            for(var i in  res.file.suggestions) {
                if(res.file.suggestions[i].firstname)
                    res.file.suggestions[i].name=res.file.suggestions[i].firstname + " "+res.file.suggestions[i].lastname;
                this.suggestions.push(res.file.suggestions[i]);
            }
        },this);
    }
}

import {PopulableItem} from "../../../core/interfaces/interfaces"

@Component({
    selector: 'input-tags',
    template: `  
  <div class="suggestionInputAll ">  
    <input type="text"  #inpu [(ngModel)]="value" (keyup)="onKey($event)"/>
    <div class="suggestionInputBox" [hidden]="!showingSuggestions">
        <div *ngFor="let s of suggestions"  (click)="select(s)">
        
            {{s?.getObject()?.name}} {{s?.name}}
        </div>
    </div>
    <div class="alreadySuggested" >
        Selected:
        <div *ngFor="let y of chosenvalues"  (click)="remove(y)">
            {{y.getObject()?.name}}
            
        </div>
        
    </div>
  </div>`
})
@Injectable()
export class InputTags { //TODO
    value: string;
    suggestions=[];
    isSelected:boolean=false;
    @Input() type:string;
    @Input() model;
    @Input() apiUrl:string;
    @Input() currentValue;
    id:string;
    @Input() form;
    @Input() name:string;
    @Input() chosenvalues:PopulableItem<any>[];
    showingSuggestions = false;
    constructor(@Inject(RequestService) public requestService:RequestService) {
        // console.log("constr");
        this.id="suggest-"+Math.round(Math.random()*100000);

    }
    ngOnChanges(){
        console.log("ONCHANGE",this.currentValue);
        if(this.currentValue){
            if(!this.chosenvalues) this.chosenvalues=[];
            this.chosenvalues.push(new PopulableItem<any>(this.currentValue));
            this.isSelected=true;
        }
    }
    remove(obj:PopulableItem<any>){
        var id=(<any>obj)._id?(<any>obj)._id:obj.getObjectId();
        for(var i=0,n=this.chosenvalues.length;i<n;++i)
            if(this.chosenvalues[i].getObjectId()===id)
                this.chosenvalues.splice(i,1);
        this.isSelected=false;

    }
    getIdx(id) {
        if(!this.chosenvalues) return -1;
        let found = false;
        for (var i = 0, n = this.chosenvalues.length; i < n; ++i){
            if (this.chosenvalues[i].getObjectId() === id){
                found = true;
                return i;
            }
        }
        if(!found) return -1;

    }
    isInSelectedList(id):boolean{
        return this.getIdx(id)>-1;
    }
    select(s:PopulableItem<any>){
        if(!this.isInSelectedList(s.getObjectId())){
        if(!this.chosenvalues) this.chosenvalues=[];
        this.chosenvalues.push(s);
        }
        this.hideSuggestions();

        this.value="";

        //this.isSelected=true;
        console.log("select",this.form.controls,this.name);
        this.form.controls[this.name].updateValue(this.chosenvalues);
        this.model[this.name]=this.chosenvalues;
    }
    onKey(event:any) {
        console.log("Key");
        this.suggestions=[];
        if (this.value.length > 2) {
            this.updateAutoCompletion();
            this.showSuggestions();
        }

    }
    showSuggestions() {
        this.showingSuggestions = true;
    }

    hideSuggestions() {
        this.showingSuggestions = false;
    }
    updateAutoCompletion() {
        if(!this.apiUrl)
            console.error("Autocomplete empty apiurl");
        else
            console.log("autocompletion", this.value);
        let url = this.apiUrl+"suggest/" + this.type+"/"+this.value;
        this.requestService.getJSON(url, (res)=> {
            console.log("res",res);
            for(var i in  res.file.suggestions) {
                if(res.file.suggestions[i].firstname)
                    res.file.suggestions[i].name=res.file.suggestions[i].firstname + " "+res.file.suggestions[i].lastname;
                this.suggestions.push(new PopulableItem<any>(res.file.suggestions[i]));
            }
        },this);
    }
}


/*
export const FORM_ELEMENTS: any[] = [
    MandatoryLabel,
    FormFieldset,
    FormField,
    RequiredFormError,
    FormGroupTitle, AutocompleteInput,InputTags
];
  */
