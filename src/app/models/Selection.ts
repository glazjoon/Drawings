import { ElementOptions } from './ElementOptions';
import { Circle } from './Circle';
import { Strokeable } from './../interfaces/Strokeable';
import { Dimensions } from './Dimensions';
import { Coordinate } from './Coordinate';
import { Drawable } from './../interfaces/Drawable';
import { Stroke } from './Stroke';
import { Anchor } from './Anchor';
import { Element } from './Element';
import { Anchors } from './../enums/Anchors';

export class Selection implements Drawable, Strokeable {
    element: Element;
    pos: Coordinate;
    dims: Dimensions;
    anchors: Anchor[];
    stroke: Stroke;

    constructor(element: Element) {
        this.element = element;
        this.stroke = new Stroke('grey', 1);
        this.update();
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.drawStroke(ctx);
    }

    drawStroke(ctx: CanvasRenderingContext2D) {
        ctx.save();

        ctx.strokeStyle = 'lightgray';
        ctx.lineWidth = this.stroke.lineWidth;

        ctx.setLineDash([5]);
        ctx.strokeRect(this.pos.x, this.pos.y, this.dims.w, this.dims.h);

        ctx.restore();
        ctx.save();

        ctx.strokeStyle = Anchor.stroke.color;
        ctx.fillStyle = 'white';

        for (let anchor of this.anchors) {
            anchor.draw(ctx);
        }

        const center = new Coordinate(this.pos.x + this.dims.w / 2, this.pos.y + this.dims.h / 2);

        ctx.beginPath();
        ctx.moveTo(center.x - 5, center.y);
        ctx.lineTo(center.x + 5, center.y);
        ctx.moveTo(center.x, center.y - 5);
        ctx.lineTo(center.x, center.y + 5);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    update() {
        const ex = this.element.pos.x;
        const ey = this.element.pos.y;
        const ew = this.element.dims.w;
        const eh = this.element.dims.h;

        const cw = Anchor.width;
        const cy = Anchor.height;

        this.pos = new Coordinate(ex - 5 - cw, ey - 5 - cy);
        this.dims = new Dimensions(ew + 10 + cw * 2, eh + 10 + cy * 2);

        this.anchors = [
            new Anchor(Anchors.Top, new Coordinate(ex + ew * 0.5 - cw * 0.5, ey - cy * 1.5 - 5)),
            new Anchor(Anchors.Right, new Coordinate(ex + ew + cw * 0.5 + 5, ey + eh * 0.5 - cy * 0.5)),
            new Anchor(Anchors.Bottom, new Coordinate(ex + ew * 0.5 - cw * 0.5, ey + eh + cy * 0.5 + 5)),
            new Anchor(Anchors.Left, new Coordinate(ex - cw * 1.5 - 5, ey + eh * 0.5 - cy * 0.5)),
            new Anchor(Anchors.TopLeft, new Coordinate(ex - cw * 1.5 - 5, ey - cy * 1.5 - 5)),
            new Anchor(Anchors.TopRight, new Coordinate(ex + ew + cw * 0.5 + 5, ey - cw * 1.5 - 5)),
            new Anchor(Anchors.BottomLeft, new Coordinate(ex - cw * 1.5 - 5, ey + eh + cw * 0.5 + 5)),
            new Anchor(Anchors.BottomRight, new Coordinate(ex + ew + cw * 0.5 + 5, ey + eh + cw * 0.5 + 5))
        ];
    }

    getHoveredAnchor(mousePosition: Coordinate): Anchors {
        for (let anchor of this.anchors) {
            if (anchor.isHovered(mousePosition)) {
                return anchor.position;
            }
        }
        return -1;
    }
}
