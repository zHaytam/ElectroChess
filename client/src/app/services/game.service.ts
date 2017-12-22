import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';


@Injectable()
export class GameService {

    public playing: boolean;
    public side: number;
    public opponent: any;

    constructor(private socketService: SocketService) {
        this.playing = false;
    }

    public startGame(data: any) {
        this.side = data.side;
        this.opponent = data.opponent;
        this.playing = true;
    }

}
