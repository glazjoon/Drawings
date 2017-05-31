import { Dimensions } from './Dimensions';
import { Rectangle } from './Rectangle';
import { Coordinate } from './Coordinate';
import { Drawable } from './../interfaces/Drawable';
import { Stroke } from './Stroke';
import { ElementOptions } from './ElementOptions';
import { Shape } from './Shape';
import { Anchor } from './Anchor';
import { Element } from './Element';
import { Anchors } from './../enums/Anchors';

export class Selection implements Drawable {
    element: Element;
    anchors: Anchor[];
    area: Shape;
    lineDash: number;

    constructor(element: Element) {
        this.element = element;
        this.lineDash = 5;

        this.update();
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();

        ctx.strokeStyle = 'lightgray';
        ctx.lineWidth = this.area.stroke.lineWidth;

        ctx.setLineDash([this.lineDash]);
        ctx.strokeRect(this.area.pos.x, this.area.pos.y, this.area.dims.w, this.area.dims.h);

        ctx.restore();
        ctx.save();

        ctx.strokeStyle = Anchor.stroke.color;
        ctx.fillStyle = 'white';

        for (let anchor of this.anchors) {
            anchor.draw(ctx);
        }

        ctx.restore();
    }

    update() {
        const ex = this.element.pos.x;
        const ey = this.element.pos.y;
        const ew = this.element.dims.w;
        const eh = this.element.dims.h;

        const cw = Anchor.width;
        const cy = Anchor.height;

        const ax = ex - 5 - cw;
        const ay = ey - 5 - cy;
        const aw = ew + 10 + cw * 2;
        const ah = eh + 10 + cy * 2;

        this.area = new Rectangle(
            new ElementOptions(new Coordinate(ax, ay), new Dimensions(aw, ah), '', new Stroke('gray', 1)));

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
