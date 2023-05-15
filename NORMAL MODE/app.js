import { draw as drawSnake, update as updateSnake, snakeSpeed as snakeSpeed, getSnakeHead as snakeHead, snakeIntersection } from './functions.js'
import { update as updateFood, draw as drawFood, getTimerText } from './food.js'
import { outsideGrid } from './grid.js'
const gameMusicBtn = document.querySelector(".gameMusic");

// musics

let gameMusic = new Audio("Musics/gameloop.mp3");
let gameOverMusic = new Audio("Musics/gameOver.mp3")
let failureMusic = new Audio("Musics/failure.mp3")


gameMusicBtn.addEventListener("click", playPause)
let music = 1;
function playPause() {
    if (music === 0) {
        music = 1;
        gameMusic.play();
        gameMusicBtn.style.backgroundImage = "url('images/speaker-filled-audio-tool.png')"
    }
    else {
        music = 0;
        gameMusic.pause();
        gameMusicBtn.style.backgroundImage = "url('images/mute-removebg-preview.png')"
    }
}

//modal code
const modal = document.querySelector(".modal");
const playBtn = document.querySelector(".playBtn");

playBtn.addEventListener("click", () => {
    modal.close();
    window.location = './'
})
//modal code

gameMusic.play();
gameMusic.loop = true

const gameBoard = document.querySelector(".gameBoard")


let lastRenderedFrameTime = 0;
let gameOver = false;

function main(currentTime) {

    if (gameOver) {
        modal.showModal();
        gameMusic.pause();
        failureMusic.play();
        setTimeout(() => {
            gameOverMusic.play()
        }, 1500)
    }
    window.requestAnimationFrame(main);
    let frameRate = (currentTime - lastRenderedFrameTime) / 1000;
    if (frameRate < 1 / snakeSpeed) return;
    lastRenderedFrameTime = currentTime;
    update();
    draw();
}
window.requestAnimationFrame(main);
function update() {
    updateSnake();
    updateFood();
    deathCheck();
}
function draw() {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
}
function deathCheck() {
    gameOver = outsideGrid(snakeHead()) || snakeIntersection() || getTimerText();
}

// timer
// const time = document.querySelector(".time");
// let interval = null;
// window.addEventListener("keydown", () => {
//     if (interval) {
//         return;
//     }
//     interval = setInterval(timer, 1000);
// }
// )
// function timer() {
//     seconds--;
//     let mins = Math.floor((seconds) / 60);
//     let secs = (seconds - (mins * 60)) % 60;
//     if (secs < 10) {
//         secs = "0" + secs;
//     }
//     if (mins < 10) {
//         mins = "0" + mins;
//     }
//     time.innerText = `${mins}:${secs}`;
// }
// function getTimerText() {
//     if (time.innerText === "00:00") {
//         return true;
//     }
// }