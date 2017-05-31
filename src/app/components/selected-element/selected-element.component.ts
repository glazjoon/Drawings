import { EditorService } from './../../services/editor.service';
import { Component, OnInit } from '@angular/core';
import { Element } from './../../models/Element';

@Component({
    moduleId: module.id,
    selector: 'dw-selected-element',
    templateUrl: 'selected-element.component.html',
    styleUrls: ['selected-element.component.css']
})
export class SelectedElementComponent implements OnInit {

    element: Element;

    constructor(private editorService: EditorService) {
        this.editorService.ElementSelectedEvent.subscribe((element: Element) => {
            this.element = element;
        });
    }

    ngOnInit() {

    }

}
