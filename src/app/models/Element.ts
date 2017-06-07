import { Guid } from './../tools/Guid';
import { Dimensions } from './Dimensions';
import { ResizeOptions } from './ResizeOptions';
import { Drawable } from './../interfaces/Drawable';
import { Coordinate } from './../models/Coordinate';
import { ElementOptions } from './ElementOptions';

export abstract class Element implements Drawable {
    id: string;
    pos: Coordinate;
    dims: Dimensions;
    fillColor: string;
    thumbnail: string;

    constructor(options: ElementOptions) {
        this.id = Guid.newGuid();
        this.pos = options.pos;
        this.dims = options.dims;
        this.fillColor = options.fillColor;
    }

    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract resize(options: ResizeOptions): void;

    move(mousePosition: Coordinate, mouseDragStart: Coordinate) {
        this.pos.x += mousePosition.x - mouseDragStart.x;
        this.pos.y += mousePosition.y - mouseDragStart.y;
    }

    isHovered(coords: Coordinate) {
        const mouseX = coords.x;
        const mouseY = coords.y;

        const withinRangeX = mouseX > this.pos.x && mouseX < this.pos.x + this.dims.w;
        const withinRangeY = mouseY > this.pos.y && mouseY < this.pos.y + this.dims.h;

        return withinRangeX && withinRangeY;
    }

    /*updateThumbnail(ctx: CanvasRenderingContext2D) {
        let ghostCanvas = document.createElement('canvas');
        let ghostCtx = ghostCanvas.getContext('2d');

        ghostCanvas.width = ctx.canvas.width;
        ghostCanvas.height = ctx.canvas.height;

        this.draw(ghostCtx);
        this.thumbnail = ghostCanvas.toDataURL();
    }
    */
}

