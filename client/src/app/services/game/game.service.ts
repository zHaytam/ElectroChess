import { Injectable } from '@angular/core';
import { SocketService } from '../socket.service';
import Player from '../player';
import { Sides } from '../../../../../shared/consts';
import Board from '../../../../../shared/board';
import Piece from '../../../../../shared/pieces/piece';


@Injectable()
export class GameService {

    public playing: boolean;
    public board: Board;
    public side: Sides;
    public opponent: Player;
    public get player(): Player {
        return this.socketService.player;
    }

    constructor(private socketService: SocketService) {
        this.playing = false;
    }

    public startGame(side: Sides, opponent: Player) {
        this.board = new Board();
        console.log(this.board);
        this.player.side = side;
        this.opponent = opponent;
        this.opponent.side = side === Sides.BLACK ? Sides.WHITE : Sides.BLACK;
        this.playing = true;
    }

}
