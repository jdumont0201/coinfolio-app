import {
    Component, Input, OnInit, Injectable, ViewChild, ViewEncapsulation, SimpleChanges, SimpleChange, OnChanges, ElementRef, HostListener, AfterViewInit
} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {EventService} from "../../lib/localton/services/event.service";
import {AuthService} from "../../lib/globalton/core/services/auth.service";

import {Logic} from "../../logic/Logic";
import {RequestService} from "../../lib/globalton/core/services/request.service";
import {ApiService} from "../../lib/globalton/core/services/api.service";
import {TradingService} from "../../lib/localton/services/trading.service";

/*import * as Raphael from "raphael/raphael"
import * as Fabric from "fabric"
*/
import {CheckValid} from "../../lib/localton/components/CheckValid/component";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";

export enum DrawMethods {SVG, Canvas,PureCanvas}

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
export class AppChartComponent extends CheckValid {
    @Input() data: any[] = [];
    @Input() lastCandle: any[] = [];
    @Input() steam
    @Input() format: string
    @Input() pair: string
    @Input() broker: string
    @Input() chartId;

    @ViewChild('chartcontainer') chartcontainer: ElementRef;
    @ViewChild('purecanvas') purecanvas: ElementRef;
    @ViewChild('mycanvasbox') canvasbox: ElementRef;

    method

    paper;
    isReady = false;

    currentPrice;
    prevPrice;
    lastTs;

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
    Data: Data;
    resizeTimer;


    constructor(public logic: Logic, public tradingService: TradingService, public consoleService: ConsoleService, public authService: AuthService, public appConfigService: AppConfigService, public eventService: EventService, public apiService: ApiService, public requestService: RequestService, elementRef: ElementRef) {
        super(consoleService)
        this.consoleService.chart("+")
        this.el = elementRef.nativeElement;
        this.method = DrawMethods.PureCanvas;

    }

    ngOnInit() {
        this.arranger = new Arranger(this.method, this.consoleService, this.format)
        this.Data = new Data(this.consoleService, this.arranger)
        this.drawer = new Drawer(this.method, this.consoleService, this.format)
        this.arranger.setData(this.Data)
        this.arranger.setDrawer(this.drawer)
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
        this.consoleService.chart("--> ngafterviewinit id",this.chartId)
        let C = this.chartcontainer.nativeElement
        let ready = this.initSize(() => {
            if (this.isReady) {
                this.reset();
                this.initData()
            }
        })
    }

    ngDoCheck() {

    }

    ngOnChanges(changes: SimpleChanges) {
        //this.consoleService.chart("--> onChanges", changes)
        if (changes.steam)
            this.updateSteam(changes.steam.currentValue)
        else
            this.updateAfterDataChange()
    }

    updateSteam(lastBar:any) {
        let chr=new Date().getTime();
        if (!this.Data || this.Data.isEmpty()) return
        //this.consoleService.chart("chart new steal", lastBar, this.Data.getLast())
        let ne = lastBar;
        this.prevPrice = this.currentPrice;
        this.currentPrice = ne.c
        //console.log("chart new", ne.ts == this.Data.getLast().raw.ts)

        //console.log("OLDDATA", JSON.stringify(this.Data.ohlc))
        if (ne.ts == this.Data.getLast().raw.ts) {
            //console.log("edit last bar",this.Data.getLast().raw.ts,ne.c)
            this.data[this.data.length-1].c= ne.c;
            this.Data.setLastClose( ne.c);
            //this.data. ne.c);
            this.lastTs = ne.ts;
        } else {
            //console.log("chart new add", this.Data.getSize(), this.Data.ohlc.length)

            this.data.push(ne)
            this.Data.add(ne)
            this.lastTs = ne.ts;
            this.arranger.idxMax++;
            //console.log("chart new add end", this.Data.getSize(), this.Data.ohlc.length)
        }
        //console.log("NEWDATA", JSON.stringify(this.Data.ohlc))
        this.updateAfterDataStreamChange()
        console.log("["+this.pair+"] refreshtime",new Date().getTime()-chr);
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
            //this.consoleService.chart("initData", this.data, this.arranger.W, this.arranger.H)
            this.readData()
            this.Data.addMeta()
            this.arranger.setBarWidth()
            this.arranger.setInitialView()
            this.arranger.recompute()
            this.draw();

        }
    }
    updateStreamData() {
        console.log("updatestreamdata")
        if (this.data) {
            //this.consoleService.chart("initData", this.data, this.arranger.W, this.arranger.H)
            let N = this.data.length;
            //this.readData()
            let d=this.Data.ohlc[this.Data.ohlc.length-1];
            this.Data.computeMinMax(d)
            d.addMetaData()
            this.Data.computeIndicators()
            this.arranger.setBarWidth()
            this.arranger.setInitialView()
            this.arranger.recompute()
            this.draw();

        }
    }

    updateAfterDataChange() {
        if (!this.data) return
        //this.consoleService.chart("  updateAfterDataChange", this.data)
        this.reset()
        this.drawer.reinit()
        this.initData()
    }
    updateAfterDataStreamChange() {
        if (!this.data) return
        //this.consoleService.chart("  updateAfterDataChange", this.data)
        this.arranger.yAxis = []
        if (this.paper) this.paper.clear()
        this.drawer.reinit()
        this.updateStreamData()
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
        this.drawer.setDrawer(w, h, this.chartId,this.purecanvas)
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
        //this.consoleService.chart("pair-chart readdata", this.data)
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
        let D=this.getDrawer();
        let xAxisY = this.arranger.H - (this.arranger.options.navigator.enabled ? opt.navigator.height : 0) - opt.xAxis.height;
        this.getDrawer().drawRect("xaxis-bar", 0, xAxisY, this.arranger.W, opt.xAxis.height, "rgba(0,0,0,1)", 0, null, null)
        this.arranger.xAxis.forEach((li) => {
            D.drawLine("xaxis-" + li.val, li.val, this.arranger.options.chart.MT, li.val, this.arranger.H - this.arranger.options.MB, opt.xAxis.grid.strokeWidth, opt.xAxis.grid.color);
            D.drawText(li.val - 10, Math.round(xAxisY + opt.xAxis.height / 2) - 5, li.text, "rgb(255,255,255)", "left", null);
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
    getDrawer(){
        return this.drawer
    }
    paintIndicators() {
        if (this.Data.indicators) {
            if (this.Data.indicators.SMAScaled) {
                let ind: Row = this.Data.indicators.SMAScaled;
                let opt = this.arranger.options;
                for (let i = this.arranger.idxMin; i <= this.arranger.idxMax - 1; ++i) {
                    let g: Row = this.Data.getTick(i)
                    let gg: Row = this.Data.getTick(i + 1)
                    if (ind[i] && ind[i + 1] && i > 4) {
                        this.getDrawer().drawLine("SMA-" + i, g.flipped.fx, ind[i], gg.flipped.fx, ind[i + 1], opt.candlestick.line.width, "rgb(0,140,255)");
                        //console.log("SMA", i, "[", g.flipped.fx, ",", ind[i], "] [", gg.flipped.fx, ",", ind[i + 1], "]")
                    }
                }
            }
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
            let r = this.drawer.drawRect("candle-" + i + "-body", g.flipped.fx, g.flipped.fy - g.flipped.fH, this.arranger.options.chart.cW, g.flipped.fH,
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
        if(this.method==DrawMethods.Canvas){
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
    }

    paintMarker() {
        let opt = this.arranger.options
        let L = this.Data.getLast()
        if (!L) return
        if (this.arranger.idxMax == this.Data.getSize() - 1)
            this.drawer.drawLine("marker-line", L.flipped.fx, L.flipped.fc, this.arranger.W, L.flipped.fc, opt.xAxis.grid.strokeWidth, "rgba(255,150,0,0.4)");
        this.drawer.drawRect("marker-bg", this.arranger.W - 50, L.flipped.fc - 7, 48, 15, "rgba(255,150,0,1)", 1, "rgb(0,0,0)", null);
        this.drawer.drawText(this.arranger.W - 45, L.flipped.fc - 5, L.raw.c.toString(), "rgba(0,0,0,1)", "right", null);
    }


    paintPrice() {

        this.drawer.drawRect("price-bg", 5, 5, 390, 45, "rgb(0,0,0)", 1, "rgb(40,40,40)", null);
        this.drawer.drawText(10, 10, this.pair, "rgb(255,255,255)", "left", "London", 35);
        this.drawer.drawText(150, 30, "@" + this.broker, "rgb(200,200,200)", "left", "London", 15);
        if (this.currentPrice)
            this.drawer.drawText(250, 10, this.currentPrice, this.prevPrice > this.currentPrice ? "rgb(200,0,0)" : "rgb(40,240,40)", "left", "London", 35);

    }

    draw() {
        let time=new Date().getTime();
        if (!this.drawer.isValid()) return
        if (!this.data) return
        if (!this.isReady) return
        if (!this.drawer) return
        this.consoleService.chart("    draw --> ", this.arranger.W, this.arranger.H)
        this.timerDraw = new Date().getTime()
        let opt = this.arranger.options

        this.consoleService.chart("STAT render begin", new Date().getTime() - time)
        time=new Date().getTime();
        this.clear()
        //this.drawer.drawRect("topline", 100, 100, this.arranger.W, this.arranger.H, opt.xAxis.grid.strokeWidth, "rgba(0,255,0,1)",null,null);

        this.paintYAxis()
        this.drawer.drawLine("topline", 0, 0, this.arranger.W, 0, opt.xAxis.grid.strokeWidth, "rgba(0,0,0,1)");
        this.paintXAxis()
        this.paintIndicators()

        this.paintMarker()
        this.consoleService.chart("STAT render axis & ind", new Date().getTime() - time)
        time=new Date().getTime();

        if (this.arranger.options.navigator.enabled)
            this.paintNavigator()
        this.consoleService.chart("STAT render nav", new Date().getTime() - time)
        time=new Date().getTime();

        this.paintCandleSticks()
        this.consoleService.chart("STAT render cand", new Date().getTime() - time)
        time=new Date().getTime();

        this.setEvents()
        this.consoleService.chart("STAT render comp", new Date().getTime() - time)
        time=new Date().getTime();
        if (this.method == DrawMethods.Canvas) {
            //this.canvas.selection = false;
            //this.consoleService.chart("STAT draw", new Date().getTime() - this.timerDraw)
            this.timerDraw = new Date().getTime()
            //this.consoleService.chart("      render")
            this.drawer.render();
            this.consoleService.chart("STAT render draw", new Date().getTime() - time)
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

