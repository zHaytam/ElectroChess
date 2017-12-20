import { Component } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { GameService } from '../services/game.service';

@Component({
    selector: 'app-players-list',
    templateUrl: './players-list.component.html',
    styleUrls: ['./players-list.component.css']
})

export class PlayersListComponent {

    public playersList: any[];
    public inviting: boolean;

    constructor(private socketService: SocketService, private gameService: GameService) {
        this.inviting = false;
        this.socketService.on('PlayersListMessage', this.onPlayersListMessage.bind(this));
        this.socketService.on('PlayerLeftMessage', this.onPlayerLeftMessage.bind(this));
        this.socketService.on('PlayerJoinedMessage', this.onPlayerJoinedMessage.bind(this));
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

}
