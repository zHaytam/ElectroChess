import { Component } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { GameService } from '../services/game/game.service';
import { Router } from '@angular/router';
import Player from '../services/player';

@Component({
    selector: 'app-players-list',
    templateUrl: './players-list.component.html',
    styleUrls: ['./players-list.component.css']
})

export class PlayersListComponent {

    public playersList: Player[];
    public inviting: boolean;
    public alerts: any[];
    public inviters: Player[];

    constructor(public socketService: SocketService, private gameService: GameService, private router: Router) {
        this.inviting = false;
        this.alerts = [];
        this.inviters = [];
        this.socketService.on('PlayersListMessage', this.onPlayersListMessage.bind(this));
        this.socketService.on('PlayerLeftMessage', this.onPlayerLeftMessage.bind(this));
        this.socketService.on('PlayerJoinedMessage', this.onPlayerJoinedMessage.bind(this));
        this.socketService.on('InviteRequestDeniedMessage', this.onInviteRequestDeniedMessage.bind(this));
        this.socketService.on('InviteRequestMessage', this.onInviteRequestMessage.bind(this));
        this.socketService.on('InviteDeclinedMessage', this.onInviteDeclinedMessage.bind(this));
        this.socketService.on('GameStartedMessage', this.onGameStartedMessage.bind(this));
        this.socketService.send('PlayersListRequestMessage', {});
    }

    private invitePlayer(e, player: Player) {
        e.preventDefault();

        if (this.gameService.playing || this.inviting) {
            return;
        }

        if (this.socketService.send('InvitePlayerRequestMessage', { id: player.id })) {
            this.inviting = true;
        }
    }

    private declineInvite(inviter: Player) {
        inviter = this.getPlayer(inviter.id);
        if (inviter && this.socketService.send('DeclineInviteMessage', { inviterId: inviter.id })) {
            this.inviters.splice(this.inviters.findIndex((e) => e.id === inviter.id));
        }
    }

    private acceptInvite(inviter: Player) {
        inviter = this.getPlayer(inviter.id);
        if (inviter) {
            this.socketService.send('AcceptInviteMessage', { inviter: inviter.id });
        }
    }

    private onPlayersListMessage(data) {
        this.playersList = [];
        for (const p of data) {
            this.playersList.push(new Player(p.id, p.name));
        }
    }

    private onPlayerLeftMessage(data) {
        for (let i = 0; i < this.playersList.length; i++) {
            if (data.id === this.playersList[i].id) {
                this.playersList.splice(i, 1);
            }
        }
    }

    private onPlayerJoinedMessage(data) {
        if (data.id !== undefined && data.name) {
            this.playersList.push(new Player(data.id, data.name));
        }
    }

    private onInviteRequestDeniedMessage(data) {
        let msg = '';
        switch (data.reason) {
            case 0:
                msg = 'Player not found or is not logged in.';
                break;
            case 1:
                msg = 'Player is already playing a game.';
                break;
        }

        this.alerts.push({
            content: msg,
            type: 'danger'
        });

        this.inviting = false;
    }

    private onInviteRequestMessage(data) {
        const opponent = this.getPlayer(data.inviterId);
        if (!opponent) {
            return;
        }

        this.inviters.push(opponent);
    }

    private onInviteDeclinedMessage(data) {
        this.alerts.push({
            content: `${data.from} declined your invite.`,
            type: 'danger'
        });

        this.inviting = false;
    }

    private onGameStartedMessage(data) {
        const opponent = this.getPlayer(data.opponent);
        if (!opponent) {
            return;
        }

        this.gameService.startGame(data.side, opponent, data.grid);
        this.router.navigateByUrl('game');
    }

    private getPlayer(id: number): Player {
        for (const player of this.playersList) {
            if (player.id === id) {
                return player;
            }
        }

        return undefined;
    }

}
