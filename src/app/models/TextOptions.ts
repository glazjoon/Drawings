import { Fonts } from './../enums/Fonts';

export class TextOptions {

    size: number;
    font: Fonts;
    bold: boolean;
    italic: boolean;
    underline: boolean;

    constructor(size: number, font: Fonts, bold: boolean, italic: boolean, underline: boolean) {
        this.size = size;
        this.font = font;
        this.bold = bold;
        this.italic = italic;
        this.underline = underline;
    }

}
