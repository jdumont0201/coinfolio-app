import {Injectable} from "@angular/core";
import {DataService} from "../lib/localton/services/data.service";
import {Record, Workspace} from "../lib/localton/interfaces/interfaces"
import {ApiService} from "../lib/globalton/core/services/api.service";
import {AuthService} from "../lib/globalton/core/services/auth.service";
import {RequestService} from "../lib/globalton/core/services/request.service";

@Injectable()
export class Logic {
    constructor(public requestService: RequestService, public dataService: DataService, public apiService: ApiService, public authService: AuthService) {

    }


    BinanceGetAllocation(f: Function) {
        this.apiService.noauthget("user/getbinancebalance?userId=" + this.authService.userId, (res) => {
            if(res.result.success)
                f(res.result.data)
        })
    }

    BinanceGetLivePrices(f: Function) {
        this.apiService.noauthget("user/getbinanceliveprices?userId=" + this.authService.userId, (res) => {
            if(res.result.success)
                f(res.result.data)
        })
    }
    BinanceGetBookTickers(f: Function,symbol?:string) {
        if(!this.authService.isAuthenticated()){ f(null); return}
        const url="user/getbinancebooktickers?userId=" + this.authService.userId+"&symbol="+(symbol?symbol:"all")
        this.apiService.noauthget(url, (res) => {
            if(res.result.success)
                f(res.result.data)
            else
                f(null)
        })
    }

    BinanceGetMyTrades(symbols:string,f: Function) {
        this.apiService.noauthget("user/getbinancetrades?userId=" + this.authService.userId+"&symbol="+symbols, (res) => {
            if(res.result.success)
                f(res.result.data)
        })
    }
    BinanceGetDepth(symbol:string,f: Function) {
        this.apiService.noauthget("user/getbinancedepth?symbol="+symbol+"&userId=" + this.authService.userId, (res) => {
            if(res.result.success)
                f(res.result.data)
        })
    }
    BinanceGetOHLC(symbol:string,interval:string,f: Function) {
        this.apiService.noauthget("user/getbinanceohlc?symbol="+symbol+"&interval="+interval+"&userId=" + this.authService.userId, (res) => {
            if(res.result.success)
                f(res.result.data)
        })
    }

    KrakenGetAllocation(f: Function) {
        this.apiService.noauthget("user/getkrakenbalance?userId=" + this.authService.userId, (res) => {
            if(res.result.success)
                f(res.result.data)
        })
    }

    KrakenGetLivePrices(f: Function) {
        this.apiService.noauthget("user/getkrakenliveprices?userId=" + this.authService.userId, (res) => {
            if(res.result.success)
                f(res.result.data)
        })
    }


    registerUser(obj, f) {
        console.log("Register ", obj)
        this.apiService.noauthpost("user", obj, (res) => {
            if (res && "token" in res) {
                this.authService.loginResponse = res;
                this.authService.postLogin();
                f({success: true})
            } else {
                f({success: false, error: true})
            }
        })

    }
    loginUser(obj, f) {
        console.log("Register ", obj)
        this.apiService.noauthpost("user/login/app", obj, (res) => {
            console.log("received",res)
            if (res && "login" in res) {

                this.authService.loginResponse = res.login;
                this.authService.postLogin();
                f({success: true})
            } else {

                f({success: false, error: true})

            }
        })

    }
    set(url:string,obj,f){
        this.apiService.authpatch("user",obj,f)
    }

    saveUser(obj, f: Function) {
        if (obj.id)
            this.apiService.authput("user", obj, f)
        else
            this.apiService.noauthpost("user", obj, f)
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

    getMe(f: Function) {
        if(!this.authService.isAuthenticated()) {f(null);return}
        this.apiService.noauthget("user/" + this.authService.userId, f)
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

    getDominance(source: string, base: string, from: number, f: Function) {
        this.dataService.perform("dominance", {psource: source, pts: from, pbase: base}, f)
    }

    getTopEntries(source: string, base: string, from: number, f: Function) {
        this.dataService.perform("topentries", {psource: source, pts: from, pbase: base}, f)
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

    getImports(f: Function) {
        this.dataService.getAll("import", f, {}, {key: "ts", dir: "desc"}, 1000)
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
        this.dataService.perform("lastweekperf", {
            pts: ts,
            psymbol: symbol,
            pdays: days,
            pbase: base,
            psource: source
        }, f)
    }

    getCapLastWeek(source, days, ts, symbol: string, base, f: Function) {
        this.dataService.perform("caplastweek", {
            pts: ts,
            psymbol: symbol,
            pdays: days,
            pbase: base,
            psource: source
        }, f)

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
        if (panel.id)
            this.apiService.authput("user/" + this.authService.userId + "/panels/" + panel.id, panel, (res) => {
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

    getPanels(array, f: Function) {
        const url = 'panel?filter={"where":{"id":{"inq":["' + array.join('","') + '"]}}}'
        this.apiService.authget(url, (res) => {
            f(res)
        })
    }


    getMyWorkspaces(f: Function) {
        this.apiService.authget("user/" + this.authService.userId + "/workspaces", (res) => {
            f(res)
        })
    }

    saveWorkspace(w: Workspace, f: Function) {
        if (w.id)
            this.apiService.authput("user/" + this.authService.userId + "/workspaces/" + w.id, w, (res) => {
                f(res)
            });
        else
            this.apiService.authpost("user/" + this.authService.userId + "/workspaces", w, (res) => {
                f(res)
            });
    }

    getNews(q: string, f: Function) {
        const url = "widget/searchNews?q=" + q;
        this.apiService.noauthget(url, (res) => {


            f(res.searchNews.feed.entries)
        });
    }

    getTweets(q: string, f: Function) {
        let url = "widget/searchTweets?q=" + q;
        this.apiService.noauthget(url, (res) => {
            f(res)
        });
    }

    loadMyPanels(f: Function) {
        let A = {}
        this.getMyPanels((res) => {
            for (let i = 0; i < res.length; ++i)
                A[res[i].id] = res[i];
            f({array: res, object: A})
        })

    }

    loadPanels(array, f: Function) {
        this.loadDefaultPanels(array, f)
    }

    loadDefaultPanels(array, f: Function) {
        let A = {}
        this.getPanels(array, (res) => {
            for (let i = 0; i < res.length; ++i)
                A[res[i].id] = res[i];
            f({array: res, object: A})
        })

    }

    loadTemplatePanels(f: Function) {
        const url = 'panel/?filter={"where":{"isDefault":"true"}}';
        this.apiService.authget(url, (res) => {
            f(res)
        })
    }

    adminInitDB() {
        this.createPlans();
    }

    createPlans() {
        this.savePlan({amount: 39, length: 30, name: "premium"})
        this.savePlan({amount: 89, length: 90, name: "premium"})
        this.savePlan({amount: 299, length: 365, name: "premium"})
        this.savePlan({amount: 0, length: 10000, name: "free"})
    }

    savePlan(data) {
        const url = "plan";
        this.apiService.noauthpost(url, data, (res) => {

        })
    }

}
