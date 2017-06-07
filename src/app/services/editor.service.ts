import { CustomEventEmitter } from './../logic/CustomEventEmitter';
import { Editor } from './../logic/Editor';
import { Injectable } from '@angular/core';
import { Element } from './../models/Element';

@Injectable()
export class EditorService {
    editor: Editor;
    ElementSelectedEvent: CustomEventEmitter<Element>;

    /*
    TODO: 
    -Find out if I should use public props or getters/setters.
    -find out if Editor should be Observable.
    -Gör Editor.drawing till en observable? Borde Drawing flyttas ut ur Editor? Rimligt? 
    */
    constructor() {
        this.ElementSelectedEvent = new CustomEventEmitter();
    }

    setSelected(id: string) {
        const element = this.editor.setSelectedById(id);
        this.ElementSelectedEvent.emit(element);
    }
}
