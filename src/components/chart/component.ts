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
import {CheckValid} from "../../lib/localton/components/CheckValid/component";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
export enum DrawMethods {SVG, Canvas}
import {RawLoadedData,Row} from "./Types"
import {Data} from "./Data"


@Component({
    selector: 'app-chart',
    templateUrl: 'template.html',
    styleUrls: ['styles.css'],
    encapsulation: ViewEncapsulation.None

})
@Injectable()
export class AppChartComponent extends CheckValid implements OnChanges, OnInit, AfterViewInit {
    @Input() data: any[] = [];
//    @Input() gdata: Row[] = [];
    //@ViewChild('mycanvas') canvas: ElementRef;
    @ViewChild('chartcontainer') chartcontainer: ElementRef;
    @ViewChild('mycanvasbox') canvasbox: ElementRef;

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

    Data;

    currentMouseover = null;
    private mouseDown: boolean = false;
    private last: MouseEvent;
    private el: HTMLElement;
    mouseX;
    mouseY;
    crosshairLines1 = [[[0, 0], [0, 0]]]
    crosshairLines2 = [[[0, 100], [200, 100]]]

    constructor(public logic: Logic, public tradingService: TradingService, public consoleService: ConsoleService, public authService: AuthService, public appConfigService: AppConfigService, public eventService: EventService, public apiService: ApiService, public requestService: RequestService, elementRef: ElementRef) {
        super(consoleService)
        this.consoleService.chart("+")
        this.el = elementRef.nativeElement;
        this.method = DrawMethods.Canvas
        this.Data = new Data(consoleService)
    }

    ngOnInit() {
        this.consoleService.chart("ngoninit")
        if (!this.chartId) this.consoleService.chart("ERR NO CHART ID", this.chartId)
        this.doSubscribe("windowResizedEvent-" + this.chartId, this.eventService.windowResizedEvent, (val) => {
            this.windowResized(val)
        })
        this.doSubscribe("menuDisplayUpdatedEvent-" + this.chartId, this.eventService.menuDisplayUpdatedEvent, (val) => {
            this.windowResized(val)
        })
        this.doSubscribe("isFullscreenEvent-" + this.chartId, this.eventService.isFullscreenEvent, (val) => {
            //this.consoleService.chart("pair-chart chardid", val)
            if (this.chartId == val.id)
                setTimeout(() => {
                    this.windowResized(val)
                }, 50)
        })

    }

    resizeTimer;

    windowResized(val) {
        this.consoleService.chart("--> windowResized")
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
            //this.setCanvasSize(100, 300)
            //setTimeout(() => {
            this.updateAfterResize()
            //}, 100)
        }, 100);

    }

    paper;
    isReady = false;

    getContainerWidth() {
        let C = this.chartcontainer.nativeElement
        return C.offsetWidth
    }

    method

    initSize(f) {
        let C = this.chartcontainer.nativeElement
        this.consoleService.chart("  initsize", C.offsetWidth, C.offsetHeight)
        setTimeout(() => {
            f(this.setCanvasSize(C.offsetWidth, C.offsetHeight))
        }, 200)

    }

    ngAfterViewInit() {
        this.consoleService.chart("--> ngafterviewinit")
        let C = this.chartcontainer.nativeElement

        let ready = this.initSize(() => {
            if (this.isReady) this.initData()
        })


    }

    initData() {
        if (this.data) {
            this.consoleService.chart("initData", this.data)
            this.readData()
            this.Data.addMeta()
            this.setBarWidth()
            this.setInitialView()
            this.recompute()
            this.draw();
        }
    }

    updateAfterDataChange() {

        if (!this.data) return
        this.consoleService.chart("updateAfterDataChange", this.data)
        this.reset()
        this.initData()
    }

    updateAfterResize() {
        this.consoleService.chart("updateafterresize")
        if (!this.data) return
        this.initSize(() => {
            this.setBarWidth()
            this.setViewAfterResize()
            this.recompute()
            this.draw()
        })

    }

    updateAfterChangeView() {
        this.consoleService.chart("updateAfterChangeView")
        this.recompute()
        this.draw();
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

    recompute() {
        this.consoleService.chart("  recompute")
        this.timerRecompute = new Date().getTime()
        if (!this.data) return
        this.setBarWidth()
        this.setViewport();
        for (let i = this.idxMin; i <= this.idxMax; ++i) {
            let d = this.Data.getTick(i)
            this.scaleData(d)
            this.flipData(d)
            this.roundData(d)

            this.computeLines(d)
            this.computeStick(d)
        }
        this.computeYAxis()
        this.computeXAxis()
        this.consoleService.chart("STAT recompute", new Date().getTime() - this.timerRecompute)
    }

    canvas;

    setCanvasSize(w, h): boolean {

        this.consoleService.chart("  setcanvassize", w, h)
        if (!w || !h) return false
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
        if (this.paper) {
            //this.consoleService.chart("pair-chart existing set ", w, h)
            if (this.method == DrawMethods.SVG)
                this.paper.setSize(w, h)
            else {
                if (!this.chartId) this.consoleService.chart("err no chartid", this.chartId)
                this.canvas = new Fabric.fabric.StaticCanvas('chart-canvas' + this.chartId);
                this.canvas.setHeight(h);
                this.canvas.setWidth(w);
            }
        } else {
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
        this.consoleService.chart("--> onChanges")
        this.updateAfterDataChange()
    }


    //data related


    startTsDraw;
    lastTsDraw;

    isSelected() {

    }


    //data related

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
        //this.consoleService.chart("pair-chart range", min, max, " steps", first * level, "la", last * level)
        let A = []
        for (let i = first; i <= last; i++) {
            A.push(i * level)
        }
        //this.consoleService.chart("pair-chart level", A)
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
        //this.consoleService.chart("pair-chart data", this.data)
        this.Data.read(this.data)
    }


    computeLines(g) {
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
        if (this.data) {
            //    this.cW = Math.round(this.W / Math.min(this.data.length, this.Nshow) * 0.7);
            this.Nshow = Math.round(this.W / (this.cW + this.cWMargin))
            //this.consoleService.chart("pair-chart cw",this.cW,this.W,this.Nshow)
        }
    }

    isMouseDownNavigator = false;

    setViewByNavigator(pc) {
        this.consoleService.chart("setViewByNavigator", pc)
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
        this.consoleService.chart("CLEAR")
        if (this.method == DrawMethods.SVG)
            this.paper.clear()
        else
            this.canvas.clear();
    }

    paintYAxis() {

        this.yAxis.forEach((li) => {
            //this.consoleService.chart("yaxis line ", 0, li.val, this.W, li.val)
            this.drawLine("yaxis-" + li.val, 0, li.val, this.W, li.val, this.options.yAxis.grid.strokeWidth, this.options.yAxis.grid.color);
            //this.consoleService.chart("yaxis text ", 30, li.val, li.text)
            this.drawText(this.W - 50, Math.round(li.val - 15), li.text, this.options.yAxis.grid.textColor);
        })
    }

    paintXAxis() {
        //XAXIS
        let xAxisY = this.H - this.options.navigator.height - this.options.xAxis.height;
        this.drawRect("xaxis-bar", 0, xAxisY, this.W, this.options.xAxis.height, "rgba(0,0,0,1)", 0, null, null)
        this.xAxis.forEach((li) => {
            this.drawLine("xaxis-" + li.val, li.val, this.MT, li.val, this.H - this.MB, this.options.xAxis.grid.strokeWidth, this.options.xAxis.grid.color);
            this.drawText(li.val - 10, Math.round(xAxisY + this.options.xAxis.height / 2) - 5, li.text, "rgb(255,255,255)");
        })
    }

    paintNavigator() {
        //NAVIGATOR
        let navY = this.H - this.options.navigator.height;
        let navXm = Math.round((this.minXView - this.Data.minX) / (this.Data.spanX) * this.DW);
        let navXM = Math.round((this.maxXView - this.minXView) / (this.Data.spanX) * this.DW)
        let navbar = this.drawRect("navbar", navXm, navY, navXM, this.options.navigator.height, "rgba(255,255,255,1)", 0, null, null, null)
        let nav = this.drawRect("nav", 0, navY, this.W, this.options.navigator.height, "rgba(255,255,255,0.5)", 0, null, null, null)
        nav.on('mouseup', (e) => {
            this.consoleService.chart("nav up", e)
            this.isMouseDownNavigator = false
        })
        nav.on('mousedown', (e) => {

            this.isMouseDownNavigator = true
            let pc = e.e.offsetX / this.W;
            if (pc) {
                this.consoleService.chart("nav down", pc, e)
                this.setViewByNavigator(pc)
                this.updateAfterChangeView()
            }
        })
        nav.on('mousemove', (e) => {
            if (this.isMouseDownNavigator) {
                let pc = e.e.offsetX / this.W;
                if (pc) {
                    this.setViewByNavigator(pc)
                    this.updateAfterChangeView()
                }
            }
        })

    }

    paintCandleSticks() {
        //CANDLESTICKS
        for (let i = this.idxMin; i <= this.idxMax; ++i) {
            this.paintCandleStick(i)

        }
    }

    paintCandleStick(i) {
        let g = this.Data.getTick(i)
        let r;
        //low high
        ////this.consoleService.chart("DRAW HL")
        this.drawLine("candle-" + i + "lowhigh", g.draw.lines[0][0], g.draw.lines[0][1], g.draw.lines[1][0], g.draw.lines[1][1], this.options.candlestick.line.width, g.raw.c > g.raw.o ? this.options.candlestick.line.upColor : this.options.candlestick.line.downColor);


        //body
        if (true) {
            //  //this.consoleService.chart("DRAW BODY")
            let r = this.drawRect("candle-" + i + "-body", g.flipped.fx, g.flipped.fy - g.flipped.fH, this.cW, g.flipped.fH, g.raw.c > g.raw.o ? this.options.candlestick.body.upColor : this.options.candlestick.body.downColor, this.options.candlestick.body.strokeWidth, g.raw.c > g.raw.o ? this.options.candlestick.body.upColor : this.options.candlestick.body.downColor, g);


        }
        if (this.method == DrawMethods.SVG) {
            //border
            ////this.consoleService.chart("DRAW BORDER")
            g.draw.borderlines.forEach((l) => {
                this.drawLine("candle-" + i + "-border-", l[0][0], l[0][1], l[1][0], l[1][1],
                    this.options.candlestick.line.width, g.raw.c > g.raw.o ? this.options.candlestick.line.upColor : this.options.candlestick.line.downColor
                )
                ;
            })
        }
    }

    setEvents() {
        this.canvas.selection = false
        this.canvas.on('mouse:over', (e) => {
            this.consoleService.chart("event mouseover target=", e.target ? e.target.name : "")
            if (e.target) {
                //e.target.set('fill', 'red');
                //this.canvas.renderAll();
            }
        });
        this.canvas.on('mouse:down', (e) => {
            this.consoleService.chart("event down", e.target)
            this.isMouseDownNavigator = true
        })
        this.canvas.on('mouse:up', (e) => {
            this.consoleService.chart("event up", e.target)
            this.isMouseDownNavigator = false
        })
    }

    draw() {
        this.consoleService.chart("    draw")
        this.timerDraw = new Date().getTime()

        this.canvas.selection = false

        if (this.method == DrawMethods.SVG && !this.paper) return
        if (this.method == DrawMethods.Canvas && !this.canvas) return
        if (!this.data) return
        if (!this.isReady) return
        this.clear()
        this.paintYAxis()
        this.drawLine("topline", 0, 0, this.W, 0, this.options.xAxis.grid.strokeWidth, "rgba(0,0,0,1)");
        this.paintXAxis()


        this.paintNavigator()
        this.paintCandleSticks()
        this.setEvents()
        if (this.method == DrawMethods.Canvas) {
            //this.canvas.selection = false;
            /*this.canvas.forEachObject(function (o) {
                ////this.consoleService.chart(o)

                o.selectable = false;
            });*/

            this.consoleService.chart("STAT draw", new Date().getTime() - this.timerDraw)
            this.timerDraw = new Date().getTime()
            this.consoleService.chart("      render")
            this.canvas.renderAll();
            this.consoleService.chart("STAT render", new Date().getTime() - this.timerDraw)
            /*setTimeout(() => {
                this.canvas.renderAll();
            }, 200)*/
        }

    }

    idxMin;
    idxMax;
    timerRecompute
    timerDraw

    setInitialView() {
        if (!this.data) return
        this.idxMin = Math.max(0, this.data.length - this.Nshow)
        this.idxMax = this.data.length - 1
        this.consoleService.chart("setInitialView", this.idxMin, this.idxMax)
        //this.consoleService.chart("pair-chart VIEW", this.idxMin, this.idxMax)
    }

    setViewAfterResize() {

        if (!this.data) return
        this.idxMin = Math.max(0, this.data.length - this.Nshow)
        this.consoleService.chart("setviewafterresize", this.idxMin, this.idxMax)
        //this.idxMax = this.data.length - 1
        //this.consoleService.chart("pair-chart VIEW", this.idxMin, this.idxMax)
    }


    reset() {
        this.Data.reset();
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

    drawRect(name: string, x, y, w, h, fill, strokeWidth, stroke, g: Row, isTooltip?: boolean) {
        //this.consoleService.chart("draw Rect", name, x, y, w, h)
        if (this.method == DrawMethods.SVG) {
            if (Math.round(x) == x) x += 0.5
            if (Math.round(y) == y) y += 0.5
            let r = this.paper.rect(x, y, w, h).attr("fill", fill);
            if (stroke) {
                r.attr("stroke", stroke);
                r.attr("stroke-width", strokeWidth);
            }
            if (g)
                r.mouseover((e) => {
                    this.currentMouseover = g.raw.ts
                    //r.attr({'cursor':'pointer'})
                    x = e.pageX + 50;
                    y = e.pageY;
                    //this.consoleService.chart(g.raw)
                    this.drawTooltip(g)
                    /*if (!isTooltip) {
                        let rr = this.drawRect(g.flipped.fx, 0, this.cW * 1.2, this.H, "rgba(0,0,0,0.5)", null, null, g, true);
                        rr.mouseover((e) => {
                            this.drawTooltip(g)
                        })
                    }*/
                });

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
            rect.set('selectable', false);
            /*rect.on('mousemove', (e) => {
                this.consoleService.chart("rectmove", e)
            })*/
            rect.name = name
            rect.lockUniScaling = true
            this.canvas.add(rect);

            return rect;
        }

    }


    drawText(x, y, t: string, color) {
        ////this.consoleService.chart("pair-chart text",x,y,t)
        if (this.method == DrawMethods.SVG) {
            let r = this.paper.text(x, y, t)
            r.attr("fill", color)
        } else {
            t = t.toString()
            let r = new Fabric.fabric.Textbox(t, {
                left: x,
                top: y,
                width: 120, fill: color,
                fontSize: 10, color: color, fontFamily: "Arial"

            });
            this.canvas.add(r)
            this.canvas.item(0).selectable = false;
            return r;
        }
    }

    drawLine(name, x, y, x2, y2, width, color) {
        ////this.consoleService.chart("pair-chart Line",x,y,x2,y2,"width",width,"color",color)
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
            line.name = name;
            this.canvas.add(line);
            this.canvas.item(0).selectable = false;
            return line
        }
    }

    getTimeLabel(ts): string {
        let d = new Date(ts);
        let m = d.getMinutes();
        return d.getHours() + ":" + (m > 9 ? m : ("0" + m))
    }
}

