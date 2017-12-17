import LoginFrame from './LoginFrame';
import Frame from './Frame';
import Player from '../player';

export default class FramesManager {

    private static frames: Frame[];

    public static initialize() {
        FramesManager.frames = [];
        FramesManager.frames.push(new LoginFrame());
    }

    public static handlePlayer(player: Player) {
        for (let i = 0; i < FramesManager.frames.length; i++) {
            FramesManager.frames[i].handlePlayer(player);
        }
    }

}