import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';


@Injectable()
export class GameService {

  public playing: boolean;

  constructor(private socketService: SocketService) {
    this.playing = false;
  }

}
