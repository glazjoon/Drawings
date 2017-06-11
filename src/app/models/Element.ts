import { Dimensions } from './Dimensions';
import { ResizeOptions } from './ResizeOptions';
import { Drawable } from './../interfaces/Drawable';
import { Coordinate } from './../models/Coordinate';
import { ElementOptions } from './ElementOptions';

export abstract class Element implements Drawable {
    pos: Coordinate;
    dims: Dimensions;
    fillColor: string;

    constructor(options: ElementOptions) {
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

