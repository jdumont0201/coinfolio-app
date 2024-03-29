import {Injectable, Output} from "@angular/core"
import {RequestService} from "../../globalton/core/services/request.service";
import {HttpHeaders} from "@angular/common/http"

import {RestangularModule, Restangular} from 'ngx-restangular';

import {ConfigService} from "../../globalton/core/services/config.service";
import {ConsoleService} from "../../globalton/core/services/console.service";
import {ApiService} from "../../globalton/core/services/api.service";
import {AuthService} from "../../globalton/core/services/auth.service";
import {Logic} from "../../../logic/Logic";

@Injectable()
export class AppConfigService {

  webapiUrl = "ec2-52-211-151-57.eu-west-1.compute.amazonaws.com:3000"

  constructor(public configService: ConfigService, public consoleService: ConsoleService, public apiService: ApiService, public authService: AuthService, public logic: Logic) {
    this.valuesandglobal.push.apply(this.valuesandglobal, this.values)
    this.apiService.setApiUrl("http://ec2-52-211-151-57.eu-west-1.compute.amazonaws.com:3000/api/");
    this.consoleService.serv("+ AppConfigService");
    this.configService.app = "comeoncoins"
    this.configService.perSiteConfigured.emit({"type": "general"})

    this.logic.readSubscription((res) => {
      console.log("expiration", res)
      this.authService.paymentExpiration = res.expiration;
      console.log("active", this.authService.isSubscriptionActive(), this.authService.authenticated, this.authService.paymentExpiration, this.authService.paymentExpiration > new Date().getTime() / 1000)
    })
  }

  values = ["BTC", "ETH", "BCH", "XRP", "DASH", "XMR", "LTC", "ZEC"]
  valuesandglobal = ["GLOBAL"]
  formats=["chart","numeric"]
  names = {
    GLOBA: "Global",
    BTC: "Bitcoin",
    "ETH": "Ethereum",
    "BCH": "Bitcoin Cash",
    "XRP": "Ripple",
    "DASH": "Dash",
    "XMR": "Monero",
    "LTC": "LiteCoin",
    "ZEC": "ZCash"
  }
  bases = ["USD", "EUR"]
  intervals = [1, 5, 15, 30, 60, 240, 1440]
  intervalNames = {1: "1m", 5: "5m", 15: "15m", 30: "30m", 60: "1H", 240: "4H", 1440: "1D"}
  sources = {kraken: "kraken.com", "ccc": "cryptocurrencychart.com", "cmc": "coinmarketcap.com"}
  lastNames = {"last24h": "Last day", "last7d": "Last week", "last30d": "Last month"}
  times = ["last24h", "last7d", "last30d"]
  widgetConfig = {
    "PRICE_CHANGE": {time: true, symbol: true},
    "VOLUME_CHANGE": {time: true, symbol: true},
    "LATEST_NEWS": {time: false, symbol: true},
    "LATEST_TWEETS": {time: false, symbol: true},
    "CHART_MARKETCAP": {time: false, symbol: true},
    "CHART_PRICE": {time: false, symbol: true},
    "CHART_VOLUME": {time: false, symbol: true},
    "RANKING_MARKETCAP": {time: false, symbol: false},
    "PERF_LASTWEEK": {time: false, symbol: true, format:true},
    "EVOL_MARKETCAP_MINI": {time: true, symbol: false}
  }
  specialPanels=[{id: 'SP_LISTING', type: "special",title:"Listing"},{id: 'SP_SEPARATOR', type: "separator",title:"Separator"}]
  specialLinks={'SP_LISTING':"/listing"}
  widgets = [
    {
      code: "PRICE_CHANGE",
      title: "Price change",
      size: "1x1",
      id: 1,

    }, {
      title: "Volume change",
      code: "VOLUME_CHANGE",


      size: "1x1",
      id: 2
    }, {
      title: "Latest news",
      code: "LATEST_NEWS",
      size: "2x4",
      id: 3
    }, {
      title: "Latest tweets",
      code: "LATEST_TWEETS",
      size: "2x4",
      id: 4
    }, {
      title: "Market Cap Chart",
      code: "CHART_MARKETCAP",
      size: "4x4",
      id: 5
    }, {
      title: "Volume Chart",
      code: "CHART_VOLUME",
      size: "4x4",
      id: 7
    }, {
      title: "Price Chart",
      code: "CHART_PRICE",
      size: "4x4",
      id: 6
    }, {
      title: "Market cap rankings",
      code: "RANKING_MARKETCAP",
      size: "4x2",
      id: 8
    }, {
      title: "Market cap evol",
      code: "EVOL_MARKETCAP_MINI",
      size: "1x2",
      id: 9
    }, {
      title: "Perf last week",
      code: "PERF_LASTWEEK",
      size: "1x4",
      id: 10
    }
  ];
}
