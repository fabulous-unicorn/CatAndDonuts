import { POINT, DANGER_TYPE } from '../utils/constants';
import { randomArrayElement } from '../utils/random';
import {
    planet1, planet2, planet3, planet4, planet5, planet6, planet7, planet8, planet9, planet10, planet11, donut
} from '../../assets/img';

export class Danger {

    static PLANETS = [planet1, planet2, planet3, planet4, planet5, planet6, planet7, planet8, planet9, planet10, planet11];

    constructor(dx = 0, dy = 0, type) {
        this.dx = dx;
        this.dy = dy;

        this.dWidth = POINT;
        this.dHeight = POINT;

        this.type = type;
        this.image = this.getImage();
    }

    getImage() {
        const image = new Image();
        image.src = this.isPlanet() ? randomArrayElement(Danger.PLANETS) : donut;
        return image;
    }

    isPlanet () {
        return this.type === DANGER_TYPE.BLOCK;
    }

    motion() {
        this.dx -= POINT;
    }
}