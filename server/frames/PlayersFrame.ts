import Frame from './Frame';
import Player from '../player';
import Server from '../server';

export default class PlayersFrame implements Frame {

    public handlePlayer(player: Player) {
        player.socket.on('PlayersListRequestMessage', (data) => PlayersFrame.onPlayersListRequestMessage(player, data));
        player.socket.on('InvitePlayerRequestMessage', (data) => PlayersFrame.onInvitePlayerRequestMessage(player, data));
        player.socket.on('DeclineInviteMessage', (data) => PlayersFrame.onDeclineInviteMessage(player, data));
        player.socket.on('AcceptInviteMessage', (data) => PlayersFrame.onAcceptInviteMessage(player, data));
        player.socket.on('disconnect', () => PlayersFrame.onDisconnect(player));
    }

    private static onPlayersListRequestMessage(player: Player, data: any) {
        if (!player.loggedIn)
            return;

        let playersList = [];

        for (let sPlayer of Server.players) {
            if (!sPlayer.loggedIn || sPlayer === player)
                continue;

            playersList.push({
                id: sPlayer.id,
                name: sPlayer.username
            });
        }

        player.socket.emit('PlayersListMessage', playersList);
    }

    private static onInvitePlayerRequestMessage(player: Player, data: any) {
        if (player.isPlaying || !player.loggedIn) {
            return;
        }

        const playerTwo = Server.getPlayer(data.id);
        if (playerTwo === undefined || !playerTwo.loggedIn) {
            PlayersFrame.denieInviteRequest(player, 0);
            return;
        }

        if (playerTwo.isPlaying) {
            PlayersFrame.denieInviteRequest(player, 1);
            return;
        }

        playerTwo.socket.emit('InviteRequestMessage', { inviterId: player.id });
    }

    private static onDeclineInviteMessage(player: Player, data: any) {
        const inviter = Server.getPlayer(data.inviterId);
        if (inviter != null) {
            inviter.socket.emit('InviteDeclinedMessage', { from: inviter.username });
        }
    }

    private static onAcceptInviteMessage(player: Player, data: any) {
        if (player.isPlaying || !player.loggedIn) {
            return;
        }

        const inviter = Server.getPlayer(data.inviter);
        if (!inviter || !inviter.loggedIn || inviter.isPlaying) {
            return;
        }

        // Start a game between the two players
        Server.startGame(inviter, player);
    }

    private static onDisconnect(player: Player) {
        if (player.loggedIn) {
            Server.broadcast('PlayerLeftMessage', { id: player.id }, player);
        }
    }

    private static denieInviteRequest(player: Player, reason: number) {
        player.socket.emit('InviteRequestDeniedMessage', { reason: reason });
    }

}