import Player from "./player";
import { Sides } from '../shared/consts';
import Board from '../shared/board';
import King from '../shared/pieces/king';
import Server from "./server";
import Piece from "../shared/pieces/piece";
import Knight from '../shared/pieces/knight';
import Bishop from "../shared/pieces/bishop";
import Rook from '../shared/pieces/rook';
import Queen from "../shared/pieces/queen";
import Pawn from "../shared/pieces/pawn";

export default class Game {

    public board: Board;
    public playerBlack: Player;
    public playerWhite: Player;
    public currentlyPlaying: number;
    private get currentPlayer(): Player {
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
        // if this is not the current player or if we're waiting for him to promote a pawn
        if (this.currentPlayer !== player || this.currentPlayer.pawnToPromote) {
            return;
        }

        if (this.board.movePiece(data, this.currentPlayer.side)) {
            // If the king was eaten, end the game
            if (this.board.pieces.find(p => p.side !== this.currentPlayer.side && p instanceof King === undefined)) {
                Server.endGame(this, this.currentPlayer.id);
            }
            else {
                this.sendToBothPlayers('PieceMovedMessage', data);

                // If a pawn needs to be promoted
                const pawnToPromote = this.board.pieces.find(p => p.side === this.currentPlayer.side &&
                    ((p.side === Sides.BLACK && p.row === 7) || (p.side === Sides.WHITE && p.row === 0)));
                if (pawnToPromote && pawnToPromote instanceof Pawn) {
                    this.pawnPromotion(pawnToPromote);
                }
                else {
                    this.nextTurn();
                }
            }
        }
    }

    public promotePawn(player: Player, to: number) {
        if (player !== this.currentPlayer) {
            return;
        }

        const row = this.currentPlayer.pawnToPromote.row;
        const col = this.currentPlayer.pawnToPromote.col;
        if (this.board.promotePawn(row, col, to)) {
            this.sendToBothPlayers('PawnPromotedMessage', {
                row: row,
                col: col,
                to: to
            });
            player.pawnToPromote = undefined;
            this.nextTurn();
        }
    }

    public sendToBothPlayers(type: string, data: any) {
        this.playerBlack.socket.emit(type, data);
        this.playerWhite.socket.emit(type, data);
    }

    private pawnPromotion(pawnToPromote: Piece) {
        this.currentPlayer.pawnToPromote = pawnToPromote;
        this.currentPlayer.socket.emit('PromotePawnMessage', {
            row: pawnToPromote.row,
            col: pawnToPromote.col
        });
    }

    private nextTurn() {
        this.currentlyPlaying = this.currentlyPlaying == -1 ? 0 : (this.currentlyPlaying == 0 ? 1 : 0);
        const data = { id: this.currentPlayer.id };
        this.sendToBothPlayers('GameTurnMessage', data);
    }

}