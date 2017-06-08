import { Subject } from 'rxjs/Subject';

export class CustomEventEmitter<T> extends Subject<T> {
    constructor() {
        super();
    }
    emit(value: any) {
        super.next(value);
    }
}
