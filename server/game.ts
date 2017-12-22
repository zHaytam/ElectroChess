import Player from "./player";

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
        this.currentlyPlaying = 0;
    }

}