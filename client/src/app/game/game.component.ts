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
    public possibleDestinations: any[];

    constructor(public socketService: SocketService, public gameService: GameService, private router: Router) {
        this.possibleDestinations = [];
    }

    private getPieceClass(piece: Piece): string {
        let classes = piece.getClass();

        if (piece === this.selectedPiece) {
            classes += ' selected';
        }

        return classes;
    }

    private onBoardClick(event: MouseEvent) {
        const parent: HTMLElement = event.srcElement.id === 'board' ? <HTMLElement>event.srcElement : event.srcElement.parentElement;
        const x = event.pageX - parent.offsetLeft;
        const y = event.pageY - parent.offsetTop;
        const tileX = Math.floor(x / 64);
        const tileY = Math.floor(y / 64);
        this.handleTileClick(tileX, tileY);
    }

    private handleTileClick(col: number, row: number) {
        // If there is no selected piece
        if (this.selectedPiece === undefined) {
            // Select this one(if it's ours)
            this.trySelectPiece(row, col);
        }
        // If there is a selected piece and the clicked tile is not among the possible destinations
        else if (this.selectedPiece !== undefined && !this.isPossibleDestination(row, col)) {
            // If the clicked tile is one of the player's pieces, select it directly
            if (!this.trySelectPiece(row, col)) {
                // Otherwise reset selection
                this.selectedPiece = undefined;
                this.possibleDestinations = [];
            }
        }
        // If there is a selected piece and the clicked tile is among the possible destinations
        else {

        }
    }

    private trySelectPiece(row: number, col: number): boolean {
        const piece = this.gameService.board.getPiece(row, col);
        if (piece && piece.side === this.gameService.player.side) {
            this.selectedPiece = piece;
            this.possibleDestinations = piece.getPossibleDestinations(this.gameService.board);
            return true;
        }

        return false;
    }

    private isPossibleDestination(row: number, col: number): boolean {
        for (const possibleDestination of this.possibleDestinations) {
            if (possibleDestination.row === row && possibleDestination.col === col) {
                return true;
            }
        }

        return false;
    }

}
