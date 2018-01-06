import { Injectable } from '@angular/core';
import { SocketService } from '../socket.service';
import Player from '../player';
import { Sides } from '../../../../../shared/consts';
import Board from '../../../../../shared/board';
import Piece from '../../../../../shared/pieces/piece';
import Move from './move';


@Injectable()
export class GameService {

    public playing: boolean;
    public board: Board;
    public side: Sides;
    public opponent: Player;
    public myTurn: boolean;
    public moves: Move[];
    public get player(): Player {
        return this.socketService.player;
    }
    private get currentlyPlaying(): Player {
        return this.myTurn ? this.player : this.opponent;
    }

    constructor(private socketService: SocketService) {
        this.playing = false;
        this.myTurn = false;
        this.moves = [];
        this.socketService.on('GameTurnMessage', this.onGameTurnMessage.bind(this));
        this.socketService.on('PieceMovedMessage', this.onPieceMovedMessage.bind(this));
    }

    public startGame(side: Sides, opponent: Player) {
        this.board = new Board();
        this.player.side = side;
        this.opponent = opponent;
        this.opponent.side = side === Sides.BLACK ? Sides.WHITE : Sides.BLACK;
        this.playing = true;
    }

    private onGameTurnMessage(data: any) {
        this.myTurn = (data.id === this.player.id);
    }

    private onPieceMovedMessage(data: any) {
        console.log(data);
        if (this.board.movePiece(data, this.currentlyPlaying.side)) {
            // this is poor, but will always work for us since black always starts
            if (this.currentlyPlaying.side === Sides.BLACK) {
                this.moves.push(new Move(data));
            }
            else {
                this.moves[this.moves.length - 1].white = data;
            }
        }
    }

}
