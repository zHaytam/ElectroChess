import { Component } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
    selector: 'app-players-list',
    templateUrl: './players-list.component.html',
    styleUrls: ['./players-list.component.css']
})

export class PlayersListComponent {

    public playersList: any[];

    constructor(private socketService: SocketService) {
        this.socketService.on('PlayersListMessage', this.onPlayersListMessage.bind(this));
        this.socketService.on('PlayerLeftMessage', this.onPlayerLeftMessage.bind(this));
        this.socketService.on('PlayerJoinedMessage', this.onPlayerJoinedMessage.bind(this));
        this.socketService.send('PlayersListRequestMessage', {});
    }

    private invitePlayer(e, player) {
        e.preventDefault();
        console.log(player);
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
