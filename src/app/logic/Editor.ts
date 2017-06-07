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
    private mouseDragStart: Coordinate;
    private mousePosition: Coordinate;
    private shiftKeyDown: boolean;

    constructor(canvas: HTMLCanvasElement, drawing?: Drawing) {
        this.canvas = canvas;
        this.canvas.setAttribute('tabindex', '1');
        this.ctx = canvas.getContext('2d');
        this.drawing = drawing || new Drawing('#ffffff');
        this.refresh();
        this.addEventListeners();
    }

    /*
    TODO: 
    -Finish implementing rectangle fixedResize
    -Implement text bold, italic, underline
    -Precise resize of Text
    -Add favicon on canvas at start. Alternatively draw from shapes.
    -Add Circle
    -Add Ellipse
    -Add Polygon
    -Add Triangle
    -Add Pencil
    -Add Tool class
    */

    newDrawing() {
        this.drawing = new Drawing('#ffffff');
        this.clear();
    }


    addElement(element: Element) {
        this.drawing.elements.push(element);
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

    setSelectedById(id: string): Element {
        let selectedElement;

        for(let element of this.drawing.elements) {
            if (element.id === id) {
                this.selection = new Selection(element);
                selectedElement = element;
                break;
            }
        }
        this.refresh();
        return selectedElement;
    }

    private setSelected() {
        this.selection = null;

        for (let i = this.drawing.elements.length - 1; i >= 0; i--) {
            let element = this.drawing.elements[i];

            if (element.isHovered(this.mousePosition)) {
                this.selection = new Selection(element);
                break;
            }
        }
        this.refresh();
    }

    private getRelativeMousePosition(x: number, y: number) {
        let rect = this.canvas.getBoundingClientRect();
        return new Coordinate(x - rect.left, y - rect.top)
    }

    private onMouseDown(event: MouseEvent) {
        if (!this.mousePosition) {
            this.mousePosition = this.getRelativeMousePosition(event.clientX, event.clientY);
        }

        if (this.isDrag) {
            this.setCursor('move');
        }

        this.mouseDragStart = new Coordinate(this.mousePosition.x, this.mousePosition.y);
        this.resizeAnchor = this.selection ? this.selection.getHoveredAnchor(this.mousePosition) : -1;

        if (this.resizeAnchor > -1) {
            if (this.shiftKeyDown) {
                this.isFixedResize = true;
            } else {
                this.isFreeResize = true;
            }
        } else {
            this.setSelected();
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
        this.mousePosition = this.getRelativeMousePosition(event.clientX, event.clientY);

        if (this.isFreeResize) {
            this.selection.element.resize(new ResizeOptions(this.resizeAnchor, this.mousePosition, this.mouseDragStart, false));
            this.selection.update();
        } else if (this.isFixedResize) {
            this.selection.element.resize(new ResizeOptions(this.resizeAnchor, this.mousePosition, this.mouseDragStart, true));
            this.selection.update();
        } else if (this.isDrag) {
            this.selection.element.move(this.mousePosition, this.mouseDragStart);
            this.selection.update();
        }

        if (this.isDrag || this.isFixedResize || this.isFreeResize) {
            this.mouseDragStart = this.mousePosition;
            this.refresh();
        }

        const hoveredAnchor = this.selection ? this.selection.getHoveredAnchor(this.mousePosition) : -1;

        if (!this.isFreeResize && hoveredAnchor > -1) {
            this.setResizeCursor(hoveredAnchor);
        } else {
            this.setCursor('auto');
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

    private setResizeCursor(anchor: Anchors) {
        switch (anchor) {
            case Anchors.Top:
                this.setCursor('n-resize');
                break;
            case Anchors.Right:
                this.setCursor('e-resize');
                break;
            case Anchors.Bottom:
                this.setCursor('s-resize');
                break;
            case Anchors.Left:
                this.setCursor('w-resize');
                break;
            case Anchors.TopLeft:
                this.setCursor('nw-resize');
                break;
            case Anchors.TopRight:
                this.setCursor('ne-resize');
                break;
            case Anchors.BottomLeft:
                this.setCursor('sw-resize');
                break;
            case Anchors.BottomRight:
                this.setCursor('se-resize');
                break;
        }
    }

    private setCursor(cursor: string) {
        this.canvas.style.cursor = cursor;
    }

    private addEventListeners() {
        this.canvas.addEventListener('mouseup', () => this.onMouseUp());
        this.canvas.addEventListener('mousedown', (event) => this.onMouseDown(event));
        this.canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
        this.canvas.addEventListener('keydown', (event) => this.onKeyDown(event));
        this.canvas.addEventListener('keyup', (event) => this.onKeyUp(event));
    }
}
