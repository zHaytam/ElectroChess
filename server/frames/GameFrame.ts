import Frame from './Frame';
import Player from '../player';
import Server from '../server';

export default class GameFrame implements Frame {

    public handlePlayer(player: Player) {
        player.socket.on('MovePieceMessage', (data) => GameFrame.onMovePieceMessage(player, data));
    }

    private static onMovePieceMessage(player: Player, data: any) {
        player.game.handleMovePieceMessage(player, data);
    }

}