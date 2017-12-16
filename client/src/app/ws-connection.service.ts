import { Injectable } from '@angular/core';
import EventDispatcher from './utilities/EventDispatcher';

@Injectable()
export class WsConnectionService extends EventDispatcher {

    private ws: WebSocket;
    public connected: boolean;

    constructor() {
        super();
        this.connected = false;
        this.ws = new WebSocket('ws://localhost:1997');
        this.ws.onopen = () => this.onOpen();
        this.ws.onmessage = (e) => this.onMessage(e);
        this.ws.onclose = () => this.onClose();
    }

    login(username: String): boolean {
        if (!this.connected) {
            return false;
        }

        return this.send({
            type: 'LoginRequestMessage',
            data: {
                username: username
            }
        });
    }

    onOpen() {
        this.connected = true;
    }

    onMessage(e) {
        const json = JSON.parse(e.data);

        if (json.type) {
            this.dispatchEvent(json.type, json);
        }
    }

    onClose() {
        this.connected = false;
    }

    public send(data: any): boolean {
        if (!this.connected) {
            return false;
        }

        this.ws.send(JSON.stringify(data));
        return true;
    }

}
