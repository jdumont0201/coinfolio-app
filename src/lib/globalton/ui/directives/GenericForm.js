"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
//CORE
var core_1 = require("@angular/core");
//SERVICES
var model_service_1 = require("../services/model.service");
var config_service_1 = require("../services/config-all.service");
var forms_1 = require("@angular/forms");
var SelectData = (function () {
    function SelectData() {
    }
    return SelectData;
}());
exports.SelectData = SelectData;
var GenericForm = (function () {
    function GenericForm(modelService, type, configService, fb) {
        this.modelService = modelService;
        this.configService = configService;
        this.model = {};
        this.errors = [];
        //form: any = null;
        this.submitted = false;
        this.requiredDesc = "";
        this.submitAttempt = false;
        this.selectContent = {};
        this.validationMessages = {};
        this.formErrors = {};
        console.log("[FORM] Constructor type=", type, "fb=", fb);
        this.modelService = modelService;
        this.configService = configService;
        this.validationMessages = this.configService.validationMessages;
        if (typeof type === "number") {
            console.log("[FORM] ModelType number=", type);
            this.modelType = type;
            if (!this.model || JSON.stringify(this.model) === "{}") {
                if (this.modelService.MODELS[type])
                    this.model = this.modelService.getInstance(this.modelType);
                else
                    console.error("[FORM] Model", type, "not existing. Not configured in common/models/Instancer ? models=", modelService.MODELS);
            }
            else {
                console.log("[FORM] instance already existing", this.model, this.model === {}, this.model == {}, JSON.stringify(this.model) === "{}");
            }
        }
        else {
            console.log("[FORM] ModelType other", type, typeof type);
            //this.model= this.modelService.getInstance();
        }
        if (fb)
            this.fb = fb;
    }
    GenericForm.prototype.setBuilder = function (fb) {
        this.fb = fb;
    };
    /* Loads queried model into form */
    GenericForm.prototype.ngOnChanges = function (changes) {
        console.log('[FORM]  ngOnChanges Update myform model=', changes['model']);
        if ('model' in changes && this.myform) {
            var newv = changes['model']["currentValue"];
            //  console.log("myform",this.myform);
            for (var k in this.myform.controls) {
                //    console.log("upd ",k);
                //if(k in this.myform.controls)
                if (this.myform.controls[k] instanceof forms_1.FormGroup) {
                    console.log("update group", k, newv[k]);
                    for (var j in this.myform.controls[k].controls) {
                        if (j in newv[k] && newv[k][j])
                            this.myform.controls[k].controls[j].patchValue(true);
                        else
                            this.myform.controls[k].controls[j].patchValue(false);
                    }
                }
                else {
                    console.log("value");
                    this.myform.controls[k].patchValue(newv[k]);
                }
            }
        }
    };
    GenericForm.prototype.loadSelectsContent = function (list) {
        //console.log("loadselectscontent");
        for (var i = 0, n = list.length; i < n; ++i) {
            this.loadSelectContent(list[i]);
        }
    };
    GenericForm.prototype.loadSelectContent = function (id) {
        this.selectContent[id] = this.configService.getSelectOptions(id).getSet();
    };
    GenericForm.prototype.buildForm = function () {
        var _this = this;
        console.log("[FORM]  buildForm", this.fields);
        if (!this.myform) {
            var group = {};
            for (var i in this.fields) {
                if (Object.prototype.toString.call(this.fields[i]) === '[object Array]') {
                    console.log("form", i, "array");
                    group[i] = this.fb.control('', forms_1.Validators.compose(this.fields[i]));
                }
                else {
                    console.log("form", i, "group");
                    var groupin = {};
                    for (var k in this.fields[i])
                        groupin[k] = this.fb.control(false, forms_1.Validators.compose(this.fields[i][k]));
                    group[i] = this.fb.group(groupin);
                }
            }
            console.log("[FORM] fgroup", group);
            this.myform = this.fb.group(group);
            console.log("[FORM] fgroup myf", this.myform);
            this.myform.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        }
        else {
            console.log("[FORM]  buildForm already existing");
        }
    };
    GenericForm.prototype.onValueChanged = function (data) {
        console.log("[FORM] onValueChanged", data);
        this.submitAttempt = false;
        if (!this.model) {
            return;
        }
        var form = this.myform;
        for (var field in this.formErrors) {
            this.formErrors[field] = '';
            var control = form.controls[field];
            if (field === "passwordconf") {
                var control2 = form.controls["password"];
                if (control && control2 && control.value !== control2.value) {
                    var m = "form." + field + ".matchpassword";
                    this.addErrorMsg(field, m);
                }
            }
            //control.dirty &&
            if (control && !control.valid) {
                for (var key in control.errors) {
                    var m = "form." + field + "." + key;
                    this.addErrorMsg(field, m);
                }
            }
        }
        console.log(" > [FORM]  onValueChanged", data, this.formErrors);
    };
    GenericForm.prototype.addErrorMsg = function (field, m) {
        console.log("[FORM] addErrorMsg", field, m);
        if (!this.formErrors[field])
            this.formErrors[field] = m;
        else {
            var v = this.formErrors[field];
            this.formErrors[field] = [v];
            this.formErrors[field].push(m);
        }
    };
    GenericForm.prototype.loadCheckboxGroup = function (fieldName, selectName) {
        var _this = this;
        this.fields[fieldName] = {};
        this.loadSelectsContent([selectName]);
        this.selectContent[selectName].forEach(function (c) {
            _this.fields[fieldName][c.getKey()] = [];
        });
    };
    GenericForm.prototype.ngOnInit = function () {
        console.log("[FORM]  init");
        if (this.fb) {
            this.buildForm();
        }
        else {
            console.log("[FORM]  Init but no fb");
        }
        if (this.selectContentIds)
            this.loadSelectsContent(this.selectContentIds);
        for (var k in this.fields)
            this.formErrors[k] = '';
        console.log(this.formErrors);
        this.afterInit();
    };
    GenericForm.prototype.afterInit = function () {
    };
    GenericForm.prototype.ngOnDestroy = function () {
    };
    GenericForm.prototype.setForm = function (f) {
        this.myform = f;
    };
    GenericForm.prototype.updateModel = function (value) {
        this.model = value.model;
    };
    GenericForm.prototype.prepareSubmit = function () {
        this.errors = [];
        this.submitted = true;
    };
    GenericForm.prototype.setModel = function (m) {
        this.model = m;
        ///console.log("lf setmodel", this.model);
    };
    GenericForm.prototype.fillModelFromForm = function () {
        console.log("[FORM]  fillModelFromForm");
        for (var k in this.myform.value)
            if (this.myform.controls[k] instanceof forms_1.FormGroup) {
                console.log("[FORM]  group", this.myform.controls[k]);
                var a = {};
                for (var j in this.myform.controls[k].controls)
                    a[j] = this.myform.controls[k].controls[j].value;
                this.model[k] = a;
            }
            else {
                this.model[k] = this.myform.value[k];
            }
    };
    GenericForm.prototype.onFormSubmit = function () {
        this.onSubmit();
    };
    GenericForm.prototype.fillFormFromModel = function () {
        console.log("[FORM]  fillFormFromModel");
        for (var k in this.fields) {
            //console.log("patching",k,this.model);
            if (k in this.myform.controls)
                this.myform.controls[k].patchValue(this.model[k]);
        }
        //        console.log("value",this.myform);
    };
    GenericForm.prototype.preSubmit = function () {
    };
    GenericForm.prototype.onSubmit = function () {
        this.preSubmit();
        this.submitAttempt = true;
        console.log("[FORM]  onSubmit", this.myform, "valid=", "model=", this.model, this.submitAttempt);
        if (this.myform) {
            this.prepareSubmit();
            this.fillFormFromModel();
            this.onValueChanged({ custom: true });
            this.submitAttempt = true;
            if (this.myform && this.myform.valid) {
                //       this.transformSubObjects()
                console.log("[FORM]  form valid");
                this.doSubmit();
            }
            else {
                console.log("[FORM]  invalid", this.myform, this.submitAttempt);
                //                if (this.content) this.content.scrollToTop();
            }
        }
        else {
            console.log("[FORM]  form non existing. Don't you have a ngOnInit function instead of an afterInit function ?", this.myform, this.submitAttempt);
        }
    };
    return GenericForm;
}());
GenericForm = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [model_service_1.ModelService, Object, config_service_1.ConfigService, Object])
], GenericForm);
exports.GenericForm = GenericForm;
//# sourceMappingURL=GenericForm.js.map
