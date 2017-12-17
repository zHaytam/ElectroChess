import * as socketIo from 'socket.io';
import Player from './player';
import FramesManager from './frames/FramesManager';

const PORT = 1997;

export default class Server {

    private static idsCounter = 0;
    private static socket: SocketIO.Server;
    public static listening: boolean;
    public static players: Player[];

    public static initialize() {
        FramesManager.initialize();
        Server.listening = false;
        Server.players = [];
        Server.socket = socketIo();
        Server.socket.on('connection', Server.onConnection.bind(this));
    }

    private static onConnection(socket) {
        let newPlayer = new Player(Server.idsCounter, socket);
        FramesManager.handlePlayer(newPlayer);
        Server.players.push(newPlayer);
        console.log(`Player #${newPlayer.id} connected (${Server.players.length} players in total).`);
        Server.idsCounter++;

        // Handle the player's disconnection
        newPlayer.socket.on('disconnect', function () {
            const newPlayerIndex = Server.players.indexOf(newPlayer);
            if (newPlayerIndex >= 0) {
                Server.players.splice(newPlayerIndex, 1);
                console.log(`Player #${newPlayer.id} disconnected (${Server.players.length} players left).`);
            }
        });
    }

    public static start() {
        if (Server.listening) {
            return;
        }

        Server.socket.listen(PORT);
        Server.listening = true;
        console.log(`Started! listening on port ${PORT}..`);
    }

    public static stop() {
        if (!Server.listening) {
            return;
        }

        Server.socket.close();
        Server.listening = false;
        console.log('Stopped.');
    }

}