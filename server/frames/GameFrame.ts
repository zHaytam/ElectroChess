import Frame from './Frame';
import Player from '../player';
import Server from '../server';

export default class GameFrame implements Frame {

    public handlePlayer(player: Player) {
        player.socket.on('MovePieceMessage', (data) => GameFrame.onMovePieceMessage(player, data));
        player.socket.on('PromotePawnMessage', (data) => GameFrame.onPromotePawnMessage(player, data));
    }

    private static onMovePieceMessage(player: Player, data: any) {
        if (player.game) {
            player.game.handleMovePieceMessage(player, data);
        }
    }

    private static onPromotePawnMessage(player: Player, data: any) {
        if (player.game && player.pawnToPromote && data.to !== undefined) {
            player.game.promotePawn(player, data.to);
        }
    }

}