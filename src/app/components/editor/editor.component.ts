import { Polygon } from './../../models/Polygon';
import { Stroke } from './../../models/Stroke';
import { Drawing } from './../../models/Drawing';
import { Circle } from './../../models/Circle';
import { EditorService } from './../../services/editor.service';
import { Dimensions } from './../../models/Dimensions';
import { Coordinate } from './../../models/Coordinate';
import { Rectangle } from './../../models/Rectangle';
import { ElementOptions } from './../../models/ElementOptions';
import { Editor } from './../../logic/Editor';
import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'dw-editor',
    templateUrl: 'editor.component.html',
    styleUrls: ['editor.component.css']
})
export class EditorComponent implements OnInit {

    @Input() canvasWidth: number;
    @Input() canvasHeight: number;
    private editor: Editor;

    constructor(private er: ElementRef, private editorService: EditorService) { }

    ngOnInit() {
        this.editorService.editor = new Editor(this.er.nativeElement.querySelector('#canvas'), new Drawing('#ffffff'));
        this.editor = this.editorService.editor;
        this.editor.addElement(new Circle(
            new ElementOptions(
                new Coordinate(this.canvasWidth / 2, this.canvasHeight / 2),
                new Dimensions(50, 50), '#000000', null)));

        this.editor.addElement(new Rectangle(
            new ElementOptions(
                new Coordinate(this.canvasWidth / 2 - 125, this.canvasHeight / 2 - 125),
                new Dimensions(50, 50), '#ff0000', null)));

        this.editor.addElement(new Polygon(
            new ElementOptions(null, null, 'green', new Stroke('black', 5)),
            [
                new Coordinate(514, 136),
                new Coordinate(554, 48),
                new Coordinate(619, 152),
                new Coordinate(611, 218),
                new Coordinate(458, 158)
            ]
        ));

        /*
                this.editor.addElement(new Text(
                    'Drawings',
                    new TextOptions(72, Fonts.Arial, false, false, false),
                    new ElementOptions(
                        new Coordinate(this.canvasWidth / 2, this.canvasHeight / 2),
                        new Dimensions(0, 0), '#0000ff',
                        new Stroke('#000000', 2))));
                        */
    }
}
