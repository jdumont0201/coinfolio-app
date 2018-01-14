"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var API_RETURN_MODES;
(function (API_RETURN_MODES) {
    API_RETURN_MODES[API_RETURN_MODES["HASH"] = 0] = "HASH";
    API_RETURN_MODES[API_RETURN_MODES["OBJECT"] = 1] = "OBJECT";
})(API_RETURN_MODES = exports.API_RETURN_MODES || (exports.API_RETURN_MODES = {}));
var ENVIRONMENTS;
(function (ENVIRONMENTS) {
    ENVIRONMENTS[ENVIRONMENTS["Local"] = 0] = "Local";
    ENVIRONMENTS[ENVIRONMENTS["Dev"] = 1] = "Dev";
    ENVIRONMENTS[ENVIRONMENTS["Stag"] = 2] = "Stag";
    ENVIRONMENTS[ENVIRONMENTS["Prod"] = 3] = "Prod";
})(ENVIRONMENTS = exports.ENVIRONMENTS || (exports.ENVIRONMENTS = {}));
;
var LANGUAGES;
(function (LANGUAGES) {
    LANGUAGES[LANGUAGES["AmericanEnglish"] = 0] = "AmericanEnglish";
})(LANGUAGES = exports.LANGUAGES || (exports.LANGUAGES = {}));
;
var DeviceInfo = (function () {
    function DeviceInfo(model, deviceType, os, osVersion, sdkVersion, language, manufacturer, uuid) {
        this.model = model;
        this.deviceType = deviceType;
        this.os = os;
        this.osVersion = osVersion;
        this.sdkVersion = sdkVersion;
        this.language = language;
        this.manufacturer = manufacturer;
        this.uuid = uuid;
    }
    return DeviceInfo;
}());
var ScreenInfo = (function () {
    function ScreenInfo(heightDIPs, heightPixels, scale, widthDIPs, widthPixels) {
        this.heightDIPs = heightDIPs;
        this.heightPixels = heightPixels;
        this.scale = scale;
        this.widthDIPs = widthDIPs;
        this.widthPixels = widthPixels;
    }
    return ScreenInfo;
}());
var ConfigService = (function () {
    function ConfigService() {
        this.perSiteConfigured = new core_1.EventEmitter();
        this.isReady = new core_1.EventEmitter();
        this.perSiteConfiguredTranslate = new core_1.EventEmitter();
        this.perSiteConfiguredAuth = new core_1.EventEmitter();
        this.CART_ENABLED = false;
        this.isPerSiteConfigured = false;
        this.siteConfigService = null;
        this.validationMessages = {};
        this.selectOptions = {};
        this.actionBarRules = {};
        this.actionBarButtons = [];
        //PARAMS
        //INTERFACE
        this.FLASH_MSG_TIMEOUT = 60000;
        this.usedCurrencies = {
            "USD": "US Dollars",
            "EUR": "Euro",
            "GBP": "British Pound",
            "CAD": "Canadian Dollars"
        };
        this.currencyRatesApi = "http://api.fixer.io/latest?base=USD&symbols=EUR,GBP,CAD";
        this.defaultCurrencyRates = '{"base":"USD","date":"2016-03-08","rates":{"CAD":1.3325,"GBP":0.70374,"EUR":0.90678}}';
        this.renewCurrencyFileAtStartup = false;
        this.matchingDomain = null;
        this.currentApiEntrypoint = "";
        //HISTORY
        this.historyTypes = [];
        //AUTH
        this.storeUserId = true;
        //API CONFIG
        this.API_TIMEOUT = 15000; //timeout in ms
        this.API_NB_RETRY = 0;
        this.entityPrefix = null;
        //CACHE
        this.LIBRARY_ENABLED = true;
        this.UPDATE_AFTER_GET = true;
        this.UPDATE_AFTER_POSTPUTPATCH = true;
        console.log("+ ConfigService");
        /*        this.deviceInformation = new DeviceInfo(
                    device.model,
                    device.model,
                    device.os,
                    device.osVersion,
                    device.sdkVersion,
                    device.language,
                    device.manufacturer,
                    device.uuid);
        */ /*        this.screenInformation = new ScreenInfo(
                    screen.mainScreen.heightDIPs,
                    screen.mainScreen.heightPixels,
                    screen.mainScreen.scale,
                    screen.mainScreen.widthDIPs,
                    screen.mainScreen.widthPixels);
        */
        this.setParameters();
    }
    ConfigService.prototype.configure = function () {
        console.log("+ ConfigService > configure");
        //this.buildApiKeys();
        this.setLanguage();
        //this.buildSelectOptions();
        this.setShowConsole();
        //this.buildActionBarRules();
        //this.buildHistoryTypes();
        this.applyMailSuffix = "@apply" + (this.env === ENVIRONMENTS.Prod ? "" : ".dev") + ".hireton.com";
    };
    ConfigService.prototype.setShowConsole = function () {
    };
    ConfigService.prototype.setModelTypes = function (MT) {
        this.MODELTYPES = MT;
    };
    ConfigService.prototype.getTranslationFilePaths = function (langCode) {
        if (!langCode)
            return null;
        return [
            this.staticURL + "/locales/" + langCode + "/" + this.sitename + "-common.json",
            this.staticURL + "/locales/" + langCode + "/" + this.sitename + "-" + this.app + ".json"
        ];
    };
    ConfigService.prototype.setEntityPrefix = function (e) {
        this.entityPrefix = e;
    };
    ConfigService.prototype.setEnvironment = function () {
        var suffixes = ["local.", "dev.", "stag.", ""];
        var ENVNAMES = ["LOCAL", "DEV", "STAG", "PROD"];
        var u = location.host;
        //  this.deviceUUID=device.uuid;//this.device.uuid;
        if (!this.isMobileDevice()) {
            if (u.indexOf("localhost") > -1)
                this.env = ENVIRONMENTS.Local;
            else if (u.indexOf(".local.") > -1)
                this.env = ENVIRONMENTS.Local;
            else if (u.indexOf(".dev.") > -1)
                this.env = ENVIRONMENTS.Dev;
            else if (u.indexOf(".stag.") > -1)
                this.env = ENVIRONMENTS.Stag;
            else
                this.env = ENVIRONMENTS.Prod;
        }
        else {
            console.log("uuid=", this.deviceUUID, "ref=145ef0269066c8d4 equal?", this.deviceUUID == "145ef0269066c8d4");
            if (this.deviceUUID == "145ef0269066c8d4")
                this.env = ENVIRONMENTS.Dev;
            else
                this.env = ENVIRONMENTS.Prod;
        }
        console.log("ENV=", ENVNAMES[this.env]);
        this.prefix = suffixes[this.env];
        if (this.platform === "ios" || this.platform === "android")
            this.prefix = "";
    };
    ConfigService.prototype.setParameters = function () {
        this.setPlatform();
        this.setEnvironment();
        this.setDomain();
        this.setURLs();
        if (this.isMobileDevice()) {
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
    };
    ConfigService.prototype.setPlatform = function () {
        var message = "";
        //if (isAndroid) {
        //   this.platform="android"
        //} else if (isIOS) {
        //   this.platform="ios"
        //}else{
        //  this.platform="other";
        //}
        this.platform = "web";
        console.log("PLATFORM=", this.platform);
    };
    ConfigService.prototype.setApiUrl = function () {
        var apiSuffix = "/latest/";
        if (this.isMobileDevice()) {
            //DEBUG MOBILE ON STAG API
            if (this.env == ENVIRONMENTS.Dev)
                this.apiURL = "http://192.168.0.16:8030" + apiSuffix;
            else if (this.env == ENVIRONMENTS.Stag)
                this.apiURL = "http://api.stag." + this.domain + apiSuffix;
            else
                this.apiURL = "http://api." + this.domain + apiSuffix;
        }
        else {
            if (location.host.indexOf("localhost") > -1)
                this.apiURL = "http://34.242.69.165:3001/";
            else
                this.apiURL = "http://api." + this.prefix + this.domain + apiSuffix;
        }
    };
    ConfigService.prototype.setURLs = function () {
        this.setApiUrl();
        //this.consoleService.log("ConfigService setURLs pref", this.prefix,"dom=", this.domain);
        if (!this.staticURL)
            //this.staticURL = "http://static." + this.prefix + this.domain;
            this.staticURL = "http://static." + this.prefix + "hireton.com";
        console.log("APIURL", this.apiURL);
        console.log("ConfigService setURLs prefix=", this.prefix, "dom=", this.domain, " api=", this.apiURL);
    };
    ConfigService.prototype.isMobileDevice = function () {
        return this.isMobileApp();
    };
    ConfigService.prototype.getApiUrl = function () {
        if (this.apiURL)
            return this.apiURL;
        else
            console.error("Api URL Not set");
    };
    ConfigService.prototype.isMobileApp = function () {
        return this.platform === "ios" || this.platform === "android";
    };
    ConfigService.prototype.setDomain = function () {
        console.log("Set domain");
        if (this.isMobileApp()) {
            this.domain = "hireton.com";
        }
        var u = window.location.hostname;
        var domainParts = u.split(".");
        var n = domainParts.length;
        if (n > 1) {
            this.domain = domainParts[n - 2] + "." + domainParts[n - 1];
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
        }
        else {
            console.log("Domain has less than 3 components", u);
            this.domain = "hireton.com";
        }
    };
    ConfigService.prototype.getUrl = function (includeSubdomain) {
        return (includeSubdomain ? this.app : "") + this.prefix + this.domain;
    };
    ConfigService.prototype.enableProdModeIfNecessary = function () {
        if (this.env === ENVIRONMENTS.Prod)
            core_2.enableProdMode();
    };
    ConfigService.prototype.setLanguage = function () {
        console.log("SetLanguage", this.domain, this.availableDomains);
        if (this.domain in this.availableDomains)
            this.lang = this.availableDomains[this.domain].defaultLanguage;
        else
            console.error("Cannot find domain", this.domain, "to available domains", this.availableDomains);
    };
    __decorate([
        core_1.Output()
    ], ConfigService.prototype, "perSiteConfigured", void 0);
    __decorate([
        core_1.Output()
    ], ConfigService.prototype, "isReady", void 0);
    __decorate([
        core_1.Output()
    ], ConfigService.prototype, "perSiteConfiguredTranslate", void 0);
    __decorate([
        core_1.Output()
    ], ConfigService.prototype, "perSiteConfiguredAuth", void 0);
    ConfigService = __decorate([
        core_1.Injectable()
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;
