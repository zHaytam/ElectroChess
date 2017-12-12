import { Injectable } from '@angular/core';

@Injectable()
export class WsConnectionService {

  ws: WebSocket;

  constructor() {
    this.ws = new WebSocket('ws://localhost:1997');
    // this.ws.on('open', this.onOpen);
    // this.ws.on('message', this.onMessage);
    // this.ws.on('close', this.onClose);
    this.ws.onopen = this.onOpen;
    this.ws.onmessage = this.onMessage;
    this.ws.onclose = this.onClose;
  }

  login(username: String): boolean {
    console.log('Trying to login as ' + username);
    return true;
  }

  onOpen() {
    console.log('Connection opened.');
  }

  onMessage(data) {
    console.log(data);
  }

  onClose() {
    console.log('Connection closed.');
  }

}
