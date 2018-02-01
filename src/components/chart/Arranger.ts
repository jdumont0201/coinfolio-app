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


    MRNormal = 100;
    DH;  //draw height
    DW;

    lastMargin = 30
    lastTs;


    //BAR WIDTH


    yAxis = [];
    xAxis = [];
    nLines = 5;

    //NAVIGATOR
    Nshow = 100;

    //VIEW
    idxMin;
    idxMax;


    setInitialView() {
        if (this.Data.isEmpty()) return

        this.Nshow = Math.round(this.W / (this.options.chart.cW + this.options.chart.cWMargin))
        //  console.log("chartN", this.W, this.Nshow, this.options.chart.cW, this.options.chart.cWMargin)
        this.idxMin = Math.max(0, this.Data.getSize() - this.Nshow)
        this.idxMax = this.Data.getSize() - 1
        //    this.consoleService.chart("setInitialView", this.idxMin, this.idxMax,this.Data.ohlc)
        //this.consoleService.chart("pair-chart VIEW", this.idxMin, this.idxMax)
    }


    setSize(w, h): boolean {
        if (this.W == w && this.H == h) return
        this.W = w
        this.H = h
        this.DW = this.W - this.options.chart.ML - this.options.chart.MR;
        this.DH = this.H - this.options.chart.MT - this.options.chart.MB;

        this.consoleService.chart("  setcanvassize", w, h,this.DW,this.DH)
    }


    minXView: number;
    maxXView: number;
    minYView: number;
    maxYView: number;


    lastPrice
    lastPriceLineX
    lastPriceLineY


    constructor(public method, public consoleService: ConsoleService, public format: string) {
        this.options = {
            indicators: {
                onchart:
                    {
                        sma: {
                            period: 10
                        }
                    }
            },
            chart: {
                MT: 30,
                MB: this.format == "mini" ? 50 : 80,
                ML: 0,
                MR: 100,
                cW: this.format == "mini" ? 4 : 6,
                cWMargin: this.format == "mini" ? 4 : 6
            },
            yAxis: {
                grid: {
                    color: "rgba(255,255,255,0.1)",
                    textColor: "rgba(255,255,255,0.5)",
                    strokeWidth: 1,
                    textStyle: ''
                }
            },
            xAxis: {
                height: 20,
                grid: {
                    color: "rgba(255,255,255,0.1)",
                    textColor: "rgba(255,255,255,0.5)",
                    strokeWidth: 1,
                    textStyle: ''
                }
            },
            navigator: {
                enabled: this.format == "mini" ? false : true,
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
                    downColor: "rgb(255,0,30)",
                    strokeWidth: 1,
                    upStrokeColor: this.format == "mini" ? 'rgb(80,250,100)' : 'rgb(80,250,100)',
                    downStrokeColor: this.format == "mini" ? 'rgb(250,50,100)' : 'rgb(250,50,100)',

                },
                line: {
                    width: 1,
                    upColor: this.format == "mini" ? 'rgb(80,250,100)' : 'rgb(80,250,100)',
                    downColor: this.format == "mini" ? 'rgb(250,50,100)' : 'rgb(250,50,100)',
                }
            }
        }
    }

    Data: Data;
    options

    nXAxis = 5;
    drawer: Drawer;

    setData(d: Data) {
        this.Data = d
    }

    setViewByNavigator(pc: number) {
        //this.consoleService.chart("setViewByNavigator", pc)
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

    setDrawer(d: Drawer) {
        this.drawer = d
    }

    setViewport() {
        if (!this.Data) return
        this.minYView = 1000000;
        this.maxYView = -100;

        this.minXView = this.Data.getTick(this.idxMin).raw.ts
        this.maxXView = this.Data.getTick(this.idxMax).raw.ts

        for (let i = this.idxMin; i <= this.idxMax; ++i) {
            this.minYView = Math.min(this.minYView, this.Data.getTick(i).raw.l)
            this.maxYView = Math.max(this.maxYView, this.Data.getTick(i).raw.h)
        }
        //this.consoleService.chart("setViewport", this.minXView, this.maxXView, "[", this.minYView, this.maxYView, "]")
    }

    scaleX(v): number {
        return ((v - this.minXView) / (this.maxXView - this.minXView) - 1 / this.Nshow) * this.DW
    }

    scaleY(v): number {
        return (v - this.minYView) / (this.maxYView - this.minYView) * this.DH;
    }

    flip(y): number {
        return this.options.chart.MT + this.DH - y
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

    getYAxisLevel(): number {
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
    getXAxisLevel(): number {

        let range = this.maxXView - this.minXView

        if (range < 5000) return 900
        if (range < 1500) return 1500
        if (range < 30000) return 9000
        if (range < 60000) return 18000

        else return 18000
    }

    computeYAxis() {
        let level = this.getYAxisLevel()
        //this.consoleService.chart("pair-chart level gr", level)
        let levels: number[] = this.findRoundNumbersBetween(this.minYView*0.9, this.maxYView*1.1, level)
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
        return A
    }

    computeXAxis() {
        let range = this.maxXView - this.minXView
        let step = this.getXAxisLevel()
        this.xAxis = []
        let levels: number[] = this.findRoundNumbersBetween(this.minXView-step , this.maxXView+step, step)
         //console.log("levels",levels,step,range,new Date(this.minXView*1000).toString(),new Date(this.maxXView*1000).toString());
        for (let i = 0; i < levels.length; ++i) {
            //let level: number = this.minXView + (this.maxXView - this.minXView) / this.nXAxis * i;
            let lev=levels[i];
           // console.log("levels",levels,level,range);
           var offset = new Date().getTimezoneOffset();
               //let dd = new Date(lev*1000).getTime()/1000;
               //console.log("dd",dd,new Date(lev*1000).toString())
               let d: number = lev;// - offset * 60;
                this.xAxis.push({val: Math.round(this.scaleX(lev)), text: this.drawer.getTimeLabel(d)})
        }
    }


    computeLines(g: Row) {

        g.draw.lines = [[g.flipped.fx + this.options.chart.cW / 2, g.flipped.fl], [g.flipped.fx + this.options.chart.cW / 2, g.flipped.fh]]
        if (this.method == DrawMethods.SVG)
            g.draw.borderlines = [
                [[g.flipped.fx, g.flipped.fo], [g.flipped.fx, g.flipped.fc]],   //left
                [[g.flipped.fx, g.flipped.fc], [g.flipped.fx + this.options.chart.cW, g.flipped.fc]], //top
                [[g.flipped.fx + this.options.chart.cW, g.flipped.fc], [g.flipped.fx + this.options.chart.cW, g.flipped.fo]],  //right
                [[g.flipped.fx + this.options.chart.cW, g.flipped.fo], [g.flipped.fx, g.flipped.fo]]]  //bottom
    }

    computeStick(g: Row) {
        g.flipped.fcx = g.scaled.sx + this.options.chart.cW / 2;
        g.flipped.fcy = g.flipped.fy - g.scaled.sH / 2
    }

    setBarWidth() {
        if (this.Data.isEmpty()) return
        //    this.cW = Math.round(this.W / Math.min(this.data.length, this.Nshow) * 0.7);

        this.Nshow = Math.round(this.W / (this.options.chart.cW + this.options.chart.cWMargin))
        this.options.chart.cW = Math.round(this.options.chart.cW)
        //this.consoleService.chart("pair-chart cw",this.cW,this.W,this.Nshow)

    }

    timerRecompute

    isShowingLast(): boolean {
        return this.idxMax == this.Data.getSize() - 1
    }

    recompute() {
        //this.consoleService.chart("  recompute")
        this.timerRecompute = new Date().getTime()
        if (this.Data.isEmpty()) return
        this.setBarWidth()
        this.setViewport();

        for (let i = this.idxMin; i <= this.idxMax; ++i) {
            let d: OHLC = this.Data.get(i)
            d.arrange(this)
            this.computeLines(d.data)
            this.computeStick(d.data)
        }
        this.computeYAxis()
        this.computeXAxis()
        this.Data.scaleIndicators()
        //this.consoleService.chart("STAT recompute", new Date().getTime() - this.timerRecompute)
    }


    getMarginRatio(): number {
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