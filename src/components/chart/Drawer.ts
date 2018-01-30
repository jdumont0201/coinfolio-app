import * as Raphael from "raphael/raphael"
import * as Fabric from "fabric"

//import * as FontFaceObserver from "FontFaceObserver"

export enum DrawMethods {SVG, Canvas, PureCanvas}

import {RawLoadedData, Row} from "./Types"

export class Drawer {
    constructor(public method, public consoleService, public format: string) {
        //this.loadAndUse("London",(res)=>{console.log("chart font res",res)});

    }

    canvas;
    paper;
    chartId;
    context;

    clear() {
        //    this.consoleService.chart("clear")
        if (this.method == DrawMethods.SVG)
            this.paper.clear()
        else if (this.method == DrawMethods.Canvas)
            this.canvas.clear();
        else if (this.method == DrawMethods.PureCanvas)
            this.context.clearRect(0, 0, this.w, this.h);
    }

    render() {
        this.canvas.renderAll()
    }

    isValid(): boolean {
        if (this.method == DrawMethods.SVG && !this.paper) return false
        if (this.method == DrawMethods.Canvas && !this.canvas) return false;
        return true
    }

    reinit() {
        if (!this.chartId) return
        if (this.format == "mini")
            this.canvas = new Fabric.fabric.StaticCanvas('chart-canvas-' + this.chartId);
        else
            this.canvas = new Fabric.fabric.Canvas('chart-canvas-' + this.chartId);
        this.canvas.setDimensions({width: this.w, height: this.h});
    }

    w;
    h

    setDrawer(w: number, h: number, chartId: string, pureCanvas:any) {
        let id: string = "chart-canvas" + chartId;
        this.consoleService.chart("chart setdrawer ", w, h, "chart-canvas", chartId, chartId, "id=", id, "chart-canvas" + chartId,"chart",this.canvas , document.getElementById(id),"viewchild",pureCanvas)
        this.w = w;
        this.h = h;
        this.chartId = chartId;

        if (this.isPaperSet()) {

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
                this.paper = new Raphael(false, w, h); //option (b)
            else if (this.method == DrawMethods.Canvas) {
                if (!this.canvas)
                    if (this.format == "mini")
                        this.canvas = new Fabric.fabric.StaticCanvas(id, {renderOnAddRemove: false, stateful: false});
                    else
                        this.canvas = new Fabric.fabric.Canvas(id, {renderOnAddRemove: false, stateful: false});

                this.canvas.setDimensions({width: w, height: h});
                //this.canvas.setHeight(h);
                //his.canvas.setWidth(w);

            } else if (this.method == DrawMethods.PureCanvas) {

                this.canvas = pureCanvas.nativeElement;//document.getElementById(id);
                if (this.canvas) {
                    this.context = this.canvas.getContext("2d");
                    this.canvas.width = this.w;
                    this.canvas.height = this.h;
                    this.consoleService.chart("canvas set")
                } else {
                    this.consoleService.chart("no canvas yet")
                }
            }
        }
    }


    getTimeLabel(ts): string {

        //var offset = new Date().getTimezoneOffset();
        let d = new Date(ts * 1000);

        let m = d.getMinutes();
        return d.getHours() + ":" + (m > 9 ? m : ("0" + m))
    }

    setCanvas(c) {
        this.canvas = c;
    }

    setPaper(p) {
        this.paper = p
    }

    isPaperSet() {
        return this.paper
    }

    isCanvasSet() {
        return this.canvas;
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

    draw() {

    }

    drawRect(name: string, x, y, w, h, fill, strokeWidth, stroke, g: Row, isTooltip?: boolean) {
      //  this.consoleService.chart("draw Rect", name, x, y, w, h)
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
                    this.drawTooltip(g)
                });
            if (g)
                r.mouseout((e) => {
                    this.draw()
                })
            return r;
        } else if (this.method == DrawMethods.Canvas) {
            var rect = new Fabric.fabric.Rect({
                left: x,
                top: y,
                fill: fill,
                width: w,
                height: h,
                strokeWidth: 1,
                stroke: stroke
            });
            rect.set('selectable', false);
            rect.hasControls = false;
            rect.hasBorders = false;
            rect.hasRotatingPoint = false;

            /*rect.on('mousemove', (e) => {
                this.consoleService.chart("rectmove", e)
            })*/
            rect.name = name
            rect.lockUniScaling = true
            this.canvas.add(rect);

            return rect;
        } else if (this.method == DrawMethods.PureCanvas) {
            let ctx = this.context;
            ctx.fillStyle=fill;
            ctx.fillRect(x+0., y+0., w+1, h+1);
        }

    }


    drawText(x, y, t: string, color, align: string = "left", font, fontSize?) {
        ////this.consoleService.chart("pair-chart text",x,y,t)
        if (this.method == DrawMethods.SVG) {
            let r = this.paper.text(x, y, t)
            r.attr("fill", color)
        } else if (this.method == DrawMethods.Canvas) {
            t = t.toString()
            let r = new Fabric.fabric.IText(t, {
                left: x,
                top: y,
                width: 120, fill: color,
                fontSize: 10, color: color, fontFamily: "Arial",
                textAlign: align
            });

            //    if (font) {r.set("fontFamily", font);            }
            if (fontSize) {
                r.setFontSize(fontSize)
            }
            this.canvas.add(r)
            this.canvas.item(0).selectable = false;
            return r;
        }else{
            this.context.font = "10px Arial";
            this.context.fillStyle = color;
            this.context.fillText(t,x,y+9);
        }
    }

    drawLine(name, x, y, x2, y2, width, color) {
    //    this.consoleService.chart("pair-chart Line", x, y, x2, y2, "width", width, "color", color)
        if (this.method == DrawMethods.SVG) {
            if (Math.round(x) == x) x += 0.5
            if (Math.round(y) == y) y += 0.5
            if (Math.round(y2) == y2) y2 += 0.5
            if (Math.round(x2) == x2) x2 += 0.5

            let r = this.paper.path("M" + x + "," + y + " L" + x2 + "," + y2);
            r.attr("stroke-width", width);
            r.attr("stroke", color);
        } else if (this.method == DrawMethods.Canvas) {
            let line = new Fabric.fabric.Line([x, y, x2, y2], {

                stroke: color,
                strokeWidth: width,

            });
            line.name = name;
            this.canvas.add(line);
            this.canvas.item(0).selectable = false;
            return line
        } else if (this.method == DrawMethods.PureCanvas) {
            this.context.beginPath();
            this.context.moveTo(x+0.5, y+0.5);
            this.context.lineTo(x2+0.5, y2+0.5);

            this.context.strokeStyle = color;

            this.context.lineWidth=width;
            this.context.stroke();
        }
    }

}