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
        const resize = options.mousePosition.x - options.mouseDragStart.x;

        if (this.dims.w + resize < 1) {
            this.dims.w = 1;
            this.dims.h = 1;
        } else {
            switch (options.anchor) {
                case Anchors.Left:
                    break;
                case Anchors.Right:
                    break;
                case Anchors.Top:
                    break;
                case Anchors.Bottom:
                    break;
                case Anchors.TopLeft:
                    this.dims.w -= resize / 2;
                    this.dims.h -= resize / 2;
                    this.pos.x += resize / 2;
                    break;
                case Anchors.TopRight:
                    this.dims.w += resize / 2;
                    this.dims.h += resize / 2;
                    this.pos.x += resize / 2;
                    this.pos.y -= resize / 2;
                    break;
                case Anchors.BottomLeft:
                    this.dims.w -= resize / 2;
                    this.dims.h -= resize / 2;
                    this.pos.x += resize / 2;
                    this.pos.y += resize / 2;
                    break;
                case Anchors.BottomRight:
                    this.dims.w += resize / 2;
                    this.dims.h += resize / 2;
                    this.pos.x += resize / 2;
                    this.pos.y += resize / 2;
                    break;
            }
        }
    }

    fixedResize() {

    }

    isHovered(coords: Coordinate): boolean {
        const distanceToCenter = Math.hypot(this.pos.x - coords.x, this.pos.y - coords.y);
        const radius = this.dims.w;

        return radius > distanceToCenter;
    }
}
