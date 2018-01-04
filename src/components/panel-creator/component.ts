import {Component, Input, OnInit, Inject, Injectable, ViewChild, AfterViewInit} from '@angular/core';

import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {Logic} from "../../logic/Logic";

import {EventService} from "../../lib/localton/services/event.service";
import {Workspace, Panel, Item, Row, Tab} from "../../lib/localton/interfaces/interfaces";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from "@angular/material";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {WorkspaceService} from "../../lib/localton/services/workspace.service";
import {AuthService} from "../../lib/globalton/core/services/auth.service";

@Component({
    selector: 'app-panel-creator',
    templateUrl: 'template.html'
})
@Injectable()
export class AppPanelCreatorComponent implements AfterViewInit {
    mode: string = ""

    nRows = 0;
    nTabs = 0;
    selectedTab = 0;
    panel: Panel;
    myPanels = {};
    components: Array<Item>

    myWorkspaces: any[];
    myWorkspace;
    panels: any[] = []
    @Input() editedPanel;
    //templatePanels:any[]=[]
    constructor(public logic: Logic, public appConfigService: AppConfigService, public eventService: EventService, public dialog: MatDialog, public consoleService: ConsoleService, public workspaceService: WorkspaceService, public authService: AuthService, public snackBar: MatSnackBar) {
        this.components = this.appConfigService.widgets;
        this.loadWorkspaceData()
        this.initNewPanel()
        this.readPanel()
        this.eventService.workspaceUpdatedEvent.subscribe((val) => this.workspaceUpdated(val));
    }
    selectedWorkspace=0;
    switchWorkspace() {

        this.myWorkspace = this.myWorkspaces[this.selectedWorkspace];
    }

    isSet(p) {
        return typeof p == "string"
    }

    workspaceUpdated(val) {
        this.loadWorkspaceData()
    }

    loadWorkspaceData() {
        this.myPanels = this.workspaceService.panelsObject;
        this.panels = this.workspaceService.panelsArray;
        this.myWorkspaces = this.workspaceService.getAllWorkspaces()
        this.myWorkspace = this.workspaceService.getCurrentWorkspace()
        //this.templatePanels=this.workspaceService.getTemplatePanels();
        console.log("[PANEL-CREATOR] loadWorkspaceData panels", this.panels, "workspace", this.myWorkspace)

    }

    ngOnInit() {
        if (this.editedPanel)
            this.editPanel(this.editedPanel)
    }

    isNewPanel: boolean = true;


    backup;
    @ViewChild('tabGroup') tabGroup;
    @ViewChild('tabGroup2') tabGroup2;

    ngAfterViewInit() {
        if (this.tabGroup)
            this.consoleService.ui('afterViewInit => ', this.tabGroup.selectedIndex);
    }

    selectedLibraryTab = 0;

    libraryTabChange(ev) {
        this.selectedLibraryTab = ev.index;
    }

    initNewPanel() {
        let t: Tab[] = []
        t.push(this.getNewTabObj(0, "Main"))
        this.panel = {title: "New panel", content: JSON.stringify(t), tabs: t, type: "panel"}
        this.consoleService.ui("init panel", this.panel)
    }

    readPanel() {
        this.panel.tabs = JSON.parse(this.panel.content)
        this.consoleService.ui("Read Panel", this.panel)
    }

    findComponentById(id): Item {
        this.consoleService.ui(id, this.components.find(function (obj: Item) {
            return obj.id === id;
        }))
        return this.components.find(function (obj: Item) {
            return obj.id === id;
        });
    }

    findRowByIdInTab(id, tabId): Row {
        let f: Function = (obj: Item) => {
            return obj.id === id;
        }
        for (let i = 0; i < this.panel.tabs[tabId].rows.length; ++i) {
            if (this.panel.tabs[tabId].rows[i].id == id)
                return this.panel.tabs[tabId].rows[i]
        }
    }

    findRowById(id): Row {
        for (let i = 0; i < this.panel.tabs.length; ++i) {
            const f = this.findRowByIdInTab(id, i)
            if (f) return f
        }
    }

    addComponent(id) {

    }

    itemDropped(event, tabid, rowid) {
        //const row: Row = this.findRowById(rowid)
        const draggedId = event.dragData;
        const dragged: Item = this.findComponentById(draggedId)
        const draggedCopy = {};
        for (let k in dragged) draggedCopy[k] = dragged[k]
        this.consoleService.ui(tabid, rowid, event, dragged)
        this.panel.tabs[tabid].rows[rowid].content.push(draggedCopy)

    }

    getNewRowObj(n): Row {
        return {id: n, content: [], title: "Row " + (n + 1)}
    }

    getNewTabObj(n, name?: string): Tab {
        let title = name ? name : ( "Tab " + (n + 1))
        return {id: n, rows: [this.getNewRowObj(0)], title: title}
    }

    close() {
        this.eventService.hidePanelCreator()
    }

    addRow(tabId) {
        if (!tabId) tabId = this.selectedTab;
        this.panel.tabs[tabId].rows.push(this.getNewRowObj(++this.nRows))
    }

    getExportedPanel(p?) {
        if (!p) p = this.panel;
        let obj: any = {};
        for (let k in p) {
            obj[k] = p[k]
        }
        //obj=this.replaceSelectByValue(obj)

        obj.content = JSON.stringify(p.tabs)
        delete obj.tabs;
        return obj
    }

    replaceSelectByValue(obj) {
        this.consoleService.ui("REPLACE SELECTS")
        for (let i = 0; i < this.panel.tabs.length; ++i) {
            const t = obj.tabs[i]
            this.consoleService.ui("REPLACE TAB", t)
            for (let j = 0; j < t.rows[j].content.length; ++j) {

                const r = t.rows[j]
                this.consoleService.ui("REPLACE ROW", r, r.content)
                for (let k = 0; k < r.content.length; ++k) {
                    this.consoleService.ui("REPALCE ", r.content[k].symbol, r.content[k].symbolValue)
                    r.content[k].symbol = r.content[k].symbolValue;
                    r.content[k].time = r.content[k].timeValue;
                }
            }
        }
        return obj;
    }

    savePanel(f) {
        this.consoleService.ui("CREATOR > SAVEPANEL", this.panel, this.panel.tabs)
        let obj = this.getExportedPanel();
        this.consoleService.ui(obj)
        this.logic.savePanel(obj, (res) => {
            this.consoleService.ui("CREATOR > SAVEPANEL res", this.panel, res)
            this.refreshPanel(res);
            this.snackBar.open('Panel saved', null, {duration: 3000});
            this.mode = ''
            this.backup = null;
            if (this.editedPanel) {
                this.eventService.unloadPanelCreator()
                this.eventService.hidePanelCreator()
                f(res);
            }
        })
    }

    saveExistingPanel(obj, f) {
        this.consoleService.ui("CREATOR > SAVEPANEL", this.panel, this.panel.tabs)
        obj = this.getExportedPanel(obj);
        this.consoleService.ui(obj)
        this.logic.savePanel(obj, (res) => {
            this.consoleService.ui("CREATOR > SAVEPANEL res", this.panel, res)
            this.refreshPanel(res);

            f(res);

        })
    }

    saveSeparator(name: string) {
        this.consoleService.ui("CREATOR > SAVEsEP")
        let obj = {title: name, type: "separator"}
        this.consoleService.ui(obj)
        this.logic.savePanel(obj, (res) => {
            this.consoleService.ui("CREATOR > SAVESEPes", obj, res)
            this.snackBar.open('Separator saved', null, {duration: 3000});
            this.refreshPanel(res);
        })
    }

    saveExistingSeparator(obj, f: Function) {
        this.consoleService.ui("CREATOR > SAVEsEP")

        this.consoleService.ui(obj)
        this.logic.savePanel(obj, (res) => {
            this.consoleService.ui("CREATOR > SAVESEPes", obj, res)
            this.refreshPanel(res);
            f(res);
        })
    }

    removeWidget(row, item, index) {
        this.consoleService.ui("CREATOR > removeWidget", row, item)
        row.content.splice(index, 1)
    }

    refreshPanel(p) {
        this.consoleService.ui("CREATOR > refreshPanels", p)
        this.myPanels[p.id] = p;
        let f = false;
        for (let i = 0; i < this.panels.length; ++i)
            if (this.panels[i].id == p.id) {
                f = true
                this.panels[i] = p;
            }
        if (!f)
            this.panels.push(p);
        if (this.editedPanel) this.editedPanel = p;
    }

    askedTabName = "";

    askName(isNew: boolean, currentName?: string, tabIndex?: number) {
        let name;
        let dialogRef = this.dialog.open(AskNameDialog, {width: '250px', data: {name: isNew ? this.askedTabName : currentName, response: null, title: "Name the tab"}});
        dialogRef.afterClosed().subscribe(result => {

            this.consoleService.ui('The dialog was closed', result);
            if (result && result.response !== "cancel")
                if (isNew)
                    this.panel.tabs.push(this.getNewTabObj(this.nTabs++, result))
                else
                    this.panel.tabs[tabIndex].title = result
        });
    }


    addTab() {
        this.askName(true);

    }

    editPanel(p) {
        this.consoleService.ui("CREATOR > editPanel", p);
        this.panel = p
        p.tabs = JSON.parse(p.content)
        this.mode = "create"
        this.backup = this.panel;
    }

    editSeparator(panelId: string) {
        console.log("wo", this.myWorkspace, this.myPanels, panelId)
        let name = this.myPanels[panelId].title;
        let dialogRef = this.dialog.open(AskNameDialog, {width: '250px', data: {name: name, response: null, title: "Name the separator"}});
        dialogRef.afterClosed().subscribe(result => {
            this.consoleService.ui('The dialog was closed', result);
            if (result && result.response !== "cancel")
                this.myPanels[panelId].title = result
            this.saveExistingSeparator(this.myPanels[panelId], (res) => {
                this.snackBar.open('Separator saved', null, {duration: 3000});
            })
        });

    }

    restoreDefaultPanels() {
        this.workspaceService.restoreDefaultWorkspace();

    }

    deletePanel(index) {
        this.consoleService.ui("deletePanel", this.myWorkspace.panels, index)
        this.myWorkspace.panels.splice(index, 1)
        this.saveWorkspace((res) => {
            this.snackBar.open('Panel deleted');
        })
    }

    createNewBoard() {
        this.mode = 'create';

        this.initNewPanel()
    }

    archivePanel(p) {
        this.consoleService.ui("archivePanel", this.myWorkspace.panels)
        this.myPanels[p.id].archived = "true"
        this.saveExistingPanel(p, (res) => {
            this.snackBar.open('Panel archived');
        })
    }

    deleteRow(tabindex, rowindex) {
        this.panel.tabs[tabindex].rows.splice(rowindex, 1)
    }

    createSeparator() {

        let name = "";
        let dialogRef = this.dialog.open(AskNameDialog, {width: '250px', data: {name: name, response: null, title: "Name the separator"}});
        dialogRef.afterClosed().subscribe(result => {
            this.consoleService.ui('The dialog was closed', result);
            if (result && result.response !== "cancel") {
                this.saveSeparator(result)
            }

        });
    }

    deleteTab() {
        let tabIndex = this.tabGroup._selectedIndex;
        this.panel.tabs.splice(tabIndex, 1)
    }

    deleteSeparatordeleteSeparatorFromWorkspace(index) {
        this.myWorkspace.panels.splice(index, 1)
        this.saveWorkspace((res) => {
            this.snackBar.open('Separator deleted', null, {
                duration: 3000
            });
        })
    }

    archiveSeparator(p) {
        console.log("archive", p, this.myPanels)
        this.myPanels[p.id].archived = true;
        this.saveExistingSeparator(this.myPanels[p.id], (res) => {
            this.snackBar.open('Separator archive', null, {duration: 3000});
        })
    }

    renameTab() {
        this.consoleService.ui("this.tabGroup", this.tabGroup)
        let tabIndex = this.tabGroup._selectedIndex;

        let currentName = this.panel.tabs[tabIndex].title;
        this.askName(false, currentName, tabIndex)


    }

    tabChanged(event) {
        this.consoleService.ui("tabchanged", event)

    }

    panelDropped(event) {

        const panelId = event.dragData;
        if (!this.myWorkspace.panels || this.myWorkspace.panels == "") this.myWorkspace.panels = []
        this.myWorkspace.panels.push(panelId);
        this.consoleService.ui("CREATOR > panelDropped", panelId, this.myWorkspace)
        this.saveWorkspace((res) => {
            this.snackBar.open('Panel added', null, {duration: 3000});
        })
    }

    saveWorkspace(f) {
        this.logic.saveWorkspace(this.myWorkspace, (res) => {
            this.eventService.workspaceUpdatedEvent.emit({workspace: res});
            f(res);
        })
    }

    cancel() {

        if (this.editedPanel) {
            this.eventService.unloadPanelCreator()
            this.eventService.hidePanelCreator()
        } else {
            this.panel = this.backup;
        }

        this.mode = ""
    }
}


@Component({
    selector: 'dialog-askname',
    template: `<h1 mat-dialog-title>{{data.title}}</h1>
    <div mat-dialog-content>

        <mat-form-field>
            <input matInput tabindex="1" [(ngModel)]="data.name">
        </mat-form-field>
    </div>
    <div mat-dialog-actions>
        <button mat-button (click)="onNoClick()">Cancel</button>
        <button mat-button [mat-dialog-close]="data.name" cdkFocusInitial>Ok</button>
    </div>`,
})
export class AskNameDialog {
    constructor(public dialogRef: MatDialogRef<AskNameDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.data.response = "cancel"
        this.dialogRef.close();
    }

}
