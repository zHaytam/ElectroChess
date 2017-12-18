import Frame from './Frame';
import Player from '../player';
import Server from '../server';

export default class LoginFrame implements Frame {

    public handlePlayer(player: Player) {
        player.socket.on('LoginRequestMessage', (data) => this.onLoginRequestMessage(player, data));
        console.log(`[LoginFrame] Started handling player #${player.id}.`)
    }

    private onLoginRequestMessage(player: Player, msg: any) {
        if (!msg.username) {
            LoginFrame.denieLoginRequest(player, 0);
            return;
        }

        for (let i = 0; i < Server.players.length; i++) {
            if (Server.players[i].username == msg.username) {
                LoginFrame.denieLoginRequest(player, 1);
                return;
            }
        }

        player.username = msg.username;
        player.socket.emit('LoginRequestAcceptedMessage');
    }

    private static denieLoginRequest(player: Player, reason: number) {
        console.log(`Login request denied for player #${player.id}.`);
        player.socket.emit('LoginRequestDeniedMessage', {
            reason: reason
        });
    }

}