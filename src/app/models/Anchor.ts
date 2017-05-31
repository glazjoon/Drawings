import { Dimensions } from './Dimensions';
import { Coordinate } from './Coordinate';
import { Rectangle } from './Rectangle';
import { Stroke } from './Stroke';
import { ElementOptions } from './ElementOptions';
import { Anchors } from './../enums/Anchors';

export class Anchor extends Rectangle {
    static width: number = 7.5;
    static height: number = 7.5;
    static fillColor: string = 'white';
    static stroke: Stroke = new Stroke('black', 1);
    position: Anchors;

    constructor(position: Anchors, pos: Coordinate) {
        super(new ElementOptions(pos, new Dimensions(Anchor.width, Anchor.height), Anchor.fillColor, null));
        this.position = position;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillRect(this.pos.x, this.pos.y, this.dims.w, this.dims.h);
        ctx.strokeRect(this.pos.x, this.pos.y, this.dims.w, this.dims.h);
    }
}
