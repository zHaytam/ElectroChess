import Piece from './piece';
import { Sides } from '../consts';
import Board from '../board';


export default class Rook extends Piece {

    constructor(side: Sides, row: number, col: number) {
        super(side, row, col);
    }

    public getPossibleDestinations(board: Board): any[] {
        const possibleDestinations = [];

        // up
        this.getPossibleDestinationsVertically(board, -1, possibleDestinations);

        // down
        this.getPossibleDestinationsVertically(board, 1, possibleDestinations);

        // left
        this.getPossibleDestinationsHorizontally(board, -1, possibleDestinations);

        // right
        this.getPossibleDestinationsHorizontally(board, 1, possibleDestinations);

        return possibleDestinations;
    }

}