import {DrawMethods, RawLoadedData, RawLoadedDataFull, Row} from "./Types"
import {Arranger} from "./Arranger";

export class OHLC {
    data: Row
    indicators

    toString() {
        return JSON.stringify(this.data)
    }

    arrange(a: Arranger) {
        a.scaleData(this.data)
        a.flipData(this.data)
        a.roundData(this.data)
    }

    constructor(d: any) {
        let dd
        let ts=d.ts;
        ts=Date.parse(d.ts)/1000;
        if ("open" in d)
            dd = {o: d.open, ts: ts, c: d.close, h: d.high, l: d.low}
        else
            dd = {o: d.o, ts: ts, c: d.c, h: d.h, l: d.l}

        this.data = {raw: dd, scaled: {}, flipped: {}, meta: {}, draw: {}, indicators: {}};
        console.log("adddata",dd)
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