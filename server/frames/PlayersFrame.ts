import Frame from './Frame';
import Player from '../player';
import Server from '../server';

export default class PlayersFrame implements Frame {

    public handlePlayer(player: Player) {
        player.socket.on('PlayersListRequestMessage', (data) => PlayersFrame.onPlayersListRequestMessage(player, data));
        player.socket.on('disconnect', () => PlayersFrame.onDisconnect(player));
    }

    private static onPlayersListRequestMessage(player: Player, data: any) {
        if (!player.loggedIn)
            return;

        let playersList = [];

        for (let i = 0; i < Server.players.length; i++) {
            const sPlayer = Server.players[i];
            if (!sPlayer.loggedIn || sPlayer === player)
                continue;

            playersList.push({
                id: sPlayer.id,
                name: sPlayer.username
            });
        }

        player.socket.emit('PlayersListMessage', playersList);
    }

    private static onDisconnect(player: Player) {
        if (player.loggedIn) {
            Server.broadcast('PlayerLeftMessage', { id: player.id }, player);
        }
    }

}