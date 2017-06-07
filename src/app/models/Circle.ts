import { ResizeOptions } from './ResizeOptions';
import { Shape } from './Shape';

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

    }
}