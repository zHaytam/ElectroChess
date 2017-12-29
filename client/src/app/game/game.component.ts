import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { GameService } from '../services/game/game.service';
import { Router } from '@angular/router';
import { Sides } from '../../../../shared/consts';
import Piece from '../../../../shared/pieces/piece';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})

export class GameComponent {

    public selectedPiece: Piece;
    public possibleDestinations: Piece[];

    constructor(public socketService: SocketService, public gameService: GameService, private router: Router) {
        this.possibleDestinations = [];
    }

    private onPieceClick(piece: Piece) {
        // If there is no selected piece, select this one
        if (this.selectedPiece === undefined) {
            this.selectedPiece = piece;
            this.possibleDestinations = this.gameService.getPossibleDestinations(piece);
        }

        // If there is a selected piece and the clicked piece is not among the possible destinations, reset everything
        if (this.selectedPiece && !this.possibleDestinations.includes(piece)) {
            this.selectedPiece = undefined;
            this.possibleDestinations = [];
        }
    }

}
