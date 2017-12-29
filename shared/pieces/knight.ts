import Piece from './piece';
import { Sides } from '../consts';
import Board from '../board';

const offsets = [
    { row: -2, col: -1 },
    { row: -2, col: +1 },
    { row: -1, col: -2 },
    { row: -1, col: +2 },
    { row: +2, col: -1 },
    { row: +2, col: +1 },
    { row: +1, col: -2 },
    { row: +1, col: +2 }
]

export default class Knight extends Piece {

    constructor(side: Sides, row: number, col: number) {
        super(side, row, col);
    }

    public getPossibleDestinations(board: Board): any[] {
        const possibleDestinations = [];

        for (let offset of offsets) {
            const possibleDestination = { row: offset.row + this.row, col: offset.col + this.col };

            if (board.isValidPosition(possibleDestination.row, possibleDestination.col) && !board.hasPieceOfSide(possibleDestination.row, possibleDestination.col, this.side)) {
                possibleDestinations.push(possibleDestination);
            }
        }

        return possibleDestinations;
    }

}