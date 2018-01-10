import {Logic} from "../../../logic/Logic";
import {Ticker} from "./Ticker";
import {Crypto} from "../utils/utils"
export type Asset = { symbol: string, q: number, usdvalue?:number ,unitvalue?:number}


export class Portfolio {
    key: string;
    content:{ [symbol:string]:Asset}={}
    connected: boolean = false;
    active: boolean = true;
    dataTime:Date;
    constructor(public logic: Logic, key: string) {
        console.log("NEW BROKER PTF",key)
        this.key = key;
        this.content = {}
    }
    getTotalUSDValue():number{
        let res=0;
        for(let k in this.content) res+=this.content[k].usdvalue
        return res;
    }
    refresh(force:boolean){
        if(force) this.content={}
        this.load(()=>{})
    }
    load(f: Function) {
        console.log("TRADE : LOAD PTF",this.key)
        if (this.key == "binance") {
            this.loadBinance(f);
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
    add(symbol: string, q: number) {
        if (symbol in this.content)
            this.content[symbol].q += q;
        else{
            this.content[symbol] = {symbol:symbol,q: q}
        }

    }
    setLivePrices(ticker:Ticker){
        for(let s in this.content){
            let asset:Asset=this.content[s]
            //this.content[s].value=ticker.getPrice(s)
            this.content[s].usdvalue=ticker.getUSDValue(s)*asset.q
            this.content[s].unitvalue=ticker.getUSDValue(s)
        }

    }
    has(symbol):boolean{
        return symbol in this.content
    }
    getAllocation(threshold?:number):{chartData:any[],gridData:any[]}{
        let resData=[];
        let gridData=[];
        for( let k in this.content){
            let asset=this.content[k];

            if(!threshold || asset.usdvalue > threshold){
                resData.push({name:asset.symbol,y:asset.usdvalue})
                gridData.push({symbol:asset.symbol,available:asset.q,price:asset.unitvalue,value:asset.usdvalue})
            }
        }
        return {chartData:resData,gridData:gridData}
    }
    loadBinance(f: Function) {
        console.log("TRADE LOAD BINANCE")
        this.logic.BinanceGetAllocation((alloc) => {
            this.dataTime=new Date();
            console.log("LOADBIN RES", alloc)
            if (alloc) {
                for (let k in alloc)
                    if (parseFloat(alloc[k].available) + parseFloat(alloc[k].onOrder) > 0) {
                        let q = parseFloat(alloc[k].available) + parseFloat(alloc[k].onOrder);
                        this.add(k, q)
                    }
                this.connected = true;
                f(this.connected);
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
        let P = new Portfolio(this.logic, name);
    }

    load(f: Function) {

        this.portfolios.forEach((p: Portfolio) => {
            p.load((res) => {
                if (res) this.isLoaded = true
            });
        })
    }
}