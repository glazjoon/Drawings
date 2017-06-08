import { Coordinate } from './../models/Coordinate';
import { Anchors } from './../enums/Anchors';

export class Mouse {
    private canvas: HTMLCanvasElement;
    mouseDragStart: Coordinate;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    getCanvasMousePosition(x: number, y: number) {
        let rect = this.canvas.getBoundingClientRect();
        let pos = new Coordinate(x - rect.left, y - rect.top);
        return pos;
    }

    setResizeCursor(anchor: Anchors) {
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

    setCursor(cursor: string) {
        this.canvas.style.cursor = cursor;
    }
}
