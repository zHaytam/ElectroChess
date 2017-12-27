import Player from "../player";
import { Sides, Pieces } from '../consts';
import Piece from './piece';

export default class Game {

    public grid: Piece[][];
    public playerBlack: Player;
    public playerWhite: Player;
    public currentlyPlaying: number;
    public get currentPlayer(): Player {
        return this.currentlyPlaying === 0 ? this.playerBlack : this.playerWhite;
    }

    constructor(playerBlack: Player, playerWhite: Player) {
        this.initializeGrid();
        this.playerBlack = playerBlack;
        this.playerWhite = playerWhite;
        this.playerBlack.startGame(this, Sides.BLACK);
        this.playerWhite.startGame(this, Sides.WHITE);
        this.currentlyPlaying = 0;
    }

    public start() {
        this.playerBlack.socket.emit('GameStartedMessage', {
            side: Sides.BLACK,
            opponent: this.playerWhite.id,
            grid: this.grid
        });

        this.playerWhite.socket.emit('GameStartedMessage', {
            side: Sides.WHITE,
            opponent: this.playerBlack.id,
            grid: this.grid
        });
    }

    private initializeGrid() {
        this.grid = [];
        for (let row = 0; row < 8; row++) {
            this.grid[row] = [];
            for (let col = 0; col < 8; col++) {
                this.grid[row][col] = new Piece(Pieces.NONE, row >= 4 ? Sides.WHITE : Sides.BLACK);
            }
        }

        // Pawns
        for (let col = 0; col < 8; col++) {
            this.grid[1][col].type = Pieces.PAWN;
            this.grid[6][col].type = Pieces.PAWN;
        }

        // Rooks
        this.grid[0][0].type = Pieces.ROOK;
        this.grid[0][7].type = Pieces.ROOK;
        this.grid[7][0].type = Pieces.ROOK;
        this.grid[7][7].type = Pieces.ROOK;

        // Knights
        this.grid[0][1].type = Pieces.KNIGHT;
        this.grid[0][6].type = Pieces.KNIGHT;
        this.grid[7][1].type = Pieces.KNIGHT;
        this.grid[7][6].type = Pieces.KNIGHT;

        // Bishops
        this.grid[0][2].type = Pieces.BISHOP;
        this.grid[0][5].type = Pieces.BISHOP;
        this.grid[7][2].type = Pieces.BISHOP;
        this.grid[7][5].type = Pieces.BISHOP;

        // Queen & King
        this.grid[0][3].type = Pieces.QUEEN;
        this.grid[0][4].type = Pieces.KING;
        this.grid[7][3].type = Pieces.QUEEN;
        this.grid[7][4].type = Pieces.KING;
    }

}