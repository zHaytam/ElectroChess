import { Injectable } from '@angular/core';
import { SocketService } from '../socket.service';
import Player from '../player';
import { Sides } from '../../consts';
import Piece from './piece';


@Injectable()
export class GameService {

    public playing: boolean;
    public grid: Piece[][];
    public side: Sides;
    public opponent: Player;
    public get player(): Player {
        return this.socketService.player;
    }

    constructor(private socketService: SocketService) {
        this.playing = false;
    }

    public startGame(side: Sides, opponent: Player, grid: Piece[][]) {
        this.grid = grid;
        this.socketService.player.side = side;
        this.opponent = opponent;
        this.opponent.side = side === Sides.BLACK ? Sides.WHITE : Sides.BLACK;
        this.playing = true;
    }

}
