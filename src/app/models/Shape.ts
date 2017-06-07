import { Stroke } from './Stroke';
import { Strokeable } from './../interfaces/Strokeable';
import { ElementOptions } from './ElementOptions';
import { Element } from './Element';

export abstract class Shape extends Element implements Strokeable {

    stroke: Stroke;

    constructor(options: ElementOptions) {
        super(options);

        this.stroke = options.stroke;
    }

    abstract drawStroke(ctx: CanvasRenderingContext2D): void;
}


