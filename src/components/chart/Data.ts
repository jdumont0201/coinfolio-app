import {OHLC} from "./OHLC"
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {DrawMethods,RawLoadedData,Row} from "./Types"
import {Arranger} from "./Arranger";
//import * as technicalindicators from "./indicators/All"
//import * as talib from "talib"
//import * as tulind from "tulind"
export class IndicatorBuilder{

    SMA(V:number[],options){
        let res=[];
        let period=options.period
        for(let i=0;i<V.length;++i){
            res.push(this.SMAVal(V,i,period))
        }
    }
    SMAVal(V:number[],i:number,period:number){//todo optimize
        let s=0
        for(let k=i-period;k<i;++k){
            s+=V[k]
        }
        return s/period;
    }
    build(f){
        //this.indicators.SMA=technicalindicators.sma({period : 5, values : [1,2,3,4,5,6,7,8,9], reversedInput : true});
        /*let r=tulind.indicators.sma.indicator([close], [3], function(err, results) {
            console.log("sma",results)
            this.indicators.sma=results[0]
        });

        this.indicators.SMAScaled=[]
        this.indicators.SMA.forEach((v) => {
            this.indicators.SMAScaled.push(Math.round(this.arranger.flip(this.arranger.scaleY(v))))
        })*/
    }
}
export class Data {
    ohlc: OHLC[] = []
    indicators;
    //SPAN
    minX = 10000000000000;
    maxX = -100000000000;
    minY = 10000000000000;
    maxY = 0;
    spanX;
    spanY;
    indicatorBuilder;
    hasData():boolean{
        return this.ohlc.length>0
    }
    isEmpty():boolean{
        return this.ohlc.length==0
    }
    getSize():number{
        return this.ohlc.length
    }
    constructor(public consoleService: ConsoleService,public arranger:Arranger) {
        this.indicatorBuilder=new IndicatorBuilder();
    }
    add(raw:RawLoadedData){
        this.consoleService.chart("chart new add ohlc",raw)
        this.ohlc.push(new OHLC(raw,this.arranger))

    }
    reset() {
        this.ohlc = [];
        this.minX = 10000000000000;
        this.maxX = -100000000000;
        this.minY = 10000000000000;
        this.maxY = 0;
    }
    toString():string{
        let res="";
        this.ohlc.forEach((o)=>{
            res+=o.toString()
        })
        return res;
    }

    setWorkingData(d:RawLoadedData) {
        //this.consoleService.chart("DATA SETWD", d)
        this.ohlc.push(new OHLC(d,this.arranger))
    }

    getTick(i):Row {
        return this.ohlc[i].data
    }
    get(i:number){

        return this.ohlc[i]
    }
    getLast():Row{
        return this.ohlc[this.ohlc.length-1].data
    }
    read(content:RawLoadedData[]) {
        //this.consoleService.chart("DATA READ", content)
        content.forEach((d:RawLoadedData) => {
            this.setWorkingData(d)
        })
        //this.consoleService.chart("DATA READ", this.ohlc)
    }

    addMeta() {
        //this.consoleService.chart("DATABOX", this.minX, this.minY, this.maxX, this.maxY)

        this.ohlc.forEach((d: OHLC) => {
            this.computeMinMax(d)

        })
        this.ohlc.forEach((d: OHLC) => {
            d.addMetaData()
        })


    }
    computeIndicators(){
        this.indicators={}
        this.indicators.close=[]
        this.ohlc.forEach((d: OHLC) => {
            d.addMetaData()
            this.indicators.close.push(d.data.raw.c)
        })

        this.consoleService.chart("sma close",JSON.stringify(this.indicators.close))
//        this.indicators.SMA=technicalindicators.sma({period : 5, values : this.indicators.close, reversedInput : true});

/*        this.indicators.SMA=tulind.indicators.sma.indicator([close], [3], function(err, results) {
            console.log("sma",results)
            this.indicators.sma=results[0]
        });*/

        /*talib.execute({
            name: "SMA",
            startIdx: 0,
            endIdx: this.indicators.close.length - 1,
            close: this.indicators.close,
            optInTimePeriod: 9
        }, function (err, result) {
            this.indicators.sma=result
        });*/


            this.indicators.SMAScaled=[]
        this.indicators.SMA.forEach((v) => {
            this.indicators.SMAScaled.push(Math.round(this.arranger.flip(this.arranger.scaleY(v))))
        })
        this.consoleService.chart("sma close def=",JSON.stringify(this.indicators.close))
        console.log("sma",this.indicators.SMA,this.indicators.close)

    }

    //data related
    computeMinMax(d: OHLC) {
        //this.consoleService.chart("DATA minmax", d)
        this.minX = Math.min(this.minX, d.data.raw.ts)
        this.maxX = Math.max(this.maxX, d.data.raw.ts)
        this.minY = Math.min(this.minY, d.data.raw.l)
        this.maxY = Math.max(this.maxY, d.data.raw.h)
        this.spanX = this.maxX - this.minX;
        this.spanY = this.maxY - this.minY;
    }
}

