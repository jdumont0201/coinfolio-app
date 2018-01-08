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
//import {SelectOption, SelectOptionSet} from '../directives/elements/Forms';
var core_2 = require("@angular/core");
//import {Platform} from 'ionic-angular';
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
        this.API_TIMEOUT = 5000; //timeout in ms
        this.API_NB_RETRY = 0;
        this.APIMODELKEYS = {};
        this.API_USE_ENTITY_PREFIX = {};
        this.API_RETURN_MODE = API_RETURN_MODES.HASH; //HASH OR OBJECT
        this.entityPrefix = null;
        //CACHE
        this.LIBRARY_ENABLED = true;
        this.UPDATE_AFTER_GET = true;
        this.UPDATE_AFTER_POSTPUTPATCH = true;
        this.countryList = {
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
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ConfigService.prototype, "perSiteConfigured", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ConfigService.prototype, "isReady", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ConfigService.prototype, "perSiteConfiguredTranslate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ConfigService.prototype, "perSiteConfiguredAuth", void 0);
    ConfigService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map