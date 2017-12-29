import Piece from './piece';
import { Sides } from '../consts';
import Board from '../board';


export default class Pawn extends Piece {

    constructor(side: Sides, row: number, col: number) {
        super(side, row, col);
    }

    public getPossibleDestinations(board: Board): any[] {
        const possibleDestinations = [];

        // simple movements
        let nRow = this.row + (this.side === Sides.BLACK ? 1 : -1);
        if (board.isValidPosition(nRow, this.col)) {
            const piece = board.getPiece(nRow, this.col);
            // if there is no piece in this position
            if (!piece) {
                possibleDestinations.push({ row: nRow, col: this.col });
                // check if this pawn can move another tile
                if ((this.row === 1 && this.side === Sides.BLACK) || (this.row === 6 && this.side === Sides.WHITE)) {
                    nRow += this.side === Sides.BLACK ? 1 : -1;
                    if (board.isValidPosition(nRow, this.col) && !board.hasPieceOfSide(nRow, this.col, this.side)) {
                        possibleDestinations.push({ row: nRow, col: this.col });
                    }
                }
            }
            // if there is an opponent's piece
            else if (piece.side !== this.side) {
                possibleDestinations.push({ row: nRow, col: this.col });
            }
        }

        // eating movements TODO

        return possibleDestinations;
    }

}