import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { GameService } from '../services/game/game.service';
import { Router } from '@angular/router';
import Piece from '../services/game/piece';
import { Sides } from '../consts';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})

export class GameComponent {

    constructor(public socketService: SocketService, public gameService: GameService, private router: Router) {
    }

    private getColor(piece: Piece) {
        return piece.side === Sides.BLACK ? 'black' : 'white';
    }

}
