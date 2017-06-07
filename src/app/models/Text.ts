import { Stroke } from './Stroke';
import { Strokeable } from './../interfaces/Strokeable';
import { ResizeOptions } from './ResizeOptions';
import { TextOptions } from './TextOptions';
import { ElementOptions } from './ElementOptions';
import { Element } from './Element';
import { Fonts } from './../enums/Fonts';

export class Text extends Element implements Strokeable {

    content: string;
    size: number;
    font: Fonts;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    stroke: Stroke;

    constructor(content: string, textOptions: TextOptions, elementOptions: ElementOptions) {
        elementOptions.dims.h = textOptions.size;

        super(elementOptions);

        this.content = content;
        this.size = textOptions.size;
        this.font = textOptions.font;
        this.bold = textOptions.bold;
        this.italic = textOptions.italic;
        this.underline = textOptions.underline;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.font = `${this.italic ? 'italic ' : ''}${this.bold ? 'bold ' : ''}${this.size}px Arial`;
        this.dims.w = ctx.measureText(this.content).width;
        ctx.textBaseline = 'hanging';
        ctx.textAlign = 'start';

        if (this.stroke) {
            this.drawStroke(ctx);
        } else {
            this.drawFill(ctx);
        }

        ctx.restore();
    }

    drawFill(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.fillColor;
        ctx.fillText(this.content, this.pos.x, this.pos.y);
    }

    drawStroke(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = this.stroke.color;
        ctx.lineWidth = this.stroke.lineWidth;
        ctx.strokeText(this.content, this.pos.x, this.pos.y);
    }

    resize(options: ResizeOptions) {
        const diffX = options.mousePosition.x - options.mouseDragStart.x;
        const diffY = options.mousePosition.y - options.mouseDragStart.y;
        const increment = diffX > diffY ? diffX : diffY;
        this.size += increment;
        this.dims.h = this.size;
    }
}
