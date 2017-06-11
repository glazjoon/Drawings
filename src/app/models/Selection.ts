import { Stroke } from './Stroke';
import { ElementOptions } from './ElementOptions';
import { Rectangle } from './Rectangle';
import { Dimensions } from './Dimensions';
import { Coordinate } from './Coordinate';
import { Drawable } from './../interfaces/Drawable';
import { Anchor } from './Anchor';
import { Anchors } from './../enums/Anchors';
import { Element } from './../models/Element';

export class Selection implements Drawable {
    element: Element;
    anchors: Anchor[];
    selectionArea: Rectangle;

    constructor(selectedElement: Element) {
        this.element = selectedElement;
        //this.update();
    }

    draw(ctx: CanvasRenderingContext2D) {
        //this.update();
        ctx.save();

        ctx.strokeStyle = 'lightgray';
        ctx.lineWidth = 1;
        ctx.setLineDash([5]);
        ctx.strokeRect(
            this.selectionArea.pos.x,
            this.selectionArea.pos.y,
            this.selectionArea.dims.w,
            this.selectionArea.dims.h
        );

        ctx.restore();

        this.drawAnchors(ctx);
        this.drawCenterCross(ctx);
    }

    private drawAnchors(ctx: CanvasRenderingContext2D) {
        ctx.save();

        ctx.strokeStyle = Anchor.stroke.color;
        ctx.fillStyle = 'white';

        for (let anchor of this.anchors) {
            anchor.draw(ctx);
        }

        ctx.restore();
    }

    private drawCenterCross(ctx: CanvasRenderingContext2D) {
        const center = new Coordinate(
            this.selectionArea.pos.x + this.selectionArea.dims.w / 2,
            this.selectionArea.pos.y + this.selectionArea.dims.h / 2
        );

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'grey';
        ctx.moveTo(center.x - 5, center.y);
        ctx.lineTo(center.x + 5, center.y);
        ctx.moveTo(center.x, center.y - 5);
        ctx.lineTo(center.x, center.y + 5);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    private update() {
        const elementType = this.element.constructor.name;
        let sPos = new Coordinate(this.element.pos.x, this.element.pos.y);
        let sDims = new Dimensions(this.element.dims.w, this.element.dims.h);

        switch (elementType) {
            case 'Circle':
                sPos.x -= this.element.dims.w;
                sPos.y -= this.element.dims.w;
                sDims.w *= 2;
                sDims.h *= 2;
                break;
        }

        const padding = 7.5;
        sPos.x -= padding;
        sPos.y -= padding;
        sDims.w += padding * 2;
        sDims.h += padding * 2;

        this.selectionArea = new Rectangle(new ElementOptions(sPos, sDims, null, new Stroke('grey', 1)));

        this.updateAnchors(sPos, sDims);
    }

    private updateAnchors(sPos: Coordinate, sDims: Dimensions) {
        const aSize = Anchor.width / 2;

        this.anchors = [
            new Anchor(Anchors.Top, new Coordinate(sPos.x + sDims.w / 2 - aSize, sPos.y - aSize)),
            new Anchor(Anchors.Right, new Coordinate(sPos.x + sDims.w - aSize, sPos.y + sDims.h / 2 - aSize)),
            new Anchor(Anchors.Bottom, new Coordinate(sPos.x + sDims.w / 2 - aSize, sPos.y + sDims.h - aSize)),
            new Anchor(Anchors.Left, new Coordinate(sPos.x - aSize, sPos.y + sDims.h / 2 - aSize)),
            new Anchor(Anchors.TopLeft, new Coordinate(sPos.x - aSize, sPos.y - aSize)),
            new Anchor(Anchors.TopRight, new Coordinate(sPos.x + sDims.w - aSize, sPos.y - aSize)),
            new Anchor(Anchors.BottomLeft, new Coordinate(sPos.x - aSize, sPos.y + sDims.h - aSize)),
            new Anchor(Anchors.BottomRight, new Coordinate(sPos.x + sDims.w - aSize, sPos.y + sDims.h - aSize))
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
