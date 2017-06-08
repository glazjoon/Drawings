import { Coordinate } from './Coordinate';
import { Drawable } from './../interfaces/Drawable';
import { Element } from './Element';

export class Drawing implements Drawable {

    private elements: Array<Element>;
    private color: string;

    constructor(color: string) {
        this.elements = new Array<Element>();
        this.color = color;
    }

    addElement(element: Element) {
        this.elements.push(element);
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (let element of this.elements) {
            element.draw(ctx);
        }
    }

    clear() {
        this.elements = new Array<Element>();
    }

    getElementAtPosition(mousePosition: Coordinate): Element {
        for (let i = this.elements.length - 1; i >= 0; i--) {
            let element = this.elements[i];

            if (element.isHovered(mousePosition)) {
                return element;
            }
        }
        return null;
    }
}
