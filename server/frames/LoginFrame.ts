import Frame from './Frame';
import Player from '../player';

export default class LoginFrame implements Frame {

    public handlePlayer(player: Player) {
        player.socket.on('LoginRequestMessage', (data) => this.onLoginRequestMessage(player, data));
        console.log(`[LoginFrame] Started handling player #${player.id}.`)
    }

    private onLoginRequestMessage(player: Player, msg: any) {
        console.log(msg);
    }

}