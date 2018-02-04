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
    static dateStringToInt(ts){
        if (typeof ts == "string") {
            var offset = new Date().getTimezoneOffset();
            return Date.parse(ts) / 1000 - offset * 60;
        }else{
            return ts;
        }
    }
    constructor(d: any) {
        let dd
        let ts = d.ts;



            ts = OHLC.dateStringToInt(d.ts)

        if ("open" in d)
            dd = {o: d.open, ts: ts, c: d.close, h: d.high, l: d.low}
        else
            dd = {o: d.o, ts: ts, c: d.c, h: d.h, l: d.l}
         console.log("adddata or=",ts,dd );
        this.data = {raw: dd, scaled: {}, flipped: {}, meta: {}, draw: {}, indicators: {}};

    }

    draw() {

    }

    addMetaData() {
        this.data.meta = {}
        this.data.meta.maxoc = Math.max(this.data.raw.o, this.data.raw.c)
        this.data.meta.minoc = Math.min(this.data.raw.o, this.data.raw.c)
        this.data.raw.H = Math.abs(this.data.raw.c - this.data.raw.o)
        //this.consoleService.chart("ap", JSON.stringify(g))

    }


}