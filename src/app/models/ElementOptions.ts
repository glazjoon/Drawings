import { Dimensions } from './Dimensions';
import { Coordinate } from './Coordinate';
import { Stroke } from './Stroke';

export class ElementOptions {

    pos: Coordinate;
    dims: Dimensions;
    fillColor: string;
    stroke: Stroke;

    constructor(position: Coordinate, dims: Dimensions, fillColor: string, stroke: Stroke) {
        this.pos = position;
        this.dims = dims;
        this.fillColor = fillColor;
        this.stroke = stroke;
    }

}
