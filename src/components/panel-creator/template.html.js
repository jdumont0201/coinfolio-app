id;
"panel-creator" >
    id;
"panel-creator-box" >
    id;
"panel-creator-workspace" >
    id;
"panel-creator-top" > Edit;
mode
    < select(change);
"switchWorkspace()"[(ngModel)] = "selectedWorkspace" >
     * ngFor;
"let w of myWorkspaces ; let index=index"[value] = "index" > {};
{
    w.name;
}
/option>
    < /select>
    < button;
mat - raised - button;
color = "primary";
var default_1 = (function () {
    function default_1() {
    }
    return default_1;
}());
"panel-creator-button-end"(click) = "close()" * ngIf;
"mode==''" > Leave;
edit;
mode < /button>
    < /div>
    < div * ngIf;
"mode=='create'" >
    mat - raised - button;
color = "accent";
var default_2 = (function () {
    function default_2() {
    }
    return default_2;
}());
"save"(click) = "savePanel()" > Save;
panel < /button>
    < button;
mat - raised - button;
color = "primary";
var default_3 = (function () {
    function default_3() {
    }
    return default_3;
}());
"cancel"(click) = "cancel()" > Cancel < /button>
    < div;
var default_4 = (function () {
    function default_4() {
    }
    return default_4;
}());
"library-separator" > Widget;
library < /div>
    < div;
var default_5 = (function () {
    function default_5() {
    }
    return default_5;
}());
"creator-component-list" >
    (function () {
        function class_1() {
        }
        return class_1;
    }());
"creator-component draggable";
dnd - draggable[dragEnabled];
"true"[dragData] = "item.id"
    * ngFor;
"let item of components" >
    (function () {
        function class_2() {
        }
        return class_2;
    }());
"grippytall";
dnd - draggable - handle > /span>
    < div;
var default_6 = (function () {
    function default_6() {
    }
    return default_6;
}());
"title" > {};
{
    item.title;
}
/div>
    < div;
var default_7 = (function () {
    function default_7() {
    }
    return default_7;
}());
"size" > {};
{
    item.size;
}
/div>
    < button * ngIf;
"false";
mat - button(click);
"addComponent(item.id)" > Add < /button>
    < /div>
    < /div>
    < /div>
    < div * ngIf;
"mode==''" >
    -nav - list;
dnd - sortable - container[dropZones];
"['boxers-zone']"[sortableData] = "myWorkspace?.panels" >
     * ngFor;
"let p of myWorkspace?.panels; let index=index";
dnd - sortable[sortableIndex];
"index" >
     * ngIf;
"isSet(p)" >
     * ngIf;
"myPanels[p].type=='separator'";
mat - list - item;
var default_8 = (function () {
    function default_8() {
    }
    return default_8;
}());
"mat-list-item  menu-separator" > (function () {
    function class_3() {
    }
    return class_3;
}());
"grippytall" > /span>;
{
    {
        myPanels[p].title;
    }
}
(function () {
    function class_4() {
    }
    return class_4;
}());
"link"(click) = "editSeparator(p)" > Rename < /a> <a;
var default_9 = (function () {
    function default_9() {
    }
    return default_9;
}());
"link"(click) = "deleteSeparatorFromWorkspace(index)" > Remove < /a></div >
     * ngIf;
"myPanels[p].type=='panel'"(click) = "editPanel(myPanels[p])";
matLine;
mat - list - item;
var default_10 = (function () {
    function default_10() {
    }
    return default_10;
}());
"mat-list-item " > (function () {
    function class_5() {
    }
    return class_5;
}());
"grippytall" > /span>;
{
    {
        myPanels[p].title;
    }
}
(function () {
    function class_6() {
    }
    return class_6;
}());
"link"(click) = "editPanel(myPanels[p])" > Edit < /a> <a;
var default_11 = (function () {
    function default_11() {
    }
    return default_11;
}());
"link"(click) = "deletePanel(index)" > Remove < /a></div >
     * ngIf;
"myPanels[p].type=='special'"(click) = "editPanel(myPanels[p])";
matLine;
mat - list - item;
var default_12 = (function () {
    function default_12() {
    }
    return default_12;
}());
"mat-list-item " > (function () {
    function class_7() {
    }
    return class_7;
}());
"grippytall" > /span>{{myPanels[p].title}}
    < br > (function () {
    function class_8() {
    }
    return class_8;
}());
"link"(click) = "editPanel(myPanels[p])" > Edit < /a> <a class="link"(click);
"deletePanel(index)" > Remove < /a>
    < /div>
    < /div>
    < div * ngIf;
"!isSet(p)" >
    (click);
"editPanel(p)";
matLine;
mat - list - item;
var default_13 = (function () {
    function default_13() {
    }
    return default_13;
}());
"mat-list-item " > (function () {
    function class_9() {
    }
    return class_9;
}());
"grippytall" > /span>{{p.title}} <br> <a class="link" (click)="editPanel(p)">Edit</a >
    (function () {
        function class_10() {
        }
        return class_10;
    }());
"link"(click) = "deletePanel(index)" > Delete < /a></div >
    /div>
    < /div>
    < /mat-nav-list>
    < div;
id = "panel-creator-workspace-droppable";
dnd - droppable(onDropSuccess);
"panelDropped($event)" > Drop;
panels;
here;
to;
add;
to;
your;
sidebar;
/div>
    < button;
mat - button;
color = "primary"(click) = "restoreDefaultPanels()" > Restore;
panels < /button>
    < button * ngIf;
"false";
mat - button(click);
"isNewPanel=true" > Add;
new panel < /button>
    < /div>
    < /div>
    < div;
id = "panel-creator-panels" >
     * ngIf;
"isNewPanel" >
     * ngIf;
"mode==''";
style = "padding: 10px 20px;" >
    (function () {
        function class_11() {
        }
        return class_11;
    }());
"title" * ngIf;
"mode==''" > Compose;
your;
boards < /h3>
    < span;
var default_14 = (function () {
    function default_14() {
    }
    return default_14;
}());
"info" > Drag;
panels;
by;
the;
handle;
and;
drop;
them;
on;
the;
side;
bar;
to;
compose;
your;
workspace. < /span>
    < div;
id = "panel-creator-moded" >
    id;
"panel-creator-mypanels-box" >
     * ngIf;
"selectedLibraryTab==0";
mat - raised - button;
color = "accent";
var default_15 = (function () {
    function default_15() {
    }
    return default_15;
}());
"newboard"(click) = "createNewBoard()" > New;
board
    < /button>
    < button * ngIf;
"selectedLibraryTab==1";
mat - raised - button;
color = "accent";
var default_16 = (function () {
    function default_16() {
    }
    return default_16;
}());
"newboard"(click) = "createSeparator()" > New;
separator
    < /button>
    < mat - tab - group;
tabGroup2(selectedTabChange) = "libraryTabChange($event)" >
    -tab;
label = "My panels" >
     * ngFor;
"let p of panels; let index=index" >
;
"true"[dragData] = "p.id";
dnd - draggable;
var default_17 = (function () {
    function default_17() {
    }
    return default_17;
}());
"draggable creator-panel-icon" * ngIf;
"!p.archived && p.type=='panel'";
mat - list - item >
    dnd - draggable - handle;
var default_18 = (function () {
    function default_18() {
    }
    return default_18;
}());
"draghandle" > (function () {
    function class_12() {
    }
    return class_12;
}());
"grippytall" > /span>{{p.title}}
    < /div>
    < div;
var default_19 = (function () {
    function default_19() {
    }
    return default_19;
}());
"paneloptions" > (function () {
    function class_13() {
    }
    return class_13;
}());
"link"(click) = "editPanel(p)" > Edit < /a> <a;
var default_20 = (function () {
    function default_20() {
    }
    return default_20;
}());
"link"(click) = "archivePanel(p)" > Archive < /a></div >
    /div>
    < /div>
    < /mat-tab>
    < mat - tab;
label = "Separators" >
     * ngFor;
"let p of panels; let index=index" >
;
"true"[dragData] = "p.id";
dnd - draggable
    * ngIf;
"!p.archived && p.type=='separator'";
mat - list - item;
var default_21 = (function () {
    function default_21() {
    }
    return default_21;
}());
"draggable mat-list-item   creator-panel-icon menu-separator" >
    dnd - draggable - handle;
var default_22 = (function () {
    function default_22() {
    }
    return default_22;
}());
"draghandle" > (function () {
    function class_14() {
    }
    return class_14;
}());
"grippytall" > /span> {{p.title}}
    < /div>
    < div;
var default_23 = (function () {
    function default_23() {
    }
    return default_23;
}());
"paneloptions" > (function () {
    function class_15() {
    }
    return class_15;
}());
"link"(click) = "editSeparator(p)" > Edit < /a> <a;
var default_24 = (function () {
    function default_24() {
    }
    return default_24;
}());
"link"(click) = "archiveSeparator(p)" > Archive < /a></div >
    /div>
    < /div>
    < /mat-tab>
    < mat - tab;
label = "Templates" >
     * ngFor;
"let p of panels; let index=index" >
     * ngIf;
"p.type=='special' || p.isDefault"[dragEnabled] = "true"[dragData] = "p.id";
dnd - draggable;
var default_25 = (function () {
    function default_25() {
    }
    return default_25;
}());
"draggable creator-panel-icon";
matLine;
mat - list - item(click);
"setPanel(p)" >
    dnd - draggable - handle;
var default_26 = (function () {
    function default_26() {
    }
    return default_26;
}());
"draghandle" > (function () {
    function class_16() {
    }
    return class_16;
}());
"grippytall" > /span>{{p.title}}                                            </div >
    (function () {
        function class_17() {
        }
        return class_17;
    }());
"paneloptions" > /div>
    < /a>
    < /div>
    < /mat-tab>
    < /mat-tab-group>
    < /div>
    < /div>
    < /div>
    < div * ngIf;
"mode=='create'" >
    (function () {
        function class_18() {
        }
        return class_18;
    }());
"creator-panel-edit-box" >
    (function () {
        function class_19() {
        }
        return class_19;
    }());
"creator-panel" >
    (function () {
        function class_20() {
        }
        return class_20;
    }());
"title editable-text";
type = "text"[(ngModel)] = "panel.title" /  > -tab - group(selectedTabChange);
"tabChanged($event)";
tabGroup >
    -tab;
label = "{{tab.title}}" * ngFor;
"let tab of panel.tabs ; let tabindex = index" >
    mat - raised - button(click);
"addTab()" > Add;
tab < /button>
    < button;
mat - raised - button(click);
"deleteTab()" > Delete;
tab < /button>
    < button;
mat - raised - button(click);
"renameTab()" > Rename;
active;
tab < /button>
    < br >
     * ngFor;
"let row of tab.rows ; let rowindex = index" >
    (function () {
        function class_21() {
        }
        return class_21;
    }());
"creator-panel-line-title" > (function () {
    function class_22() {
    }
    return class_22;
}());
"editable-text";
type = "text"[(ngModel)] = "row.title" /  > mat - button(click);
"deleteRow(tabindex,index)" > Delete;
row
    < /button>
    < br > /div>
    < div;
var default_27 = (function () {
    function default_27() {
    }
    return default_27;
}());
"creator-panel-line-drop" >
    (function () {
        function class_23() {
        }
        return class_23;
    }());
"creator-panel-line-ph";
dnd - droppable(onDropSuccess);
"itemDropped($event,tabindex,rowindex)" >
     * ngIf;
"row.content.length>0";
var default_28 = (function () {
    function default_28() {
    }
    return default_28;
}());
"creator-panel-line-existing" >
    (function () {
        function class_24() {
        }
        return class_24;
    }());
"creator-component";
dnd - draggable[dragEnabled];
"true"[dragData] = "item.id"
    * ngFor;
"let item of row.content; let index = index" >
    (function () {
        function class_25() {
        }
        return class_25;
    }());
"grippytall";
dnd - draggable - handle > /span>
    < div;
var default_29 = (function () {
    function default_29() {
    }
    return default_29;
}());
"xclose"(click) = "removeWidget(row,item,index)" >
    X
    < /div>
    < div;
var default_30 = (function () {
    function default_30() {
    }
    return default_30;
}());
"title" > {};
{
    item.title;
}
/div>
    < div;
var default_31 = (function () {
    function default_31() {
    }
    return default_31;
}());
"param"
    * ngIf;
"appConfigService.widgetConfig[item.code].time" >
    Time < /label><select [(ngModel)]="item.time">
    < option * ngFor;
"let s of appConfigService.times" > {};
{
    s;
}
/option>
    < /select></div >
    (function () {
        function class_26() {
        }
        return class_26;
    }());
"param"
    * ngIf;
"appConfigService.widgetConfig[item.code].symbol" >
    Symbol < /label><select [(ngModel)]="item.symbol">
    < option * ngFor;
"let s of appConfigService.valuesandglobal" >
    {};
{
    s;
}
/option>
    < /select></div >
    (function () {
        function class_27() {
        }
        return class_27;
    }());
"param"
    * ngIf;
"appConfigService.widgetConfig[item.code].format" >
    Format < /label><select [(ngModel)]="item.format">
    < option * ngFor;
"let s of appConfigService.formats" >
    {};
{
    s;
}
/option>
    < /select></div >
    /div>
    < /div>
    < span > Drop;
components;
here;
/span>
    < /div>
    < /div>
    < /li>
    < /ul>
    < button;
mat - button(click);
"addRow()" > Add;
row < /button>
    < br >
    /mat-tab>
    < /mat-tab-group>
    < /div>
    < /div>
    < /div>
    < /div>
    < /div>
    < /div>
    < /div>;
