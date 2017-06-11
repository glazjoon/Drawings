import { Mouse } from './Mouse';
import { ResizeOptions } from './../models/ResizeOptions';
import { Selection } from './../models/Selection';
import { Coordinate } from './../models/Coordinate';
import { Element } from './../models/Element';
import { Drawing } from './../models/Drawing';
import { Anchors } from './../enums/Anchors';

export class Editor {
    private drawing: Drawing;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private selection: Selection;
    private resizeAnchor: Anchors;
    private isFreeResize: boolean;
    private isFixedResize: boolean;
    private isDrag: boolean;
    private shiftKeyDown: boolean;

    private mouse: Mouse;

    constructor(canvas: HTMLCanvasElement, drawing: Drawing) {
        this.canvas = canvas;
        this.canvas.setAttribute('tabindex', '1');
        this.ctx = canvas.getContext('2d');
        this.drawing = drawing;
        this.mouse = new Mouse(canvas);
        this.refresh();
        this.addEventListeners();
    }

    /*
    TODO: 
    -Break out classes for handling Mouse and Keyboard + events.
    -Finish proper selection of shapes
    -Finish implementing rectangle fixedResize
    -Implement text bold, italic, underline
    -Precise resize of Text
    -Add representation of favicon on canvas at start. Alternatively draw from shapes.
    -Add Circle
    -Add Ellipse
    -Add Polygon
    -Add Triangle
    -Add Pencil
    -Add Tool class
    */

    addElement(element: Element) {
        this.drawing.addElement(element);
        this.refresh();
    }

    private refresh() {
        this.clear();
        this.drawing.draw(this.ctx);

        if (this.selection) {
            this.selection.draw(this.ctx);
        }
    }

    private clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private setSelected(mousePos: Coordinate) {
        const selected = this.drawing.getElementAtPosition(mousePos);
        console.log(selected);
        if (selected != null) {
            this.selection = new Selection(selected);
        } else {
            this.selection = null;
        }
        this.refresh();
    }

    private addEventListeners() {
        this.canvas.addEventListener('mouseup', () => this.onMouseUp());
        this.canvas.addEventListener('mousedown', (event) => this.onMouseDown(event));
        this.canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
        this.canvas.addEventListener('keydown', (event) => this.onKeyDown(event));
        this.canvas.addEventListener('keyup', (event) => this.onKeyUp(event));
    }

    private onMouseDown(event: MouseEvent) {
        const mousePos = this.mouse.getCanvasMousePosition(event.clientX, event.clientY);
        console.log(mousePos);


        if (this.isDrag) {
            this.mouse.setCursor('move');
        }

        this.mouse.mouseDragStart = new Coordinate(mousePos.x, mousePos.y);
        this.resizeAnchor = this.selection ? this.selection.getHoveredAnchor(mousePos) : -1;

        if (this.resizeAnchor > -1) {
            if (this.shiftKeyDown) {
                this.isFixedResize = true;
            } else {
                this.isFreeResize = true;
            }
        } else {
            this.setSelected(mousePos);
        }

        if (this.resizeAnchor === -1 && this.selection) {
            this.isDrag = true;
        }

        this.refresh();
    }

    private onMouseUp() {
        this.isDrag = false;
        this.isFreeResize = false;
        this.isFixedResize = false;
    }

    private onMouseMove(event: MouseEvent) {
        const mousePos = this.mouse.getCanvasMousePosition(event.clientX, event.clientY);

        if (this.isFreeResize) {
            this.selection.element.resize(new ResizeOptions(this.resizeAnchor, mousePos, this.mouse.mouseDragStart, false));
        } else if (this.isFixedResize) {
            this.selection.element.resize(new ResizeOptions(this.resizeAnchor, mousePos, this.mouse.mouseDragStart, true));
        } else if (this.isDrag) {
            this.selection.element.move(mousePos, this.mouse.mouseDragStart);
        }

        if (this.isDrag || this.isFixedResize || this.isFreeResize) {
            this.mouse.mouseDragStart = mousePos;
            this.refresh();
        }

        const hoveredAnchor = this.selection ? this.selection.getHoveredAnchor(mousePos) : -1;

        if (!this.isFreeResize && hoveredAnchor > -1) {
            this.mouse.setResizeCursor(hoveredAnchor);
        } else {
            this.mouse.setCursor('auto');
        }
    }

    private onKeyDown(event: KeyboardEvent) {
        if (event.keyCode === 16) {
            this.shiftKeyDown = true;
        }
    }

    private onKeyUp(event: KeyboardEvent) {
        if (event.keyCode === 16) {
            this.shiftKeyDown = false;
            this.isFixedResize = false;
        }
    }

}
