"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MandatoryLabel = (function () {
    function MandatoryLabel() {
        console.log("MandatoryLabel");
    }
    return MandatoryLabel;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MandatoryLabel.prototype, "value", void 0);
MandatoryLabel = __decorate([
    core_1.Component({
        selector: 'label-mandatory',
        template: '<label><ng-content></ng-content><span class="ob">&nbsp;*</span></label>'
    }),
    __metadata("design:paramtypes", [])
], MandatoryLabel);
exports.MandatoryLabel = MandatoryLabel;
var FormFieldset = (function () {
    function FormFieldset() {
        // console.log("constr");
    }
    return FormFieldset;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FormFieldset.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FormFieldset.prototype, "info", void 0);
FormFieldset = __decorate([
    core_1.Component({
        selector: 'form-fieldset',
        template: '<fieldset class="fieldset-compact"><h2>{{title}}</h2><div class="det-in"><span class="info" *ngIf="info">{{info}}</span><div class="form-group"><ng-content></ng-content></div></div></fieldset>'
    }),
    __metadata("design:paramtypes", [])
], FormFieldset);
exports.FormFieldset = FormFieldset;
var FormGroupTitle = (function () {
    function FormGroupTitle() {
        // console.log("constr");
    }
    return FormGroupTitle;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FormGroupTitle.prototype, "title", void 0);
FormGroupTitle = __decorate([
    core_1.Component({
        selector: 'formgroup-title',
        template: '<span class="subformtitle">{{title}}</span>'
    }),
    __metadata("design:paramtypes", [])
], FormGroupTitle);
exports.FormGroupTitle = FormGroupTitle;
var FormField = (function () {
    function FormField() {
        // console.log("+ FormField")
    }
    return FormField;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FormField.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FormField.prototype, "required", void 0);
FormField = __decorate([
    core_1.Component({
        selector: 'field',
        template: '<div><label *ngIf="name">{{ name  }}<span *ngIf="required" class="ob">&nbsp;*</span></label><ng-content></ng-content></div>',
    }),
    __metadata("design:paramtypes", [])
], FormField);
exports.FormField = FormField;
var IonRequired = (function () {
    function IonRequired() {
    }
    IonRequired.prototype.getValue = function () {
        var v;
        var isString;
        if (this.formErrors) {
            v = this.formErrors[this.field];
            isString = typeof this.formErrors[this.field] === "string";
            if (isString)
                if (v.length > 0)
                    v = [this.formErrors[this.field]];
                else
                    v = [];
        }
        else
            v = [];
        return v;
    };
    IonRequired.prototype.isDisplayed = function () {
        return false;
    };
    return IonRequired;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], IonRequired.prototype, "formErrors", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], IonRequired.prototype, "field", void 0);
IonRequired = __decorate([
    core_1.Component({
        selector: 'ion-required',
        template: "<div class=\"required-field\" *ngIf=\"this.getValue().length>0\">\n        <span *ngFor=\"let c of getValue()\" >{{c | translate }} </span></div>"
    }),
    __metadata("design:paramtypes", [])
], IonRequired);
exports.IonRequired = IonRequired;
var RequiredFormError = (function () {
    function RequiredFormError() {
        // console.log("required field")
    }
    RequiredFormError.prototype.ngOnInit = function () { }; //this.control = this.formModel.form.find(this.controlName); }
    RequiredFormError.prototype.isDisplayed = function () {
        return false; //return this.control.dirty && this.control.hasError(this.error); }
    };
    return RequiredFormError;
}());
__decorate([
    core_1.Input('control'),
    __metadata("design:type", String)
], RequiredFormError.prototype, "controlName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RequiredFormError.prototype, "error", void 0);
RequiredFormError = __decorate([
    core_1.Component({
        selector: 'form-error-required',
        template: "<span *ngIf=\"isDisplayed()\" class=\"form-alert\"><ng-content></ng-content></span>"
    }),
    __metadata("design:paramtypes", [])
], RequiredFormError);
exports.RequiredFormError = RequiredFormError;
var SelectOption = (function () {
    function SelectOption(key, value, selected) {
        this.key = key;
        this.value = value;
        this.selected = selected;
    }
    SelectOption.prototype.getKey = function () {
        return this.key;
    };
    SelectOption.prototype.getValue = function () {
        return this.value;
    };
    return SelectOption;
}());
exports.SelectOption = SelectOption;
var SelectOptionSet = (function () {
    function SelectOptionSet(o, sortbyvalue, nobuild) {
        this.set = [];
        if (!nobuild)
            if (sortbyvalue) {
                this.readArray(this.getSortedArray(o));
            }
            else if (Object.prototype.toString.call(o) === '[object Array]') {
                this.readArray2(o);
            }
            else {
                this.read(o);
            }
    }
    SelectOptionSet.prototype.getSortedArray = function (o) {
        var array = [];
        for (var i in o) {
            array.push([i, o[i]]);
        }
        array = array.sort(function (a, b) { return a[1].localeCompare(b[1]); });
        return array;
    };
    SelectOptionSet.prototype.getSet = function () {
        return this.set;
    };
    SelectOptionSet.prototype.readArray = function (a) {
        for (var i = 0, n = a.length; i < n; ++i) {
            this.add(new SelectOption(a[i][0], a[i][1]));
        }
    };
    SelectOptionSet.prototype.read = function (o) {
        for (var i in o) {
            this.add(new SelectOption(i, o[i]));
        }
    };
    SelectOptionSet.prototype.readArray2 = function (o, field) {
        for (var i in o) {
            if (typeof o[i] === "string")
                this.add(new SelectOption(o[i], o[i]));
            else if (field)
                this.add(new SelectOption(o[i]._id, o[i][field]));
            else
                this.add(new SelectOption(o[i]._id, o[i].name));
        }
    };
    SelectOptionSet.prototype.add = function (s) {
        this.set.push(s);
    };
    return SelectOptionSet;
}());
exports.SelectOptionSet = SelectOptionSet;
var core_2 = require("@angular/core");
var request_service_1 = require("../../services/request.service");
var AutocompleteInput = (function () {
    function AutocompleteInput(requestService) {
        this.requestService = requestService;
        this.suggestions = [];
        this.isSelected = false;
        this.showingSuggestions = false;
        // console.log("constr");
        this.id = "suggest-" + Math.round(Math.random() * 100000);
    }
    AutocompleteInput.prototype.ngOnChanges = function () {
        console.log("ONCHANGE", this.currentValue);
        if (this.currentValue) {
            this.chosenvalue = this.currentValue;
            this.isSelected = true;
        }
    };
    AutocompleteInput.prototype.remove = function () {
        this.chosenvalue = null;
        this.isSelected = false;
        //let cell = document.getElementById(this.id);
        //cell.focus();
        //this.form.controls[this.name].updateValue(null);
    };
    AutocompleteInput.prototype.select = function (s) {
        this.chosenvalue = s;
        this.hideSuggestions();
        this.value = "";
        this.isSelected = true;
        console.log(this.form.controls, this.name);
        this.form.controls[this.name].updateValue(s._id);
    };
    AutocompleteInput.prototype.onKey = function (event) {
        console.log("Key");
        this.suggestions = [];
        if (this.value.length > 2) {
            this.updateAutoCompletion();
            this.showSuggestions();
        }
    };
    AutocompleteInput.prototype.showSuggestions = function () {
        this.showingSuggestions = true;
    };
    AutocompleteInput.prototype.hideSuggestions = function () {
        this.showingSuggestions = false;
    };
    AutocompleteInput.prototype.updateAutoCompletion = function () {
        var _this = this;
        if (!this.apiUrl)
            console.error("Autocomplete empty apiurl");
        else
            console.log("autocompletion", this.value);
        var url = this.apiUrl + "suggest/" + this.type + "/" + this.value;
        this.requestService.getJSON(url, function (res) {
            console.log("res", res);
            for (var i in res.file.suggestions) {
                if (res.file.suggestions[i].firstname)
                    res.file.suggestions[i].name = res.file.suggestions[i].firstname + " " + res.file.suggestions[i].lastname;
                _this.suggestions.push(res.file.suggestions[i]);
            }
        }, this);
    };
    return AutocompleteInput;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AutocompleteInput.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AutocompleteInput.prototype, "apiUrl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AutocompleteInput.prototype, "currentValue", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AutocompleteInput.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AutocompleteInput.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AutocompleteInput.prototype, "chosenvalue", void 0);
AutocompleteInput = __decorate([
    core_1.Component({
        selector: 'input-autocomplete',
        template: "  \n  <div class=\"suggestionInputAll suggestionSingle\">  \n    <input type=\"text\" *ngIf=\"!isSelected\" id=\"{{id}}\" #inpu [(ngModel)]=\"value\" (keyup)=\"onKey($event)\"/>\n    <div class=\"suggestionInputBox\" [hidden]=\"!showingSuggestions\">\n        <div *ngFor=\"let s of suggestions\"  id=\"{{s._id}}\" (click)=\"select(s)\">\n            {{s.name}}\n        </div>\n    </div>\n    <div class=\"alreadySuggested\" *ngIf=\"isSelected\">\n        <div *ngIf=\"chosenvalue\" (click)=\"remove()\">\n            {{chosenvalue?.name}}\n        </div>\n        \n    </div>\n  </div>"
    }),
    core_2.Injectable(),
    __param(0, core_2.Inject(request_service_1.RequestService)),
    __metadata("design:paramtypes", [request_service_1.RequestService])
], AutocompleteInput);
exports.AutocompleteInput = AutocompleteInput;
var interfaces_1 = require("../../interfaces/interfaces");
var InputTags = (function () {
    function InputTags(requestService) {
        this.requestService = requestService;
        this.suggestions = [];
        this.isSelected = false;
        this.showingSuggestions = false;
        // console.log("constr");
        this.id = "suggest-" + Math.round(Math.random() * 100000);
    }
    InputTags.prototype.ngOnChanges = function () {
        console.log("ONCHANGE", this.currentValue);
        if (this.currentValue) {
            if (!this.chosenvalues)
                this.chosenvalues = [];
            this.chosenvalues.push(new interfaces_1.PopulableItem(this.currentValue));
            this.isSelected = true;
        }
    };
    InputTags.prototype.remove = function (obj) {
        var id = obj._id ? obj._id : obj.getObjectId();
        for (var i = 0, n = this.chosenvalues.length; i < n; ++i)
            if (this.chosenvalues[i].getObjectId() === id)
                this.chosenvalues.splice(i, 1);
        this.isSelected = false;
    };
    InputTags.prototype.getIdx = function (id) {
        if (!this.chosenvalues)
            return -1;
        var found = false;
        for (var i = 0, n = this.chosenvalues.length; i < n; ++i) {
            if (this.chosenvalues[i].getObjectId() === id) {
                found = true;
                return i;
            }
        }
        if (!found)
            return -1;
    };
    InputTags.prototype.isInSelectedList = function (id) {
        return this.getIdx(id) > -1;
    };
    InputTags.prototype.select = function (s) {
        if (!this.isInSelectedList(s.getObjectId())) {
            if (!this.chosenvalues)
                this.chosenvalues = [];
            this.chosenvalues.push(s);
        }
        this.hideSuggestions();
        this.value = "";
        //this.isSelected=true;
        console.log("select", this.form.controls, this.name);
        this.form.controls[this.name].updateValue(this.chosenvalues);
        this.model[this.name] = this.chosenvalues;
    };
    InputTags.prototype.onKey = function (event) {
        console.log("Key");
        this.suggestions = [];
        if (this.value.length > 2) {
            this.updateAutoCompletion();
            this.showSuggestions();
        }
    };
    InputTags.prototype.showSuggestions = function () {
        this.showingSuggestions = true;
    };
    InputTags.prototype.hideSuggestions = function () {
        this.showingSuggestions = false;
    };
    InputTags.prototype.updateAutoCompletion = function () {
        var _this = this;
        if (!this.apiUrl)
            console.error("Autocomplete empty apiurl");
        else
            console.log("autocompletion", this.value);
        var url = this.apiUrl + "suggest/" + this.type + "/" + this.value;
        this.requestService.getJSON(url, function (res) {
            console.log("res", res);
            for (var i in res.file.suggestions) {
                if (res.file.suggestions[i].firstname)
                    res.file.suggestions[i].name = res.file.suggestions[i].firstname + " " + res.file.suggestions[i].lastname;
                _this.suggestions.push(new interfaces_1.PopulableItem(res.file.suggestions[i]));
            }
        }, this);
    };
    return InputTags;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputTags.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], InputTags.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputTags.prototype, "apiUrl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], InputTags.prototype, "currentValue", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], InputTags.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputTags.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], InputTags.prototype, "chosenvalues", void 0);
InputTags = __decorate([
    core_1.Component({
        selector: 'input-tags',
        template: "  \n  <div class=\"suggestionInputAll \">  \n    <input type=\"text\"  #inpu [(ngModel)]=\"value\" (keyup)=\"onKey($event)\"/>\n    <div class=\"suggestionInputBox\" [hidden]=\"!showingSuggestions\">\n        <div *ngFor=\"let s of suggestions\"  (click)=\"select(s)\">\n        \n            {{s?.getObject()?.name}} {{s?.name}}\n        </div>\n    </div>\n    <div class=\"alreadySuggested\" >\n        Selected:\n        <div *ngFor=\"let y of chosenvalues\"  (click)=\"remove(y)\">\n            {{y.getObject()?.name}}\n            \n        </div>\n        \n    </div>\n  </div>"
    }),
    core_2.Injectable(),
    __param(0, core_2.Inject(request_service_1.RequestService)),
    __metadata("design:paramtypes", [request_service_1.RequestService])
], InputTags);
exports.InputTags = InputTags;
/*
export const FORM_ELEMENTS: any[] = [
    MandatoryLabel,
    FormFieldset,
    FormField,
    RequiredFormError,
    FormGroupTitle, AutocompleteInput,InputTags
];
  */ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGb3Jtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE0RDtBQVc1RCxJQUFhLGNBQWM7SUFHdkI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFbEMsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFOWTtJQUFSLFlBQUssRUFBRTs7NkNBQWU7QUFEZCxjQUFjO0lBTjFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFFBQVEsRUFBRSx5RUFBeUU7S0FHdEYsQ0FBQzs7R0FDVyxjQUFjLENBTzFCO0FBUFksd0NBQWM7QUFnQjNCLElBQWEsWUFBWTtJQUlyQjtRQUNJLHlCQUF5QjtJQUM3QixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQU5ZO0lBQVIsWUFBSyxFQUFFOzsyQ0FBZTtBQUNkO0lBQVIsWUFBSyxFQUFFOzswQ0FBYztBQUZiLFlBQVk7SUFKeEIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFFBQVEsRUFBRSxrTUFBa007S0FDL00sQ0FBQzs7R0FDVyxZQUFZLENBT3hCO0FBUFksb0NBQVk7QUFlekIsSUFBYSxjQUFjO0lBRXZCO1FBQ0kseUJBQXlCO0lBQzdCLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBSlk7SUFBUixZQUFLLEVBQUU7OzZDQUFlO0FBRGQsY0FBYztJQUoxQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixRQUFRLEVBQUUsNkNBQTZDO0tBQzFELENBQUM7O0dBQ1csY0FBYyxDQUsxQjtBQUxZLHdDQUFjO0FBYzNCLElBQWEsU0FBUztJQUlsQjtRQUNJLDZCQUE2QjtJQUNqQyxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQU5ZO0lBQVIsWUFBSyxFQUFF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QUFDO0FBQUQsQ0FBQyxBQTlGRCxJQThGQztBQTFGWTtJQUFSLFlBQUssRUFBRTs7dUNBQWE7QUFDWjtJQUFSLFlBQUssRUFBRTs7d0NBQU87QUFDTjtJQUFSLFlBQUssRUFBRTs7eUNBQWU7QUFDZDtJQUFSLFlBQUssRUFBRTs7K0NBQWM7QUFFYjtJQUFSLFlBQUssRUFBRTs7dUNBQU07QUFDTDtJQUFSLFlBQUssRUFBRTs7dUNBQWE7QUFDWjtJQUFSLFlBQUssRUFBRTs7K0NBQW1DO0FBWGxDLFNBQVM7SUF0QnJCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsWUFBWTtRQUN0QixRQUFRLEVBQUUsMmtCQWlCTDtLQUNSLENBQUM7SUFDRCxpQkFBVSxFQUFFO0lBY0ksV0FBQSxhQUFNLENBQUMsZ0NBQWMsQ0FBQyxDQUFBO3FDQUF1QixnQ0FBYztHQWIvRCxTQUFTLENBOEZyQjtBQTlGWSw4QkFBUztBQWlHdEI7Ozs7Ozs7O0lBUUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0hvc3QsIE9uSW5pdCxDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLy8gaW1wb3J0IHtUcmFuc2xhIHRlU2VydmljZX0gZnJvbSAnaGlyZXRvbi1jb21tb24tYW5ndWxhcjIvc2VydmljZXMvdHJhbnNsYXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQge0Zvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3JtcydcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbGFiZWwtbWFuZGF0b3J5JyxcclxuICAgIHRlbXBsYXRlOiAnPGxhYmVsPjxuZy1jb250ZW50PjwvbmctY29udGVudD48c3BhbiBjbGFzcz1cIm9iXCI+Jm5ic3A7Kjwvc3Bhbj48L2xhYmVsPidcclxuXHJcblxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFuZGF0b3J5TGFiZWwge1xyXG4gICAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1hbmRhdG9yeUxhYmVsXCIpO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2Zvcm0tZmllbGRzZXQnLFxyXG4gICAgdGVtcGxhdGU6ICc8ZmllbGRzZXQgY2xhc3M9XCJmaWVsZHNldC1jb21wYWN0XCI+PGgyPnt7dGl0bGV9fTwvaDI+PGRpdiBjbGFzcz1cImRldC1pblwiPjxzcGFuIGNsYXNzPVwiaW5mb1wiICpuZ0lmPVwiaW5mb1wiPnt7aW5mb319PC9zcGFuPjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PjwvZGl2PjwvZmllbGRzZXQ+J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUZpZWxkc2V0IHtcclxuICAgIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBpbmZvOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJjb25zdHJcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2Zvcm1ncm91cC10aXRsZScsXHJcbiAgICB0ZW1wbGF0ZTogJzxzcGFuIGNsYXNzPVwic3ViZm9ybXRpdGxlXCI+e3t0aXRsZX19PC9zcGFuPidcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1Hcm91cFRpdGxlIHtcclxuICAgIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNvbnN0clwiKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdmaWVsZCcsXHJcbiAgICB0ZW1wbGF0ZTogJzxkaXY+PGxhYmVsICpuZ0lmPVwibmFtZVwiPnt7IG5hbWUgIH19PHNwYW4gKm5nSWY9XCJyZXF1aXJlZFwiIGNsYXNzPVwib2JcIj4mbmJzcDsqPC9zcGFuPjwvbGFiZWw+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PicsXHJcblxyXG4gICAgLy8gcHJvdmlkZXJzOltUcmFuc2xhdGVNU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1GaWVsZCB7XHJcbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSByZXF1aXJlZDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKyBGb3JtRmllbGRcIilcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2lvbi1yZXF1aXJlZCcsXHJcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJyZXF1aXJlZC1maWVsZFwiICpuZ0lmPVwidGhpcy5nZXRWYWx1ZSgpLmxlbmd0aD4wXCI+XHJcbiAgICAgICAgPHNwYW4gKm5nRm9yPVwibGV0IGMgb2YgZ2V0VmFsdWUoKVwiID57e2MgfCB0cmFuc2xhdGUgfX0gPC9zcGFuPjwvZGl2PmBcclxuXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJb25SZXF1aXJlZCB7XHJcbiAgICBASW5wdXQoKSBmb3JtRXJyb3JzOiBhbnk7XHJcbiAgICBASW5wdXQoKSBmaWVsZDogc3RyaW5nO1xyXG4gICAgdmFsdWU7XHJcbiAgICBnZXRWYWx1ZSgpOnN0cmluZ1tde1xyXG4gICAgICAgIGxldCB2OnN0cmluZ1tdO1xyXG4gICAgICAgIGxldCBpc1N0cmluZztcclxuICAgICAgICBpZih0aGlzLmZvcm1FcnJvcnMpIHtcclxuICAgICAgICAgICAgdiA9IHRoaXMuZm9ybUVycm9yc1t0aGlzLmZpZWxkXTtcclxuICAgICAgICAgICAgIGlzU3RyaW5nPXR5cGVvZiB0aGlzLmZvcm1FcnJvcnNbdGhpcy5maWVsZF0gPT09IFwic3RyaW5nXCI7XHJcbiAgICAgICAgICAgIGlmIChpc1N0cmluZylcclxuICAgICAgICAgICAgICAgIGlmKHYubGVuZ3RoPjApXHJcbiAgICAgICAgICAgICAgICB2ID0gW3RoaXMuZm9ybUVycm9yc1t0aGlzLmZpZWxkXV07XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdj1bXTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB2PVtdO1xyXG4gICAgICAgIHJldHVybiB2O1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgIH1cclxuICAgIGlzRGlzcGxheWVkKCkgeyByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2Zvcm0tZXJyb3ItcmVxdWlyZWQnLFxyXG4gICAgdGVtcGxhdGU6IGA8c3BhbiAqbmdJZj1cImlzRGlzcGxheWVkKClcIiBjbGFzcz1cImZvcm0tYWxlcnRcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9zcGFuPmBcclxufSlcclxuZXhwb3J0IGNsYXNzIFJlcXVpcmVkRm9ybUVycm9yIGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgnY29udHJvbCcpIGNvbnRyb2xOYW1lOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBlcnJvcjogc3RyaW5nO1xyXG4gICAgY29udHJvbDogQWJzdHJhY3RDb250cm9sO1xyXG4gICAgY29uc3RydWN0b3IoKXsvLyBASG9zdCgpIHByaXZhdGUgZm9ybU1vZGVsOiBhbnkpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlcXVpcmVkIGZpZWxkXCIpXHJcbiAgICB9XHJcbiAgICBuZ09uSW5pdCgpIHsgfS8vdGhpcy5jb250cm9sID0gdGhpcy5mb3JtTW9kZWwuZm9ybS5maW5kKHRoaXMuY29udHJvbE5hbWUpOyB9XHJcbiAgICBpc0Rpc3BsYXllZCgpIHsgcmV0dXJuIGZhbHNlOy8vcmV0dXJuIHRoaXMuY29udHJvbC5kaXJ0eSAmJiB0aGlzLmNvbnRyb2wuaGFzRXJyb3IodGhpcy5lcnJvcik7IH1cclxufVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2VsZWN0T3B0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBrZXk6IGFueSwgcHVibGljIHZhbHVlOiBzdHJpbmcsIHB1YmxpYyBzZWxlY3RlZD86IGJvb2xlYW4pIHtcclxuXHJcbiAgICB9XHJcbiAgICBnZXRLZXkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5O1xyXG4gICAgfVxyXG4gICAgZ2V0VmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFNlbGVjdE9wdGlvblNldCB7XHJcbiAgICBzZXQ6IFNlbGVjdE9wdGlvbltdID0gW107XHJcbiAgICBnZXRTb3J0ZWRBcnJheShvOiBhbnkpIHtcclxuXHJcbiAgICAgICAgdmFyIGFycmF5ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSBpbiBvKSB7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goW2ksIG9baV1dKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXJyYXkgPSBhcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGFbMV0ubG9jYWxlQ29tcGFyZShiWzFdKSB9KTtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKG86IGFueSwgc29ydGJ5dmFsdWU/OiBib29sZWFuLG5vYnVpbGQ/OmJvb2xlYW4pIHtcclxuICAgICAgICBpZighbm9idWlsZClcclxuICAgICAgICAgICAgaWYgKHNvcnRieXZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWRBcnJheSh0aGlzLmdldFNvcnRlZEFycmF5KG8pKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVhZEFycmF5MihvKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWQobyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFNldCgpOiBTZWxlY3RPcHRpb25bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0O1xyXG4gICAgfVxyXG4gICAgcmVhZEFycmF5KGE6IGFueVtdKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBhLmxlbmd0aDsgaSA8IG47ICsraSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZChuZXcgU2VsZWN0T3B0aW9uKGFbaV1bMF0sIGFbaV1bMV0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZWFkKG86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGZvciAodmFyIGkgaW4gbykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZChuZXcgU2VsZWN0T3B0aW9uKGksIG9baV0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZWFkQXJyYXkyKG86IGFueSxmaWVsZD86c3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgZm9yICh2YXIgaSBpbiBvKSB7XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBvW2ldPT09XCJzdHJpbmdcIilcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkKG5ldyBTZWxlY3RPcHRpb24ob1tpXSwgb1tpXSkpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGlmKGZpZWxkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGQobmV3IFNlbGVjdE9wdGlvbihvW2ldLl9pZCwgb1tpXVtmaWVsZF0pKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGQobmV3IFNlbGVjdE9wdGlvbihvW2ldLl9pZCwgb1tpXS5uYW1lKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWRkKHM6IFNlbGVjdE9wdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0LnB1c2gocyk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmltcG9ydCB7SW5qZWN0LEluamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCJcclxuaW1wb3J0IHtBcGlTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXBpLnNlcnZpY2VcIlxyXG5pbXBvcnQge1JlcXVlc3RTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcmVxdWVzdC5zZXJ2aWNlXCJcclxuaW1wb3J0IHtDb25maWdTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29uZmlnLnNlcnZpY2VcIlxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnaW5wdXQtYXV0b2NvbXBsZXRlJyxcclxuICAgIHRlbXBsYXRlOiBgICBcclxuICA8ZGl2IGNsYXNzPVwic3VnZ2VzdGlvbklucHV0QWxsIHN1Z2dlc3Rpb25TaW5nbGVcIj4gIFxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgKm5nSWY9XCIhaXNTZWxlY3RlZFwiIGlkPVwie3tpZH19XCIgI2lucHUgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiIChrZXl1cCk9XCJvbktleSgkZXZlbnQpXCIvPlxyXG4gICAgPGRpdiBjbGFzcz1cInN1Z2dlc3Rpb25JbnB1dEJveFwiIFtoaWRkZW5dPVwiIXNob3dpbmdTdWdnZXN0aW9uc1wiPlxyXG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHMgb2Ygc3VnZ2VzdGlvbnNcIiAgaWQ9XCJ7e3MuX2lkfX1cIiAoY2xpY2spPVwic2VsZWN0KHMpXCI+XHJcbiAgICAgICAgICAgIHt7cy5uYW1lfX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImFscmVhZHlTdWdnZXN0ZWRcIiAqbmdJZj1cImlzU2VsZWN0ZWRcIj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiY2hvc2VudmFsdWVcIiAoY2xpY2spPVwicmVtb3ZlKClcIj5cclxuICAgICAgICAgICAge3tjaG9zZW52YWx1ZT8ubmFtZX19XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgXHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5gXHJcbn0pXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEF1dG9jb21wbGV0ZUlucHV0IHtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICBzdWdnZXN0aW9ucz1bXTtcclxuICAgIGlzU2VsZWN0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIEBJbnB1dCgpIHR5cGU6c3RyaW5nO1xyXG4gICAgQElucHV0KCkgYXBpVXJsOnN0cmluZztcclxuICAgIEBJbnB1dCgpIGN1cnJlbnRWYWx1ZTtcclxuICAgIGlkOnN0cmluZztcclxuICAgIEBJbnB1dCgpIGZvcm07XHJcbiAgICBASW5wdXQoKSBuYW1lOnN0cmluZztcclxuICAgIEBJbnB1dCgpIGNob3NlbnZhbHVlOnN0cmluZztcclxuICAgIHNob3dpbmdTdWdnZXN0aW9ucyA9IGZhbHNlO1xyXG4gICAgY29uc3RydWN0b3IoQEluamVjdChSZXF1ZXN0U2VydmljZSkgcHVibGljIHJlcXVlc3RTZXJ2aWNlOlJlcXVlc3RTZXJ2aWNlKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJjb25zdHJcIik7XHJcbiAgICAgICAgdGhpcy5pZD1cInN1Z2dlc3QtXCIrTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjEwMDAwMCk7XHJcblxyXG4gICAgfVxyXG4gICAgbmdPbkNoYW5nZXMoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk9OQ0hBTkdFXCIsdGhpcy5jdXJyZW50VmFsdWUpO1xyXG4gICAgICAgIGlmKHRoaXMuY3VycmVudFZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy5jaG9zZW52YWx1ZT10aGlzLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdGVkPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlKCl7XHJcbiAgICAgICAgdGhpcy5jaG9zZW52YWx1ZT1udWxsO1xyXG4gICAgICAgIHRoaXMuaXNTZWxlY3RlZD1mYWxzZTtcclxuICAgICAgICAvL2xldCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCk7XHJcbiAgICAgICAgLy9jZWxsLmZvY3VzKCk7XHJcbiAgICAgICAgLy90aGlzLmZvcm0uY29udHJvbHNbdGhpcy5uYW1lXS51cGRhdGVWYWx1ZShudWxsKTtcclxuICAgIH1cclxuICAgIHNlbGVjdChzKXtcclxuICAgICAgICB0aGlzLmNob3NlbnZhbHVlPXM7XHJcbiAgICAgICAgdGhpcy5oaWRlU3VnZ2VzdGlvbnMoKTtcclxuICAgICAgICB0aGlzLnZhbHVlPVwiXCI7XHJcbiAgICAgICAgdGhpcy5pc1NlbGVjdGVkPXRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5mb3JtLmNvbnRyb2xzLHRoaXMubmFtZSk7XHJcbiAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMubmFtZV0udXBkYXRlVmFsdWUocy5faWQpO1xyXG4gICAgfVxyXG4gICAgb25LZXkoZXZlbnQ6YW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJLZXlcIik7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9ucz1bXTtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZS5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQXV0b0NvbXBsZXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93U3VnZ2VzdGlvbnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgc2hvd1N1Z2dlc3Rpb25zKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd2luZ1N1Z2dlc3Rpb25zID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlU3VnZ2VzdGlvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93aW5nU3VnZ2VzdGlvbnMgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHVwZGF0ZUF1dG9Db21wbGV0aW9uKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmFwaVVybClcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkF1dG9jb21wbGV0ZSBlbXB0eSBhcGl1cmxcIik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImF1dG9jb21wbGV0aW9uXCIsIHRoaXMudmFsdWUpO1xyXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmFwaVVybCtcInN1Z2dlc3QvXCIgKyB0aGlzLnR5cGUrXCIvXCIrdGhpcy52YWx1ZTtcclxuICAgICAgICB0aGlzLnJlcXVlc3RTZXJ2aWNlLmdldEpTT04odXJsLCAocmVzKT0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNcIixyZXMpO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgaW4gIHJlcy5maWxlLnN1Z2dlc3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBpZihyZXMuZmlsZS5zdWdnZXN0aW9uc1tpXS5maXJzdG5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLmZpbGUuc3VnZ2VzdGlvbnNbaV0ubmFtZT1yZXMuZmlsZS5zdWdnZXN0aW9uc1tpXS5maXJzdG5hbWUgKyBcIiBcIityZXMuZmlsZS5zdWdnZXN0aW9uc1tpXS5sYXN0bmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnMucHVzaChyZXMuZmlsZS5zdWdnZXN0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LHRoaXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5pbXBvcnQge1BvcHVsYWJsZUl0ZW19IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2ludGVyZmFjZXNcIlxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2lucHV0LXRhZ3MnLFxyXG4gICAgdGVtcGxhdGU6IGAgIFxyXG4gIDxkaXYgY2xhc3M9XCJzdWdnZXN0aW9uSW5wdXRBbGwgXCI+ICBcclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiICAjaW5wdSBbKG5nTW9kZWwpXT1cInZhbHVlXCIgKGtleXVwKT1cIm9uS2V5KCRldmVudClcIi8+XHJcbiAgICA8ZGl2IGNsYXNzPVwic3VnZ2VzdGlvbklucHV0Qm94XCIgW2hpZGRlbl09XCIhc2hvd2luZ1N1Z2dlc3Rpb25zXCI+XHJcbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgcyBvZiBzdWdnZXN0aW9uc1wiICAoY2xpY2spPVwic2VsZWN0KHMpXCI+XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHt7cz8uZ2V0T2JqZWN0KCk/Lm5hbWV9fSB7e3M/Lm5hbWV9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiYWxyZWFkeVN1Z2dlc3RlZFwiID5cclxuICAgICAgICBTZWxlY3RlZDpcclxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCB5IG9mIGNob3NlbnZhbHVlc1wiICAoY2xpY2spPVwicmVtb3ZlKHkpXCI+XHJcbiAgICAgICAgICAgIHt7eS5nZXRPYmplY3QoKT8ubmFtZX19XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIFxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+YFxyXG59KVxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJbnB1dFRhZ3MgeyAvL1RPRE9cclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICBzdWdnZXN0aW9ucz1bXTtcclxuICAgIGlzU2VsZWN0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIEBJbnB1dCgpIHR5cGU6c3RyaW5nO1xyXG4gICAgQElucHV0KCkgbW9kZWw7XHJcbiAgICBASW5wdXQoKSBhcGlVcmw6c3RyaW5nO1xyXG4gICAgQElucHV0KCkgY3VycmVudFZhbHVlO1xyXG4gICAgaWQ6c3RyaW5nO1xyXG4gICAgQElucHV0KCkgZm9ybTtcclxuICAgIEBJbnB1dCgpIG5hbWU6c3RyaW5nO1xyXG4gICAgQElucHV0KCkgY2hvc2VudmFsdWVzOlBvcHVsYWJsZUl0ZW08YW55PltdO1xyXG4gICAgc2hvd2luZ1N1Z2dlc3Rpb25zID0gZmFsc2U7XHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KFJlcXVlc3RTZXJ2aWNlKSBwdWJsaWMgcmVxdWVzdFNlcnZpY2U6UmVxdWVzdFNlcnZpY2UpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNvbnN0clwiKTtcclxuICAgICAgICB0aGlzLmlkPVwic3VnZ2VzdC1cIitNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqMTAwMDAwKTtcclxuXHJcbiAgICB9XHJcbiAgICBuZ09uQ2hhbmdlcygpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT05DSEFOR0VcIix0aGlzLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICAgICAgaWYodGhpcy5jdXJyZW50VmFsdWUpe1xyXG4gICAgICAgICAgICBpZighdGhpcy5jaG9zZW52YWx1ZXMpIHRoaXMuY2hvc2VudmFsdWVzPVtdO1xyXG4gICAgICAgICAgICB0aGlzLmNob3NlbnZhbHVlcy5wdXNoKG5ldyBQb3B1bGFibGVJdGVtPGFueT4odGhpcy5jdXJyZW50VmFsdWUpKTtcclxuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdGVkPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlKG9iajpQb3B1bGFibGVJdGVtPGFueT4pe1xyXG4gICAgICAgIHZhciBpZD0oPGFueT5vYmopLl9pZD8oPGFueT5vYmopLl9pZDpvYmouZ2V0T2JqZWN0SWQoKTtcclxuICAgICAgICBmb3IodmFyIGk9MCxuPXRoaXMuY2hvc2VudmFsdWVzLmxlbmd0aDtpPG47KytpKVxyXG4gICAgICAgICAgICBpZih0aGlzLmNob3NlbnZhbHVlc1tpXS5nZXRPYmplY3RJZCgpPT09aWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNob3NlbnZhbHVlcy5zcGxpY2UoaSwxKTtcclxuICAgICAgICB0aGlzLmlzU2VsZWN0ZWQ9ZmFsc2U7XHJcblxyXG4gICAgfVxyXG4gICAgZ2V0SWR4KGlkKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuY2hvc2VudmFsdWVzKSByZXR1cm4gLTE7XHJcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSB0aGlzLmNob3NlbnZhbHVlcy5sZW5ndGg7IGkgPCBuOyArK2kpe1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaG9zZW52YWx1ZXNbaV0uZ2V0T2JqZWN0SWQoKSA9PT0gaWQpe1xyXG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIWZvdW5kKSByZXR1cm4gLTE7XHJcblxyXG4gICAgfVxyXG4gICAgaXNJblNlbGVjdGVkTGlzdChpZCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRJZHgoaWQpPi0xO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0KHM6UG9wdWxhYmxlSXRlbTxhbnk+KXtcclxuICAgICAgICBpZighdGhpcy5pc0luU2VsZWN0ZWRMaXN0KHMuZ2V0T2JqZWN0SWQoKSkpe1xyXG4gICAgICAgIGlmKCF0aGlzLmNob3NlbnZhbHVlcykgdGhpcy5jaG9zZW52YWx1ZXM9W107XHJcbiAgICAgICAgdGhpcy5jaG9zZW52YWx1ZXMucHVzaChzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oaWRlU3VnZ2VzdGlvbnMoKTtcclxuXHJcbiAgICAgICAgdGhpcy52YWx1ZT1cIlwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy5pc1NlbGVjdGVkPXRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZWxlY3RcIix0aGlzLmZvcm0uY29udHJvbHMsdGhpcy5uYW1lKTtcclxuICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5uYW1lXS51cGRhdGVWYWx1ZSh0aGlzLmNob3NlbnZhbHVlcyk7XHJcbiAgICAgICAgdGhpcy5tb2RlbFt0aGlzLm5hbWVdPXRoaXMuY2hvc2VudmFsdWVzO1xyXG4gICAgfVxyXG4gICAgb25LZXkoZXZlbnQ6YW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJLZXlcIik7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9ucz1bXTtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZS5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQXV0b0NvbXBsZXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93U3VnZ2VzdGlvbnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgc2hvd1N1Z2dlc3Rpb25zKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd2luZ1N1Z2dlc3Rpb25zID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlU3VnZ2VzdGlvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93aW5nU3VnZ2VzdGlvbnMgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHVwZGF0ZUF1dG9Db21wbGV0aW9uKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmFwaVVybClcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkF1dG9jb21wbGV0ZSBlbXB0eSBhcGl1cmxcIik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImF1dG9jb21wbGV0aW9uXCIsIHRoaXMudmFsdWUpO1xyXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmFwaVVybCtcInN1Z2dlc3QvXCIgKyB0aGlzLnR5cGUrXCIvXCIrdGhpcy52YWx1ZTtcclxuICAgICAgICB0aGlzLnJlcXVlc3RTZXJ2aWNlLmdldEpTT04odXJsLCAocmVzKT0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNcIixyZXMpO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgaW4gIHJlcy5maWxlLnN1Z2dlc3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBpZihyZXMuZmlsZS5zdWdnZXN0aW9uc1tpXS5maXJzdG5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLmZpbGUuc3VnZ2VzdGlvbnNbaV0ubmFtZT1yZXMuZmlsZS5zdWdnZXN0aW9uc1tpXS5maXJzdG5hbWUgKyBcIiBcIityZXMuZmlsZS5zdWdnZXN0aW9uc1tpXS5sYXN0bmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnMucHVzaChuZXcgUG9wdWxhYmxlSXRlbTxhbnk+KHJlcy5maWxlLnN1Z2dlc3Rpb25zW2ldKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LHRoaXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLypcclxuZXhwb3J0IGNvbnN0IEZPUk1fRUxFTUVOVFM6IGFueVtdID0gW1xyXG4gICAgTWFuZGF0b3J5TGFiZWwsXHJcbiAgICBGb3JtRmllbGRzZXQsXHJcbiAgICBGb3JtRmllbGQsXHJcbiAgICBSZXF1aXJlZEZvcm1FcnJvcixcclxuICAgIEZvcm1Hcm91cFRpdGxlLCBBdXRvY29tcGxldGVJbnB1dCxJbnB1dFRhZ3NcclxuXTtcclxuICAqLyJdfQ==