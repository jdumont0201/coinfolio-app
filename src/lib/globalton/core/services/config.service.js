"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Forms_1 = require("../directives/elements/Forms");
var core_2 = require("@angular/core");
//NATIVE
//import { Device } from '@ionic-native/device';
//import { AppVersion } from '@ionic-native/app-version';
var platform_1 = require("platform");
var AppVersion = require("nativescript-appversion");
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
        this.deviceInformation = new DeviceInfo(platform_1.device.model, platform_1.device.model, platform_1.device.os, platform_1.device.osVersion, platform_1.device.sdkVersion, platform_1.device.language, platform_1.device.manufacturer, platform_1.device.uuid);
        this.screenInformation = new ScreenInfo(platform_1.screen.mainScreen.heightDIPs, platform_1.screen.mainScreen.heightPixels, platform_1.screen.mainScreen.scale, platform_1.screen.mainScreen.widthDIPs, platform_1.screen.mainScreen.widthPixels);
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
        this.deviceUUID = platform_1.device.uuid; //this.device.uuid;
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
        var _this = this;
        this.setPlatform();
        this.setEnvironment();
        this.setDomain();
        this.setURLs();
        if (this.isMobileDevice()) {
            AppVersion.getVersionName().then(function (v) {
                _this.appliVersion = v;
            });
            AppVersion.getVersionCode().then(function (v) {
                _this.versionCode = v;
            });
            AppVersion.getAppId().then(function (id) {
                this.appId = id;
            });
        }
    };
    ConfigService.prototype.setPlatform = function () {
        var message = "";
        if (platform_1.isAndroid) {
            this.platform = "android";
        }
        else if (platform_1.isIOS) {
            this.platform = "ios";
        }
        else {
            this.platform = "other";
        }
        alert(message);
        console.log("PLATFORM=", this.platform);
    };
    ConfigService.prototype.setURLs = function () {
        //this.consoleService.log("ConfigService setURLs pref", this.prefix,"dom=", this.domain);
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
                this.apiURL = "http://api.local." + this.domain + apiSuffix;
            else
                this.apiURL = "http://api." + this.prefix + this.domain + apiSuffix;
        }
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
     var o = new OptionsBarItem(actionBarButton.name, actionBarButton.icon, [actionBarButton.component, loadedParams]);
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

     var o = new OptionsBarItem(actionBarButton.name, actionBarButton.icon, actionBarButton.link, actionBarButton.popup);
     res.push(o);

     }
     }
     return new OptionsBarConfig(res);
     }
     */
    ConfigService.prototype.getSelectOptions = function (id) {
        if (id in this.selectOptions)
            return this.selectOptions[id];
        else {
            console.error("Fetching selectOptions", id, " but not defined in config-all Service");
            return new Forms_1.SelectOptionSet({});
        }
    };
    return ConfigService;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ConfigService.prototype, "perSiteConfigured", void 0);
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
exports.ConfigService = ConfigService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRDtBQUUvRCxzREFBMkU7QUFDM0Usc0NBQTZDO0FBRTdDLFFBQVE7QUFDUixnREFBZ0Q7QUFDaEQseURBQXlEO0FBQ3pELHFDQUE0RDtBQUM1RCxvREFBc0Q7QUFHdEQseUNBQXlDO0FBRXpDLElBQVksZ0JBQStCO0FBQTNDLFdBQVksZ0JBQWdCO0lBQUUsdURBQUksQ0FBQTtJQUFFLDJEQUFNLENBQUE7QUFBQSxDQUFDLEVBQS9CLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBQWU7QUFHM0MsSUFBWSxZQUF1QztBQUFuRCxXQUFZLFlBQVk7SUFBRyxpREFBSyxDQUFBO0lBQUUsNkNBQUcsQ0FBQTtJQUFFLCtDQUFJLENBQUE7SUFBRSwrQ0FBSSxDQUFBO0FBQUMsQ0FBQyxFQUF2QyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUEyQjtBQUNuRCxDQUFDO0FBRUQsSUFBWSxTQUE2QjtBQUF6QyxXQUFZLFNBQVM7SUFBRywrREFBZSxDQUFBO0FBQUMsQ0FBQyxFQUE3QixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUFvQjtBQUN6QyxDQUFDO0FBQ0Q7SUFDSSxvQkFDVyxLQUFhLEVBQ2IsVUFBa0IsRUFDbEIsRUFBVSxFQUNWLFNBQWlCLEVBQ2pCLFVBQWtCLEVBQ2xCLFFBQWdCLEVBQ2hCLFlBQW9CLEVBQ3BCLElBQVk7UUFQWixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQ1YsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQVE7UUFDcEIs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QUFNLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFlLENBQUM7UUFDbkUsSUFBSTtZQUNBLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxzQkFBc0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN4RyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQTJCSztJQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNEJHO0lBRUgsd0NBQWdCLEdBQWhCLFVBQWlCLEVBQVU7UUFDdkIsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLENBQUM7WUFDRixPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLEVBQUUsRUFBRSxvQ0FBb0MsQ0FBQyxDQUFDO1lBQ2xGLE1BQU0sQ0FBQyxJQUFJLHVCQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkMsQ0FBQztJQUNMLENBQUM7SUFFTCxvQkFBQztBQUFELENBQUMsQUE1bEJELElBNGxCQztBQXpsQmE7SUFBVCxhQUFNLEVBQUU7OEJBQW9CLG1CQUFZO3dEQUEyQjtBQUMxRDtJQUFULGFBQU0sRUFBRTs4QkFBNkIsbUJBQVk7aUVBQTJCO0FBQ25FO0lBQVQsYUFBTSxFQUFFOzhCQUF3QixtQkFBWTs0REFBMkI7QUFML0QsYUFBYTtJQUR6QixpQkFBVSxFQUFFOztHQUNBLGFBQWEsQ0E0bEJ6QjtBQTVsQlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlciwgT3V0cHV0LCBJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge09wdGlvbnNCYXJJdGVtLCBPcHRpb25zQmFyQ29uZmlnfSBmcm9tIFwiLi4vc2VydmljZXMvb3B0aW9uc2Jhci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7U2VsZWN0T3B0aW9uLCBTZWxlY3RPcHRpb25TZXR9IGZyb20gJy4uL2RpcmVjdGl2ZXMvZWxlbWVudHMvRm9ybXMnO1xyXG5pbXBvcnQge2VuYWJsZVByb2RNb2RlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8vTkFUSVZFXHJcbi8vaW1wb3J0IHsgRGV2aWNlIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9kZXZpY2UnO1xyXG4vL2ltcG9ydCB7IEFwcFZlcnNpb24gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2FwcC12ZXJzaW9uJztcclxuaW1wb3J0IHsgaXNBbmRyb2lkLCBpc0lPUywgZGV2aWNlLCBzY3JlZW4gfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuaW1wb3J0ICogYXMgQXBwVmVyc2lvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWFwcHZlcnNpb25cIjtcclxuXHJcbmltcG9ydCB7UmV0dXJuTW9kZSwgTGFuZ0NvZGUsIERvbWFpbkRlZmluaXRpb259IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ludGVyZmFjZXNcIlxyXG4vL2ltcG9ydCB7UGxhdGZvcm19IGZyb20gJ2lvbmljLWFuZ3VsYXInO1xyXG5cclxuZXhwb3J0IGVudW0gQVBJX1JFVFVSTl9NT0RFUyB7SEFTSCwgT0JKRUNUfVxyXG5cclxuXHJcbmV4cG9ydCBlbnVtIEVOVklST05NRU5UUyB7IExvY2FsLCBEZXYsIFN0YWcsIFByb2QgfVxyXG47XHJcblxyXG5leHBvcnQgZW51bSBMQU5HVUFHRVMgeyBBbWVyaWNhbkVuZ2xpc2ggfVxyXG47XHJcbmNsYXNzIERldmljZUluZm8ge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIG1vZGVsOiBzdHJpbmcsXHJcbiAgICAgICAgcHVibGljIGRldmljZVR5cGU6IHN0cmluZyxcclxuICAgICAgICBwdWJsaWMgb3M6IHN0cmluZyxcclxuICAgICAgICBwdWJsaWMgb3NWZXJzaW9uOiBzdHJpbmcsXHJcbiAgICAgICAgcHVibGljIHNka1ZlcnNpb246IHN0cmluZyxcclxuICAgICAgICBwdWJsaWMgbGFuZ3VhZ2U6IHN0cmluZyxcclxuICAgICAgICBwdWJsaWMgbWFudWZhY3R1cmVyOiBzdHJpbmcsXHJcbiAgICAgICAgcHVibGljIHV1aWQ6IHN0cmluZ1xyXG4gICAgKSB7IH1cclxufVxyXG5cclxuY2xhc3MgU2NyZWVuSW5mbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgaGVpZ2h0RElQczogbnVtYmVyLFxyXG4gICAgICAgIHB1YmxpYyBoZWlnaHRQaXhlbHM6IG51bWJlcixcclxuICAgICAgICBwdWJsaWMgc2NhbGU6IG51bWJlcixcclxuICAgICAgICBwdWJsaWMgd2lkdGhESVBzOiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIHdpZHRoUGl4ZWxzOiBudW1iZXJcclxuICAgICkgeyB9XHJcbn1cclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcclxuXHJcblxyXG4gICAgQE91dHB1dCgpIHBlclNpdGVDb25maWd1cmVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBwZXJTaXRlQ29uZmlndXJlZFRyYW5zbGF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgcGVyU2l0ZUNvbmZpZ3VyZWRBdXRoOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICAvL0VOVklST05NRU5UXHJcbiAgICBhcHA6IHN0cmluZztcclxuICAgIGVudjogbnVtYmVyO1xyXG4gICAgcGxhdGZvcm06IHN0cmluZztcclxuICAgIGxhbmc6IExhbmdDb2RlO1xyXG4gICAgZG9tYWluOiBzdHJpbmc7XHJcbiAgICBwcmVmaXg6IHN0cmluZztcclxuICAgIGRldmljZVVVSUQ6c3RyaW5nO1xyXG4gICAgc2l0ZW5hbWU6IHN0cmluZztcclxuICAgIENBUlRfRU5BQkxFRDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgaXNQZXJTaXRlQ29uZmlndXJlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGFwcGxpVmVyc2lvbjpzdHJpbmc7XHJcbiAgICB2ZXJzaW9uTnVtYmVyOnN0cmluZztcclxuICAgIHBhY2thZ2VOYW1lOnN0cmluZztcclxuICAgIHZlcnNpb25Db2RlOnN0cmluZztcclxuXHJcbiAgICBzaXRlQ29uZmlnU2VydmljZTogYW55ID0gbnVsbDtcclxuICAgIHZhbGlkYXRpb25NZXNzYWdlczogYW55ID0ge307XHJcblxyXG4gICAgYXBpVVJMOiBzdHJpbmc7XHJcbiAgICBzdGF0aWNVUkw6IHN0cmluZztcclxuICAgIHNlbGVjdE9wdGlvbnM6IHsgU2VsZWN0T3B0aW9uU2V0IH0gfCB7fSA9IHt9O1xyXG4gICAgYWN0aW9uQmFyUnVsZXM6IGFueSA9IHt9O1xyXG4gICAgYWN0aW9uQmFyQnV0dG9uczogeyBuYW1lOiBzdHJpbmcsIGljb246IHN0cmluZywgY29tcG9uZW50OiBzdHJpbmcsIHBhcmFtczogYW55LCBwb3B1cD86IG51bWJlciB9W10gPSBbXTtcclxuICAgIC8vUEFSQU1TXHJcblxyXG4gICAgLy9JTlRFUkZBQ0VcclxuICAgIEZMQVNIX01TR19USU1FT1VUOiBudW1iZXIgPSA2MDAwMDtcclxuXHJcbiAgICAvL0xBTkdcclxuICAgIHN1cHBvcnRlZExhbmd1YWdlczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcclxuXHJcbiAgICAvL0NVUlJFTkNJRVNcclxuICAgIHN1cHBvcnRlZEN1cnJlbmNpZXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgICB1c2VkQ3VycmVuY2llczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICBcIlVTRFwiOiBcIlVTIERvbGxhcnNcIixcclxuICAgICAgICBcIkVVUlwiOiBcIkV1cm9cIixcclxuICAgICAgICBcIkdCUFwiOiBcIkJyaXRpc2ggUG91bmRcIixcclxuICAgICAgICBcIkNBRFwiOiBcIkNhbmFkaWFuIERvbGxhcnNcIlxyXG4gICAgfTtcclxuICAgIGN1cnJlbmN5UmF0ZXNBcGk6IHN0cmluZyA9IFwiaHR0cDovL2FwaS5maXhlci5pby9sYXRlc3Q/YmFzZT1VU0Qmc3ltYm9scz1FVVIsR0JQLENBRFwiO1xyXG4gICAgZGVmYXVsdEN1cnJlbmN5UmF0ZXM6IHN0cmluZyA9ICd7XCJiYXNlXCI6XCJVU0RcIixcImRhdGVcIjpcIjIwMTYtMDMtMDhcIixcInJhdGVzXCI6e1wiQ0FEXCI6MS4zMzI1LFwiR0JQXCI6MC43MDM3NCxcIkVVUlwiOjAuOTA2Nzh9fSc7XHJcbiAgICByZW5ld0N1cnJlbmN5RmlsZUF0U3RhcnR1cDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGF2YWlsYWJsZURvbWFpbnM6IHsgW2tleTogc3RyaW5nXTogRG9tYWluRGVmaW5pdGlvbiB9O1xyXG5cclxuICAgIG1hdGNoaW5nRG9tYWluOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuXHJcbiAgICBjdXJyZW50QXBpRW50cnlwb2ludCA9IFwiXCI7XHJcblxyXG4gICAgTU9ERUxUWVBFUzogYW55O1xyXG5cclxuICAgIC8vSElTVE9SWVxyXG4gICAgaGlzdG9yeVR5cGVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIC8vVEhFTUVTXHJcbiAgICBjYXJlZXJzUGFnZUJhY2tncm91bmRzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gICAgLy9NQUlMXHJcbiAgICBhcHBseU1haWxTdWZmaXg6IHN0cmluZztcclxuXHJcbiAgICAvL0FVVEhcclxuICAgIHN0b3JlVXNlcklkOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAvL0FQSSBDT05GSUdcclxuICAgIEFQSV9USU1FT1VUOiBudW1iZXIgPSA1MDAwOyAvL3RpbWVvdXQgaW4gbXNcclxuICAgIEFQSV9OQl9SRVRSWTogbnVtYmVyID0gMDtcclxuICAgIEFQSU1PREVMS0VZUyA9IHt9O1xyXG4gICAgQVBJX1VTRV9FTlRJVFlfUFJFRklYID0ge307XHJcbiAgICBBUElfUkVUVVJOX01PREU6IFJldHVybk1vZGUgPSBBUElfUkVUVVJOX01PREVTLkhBU0g7Ly9IQVNIIE9SIE9CSkVDVFxyXG4gICAgZW50aXR5UHJlZml4ID0gbnVsbDtcclxuXHJcbiAgICAvL0NBQ0hFXHJcbiAgICBMSUJSQVJZX0VOQUJMRUQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgVVBEQVRFX0FGVEVSX0dFVDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBVUERBVEVfQUZURVJfUE9TVFBVVFBBVENIOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBjb3VudHJ5TGlzdCA9IHtcclxuICAgICAgICBcIkJEXCI6IFwiQmFuZ2xhZGVzaFwiLFxyXG4gICAgICAgIFwiQkVcIjogXCJCZWxnaXVtXCIsXHJcbiAgICAgICAgXCJCRlwiOiBcIkJ1cmtpbmEgRmFzb1wiLFxyXG4gICAgICAgIFwiQkdcIjogXCJCdWxnYXJpYVwiLFxyXG4gICAgICAgIFwiQkFcIjogXCJCb3NuaWEgYW5kIEhlcnplZ292aW5hXCIsXHJcbiAgICAgICAgXCJCQlwiOiBcIkJhcmJhZG9zXCIsXHJcbiAgICAgICAgXCJXRlwiOiBcIldhbGxpcyBhbmQgRnV0dW5hXCIsXHJcbiAgICAgICAgXCJCTFwiOiBcIlNhaW50IEJhcnRoZWxlbXlcIixcclxuICAgICAgICBcIkJNXCI6IFwiQmVybXVkYVwiLFxyXG4gICAgICAgIFwiQk5cIjogXCJCcnVuZWlcIixcclxuICAgICAgICBcIkJPXCI6IFwiQm9saXZpYVwiLFxyXG4gICAgICAgIFwiQkhcIjogXCJCYWhyYWluXCIsXHJcbiAgICAgICAgXCJCSVwiOiBcIkJ1cnVuZGlcIixcclxuICAgICAgICBcIkJKXCI6IFwiQmVuaW5cIixcclxuICAgICAgICBcIkJUXCI6IFwiQmh1dGFuXCIsXHJcbiAgICAgICAgXCJKTVwiOiBcIkphbWFpY2FcIixcclxuICAgICAgICBcIkJWXCI6IFwiQm91dmV0IElzbGFuZFwiLFxyXG4gICAgICAgIFwiQldcIjogXCJCb3Rzd2FuYVwiLFxyXG4gICAgICAgIFwiV1NcIjogXCJTYW1vYVwiLFxyXG4gICAgICAgIFwiQlFcIjogXCJCb25haXJlLCBTYWludCBFdXN0YXRpdXMgYW5kIFNhYmEgXCIsXHJcbiAgICAgICAgXCJCUlwiOiBcIkJyYXppbFwiLFxyXG4gICAgICAgIFwiQlNcIjogXCJCYWhhbWFzXCIsXHJcbiAgICAgICAgXCJKRVwiOiBcIkplcnNleVwiLFxyXG4gICAgICAgIFwiQllcIjogXCJCZWxhcnVzXCIsXHJcbiAgICAgICAgXCJCWlwiOiBcIkJlbGl6ZVwiLFxyXG4gICAgICAgIFwiUlVcIjogXCJSdXNzaWFcIixcclxuICAgICAgICBcIlJXXCI6IFwiUndhbmRhXCIsXHJcbiAgICAgICAgXCJSU1wiOiBcIlNlcmJpYVwiLFxyXG4gICAgICAgIFwiVExcIjogXCJFYXN0IFRpbW9yXCIsXHJcbiAgICAgICAgXCJSRVwiOiBcIlJldW5pb25cIixcclxuICAgICAgICBcIlRNXCI6IFwiVHVya21lbmlzdGFuXCIsXHJcbiAgICAgICAgXCJUSlwiOiBcIlRhamlraXN0YW5cIixcclxuICAgICAgICBcIlJPXCI6IFwiUm9tYW5pYVwiLFxyXG4gICAgICAgIFwiVEtcIjogXCJUb2tlbGF1XCIsXHJcbiAgICAgICAgXCJHV1wiOiBcIkd1aW5lYS1CaXNzYXVcIixcclxuICAgICAgICBcIkdVXCI6IFwiR3VhbVwiLFxyXG4gICAgICAgIFwiR1RcIjogXCJHdWF0ZW1hbGFcIixcclxuICAgICAgICBcIkdTXCI6IFwiU291dGggR2VvcmdpYSBhbmQgdGhlIFNvdXRoIFNhbmR3aWNoIElzbGFuZHNcIixcclxuICAgICAgICBcIkdSXCI6IFwiR3JlZWNlXCIsXHJcbiAgICAgICAgXCJHUVwiOiBcIkVxdWF0b3JpYWwgR3VpbmVhXCIsXHJcbiAgICAgICAgXCJHUFwiOiBcIkd1YWRlbG91cGVcIixcclxuICAgICAgICBcIkpQXCI6IFwiSmFwYW5cIixcclxuICAgICAgICBcIkdZXCI6IFwiR3V5YW5hXCIsXHJcbiAgICAgICAgXCJHR1wiOiBcIkd1ZXJuc2V5XCIsXHJcbiAgICAgICAgXCJHRlwiOiBcIkZyZW5jaCBHdWlhbmFcIixcclxuICAgICAgICBcIkdFXCI6IFwiR2VvcmdpYVwiLFxyXG4gICAgICAgIFwiR0RcIjogXCJHcmVuYWRhXCIsXHJcbiAgICAgICAgXCJHQlwiOiBcIlVuaXRlZCBLaW5nZG9tXCIsXHJcbiAgICAgICAgXCJHQVwiOiBcIkdhYm9uXCIsXHJcbiAgICAgICAgXCJTVlwiOiBcIkVsIFNhbHZhZG9yXCIsXHJcbiAgICAgICAgXCJHTlwiOiBcIkd1aW5lYVwiLFxyXG4gICAgICAgIFwiR01cIjogXCJHYW1iaWFcIixcclxuICAgICAgICBcIkdMXCI6IFwiR3JlZW5sYW5kXCIsXHJcbiAgICAgICAgXCJHSVwiOiBcIkdpYnJhbHRhclwiLFxyXG4gICAgICAgIFwiR0hcIjogXCJHaGFuYVwiLFxyXG4gICAgICAgIFwiT01cIjogXCJPbWFuXCIsXHJcbiAgICAgICAgXCJUTlwiOiBcIlR1bmlzaWFcIixcclxuICAgICAgICBcIkpPXCI6IFwiSm9yZGFuXCIsXHJcbiAgICAgICAgXCJIUlwiOiBcIkNyb2F0aWFcIixcclxuICAgICAgICBcIkhUXCI6IFwiSGFpdGlcIixcclxuICAgICAgICBcIkhVXCI6IFwiSHVuZ2FyeVwiLFxyXG4gICAgICAgIFwiSEtcIjogXCJIb25nIEtvbmdcIixcclxuICAgICAgICBcIkhOXCI6IFwiSG9uZHVyYXNcIixcclxuICAgICAgICBcIkhNXCI6IFwiSGVhcmQgSXNsYW5kIGFuZCBNY0RvbmFsZCBJc2xhbmRzXCIsXHJcbiAgICAgICAgXCJWRVwiOiBcIlZlbmV6dWVsYVwiLFxyXG4gICAgICAgIFwiUFJcIjogXCJQdWVydG8gUmljb1wiLFxyXG4gICAgICAgIFwiUFNcIjogXCJQYWxlc3RpbmlhbiBUZXJyaXRvcnlcIixcclxuICAgICAgICBcIlBXXCI6IFwiUGFsYXVcIixcclxuICAgICAgICBcIlBUXCI6IFwiUG9ydHVnYWxcIixcclxuICAgICAgICBcIlNKXCI6IFwiU3ZhbGJhcmQgYW5kIEphbiBNYXllblwiLFxyXG4gICAgICAgIFwiUFlcIjogXCJQYXJhZ3VheVwiLFxyXG4gICAgICAgIFwiSVFcIjogXCJJcmFxXCIsXHJcbiAgICAgICAgXCJQQVwiOiBcIlBhbmFtYVwiLFxyXG4gICAgICAgIFwiUEZcIjogXCJGcmVuY2ggUG9seW5lc2lhXCIsXHJcbiAgICAgICAgXCJQR1wiOiBcIlBhcHVhIE5ldyBHdWluZWFcIixcclxuICAgICAgICBcIlBFXCI6IFwiUGVydVwiLFxyXG4gICAgICAgIFwiUEtcIjogXCJQYWtpc3RhblwiLFxyXG4gICAgICAgIFwiUEhcIjogXCJQaGlsaXBwaW5lc1wiLFxyXG4gICAgICAgIFwiUE5cIjogXCJQaXRjYWlyblwiLFxyXG4gICAgICAgIFwiUExcIjogXCJQb2xhbmRcIixcclxuICAgICAgICBcIlBNXCI6IFwiU2FpbnQgUGllcnJlIGFuZCBNaXF1ZWxvblwiLFxyXG4gICAgICAgIFwiWk1cIjogXCJaYW1iaWFcIixcclxuICAgICAgICBcIkVIXCI6IFwiV2VzdGVybiBTYWhhcmFcIixcclxuICAgICAgICBcIkVFXCI6IFwiRXN0b25pYVwiLFxyXG4gICAgICAgIFwiRUdcIjogXCJFZ3lwdFwiLFxyXG4gICAgICAgIFwiWkFcIjogXCJTb3V0aCBBZnJpY2FcIixcclxuICAgICAgICBcIkVDXCI6IFwiRWN1YWRvclwiLFxyXG4gICAgICAgIFwiSVRcIjogXCJJdGFseVwiLFxyXG4gICAgICAgIFwiVk5cIjogXCJWaWV0bmFtXCIsXHJcbiAgICAgICAgXCJTQlwiOiBcIlNvbG9tb24gSXNsYW5kc1wiLFxyXG4gICAgICAgIFwiRVRcIjogXCJFdGhpb3BpYVwiLFxyXG4gICAgICAgIFwiU09cIjogXCJTb21hbGlhXCIsXHJcbiAgICAgICAgXCJaV1wiOiBcIlppbWJhYndlXCIsXHJcbiAgICAgICAgXCJTQVwiOiBcIlNhdWRpIEFyYWJpYVwiLFxyXG4gICAgICAgIFwiRVNcIjogXCJTcGFpblwiLFxyXG4gICAgICAgIFwiRVJcIjogXCJFcml0cmVhXCIsXHJcbiAgICAgICAgXCJNRVwiOiBcIk1vbnRlbmVncm9cIixcclxuICAgICAgICBcIk1EXCI6IFwiTW9sZG92YVwiLFxyXG4gICAgICAgIFwiTUdcIjogXCJNYWRhZ2FzY2FyXCIsXHJcbiAgICAgICAgXCJNRlwiOiBcIlNhaW50IE1hcnRpblwiLFxyXG4gICAgICAgIFwiTUFcIjogXCJNb3JvY2NvXCIsXHJcbiAgICAgICAgXCJNQ1wiOiBcIk1vbmFjb1wiLFxyXG4gICAgICAgIFwiVVpcIjogXCJVemJla2lzdGFuXCIsXHJcbiAgICAgICAgXCJNTVwiOiBcIk15YW5tYXJcIixcclxuICAgICAgICBcIk1MXCI6IFwiTWFsaVwiLFxyXG4gICAgICAgIFwiTU9cIjogXCJNYWNhb1wiLFxyXG4gICAgICAgIFwiTU5cIjogXCJNb25nb2xpYVwiLFxyXG4gICAgICAgIFwiTUhcIjogXCJNYXJzaGFsbCBJc2xhbmRzXCIsXHJcbiAgICAgICAgXCJNS1wiOiBcIk1hY2Vkb25pYVwiLFxyXG4gICAgICAgIFwiTVVcIjogXCJNYXVyaXRpdXNcIixcclxuICAgICAgICBcIk1UXCI6IFwiTWFsdGFcIixcclxuICAgICAgICBcIk1XXCI6IFwiTWFsYXdpXCIsXHJcbiAgICAgICAgXCJNVlwiOiBcIk1hbGRpdmVzXCIsXHJcbiAgICAgICAgXCJNUVwiOiBcIk1hcnRpbmlxdWVcIixcclxuICAgICAgICBcIk1QXCI6IFwiTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzXCIsXHJcbiAgICAgICAgXCJNU1wiOiBcIk1vbnRzZXJyYXRcIixcclxuICAgICAgICBcIk1SXCI6IFwiTWF1cml0YW5pYVwiLFxyXG4gICAgICAgIFwiSU1cIjogXCJJc2xlIG9mIE1hblwiLFxyXG4gICAgICAgIFwiVUdcIjogXCJVZ2FuZGFcIixcclxuICAgICAgICBcIlRaXCI6IFwiVGFuemFuaWFcIixcclxuICAgICAgICBcIk1ZXCI6IFwiTWFsYXlzaWFcIixcclxuICAgICAgICBcIk1YXCI6IFwiTWV4aWNvXCIsXHJcbiAgICAgICAgXCJJTFwiOiBcIklzcmFlbFwiLFxyXG4gICAgICAgIFwiRlJcIjogXCJGcmFuY2VcIixcclxuICAgICAgICBcIklPXCI6IFwiQnJpdGlzaCBJbmRpYW4gT2NlYW4gVGVycml0b3J5XCIsXHJcbiAgICAgICAgXCJTSFwiOiBcIlNhaW50IEhlbGVuYVwiLFxyXG4gICAgICAgIFwiRklcIjogXCJGaW5sYW5kXCIsXHJcbiAgICAgICAgXCJGSlwiOiBcIkZpamlcIixcclxuICAgICAgICBcIkZLXCI6IFwiRmFsa2xhbmQgSXNsYW5kc1wiLFxyXG4gICAgICAgIFwiRk1cIjogXCJNaWNyb25lc2lhXCIsXHJcbiAgICAgICAgXCJGT1wiOiBcIkZhcm9lIElzbGFuZHNcIixcclxuICAgICAgICBcIk5JXCI6IFwiTmljYXJhZ3VhXCIsXHJcbiAgICAgICAgXCJOTFwiOiBcIk5ldGhlcmxhbmRzXCIsXHJcbiAgICAgICAgXCJOT1wiOiBcIk5vcndheVwiLFxyXG4gICAgICAgIFwiTkFcIjogXCJOYW1pYmlhXCIsXHJcbiAgICAgICAgXCJWVVwiOiBcIlZhbnVhdHVcIixcclxuICAgICAgICBcIk5DXCI6IFwiTmV3IENhbGVkb25pYVwiLFxyXG4gICAgICAgIFwiTkVcIjogXCJOaWdlclwiLFxyXG4gICAgICAgIFwiTkZcIjogXCJOb3Jmb2xrIElzbGFuZFwiLFxyXG4gICAgICAgIFwiTkdcIjogXCJOaWdlcmlhXCIsXHJcbiAgICAgICAgXCJOWlwiOiBcIk5ldyBaZWFsYW5kXCIsXHJcbiAgICAgICAgXCJOUFwiOiBcIk5lcGFsXCIsXHJcbiAgICAgICAgXCJOUlwiOiBcIk5hdXJ1XCIsXHJcbiAgICAgICAgXCJOVVwiOiBcIk5pdWVcIixcclxuICAgICAgICBcIkNLXCI6IFwiQ29vayBJc2xhbmRzXCIsXHJcbiAgICAgICAgXCJYS1wiOiBcIktvc292b1wiLFxyXG4gICAgICAgIFwiQ0lcIjogXCJJdm9yeSBDb2FzdFwiLFxyXG4gICAgICAgIFwiQ0hcIjogXCJTd2l0emVybGFuZFwiLFxyXG4gICAgICAgIFwiQ09cIjogXCJDb2xvbWJpYVwiLFxyXG4gICAgICAgIFwiQ05cIjogXCJDaGluYVwiLFxyXG4gICAgICAgIFwiQ01cIjogXCJDYW1lcm9vblwiLFxyXG4gICAgICAgIFwiQ0xcIjogXCJDaGlsZVwiLFxyXG4gICAgICAgIFwiQ0NcIjogXCJDb2NvcyBJc2xhbmRzXCIsXHJcbiAgICAgICAgXCJDQVwiOiBcIkNhbmFkYVwiLFxyXG4gICAgICAgIFwiQ0dcIjogXCJSZXB1YmxpYyBvZiB0aGUgQ29uZ29cIixcclxuICAgICAgICBcIkNGXCI6IFwiQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljXCIsXHJcbiAgICAgICAgXCJDRFwiOiBcIkRlbW9jcmF0aWMgUmVwdWJsaWMgb2YgdGhlIENvbmdvXCIsXHJcbiAgICAgICAgXCJDWlwiOiBcIkN6ZWNoIFJlcHVibGljXCIsXHJcbiAgICAgICAgXCJDWVwiOiBcIkN5cHJ1c1wiLFxyXG4gICAgICAgIFwiQ1hcIjogXCJDaHJpc3RtYXMgSXNsYW5kXCIsXHJcbiAgICAgICAgXCJDUlwiOiBcIkNvc3RhIFJpY2FcIixcclxuICAgICAgICBcIkNXXCI6IFwiQ3VyYWNhb1wiLFxyXG4gICAgICAgIFwiQ1ZcIjogXCJDYXBlIFZlcmRlXCIsXHJcbiAgICAgICAgXCJDVVwiOiBcIkN1YmFcIixcclxuICAgICAgICBcIlNaXCI6IFwiU3dhemlsYW5kXCIsXHJcbiAgICAgICAgXCJTWVwiOiBcIlN5cmlhXCIsXHJcbiAgICAgICAgXCJTWFwiOiBcIlNpbnQgTWFhcnRlblwiLFxyXG4gICAgICAgIFwiS0dcIjogXCJLeXJneXpzdGFuXCIsXHJcbiAgICAgICAgXCJLRVwiOiBcIktlbnlhXCIsXHJcbiAgICAgICAgXCJTU1wiOiBcIlNvdXRoIFN1ZGFuXCIsXHJcbiAgICAgICAgXCJTUlwiOiBcIlN1cmluYW1lXCIsXHJcbiAgICAgICAgXCJLSVwiOiBcIktpcmliYXRpXCIsXHJcbiAgICAgICAgXCJLSFwiOiBcIkNhbWJvZGlhXCIsXHJcbiAgICAgICAgXCJLTlwiOiBcIlNhaW50IEtpdHRzIGFuZCBOZXZpc1wiLFxyXG4gICAgICAgIFwiS01cIjogXCJDb21vcm9zXCIsXHJcbiAgICAgICAgXCJTVFwiOiBcIlNhbyBUb21lIGFuZCBQcmluY2lwZVwiLFxyXG4gICAgICAgIFwiU0tcIjogXCJTbG92YWtpYVwiLFxyXG4gICAgICAgIFwiS1JcIjogXCJTb3V0aCBLb3JlYVwiLFxyXG4gICAgICAgIFwiU0lcIjogXCJTbG92ZW5pYVwiLFxyXG4gICAgICAgIFwiS1BcIjogXCJOb3J0aCBLb3JlYVwiLFxyXG4gICAgICAgIFwiS1dcIjogXCJLdXdhaXRcIixcclxuICAgICAgICBcIlNOXCI6IFwiU2VuZWdhbFwiLFxyXG4gICAgICAgIFwiU01cIjogXCJTYW4gTWFyaW5vXCIsXHJcbiAgICAgICAgXCJTTFwiOiBcIlNpZXJyYSBMZW9uZVwiLFxyXG4gICAgICAgIFwiU0NcIjogXCJTZXljaGVsbGVzXCIsXHJcbiAgICAgICAgXCJLWlwiOiBcIkthemFraHN0YW5cIixcclxuICAgICAgICBcIktZXCI6IFwiQ2F5bWFuIElzbGFuZHNcIixcclxuICAgICAgICBcIlNHXCI6IFwiU2luZ2Fwb3JlXCIsXHJcbiAgICAgICAgXCJTRVwiOiBcIlN3ZWRlblwiLFxyXG4gICAgICAgIFwiU0RcIjogXCJTdWRhblwiLFxyXG4gICAgICAgIFwiRE9cIjogXCJEb21pbmljYW4gUmVwdWJsaWNcIixcclxuICAgICAgICBcIkRNXCI6IFwiRG9taW5pY2FcIixcclxuICAgICAgICBcIkRKXCI6IFwiRGppYm91dGlcIixcclxuICAgICAgICBcIkRLXCI6IFwiRGVubWFya1wiLFxyXG4gICAgICAgIFwiVkdcIjogXCJCcml0aXNoIFZpcmdpbiBJc2xhbmRzXCIsXHJcbiAgICAgICAgXCJERVwiOiBcIkdlcm1hbnlcIixcclxuICAgICAgICBcIllFXCI6IFwiWWVtZW5cIixcclxuICAgICAgICBcIkRaXCI6IFwiQWxnZXJpYVwiLFxyXG4gICAgICAgIFwiVVNcIjogXCJVbml0ZWQgU3RhdGVzXCIsXHJcbiAgICAgICAgXCJVWVwiOiBcIlVydWd1YXlcIixcclxuICAgICAgICBcIllUXCI6IFwiTWF5b3R0ZVwiLFxyXG4gICAgICAgIFwiVU1cIjogXCJVbml0ZWQgU3RhdGVzIE1pbm9yIE91dGx5aW5nIElzbGFuZHNcIixcclxuICAgICAgICBcIkxCXCI6IFwiTGViYW5vblwiLFxyXG4gICAgICAgIFwiTENcIjogXCJTYWludCBMdWNpYVwiLFxyXG4gICAgICAgIFwiTEFcIjogXCJMYW9zXCIsXHJcbiAgICAgICAgXCJUVlwiOiBcIlR1dmFsdVwiLFxyXG4gICAgICAgIFwiVFdcIjogXCJUYWl3YW5cIixcclxuICAgICAgICBcIlRUXCI6IFwiVHJpbmlkYWQgYW5kIFRvYmFnb1wiLFxyXG4gICAgICAgIFwiVFJcIjogXCJUdXJrZXlcIixcclxuICAgICAgICBcIkxLXCI6IFwiU3JpIExhbmthXCIsXHJcbiAgICAgICAgXCJMSVwiOiBcIkxpZWNodGVuc3RlaW5cIixcclxuICAgICAgICBcIkxWXCI6IFwiTGF0dmlhXCIsXHJcbiAgICAgICAgXCJUT1wiOiBcIlRvbmdhXCIsXHJcbiAgICAgICAgXCJMVFwiOiBcIkxpdGh1YW5pYVwiLFxyXG4gICAgICAgIFwiTFVcIjogXCJMdXhlbWJvdXJnXCIsXHJcbiAgICAgICAgXCJMUlwiOiBcIkxpYmVyaWFcIixcclxuICAgICAgICBcIkxTXCI6IFwiTGVzb3Rob1wiLFxyXG4gICAgICAgIFwiVEhcIjogXCJUaGFpbGFuZFwiLFxyXG4gICAgICAgIFwiVEZcIjogXCJGcmVuY2ggU291dGhlcm4gVGVycml0b3JpZXNcIixcclxuICAgICAgICBcIlRHXCI6IFwiVG9nb1wiLFxyXG4gICAgICAgIFwiVERcIjogXCJDaGFkXCIsXHJcbiAgICAgICAgXCJUQ1wiOiBcIlR1cmtzIGFuZCBDYWljb3MgSXNsYW5kc1wiLFxyXG4gICAgICAgIFwiTFlcIjogXCJMaWJ5YVwiLFxyXG4gICAgICAgIFwiVkFcIjogXCJWYXRpY2FuXCIsXHJcbiAgICAgICAgXCJWQ1wiOiBcIlNhaW50IFZpbmNlbnQgYW5kIHRoZSBHcmVuYWRpbmVzXCIsXHJcbiAgICAgICAgXCJBRVwiOiBcIlVuaXRlZCBBcmFiIEVtaXJhdGVzXCIsXHJcbiAgICAgICAgXCJBRFwiOiBcIkFuZG9ycmFcIixcclxuICAgICAgICBcIkFHXCI6IFwiQW50aWd1YSBhbmQgQmFyYnVkYVwiLFxyXG4gICAgICAgIFwiQUZcIjogXCJBZmdoYW5pc3RhblwiLFxyXG4gICAgICAgIFwiQUlcIjogXCJBbmd1aWxsYVwiLFxyXG4gICAgICAgIFwiVklcIjogXCJVLlMuIFZpcmdpbiBJc2xhbmRzXCIsXHJcbiAgICAgICAgXCJJU1wiOiBcIkljZWxhbmRcIixcclxuICAgICAgICBcIklSXCI6IFwiSXJhblwiLFxyXG4gICAgICAgIFwiQU1cIjogXCJBcm1lbmlhXCIsXHJcbiAgICAgICAgXCJBTFwiOiBcIkFsYmFuaWFcIixcclxuICAgICAgICBcIkFPXCI6IFwiQW5nb2xhXCIsXHJcbiAgICAgICAgXCJBUVwiOiBcIkFudGFyY3RpY2FcIixcclxuICAgICAgICBcIkFTXCI6IFwiQW1lcmljYW4gU2Ftb2FcIixcclxuICAgICAgICBcIkFSXCI6IFwiQXJnZW50aW5hXCIsXHJcbiAgICAgICAgXCJBVVwiOiBcIkF1c3RyYWxpYVwiLFxyXG4gICAgICAgIFwiQVRcIjogXCJBdXN0cmlhXCIsXHJcbiAgICAgICAgXCJBV1wiOiBcIkFydWJhXCIsXHJcbiAgICAgICAgXCJJTlwiOiBcIkluZGlhXCIsXHJcbiAgICAgICAgXCJBWFwiOiBcIkFsYW5kIElzbGFuZHNcIixcclxuICAgICAgICBcIkFaXCI6IFwiQXplcmJhaWphblwiLFxyXG4gICAgICAgIFwiSUVcIjogXCJJcmVsYW5kXCIsXHJcbiAgICAgICAgXCJJRFwiOiBcIkluZG9uZXNpYVwiLFxyXG4gICAgICAgIFwiVUFcIjogXCJVa3JhaW5lXCIsXHJcbiAgICAgICAgXCJRQVwiOiBcIlFhdGFyXCIsXHJcbiAgICAgICAgXCJNWlwiOiBcIk1vemFtYmlxdWVcIlxyXG4gICAgfTtcclxuZGV2aWNlSW5mb3JtYXRpb246YW55O1xyXG5zY3JlZW5JbmZvcm1hdGlvbjphbnk7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmRldmljZUluZm9ybWF0aW9uID0gbmV3IERldmljZUluZm8oXHJcbiAgICAgICAgICAgIGRldmljZS5tb2RlbCxcclxuICAgICAgICAgICAgZGV2aWNlLm1vZGVsLFxyXG4gICAgICAgICAgICBkZXZpY2Uub3MsXHJcbiAgICAgICAgICAgIGRldmljZS5vc1ZlcnNpb24sXHJcbiAgICAgICAgICAgIGRldmljZS5zZGtWZXJzaW9uLFxyXG4gICAgICAgICAgICBkZXZpY2UubGFuZ3VhZ2UsXHJcbiAgICAgICAgICAgIGRldmljZS5tYW51ZmFjdHVyZXIsXHJcbiAgICAgICAgICAgIGRldmljZS51dWlkKTtcclxuICAgICAgICB0aGlzLnNjcmVlbkluZm9ybWF0aW9uID0gbmV3IFNjcmVlbkluZm8oXHJcbiAgICAgICAgICAgIHNjcmVlbi5tYWluU2NyZWVuLmhlaWdodERJUHMsXHJcbiAgICAgICAgICAgIHNjcmVlbi5tYWluU2NyZWVuLmhlaWdodFBpeGVscyxcclxuICAgICAgICAgICAgc2NyZWVuLm1haW5TY3JlZW4uc2NhbGUsXHJcbiAgICAgICAgICAgIHNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcyxcclxuICAgICAgICAgICAgc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhQaXhlbHMpO1xyXG5cclxuXHJcbiAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVycygpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25maWd1cmUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIrIENvbmZpZ1NlcnZpY2UgPiBjb25maWd1cmVcIik7XHJcblxyXG4gICAgICAgIC8vdGhpcy5idWlsZEFwaUtleXMoKTtcclxuICAgICAgICB0aGlzLnNldExhbmd1YWdlKCk7XHJcbiAgICAgICAgLy90aGlzLmJ1aWxkU2VsZWN0T3B0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuc2V0U2hvd0NvbnNvbGUoKTtcclxuICAgICAgICAvL3RoaXMuYnVpbGRBY3Rpb25CYXJSdWxlcygpO1xyXG4gICAgICAgIC8vdGhpcy5idWlsZEhpc3RvcnlUeXBlcygpO1xyXG4gICAgICAgIHRoaXMuYXBwbHlNYWlsU3VmZml4ID0gXCJAYXBwbHlcIiArICh0aGlzLmVudiA9PT0gRU5WSVJPTk1FTlRTLlByb2QgPyBcIlwiIDogXCIuZGV2XCIpICsgXCIuaGlyZXRvbi5jb21cIjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTaG93Q29uc29sZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0TW9kZWxUeXBlcyhNVCkge1xyXG4gICAgICAgIHRoaXMuTU9ERUxUWVBFUyA9IE1UO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRyYW5zbGF0aW9uRmlsZVBhdGhzKGxhbmdDb2RlOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgaWYgKCFsYW5nQ29kZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgdGhpcy5zdGF0aWNVUkwgKyBcIi9sb2NhbGVzL1wiICsgbGFuZ0NvZGUgKyBcIi9cIiArIHRoaXMuc2l0ZW5hbWUgKyBcIi1jb21tb24uanNvblwiLFxyXG4gICAgICAgICAgICB0aGlzLnN0YXRpY1VSTCArIFwiL2xvY2FsZXMvXCIgKyBsYW5nQ29kZSArIFwiL1wiICsgdGhpcy5zaXRlbmFtZSArIFwiLVwiICsgdGhpcy5hcHAgKyBcIi5qc29uXCJdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEVudGl0eVByZWZpeChlKSB7XHJcbiAgICAgICAgdGhpcy5lbnRpdHlQcmVmaXggPSBlO1xyXG4gICAgfVxyXG4gICAgc2V0RW52aXJvbm1lbnQoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHN1ZmZpeGVzOiBzdHJpbmdbXSA9IFtcImxvY2FsLlwiLCBcImRldi5cIiwgXCJzdGFnLlwiLCBcIlwiXTtcclxuICAgICAgICBsZXQgRU5WTkFNRVM6IHN0cmluZ1tdID0gW1wiTE9DQUxcIiwgXCJERVZcIiwgXCJTVEFHXCIsIFwiUFJPRFwiXTtcclxuICAgICAgICBsZXQgdSA9IGxvY2F0aW9uLmhvc3Q7XHJcbiAgICAgICAgdGhpcy5kZXZpY2VVVUlEPWRldmljZS51dWlkOy8vdGhpcy5kZXZpY2UudXVpZDtcclxuICAgICAgICBpZiAoIXRoaXMuaXNNb2JpbGVEZXZpY2UoKSkge1xyXG4gICAgICAgICAgICBpZiAodS5pbmRleE9mKFwibG9jYWxob3N0XCIpID4gLTEpIHRoaXMuZW52ID0gRU5WSVJPTk1FTlRTLkxvY2FsO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh1LmluZGV4T2YoXCIubG9jYWwuXCIpID4gLTEpIHRoaXMuZW52ID0gRU5WSVJPTk1FTlRTLkxvY2FsO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh1LmluZGV4T2YoXCIuZGV2LlwiKSA+IC0xKSB0aGlzLmVudiA9IEVOVklST05NRU5UUy5EZXY7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHUuaW5kZXhPZihcIi5zdGFnLlwiKSA+IC0xKSB0aGlzLmVudiA9IEVOVklST05NRU5UUy5TdGFnO1xyXG4gICAgICAgICAgICBlbHNlIHRoaXMuZW52ID0gRU5WSVJPTk1FTlRTLlByb2Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1dWlkPVwiLCB0aGlzLmRldmljZVVVSUQsXCJyZWY9MTQ1ZWYwMjY5MDY2YzhkNCBlcXVhbD9cIix0aGlzLmRldmljZVVVSUQ9PVwiMTQ1ZWYwMjY5MDY2YzhkNFwiKTtcclxuICAgICAgICAgICAgaWYodGhpcy5kZXZpY2VVVUlEPT1cIjE0NWVmMDI2OTA2NmM4ZDRcIilcclxuICAgICAgICAgICAgICAgIHRoaXMuZW52ID0gRU5WSVJPTk1FTlRTLkRldjtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbnYgPSBFTlZJUk9OTUVOVFMuUHJvZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFTlY9XCIsIEVOVk5BTUVTW3RoaXMuZW52XSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJlZml4ID0gc3VmZml4ZXNbdGhpcy5lbnZdO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXRmb3JtID09PSBcImlvc1wiIHx8IHRoaXMucGxhdGZvcm0gPT09IFwiYW5kcm9pZFwiKVxyXG4gICAgICAgICAgICB0aGlzLnByZWZpeCA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGFyYW1ldGVycygpIHtcclxuICAgICAgICB0aGlzLnNldFBsYXRmb3JtKCk7XHJcbiAgICAgICAgdGhpcy5zZXRFbnZpcm9ubWVudCgpO1xyXG4gICAgICAgIHRoaXMuc2V0RG9tYWluKCk7XHJcbiAgICAgICAgdGhpcy5zZXRVUkxzKCk7XHJcbiAgICAgICAgaWYodGhpcy5pc01vYmlsZURldmljZSgpKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEFwcFZlcnNpb24uZ2V0VmVyc2lvbk5hbWUoKS50aGVuKCh2OiBzdHJpbmcpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbGlWZXJzaW9uID0gdjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIEFwcFZlcnNpb24uZ2V0VmVyc2lvbkNvZGUoKS50aGVuKCAgICh2KT0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnNpb25Db2RlID0gdjtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBBcHBWZXJzaW9uLmdldEFwcElkKCkudGhlbihmdW5jdGlvbihpZCkge1xyXG4gdGhpcy5hcHBJZD1pZCB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGxhdGZvcm0oKSB7XHJcblxyXG4gICAgICAgIGxldCBtZXNzYWdlID0gXCJcIjtcclxuICAgICAgICBpZiAoaXNBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgdGhpcy5wbGF0Zm9ybT1cImFuZHJvaWRcIlxyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNJT1MpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF0Zm9ybT1cImlvc1wiXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucGxhdGZvcm09XCJvdGhlclwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhbGVydChtZXNzYWdlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBMQVRGT1JNPVwiLCB0aGlzLnBsYXRmb3JtKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRVUkxzKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAvL3RoaXMuY29uc29sZVNlcnZpY2UubG9nKFwiQ29uZmlnU2VydmljZSBzZXRVUkxzIHByZWZcIiwgdGhpcy5wcmVmaXgsXCJkb209XCIsIHRoaXMuZG9tYWluKTtcclxuICAgICAgICBsZXQgYXBpU3VmZml4PVwiL2xhdGVzdC9cIjtcclxuICAgICAgICBpZiAodGhpcy5pc01vYmlsZURldmljZSgpKSB7XHJcbiAgICAgICAgICAgIC8vREVCVUcgTU9CSUxFIE9OIFNUQUcgQVBJXHJcbiAgICAgICAgICAgIGlmKHRoaXMuZW52ID09IEVOVklST05NRU5UUy5EZXYpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwaVVSTD0gXCJodHRwOi8vMTkyLjE2OC4wLjE2OjgwMzBcIithcGlTdWZmaXg7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZW52ID09IEVOVklST05NRU5UUy5TdGFnKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcGlVUkwgPSBcImh0dHA6Ly9hcGkuc3RhZy5cIiArIHRoaXMuZG9tYWluICthcGlTdWZmaXg7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBpVVJMID0gXCJodHRwOi8vYXBpLlwiICsgdGhpcy5kb21haW4gK2FwaVN1ZmZpeDtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGxvY2F0aW9uLmhvc3QuaW5kZXhPZihcImxvY2FsaG9zdFwiKT4tMSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBpVVJMID0gXCJodHRwOi8vYXBpLmxvY2FsLlwiICsgdGhpcy5kb21haW4gK2FwaVN1ZmZpeDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcGlVUkwgPSBcImh0dHA6Ly9hcGkuXCIgKyB0aGlzLnByZWZpeCArIHRoaXMuZG9tYWluICsgYXBpU3VmZml4XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGljVVJMKVxyXG4gICAgICAgIC8vdGhpcy5zdGF0aWNVUkwgPSBcImh0dHA6Ly9zdGF0aWMuXCIgKyB0aGlzLnByZWZpeCArIHRoaXMuZG9tYWluO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRpY1VSTCA9IFwiaHR0cDovL3N0YXRpYy5cIiArIHRoaXMucHJlZml4ICsgXCJoaXJldG9uLmNvbVwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQVBJVVJMXCIsIHRoaXMuYXBpVVJMKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbmZpZ1NlcnZpY2Ugc2V0VVJMcyBwcmVmaXg9XCIsIHRoaXMucHJlZml4LCBcImRvbT1cIiwgdGhpcy5kb21haW4sIFwiIGFwaT1cIiwgdGhpcy5hcGlVUkwpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpc01vYmlsZURldmljZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc01vYmlsZUFwcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFwaVVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLmFwaVVSTClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBpVVJMO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkFwaSBVUkwgTm90IHNldFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpc01vYmlsZUFwcCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGF0Zm9ybSA9PT0gXCJpb3NcIiB8fCB0aGlzLnBsYXRmb3JtID09PSBcImFuZHJvaWRcIjtcclxuICAgIH1cclxuXHJcbiAgICBzZXREb21haW4oKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZXQgZG9tYWluXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzTW9iaWxlQXBwKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5kb21haW4gPSBcImhpcmV0b24uY29tXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB1OiBzdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XHJcbiAgICAgICAgbGV0IGRvbWFpblBhcnRzID0gdS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgbGV0IG4gPSBkb21haW5QYXJ0cy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKG4gPiAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tYWluID0gZG9tYWluUGFydHNbbiAtIDJdICsgXCIuXCIgKyBkb21haW5QYXJ0c1tuIC0gMV1cclxuICAgICAgICAgICAgLyogbGV0IGZvdW5kIDpib29sZWFuPSBmYWxzZTtcclxuICAgICAgICAgICAgIGZvciAodmFyIGRvbSBpbiB0aGlzLmF2YWlsYWJsZURvbWFpbnMpIHtcclxuICAgICAgICAgICAgIGlmICh1LmluZGV4T2YoZG9tKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICB0aGlzLmRvbWFpbiA9IGRvbTtcclxuICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZXREb21haW4gaHJlZj1cIiwgdSwgXCJkb21haW49XCIsIHRoaXMuZG9tYWluKTtcclxuICAgICAgICAgICAgIGlmICghZm91bmQpIHtcclxuICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEb21haW4gbm90IGZvdW5kIGZyb20gaHJlZlwiLCB1KTtcclxuICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRG9tYWluIGhhcyBsZXNzIHRoYW4gMyBjb21wb25lbnRzXCIsIHUpO1xyXG4gICAgICAgICAgICB0aGlzLmRvbWFpbiA9IFwiaGlyZXRvbi5jb21cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXJsKGluY2x1ZGVTdWJkb21haW4/OiBib29sZWFuKSB7XHJcbiAgICAgICAgcmV0dXJuIChpbmNsdWRlU3ViZG9tYWluID8gdGhpcy5hcHAgOiBcIlwiKSArIHRoaXMucHJlZml4ICsgdGhpcy5kb21haW47XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZVByb2RNb2RlSWZOZWNlc3NhcnkoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW52ID09PSBFTlZJUk9OTUVOVFMuUHJvZClcclxuICAgICAgICAgICAgZW5hYmxlUHJvZE1vZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRMYW5ndWFnZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNldExhbmd1YWdlXCIsIHRoaXMuZG9tYWluLCB0aGlzLmF2YWlsYWJsZURvbWFpbnMpO1xyXG4gICAgICAgIGlmICh0aGlzLmRvbWFpbiBpbiB0aGlzLmF2YWlsYWJsZURvbWFpbnMpXHJcbiAgICAgICAgICAgIHRoaXMubGFuZyA9IHRoaXMuYXZhaWxhYmxlRG9tYWluc1t0aGlzLmRvbWFpbl0uZGVmYXVsdExhbmd1YWdlO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBmaW5kIGRvbWFpblwiLCB0aGlzLmRvbWFpbiwgXCJ0byBhdmFpbGFibGUgZG9tYWluc1wiLCB0aGlzLmF2YWlsYWJsZURvbWFpbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgZ2V0QWN0aW9uQmFyKGlkOnN0cmluZywgcm91dGVQYXJhbXM6YW55KTpPcHRpb25zQmFyQ29uZmlnIHtcclxuICAgICBpZiAoIShpZCBpbiB0aGlzLmFjdGlvbkJhclJ1bGVzKSkge1xyXG4gICAgIGNvbnNvbGUud2FybihcImlkXCIsIGlkLCBcIm5vdCBmb3VuZCBpbiBhY3Rpb25CYXJSdWxlc1wiLCB0aGlzLmFjdGlvbkJhclJ1bGVzKTtcclxuICAgICByZXR1cm4gbmV3IE9wdGlvbnNCYXJDb25maWcoW10pO1xyXG4gICAgIH1cclxuICAgICB2YXIgYWN0aW9uQmFyQnV0dG9uTGlzdCA9IHRoaXMuYWN0aW9uQmFyUnVsZXNbaWRdO1xyXG4gICAgIHZhciByZXM6T3B0aW9uc0Jhckl0ZW1bXSA9IFtdO1xyXG4gICAgIGZvciAodmFyIGkgPSAwLCBuID0gYWN0aW9uQmFyQnV0dG9uTGlzdC5sZW5ndGg7IGkgPCBuOyArK2kpIHtcclxuICAgICBsZXQgYWN0aW9uQmFyQnV0dG9uID0gYWN0aW9uQmFyQnV0dG9uTGlzdFtpXTtcclxuICAgICBpZiAoYWN0aW9uQmFyQnV0dG9uKSB7XHJcbiAgICAgbGV0IHBhcmFtcyA9IGFjdGlvbkJhckJ1dHRvbi5wYXJhbXMgfHwgW107XHJcbiAgICAgbGV0IGxvYWRlZFBhcmFtcyA9IHt9XHJcbiAgICAgZm9yICh2YXIgaiA9IDAsIG0gPSBwYXJhbXMubGVuZ3RoOyBqIDwgbTsgKytqKSB7XHJcbiAgICAgbGV0IHByb3AgPSBwYXJhbXNbal07XHJcbiAgICAgbG9hZGVkUGFyYW1zW3Byb3BdID0gcm91dGVQYXJhbXNbcHJvcF07XHJcbiAgICAgfVxyXG5cclxuICAgICBsZXQgbGluaz1hY3Rpb25CYXJCdXR0b24ubGluaztcclxuICAgICB2YXIgbyA9IG5ldyBPcHRpb25zQmFySXRlbShhY3Rpb25CYXJCdXR0b24ubmFtZSwgYWN0aW9uQmFyQnV0dG9uLmljb24sIFthY3Rpb25CYXJCdXR0b24uY29tcG9uZW50LCBsb2FkZWRQYXJhbXNdKTtcclxuICAgICByZXMucHVzaChvKTtcclxuICAgICB9IGVsc2Uge1xyXG4gICAgIGNvbnNvbGUuZXJyb3IoXCJubyBhY3Rpb25iYXJidXR0b25cIik7XHJcbiAgICAgfVxyXG5cclxuICAgICB9XHJcbiAgICAgcmV0dXJuIG5ldyBPcHRpb25zQmFyQ29uZmlnKHJlcyk7XHJcbiAgICAgfSoqL1xyXG4gICAgLypcclxuICAgICBnZXRBY3Rpb25CYXIyKGFjdGlvbkJhckJ1dHRvbkxpc3Q6bnVtYmVyW10sIHJvdXRlUGFyYW1zOmFueSk6T3B0aW9uc0JhckNvbmZpZyB7XHJcbiAgICAgY29uc29sZS5sb2coXCJnZXRBY3Rpb25CYXIyXCIsYWN0aW9uQmFyQnV0dG9uTGlzdCxyb3V0ZVBhcmFtcyk7XHJcbiAgICAgdmFyIHJlczpPcHRpb25zQmFySXRlbVtdID0gW107XHJcbiAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBhY3Rpb25CYXJCdXR0b25MaXN0Lmxlbmd0aDsgaSA8IG47ICsraSkge1xyXG4gICAgIGxldCBhY3Rpb25CYXJCdXR0b24gPSB0aGlzLmFjdGlvbkJhckJ1dHRvbnNbYWN0aW9uQmFyQnV0dG9uTGlzdFtpXV07XHJcbiAgICAgaWYgKCFhY3Rpb25CYXJCdXR0b24pIHtcclxuICAgICBjb25zb2xlLmVycm9yKFwibm8gYWN0aW9uYmFyYnV0dG9uXCIpO1xyXG4gICAgIH0gZWxzZSB7XHJcbiAgICAgbGV0IHBhcmFtcyA9IGFjdGlvbkJhckJ1dHRvbi5wYXJhbXMgfHwgW107XHJcbiAgICAgbGV0IGxvYWRlZFBhcmFtcyA9IHt9O1xyXG4gICAgIGZvciAodmFyIGogPSAwLCBtID0gcGFyYW1zLmxlbmd0aDsgaiA8IG07ICsraikge1xyXG4gICAgIGxldCBwcm9wID0gcGFyYW1zW2pdO1xyXG4gICAgIGlmICh0eXBlb2Ygcm91dGVQYXJhbXNbcHJvcF0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICBsb2FkZWRQYXJhbXNbcHJvcF0gPSByb3V0ZVBhcmFtc1twcm9wXTtcclxuICAgICB9IGVsc2Uge1xyXG4gICAgIGNvbnNvbGUuZXJyb3IoXCJBQ1RJT04gQkFSID1cIiwgYWN0aW9uQmFyQnV0dG9uLCBcIiBQQVJBTSBJTlZBTElEID1cIiwgcm91dGVQYXJhbXNbcHJvcF0sIHJvdXRlUGFyYW1zLHByb3ApO1xyXG4gICAgIGxvYWRlZFBhcmFtc1twcm9wXSA9IG51bGw7XHJcbiAgICAgfVxyXG4gICAgIH1cclxuXHJcbiAgICAgdmFyIG8gPSBuZXcgT3B0aW9uc0Jhckl0ZW0oYWN0aW9uQmFyQnV0dG9uLm5hbWUsIGFjdGlvbkJhckJ1dHRvbi5pY29uLCBhY3Rpb25CYXJCdXR0b24ubGluaywgYWN0aW9uQmFyQnV0dG9uLnBvcHVwKTtcclxuICAgICByZXMucHVzaChvKTtcclxuXHJcbiAgICAgfVxyXG4gICAgIH1cclxuICAgICByZXR1cm4gbmV3IE9wdGlvbnNCYXJDb25maWcocmVzKTtcclxuICAgICB9XHJcbiAgICAgKi9cclxuXHJcbiAgICBnZXRTZWxlY3RPcHRpb25zKGlkOiBzdHJpbmcpOiBTZWxlY3RPcHRpb25TZXQge1xyXG4gICAgICAgIGlmIChpZCBpbiB0aGlzLnNlbGVjdE9wdGlvbnMpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdE9wdGlvbnNbaWRdO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmV0Y2hpbmcgc2VsZWN0T3B0aW9uc1wiLCBpZCwgXCIgYnV0IG5vdCBkZWZpbmVkIGluIGNvbmZpZyBTZXJ2aWNlXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNlbGVjdE9wdGlvblNldCh7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=
