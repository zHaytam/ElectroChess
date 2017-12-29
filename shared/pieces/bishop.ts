import Piece from './piece';
import { Sides } from '../consts';
import Board from '../board';


export default class Bishop extends Piece {

    constructor(side: Sides, row: number, col: number) {
        super(side, row, col);
    }

    public getPossibleDestinations(board: Board): any[] {
        const possibleDestinations = [];

        // top-left
        this.getPossibleDestinationsDiagonally(board, -1, -1, possibleDestinations);

        // top-right
        this.getPossibleDestinationsDiagonally(board, -1, 1, possibleDestinations);

        // bottom-left
        this.getPossibleDestinationsDiagonally(board, 1, -1, possibleDestinations);

        // bottom-right
        this.getPossibleDestinationsDiagonally(board, 1, 1, possibleDestinations);

        return possibleDestinations;
    }

}