import { Drawable } from './../interfaces/Drawable';
import { Element } from './Element';

export class Drawing implements Drawable {

    elements: Array<Element>;
    color: string;

    constructor(color: string) {
        this.elements = new Array<Element>();
        this.color = color;
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (let element of this.elements) {
            element.draw(ctx);
        }
    }
}
