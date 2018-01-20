import {
    Component, Input, OnInit, Injectable, ViewChild, ViewEncapsulation, SimpleChanges, SimpleChange, OnChanges, ElementRef, HostListener, AfterViewInit,
    DoCheck
} from '@angular/core';
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

import {RawLoadedData, Row, UnparsedRawLoadedData} from "./Types"
import {Data} from "./Data"
import {Drawer} from "./Drawer";
import {Arranger} from "./Arranger";


@Component({
    selector: 'app-chart',
    templateUrl: 'template.html',
    styleUrls: ['styles.css'],
    encapsulation: ViewEncapsulation.None

})
@Injectable()
export class AppChartComponent extends CheckValid implements OnChanges, OnInit, AfterViewInit, DoCheck {
    @Input() data: any[] = [];
    @Input() lastCandle: any[] = [];
    @Input() steam
    @Input() pair: string
    @Input() broker: string

//    @Input() gdata: Row[] = [];
    //@ViewChild('mycanvas') canvas: ElementRef;
    @ViewChild('chartcontainer') chartcontainer: ElementRef;
    @ViewChild('mycanvasbox') canvasbox: ElementRef;


    @Input() chartId;


    method

    paper;
    isReady = false;

    Data: Data;

    currentMouseover = null;
    private mouseDown: boolean = false;
    private last: MouseEvent;
    private el: HTMLElement;
    mouseX;
    mouseY;
    crosshairLines1 = [[[0, 0], [0, 0]]]
    crosshairLines2 = [[[0, 100], [200, 100]]]
    drawer: Drawer;
    arranger: Arranger;

    resizeTimer;


    constructor(public logic: Logic, public tradingService: TradingService, public consoleService: ConsoleService, public authService: AuthService, public appConfigService: AppConfigService, public eventService: EventService, public apiService: ApiService, public requestService: RequestService, elementRef: ElementRef) {
        super(consoleService)
        this.consoleService.chart("+")
        this.el = elementRef.nativeElement;
        this.method = DrawMethods.Canvas
        this.arranger = new Arranger(this.method, consoleService)
        this.Data = new Data(consoleService, this.arranger)
        this.drawer = new Drawer(this.method, consoleService)
        this.arranger.setData(this.Data)
        this.arranger.setDrawer(this.drawer)
    }

    ngOnInit() {
        this.consoleService.chart(" --> oninit")
        if (!this.chartId) this.consoleService.chart("ERR NO CHART ID", this.chartId)
        this.doSubscribe("windowResizedEvent-chart-" + this.chartId, this.eventService.windowResizedEvent, (val) => {
            this.windowResized(val)
        }, "windowResizedEvent-chart-" + this.chartId)
        this.doSubscribe("menuDisplayUpdatedEvent-chart-" + this.chartId, this.eventService.menuDisplayUpdatedEvent, (val) => {
            this.windowResized(val)
        })
        this.doSubscribe("isFullscreenEvent-chart-" + this.chartId, this.eventService.isFullscreenEvent, (val) => {
            //this.consoleService.chart("pair-chart chardid", val)
            if (this.chartId == val.id)
                setTimeout(() => {
                    this.windowResized(val)
                }, 50)
        })

    }

    ngAfterViewInit() {
        this.consoleService.chart("--> ngafterviewinit")
        let C = this.chartcontainer.nativeElement

        let ready = this.initSize(() => {
            if (this.isReady) this.initData()
        })


    }

    ngDoCheck() {
     /*   if (!this.steam) return
        let s = JSON.parse(JSON.stringify(this.steam))

        let newP = parseFloat(s.c);
        console.log("ngdocheck", this.steam, "lastts", this.lastTs, "lastp", this.currentPrice, "newts", this.lastTs, "newp", newP, newP - this.currentPrice, ( newP !== this.currentPrice) && (s.ts !== this.lastTs), ( newP !== this.currentPrice), (s.ts !== this.lastTs))
        if (( newP !== this.currentPrice) || (s.ts !== this.lastTs)) {
            this.lastTs = s.ts
            this.prevPrice = this.currentPrice;
            this.currentPrice = parseFloat(s.c)
            console.log("ngdocheck ok", this.steam, "p", this.currentPrice, "ts", this.lastTs)
            this.updateSteam(this.steam)
        }
*/
    }

    ngOnChanges(changes: SimpleChanges) {
        this.consoleService.chart("--> onChanges", changes)

        if (changes.steam)

        this.updateSteam(changes.steam.currentValue)
        else
            this.updateAfterDataChange()
    }

    currentPrice;
    prevPrice;
    lastTs;

    updateSteam(lastBar: UnparsedRawLoadedData) {
        if (this.Data.isEmpty()) return
        this.consoleService.chart("chart new steal", lastBar, this.Data.getLast())
        let ne = {
            ts: parseInt(lastBar.ts),
            o: parseFloat(lastBar.o),
            h: parseFloat(lastBar.h),
            c: parseFloat(lastBar.c),
            l: parseFloat(lastBar.l),
        }
        this.prevPrice = this.currentPrice;
        this.currentPrice = ne.c
        console.log("chart new", ne.ts == this.Data.getLast().raw.ts)

        if (ne.ts == this.Data.getLast().raw.ts) {
            this.Data.getLast().raw.c = ne.c;
            this.lastTs = ne.ts;
        } else {
            console.log("chart new add", this.Data.getSize(), this.Data.ohlc.length)
            this.Data.add(ne)
            this.lastTs = ne.ts;
            this.arranger.idxMax++;
            console.log("chart new add end", this.Data.getSize(), this.Data.ohlc.length)
        }
        this.updateAfterDataChange()
    }

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


    initSize(f) {
        let C = this.chartcontainer.nativeElement
        this.consoleService.chart("  initsize", C.offsetWidth, C.offsetHeight)
        setTimeout(() => {
            f(this.setCanvasSize(C.offsetWidth, C.offsetHeight))
        }, 200)

    }


    initData() {
        if (this.data) {
            this.consoleService.chart("initData", this.data, this.arranger.W, this.arranger.H)
            this.readData()
            this.Data.addMeta()
            this.arranger.setBarWidth()
            this.arranger.setInitialView()
            this.arranger.recompute()
            this.draw();

        }
    }

    updateAfterDataChange() {

        if (!this.data) return
        this.consoleService.chart("  updateAfterDataChange", this.data)
        this.reset()
        this.initData()
    }

    updateAfterResize() {
        this.consoleService.chart("  updateafterresize")
        if (!this.data) return
        this.initSize(() => {
            this.arranger.setBarWidth()
            this.arranger.setViewAfterResize()
            this.arranger.recompute()
            this.draw()
        })
    }

    updateAfterChangeView() {
        this.consoleService.chart("  updateAfterChangeView")
        this.arranger.recompute()
        this.draw();
    }


    setCanvasSize(w, h): boolean {

        this.consoleService.chart("  setcanvassize", w, h)
        if (!w || !h) return false
        this.arranger.setSize(w, h)
        this.drawer.setDrawer(w, h, this.chartId)
        this.isReady = true
        return true
    }


    //data related


    startTsDraw;
    lastTsDraw;

    isSelected() {

    }


    readData() {
        if (!this.data) return
        let N = this.data.length;
        //this.consoleService.chart("pair-chart data", this.data)
        this.Data.read(this.data)
    }


    isMouseDownNavigator = false;


    clear() {

        this.drawer.clear()
    }

    paintYAxis() {
        let opt = this.arranger.options
        this.arranger.yAxis.forEach((li) => {
            //this.consoleService.chart("yaxis line ", 0, li.val, this.W, li.val)
            this.drawer.drawLine("yaxis-" + li.val, 0, li.val, this.arranger.W, li.val, opt.yAxis.grid.strokeWidth, opt.yAxis.grid.color);
            //this.consoleService.chart("yaxis text ", 30, li.val, li.text)
            this.drawer.drawText(this.arranger.W - 35, Math.round(li.val - 12), li.text, opt.yAxis.grid.textColor, "right", null);
        })
    }

    paintXAxis() {
        let opt = this.arranger.options
        //XAXIS
        let xAxisY = this.arranger.H - opt.navigator.height - opt.xAxis.height;
        this.drawer.drawRect("xaxis-bar", 0, xAxisY, this.arranger.W, opt.xAxis.height, "rgba(0,0,0,1)", 0, null, null)
        this.arranger.xAxis.forEach((li) => {
            this.drawer.drawLine("xaxis-" + li.val, li.val, this.arranger.MT, li.val, this.arranger.H - this.arranger.MB, opt.xAxis.grid.strokeWidth, opt.xAxis.grid.color);
            this.drawer.drawText(li.val - 10, Math.round(xAxisY + opt.xAxis.height / 2) - 5, li.text, "rgb(255,255,255)", "left", null);
        })
    }

    paintNavigator() {
        let opt = this.arranger.options;
        //NAVIGATOR
        let navY = this.arranger.H - opt.navigator.height;
        let navXm = Math.round((this.arranger.minXView - this.Data.minX) / (this.Data.spanX) * this.arranger.DW);
        let navXM = Math.round((this.arranger.maxXView - this.arranger.minXView) / (this.Data.spanX) * this.arranger.DW)
        let navbar = this.drawer.drawRect("navbar", navXm, navY, navXM, opt.navigator.height, "rgba(255,255,255,1)", 0, null, null, null)
        let nav = this.drawer.drawRect("nav", 0, navY, this.arranger.W, opt.navigator.height, "rgba(255,255,255,0.5)", 0, null, null, null)
        nav.on('mouseup', (e) => {
            this.consoleService.chart("nav up", e)
            this.isMouseDownNavigator = false
        })
        nav.on('mousedown', (e) => {

            this.isMouseDownNavigator = true
            let pc = e.e.offsetX / this.arranger.W;
            if (pc) {
                this.consoleService.chart("nav down", pc, e)
                this.arranger.setViewByNavigator(pc)
                this.updateAfterChangeView()
            }
        })
        nav.on('mousemove', (e) => {
            if (this.isMouseDownNavigator) {
                let pc = e.e.offsetX / this.arranger.W;
                if (pc) {
                    this.arranger.setViewByNavigator(pc)
                    this.updateAfterChangeView()
                }
            }
        })

    }
    paintIndicators() {
        let ind: Row = this.Data.indicators.SMAScaled;
        let opt = this.arranger.options;
        for (let i = this.arranger.idxMin; i <= this.arranger.idxMax-1; ++i) {
            let g: Row = this.Data.getTick(i)
            let gg: Row = this.Data.getTick(i+1)
            this.drawer.drawLine("SMA-" + i ,  g.flipped.fx, ind[i], gg.flipped.fx,ind[i+1], opt.candlestick.line.width, "rgb(255,140,0)");
        console.log("SMA",i,  g.flipped.fx, ind[i], gg.flipped.fx,ind[i+1])
        }
    }
    paintCandleSticks() {
        //CANDLESTICKS
        for (let i = this.arranger.idxMin; i <= this.arranger.idxMax; ++i) {

            this.paintCandleStick(i)

        }
    }

    paintCandleStick(i) {
        let g: Row = this.Data.getTick(i)

        let opt = this.arranger.options;
        let r;
        //low high
        ////this.consoleService.chart("DRAW HL")
        this.drawer.drawLine("candle-" + i + "lowhigh", g.draw.lines[0][0], g.draw.lines[0][1], g.draw.lines[1][0], g.draw.lines[1][1], opt.candlestick.line.width, g.raw.c > g.raw.o ? opt.candlestick.line.upColor : opt.candlestick.line.downColor);


        //body
        if (true) {
            //  //this.consoleService.chart("DRAW BODY")
            let r = this.drawer.drawRect("candle-" + i + "-body", g.flipped.fx, g.flipped.fy - g.flipped.fH, this.arranger.cW, g.flipped.fH,
                g.raw.c > g.raw.o ? opt.candlestick.body.upColor : opt.candlestick.body.downColor, opt.candlestick.body.strokeWidth,
                g.raw.c > g.raw.o ? opt.candlestick.body.upStrokeColor : opt.candlestick.body.downStrokeColor, g);


        }
        if (this.method == DrawMethods.SVG) {
            //border
            ////this.consoleService.chart("DRAW BORDER")
            g.draw.borderlines.forEach((l) => {
                this.drawer.drawLine("candle-" + i + "-border-", l[0][0], l[0][1], l[1][0], l[1][1],
                    opt.candlestick.line.width, g.raw.c > g.raw.o ? opt.candlestick.line.upColor : opt.candlestick.line.downColor
                )
                ;
            })
        }
    }

    setEvents() {
        this.drawer.canvas.selection = false
        this.drawer.canvas.on('mouse:over', (e) => {
            this.consoleService.chart("event mouseover target=", e.target ? e.target.name : "")
            if (e.target) {
                //e.target.set('fill', 'red');
                //this.canvas.renderAll();
            }
        });
        this.drawer.canvas.on('mouse:down', (e) => {
            this.consoleService.chart("event down", e.target)
            this.isMouseDownNavigator = true
        })
        this.drawer.canvas.on('mouse:up', (e) => {
            this.consoleService.chart("event up", e.target)
            this.isMouseDownNavigator = false
        })
    }

    paintMarker() {
        let opt = this.arranger.options
        let L = this.Data.getLast()
        if (this.arranger.idxMax == this.Data.getSize() - 1)
            this.drawer.drawLine("marker-line", L.flipped.fx, L.flipped.fc, this.arranger.W, L.flipped.fc, opt.xAxis.grid.strokeWidth, "rgba(255,150,0,0.4)");
        this.drawer.drawRect("marker-bg", this.arranger.W - 50, L.flipped.fc - 7, 48, 15, "rgba(255,150,0,1)", 1, "rgb(0,0,0)", null);
        this.drawer.drawText(this.arranger.W - 40, L.flipped.fc - 5, L.raw.c.toString(), "rgba(0,0,0,1)", "right", null);
    }


    paintPrice() {

        this.drawer.drawRect("price-bg", 5, 5, 390, 45, "rgb(0,0,0)", 1, "rgb(40,40,40)", null);
        this.drawer.drawText(10, 10, this.pair, "rgb(255,255,255)", "left", "London", 35);
        this.drawer.drawText(150, 30, "@" + this.broker, "rgb(200,200,200)", "left", "London", 15);
        if (this.currentPrice)
            this.drawer.drawText(250, 10, this.currentPrice, this.prevPrice > this.currentPrice ? "rgb(200,0,0)" : "rgb(40,240,40)", "left", "London", 35);

    }

    draw() {

        if (!this.drawer.isValid()) return
        if (!this.data) return
        if (!this.isReady) return

        this.consoleService.chart("    draw --> ", this.arranger.W, this.arranger.H)
        this.timerDraw = new Date().getTime()
        let opt = this.arranger.options

        this.clear()
        //this.drawer.drawRect("topline", 100, 100, this.arranger.W, this.arranger.H, opt.xAxis.grid.strokeWidth, "rgba(0,255,0,1)",null,null);

        this.paintYAxis()
        this.drawer.drawLine("topline", 0, 0, this.arranger.W, 0, opt.xAxis.grid.strokeWidth, "rgba(0,0,0,1)");
        this.paintXAxis()


        this.paintMarker()
        this.paintNavigator()
        this.paintIndicators()
        this.paintCandleSticks()
    //    this.paintPrice()
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
            this.drawer.render();
            this.consoleService.chart("STAT render", new Date().getTime() - this.timerDraw)
            /*setTimeout(() => {
                this.canvas.renderAll();
            }, 200)*/
        }

    }

    timerRecompute
    timerDraw


    reset() {
        this.Data.reset();
        this.arranger.yAxis = []
        if (this.paper) this.paper.clear()
    }

    getContainerWidth() {
        let C = this.chartcontainer.nativeElement
        return C.offsetWidth
    }

}

