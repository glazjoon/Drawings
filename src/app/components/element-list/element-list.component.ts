import { Component, Input } from '@angular/core';
import { Element } from './../../models/Element';

@Component({
    moduleId: module.id,
    selector: 'dw-element-list',
    templateUrl: 'element-list.component.html',
    styleUrls: ['element-list.component.css']
})
export class ElementListComponent {
    @Input() elements: Element[];
}
