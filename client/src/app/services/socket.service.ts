import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:1997';

@Injectable()
export class SocketService {

    private socket: SocketIOClient.Socket;
    public connected: boolean;
    public username: string;
    public get loggedIn(): boolean {
        return this.username !== undefined;
    }

    constructor() {
        this.connected = false;
        this.socket = socketIo(SERVER_URL);
        this.socket.on('connect', this.onOpen.bind(this));
        this.socket.on('disconnect', this.onClose.bind(this));
    }

    private onOpen() {
        console.log('Connected.');
        this.connected = true;
    }

    private onClose() {
        console.error('Disconnected.');
        this.connected = false;
    }

    public on(type: string, func: Function) {
        this.socket.on(type, func);
    }

    public removeEventListener(type: string, func: Function) {
        this.socket.removeEventListener(type, func);
    }

    public send(type: string, data: any, mustBeLoggedIn: boolean = true): boolean {
        if (!this.connected) {
            return false;
        }

        if (mustBeLoggedIn && !this.loggedIn) {
            return false;
        }

        this.socket.emit(type, data);
        return true;
    }

}
