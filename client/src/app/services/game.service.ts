import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import Player from './player';
import { Sides } from '../consts';


@Injectable()
export class GameService {

    public playing: boolean;
    public side: Sides;
    public opponent: Player;

    constructor(private socketService: SocketService) {
        this.playing = false;
    }

    public startGame(side: Sides, opponent: Player) {
        console.log(side);
        this.side = side;
        this.opponent = opponent;
        this.playing = true;
    }

}
