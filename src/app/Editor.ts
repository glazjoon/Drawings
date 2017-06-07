import { Shape } from './classes/Shape';
import { Text } from './classes/Text';
import { Drawing } from './classes/Drawing';
import { Element } from './classes/Element';
import { Shapes } from './enums/Shapes';

export class Editor {
    private drawing: Drawing;
    canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private selectedElement: Element;

    constructor(canvas: HTMLCanvasElement, drawing?: Drawing) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.drawing = this.drawing || new Drawing('#ffffff');
    }

    /*
    init() { }


    
        saveDrawing() {
            let name = prompt('Please enter a name for this drawing: ', 'Drawing1');
            const drawing = JSON.stringify(this.drawing);
            localStorage.setItem(name, drawing);
        }
    
        getDrawingAsJpeg() {
    
        }
    */

    newDrawing() {
        this.drawing = new Drawing('#ffffff');
        this.clear();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.clear();
        for (let element of this.drawing.elements) {
            this.drawElement(element);
            if (this.selectedElement) {
                this.drawSelection();
            }
        }
    }

    drawElement(element: Element) {
        switch (element.constructor.name) {
            case 'Text':
                this.drawText(element as Text);
                break;
            case 'Shape':
                this.drawShape(element as Shape);
                break;
        }
    }

    drawShape(shape: Shape) {
        switch (shape.type) {
            case Shapes.Circle:
                break;
            case Shapes.Ellipse:
                break;
            case Shapes.Rectangle:
                this.drawRectangle(shape);
                break;
        }
    }

    drawRectangle(shape: Shape) {
        this.ctx.save();
        this.ctx.fillStyle = shape.fillColor;
        this.ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
        this.ctx.restore();
    }

    drawText(text: Text) {
        this.ctx.save();
        this.ctx.font = `${text.size}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = text.fillColor;
        this.ctx.fillText(text.content, text.x, text.y);
        this.ctx.restore();
    }

    drawSelection() {
        const element = this.selectedElement;
        this.ctx.save();

        this.ctx.strokeStyle = 'gray';
        this.ctx.setLineDash([5]);
        this.ctx.strokeRect(element.x - 10, element.y - 10, element.width + 20, element.height + 20);

        this.ctx.fillStyle = 'gray';
        this.ctx.fillRect(element.x - 15, element.y - 15, 10, 10);                                  // Top Left
        this.ctx.fillRect(element.x + element.width + 5, element.y - 15, 10, 10);                   // Top Right
        this.ctx.fillRect(element.x - 15, element.y + element.height + 5, 10, 10);                  // Bottom Left
        this.ctx.fillRect(element.x + element.width + 5, element.y + element.height + 5, 10, 10);   // Bottom Right

        this.ctx.restore();
    }

    addText(text: Text) {
        this.ctx.save();
        this.ctx.font = `${text.size}px`;
        text.height = text.size;
        text.width = this.ctx.measureText(text.content).width;
        this.ctx.restore();
        this.drawing.elements.push(text);
    }

    addShape(shape: Shape) {
        this.drawing.elements.push(shape);
    }

    setSelectedElement(coords: any) {
        for (let element of this.drawing.elements.reverse()) {
            if (element.isHovered(coords)) {
                this.selectedElement = element;
                break;
            } else {
                this.clearSelectedElement();
            }
        }

        this.draw();
    }

    clearSelectedElement() {
        this.selectedElement = null;
    }
}
