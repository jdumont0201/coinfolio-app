import {OHLC} from "./OHLC"
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {DrawMethods,RawLoadedData,Row} from "./Types"
import {Arranger} from "./Arranger";
export class Data {
    ohlc: OHLC[] = []
    //SPAN
    minX = 10000000000000;
    maxX = -100000000000;
    minY = 10000000000000;
    maxY = 0;
    spanX;
    spanY;

    hasData(){
        return this.ohlc.length>0
    }
    isEmpty(){
        return this.ohlc.length==0
    }
    getSize():number{
        return this.ohlc.length
    }
    constructor(public consoleService: ConsoleService,public arranger:Arranger) {

    }

    reset() {
        this.ohlc = [];
        this.minX = 10000000000000;
        this.maxX = -100000000000;
        this.minY = 10000000000000;
        this.maxY = 0;
    }

    setWorkingData(d) {
        //this.consoleService.chart("DATA SETWD", d)
        this.ohlc.push(new OHLC(d,this.arranger))
    }

    getTick(i):Row {
        return this.ohlc[i].data
    }
    get(i){
        console.log("chart get",i)
        return this.ohlc[i]
    }
    read(content) {
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

    //data related
    computeMinMax(d: OHLC) {
        this.consoleService.chart("DATA minmax", d)
        this.minX = Math.min(this.minX, d.data.raw.ts)
        this.maxX = Math.max(this.maxX, d.data.raw.ts)
        this.minY = Math.min(this.minY, d.data.raw.l)
        this.maxY = Math.max(this.maxY, d.data.raw.h)
        this.spanX = this.maxX - this.minX;
        this.spanY = this.maxY - this.minY;
    }
}

