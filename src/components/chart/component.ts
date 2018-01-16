import {Component, Input, OnInit, Injectable, ViewChild, ViewEncapsulation, SimpleChanges, SimpleChange, OnChanges, ElementRef, HostListener, AfterViewInit} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {EventService} from "../../lib/localton/services/event.service";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {AppSubscribeComponent} from "../subscribe/component";
import {Logic} from "../../logic/Logic";
import {RequestService} from "../../lib/globalton/core/services/request.service";
import {ApiService} from "../../lib/globalton/core/services/api.service";
import {TradingService} from "../../lib/localton/services/trading.service";

import * as Raphael from "raphael/raphael"
import * as Fabric from "fabric"

enum DrawMethods {SVG, Canvas}

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




    draw: {
        lines?: any[][],
        borderlines?: any[][],
    }


}

export class CandleStick {
    data: Row

    draw() {

    }
}

@Component({
    selector: 'app-chart',
    templateUrl: 'template.html',
    styleUrls: ['styles.css'],
    encapsulation: ViewEncapsulation.None

})
@Injectable()
export class AppChartComponent implements OnChanges, OnInit, AfterViewInit {
    @Input() data: any[] = [];
    @Input() gdata: Row[] = [];
    //@ViewChild('mycanvas') canvas: ElementRef;
    @ViewChild('chartcontainer') chartcontainer: ElementRef;
    @ViewChild('mycanvasbox') canvasbox: ElementRef;

    //TOTAL DIMENSIONS
    H = 400;
    W = 600;

    //MARGINS
    MT = 0;
    MB = 60;
    ML = 0;
    MR = 0;
    DH;
    DW;

    lastMargin = 30
    lastTs;

    //SPAN
    minX = 10000000000000;
    maxX = -100000000000;
    minY = 10000000000000;
    maxY = 0;
    spanX;
    spanY;

    //BAR WIDTH
    cW = 10;

    yAxis = [];
    xAxis = [];
    nLines = 5;

    //NAVIGATOR
    Nshow = 100;
    @Input() chartId;
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
            height: 30
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
                upColor: "rgb(80,240,80)",
                downColor: "rgb(200,40,40)"
            }
        }
    }

    currentMouseover = null;
    private mouseDown: boolean = false;
    private last: MouseEvent;
    private el: HTMLElement;
    mouseX;
    mouseY;
    crosshairLines1 = [[[0, 0], [0, 0]]]
    crosshairLines2 = [[[0, 100], [200, 100]]]

    constructor(public logic: Logic, public tradingService: TradingService, public authService: AuthService, public appConfigService: AppConfigService, public eventService: EventService, public apiService: ApiService, public requestService: RequestService, elementRef: ElementRef) {
        this.el = elementRef.nativeElement;
        this.method = DrawMethods.SVG

    }

    ngOnInit() {
        this.eventService.windowResizedEvent.subscribe((val) => {
            this.windowResized(val)
        })
        this.eventService.isFullscreenEvent.subscribe((val) => {
            console.log("chart chardid", val)
            if (this.chartId == val.id)
                setTimeout(() => {
                    this.windowResized(val)
                }, 200)
        })

    }

    /*
        isResizing = false;
        lastResize;
        redrawInterval;
        isResizeListenerStarted = false;

        startResizeListener() {
            this.isResizeListenerStarted = true;
            this.redrawInterval = setInterval(() => {
                let d = new Date().getTime();
                console.log("chart lastresize", this.redrawInterval, d, this.lastResize, d - this.lastResize)
                if (d - this.lastResize > 1000) {
                    console.log("chart reflow && clear", this.redrawInterval)
                    //this.draw()
                    this.updateAfterResize()
                    this.isResizing = false;
                    //for (var i = 1; i < this.redrawInterval; i++)
                    //window.clearInterval(i);
                    window.clearInterval(this.redrawInterval)
                    this.isResizeListenerStarted = false
                }
            }, 1000)
        }
    */
    resizeTimer;

    windowResized(val) {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {

            this.setCanvasSize(100, 300)
            setTimeout(() => {
                this.updateAfterResize()
            }, 200)
        }, 200);

    }

    paper;
    isReady = false;

    getContainerWidth() {
        let C = this.chartcontainer.nativeElement
        return C.offsetWidth
    }

    method

    initSize(): boolean {
        console.log("CHART initsize")
        let C = this.chartcontainer.nativeElement
        return this.setCanvasSize(C.offsetWidth, C.offsetHeight)
    }

    ngAfterViewInit() {
        let C = this.chartcontainer.nativeElement
        //console.log("raph",JSON.stringify(document.getElementById('chartcontainer')),this.W,this.H)

        let ready = this.initSize()
        if (this.isReady) this.initData()

    }

    initData() {

        this.readData()
        this.addMeta()
        this.setInitialView()
        this.recompute()
        this.draw();

    }

    updateAfterDataChange() {
        if (!this.data) return
        console.log("chart DATA N", this.data.length)
        this.reset()
        this.initData()
    }

    updateAfterResize() {
        console.log("CHART updateafterresize")
        this.initSize()
        this.recompute()
        this.draw()
    }

    updateAfterChangeView() {
        this.recompute()
        this.draw();
    }

    setView() {
        this.minYView = 1000000;
        this.maxYView = -100;

        this.minXView = this.gdata[this.idxMin].raw.ts
        this.maxXView = this.gdata[this.idxMax].raw.ts

        for (let i = this.idxMin; i <= this.idxMax; ++i) {
            this.minYView = Math.min(this.minYView, this.gdata[i].raw.l)
            this.maxYView = Math.max(this.maxYView, this.gdata[i].raw.h)
        }
        console.log("chart view", this.gdata, this.minXView, this.maxXView, "[", this.minYView, this.maxYView, "]")
    }

    recompute() {
        this.timerRecompute = new Date().getTime()
        if (!this.data) return
        this.setBarWidth()
        this.setView();
        for (let i = this.idxMin; i <= this.idxMax; ++i) {
            let d = this.gdata[i]
            this.scaleData(d)
            this.flipData(d)
            this.roundData(d)

            this.computeLines(d)
            this.computeStick(d)
        }
        this.computeYAxis()
        this.computeXAxis()
        console.log("CHART STAT recompute", new Date().getTime() - this.timerRecompute)
    }

    canvas;

    setCanvasSize(w, h): boolean {
        console.log("CHART setcanvassize", w, h)
        if (!w || !h) return false
        if (this.W == w && this.H == h) return

        let isShrinking = false;
        if (this.W > w)
            isShrinking = true
        this.W = w
        this.H = h
        this.DW = this.W - this.ML - this.MR;
        this.DH = this.H - this.MT - this.MB;
        if (this.W < 600) this.Nshow = 50
        if (this.paper) {
            console.log("chart existing set ", w, h)
            if (this.method == DrawMethods.SVG)
                this.paper.setSize(w, h)
            else {
                this.canvas = new Fabric.fabric.Canvas('chart-canvas' + this.chartId);
                this.canvas.setHeight(h);
                this.canvas.setWidth(w);
            }
        } else {
            /*
                        if (this.paper) {
                            console.log("chart overwrite ", w, h)
                            this.reset()
                            this.readData()
                            this.addMeta()

                            this.paper = new Raphael(this.chartcontainer.nativeElement, this.W, this.H); //option (b)

                        } else{*/
            console.log("chart new set ", w, h)
            if (this.method == DrawMethods.SVG)
                this.paper = new Raphael(this.chartcontainer.nativeElement, this.W, this.H); //option (b)
            else {
                this.canvas = new Fabric.fabric.Canvas('chart-canvas-' + this.chartId);
                this.canvas.renderOnAddRemove = false
                this.canvas.setHeight(h);
                this.canvas.setWidth(w);

            }

            //}


        }
        this.isReady = true
        return true
    }


    ngOnChanges(changes: SimpleChanges) {
        console.log("DATA", "change N=", this.data ? this.data.length : "")
        this.updateAfterDataChange()
    }


    //data related
    setWorkingData(d) {
        let g: Row = {
            meta: {},
            draw: {},
            flipped: {},
            scaled: {},
            raw: {
                o: parseFloat(d[1]),
                ts: parseInt(d[0]),
                h: parseFloat(d[2]),
                l: parseFloat(d[3]),
                c: parseFloat(d[4])
            }
        }

        this.gdata.push(g)
    }

    startTsDraw;
    lastTsDraw;

    isSelected() {

    }

    //data related
    computeMinMax(g: Row) {
        this.minX = Math.min(this.minX, g.raw.ts)
        this.maxX = Math.max(this.maxX, g.raw.ts)
        this.minY = Math.min(this.minY, g.raw.l)
        this.maxY = Math.max(this.maxY, g.raw.h)
        this.spanX = this.maxX - this.minX;
        this.spanY = this.maxY - this.minY;
    }

    //data related
    addMetaData(g: Row) {
        //console.log("av", JSON.stringify(g))
        //d.ts = Math.round((d.ts - this.minX) * 2 / 1000) / 2
        g.meta = {}
        g.meta.maxoc = Math.max(g.raw.o, g.raw.c)
        g.meta.minoc = Math.min(g.raw.o, g.raw.c)
        g.raw.H = Math.abs(g.raw.c - g.raw.o)

        //console.log("ap", JSON.stringify(g))

    }

    scaleX(v): number {
        return ((v - this.minXView) / (this.maxXView - this.minXView) - 1 / this.Nshow) * this.DW
    }

    minXView: number;
    maxXView: number;
    minYView: number;
    maxYView: number;

    scaleY(v): number {
        return (v - this.minYView) / (this.maxYView - this.minYView) * this.DH;
    }

    flip(y): number {
        return this.MT + this.DH - y
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

    getMarginRatio() {
        if (this.idxMax == this.data.length - 1)
            return 0.95
        else
            return 1
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

    findRoundNumbersBetween(min, max, level) {
        let range: number = max - min;
        let first = Math.ceil(min / level)
        let last = Math.floor(max / level)
        console.log("chart range", min, max, " steps", first * level, "la", last * level)
        let A = []
        for (let i = first; i <= last; i++) {
            A.push(i * level)
        }
        console.log("chart level", A)
        return A
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
        if (range > 0.00001) return 0.0000025
        else return 0.001
    }

    computeYAxis() {
        let level = this.getAxisLevel()
        console.log("chart level gr", level)
        let levels: number[] = this.findRoundNumbersBetween(this.minYView, this.maxYView, level)
        this.yAxis = []
        for (let i = 0; i < levels.length; ++i) {
            //let level = this.minYView + (this.maxYView - this.minYView) / this.nLines * i;
            console.log("chart level comp", levels[i])
            let l = levels[i]
            let v= Math.round(this.flip(this.scaleY(l)))
            if(this.method==DrawMethods.SVG) v+=0.5
            levels[i]=Math.round(levels[i]*100000000)/100000000
            this.yAxis.push({val:v, text: levels[i]})
        }
    }

    nXAxis = 5;

    computeXAxis() {
        this.xAxis = []
        for (let i = 0; i < this.nXAxis; ++i) {
            let level = this.minXView + (this.maxXView - this.minXView) / this.nXAxis * i;
            let d = new Date(level)
            this.xAxis.push({val: Math.round(this.scaleX(level)), text: this.getTimeLabel(d)})
        }
    }


    readData() {
        if (!this.data) return
        let N = this.data.length;
        console.log("chart data", this.data)
        this.data.forEach((d) => {

            this.setWorkingData(d)
        })
    }


    addMeta() {
        console.log("DATABOX", this.minX, this.minY, this.maxX, this.maxY)
        this.gdata.forEach((d) => {
            this.computeMinMax(d)
        })
        this.gdata.forEach((d) => {
            this.addMetaData(d)
        })
    }

    computeLines(g) {
        g.draw.lines = [[g.flipped.fx + this.cW / 2, g.flipped.fl], [g.flipped.fx + this.cW / 2, g.flipped.fh]]
        if(this.method==DrawMethods.SVG)
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
        if (this.data)
            this.cW = this.W / Math.min(this.data.length, this.Nshow) * 0.7;
    }

    isMouseDownNavigator = false;

    setViewByNavigator(pc) {
        let N = this.data.length
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

    clear() {
        if (this.method == DrawMethods.SVG)
            this.paper.clear()
        else
            this.canvas.clear();
    }

    draw() {
        this.timerDraw = new Date().getTime()
        if (this.method == DrawMethods.SVG && !this.paper) return
        if (this.method == DrawMethods.Canvas && !this.canvas) return
        if (!this.data) return
        if (!this.isReady) return
        this.clear()
        this.yAxis.forEach((li) => {
            console.log("CHART yaxis line ", 0, li.val, this.W, li.val)
            this.drawLine(0, li.val, this.W, li.val, this.options.yAxis.grid.strokeWidth, this.options.yAxis.grid.color);
            console.log("CHART yaxis text ", 30, li.val, li.text)
            this.drawText(30, Math.round(li.val - this.H * 0.02), li.text, this.options.yAxis.grid.textColor);
        })

        //XAXIS
        let xAxisY = this.H - this.options.navigator.height - this.options.xAxis.height;
        this.drawRect(0, xAxisY, this.W, this.options.xAxis.height, "rgba(0,0,0,0.5)", 0, null, null)
        this.xAxis.forEach((li) => {
            //this.drawLine(li.val,10, this.W, li.val, this.options.yAxis.grid.strokeWidth, this.options.yAxis.grid.color);
            console.log("CHART xaxis text", li.val, this.H - 30 - this.options.xAxis.height, li.text)
            this.drawText(li.val, xAxisY + this.options.xAxis.height / 2, li.text, "rgb(255,255,255)");
        })

        //NAVIGATOR
        let navY = this.H - this.options.navigator.height;

        let navbar = this.drawRect((this.minXView - this.minX) / (this.spanX) * this.DW, navY, (this.maxXView - this.minXView) / (this.spanX) * this.DW, this.options.navigator.height, "rgba(0,0,0,1)", 0, null, null, null, "nav")
        if (this.method == DrawMethods.SVG) {
            navbar.mousedown((e) => {
                console.log("chart e", e)
            })

        } else {
        }

        let nav = this.drawRect(0, navY, this.W, this.options.navigator.height, "rgba(0,0,0,0.5)", 0, null, null, null, "nav")
        if (this.method == DrawMethods.SVG) {
            nav.mouseup((e) => {
                this.isMouseDownNavigator = false
            })
            nav.mousedown((e) => {
                this.isMouseDownNavigator = true
                let pc = e.offsetX / this.W;
                this.setViewByNavigator(pc)
                this.updateAfterChangeView()

            })
            nav.mousemove((e) => {
                if (this.isMouseDownNavigator) {
                    let pc = e.offsetX / this.W;
                    this.setViewByNavigator(pc)
                    this.updateAfterChangeView()
                }
            })
        } else {

        }
        console.log("CHART navigator", this.minXView, this.spanX, "start", (this.minXView - this.minX) / (this.spanX), " %=", (this.minXView - this.minX) / (this.spanX) * this.DW, "width", (this.maxXView - this.minXView) / (this.spanX) * this.DW)


        //CANDLESTICKS
        for (let i = this.idxMin; i <= this.idxMax; ++i) {
            let g = this.gdata[i]
            let r;
            //low high
            //console.log("DRAW HL")
            this.drawLine(g.draw.lines[0][0], g.draw.lines[0][1], g.draw.lines[1][0], g.draw.lines[1][1], this.options.candlestick.line.width, g.raw.c > g.raw.o ? this.options.candlestick.line.upColor : this.options.candlestick.line.downColor);


            //body
            if (true) {
                //  console.log("DRAW BODY")
                this.drawRect(g.flipped.fx, g.flipped.fy - g.flipped.fH, this.cW, g.flipped.fH, g.raw.c > g.raw.o ? this.options.candlestick.body.upColor : this.options.candlestick.body.downColor, this.options.candlestick.body.strokeWidth, g.raw.c > g.raw.o ? this.options.candlestick.body.upColor : this.options.candlestick.body.downColor, g);

            }
            if (this.method == DrawMethods.SVG) {
                //border
                //console.log("DRAW BORDER")
                g.draw.borderlines.forEach((l) => {
                    this.drawLine(l[0][0], l[0][1], l[1][0], l[1][1],
                        this.options.candlestick.line.width, g.raw.c > g.raw.o ? this.options.candlestick.line.upColor : this.options.candlestick.line.downColor
                    )
                    ;
                })
            }

        }
        if (this.method == DrawMethods.Canvas) {
            this.canvas.selection = false;
            this.canvas.forEachObject(function (o) {
                //console.log(o)
                o.selectable = false;
            });
            console.log("chart render")
            this.canvas.renderAll();
            setTimeout(()=> {this.canvas.renderAll();},1000)
        }
        console.log("CHART STAT draw", new Date().getTime() - this.timerDraw)
    }

    idxMin;
    idxMax;
    timerRecompute
    timerDraw

    setInitialView() {
        if (!this.data) return
        this.idxMin = Math.max(0, this.data.length - this.Nshow)
        this.idxMax = this.data.length - 1
        console.log("chart VIEW", this.idxMin, this.idxMax)
    }


    reset() {
        this.gdata = [];
        this.minX = 10000000000000;
        this.maxX = -100000000000;
        this.minY = 10000000000000;
        this.maxY = 0;
        this.yAxis = []
        if (this.paper) this.paper.clear()
    }


    drawTooltip(g) {
        let tx = 0;
        let ty = 0;
        let th = 400;
        let tw = 120
        let t = this.paper.rect(tx, ty, tw, th).attr("stroke-width", 0);
        t.attr("fill", "rgba(0,0,0,0.5)")
        let d = new Date(g.raw.ts);
        let tym = ty + 20;
        let txm = 10;
        let txmm = 10;
        let tymm = 20;
        let tc = "rgb(255,255,255)"
        t = this.paper.text(txmm, tym, "Date:" + this.getTimeLabel(g.raw.ts)).attr("fill", tc).attr({'text-anchor': 'start'})
        t = this.paper.text(txmm, tym + tymm, "Open:" + g.raw.o).attr("fill", tc).attr({'text-anchor': 'start'})
        t = this.paper.text(txmm, tym + 2 * tymm, "High:" + g.raw.h).attr("fill", tc).attr({'text-anchor': 'start'})
        t = this.paper.text(txmm, tym + 3 * tymm, "Low:" + g.raw.l).attr("fill", tc).attr({'text-anchor': 'start'})
        t = this.paper.text(txmm, tym + 4 * tymm, "Close:" + g.raw.c).attr("fill", tc).attr({'text-anchor': 'start'})

    }

    drawRect(x, y, w, h, fill, width, stroke, g: Row, isTooltip?: boolean, type?: string) {

        //console.log("chart Rect", x, y, w, h)
        if (this.method == DrawMethods.SVG) {
            if (Math.round(x) == x) x += 0.5
            if (Math.round(y) == y) y += 0.5
            let r = this.paper.rect(x, y, w, h).attr("fill", fill);
            if (stroke) {
                r.attr("stroke", stroke);
                r.attr("stroke-width", width);
            }
            if (g)
                r.mouseover((e) => {
                    this.currentMouseover = g.raw.ts
                    //r.attr({'cursor':'pointer'})
                    x = e.pageX + 50;
                    y = e.pageY;
                    console.log(g.raw)
                    this.drawTooltip(g)
                    /*if (!isTooltip) {
                        let rr = this.drawRect(g.flipped.fx, 0, this.cW * 1.2, this.H, "rgba(0,0,0,0.5)", null, null, g, true);
                        rr.mouseover((e) => {
                            this.drawTooltip(g)
                        })
                    }*/
                });
            /*
            this.drawLine(g.draw.lines[0][0], g.draw.lines[0][1], g.draw.lines[1][0], g.draw.lines[1][1], this.options.candlestick.line.width, 'rgb(0,0,0)');
            this.drawRect(g.flipped.fx, g.flipped.fy - g.flipped.fH, this.cW, g.flipped.fH, g.raw.c > g.raw.o ? this.options.candlestick.body.upColor : this.options.candlestick.body.downColor,
                this.options.candlestick.body.strokeWidth, g.raw.c > g.raw.o ? this.options.candlestick.body.upColor : this.options.candlestick.body.downColor, g);
            g.draw.borderlines.forEach((l) => {
                this.drawLine(l[0][0], l[0][1], l[1][0], l[1][1],
                    this.options.candlestick.line.width, 'rgb(0,0,0)'
                )
                ;
            })*/


            /*
             t=this.paper.text(txmm,tym,"Date:"+this.getTimeLabel(raw.ts));t.attr("fill","rgb(0,0,0)")
             t=this.paper.text(txmm+txm,tym,"O:"+raw.o);t.attr("fill","rgb(0,0,0)")
             t=this.paper.text(txmm+2*txm,tym,"H:"+raw.h);t.attr("fill","rgb(0,0,0)")
             t=this.paper.text(txmm+3*txm,tym,"L:"+raw.l);t.attr("fill","rgb(0,0,0)")
             t=this.paper.text(txmm+4*txm,tym,"C:"+raw.c);t.attr("fill","rgb(0,0,0)")*/

            if (g)
                r.mouseout((e) => {
                    this.draw()
                })
            return r;
        } else {
            var rect = new Fabric.fabric.Rect({
                left: x,
                top: y,
                fill: fill,
                width: w,
                height: h,
                strokeWidth: 1, stroke: 'rgba(255,255,255,1)'
            });


            rect.lockUniScaling = true
            this.canvas.add(rect);
            if (type == "nav")
                rect.on('mousedown',
                    (e) => {

                        this.isMouseDownNavigator = true
                        let pc = e.e.offsetX / this.W;
                        console.log("chart click", e, pc)
                        this.setViewByNavigator(pc)
                        this.updateAfterChangeView()

                    }
                );
            rect.on('mouseup',(e) => {
                this.isMouseDownNavigator = false
            })

            rect.on('mouse:move',(e) => {
                if (this.isMouseDownNavigator) {
                    let pc = e.offsetX / this.W;
                    this.setViewByNavigator(pc)
                    this.updateAfterChangeView()
                }
            })
            this.canvas.item(0).selectable = false;
        }

    }

    drawText(x, y, t: string, color) {
        //console.log("chart text",x,y,t)
        if (this.method == DrawMethods.SVG) {
            let r = this.paper.text(x, y, t)
            r.attr("fill", color)
        } else {
            t = t.toString()
            let r = new Fabric.fabric.Textbox(t, {
                left: x,
                top: y,
                width: 120,fill:color,
                fontSize: 10, color: color,fontFamily:"Arial"

            });
            this.canvas.add(r)
            this.canvas.item(0).selectable = false;
        }
    }

    drawLine(x, y, x2, y2, width, color) {
        //console.log("chart Line",x,y,x2,y2,"width",width,"color",color)
        if (this.method == DrawMethods.SVG) {
            if (Math.round(x) == x) x += 0.5
            if (Math.round(y) == y) y += 0.5
            if (Math.round(y2) == y2) y2 += 0.5
            if (Math.round(x2) == x2) x2 += 0.5

            let r = this.paper.path("M" + x + "," + y + " L" + x2 + "," + y2);
            r.attr("stroke-width", width);
            r.attr("stroke", color);
        } else {
            let line = new Fabric.fabric.Line([x, y, x2, y2], {

                stroke: color,
                strokeWidth: width,

            });
            this.canvas.add(line);
            this.canvas.item(0).selectable = false;
        }
    }

    getTimeLabel(ts): string {
        let d = new Date(ts);
        let m = d.getMinutes();
        return d.getHours() + ":" + (m > 9 ? m : ("0" + m))
    }


}

