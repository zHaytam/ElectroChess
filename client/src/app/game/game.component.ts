import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { GameService } from '../services/game/game.service';
import { Router } from '@angular/router';
import Piece from '../services/game/piece';
import { Pieces, Sides } from '../consts';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})

export class GameComponent {

    constructor(public socketService: SocketService, public gameService: GameService, private router: Router) {
    }

    private getPieceClass(piece: Piece) {
        if (piece.type === Pieces.NONE) {
            return '';
        }

        const type = Pieces[piece.type].toLowerCase();
        const color = Sides[piece.side].toLowerCase();
        return `${type}-${color}`;
    }

}
