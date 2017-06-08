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
    abstract isHovered(coords: Coordinate): boolean;

    move(mousePosition: Coordinate, mouseDragStart: Coordinate) {
        this.pos.x += mousePosition.x - mouseDragStart.x;
        this.pos.y += mousePosition.y - mouseDragStart.y;
    }
}

