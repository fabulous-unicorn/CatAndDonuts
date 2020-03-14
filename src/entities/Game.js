import { Player } from './Player';
import { Danger } from './Danger';
import { INTERVAL, POINT, GAME_STATES, DANGER_TYPE} from '../utils/constants';

export class Game {
    constructor({motionAudio, scoreAudio }) {
        this.player = new Player();

        this.timer = null;
        this.state = GAME_STATES.IN_MENU;

        const initialDangers = [new Danger(POINT * 1, POINT * 3, DANGER_TYPE.BLOCK),
            new Danger(POINT * 3, POINT * 1, DANGER_TYPE.BLOCK),
            new Danger(POINT * 5, POINT * 4, DANGER_TYPE.BLOCK),
            new Danger(POINT * 7, POINT * 3, DANGER_TYPE.BLOCK),
            new Danger(POINT * 9, POINT * 1, DANGER_TYPE.BLOCK),
            new Danger(POINT * 3, POINT * 2, DANGER_TYPE.SCORE_POINT),
            new Danger(POINT * 4, POINT * 3, DANGER_TYPE.SCORE_POINT),
            new Danger(POINT * 8, POINT * 4, DANGER_TYPE.SCORE_POINT)
        ];
        this.dangers = initialDangers;

        this.motionAudio = motionAudio;
        this.scoreAudio = scoreAudio;
    }

    start() {
        this.state = GAME_STATES.IN_PROGRESS;
        this.timer = setInterval(this.updateState, INTERVAL);
    }

    pause() {
        this.state = GAME_STATES.IN_PAUSE;
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    stop() {
        this.state = GAME_STATES.IN_MENU;
    }
    getCollision() {
       // const dangers = (type === DANGER_TYPE.BLOCK) ? this.dangers : this.donuts;
        const collision = this.dangers.find((danger) => {
            return (danger.dy === this.player.dy && danger.dx === this.player.dx)
        });
        return collision;
    }

    reactToCollision(collision) {
        switch (collision.type) {

        case DANGER_TYPE.BLOCK:
            this.player.subtractLive();
            break;
        case DANGER_TYPE.SCORE_POINT:
            this.player.addScore();
            // this.motionAudio.pause();
            // this.scoreAudio.pause();
            // this.scoreAudio.play();
            // this.dangers.remove
            break;
        default:
                break;
        }
    }

    updateState = () => {

        this.dangers.forEach((danger) => {
            danger.motion();
        });
        const removable = this.dangers.filter((danger) => {
            return danger.dx < 0;
        })
        removable.forEach((danger) => {
            this.generateDanger(danger.type);
        })
        this.dangers.splice(0, removable.length);
        console.log(this.dangers);
        const collision = this.getCollision();
        if (collision !== undefined) {
            this.reactToCollision(collision);
        }
        this.player.distance += 1;
    }

    generateDanger(type) {

        let rand = Math.random() * 5 - 0.5;
        let randomStroke =  Math.round(rand);
        // let rand = Math.random() * 5;
        // let randomStroke = Math.floor(rand)
        this.dangers.push(new Danger(POINT * 9, POINT * randomStroke, type));
    }


    handleKeyPress = ({ code }) => {
        switch (code) {
            case 'ArrowUp':
                this.player.moveUp();
                const collisionWithMoveUp = this.getCollision();
                if (collisionWithMoveUp !== undefined) {
                    this.reactToCollision(collisionWithMoveUp);
                }
                this.motionAudio.play();
                break;
            case 'ArrowDown':
                this.player.moveDown();
                const collisionWithMoveDown = this.getCollision();
                if (collisionWithMoveDown !== undefined) {
                    this.reactToCollision(collisionWithMoveDown);
                }
                this.motionAudio.play();
                break;
            case 'Space':
                if (this.state !== GAME_STATES.IN_MENU) {
                    this.togglePause();
                }
                break;
            default:
                // console.log(`tap ${e}  type: ${e.type} code: ${e.code}`);
                break;
        }
    }

    togglePause() {
        if (this.state === GAME_STATES.IN_PROGRESS) {
            this.pause();
        } else {
            this.start();
        }
    }

}