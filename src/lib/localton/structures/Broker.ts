import {Logic} from "../../../logic/Logic";
import {Portfolio} from "./Portofolio";
import {Ticker} from "./Ticker";
import {EventService} from "../services/event.service";
import {Listing} from "./Listing";
import {TradingService} from "../services/trading.service";
import {Trades} from "./Trades";

export type Asset = { symbol: string, q: number, v?: number }


export class Broker {
    private portfolio:Portfolio;
    private ticker:Ticker;
    private trades:Trades;
    private listing:Listing;
    //trades:Trades;
    isLoaded:boolean;
    connected:boolean;
    getPortfolio():Portfolio {
        return this.portfolio;
    }
    getListing():Listing{
        return this.listing;
    }
    getTrades():Trades{

        return this.trades;
    }

    getTicker(){
        return this.ticker;
    }

    constructor(public logic:Logic,public name:string,public eventService:EventService,public tradingService:TradingService){
        console.log("NEW BROKER ",name)
        this.portfolio=new Portfolio(this.logic,this.tradingService,this.name)
        this.ticker=new Ticker(this.logic,this.tradingService,this.name)
        this.listing=new Listing(this.logic,this.eventService,this.tradingService,this.name)
        this.trades=new Trades(this.logic,this.eventService,this.tradingService,this.name)
    }
    load(f:(Broker)=>any){
        console.log("TRADE : LOAD BROKER")
        this.portfolio.load((res)=>{
            this.ticker.load((res2)=>{

                this.portfolio.setLivePrices(this.ticker);

                this.listing.load((res2)=>{
                    this.trades.load(()=>{})
                    this.ticker.load24ChangeBinance(()=>{})
                    this.isLoaded=true;
                    f(this)

            })
            })
        })
    }
    combineWith(P:Portfolio){
        this.portfolio.combineWith(P)


    }
}

export class BrokerCollection {
    private brokers:  { [name: string]: Broker }  = {}

    isLoaded = false;

    getConnectedBrokers():{[name:string]:Broker} {
        let res={}
        for(let k in this.brokers)
            if(this.brokers[k].isLoaded)
                res[k]=this.brokers[k]
        return res;
    }

    constructor(public logic: Logic,public eventService:EventService,public tradingService:TradingService) {

    }

    init(keys: string[], f: Function) {
        keys.forEach((k: string) => {
            this.create(k)
        })
        this.load(f);
    }

    getByName(name):Broker{
        if(name in this.brokers)
        return this.brokers[name]
        else
            return null;
    }

    reset() {
        this.brokers = {};
    }



    create(name: string) {
        let P = new Broker(this.logic, name,this.eventService,this.tradingService);
        this.brokers[name]=P;
    }

    load(f: Function) {
        console.log("TRADE : LOAD BROKER COL",this.brokers)
        for(let k in this.brokers){
            this.brokers[k].load((res:Broker) => {
                if (res) this.isLoaded = true

                f(res);
            });
        }
    }
}