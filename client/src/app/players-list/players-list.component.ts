import { Component } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})

export class PlayersListComponent {

  private playersList: any[];

  constructor(private socketService: SocketService) {
    this.socketService.on('PlayersListMessage', this.onPlayersListMessage.bind(this));
    this.socketService.send('PlayersListRequestMessage', {});
    console.log("djnd");
  }

  private onPlayersListMessage(data) {
    console.log(data);
    this.playersList = data;
  }

}
