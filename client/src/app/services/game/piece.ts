import { Pieces, Sides } from '../../consts';

export default class Piece {

    public type: Pieces;
    public side: Sides;

    constructor(type: Pieces, side: Sides) {
        this.type = type;
        this.side = side;
    }

}
