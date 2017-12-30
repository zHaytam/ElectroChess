import Player from "./player";
import { Sides } from '../shared/consts';
import Board from '../shared/board';

export default class Game {

    public board: Board;
    public playerBlack: Player;
    public playerWhite: Player;
    public currentlyPlaying: number;
    public get currentPlayer(): Player {
        return this.currentlyPlaying === 0 ? this.playerBlack : this.playerWhite;
    }

    constructor(playerBlack: Player, playerWhite: Player) {
        this.board = new Board();
        this.playerBlack = playerBlack;
        this.playerWhite = playerWhite;
        this.playerBlack.startGame(this, Sides.BLACK);
        this.playerWhite.startGame(this, Sides.WHITE);
        this.currentlyPlaying = -1;
    }

    public start() {
        this.playerBlack.socket.emit('GameStartedMessage', {
            side: Sides.BLACK,
            opponent: this.playerWhite.id
        });

        this.playerWhite.socket.emit('GameStartedMessage', {
            side: Sides.WHITE,
            opponent: this.playerBlack.id
        });

        this.nextTurn();
    }

    public handleMovePieceMessage(player: Player, data: any) {
        if (this.currentPlayer !== player) {
            return;
        }

        if (this.board.movePiece(data, this.currentPlayer.side)) {
            this.sendToBothPlayers('PieceMovedMessage', data);
            this.nextTurn();
        }
    }

    private nextTurn() {
        this.currentlyPlaying = this.currentlyPlaying == -1 ? 0 : (this.currentlyPlaying == 0 ? 1 : 0);
        const data = { id: this.currentPlayer.id };
        this.sendToBothPlayers('GameTurnMessage', data);
    }

    private sendToBothPlayers(type: string, data: any) {
        this.playerBlack.socket.emit(type, data);
        this.playerWhite.socket.emit(type, data);
    }

}