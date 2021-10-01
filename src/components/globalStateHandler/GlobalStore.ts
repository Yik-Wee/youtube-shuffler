type Writeable<T> = { -readonly [K in keyof T]: T[K] }; 

class GlobalStore {
    readonly _state: any;

    constructor(state: any) {
        this.setState(state);
    }

    get state() {
        return this._state;
    }

    setState(state: any) {
        (this as Writeable<GlobalStore>)._state = state;
    }
}

export default GlobalStore;