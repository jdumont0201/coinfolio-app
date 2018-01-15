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
    @ViewChild('mycanvas') canvas: ElementRef;
    @ViewChild('chartcontainer') chartcontainer: ElementRef;
    @ViewChild('mycanvasbox') canvasbox: ElementRef;

    //TOTAL DIMENSIONS
    H = 400;
    W = 600;

    //DRAW CHART DIMENSIONS
    DX=0;
    DY=0;
    DH = 370;
    DW = 600;

    //SPAN
    minX = 10000000000000;
    maxX = -100000000000;
    minY = 10000000000000;
    maxY = 0;
    spanX;
    spanY;

    //BAR WIDTH
    cW = 10;

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
        crosshair: {
            width: 1,
            color: "rgb(100,100,100)"
        },
        candlestick: {

            body: {
                width: 20,
                upColor: "rgb(40,200,40)",
                downColor: "rgb(200,40,40)",
                strokeWidth: 1,
                upStrokeColor: "rgb(200,200,200)",
                downStrokeColor: "rgb(200,200,200)"

            },
            line: {
                width: 1,
                upColor: "rgb(200,200,200)",
                downColor: "rgb(200,200,200)"
            }
        }
    }

    private mouseDown: boolean = false;
    private last: MouseEvent;
    private el: HTMLElement;
    mouseX;
    mouseY;
    crosshairLines1 = [[[0, 0], [0, 0]]]
    crosshairLines2 = [[[0, 100], [200, 100]]]

    constructor(public logic: Logic, public tradingService: TradingService, public authService: AuthService, public appConfigService: AppConfigService, public eventService: EventService, public apiService: ApiService, public requestService: RequestService, elementRef: ElementRef) {
        this.el = elementRef.nativeElement;

    }

    ngOnInit() {
        this.eventService.windowResizedEvent.subscribe((val) => {
            this.windowResized(val)
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

            this.setCanvasSize(100, this.H)
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

    initSize(): boolean {
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
        this.recompute()
        this.draw();

    }

    updateAfterDataChange() {
        this.reset()
        this.readData()
        this.addMeta()
        this.recompute()
        this.draw()
    }

    updateAfterResize() {
        console.log("CHART updateafterresize")
        this.initSize()
        this.recompute()
        this.draw()
    }

    Nshow = 100;

    setCanvasSize(w, h): boolean {
        console.log("CHART setcanvassize", w, h)
        if (!w || !h) return false
        if (this.W == w && this.H == h) return

        let isShrinking = false;
        if (this.W > w)
            isShrinking = true
        this.W = w
        this.H = h


        if (this.paper) {
            console.log("chart existing set ", w, h)
            this.paper.setSize(w, h)
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
            this.paper = new Raphael(this.chartcontainer.nativeElement, this.W, this.H); //option (b)
            //}


        }
        this.isReady = true
        return true
    }


    mouseEnter(ev: MouseEvent) {
        console.log("mouseenter", ev)
    }

    mouseLeave(ev: MouseEvent) {
        console.log("mouseleave", ev)
    }

    mouseMove(ev: MouseEvent) {
        console.log("mousemove", ev)
    }

    /*
        @HostListener('mousemove', ['$event'])
        onMousemove(event: MouseEvent) {
            console.log("mm", event)
            this.mouseX = event.offsetX
            this.mouseY = event.offsetY
            this.crosshairLines1 =[[[0, 100], [200, 100]]];// [[[0, this.mouseY], [this.W, this.mouseY]]]
            this.crosshairLines2 =[[[0, 100], [200, 100]]];// [[[this.mouseX, 0], [this.mouseX, this.H]]]
            console.log("gdata cross",this.mouseX,this.mouseY, event, this.crosshairLines1, this.crosshairLines2)
            if (this.mouseDown) {
                this.last = event;
            }
        }

        @HostListener('mousedown', ['$event'])
        onMousedown(event) {
            console.log("md", event)
            this.mouseDown = true;
            this.last = event;
        }

        @HostListener('mouseup')
        onMouseup() {
            console.log("mu", event)
            this.mouseDown = false;
        }*/


    ngOnChanges(changes: SimpleChanges) {
        console.log("DATA", "change N=", this.data ? this.data.length : "")
        this.updateAfterDataChange()
    }

    setWorkingData(d) {
        let g: Row = {
            meta: {},
            draw: {},
            flipped: {},
            scaled: {},
            raw: {
                o: parseFloat(d[1]), ts: parseInt(d[0]),
                h: parseFloat(d[2]),
                l: parseFloat(d[3]),
                c: parseFloat(d[4])
            }
        }
        this.gdata.push(g)
    }

    setMinMax(g: Row) {

        this.minX = Math.min(this.minX, g.raw.ts)
        this.maxX = Math.max(this.maxX, g.raw.ts)
        this.minY = Math.min(this.minY, g.raw.l)
        this.maxY = Math.max(this.maxY, g.raw.h)
        this.spanX = this.maxX - this.minX;
        this.spanY = this.maxY - this.minY;
    }

    yAxis = [];
    xAxis = [];
    nLines = 5;


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
        return (v - this.minX) / this.spanX * this.W
    }

    scaleY(v): number {
        return (v - this.minY) / this.spanY * this.H;
    }

    flip(y): number {
        return this.H - y
    }

    flipData(d: Row) {
        d.flipped.fy = this.flip(d.scaled.sy);
        d.flipped.fx = d.scaled.sx;
        d.flipped.fo = this.flip(d.scaled.so);
        d.flipped.fh = this.flip(d.scaled.sh);
        d.flipped.fl = this.flip(d.scaled.sl);
        d.flipped.fc = this.flip(d.scaled.sc);
        d.flipped.fH = (d.scaled.sH);
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
        g.scaled.sx = this.scaleX(g.raw.ts);
        g.scaled.sy = this.scaleY(g.meta.minoc);
        g.scaled.so = this.scaleY(g.raw.o);
        g.scaled.sh = this.scaleY(g.raw.h);
        g.scaled.sl = this.scaleY(g.raw.l);
        g.scaled.sc = this.scaleY(g.raw.c);
        g.scaled.sH = g.raw.H / this.spanY * this.H;

    }

    setYAxis() {
        this.yAxis = []
        for (let i = 0; i < this.nLines; ++i) {
            let level = this.minY + (this.maxY - this.minY) / this.nLines * i;
            this.yAxis.push({val: Math.round(this.flip(this.scaleY(level))) + 0.5, text: level})
        }
    }

    nXAxis = 5;

    setXAxis() {
        this.xAxis = []
        for (let i = 0; i < this.nXAxis; ++i) {
            let level = this.minX + (this.maxX - this.minX) / this.nXAxis * i;
            let d = new Date(level)
            this.xAxis.push({val: Math.round(this.scaleX(level)), text: d.getHours() + ":" + (d.getMinutes() > 9 ? d.getMinutes() : ("0" + d.getMinutes()))})
        }
    }

    readData() {
        if (this.data) {
            let N = this.data.length;

            for (let i = Math.max(0, N - this.Nshow); i < N; ++i) {
                let d = this.data[i]
                this.setWorkingData(d)
            }
        }
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

    addMeta() {
        console.log("DATABOX", this.minX, this.minY, this.maxX, this.maxY)
        this.gdata.forEach((d) => {
            this.setMinMax(d)
        })
        this.gdata.forEach((d) => {
            this.addMetaData(d)
        })
    }

    setLines(g) {
        g.draw.lines = [[g.flipped.fx + this.cW / 2, g.flipped.fl], [g.flipped.fx + this.cW / 2, g.flipped.fh]]
        g.draw.borderlines = [
            [[g.flipped.fx, g.flipped.fo], [g.flipped.fx, g.flipped.fc]],
            [[g.flipped.fx, g.flipped.fc], [g.flipped.fx + this.cW, g.flipped.fc]],
            [[g.flipped.fx + this.cW, g.flipped.fc], [g.flipped.fx + this.cW, g.flipped.fo]],
            [[g.flipped.fx + this.cW, g.flipped.fo], [g.flipped.fx, g.flipped.fo]]]
    }

    setStick(g) {
        g.flipped.fcx = g.scaled.sx + this.cW / 2;
        g.flipped.fcy = g.flipped.fy - g.scaled.sH / 2
    }

    setBarWidth() {
        this.cW = this.W / Math.min(this.data.length, this.Nshow) * 0.7;
    }

    drawLine(x, y, x2, y2, width, color) {
        if (Math.round(x) == x) x += 0.5
        if (Math.round(y) == y) y += 0.5
        if (Math.round(y2) == y2) y2 += 0.5
        if (Math.round(x2) == x2) x2 += 0.5
        //console.log("Line",x,y,x2,y2,width,color)
        let r = this.paper.path("M" + x + "," + y + " L" + x2 + "," + y2);
        r.attr("stroke-width", width);
        r.attr("stroke", color);
    }

    getTimeLabel(ts): string {
        let d = new Date(ts);
        let m = d.getMinutes();
        return d.getHours() + ":" + (m > 9 ? m : ("0" + m))
    }

    currentMouseover = null;

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

    drawRect(x, y, w, h, fill, width, stroke, g: Row, isTooltip?: boolean) {
        if (Math.round(x) == x) x += 0.5
        if (Math.round(y) == y) y += 0.5
        ///console.log("Rect",x,y,w,h)
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
    }

    drawText(x, y, t, color) {
        let r = this.paper.text(x, y, t)
        r.attr("fill", color)
    }

    draw() {
        if (!this.paper) return
        if (!this.data) return
        if (!this.isReady) return
        this.paper.clear()
        this.yAxis.forEach((li) => {
            console.log("CHART yaxis line ", 0, li.val, this.W, li.val)
            this.drawLine(0, li.val, this.W, li.val, this.options.yAxis.grid.strokeWidth, this.options.yAxis.grid.color);
            console.log("CHART yaxis text ", 30, li.val, li.text)
            this.drawText(30, Math.round(li.val - this.H * 0.02), li.text, this.options.yAxis.grid.textColor);
        })

        this.drawRect(0, this.H - this.options.xAxis.height, this.W, this.H - this.options.xAxis.height, "rgba(0,0,0,0.5)", 0, "", null)
        this.xAxis.forEach((li) => {
            //this.drawLine(li.val,10, this.W, li.val, this.options.yAxis.grid.strokeWidth, this.options.yAxis.grid.color);
            console.log("CHART xaxis text", li.val, this.H - this.options.xAxis.height, li.text)
            this.drawText(li.val, this.H - this.options.xAxis.height / 2, li.text, "rgb(255,255,255)");
        })

        this.gdata.forEach((g: Row) => {
            let r;
            //low high
            //console.log("DRAW HL")
            this.drawLine(g.draw.lines[0][0], g.draw.lines[0][1], g.draw.lines[1][0], g.draw.lines[1][1], this.options.candlestick.line.width, g.raw.c > g.raw.o ? this.options.candlestick.line.upColor : this.options.candlestick.line.downColor);


            //body
            if (true) {
                //  console.log("DRAW BODY")
                this.drawRect(g.flipped.fx, g.flipped.fy - g.flipped.fH, this.cW, g.flipped.fH, g.raw.c > g.raw.o ? this.options.candlestick.body.upColor : this.options.candlestick.body.downColor,
                    this.options.candlestick.body.strokeWidth, g.raw.c > g.raw.o ? this.options.candlestick.body.upColor : this.options.candlestick.body.downColor, g);

            }
            if (true) {
                //border
                //console.log("DRAW BORDER")
                g.draw.borderlines.forEach((l) => {
                    this.drawLine(l[0][0], l[0][1], l[1][0], l[1][1],
                        this.options.candlestick.line.width, g.raw.c > g.raw.o ? this.options.candlestick.line.upColor : this.options.candlestick.line.downColor
                    )
                    ;
                })
            }

        })

    }

    recompute() {
        this.gdata.forEach((d) => {
            this.setBarWidth()
            this.scaleData(d)
            this.flipData(d)
            this.roundData(d)

            this.setLines(d)
            this.setStick(d)


            //console.log("gdata", d)
        })
        this.setYAxis()
        this.setXAxis()

    }
}
