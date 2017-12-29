import { Sides } from '../consts';
import Board from '../board';

export default abstract class Piece {

    public side: Sides;
    public row: number;
    public col: number;

    constructor(side: Sides, row: number, col: number) {
        this.side = side;
        this.row = row;
        this.col = col;
    }

    abstract getPossibleDestinations(board: Board): any[];

    public getClass(): string {
        const type = this.constructor.name.toLowerCase();
        const color = Sides[this.side].toLowerCase();
        return `${type}-${color}`;
    }

    protected getPossibleDestinationsVertically(board: Board, i: number, possibleDestinations: any[]) {
        for (let row = this.row + i; row >= 0 && row < 8; row += i) {
            // stop 1
            if (board.hasPieceOfSide(row, this.col, this.side)) {
                break;
            }

            possibleDestinations.push({ row: row, col: this.col });

            // stop 2
            if (board.hasPiece(row, this.col)) {
                break;
            }
        }
    }

    protected getPossibleDestinationsHorizontally(board: Board, i: number, possibleDestinations: any[]) {
        for (let col = this.col + i; col >= 0 && col < 8; col += i) {
            // stop 1
            if (board.hasPieceOfSide(this.row, col, this.side)) {
                break;
            }

            possibleDestinations.push({ row: this.row, col: col });

            // stop 2
            if (board.hasPiece(this.row, col)) {
                break;
            }
        }
    }

    protected getPossibleDestinationsDiagonally(board: Board, i: number, j: number, possibleDestinations: any[]) {
        let row = this.row + i;
        let col = this.col + j;

        while (board.isValidPosition(row, col)) {
            // stop 1
            if (board.hasPieceOfSide(row, col, this.side)) {
                break;
            }

            possibleDestinations.push({ row: row, col: col });

            // stop 2
            if (board.hasPiece(row, col)) {
                break;
            }

            row += i;
            col += j;
        }
    }

}