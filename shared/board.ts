import Piece from "./pieces/piece";
import Pawn from './pieces/pawn';
import { Sides } from './consts';
import Rook from './pieces/rook';
import Knight from './pieces/knight';
import Bishop from "./pieces/bishop";
import Queen from "./pieces/queen";
import King from './pieces/king';

export default class Board {

    public pieces: Piece[];

    constructor() {
        this.pieces = [];
        this.initializePieces();
    }

    private initializePieces() {
        // Blacks are at the top, Whites are on the bottom

        // PAWNS
        for (let col = 0; col < 8; col++) {
            this.pieces.push(new Pawn(Sides.BLACK, 1, col));
            this.pieces.push(new Pawn(Sides.WHITE, 6, col));
        }

        // ROOKS
        this.pieces.push(new Rook(Sides.BLACK, 0, 0));
        this.pieces.push(new Rook(Sides.BLACK, 0, 7));
        this.pieces.push(new Rook(Sides.WHITE, 7, 0));
        this.pieces.push(new Rook(Sides.WHITE, 7, 7));

        // KNIGHTS
        this.pieces.push(new Knight(Sides.BLACK, 0, 1));
        this.pieces.push(new Knight(Sides.BLACK, 0, 6));
        this.pieces.push(new Knight(Sides.WHITE, 7, 1));
        this.pieces.push(new Knight(Sides.WHITE, 7, 6));

        // BISHOPS
        this.pieces.push(new Bishop(Sides.BLACK, 0, 2));
        this.pieces.push(new Bishop(Sides.BLACK, 0, 5));
        this.pieces.push(new Bishop(Sides.WHITE, 7, 2));
        this.pieces.push(new Bishop(Sides.WHITE, 7, 5));

        // QUEENS AND KINGS
        this.pieces.push(new Queen(Sides.BLACK, 0, 3));
        this.pieces.push(new King(Sides.BLACK, 0, 4));
        this.pieces.push(new Queen(Sides.WHITE, 7, 3));
        this.pieces.push(new King(Sides.WHITE, 7, 4));
    }

    public getPiece(row: number, col: number): Piece {
        for (const piece of this.pieces) {
            if (piece.row === row || piece.col === col) {
                return piece;
            }
        }

        return undefined;
    }

    public hasPiece(row: number, col: number): boolean {
        return this.getPiece(row, col) !== undefined;
    }

}