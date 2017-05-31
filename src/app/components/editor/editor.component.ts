import { Circle } from './../../models/Circle';
import { Stroke } from './../../models/Stroke';
import { EditorService } from './../../services/editor.service';
import { Dimensions } from './../../models/Dimensions';
import { Coordinate } from './../../models/Coordinate';
import { TextOptions } from './../../models/TextOptions';
import { Text } from './../../models/Text';
import { Rectangle } from './../../models/Rectangle';
import { ElementOptions } from './../../models/ElementOptions';
import { Editor } from './../../logic/Editor';
import { Fonts } from './../../enums/Fonts';
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
        this.editorService.editor = new Editor(this.er.nativeElement.querySelector('#canvas'));
        this.editor = this.editorService.editor;
        this.editor.addElement(new Circle(
            new ElementOptions(
                new Coordinate(this.canvasWidth / 2, this.canvasHeight / 2),
                new Dimensions(50, 0), '#000000', null)));

        this.editor.addElement(new Rectangle(
            new ElementOptions(
                new Coordinate(this.canvasWidth / 2 - 25, this.canvasHeight / 2 - 25),
                new Dimensions(50, 50), '#ff0000', null)));

        this.editor.addElement(new Text(
            'Drawings',
            new TextOptions(72, Fonts.Arial, false, false, false),
            new ElementOptions(
                new Coordinate(this.canvasWidth / 2, this.canvasHeight / 2),
                new Dimensions(0, 0), '#0000ff',
                new Stroke('#000000', 2))));
    }
}
