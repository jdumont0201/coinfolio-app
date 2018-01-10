import {Logic} from "../../../logic/Logic";
import {Ticker} from "./Ticker";
import {Crypto} from "../utils/utils"
import {TradingService} from "../services/trading.service";
export type Asset = { symbol: string, q: number, usdvalue?:number ,unitvalue?:number,broker:string}


export class Portfolio {
    key: string;
    content:{ [symbol:string]:Asset}={}
    connected: boolean = false;
    active: boolean = true;
    dataTime:Date;
    constructor(public logic: Logic, public tradingService:TradingService,key: string) {
        console.log("NEW BROKER PTF",key)
        this.key = key;
        this.content = {}
    }
    getTotalUSDValue():number{
        let res=0;
        for(let k in this.content) res+=this.content[k].usdvalue
        return Math.round(100*res)/100;
    }
    refresh(f,force?:boolean){
        if(force) this.content={}
        this.load(f)
    }
    load(f: Function) {
        console.log("TRADE PTF LOAD",this.key)
        if (this.key == "binance") {
            this.loadBinance(f);
        }else if(this.key==="kraken"){
            this.loadKraken(f)
        }
    }
    combineWith(P:Portfolio){
        for(let k in P.content){
            if(k in this.content)
                this.content[k].q+=P.content[k].q
            else
                this.content[k]=P.content[k]
        }
    }
    add(symbol: string, q: number,broker:string) {
        console.log("TRADE PTF ADD ",symbol,q)
        if (symbol in this.content)
            this.content[symbol].q += q;
        else{
            this.content[symbol] = {symbol:symbol,q: q,broker:broker}
        }

    }
    setLivePrices(ticker:Ticker){
        for(let s in this.content){
            let asset:Asset=this.content[s]
            this.content[s].usdvalue=ticker.getUSDValue(s)*asset.q
            this.content[s].unitvalue=ticker.getUSDValue(s)
        }

    }
    has(symbol,threshold?):boolean{
        if(!threshold)
        return symbol in this.content
        else{
            //let usdvalue=this.tradingService.getBrokerByName(this.key).getTicker().getUSDValue(symbol);

            return symbol in this.content && this.content[symbol].usdvalue>threshold
        }


    }
    getAllocation(threshold?:number):{chartData:any[],gridData:any[]}{
        let resData=[];
        let gridData=[];

    //    this.setLivePrices(this.tradingService.getBrokerByName(this.key).getTicker());
        for( let k in this.content){
            let asset=this.content[k];

            let T=this.tradingService.getBrokerByName(asset.broker).getTicker();
            if(!threshold || asset.usdvalue > threshold){
                let v=T.getUSDValue(asset.symbol)
                resData.push({name:asset.symbol,y:v*asset.q,change:T.getSymbolChange(asset.symbol)})
                gridData.push({symbol:asset.symbol,available:asset.q,price:v,value:v*asset.q,broker:asset.broker})
            }
        }
        return {chartData:resData,gridData:gridData}
    }
    loadBinance(f: Function) {
        console.log("TRADE PTF LOAD BINANCE")
        this.logic.BinanceGetAllocation((alloc) => {
            this.dataTime=new Date();
            console.log("TRADE PTF LOAD BINANCE RES", alloc)
            if (alloc) {
                for (let k in alloc)
                    if (parseFloat(alloc[k].available) + parseFloat(alloc[k].onOrder) > 0) {
                        let q = parseFloat(alloc[k].available) + parseFloat(alloc[k].onOrder);
                        this.add(k, q,this.key)
                    }
                this.connected = true;
                f(this.connected);
            }else{
                f(false)
            }
        })
    }
loadKraken(f: Function) {
        console.log("TRADE PTF LOAD BINANCE")
        this.logic.KrakenGetAllocation((alloc) => {
            this.dataTime=new Date();
            console.log("TRADE PTF LOAD BINANCE RES", alloc)
            if (alloc) {
                for (let k in alloc)
                    if (parseFloat(alloc[k].available) + parseFloat(alloc[k].onOrder) > 0) {
                        let q = parseFloat(alloc[k].available) + parseFloat(alloc[k].onOrder);
                        this.add(k, q,this.key)
                    }
                this.connected = true;
                f(this.connected);
            }else{
                f(false)
            }
        })
    }

    getAsset(s: string): Asset {
        if(s in this.content)
            return this.content[s]
            else

        return null;
    }

    isInPortfolio(s: string): boolean {
        return this.getAsset(s) ? true : false;
    }
}
/*
export class PortfolioCollection {
    portfolios: Portfolio[] = []
    isLoaded = false;

    getConnected(): Portfolio[] {
        return this.portfolios.filter((p: Portfolio) => {
            return p.connected;
        })
    }

    constructor(public logic: Logic) {

    }

    init(keys: string[], f: Function) {

        this.create("global")
        keys.forEach((k: string) => {
            this.create(k)
        })


        this.load(f);
    }

    add(key: string, symbol: string, q: number) {
        this.getPortfolioByName(key).add(symbol, q);
        this.getPortfolioByName("global").add(symbol, q);
    }

    addBatch(key: string, batch: { symbol: string, q: number }[]) {
        let idx = this.getPortofolioIndex(key);
        batch.forEach((b) => {
            this.portfolios[idx].add(b.symbol, b.q)
        })
    }

    getPortfolioByName(key): Portfolio {
        return this.portfolios[this.getPortofolioIndex(key)];
    }

    getPortofolioIndex(key): number {
        let res = -1;
        this.portfolios.forEach((p: Portfolio, i: number) => {
            if (p.key == key) res = i;
        })
        return res;
    }

    reset() {
        this.portfolios = [];
    }

    isInAnyPortfolio(s: string) {
        let f = false;
        this.portfolios.forEach((p: Portfolio) => {
            if (p.isInPortfolio(s))
                f = true;
            return true;
        })
        return f;
    }

    isInPortfolio(key, s: string): boolean {
        return this.portfolios[key].isInPortfolio(s)
    }

    create(name: string) {
        let P = new Portfolio(this.logic, this.tradingService,name);
    }

    load(f: Function) {

        this.portfolios.forEach((p: Portfolio) => {
            p.load((res) => {
                if (res) this.isLoaded = true
            });
        })
    }
}*/