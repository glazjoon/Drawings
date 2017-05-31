import { ElementOptions } from './ElementOptions';
import { Element } from './Element';

export abstract class Shape extends Element {

    constructor(options: ElementOptions) {
        super(options);
    }
}


