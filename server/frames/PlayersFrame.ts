import Frame from './Frame';
import Player from '../player';
import Server from '../server';

export default class PlayersFrame implements Frame {

    public handlePlayer(player: Player) {
        player.socket.on('PlayersListRequestMessage', (data) => this.onPlayersListRequestMessage(player, data));
    }

    private onPlayersListRequestMessage(player: Player, data: any) {
        console.log(player.loggedIn);
        if (!player.loggedIn) {
            return;
        }

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

}