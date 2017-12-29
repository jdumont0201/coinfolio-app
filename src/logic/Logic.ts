import {Injectable} from "@angular/core";
import {DataService} from "../lib/localton/services/data.service";
import {Data} from "@angular/router";

import {RestangularModule, Restangular} from 'ngx-restangular';
import {Record} from "../lib/localton/interfaces/interfaces"
import {ApiService} from "../lib/globalton/core/services/api.service";
import {AuthService} from "../lib/globalton/core/services/auth.service";

@Injectable()
export class Logic {
  constructor(public dataService: DataService, public apiService: ApiService, public authService: AuthService) {

  }

  registerUser(obj, f) {
    console.log("Register ",obj)
    this.apiService.noauthpost("user", obj, (res) => {
      if (res.token) {
        this.authService.loginResponse = res;
        this.authService.postLogin();
        f({success: true})
      } else {
        f({success: false, error: true})
      }
    })

  }

  saveUser(obj, f: Function) {
    this.dataService.post("user", obj, f)
  }

  /* PAYMENT */
  generateAddress(planId, f) {
    const userId = this.authService.userId;
    this.apiService.noauthget("payment/generatebitcoinaddress?userId=" + userId + "&planId=" + planId, (res) => {
      f(res.result)
    });
  }

  getPlans(f) {
    const userId = this.authService.userId;
    this.apiService.noauthget("plan/getPlans", (res) => {
      f(res.result)
    });
  }

  readSubscription(f: Function) {
    this.apiService.noauthget("user/getexpiration?userId=" + this.authService.userId, (res) => {
      f(res.result)
    })
  }

  checkBitcoinPayment(paymentId: string, f: Function) {
    console.log("checkbitcoinpayment", paymentId)
    this.apiService.noauthget("payment/checkbitcoinpayment?paymentId=" + paymentId, (res) => {
      if (res && res.result)
        f(res.result)
      else
        f(null)
    })
  }
  getMe( f: Function) {
    this.apiService.noauthget("user/"+this.authService.userId, f)
  }

  getChartData(source, interval: string, symbol: string, base: string, f: Function) {
    this.dataService.getAll("recordprice", f, {
      source: source,
      interval: interval,
      symbol: symbol,
      base: base
    }, {key: "ts", dir: "asc"})
  }

  getMarketCapEvol(source: string, base: string, from: number, to: number, f: Function) {
    this.dataService.perform("marketcapevol", {psource: source, pfrom: from, pto: to, pbase: base}, f)
  }

  getMarketCapData(source: string, symbol: string, base: string, f: Function) {
    this.dataService.perform("marketcap", {psource: source, psymbol: symbol, pbase: base}, f)
  }

  getPriceDivMarketCapData(source: string, symbol: string, base: string, f: Function) {
    this.dataService.perform("pricedivmarket", {psource: source, psymbol: symbol, pbase: base}, f)
  }

  getVolumeData(source: string, symbol: string, base: string, f: Function) {
    this.dataService.perform("volumedd", {psource: source, psymbol: symbol, pbase: base}, f)
  }

  getVolumeWeekData(source: string, symbol: string, base: string, f: Function) {
    this.dataService.perform("volumeweekccc", {psource: source, psymbol: symbol, pbase: base}, f)
  }

  getAllChartData(source: string, interval: string, timestamp, base, f: Function) {
    this.dataService.getAll("recordprice", f, {source: source, interval: interval, ts: timestamp, base: base})
  }

  /*

        PERFORM

  * */
  getMarketData(source: string, base: string, ts, f: Function) {
    this.dataService.perform("allsymbolscap", {psource: source, pts: ts, pbase: base}, f)
  }

  getDailyTopPerformance(source, ts, base, f: Function) {
    this.dataService.perform("dailytopperf", {pts: ts, pbase: base, psource: source}, f)

  }

  getTopPerformance(source, from, to, base, f: Function) {
    this.dataService.perform("topperf", {pfrom: from, pto: to, pbase: base, psource: source}, f)

  }

  getPerfLastWeek(source, days, ts, symbol: string, base, f: Function) {
    this.dataService.perform("lastweekperf", {pts: ts, psymbol: symbol, pdays: days, pbase: base, psource: source}, f)
  }

  getCapLastWeek(source, days, ts, symbol: string, base, f: Function) {
    this.dataService.perform("caplastweek", {pts: ts, psymbol: symbol, pdays: days, pbase: base, psource: source}, f)

  }

  getTrendingPriceCapLastWeek(source, days, ts, base, sourcecap: string, f: Function) {
    const options = {pts: ts, pdays: days, pbase: base, psourceprice: source, psourcecap: sourcecap}
    this.dataService.perform("pricecaplastweek2d", options, f)

  }

  getLastImport(source, type, f: Function) {
    this.dataService.getAll("import", (res) => {
      if (res.length > 0)
        f(res[0].timestamp)
      else
        f(null)
    }, {source: source, type: type}, {key: "ts", dir: "DESC"})
  }

  savePanel(panel, f: Function) {
    panel.userId = this.authService.userId;
    if(panel.id)
    this.apiService.authput("user/" + this.authService.userId + "/panels/"+panel.id, panel, (res) => {
      f(res)
    })
    else
      this.apiService.authpost("user/" + this.authService.userId + "/panels", panel, (res) => {
      f(res)
    })
  }

  getMyPanels(f: Function) {
    this.apiService.authget("user/" + this.authService.userId + "/panels", (res) => {
      f(res)
    })
  }
  getPanels(array,f:Function){
    const url='panel?filter={"where":{"id":{"inq":["'+array.join('","')+'"]}}}'
    this.apiService.authget(url, (res) => {
      f(res)
    })
  }
  getMyWorkspaces(f: Function) {
    this.apiService.authget("user/" + this.authService.userId + "/workspaces", (res) => {
      f(res)
    })
  }
  saveWorkspace(w,f:Function){
    if(w.id)
    this.apiService.authput("user/" + this.authService.userId + "/workspaces/"+w.id, w, (res) => {
      f(res)
    });
    else
      this.apiService.authpost("user/" + this.authService.userId + "/workspaces", w, (res) => {
        f(res)
      });
  }
  getNews(q:string,f:Function){
    const url="widget/searchNews?q="+q;
    this.apiService.noauthget(     url,    (res) => {


      f(res.searchNews.feed.entries)
    });
  }
  getTweets(q:string,f:Function){
    let url="widget/searchTweets?q="+q;
    this.apiService.noauthget(     url,    (res) => {
      f(res)
    });
  }

  loadMyPanels(f:Function){
    let A={}
    this.getMyPanels((res) => {
      for(let i=0;i<res.length;++i)
        A[res[i].id] = res[i];
      f({array:res,object:A})
    })

  }
  loadDefaultPanels(array,f:Function){
    let A={}
    this.getPanels(array,(res) => {
      for(let i=0;i<res.length;++i)
        A[res[i].id] = res[i];
      f({array:res,object:A})
    })

  }

}
