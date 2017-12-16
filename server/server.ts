import * as socketIo from 'socket.io';
import Player from './player';

export default class Server {

    private static idsCounter = 0;
    private socket: SocketIO.Server;
    public listening: boolean;
    public players: Player[];

    constructor() {
        this.listening = false;
        this.players = [];
        this.socket = socketIo();
        this.socket.on('connection', this.onConnection.bind(this));
    }

    private onConnection(socket) {
        let newPlayer = new Player(Server.idsCounter);
        this.players.push(newPlayer);
        console.log(`New player (${newPlayer.id}) connected.`);
        Server.idsCounter++;
    }

    public start(port: number) {
        if (this.listening) {
            return;
        }

        this.socket.listen(port);
        this.listening = true;
    }

    public stop() {
        if (!this.listening) {
            return;
        }

        this.socket.close();
        this.listening = false;
    }

}