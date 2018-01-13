import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { GameService } from '../services/game/game.service';
import { Router } from '@angular/router';
import { Sides } from '../../../../shared/consts';
import Piece from '../../../../shared/pieces/piece';
import King from '../../../../shared/pieces/king';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})

export class GameComponent {

    public selectedPiece: Piece;
    public possibleDestinations: any[];
    public pawnToPromote: Piece;

    constructor(public socketService: SocketService, public gameService: GameService, private router: Router) {
        this.possibleDestinations = [];
        this.socketService.on('PromotePawnMessage', this.onPromotePawnMessage.bind(this));
    }

    private getPieceClass(piece: Piece): string {
        let classes = piece.getClass();

        if (piece === this.selectedPiece) {
            classes += ' selected';
        }

        if (piece instanceof King && this.gameService.board.canBeEaten(piece)) {
            classes += ' danger';
        }

        return classes;
    }

    private getPromotionPossiblityClass(type: number): string {
        const side = Sides[this.gameService.player.side].toLowerCase();
        switch (type) {
            case 0:
                return 'knight-' + side;
            case 1:
                return 'bishop-' + side;
            case 2:
                return 'rook-' + side;
            case 3:
                return 'queen-' + side;
        }
    }

    private getPromotionPopupPosition(): any {
        if (!this.pawnToPromote) {
            throw new Error('Invalid use.');
        }

        if (this.pawnToPromote.side === Sides.BLACK) {
            return {
                'top': ((3 * 64) - 14) + 'px',
                'left': (this.pawnToPromote.col * 64) + 'px'
            };
        }
        else {
            return {
                'top': 64 + 'px',
                'left': (this.pawnToPromote.col * 64) + 'px'
            };
        }
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
                this.resetSelection();
            }
        }
        // If there is a selected piece and the clicked tile is among the possible destinations
        else if (this.gameService.myTurn && !this.pawnToPromote) {
            this.socketService.send('MovePieceMessage', {
                from: { row: this.selectedPiece.row, col: this.selectedPiece.col },
                to: { row: row, col: col }
            });
            this.resetSelection();
        }
    }

    private resetSelection() {
        this.selectedPiece = undefined;
        this.possibleDestinations = [];
    }

    private trySelectPiece(row: number, col: number): boolean {
        const piece = this.gameService.board.getPiece(row, col);
        if (this.selectedPiece === piece) {
            return;
        }

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

    private onPromotePawnMessage(data: any) {
        this.pawnToPromote = this.gameService.board.getPiece(data.row, data.col);
        if (this.pawnToPromote) {
            console.log('Pawn promotion.', this.pawnToPromote);
        }
    }

    private promoteTo(to: number) {
        if (this.pawnToPromote) {
            this.socketService.send('PromotePawnMessage', { to: to });
            this.pawnToPromote = undefined;
        }
    }

}
