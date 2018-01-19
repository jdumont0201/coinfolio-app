
import {DrawMethods,RawLoadedData,Row} from "./Types"
import {Arranger} from "./Arranger";

export class OHLC {
    data: Row
    toString(){
        return JSON.stringify(this.data)
    }
    arrange(){
        this.a.scaleData(this.data)
        this.a.flipData(this.data)
        this.a.roundData(this.data)
    }
    constructor(d:RawLoadedData,public a:Arranger) {
        this.data={raw:d,scaled:{},flipped:{},meta:{},draw:{}};
    }

    draw() {

    }

    addMetaData() {
        //this.consoleService.chart("av", JSON.stringify(g))
        //d.ts = Math.round((d.ts - this.minX) * 2 / 1000) / 2
        this.data.meta = {}
        this.data.meta.maxoc = Math.max(this.data.raw.o, this.data.raw.c)
        this.data.meta.minoc = Math.min(this.data.raw.o, this.data.raw.c)
        this.data.raw.H = Math.abs(this.data.raw.c - this.data.raw.o)
        //this.consoleService.chart("ap", JSON.stringify(g))

    }


}