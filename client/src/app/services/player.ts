import { Sides } from '../consts';
export default class Player {

    public id: number;
    public name: string;
    public side: Sides;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

}
