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

    abstract getPossibleDestinations(board: Board): Piece[];

    public getClass(): string {
        const type = this.constructor.name.toLowerCase();
        const color = Sides[this.side].toLowerCase();
        return `${type}-${color}`;
    }

}