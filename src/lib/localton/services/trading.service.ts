import {Injectable, OnInit} from "@angular/core"
import {AuthService} from "../../globalton/core/services/auth.service";
import {Logic} from "../../../logic/Logic";
import {ConsoleService} from "../../globalton/core/services/console.service";

@Injectable()
export class TradingService implements OnInit {
    portfolio;
trades;
    constructor(public logic: Logic,public authService:AuthService,public consoleService:ConsoleService) {
        consoleService.trade("+")
    }
    ngOnInit(){
        this.consoleService.trade(" init")
        this.authService.loginChanged.subscribe(value => this.loginUpdated(value), error => console.log("Error reading loginupdated" + error), () => console.log('done'));

    }
    loginUpdated(val){

        if(this.authService.isAuthenticated())
            this.init();
    }
    init(){
        this.consoleService.trade(" init")
        this.loadPortfolio((res) => {            })
        this.loadTrades("BTCUSDT",(res) => {            })
    }
    reload(){
        if(this.authService.isAuthenticated()){
        this.consoleService.trade(" reload")
        this.loadPortfolio((res) => {            })
        this.loadTrades("BTCUSDT",(res) => {            })
        }

    }
    loadPortfolio(f: Function) {
        this.consoleService.trade(" loadPortfolio")
        this.logic.BinanceGetAllocation((alloc) => {
            if(alloc)
                for (let k in alloc)
                    if (parseFloat(alloc[k].available) + parseFloat(alloc[k].onOrder) > 0) {
                        this.addToPortfolio(k,parseFloat(alloc[k].available) + parseFloat(alloc[k].onOrder))
                    }
        })
     }
     loadTrades(symbolList:string,f: Function) {
        this.trades=[];
        this.consoleService.trade(" loadTrades")
        this.logic.BinanceGetMyTrades(symbolList,(trades) => {
            if(trades)
                for (let k=0;k<trades.length;++k)
                    this.trades.push(trades[k])

        })
     }
    isInPortfolio(s:string){
        return this.portfolio && s in this.portfolio && this.portfolio[s].q>0
    }
    hasTraded(s:string){
        return this.trades && s in this.trades;
    }
    resetPortfolio() {
        this.portfolio = {}
    }

    addToPortfolio(symbol: string, q: number) {
        if (!this.portfolio) this.resetPortfolio()
        if (symbol in this.portfolio)
            this.portfolio[symbol].q += q;
        else
            this.portfolio[symbol] = {q: q}
    }

    refresh() {

    }

}