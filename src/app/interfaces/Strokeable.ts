import { Stroke } from './../models/Stroke';

export interface Strokeable {
    stroke: Stroke;
    drawStroke(ctx: CanvasRenderingContext2D): void;
}
