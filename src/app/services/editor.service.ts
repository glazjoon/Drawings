import { CustomEventEmitter } from './../logic/CustomEventEmitter';
import { Stroke } from './../models/Stroke';
import { TextOptions } from './../models/TextOptions';
import { Text } from './../models/Text';
import { Fonts } from './../enums/Fonts';
import { Dimensions } from './../models/Dimensions';
import { Coordinate } from './../models/Coordinate';
import { ElementOptions } from './../models/ElementOptions';
import { Rectangle } from './../models/Rectangle';
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
