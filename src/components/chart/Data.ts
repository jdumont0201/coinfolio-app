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


        this.indicators.SMA=technicalindicators.sma({period : 10, values : this.indicators.close, reversedInput : true});
        for(let i=0;i<5-1;++i) this.indicators.SMA.unshift(0)
        //console.log(this.ohlc,this.indicators.close,this.indicators.SMA)
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





        //console.log("sma", this.indicators.SMA, this.indicators.close)

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

