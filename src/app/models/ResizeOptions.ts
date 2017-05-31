import { Coordinate } from './Coordinate';
import { Anchors } from './../enums/Anchors';

export class ResizeOptions {
    anchor: Anchors;
    mousePosition: Coordinate;
    mouseDragStart: Coordinate;
    isFixed: boolean;
    ctx: CanvasRenderingContext2D;

    constructor(anchor: Anchors, mousePosition: Coordinate, mouseDragStart: Coordinate, isFixed?: boolean, ctx?: CanvasRenderingContext2D) {
        this.anchor = anchor;
        this.mousePosition = mousePosition;
        this.mouseDragStart = mouseDragStart;
        this.isFixed = isFixed;
        this.ctx = ctx;
    }
}
