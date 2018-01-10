import {Injectable} from "@angular/core"
import {Output} from "@angular/core"
import {EventEmitter} from '@angular/core';
import {Logic} from "../../../logic/Logic";
import {ConfigService} from "../../globalton/core/services/config.service";
import {EventService} from "./event.service";
import {AppConfigService} from "./appconfig.service";
import {AuthService} from "../../globalton/core/services/auth.service";
import {appendArrayToObject, appendArrayToArray} from "../../globalton/core/utils/utils"
import {ConsoleService} from "../../globalton/core/services/console.service";

@Injectable()
export class WorkspaceService {
    @Output() workspacesLoaded: EventEmitter<any> = new EventEmitter();

    workspaces;
    currentWorkspace;
    panelsObject;
    panelsArray;
    defaultWorkspace = [{
        panels: [
            "5a464411996ced000eacecea",
            "5a4641a4996ced000eacece6",
            "5a464329996ced000eacece8",
            "5a464468996ced000eacecec",
            "5a46447b996ced000eacecee"
            , "5a46448c996ced000eacecf0"
            , "5a46449a996ced000eacecf2"
            , "5a4644d6996ced000eacecf4"
            , "5a4644e3996ced000eacecf6"
            , "5a4644ea996ced000eacecf8"
            , "5a464559996ced000eacecfc"
            , "5a464552996ced000eacecfa"],
        name: "Default workspace"
    }]
    isLoaded = false;

    constructor(public logic: Logic, public authService: AuthService, public configService: ConfigService, public eventService: EventService, public appConfigService: AppConfigService, public consoleService: ConsoleService) {
        this.consoleService.ws("MENU > Loading Sidebar")
        this.init();
        this.authService.loginChanged.subscribe((val) => this.loginChanged(val))
    }

    loginChanged(val) {
        this.init()
    }

    init() {

        if (this.authService.isAuthenticated()) {
            this.consoleService.ws("loading my panels")
            this.logic.loadMyPanels((res) => {
                this.consoleService.ws("loading my panels my", res)
                this.logic.loadTemplatePanels((res2) => {
                    this.consoleService.ws("loading my panels template", res2)
                    appendArrayToArray(res2, res.array);
                    appendArrayToObject(res2, res.object);

                    this.panelsObject = res.object;
                    this.panelsArray = res.array;
                    this.setSpecialPanels()
                    this.loadWorkspaces(() => {
                        this.isLoaded = true;
                        this.eventService.workspaceUpdatedEvent.emit(true);
                    });
                });
            })
        } else {
            this.consoleService.ws("loading default panels")
            this.logic.loadTemplatePanels((res) => {
                this.consoleService.ws("res ", res)
                res.object = {}
                res.array = []
                appendArrayToArray(res, res.array);
                appendArrayToObject(res, res.object);
                this.panelsObject = res.object;
                this.panelsArray = res.array;
                this.loadDefaultWorkspace(() => {
                    this.isLoaded = true
                    this.eventService.workspaceUpdatedEvent.emit(true);
                })
            })
        }
    }

    setSpecialPanels() {
        for (let i = 0; i < this.appConfigService.specialPanels.length; ++i) {
            let p = this.appConfigService.specialPanels[i]
            this.panelsObject[p.id] = p;
            this.panelsArray.push(p)
        }
    }

    restoreDefaultWorkspace() {
        let id = this.currentWorkspace.id;
        this.currentWorkspace = this.defaultWorkspace[0];
        this.currentWorkspace.id = id;

        let defaultPanelIds = this.defaultWorkspace[0].panels
        for (let i = 0; i < defaultPanelIds.length; ++i) {

        }


        this.logic.loadPanels(this.defaultWorkspace[0].panels, (res) => {
            this.logic.saveWorkspace(this.currentWorkspace, (res) => {
                this.init()
            })
        });
    }

    setWorkspaces(w) {

    }

    getWorkspace() {

    }

    getCurrentWorkspace() {
        this.consoleService.ws("GETCUR", this.currentWorkspace)
        return this.currentWorkspace
    }

    getPanelArray() {
        this.consoleService.ws("getPanelArray", this.panelsArray)
        return this.panelsArray
    }

    getPanelsObject() {
        this.consoleService.ws("getPanelsObject", this.panelsObject)
        return this.panelsObject
    }

    getAllWorkspaces() {
        return this.workspaces
    }

    getPanel(boardId: string): any {
        this.consoleService.ws("this.getpanel", boardId, this.panelsObject)
        if (boardId)
            if (this.panelsObject && boardId in this.panelsObject) {
                let p = this.panelsObject[boardId];
                p.tabs = JSON.parse(p.content)
                return p;
            }

    }

    parsePanel(p) {
        p.tabs = JSON.parse(p.content)
    }

    loadSidebar() {

    }

    loadDefaultWorkspace(f) {
        this.workspaces = this.defaultWorkspace;
        this.setCurrentWorkspace();
    }

    loadWorkspaces(f) {
        this.consoleService.ws("MENU > loading workspaces")
        this.logic.getMyWorkspaces((res) => {
            this.consoleService.ws("MENU > WORKSPACES", res)
            this.workspaces = res;
            if (this.workspaces.length == 0)
                this.logic.saveWorkspace({panels: [], name: "Main workspace"}, (res) => {
                    this.workspaces = [res]
                })
            this.setCurrentWorkspace();
            f();
        });
    }

    setCurrentWorkspace() {
        if (this.workspaces.length == 1)
            this.currentWorkspace = this.workspaces[0]
        else if (this.workspaces.length > 1)
            this.currentWorkspace = this.workspaces[0]
        this.eventService.workspaceUpdatedEvent.emit(this.currentWorkspace)
    }

    getFirstPanel() {
        this.consoleService.ws("MENU > loadFirstPanel", this.currentWorkspace, this.panelsObject)


        if (this.currentWorkspace && this.currentWorkspace.panels && this.currentWorkspace.panels.length > 0) {
            this.loadPanelForFirst(0)

        } else {
            this.consoleService.ws("empty panels", this.currentWorkspace)
        }
    }

    loadPanelForFirst(n) {
        if (n >= this.currentWorkspace.panels.length) return;
        let boardId = this.currentWorkspace.panels[n];
        if (this.panelsObject && (boardId in this.panelsObject)) {
            let p = this.panelsObject[boardId];
            if (p.type == "separator") this.loadPanelForFirst(n + 1)
            this.consoleService.ws("MAIN > currentpanel", p)
            p.tabs = JSON.parse(p.content)
            return p
        }
    }
}
