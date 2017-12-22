import Game from './game';

export default class Player {

    public id: number;
    public socket: SocketIO.Socket;
    public username: string;
    public game: Game;
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

}