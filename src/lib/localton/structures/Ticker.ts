import {Logic} from "../../../logic/Logic";

export type Tick = { p: number, v?: number }

function getUSDValue(k, P) {
    let p;

    if (k === "USDT") {
        p = 1;
    } else if (k === "BTC") {
        p = parseFloat(P["BTCUSDT"]);
    } else if ((k + "USDT") in this.prices) {
        p = parseFloat(P[k + "USDT"]);
    } else {
        let pb = parseFloat(P[k + "BTC"]);
        let btcv = pb;
        let b = parseFloat(P["BTCUSDT"]);
        p = btcv * b;
    }
    return p;
}

export class Ticker {
    source: string;
    content: Object={};
    connected: boolean = false;
    dataTime:Date

    constructor(public logic: Logic, key: string) {
        console.log("NEW BROKER TICKER",key)
        this.source = key;
        this.content = {}
    }

    load(f: Function) {
        if (this.source == "binance") {
            this.loadBinance(f);
        }
    }

    add(symbol: string, p: number) {
        this.content[symbol]={p:p};
    }

    loadBinance(f: Function) {
        console.log("TICKER LOADBIN")
        this.logic.BinanceGetLivePrices((prices) => {
            this.dataTime=new Date();
            console.log("LOADBIN RES", prices)
            if (prices) {
                for (let symbol in prices) {
                    let p = parseFloat(prices[symbol])
                    this.add(symbol, p)
                }
                this.connected = true;
                f(this.connected);
            }
        });
    }

    getTick(s: string): Tick {
        if (s in this.content)
            return this.content[s];
        else return null;
    }
    hasPair(s){
        return s in this.content
    }
    getPrice(s: string): number {
        if (s in this.content)
            return this.content[s].p;
        else return null;
    }
    getUSDValue(s: string): number {
        if(s=="USDT") return 1;
        let candidate=s+"USDT";
        if(this.hasPair(candidate))
            return this.getPrice(candidate);
        else
        if(this.hasPair(s+"BTC"))
            return this.getPrice(s+"BTC")*this.getPrice("BTCUSDT");
        else if(this.hasPair(s+"BNB"))
            return this.getPrice(s+"BNB")*this.getPrice("BTCUSDT");



    }

}

export class TickerCollection {
    portfolios: Ticker[] = []
    isLoaded = false;

    getConnected(): Ticker[] {
        return this.portfolios.filter((p: Ticker) => {
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

    getPortfolioByName(key): Ticker {
        return this.portfolios[this.getPortofolioIndex(key)];
    }

    getPortofolioIndex(key): number {
        let res = -1;
        this.portfolios.forEach((p: Ticker, i: number) => {
            if (p.source == key) res = i;
        })
        return res;
    }

    reset() {
        this.portfolios = [];
    }


    create(name: string) {
        let P = new Ticker(this.logic, name);
    }

    load(f: Function) {

        this.portfolios.forEach((p: Ticker) => {
            p.load((res) => {
                if (res) this.isLoaded = true
            });
        })
    }
}