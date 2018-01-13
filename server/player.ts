import Game from './game';
import { Sides } from '../shared/consts';
import Piece from '../shared/pieces/piece';

export default class Player {

    public id: number;
    public socket: SocketIO.Socket;
    public username: string;
    public game: Game;
    public side: Sides;
    public pawnToPromote: Piece;
    public get loggedIn(): boolean {
        return this.username !== undefined;
    }
    public get isPlaying(): boolean {
        return this.game !== undefined;
    }

    constructor(id: number, socket: SocketIO.Socket) {
        this.id = id;
        this.socket = socket;
    }

    public startGame(game: Game, side: Sides) {
        this.game = game;
        this.side = side;
    }

}