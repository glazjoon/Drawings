import { Coordinate } from './Coordinate';
import { ResizeOptions } from './ResizeOptions';
import { Shape } from './Shape';
import { Anchors } from './../enums/Anchors';

export class Circle extends Shape {

    draw(ctx: CanvasRenderingContext2D) {
        if (this.stroke) {
            this.drawStroke(ctx);
        } else {
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.dims.w, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    drawStroke(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.dims.w, 0, 2 * Math.PI);
        ctx.stroke();
    }

    resize(options: ResizeOptions) {
        let resize = (options.mousePosition.x - options.mouseDragStart.x) / 2;
       /* const resizeX = (options.mousePosition.x - options.mouseDragStart.x) / 2;
        const resizeY = (options.mouseDragStart.y - options.mousePosition.y) / 2;

        if (resizeX > resizeY) {
            console.log('x: ' + resizeX);
            resize = resizeX;
        } else {
            console.log('y: ' + resizeY);
            resize = resizeY;
        }*/


        if (this.dims.w + resize < 1 || this.dims.h + resize < 1) {
            this.dims.w = 1;
            this.dims.h = 1;
        } else if (options.isFixed) {
            this.fixedResize(resize);
        } else {
            switch (options.anchor) {
                case Anchors.Left:
                    this.dims.w -= resize;
                    this.dims.h -= resize;
                    this.pos.x += resize;
                    break;
                case Anchors.Right:
                    this.dims.w += resize;
                    this.dims.h += resize;
                    this.pos.x += resize;
                    break;
                case Anchors.Top:
                    this.dims.w += resize;
                    this.dims.h += resize;
                    this.pos.y -= resize;
                    break;
                case Anchors.Bottom:
                    this.dims.w += resize;
                    this.dims.h += resize;
                    this.pos.y += resize;
                    break;
                case Anchors.TopLeft:
                    this.dims.w -= resize;
                    this.dims.h -= resize;
                    this.pos.x += resize;
                    this.pos.y += resize;
                    break;
                case Anchors.TopRight:
                    this.dims.w += resize;
                    this.dims.h += resize;
                    this.pos.x += resize;
                    this.pos.y -= resize;
                    break;
                case Anchors.BottomLeft:
                    this.dims.w -= resize;
                    this.dims.h -= resize;
                    this.pos.x += resize;
                    this.pos.y -= resize;
                    break;
                case Anchors.BottomRight:
                    this.dims.w += resize;
                    this.dims.h += resize;
                    this.pos.x += resize;
                    this.pos.y += resize;
                    break;
            }
        }
    }

    fixedResize(resize: number) {
        this.dims.w += resize;
    }

    isHovered(coords: Coordinate): boolean {
        const distanceToCenter = Math.hypot(this.pos.x - coords.x, this.pos.y - coords.y);
        const radius = this.dims.w;

        return radius > distanceToCenter;
    }
}
