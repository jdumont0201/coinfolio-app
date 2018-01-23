
export enum DrawMethods {SVG, Canvas}
export type RawLoadedData={ts:number,o:number,h:number,l:number,c:number}
export type RawLoadedDataFull={ts:number,open:number,high:number,low:number,close:number}
export type UnparsedRawLoadedData={ts:string,o:string,h:string,l:string,c:string}
export type Row = {

    raw: {
        ts: number,
        o: number, h: number, l: number, c: number, H?: number
    },
    scaled: {
        sx?: number, sy?: number, sH?: number,
        so?: number, sc?: number, sl?: number, sh?: number,
    },
    meta: {
        maxoc?: number, minoc?: number,
    }

    flipped: {
        fo?: number, fc?: number, fl?: number, fh?: number,
        fy?: number, fx?: number, fH?: number,
        fcx?: number, fcy?: number
    }
    indicators:{},



    draw: {
        lines?: any[][],
        borderlines?: any[][],
    }


}
