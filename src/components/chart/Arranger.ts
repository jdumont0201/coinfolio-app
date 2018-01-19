import {Row} from "./Types"
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {Data} from "./Data";
import {OHLC} from "./OHLC";
import {Drawer} from "./Drawer";

export enum DrawMethods {SVG, Canvas}

export class Arranger {
    //TOTAL DIMENSIONS
    H = 400;
    W = 600;

    //MARGINS
    MT = 0;
    MB = 50;
    ML = 0;
    MR = 100;
    DH;
    DW;

    lastMargin = 30
    lastTs;


    //BAR WIDTH
    cW = 6;
    cWMargin = 4;

    yAxis = [];
    xAxis = [];
    nLines = 5;

    //NAVIGATOR
    Nshow = 100;

    //VIEW
    idxMin;
    idxMax;


    setInitialView() {
        if (!this.Data.hasData()) return
        this.idxMin = Math.max(0, this.Data.getSize()- this.Nshow)
        this.idxMax = this.Data.getSize() - 1
        this.consoleService.chart("setInitialView", this.idxMin, this.idxMax)
        //this.consoleService.chart("pair-chart VIEW", this.idxMin, this.idxMax)
    }


    setSize(w, h): boolean {

        this.consoleService.chart("  setcanvassize", w, h)
        if (this.W == w && this.H == h) return

        let isShrinking = false;
        if (this.W > w)
            isShrinking = true
        this.W = w
        this.H = h
        this.DW = this.W - this.ML - this.MR;
        this.DH = this.H - this.MT - this.MB;
        if (this.W < 600) this.Nshow = 40
        else this.Nshow = 100


    }


    minXView: number;
    maxXView: number;
    minYView: number;
    maxYView: number;

    constructor(public method, public consoleService: ConsoleService) {

    }

    Data:Data;
    options = {
        yAxis: {
            grid: {
                color: "rgba(255,255,255,0.2)",
                textColor: "rgba(255,255,255,0.5)",
                strokeWidth: 1,
                textStyle: ''
            }
        },
        xAxis: {
            height: 20,
            grid: {
                color: "rgba(255,255,255,0.2)",
                textColor: "rgba(255,255,255,0.5)",
                strokeWidth: 1,
                textStyle: ''
            }
        },
        navigator: {
            height: 30
        },
        crosshair: {
            width: 1,
            color: "rgb(100,100,100)"
        },
        candlestick: {

            body: {
                width: 20,
                upColor: "rgb(40,200,40)",
                downColor: "rgb(162,0,0)",
                strokeWidth: 1,
                upStrokeColor: "rgb(40,200,40)",
                downStrokeColor: "rgb(162,00,00)"

            },
            line: {
                width: 1,
                upColor: "rgb(255,255,255)",
                downColor: "rgb(255,255,255)"
            }
        }
    }
    nXAxis = 5;
    drawer:Drawer;

    setData(d) {
        this.Data = d
    }
    setViewByNavigator(pc) {
        this.consoleService.chart("setViewByNavigator", pc)
        let N = this.Data.getSize()
        if (pc < this.Nshow / 2 / N) {
            this.idxMin = 0;
            this.idxMax = this.Nshow
        } else if (pc > 1 - this.Nshow / 2 / N) {
            this.idxMin = Math.max(0, N - this.Nshow);
            this.idxMax = N - 1
        } else {
            this.idxMin = Math.max(0, Math.min(N - 1, Math.floor(N * (pc - this.Nshow / 2 / N))))
            this.idxMax = Math.max(0, Math.min(N - 1, Math.floor(N * (pc + this.Nshow / 2 / N))))
        }
    }

    setDrawer(d) {
        this.drawer = d
    }

    setViewport() {
        this.minYView = 1000000;
        this.maxYView = -100;

        this.minXView = this.Data.getTick(this.idxMin).raw.ts
        this.maxXView = this.Data.getTick(this.idxMax).raw.ts

        for (let i = this.idxMin; i <= this.idxMax; ++i) {
            this.minYView = Math.min(this.minYView, this.Data.getTick(i).raw.l)
            this.maxYView = Math.max(this.maxYView, this.Data.getTick(i).raw.h)
        }
        //this.consoleService.chart("pair-chart view", this.gdata, this.minXView, this.maxXView, "[", this.minYView, this.maxYView, "]")
    }

    scaleX(v): number {
        return ((v - this.minXView) / (this.maxXView - this.minXView) - 1 / this.Nshow) * this.DW
    }

    scaleY(v): number {
        return (v - this.minYView) / (this.maxYView - this.minYView) * this.DH;
    }

    flip(y): number {
        return this.MT + this.DH - y
    }

    scaleXFull(v): number {
        return v / (this.Data.getSize() - 1) * this.W
    }

    flipData(d: Row) {
        d.flipped.fy = this.flip(d.scaled.sy);
        d.flipped.fx = d.scaled.sx;
        d.flipped.fo = this.flip(d.scaled.so);
        d.flipped.fh = this.flip(d.scaled.sh);
        d.flipped.fl = this.flip(d.scaled.sl);
        d.flipped.fc = this.flip(d.scaled.sc);
        d.flipped.fH = d.scaled.sH;
    }

    roundData(d: Row) {
        d.flipped.fy = Math.round(d.flipped.fy);
        d.flipped.fo = Math.round(d.flipped.fo);
        d.flipped.fh = Math.round(d.flipped.fh);
        d.flipped.fl = Math.round(d.flipped.fl);
        d.flipped.fc = Math.round(d.flipped.fc);
        d.flipped.fc = Math.round(d.flipped.fc);
        d.flipped.fx = Math.round(d.flipped.fx);
        d.flipped.fH = Math.round(d.flipped.fH);

        this.cW = Math.round(this.cW)
    }

    scaleData(g: Row) {

        g.scaled.sx = Math.round(this.scaleX(g.raw.ts))
        g.scaled.sy = this.scaleY(g.meta.minoc);
        g.scaled.so = this.scaleY(g.raw.o);
        g.scaled.sh = this.scaleY(g.raw.h);
        g.scaled.sl = this.scaleY(g.raw.l);
        g.scaled.sc = this.scaleY(g.raw.c);
        g.scaled.sH = g.raw.H / (this.maxYView - this.minYView) * this.DH;

    }

    getAxisLevel(): number {
        let range = this.maxYView - this.minYView
        if (range > 2000) return 500
        if (range > 1000) return 500
        if (range > 750) return 250
        if (range > 500) return 250
        if (range > 200) return 100
        if (range > 100) return 50
        if (range > 50) return 25
        if (range > 10) return 5
        if (range > 5) return 2.5
        if (range > 1) return 0.5
        if (range > 0.5) return 0.25
        if (range > 0.1) return 0.05
        if (range > 0.05) return 0.025
        if (range > 0.01) return 0.005
        if (range > 0.005) return 0.0025
        if (range > 0.001) return 0.0005
        if (range > 0.0005) return 0.0001
        if (range > 0.0001) return 0.00005

        if (range > 0.00005) return 0.0000050
        if (range > 0.00001) return 0.0000025
        else return 0.000001
    }

    computeYAxis() {
        let level = this.getAxisLevel()
        //this.consoleService.chart("pair-chart level gr", level)
        let levels: number[] = this.findRoundNumbersBetween(this.minYView, this.maxYView, level)
        this.yAxis = []
        for (let i = 0; i < levels.length; ++i) {
            //let level = this.minYView + (this.maxYView - this.minYView) / this.nLines * i;
            //  this.consoleService.chart("pair-chart level comp", levels[i])
            let l = levels[i]
            let v = Math.round(this.flip(this.scaleY(l)))
            if (this.method == DrawMethods.SVG) v += 0.5
            levels[i] = Math.round(levels[i] * 100000000) / 100000000
            this.yAxis.push({val: v, text: levels[i]})
        }
    }

    findRoundNumbersBetween(min, max, level) {
        let range: number = max - min;
        let first = Math.ceil(min / level)
        let last = Math.floor(max / level)
        //this.consoleService.chart("pair-chart range", min, max, " steps", first * level, "la", last * level)
        let A = []
        for (let i = first; i <= last; i++) {
            A.push(i * level)
        }
        //this.consoleService.chart("pair-chart level", A)
        return A
    }

    computeXAxis() {
        this.xAxis = []
        for (let i = 0; i < this.nXAxis; ++i) {
            let level = this.minXView + (this.maxXView - this.minXView) / this.nXAxis * i;
            let d = new Date(level)
            this.xAxis.push({val: Math.round(this.scaleX(level)), text: this.drawer.getTimeLabel(d)})
        }
    }


    computeLines(g:Row) {

        g.draw.lines = [[g.flipped.fx + this.cW / 2, g.flipped.fl], [g.flipped.fx + this.cW / 2, g.flipped.fh]]
        if (this.method == DrawMethods.SVG)
            g.draw.borderlines = [
                [[g.flipped.fx, g.flipped.fo], [g.flipped.fx, g.flipped.fc]],   //left
                [[g.flipped.fx, g.flipped.fc], [g.flipped.fx + this.cW, g.flipped.fc]], //top
                [[g.flipped.fx + this.cW, g.flipped.fc], [g.flipped.fx + this.cW, g.flipped.fo]],  //right
                [[g.flipped.fx + this.cW, g.flipped.fo], [g.flipped.fx, g.flipped.fo]]]  //bottom
    }

    computeStick(g) {
        g.flipped.fcx = g.scaled.sx + this.cW / 2;
        g.flipped.fcy = g.flipped.fy - g.scaled.sH / 2
    }

    setBarWidth() {
        if (this.Data.hasData()) {
            //    this.cW = Math.round(this.W / Math.min(this.data.length, this.Nshow) * 0.7);
            this.Nshow = Math.round(this.W / (this.cW + this.cWMargin))
            //this.consoleService.chart("pair-chart cw",this.cW,this.W,this.Nshow)
        }
    }
    timerRecompute
    recompute() {
        this.consoleService.chart("  recompute")
        this.timerRecompute = new Date().getTime()
        if (this.Data.isEmpty()) return
        this.setBarWidth()
        this.setViewport();
        for (let i = this.idxMin; i <= this.idxMax; ++i) {
            let d:OHLC = this.Data.get(i)
            d.arrange()

            this.computeLines(d.data)
            this.computeStick(d.data)
        }
        this.computeYAxis()
        this.computeXAxis()
        this.consoleService.chart("STAT recompute", new Date().getTime() - this.timerRecompute)
    }


    getMarginRatio() {
        if (this.idxMax == this.Data.getSize() - 1)
            return 0.95
        else
            return 1
    }


    setViewAfterResize() {

        if (this.Data.isEmpty()) return
        this.idxMin = Math.max(0, this.Data.getSize() - this.Nshow)
        this.consoleService.chart("setviewafterresize", this.idxMin, this.idxMax)
        //this.idxMax = this.data.length - 1
        //this.consoleService.chart("pair-chart VIEW", this.idxMin, this.idxMax)
    }
}