import { EditorService } from './../../services/editor.service';
import { Component, Input } from '@angular/core';
import { Element } from './../../models/Element';

@Component({
    moduleId: module.id,
    selector: 'dw-element',
    templateUrl: 'element.component.html',
    styleUrls: ['element.component.css']
})
export class ElementComponent {

    @Input() element: Element;

    constructor(private editorService: EditorService) {}

    clicked() {
        this.editorService.setSelected(this.element.id);
    }
}
