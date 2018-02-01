import {OHLC} from "./OHLC"
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {DrawMethods, RawLoadedData, Row} from "./Types"
import {Arranger} from "./Arranger";
import * as technicalindicators from "./indicators/All"


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

    hasData(): boolean {
        return this.ohlc.length > 0
    }

    isEmpty(): boolean {
        return this.ohlc.length == 0
    }

    getSize(): number {
        return this.ohlc.length
    }

    constructor(public consoleService: ConsoleService, public arranger: Arranger) {
    }

    add(raw: RawLoadedData) {
        //this.consoleService.chart("chart new add ohlc", raw)
        this.ohlc.push(new OHLC(raw))

    }

    reset() {
        this.ohlc = [];
        this.minX = 10000000000000;
        this.maxX = -100000000000;
        this.minY = 10000000000000;
        this.maxY = 0;
    }

    toString(): string {
        let res = "";
        this.ohlc.forEach((o) => {
            res += o.toString()
        })
        return res;
    }

    setWorkingData(d: RawLoadedData) {
        //this.consoleService.chart("DATA SETWD", d)
        this.ohlc.push(new OHLC(d))
    }

    getTick(i): Row {
        return this.ohlc[i].data
    }

    get(i: number) {

        return this.ohlc[i]
    }

    getLast(): Row {
        if(this.ohlc && this.ohlc.length>0)
        return this.ohlc[this.ohlc.length - 1].data
        else return null
    }
    setLastClose(c:number){

        this.getLast().raw.c=c;


    }

    read(content: RawLoadedData[]) {
        //this.consoleService.chart("DATA READ", content)
        if(!content) return
        //console.log("content",content,typeof content)
        content.forEach((d: RawLoadedData) => {
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
        this.computeIndicators()
    }

    computeIndicators() {
        //this.consoleService.chart("SMA indis")
        this.indicators = {}
        this.indicators.close = []
        this.ohlc.forEach((d: OHLC) => {
            d.addMetaData()
            this.indicators.close.push(d.data.raw.c)


        })
        let period= this.arranger.options.indicators.onchart.sma.period;

        this.indicators.SMA=technicalindicators.sma({period :period, values : this.indicators.close, reversedInput : true});
//        console.log("indicators",this.ohlc.length,JSON.stringify(this.indicators.SMA),JSON.stringify(this.indicators.close))
        for(let i=0;i<period-1;++i) this.indicators.SMA.unshift(-1)
    }
    scaleIndicators(){

        this.indicators.SMAScaled = []
        if (this.indicators.SMA)
            this.indicators.SMA.forEach((v) => {
                this.indicators.SMAScaled.push(Math.round(this.arranger.flip(this.arranger.scaleY(v))))
            })
        //this.consoleService.chart("SMA", this.indicators)
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

