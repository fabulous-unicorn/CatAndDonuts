import { POINT } from '../utils/constants';

export class Player {
    constructor(lives = 3) {
        this.dx = 0;
        this.dy = POINT * 2;
        this.dWidth = POINT;
        this.dHeight = POINT;
        this.score = 0;
        this.distance = 0;
        this.lives = lives;
    }

    moveUp() {
        if (this.dy !== 0) {
            this.dy -= POINT;
        }
    }

    moveDown() {
        if (this.dy !== POINT * 4) {
            this.dy += POINT;
        }
    }

    subtractLive() {
        this.lives -= 1;
    }

    addScore() {
        this.score += 1;
    }
}
