import {OHLC} from "./OHLC"
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {DrawMethods,RawLoadedData,Row} from "./Types"
import {Arranger} from "./Arranger";
import * as tulind from "tulind"

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
        /*this.indicators.SMA=tulind.indicators.sma.indicator([close], [3], function(err, results) {
            console.log("sma",results)
            this.indicators.sma=results[0]
        });

        this.indicators.SMAScaled=[]
        this.indicators.SMA.forEach((v) => {
            this.indicators.SMAScaled.push(Math.round(this.arranger.flip(this.arranger.scaleY(v))))
        })
        this.consoleService.chart("sma close def=",JSON.stringify(this.indicators.close))
        console.log("sma",this.indicators.SMA,this.indicators.close)
        */
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

