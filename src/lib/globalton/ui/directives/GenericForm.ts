/*//CORE
import { Component,Injectable, ViewChild } from '@angular/core';

//SERVICES
import {ModelService}    from '../../core/services/model.service';
import {ConfigService}    from '../../core/services/config.service';
import {ConsoleService}    from '../../core/services/console.service';

import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms'

import {Model} from "../../core/models/Model";
import {SelectOption} from "../directives/elements/Forms";

export interface FormInterface {//obsolete
    fields: {[key: string]: any[]};
    selectContentIds: string[];
}

export class SelectData {
    data: [{ key: string, value: string }]
}
@Injectable()
export abstract class GenericForm {
//    @ViewChild(Content) content: Content;
    fields: any;
    selectContentIds: string[];
    model: any = {};

    errors: string[] = [];
    //form: any = null;
    submitted = false;

    myform: any;

    requiredDesc:string="";

    submitAttempt=false;
    fb: FormBuilder;
    selectContent: { [key: string]: SelectOption[] } = {}
    modelType: number;

    validationMessages = {}
    formErrors = {};

    constructor(public modelService: ModelService,
                type,
                public configService: ConfigService,
                fb?: any) {
        console.log("[FORM] Constructor type=",type, "fb=",fb)
        this.modelService = modelService;
        this.configService = configService;
        this.validationMessages = this.configService.validationMessages;

        if(typeof type==="number"){
            console.log("[FORM] ModelType number=", type);
            this.modelType = type;
            if (!this.model || JSON.stringify(this.model) === "{}") {
                if (this.modelService.MODELS[type])
                    this.model=this.modelService.getInstance(this.modelType);
                else
                    console.error("[FORM] Model", type, "not existing. Not configured in common/models/Instancer ? models=", modelService.MODELS);

            } else {
                console.log("[FORM] instance already existing", this.model, this.model === {}, this.model == {}, JSON.stringify(this.model) === "{}");
            }
        }else{

            console.log("[FORM] ModelType other", type, typeof type);
            //this.model= this.modelService.getInstance();
        }
        if (fb) this.fb = fb;

    }


    setBuilder(fb: FormBuilder) {
        this.fb = fb
    }

    // Loads queried model into form
    ngOnChanges(changes: {[propName: string]: any}) {
        console.log('[FORM]  ngOnChanges Update myform model=' , changes['model']);
        if('model' in changes && this.myform){
            let newv=changes['model']["currentValue"];
            //  console.log("myform",this.myform);
            for(let k in this.myform.controls){
                //    console.log("upd ",k);
                //if(k in this.myform.controls)
                if(this.myform.controls[k] instanceof FormGroup) {
                    console.log("update group",k, newv[k]);
                    for (let j in this.myform.controls[k].controls){
                        if(j in newv[k] && newv[k][j])
                            this.myform.controls[k].controls[j].patchValue(true);
                        else
                            this.myform.controls[k].controls[j].patchValue(false);
                    }
                }else{
                    console.log("value");
                    this.myform.controls[k].patchValue(newv[k]);
                }
            }
        }
    }

    loadSelectsContent(list: string[]) {
        //console.log("loadselectscontent");
        for (var i = 0, n = list.length; i < n; ++i) {
            this.loadSelectContent(list[i]);
        }
    }

    loadSelectContent(id: string): void {
      //TOFIX
        //this.selectContent[id] = this.configService.getSelectOptions(id).getSet();
    }

    buildForm(): void {
        console.log("[FORM]  buildForm", this.fields);
        if(!this.myform){
            let group = {}
            for (var i in this.fields) {
                if( Object.prototype.toString.call(  this.fields[i] ) === '[object Array]' ){
                    console.log("form",i,"array");
                    group[i] = this.fb.control('', Validators.compose(this.fields[i]));
                }
                else{//checkboxes
                    console.log("form",i,"group");
                    let groupin={};
                    for(var k in this.fields[i])
                        groupin[k]=this.fb.control(false,Validators.compose(this.fields[i][k]))
                    group[i]=this.fb.group(groupin);
                }

            }
            console.log("[FORM] fgroup",group);
            this.myform = this.fb.group(group);
            console.log("[FORM] fgroup myf",this.myform);
            this.myform.valueChanges.subscribe(data => this.onValueChanged(data));
        }else{
            console.log("[FORM]  buildForm already existing");
        }

    }


    onValueChanged(data) {
        console.log("[FORM] onValueChanged", data);
        this.submitAttempt=false;
        if (!this.model) {
            return;
        }
        const form = this.myform;
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.controls[field];
            if (field === "passwordconf") {
                const control2 = form.controls["password"];
                if (control && control2 && control.value !== control2.value) {
                    let m="form."+field+".matchpassword";
                    this.addErrorMsg(field,m) ;
                }
            }
            //control.dirty &&
            if (control &&  !control.valid) {
                for (const key in control.errors) {
                    let m="form."+field+"."+key;
                    this.addErrorMsg(field,m);
                }
            }
        }
        console.log(" > [FORM]  onValueChanged", data, this.formErrors);
    }
    addErrorMsg(field,m){
        console.log("[FORM] addErrorMsg",field,m);
        if(!this.formErrors[field])
            this.formErrors[field]=m;
        else{
            let v=this.formErrors[field];
            this.formErrors[field]=[v];
            this.formErrors[field].push(m);
        }
    }
    loadCheckboxGroup(fieldName,selectName){
        this.fields[fieldName]={};
        this.loadSelectsContent([selectName]);
        this.selectContent[selectName].forEach((c)=>{

            this.fields[fieldName][c.getKey()]=[];
        })
    }
    ngOnInit() {
        console.log("[FORM]  init");
        if (this.fb) {
            this.buildForm();
        }else{
            console.log("[FORM]  Init but no fb");
        }
        if (this.selectContentIds)
            this.loadSelectsContent(this.selectContentIds);
        for(let k in this.fields)
            this.formErrors[k]='';
        console.log(this.formErrors);
        this.afterInit();
    }
    afterInit(){

    }
    ngOnDestroy() {

    }
    setForm(f: any): void {
        this.myform = f;
    }
    updateModel(value: any): void {
        this.model = value.model;
    }

    prepareSubmit() {
        this.errors = [];
        this.submitted = true;
    }

    setModel(m: Model): void {
        this.model = m;
        ///console.log("lf setmodel", this.model);
    }

    abstract doSubmit(): void;

    fillModelFromForm(){
        console.log("[FORM]  fillModelFromForm");
        for(let k in this.myform.value)
            if(this.myform.controls[k] instanceof FormGroup) {
                console.log("[FORM]  group",this.myform.controls[k]);
                var a={};
                for (let j in this.myform.controls[k].controls)
                    a[j]=this.myform.controls[k].controls[j].value;
                this.model[k]=a;
            }else{
                this.model[k] = this.myform.value[k];}
    }
    onFormSubmit(){
        this.onSubmit();
    }
    fillFormFromModel(){
        console.log("[FORM]  fillFormFromModel");
        for(var k in this.fields) {
            //console.log("patching",k,this.model);
            if(k in this.myform.controls)
                this.myform.controls[k].patchValue(this.model[k]);
        }
//        console.log("value",this.myform);
    }
    preSubmit(){

    }
    onSubmit() {
        this.preSubmit();
        this.submitAttempt=true;
        console.log("[FORM]  onSubmit",this.myform,"valid=","model=",this.model, this.submitAttempt);
        if(this.myform) {
            this.prepareSubmit();
            this.fillFormFromModel();
            this.onValueChanged({custom: true});
            this.submitAttempt=true;
            if (this.myform && this.myform.valid) {
                //       this.transformSubObjects()
                console.log("[FORM]  form valid");
                this.doSubmit();
            } else {
                console.log("[FORM]  invalid", this.myform, this.submitAttempt);

//                if (this.content) this.content.scrollToTop();
            }
        }else{
            console.log("[FORM]  form non existing. Don't you have a ngOnInit function instead of an afterInit function ?", this.myform, this.submitAttempt);

    }
    }
}
*/