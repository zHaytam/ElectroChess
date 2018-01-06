export default class Move {
    public black: any;
    public white: any;

    constructor(black: any) {
        this.black = black;
    }

    private static colToChar(col: number) {
        const ascii = 65 + col;
        return String.fromCharCode(ascii);
    }

    public getBlackStr(): string {
        // tslint:disable-next-line:max-line-length
        return `${Move.colToChar(this.black.from.col)}${8 - this.black.from.row}>${Move.colToChar(this.black.to.col)}${8 - this.black.to.row}`;
    }

    public getWhiteStr(): string {
        if (this.white === undefined) {
            return '';
        }
        else {
            // tslint:disable-next-line:max-line-length
            return `${Move.colToChar(this.white.from.col)}${8 - this.white.from.row}>${Move.colToChar(this.white.to.col)}${8 - this.white.to.row}`;
        }
    }

}
