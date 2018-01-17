import {EventEmitter, Output, Injectable} from "@angular/core";
import {enableProdMode} from '@angular/core';


import {ReturnMode, LangCode, DomainDefinition} from "../interfaces/interfaces"

export enum API_RETURN_MODES {HASH, OBJECT}


export enum ENVIRONMENTS { Local, Dev, Stag, Prod }
;

export enum LANGUAGES { AmericanEnglish }
;
class DeviceInfo {
    constructor(
        public model: string,
        public deviceType: string,
        public os: string,
        public osVersion: string,
        public sdkVersion: string,
        public language: string,
        public manufacturer: string,
        public uuid: string
    ) { }
}

class ScreenInfo {
    constructor(
        public heightDIPs: number,
        public heightPixels: number,
        public scale: number,
        public widthDIPs: number,
        public widthPixels: number
    ) { }
}


@Injectable()
export class ConfigService {


    @Output() perSiteConfigured: EventEmitter<any> = new EventEmitter();
    @Output() isReady: EventEmitter<any> = new EventEmitter();
    @Output() perSiteConfiguredTranslate: EventEmitter<any> = new EventEmitter();
    @Output() perSiteConfiguredAuth: EventEmitter<any> = new EventEmitter();

    //ENVIRONMENT
    app: string;
    env: number;
    platform: string;
    lang: LangCode;
    domain: string;
    prefix: string;
    deviceUUID:string;
    sitename: string;
    CART_ENABLED: boolean = false;
    isPerSiteConfigured: boolean = false;

    appliVersion:string;
    versionNumber:string;
    packageName:string;
    versionCode:string;

    siteConfigService: any = null;
    validationMessages: any = {};

    apiURL: string;
    baseURL: string;
    staticURL: string;
    selectOptions: { SelectOptionSet } | {} = {};
    actionBarRules: any = {};
    actionBarButtons: { name: string, icon: string, component: string, params: any, popup?: number }[] = [];
    //PARAMS

    //INTERFACE
    FLASH_MSG_TIMEOUT: number = 60000;

    //LANG
    supportedLanguages: { [key: string]: string };

    //CURRENCIES
    supportedCurrencies: { [key: string]: string }= {
        "USD": "US Dollars",
        "EUR": "Euro",
        "GBP": "British Pound",
        "CAD": "Canadian Dollars"
    };
    usedCurrencies: { [key: string]: string } = {
        "USD": "US Dollars",
        "EUR": "Euro",
        "GBP": "British Pound",
        "CAD": "Canadian Dollars"
    };
    currencyRatesApi: string = "http://api.fixer.io/latest?base=USD&symbols=EUR,GBP,CAD";
    defaultCurrencyRates: string = '{"base":"USD","date":"2016-03-08","rates":{"CAD":1.3325,"GBP":0.70374,"EUR":0.90678}}';
    renewCurrencyFileAtStartup: boolean = false;

    availableDomains: { [key: string]: DomainDefinition };

    matchingDomain: string = null;


    currentApiEntrypoint = "";

    MODELTYPES: any;

    //HISTORY
    historyTypes: string[] = [];

    //THEMES
    careersPageBackgrounds: { [key: string]: string };
    //MAIL
    applyMailSuffix: string;

    //AUTH
    storeUserId: boolean = true;

    //API CONFIG
    API_TIMEOUT: number = 25000; //timeout in ms
    API_NB_RETRY: number = 0;
        entityPrefix = null;

    //CACHE
    LIBRARY_ENABLED: boolean = true;
    UPDATE_AFTER_GET: boolean = true;
    UPDATE_AFTER_POSTPUTPATCH: boolean = true;


deviceInformation:any;
screenInformation:any;
    constructor() {
      //console.log("+ ConfigService")
/*        this.deviceInformation = new DeviceInfo(
            device.model,
            device.model,
            device.os,
            device.osVersion,
            device.sdkVersion,
            device.language,
            device.manufacturer,
            device.uuid);
*//*        this.screenInformation = new ScreenInfo(
            screen.mainScreen.heightDIPs,
            screen.mainScreen.heightPixels,
            screen.mainScreen.scale,
            screen.mainScreen.widthDIPs,
            screen.mainScreen.widthPixels);
*/

         this.setParameters();

    }

    configure() {
        //console.log("+ ConfigService > configure");

        //this.buildApiKeys();
        this.setLanguage();
        //this.buildSelectOptions();
        this.setShowConsole();
        //this.buildActionBarRules();
        //this.buildHistoryTypes();
        this.applyMailSuffix = "@apply" + (this.env === ENVIRONMENTS.Prod ? "" : ".dev") + ".hireton.com";
    }

    setShowConsole() {

    }

    setModelTypes(MT) {
        this.MODELTYPES = MT;
    }

    getTranslationFilePaths(langCode: string): string[] {
        if (!langCode) return null;
        return [
            this.staticURL + "/locales/" + langCode + "/" + this.sitename + "-common.json",
            this.staticURL + "/locales/" + langCode + "/" + this.sitename + "-" + this.app + ".json"];
    }

    setEntityPrefix(e) {
        this.entityPrefix = e;
    }
    setEnvironment(): void {
        let suffixes: string[] = ["local.", "dev.", "stag.", ""];
        let ENVNAMES: string[] = ["LOCAL", "DEV", "STAG", "PROD"];
        let u = location.host;
      //  this.deviceUUID=device.uuid;//this.device.uuid;
        if (!this.isMobileDevice()) {
            if (u.indexOf("localhost") > -1) this.env = ENVIRONMENTS.Local;
            else if (u.indexOf(".local.") > -1) this.env = ENVIRONMENTS.Local;
            else if (u.indexOf(".dev.") > -1) this.env = ENVIRONMENTS.Dev;
            else if (u.indexOf(".stag.") > -1) this.env = ENVIRONMENTS.Stag;
            else this.env = ENVIRONMENTS.Prod;
        } else {
            console.log("uuid=", this.deviceUUID,"ref=145ef0269066c8d4 equal?",this.deviceUUID=="145ef0269066c8d4");
            if(this.deviceUUID=="145ef0269066c8d4")
                this.env = ENVIRONMENTS.Dev;
            else
                this.env = ENVIRONMENTS.Prod;
        }
        console.log("ENV=", ENVNAMES[this.env]);

        this.prefix = suffixes[this.env];
        if (this.platform === "ios" || this.platform === "android")
            this.prefix = "";
    }

    setParameters() {
        this.setPlatform();
        this.setEnvironment();
        this.setDomain();
        this.setURLs();
        if(this.isMobileDevice()){
           /*
            AppVersion.getVersionName().then((v: string) =>{
                    this.appliVersion = v;
            });
            AppVersion.getVersionCode().then(   (v)=> {
                    this.versionCode = v;
              });
              AppVersion.getAppId().then(function(id) {
 this.appId=id });
        */
    }
    }

    setPlatform() {

        let message = "";
        //if (isAndroid) {
        //   this.platform="android"
        //} else if (isIOS) {
         //   this.platform="ios"
        //}else{
          //  this.platform="other";
        //}
        this.platform="web";

        console.log("PLATFORM=", this.platform);
    }
  setApiUrl(){
    let apiSuffix="/latest/";
    if (this.isMobileDevice()) {
      //DEBUG MOBILE ON STAG API
      if(this.env == ENVIRONMENTS.Dev)
        this.apiURL= "http://192.168.0.16:8030"+apiSuffix;
      else if (this.env == ENVIRONMENTS.Stag)
        this.apiURL = "http://api.stag." + this.domain +apiSuffix;
      else
        this.apiURL = "http://api." + this.domain +apiSuffix;

    } else {
      if (location.host.indexOf("localhost")>-1)
        this.apiURL = "http://34.242.69.165:3001/";
      else
        this.apiURL = "http://api." + this.prefix + this.domain + apiSuffix
    }

  }
    setURLs(): void {
        this.setApiUrl()
        //this.consoleService.log("ConfigService setURLs pref", this.prefix,"dom=", this.domain);

        if (!this.staticURL)
        //this.staticURL = "http://static." + this.prefix + this.domain;
            this.staticURL = "http://static." + this.prefix + "hireton.com";
        console.log("APIURL", this.apiURL);
        console.log("ConfigService setURLs prefix=", this.prefix, "dom=", this.domain, " api=", this.apiURL);

    }

    isMobileDevice() {
        return this.isMobileApp();
    }

      getApiUrl(): string {
        if (this.apiURL)
            return this.apiURL;
        else
            console.error("Api URL Not set");
    }

    isMobileApp() {
        return this.platform === "ios" || this.platform === "android";
    }

    setDomain(): void {
        console.log("Set domain");
        if (this.isMobileApp()) {
            this.domain = "hireton.com";
        }
        let u: string = window.location.hostname;
        let domainParts = u.split(".");
        let n = domainParts.length;
        if (n > 1) {
            this.domain = domainParts[n - 2] + "." + domainParts[n - 1]
            /* let found :boolean= false;
             for (var dom in this.availableDomains) {
             if (u.indexOf(dom) > -1) {
             this.domain = dom;
             found = true;
             break;
             }
             }
             console.log("setDomain href=", u, "domain=", this.domain);
             if (!found) {
             console.error("Domain not found from href", u);
             }*/
        } else {
            console.log("Domain has less than 3 components", u);
            this.domain = "hireton.com";
        }
    }

    getUrl(includeSubdomain?: boolean) {
        return (includeSubdomain ? this.app : "") + this.prefix + this.domain;

    }

    enableProdModeIfNecessary(): void {
        if (this.env === ENVIRONMENTS.Prod)
            enableProdMode();
    }

    setLanguage(): void {
        console.log("SetLanguage", this.domain, this.availableDomains);
        if (this.domain in this.availableDomains)
            this.lang = this.availableDomains[this.domain].defaultLanguage;
        else
            console.error("Cannot find domain", this.domain, "to available domains", this.availableDomains);
    }

}
