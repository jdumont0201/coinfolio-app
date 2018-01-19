
import * as Raphael from "raphael/raphael"
import * as Fabric from "fabric"
import {DrawMethods,RawLoadedData,Row} from "./Types"
export class Drawer {
    constructor(public method,public consoleService){

    }
    canvas;
    paper;
    chartId;


    setDrawer(w:number,h:number,chartId:string,inside?) {
        this.chartId=chartId;
        if (this.isPaperSet()) {
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
                this.paper = new Raphael(inside, w,h); //option (b)
            else {
                this.canvas = new Fabric.fabric.Canvas('chart-canvas-' + this.chartId);
                this.canvas.renderOnAddRemove = false
                this.canvas.setHeight(h);
                this.canvas.setWidth(w);

            }
        }
    }


    getTimeLabel(ts): string {
        let d = new Date(ts);
        let m = d.getMinutes();
        return d.getHours() + ":" + (m > 9 ? m : ("0" + m))
    }
    setCanvas(c){
        this.canvas=c;
    }
    setPaper(p){
        this.paper=p
    }
    isPaperSet(){
        return this.paper
    }
    isCanvasSet(){
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
    draw(){

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

}