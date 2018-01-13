import Piece from './pieces/piece';
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

    public getPiece(row: number, col: number): Piece {
        for (const piece of this.pieces) {
            if (piece.row === row && piece.col === col) {
                return piece;
            }
        }

        return undefined;
    }

    public hasPiece(row: number, col: number): boolean {
        return this.getPiece(row, col) !== undefined;
    }

    public hasPieceOfSide(row: number, col: number, side: Sides): boolean {
        const piece = this.getPiece(row, col);
        if (piece && piece.side === side) {
            return true;
        }

        return false;
    }

    public isValidPosition(row: number, col: number): boolean {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    public movePiece(data: any, playingSide: Sides): boolean {
        if (!data.from || !data.to) {
            return false;
        }

        const fromPiece = this.getPiece(data.from.row, data.from.col);
        if (!fromPiece) {
            return false;
        }

        const possibleDestinations = fromPiece.getPossibleDestinations(this);
        for (const possibleDestination of possibleDestinations) {
            if (possibleDestination.row === data.to.row && possibleDestination.col === data.to.col) {
                const toPiece = this.getPiece(possibleDestination.row, possibleDestination.col);
                if (toPiece && toPiece.side === playingSide) {
                    return;
                }

                // if there is an opponent's piece
                if (toPiece && toPiece.side !== playingSide) {
                    this.pieces.splice(this.pieces.indexOf(toPiece), 1);
                }

                fromPiece.row = possibleDestination.row;
                fromPiece.col = possibleDestination.col;
                return true;
            }
        }

        return false;
    }

    public canBeEaten(piece: Piece) {
        for (const bPiece of this.pieces) {
            if (bPiece.side === piece.side || bPiece === piece) {
                continue;
            }

            for (const possibleDestination of bPiece.getPossibleDestinations(this)) {
                if (possibleDestination.row === piece.row && possibleDestination.col === piece.col) {
                    return true;
                }
            }
        }

        return false;
    }

    public promotePawn(row: number, col: number, to: number): boolean {
        if (to < 0 || to > 3) {
            return false;
        }

        const pawnToPromote = this.getPiece(row, col);
        if (!pawnToPromote) {
            return false;
        }

        let newPiece;
        switch (to) {
            case 0:
                newPiece = new Knight(pawnToPromote.side, pawnToPromote.row, pawnToPromote.col);
                break;
            case 1:
                newPiece = new Bishop(pawnToPromote.side, pawnToPromote.row, pawnToPromote.col);
                break;
            case 2:
                newPiece = new Rook(pawnToPromote.side, pawnToPromote.row, pawnToPromote.col);
                break;
            case 3:
                newPiece = new Queen(pawnToPromote.side, pawnToPromote.row, pawnToPromote.col);
                break;
        }

        this.pieces.splice(this.pieces.indexOf(pawnToPromote), 1);
        this.pieces.push(newPiece);
        return true;
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

}