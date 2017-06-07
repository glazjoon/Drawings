import { ResizeOptions } from './ResizeOptions';
import { Coordinate } from './Coordinate';
import { ElementOptions } from './ElementOptions';
import { Shape } from './Shape';
import { Anchors } from './../enums/Anchors';

export class Rectangle extends Shape {

    constructor(options: ElementOptions) {
        super(options);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();

        if (this.stroke) {
            this.drawStroke(ctx);
        } else {
            ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.pos.x, this.pos.y, this.dims.w, this.dims.h);
        }

        ctx.restore();
    }

    drawStroke(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = this.stroke.color;
        ctx.lineWidth = this.stroke.lineWidth;
        ctx.strokeRect(this.pos.x, this.pos.y, this.dims.w, this.dims.h);
    }

    private freeResize(anchor: Anchors, mousePosition: Coordinate, mouseDragStart: Coordinate) {
        const oldX = this.pos.x;
        const oldY = this.pos.y;

        const mouseX = mousePosition.x;
        const mouseY = mousePosition.y;

        const dragX = mouseDragStart.x;
        const dragY = mouseDragStart.y;

        switch (anchor) {
            case Anchors.Left:
                this.pos.x = mouseX;
                this.dims.w += oldX - mouseX;
                break;
            case Anchors.Right:
                this.dims.w += mouseX - dragX;
                break;
            case Anchors.Top:
                this.pos.y = mouseY;
                this.dims.h += oldY - mouseY;
                break;
            case Anchors.Bottom:
                this.dims.h += mouseY - dragY;
                break;
            case Anchors.TopLeft:
                this.pos.x = mouseX;
                this.dims.w += oldX - mouseX;
                this.pos.y = mouseY;
                this.dims.h += oldY - mouseY;
                break;
            case Anchors.TopRight:
                this.dims.w += mouseX - dragX;
                this.pos.y = mouseY;
                this.dims.h += oldY - mouseY;
                break;
            case Anchors.BottomLeft:
                this.pos.x = mouseX;
                this.dims.w += oldX - mouseX;
                this.dims.h += mouseY - dragY;
                break;
            case Anchors.BottomRight:
                this.dims.w += mouseX - dragX;
                this.dims.h += mouseY - dragY;
                break;
        }

    }

    private fixedResize(anchor: Anchors, mousePosition: Coordinate, mouseDragStart: Coordinate) {
        const oldX = this.pos.x;
        const oldY = this.pos.y;

        const mouseX = mousePosition.x;
        const mouseY = mousePosition.y;

        const dragX = mouseDragStart.x;
        const dragY = mouseDragStart.y;

        const ratio = this.dims.w / this.dims.h;

        let sum;

        switch (anchor) {
            case Anchors.Left:
                sum = mouseX - dragX;
                this.pos.y += sum / ratio / 2;
                this.pos.x += sum;
                this.dims.w -= sum;
                this.dims.h -= sum / ratio;
                break;
            case Anchors.Right:
                sum = mouseX - dragX;
                this.dims.w += sum;
                this.dims.h += sum / ratio;
                this.pos.y -= sum / ratio / 2;
                break;
            case Anchors.Top:
                sum = mouseY - dragY;  // Fixa den här skiten för det funkar inte
                console.log(sum);
                this.pos.y += sum / 2;
                this.pos.x += sum / 2;
                this.dims.w -= sum;
                this.dims.h -= sum;
                break;
            case Anchors.Bottom:
                sum = mouseY - dragY;
                this.pos.x -= sum / ratio / 2;
                this.dims.w += sum / ratio;
                this.dims.h += sum;
                break;
            case Anchors.TopLeft:
                sum = oldX - mouseX;
                this.pos.x = mouseX;
                this.dims.w += sum;
                this.pos.y -= sum / ratio;
                this.dims.h += sum / ratio;
                break;
            case Anchors.TopRight:
                sum = mouseX - dragX;
                this.dims.w += sum;
                this.pos.y -= sum / ratio;
                this.dims.h += sum / ratio;
                break;
            case Anchors.BottomLeft:
                sum = oldX - mouseX;
                this.pos.x = mouseX;
                this.dims.w += sum;
                this.dims.h += sum / ratio;
                break;
            case Anchors.BottomRight:
                sum = mouseX - dragX;
                this.dims.w += sum;
                this.dims.h += sum / ratio;
                break;
        }
    }

    resize(options: ResizeOptions) {
        if (this.dims.w < 1 || this.dims.h < 1) {
            this.dims.w = this.dims.w < 1 ? 1 : this.dims.w;
            this.dims.h = this.dims.h < 1 ? 1 : this.dims.h;
        } else {
            if (options.isFixed) {
                this.fixedResize(options.anchor, options.mousePosition, options.mouseDragStart)
            } else {
                this.freeResize(options.anchor, options.mousePosition, options.mouseDragStart);
            }
        }
    }
}
