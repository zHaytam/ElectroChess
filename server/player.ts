export default class Player {

    public id: number;
    public socket: SocketIO.Socket;
    public username: string;
    public get loggedIn(): boolean {
        return this.username !== undefined;
    }

    constructor(id: number, socket: SocketIO.Socket) {
        this.id = id;
        this.socket = socket;
    }

}