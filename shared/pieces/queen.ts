import Piece from './piece';
import { Sides } from '../consts';
import Board from '../board';


export default class Queen extends Piece {

    constructor(side: Sides, row: number, col: number) {
        super(side, row, col);
    }

    public getPossibleDestinations(board: Board): any[] {
        const possibleDestinations = [];

        // horizontal
        this.getPossibleDestinationsHorizontally(board, -1, possibleDestinations);
        this.getPossibleDestinationsHorizontally(board, 1, possibleDestinations);

        // vertical
        this.getPossibleDestinationsVertically(board, -1, possibleDestinations);
        this.getPossibleDestinationsVertically(board, 1, possibleDestinations);

        // diagonal
        this.getPossibleDestinationsDiagonally(board, -1, -1, possibleDestinations);
        this.getPossibleDestinationsDiagonally(board, -1, 1, possibleDestinations);
        this.getPossibleDestinationsDiagonally(board, 1, -1, possibleDestinations);
        this.getPossibleDestinationsDiagonally(board, 1, 1, possibleDestinations);

        return possibleDestinations;
    }

}