export default class EventDispatcher {

    private listeners: any[];

    constructor() {
        this.listeners = [];
    }

    public hasEventListener(type: string, listener: Function) {
        for (let i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i].type && this.listeners[i].type === type && this.listeners[i].listener &&
                this.listeners[i].listener === listener) {
                return true;
            }
        }

        return false;
    }

    public addEventListener(type: string, listener: Function): boolean {
        if (this.hasEventListener(type, listener)) {
            return false;
        }

        this.listeners.push({
            type: type,
            listener: listener
        });

        return true;
    }

    public removeEventListener(type: string, listener: Function): boolean {
        for (let i = this.listeners.length - 1; i >= 0; i--) {
            if (this.listeners[i].type && this.listeners[i].type === type && this.listeners[i].listener &&
                this.listeners[i].listener === listener) {
                this.listeners.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    public dispatchEvent(type: string, data?: any) {
        for (let i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i].type && this.listeners[i].type === type && this.listeners[i].listener) {
                this.listeners[i].listener(data);
            }
        }
    }

}
