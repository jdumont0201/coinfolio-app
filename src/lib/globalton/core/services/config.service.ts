import {EventEmitter, Output, Injectable} from "@angular/core";
import {OptionsBarItem, OptionsBarConfig} from "../services/optionsbar.service";
//import {SelectOption, SelectOptionSet} from '../directives/elements/Forms';
import {enableProdMode} from '@angular/core';

//NATIVE
//import { Device } from '@ionic-native/device';
//import { AppVersion } from '@ionic-native/app-version';
//import { isAndroid, isIOS, device, screen } from "platform";
//import * as AppVersion from "nativescript-appversion";

import {ReturnMode, LangCode, DomainDefinition} from "../interfaces/interfaces"
//import {Platform} from 'ionic-angular';

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
    supportedCurrencies: { [key: string]: string };
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
    API_TIMEOUT: number = 5000; //timeout in ms
    API_NB_RETRY: number = 3;
    APIMODELKEYS = {};
    API_USE_ENTITY_PREFIX = {};
    API_RETURN_MODE: ReturnMode = API_RETURN_MODES.HASH;//HASH OR OBJECT
    entityPrefix = null;

    //CACHE
    LIBRARY_ENABLED: boolean = true;
    UPDATE_AFTER_GET: boolean = true;
    UPDATE_AFTER_POSTPUTPATCH: boolean = true;

    countryList = {
        "BD": "Bangladesh",
        "BE": "Belgium",
        "BF": "Burkina Faso",
        "BG": "Bulgaria",
        "BA": "Bosnia and Herzegovina",
        "BB": "Barbados",
        "WF": "Wallis and Futuna",
        "BL": "Saint Barthelemy",
        "BM": "Bermuda",
        "BN": "Brunei",
        "BO": "Bolivia",
        "BH": "Bahrain",
        "BI": "Burundi",
        "BJ": "Benin",
        "BT": "Bhutan",
        "JM": "Jamaica",
        "BV": "Bouvet Island",
        "BW": "Botswana",
        "WS": "Samoa",
        "BQ": "Bonaire, Saint Eustatius and Saba ",
        "BR": "Brazil",
        "BS": "Bahamas",
        "JE": "Jersey",
        "BY": "Belarus",
        "BZ": "Belize",
        "RU": "Russia",
        "RW": "Rwanda",
        "RS": "Serbia",
        "TL": "East Timor",
        "RE": "Reunion",
        "TM": "Turkmenistan",
        "TJ": "Tajikistan",
        "RO": "Romania",
        "TK": "Tokelau",
        "GW": "Guinea-Bissau",
        "GU": "Guam",
        "GT": "Guatemala",
        "GS": "South Georgia and the South Sandwich Islands",
        "GR": "Greece",
        "GQ": "Equatorial Guinea",
        "GP": "Guadeloupe",
        "JP": "Japan",
        "GY": "Guyana",
        "GG": "Guernsey",
        "GF": "French Guiana",
        "GE": "Georgia",
        "GD": "Grenada",
        "GB": "United Kingdom",
        "GA": "Gabon",
        "SV": "El Salvador",
        "GN": "Guinea",
        "GM": "Gambia",
        "GL": "Greenland",
        "GI": "Gibraltar",
        "GH": "Ghana",
        "OM": "Oman",
        "TN": "Tunisia",
        "JO": "Jordan",
        "HR": "Croatia",
        "HT": "Haiti",
        "HU": "Hungary",
        "HK": "Hong Kong",
        "HN": "Honduras",
        "HM": "Heard Island and McDonald Islands",
        "VE": "Venezuela",
        "PR": "Puerto Rico",
        "PS": "Palestinian Territory",
        "PW": "Palau",
        "PT": "Portugal",
        "SJ": "Svalbard and Jan Mayen",
        "PY": "Paraguay",
        "IQ": "Iraq",
        "PA": "Panama",
        "PF": "French Polynesia",
        "PG": "Papua New Guinea",
        "PE": "Peru",
        "PK": "Pakistan",
        "PH": "Philippines",
        "PN": "Pitcairn",
        "PL": "Poland",
        "PM": "Saint Pierre and Miquelon",
        "ZM": "Zambia",
        "EH": "Western Sahara",
        "EE": "Estonia",
        "EG": "Egypt",
        "ZA": "South Africa",
        "EC": "Ecuador",
        "IT": "Italy",
        "VN": "Vietnam",
        "SB": "Solomon Islands",
        "ET": "Ethiopia",
        "SO": "Somalia",
        "ZW": "Zimbabwe",
        "SA": "Saudi Arabia",
        "ES": "Spain",
        "ER": "Eritrea",
        "ME": "Montenegro",
        "MD": "Moldova",
        "MG": "Madagascar",
        "MF": "Saint Martin",
        "MA": "Morocco",
        "MC": "Monaco",
        "UZ": "Uzbekistan",
        "MM": "Myanmar",
        "ML": "Mali",
        "MO": "Macao",
        "MN": "Mongolia",
        "MH": "Marshall Islands",
        "MK": "Macedonia",
        "MU": "Mauritius",
        "MT": "Malta",
        "MW": "Malawi",
        "MV": "Maldives",
        "MQ": "Martinique",
        "MP": "Northern Mariana Islands",
        "MS": "Montserrat",
        "MR": "Mauritania",
        "IM": "Isle of Man",
        "UG": "Uganda",
        "TZ": "Tanzania",
        "MY": "Malaysia",
        "MX": "Mexico",
        "IL": "Israel",
        "FR": "France",
        "IO": "British Indian Ocean Territory",
        "SH": "Saint Helena",
        "FI": "Finland",
        "FJ": "Fiji",
        "FK": "Falkland Islands",
        "FM": "Micronesia",
        "FO": "Faroe Islands",
        "NI": "Nicaragua",
        "NL": "Netherlands",
        "NO": "Norway",
        "NA": "Namibia",
        "VU": "Vanuatu",
        "NC": "New Caledonia",
        "NE": "Niger",
        "NF": "Norfolk Island",
        "NG": "Nigeria",
        "NZ": "New Zealand",
        "NP": "Nepal",
        "NR": "Nauru",
        "NU": "Niue",
        "CK": "Cook Islands",
        "XK": "Kosovo",
        "CI": "Ivory Coast",
        "CH": "Switzerland",
        "CO": "Colombia",
        "CN": "China",
        "CM": "Cameroon",
        "CL": "Chile",
        "CC": "Cocos Islands",
        "CA": "Canada",
        "CG": "Republic of the Congo",
        "CF": "Central African Republic",
        "CD": "Democratic Republic of the Congo",
        "CZ": "Czech Republic",
        "CY": "Cyprus",
        "CX": "Christmas Island",
        "CR": "Costa Rica",
        "CW": "Curacao",
        "CV": "Cape Verde",
        "CU": "Cuba",
        "SZ": "Swaziland",
        "SY": "Syria",
        "SX": "Sint Maarten",
        "KG": "Kyrgyzstan",
        "KE": "Kenya",
        "SS": "South Sudan",
        "SR": "Suriname",
        "KI": "Kiribati",
        "KH": "Cambodia",
        "KN": "Saint Kitts and Nevis",
        "KM": "Comoros",
        "ST": "Sao Tome and Principe",
        "SK": "Slovakia",
        "KR": "South Korea",
        "SI": "Slovenia",
        "KP": "North Korea",
        "KW": "Kuwait",
        "SN": "Senegal",
        "SM": "San Marino",
        "SL": "Sierra Leone",
        "SC": "Seychelles",
        "KZ": "Kazakhstan",
        "KY": "Cayman Islands",
        "SG": "Singapore",
        "SE": "Sweden",
        "SD": "Sudan",
        "DO": "Dominican Republic",
        "DM": "Dominica",
        "DJ": "Djibouti",
        "DK": "Denmark",
        "VG": "British Virgin Islands",
        "DE": "Germany",
        "YE": "Yemen",
        "DZ": "Algeria",
        "US": "United States",
        "UY": "Uruguay",
        "YT": "Mayotte",
        "UM": "United States Minor Outlying Islands",
        "LB": "Lebanon",
        "LC": "Saint Lucia",
        "LA": "Laos",
        "TV": "Tuvalu",
        "TW": "Taiwan",
        "TT": "Trinidad and Tobago",
        "TR": "Turkey",
        "LK": "Sri Lanka",
        "LI": "Liechtenstein",
        "LV": "Latvia",
        "TO": "Tonga",
        "LT": "Lithuania",
        "LU": "Luxembourg",
        "LR": "Liberia",
        "LS": "Lesotho",
        "TH": "Thailand",
        "TF": "French Southern Territories",
        "TG": "Togo",
        "TD": "Chad",
        "TC": "Turks and Caicos Islands",
        "LY": "Libya",
        "VA": "Vatican",
        "VC": "Saint Vincent and the Grenadines",
        "AE": "United Arab Emirates",
        "AD": "Andorra",
        "AG": "Antigua and Barbuda",
        "AF": "Afghanistan",
        "AI": "Anguilla",
        "VI": "U.S. Virgin Islands",
        "IS": "Iceland",
        "IR": "Iran",
        "AM": "Armenia",
        "AL": "Albania",
        "AO": "Angola",
        "AQ": "Antarctica",
        "AS": "American Samoa",
        "AR": "Argentina",
        "AU": "Australia",
        "AT": "Austria",
        "AW": "Aruba",
        "IN": "India",
        "AX": "Aland Islands",
        "AZ": "Azerbaijan",
        "IE": "Ireland",
        "ID": "Indonesia",
        "UA": "Ukraine",
        "QA": "Qatar",
        "MZ": "Mozambique"
    };
deviceInformation:any;
screenInformation:any;
    constructor() {
      console.log("+ ConfigService")
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
        console.log("+ ConfigService > configure");

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

    /*
     getActionBar(id:string, routeParams:any):OptionsBarConfig {
     if (!(id in this.actionBarRules)) {
     console.warn("id", id, "not found in actionBarRules", this.actionBarRules);
     return new OptionsBarConfig([]);
     }
     var actionBarButtonList = this.actionBarRules[id];
     var res:OptionsBarItem[] = [];
     for (var i = 0, n = actionBarButtonList.length; i < n; ++i) {
     let actionBarButton = actionBarButtonList[i];
     if (actionBarButton) {
     let params = actionBarButton.params || [];
     let loadedParams = {}
     for (var j = 0, m = params.length; j < m; ++j) {
     let prop = params[j];
     loadedParams[prop] = routeParams[prop];
     }

     let link=actionBarButton.link;
     var o = new OptionsBarItem(actionBarButton.key, actionBarButton.icon, [actionBarButton.component, loadedParams]);
     res.push(o);
     } else {
     console.error("no actionbarbutton");
     }

     }
     return new OptionsBarConfig(res);
     }**/
    /*
     getActionBar2(actionBarButtonList:number[], routeParams:any):OptionsBarConfig {
     console.log("getActionBar2",actionBarButtonList,routeParams);
     var res:OptionsBarItem[] = [];
     for (var i = 0, n = actionBarButtonList.length; i < n; ++i) {
     let actionBarButton = this.actionBarButtons[actionBarButtonList[i]];
     if (!actionBarButton) {
     console.error("no actionbarbutton");
     } else {
     let params = actionBarButton.params || [];
     let loadedParams = {};
     for (var j = 0, m = params.length; j < m; ++j) {
     let prop = params[j];
     if (typeof routeParams[prop] === "string") {
     loadedParams[prop] = routeParams[prop];
     } else {
     console.error("ACTION BAR =", actionBarButton, " PARAM INVALID =", routeParams[prop], routeParams,prop);
     loadedParams[prop] = null;
     }
     }

     var o = new OptionsBarItem(actionBarButton.key, actionBarButton.icon, actionBarButton.link, actionBarButton.popup);
     res.push(o);

     }
     }
     return new OptionsBarConfig(res);
     }
     */


}
