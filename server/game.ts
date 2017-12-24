import Player from "./player";
import { Sides } from './consts';

export default class Game {

    public playerBlack: Player;
    public playerWhite: Player;
    public currentlyPlaying: number;
    public get currentPlayer(): Player {
        return this.currentlyPlaying == 0 ? this.playerBlack : this.playerWhite;
    }

    constructor(playerBlack: Player, playerWhite: Player) {
        this.playerBlack = playerBlack;
        this.playerWhite = playerWhite;
        this.playerBlack.startGame(this, Sides.BLACK);
        this.playerWhite.startGame(this, Sides.WHITE);
        this.currentlyPlaying = 0;
    }

    public start() {
        this.playerBlack.socket.emit('GameStartedMessage', {
            side: Sides.BLACK,
            opponent: this.playerWhite.id
        });

        this.playerWhite.socket.emit('GameStartedMessage', {
            side: Sides.WHITE,
            opponent: this.playerBlack.id
        });
    }

}