import { Game, Danger } from './src/entities';
import { POINT, DANGER_TYPE } from './src/utils/constants';
import {
    cat,
    background,
    bottom,
    donut,
} from './assets/img';

let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

const motionAudioSrc = require('./assets/sound/motion.mp3');
const scoreAudioSrc = require('./assets/sound/score.mp3');

//Audio
const motionAudio = new Audio(motionAudioSrc);
const scoreAudio = new Audio(scoreAudioSrc);

const catImage = new Image();
const backgroundImage = new Image();
const bottomImage = new Image();

catImage.src = cat;
backgroundImage.src = background;
bottomImage.src = bottom;

const gameSettings = {
    motionAudio,
    scoreAudio,
}

const game = new Game(gameSettings);
game.start();

function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, POINT * 5, POINT * 5);
    ctx.drawImage(backgroundImage, POINT * 5, 0, POINT * 5, POINT * 5);
    ctx.drawImage(bottomImage, 0, POINT * 5, POINT * 10, POINT * 1);
    ctx.drawImage(bottomImage, POINT * 5, POINT * 5, POINT * 5, POINT * 1);
}

function drawScore() {
    ctx.fillStyle = "#fff";
    ctx.font = "24px Verdana";
    ctx.fillText(`Пончики: ${game.player.score}`, POINT / 10, POINT * 5.4);
    ctx.fillText(`Расстояние: ${game.player.distance}`, POINT / 10, POINT * 5.7);
    ctx.fillText(`Жизни: ${game.player.lives}`, POINT * 5, POINT * 5.4);
}

function drawPlayer() {
    ctx.drawImage(catImage, game.player.dx, game.player.dy, game.player.dWidth, game.player.dHeight);
}

function drawDangers() {
    game.dangers.forEach((danger) => {
        ctx.drawImage(danger.image, danger.dx, danger.dy, danger.dWidth, danger.dHeight);
    })
}

function draw() {
    drawBackground();
    drawDangers();
    drawPlayer();
    drawScore();
    requestAnimationFrame(draw);
}

document.addEventListener("keydown", game.handleKeyPress);
bottomImage.onload = draw;
