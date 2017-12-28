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
var core_1 = require("@angular/core");
var SectionSmall = (function () {
    function SectionSmall() {
        this.visible = true;
    }
    SectionSmall.prototype.toggle = function () {
        this.visible = !this.visible;
    };
    return SectionSmall;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionSmall.prototype, "title", void 0);
SectionSmall = __decorate([
    core_1.Component({
        selector: 'section-small',
        template: '<section class="grey det flatrows cleared"><h2 (click)="toggle()">{{title}}</h2><div class="det-in" [hidden]="!visible"><ng-content></ng-content></div></section>'
    })
], SectionSmall);
exports.SectionSmall = SectionSmall;
var SectionConfigurableSmall = (function () {
    function SectionConfigurableSmall() {
        this.selected = [];
        this.menuvisible = false;
        this.visible = true;
        this.displayMode = "row";
    }
    SectionConfigurableSmall.prototype.setMode = function (mode) {
    };
    SectionConfigurableSmall.prototype.toggleMenu = function () {
        this.menuvisible = true;
    };
    SectionConfigurableSmall.prototype.setDisplay = function (mode) {
        this.displayMode = mode;
    };
    SectionConfigurableSmall.prototype.toggle = function () {
        this.visible = !this.visible;
    };
    return SectionConfigurableSmall;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionConfigurableSmall.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], SectionConfigurableSmall.prototype, "sellected", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], SectionConfigurableSmall.prototype, "selected", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionConfigurableSmall.prototype, "displayMode", void 0);
SectionConfigurableSmall = __decorate([
    core_1.Component({
        selector: 'section-configurable-small',
        template: "<section class=\"grey det flatrows cleared\" [class.gridmode]=\"displayMode=='grid'\"  [class.squaremode]=\"displayMode=='square'\"  [class.rowmode]=\"displayMode=='row'\">\n                <h2 (click)=\"toggle()\">{{title}}</h2>\n                <div class=\"tweakmenu\">\n                    <div (click)=\"toggleMenu()\" class=\"tweakbutton\"></div>\n                    <div class=\"sectionmenu\" [hidden]=\"menuvisible\">\n                        <div (click)=\"setDisplay('row')\">{{'buttons.viewasrow' | translate}}</div>\n                        <div (click)=\"setDisplay('grid')\">{{'buttons.viewasgrid' | translate}}</div>\n                        <div (click)=\"setDisplay('square')\">{{'buttons.viewassquare' | translate}}</div>\n                        <div (click)=\"setMode('delete')\">{{'buttons.batchdelete' | translate}}</div>\n                        <div (click)=\"setMode('archive')\">{{'buttons.batcharchive' | translate}}</div>\n                    </div>\n                </div><div class=\"det-in\" [hidden]=\"!visible\"><ng-content></ng-content></div></section>"
    })
], SectionConfigurableSmall);
exports.SectionConfigurableSmall = SectionConfigurableSmall;
var SectionSmallMenued = (function () {
    function SectionSmallMenued() {
        this.theme = "standard";
        this.extraclass = "standard";
        this.menuvisible = false;
        this.visible = true;
        this.displayMode = "row";
    }
    SectionSmallMenued.prototype.setMode = function (mode) {
    };
    SectionSmallMenued.prototype.toggleMenu = function () {
        this.menuvisible = true;
    };
    SectionSmallMenued.prototype.setDisplay = function (mode) {
        this.displayMode = mode;
    };
    SectionSmallMenued.prototype.toggle = function () {
        this.visible = !this.visible;
    };
    return SectionSmallMenued;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionSmallMenued.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], SectionSmallMenued.prototype, "selected", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionSmallMenued.prototype, "theme", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionSmallMenued.prototype, "extraclass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionSmallMenued.prototype, "displayMode", void 0);
SectionSmallMenued = __decorate([
    core_1.Component({
        selector: 'section-small-add',
        template: "<section class=\"grey det flatrows cleared\" [class.gridmode]=\"displayMode=='grid'\"  [class.squaremode]=\"displayMode=='square'\"  [class.rowmode]=\"displayMode=='row'\">\n                <h2 (click)=\"toggle()\">{{title}}</h2>\n                <div class=\"tweakmenu\">\n                    <div (click)=\"toggleMenu()\" class=\"tweakbutton\"></div>\n                    <div class=\"sectionmenu\" [hidden]=\"menuvisible\">\n                        \n                    </div>\n                </div><div class=\"det-in\" [hidden]=\"!visible\"><ng-content></ng-content></div></section>"
    }),
    core_1.Component({
        selector: 'section-small-menued',
        template: "<section class=\"grey det flatrows cleared menued {{extraclass}}\" >\n                <h2 class=\"color-{{theme}}\" (click)=\"toggle()\">{{title}}</h2>\n                <div class=\"\" [hidden]=\"!visible\"><ng-content></ng-content></div></section>"
    })
], SectionSmallMenued);
exports.SectionSmallMenued = SectionSmallMenued;
var SectionSmallOptioned = (function () {
    function SectionSmallOptioned() {
        this.visible = true;
    }
    SectionSmallOptioned.prototype.toggle = function () {
        this.visible = !this.visible;
    };
    return SectionSmallOptioned;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionSmallOptioned.prototype, "title", void 0);
SectionSmallOptioned = __decorate([
    core_1.Component({
        selector: 'section-small-optioned',
        template: '<section class="grey det flatrows optioned cleared"><h2 (click)="toggle()">{{title}}</h2><div [hidden]="!visible"><ng-content></ng-content></div></section>'
    })
], SectionSmallOptioned);
exports.SectionSmallOptioned = SectionSmallOptioned;
var SectionObjective = (function () {
    function SectionObjective() {
        this.visible = true;
    }
    SectionObjective.prototype.toggle = function () {
        this.visible = !this.visible;
    };
    return SectionObjective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionObjective.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionObjective.prototype, "color", void 0);
SectionObjective = __decorate([
    core_1.Component({
        selector: 'section-objective',
        template: '<section class="objective {{color}}"><h2 (click)="toggle()">{{title}}</h2><ng-content></ng-content></section>'
    })
], SectionObjective);
exports.SectionObjective = SectionObjective;
var SectionObjectiveSmall = (function () {
    function SectionObjectiveSmall() {
        this.visible = true;
    }
    SectionObjectiveSmall.prototype.toggle = function () {
        this.visible = !this.visible;
    };
    return SectionObjectiveSmall;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionObjectiveSmall.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionObjectiveSmall.prototype, "color", void 0);
SectionObjectiveSmall = __decorate([
    core_1.Component({
        selector: 'section-objective-small',
        template: '<section class="objective objective-small {{color}}"><h2 (click)="toggle()">{{title}}</h2><ng-content></ng-content></section>'
    })
], SectionObjectiveSmall);
exports.SectionObjectiveSmall = SectionObjectiveSmall;
var SectionBlock = (function () {
    function SectionBlock() {
        this.extraclass = "";
        this.visible = true;
    }
    SectionBlock.prototype.toggle = function () {
        this.visible = !this.visible;
    };
    return SectionBlock;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionBlock.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionBlock.prototype, "extraclass", void 0);
SectionBlock = __decorate([
    core_1.Component({
        selector: 'section-block',
        template: '<section class="det light {{extraclass}}"><h2 (click)="toggle()">{{title}}</h2><div class="det-in" [hidden]="!visible"><ng-content></ng-content></div></section>'
    })
], SectionBlock);
exports.SectionBlock = SectionBlock;
var SectionLarge = (function () {
    function SectionLarge() {
        this.visible = true;
    }
    SectionLarge.prototype.toggle = function () {
        this.visible = !this.visible;
    };
    return SectionLarge;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionLarge.prototype, "title", void 0);
SectionLarge = __decorate([
    core_1.Component({
        selector: 'section-large',
        template: '<section class="det light trans flatrows"><h2 (click)="toggle()">{{title}}</h2><div class="det-in" [hidden]="!visible"><ng-content></ng-content></div></section>'
    })
], SectionLarge);
exports.SectionLarge = SectionLarge;
var SectionFlat = (function () {
    function SectionFlat() {
        this.visible = true;
    }
    SectionFlat.prototype.toggle = function () {
        this.visible = !this.visible;
    };
    return SectionFlat;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionFlat.prototype, "title", void 0);
SectionFlat = __decorate([
    core_1.Component({
        selector: 'section-flat',
        template: '<section class="det light flatrows"><h2 (click)="toggle()">{{title}}</h2><div class="det-in" [hidden]="!visible"><ng-content></ng-content></div></section>'
    })
], SectionFlat);
exports.SectionFlat = SectionFlat;
var SectionScroll = (function () {
    function SectionScroll() {
        this.theme = "standard";
        this.visible = true;
    }
    SectionScroll.prototype.toggle = function () {
        this.visible = !this.visible;
    };
    return SectionScroll;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionScroll.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SectionScroll.prototype, "theme", void 0);
SectionScroll = __decorate([
    core_1.Component({
        selector: 'section-scroll',
        template: '<section class="det grey flatrows scroll"><h2 class="color-{{theme}}" (click)="toggle()">{{title}}</h2><div class="det-in" [hidden]="!visible"><ng-content></ng-content></div></section>'
    })
], SectionScroll);
exports.SectionScroll = SectionScroll;
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
//# sourceMappingURL=Sections.js.map