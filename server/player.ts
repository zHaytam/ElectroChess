export default class Player {

    public id: number;
    public socket: SocketIO.Socket;

    constructor(id: number, socket: SocketIO.Socket) {
        this.id = id;
        this.socket = socket;
    }

}