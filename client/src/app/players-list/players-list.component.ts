import { Component } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-players-list',
    templateUrl: './players-list.component.html',
    styleUrls: ['./players-list.component.css']
})

export class PlayersListComponent {

    public playersList: any[];
    public inviting: boolean;
    public alert: any;

    constructor(public socketService: SocketService, private gameService: GameService, private router: Router) {
        this.inviting = false;
        this.alert = {
            type: undefined,
            content: undefined,
            visible: false
        };
        this.socketService.on('PlayersListMessage', this.onPlayersListMessage.bind(this));
        this.socketService.on('PlayerLeftMessage', this.onPlayerLeftMessage.bind(this));
        this.socketService.on('PlayerJoinedMessage', this.onPlayerJoinedMessage.bind(this));
        this.socketService.on('InviteRequestDeniedMessage', this.onInviteRequestDeniedMessage.bind(this));
        this.socketService.on('InviteRequestMessage', this.onInviteRequestMessage.bind(this));
        this.socketService.on('GameStartedMessage', this.onGameStartedMessage.bind(this));
        this.socketService.send('PlayersListRequestMessage', {});
    }

    private invitePlayer(e, player) {
        e.preventDefault();

        if (this.gameService.playing || this.inviting) {
            return;
        }

        if (this.socketService.send('InvitePlayerRequestMessage', { id: player.id })) {
            this.inviting = true;
        }
    }

    private onPlayersListMessage(data) {
        this.playersList = data;
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
            this.playersList.push(data);
        }
    }

    private onInviteRequestDeniedMessage(data) {
        switch (data.reason) {
            case 0:
                this.alert.content = 'Player not found or is not logged in.';
                break;
            case 1:
                this.alert.content = 'Player is already playing a game.';
                break;
        }

        this.alert.type = 'danger';
        this.alert.visible = true;
        this.inviting = false;

        setTimeout(() => {
            this.alert.visible = false;
        }, 3000);
    }

    private onInviteRequestMessage(data) {
        const opponent = this.getPlayer(data.id);
        if (opponent) {
            this.alert.content = `${opponent.name} invited you to play!`;
            this.alert.type = 'info';
            this.alert.invite = true;
            this.alert.visible = true;
        }
    }

    private onGameStartedMessage(data) {
        // TODO: change
        for (const player of this.playersList) {
            if (player.id === data.opponent) {
                data.opponent = player;
                break;
            }
        }

        this.gameService.startGame(data);
        this.router.navigateByUrl('game');
    }

    private getPlayer(id: number): any {
        for (const player of this.playersList) {
            if (player.id === id) {
                return player;
            }
        }

        return undefined;
    }

}
