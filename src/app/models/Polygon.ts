import { ResizeOptions } from './ResizeOptions';
import { ElementOptions } from './ElementOptions';
import { Stroke } from './Stroke';
import { Element } from './Element';
import { Coordinate } from './Coordinate';

export class Polygon extends Element {

    private vertices: Coordinate[];
    stroke: Stroke;

    constructor(options: ElementOptions, vertices?: Coordinate[]) {
        super(options);
        this.vertices = vertices;
        this.stroke = options.stroke;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.beginPath();

        const firstVertex = this.vertices[0];

        ctx.moveTo(firstVertex.x, firstVertex.y);

        for (let i = 0; i < this.vertices.length; i++) {
            if (i < this.vertices.length - 1) {
                let nextVertex = this.vertices[i + 1];
                ctx.lineTo(nextVertex.x, nextVertex.y);
            } else {
                ctx.lineTo(firstVertex.x, firstVertex.y);
            }

        }
        ctx.closePath();

        ctx.fillStyle = this.fillColor;
        ctx.strokeStyle = this.stroke.color;
        ctx.lineWidth = this.stroke.lineWidth;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    resize(resize: ResizeOptions) {

    }

    isHovered(coords: Coordinate): boolean {
     /*
        let minX = this.vertices[0].x;
        let maxX = this.vertices[0].x;
        let minY = this.vertices[0].x;
        let maxY = this.vertices[0].x;

        let hovered = false;

        for (let i = 1; i < this.vertices.length; i++) {
            const vertex = this.vertices[i];

            minX = vertex.x < minX ? vertex.x : minX;
            maxX = vertex.x > maxX ? vertex.x : maxX;
            minY = vertex.y < minY ? vertex.y : minY;
            maxY = vertex.y > maxY ? vertex.y : maxY;
        }

        hovered = coords.x > minX && coords.x < maxX && coords.y > minY && coords.y < maxY;
        return hovered;
        */
        return false
    }

    addPoint() {

    }
}
