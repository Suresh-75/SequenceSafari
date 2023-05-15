import { onSnake, expandSnake } from './functions.js'
const currentScore = document.querySelector(".currentScore");
const currentScoreDisplay = document.querySelector(".currentScoreDisplay");
const highScoreV = document.querySelector(".highScore");
const resetBtn = document.querySelector(".resetBtn");
const foodBlocksHolder = document.querySelector(".foodBlocks")
const foodBlocks = document.querySelectorAll("#block")
const yayMusic = new Audio("Musics/yay.mp3")

let foodSeq = [
    { color: randomColorGen(), sequence: 4 },
    { color: randomColorGen(), sequence: 3 },
    { color: randomColorGen(), sequence: 2 },
    { color: randomColorGen(), sequence: 1 }
]

let score = 0;
let foods = [
    { ...randomFoodPosition(), sequence: 4 },
    { ...randomFoodPosition(), sequence: 3 },
    { ...randomFoodPosition(), sequence: 2 },
    { ...randomFoodPosition(), sequence: 1 }
]
export let isGameOver = false;
let expandSnakeSize = 1;
export function update() {
    for (let i = 0; i < foods.length; i++) {
        if (onSnake(foods[i])) {
            if (foodOrderChecker(foods[i])) {
                let seqNum = foodEaten(foods[i])
                foodBlocks[seqNum - 1].classList.add("foodBlockOpaque");
                expandSnake(expandSnakeSize);
                foods.splice(i, 1);
                score += 10;
            }
        }
    }
    if (score > highScore) {
        let highScoreValue = score;
        localStorage.setItem("highScore", JSON.stringify(highScoreValue))
        highScoreV.innerText = `${highScoreValue}`
    }
    updateScore();
    if (foodSeq.length === 0) {
        seconds += 6;
        yayMusic.play();
        removeOpacity();
        for (let i = 1; i <= 4; i++) {
            foodSeq.unshift({ color: randomColorGen(), sequence: `${i}` })
            foods.unshift({ ...randomFoodPosition(), sequence: `${i}` })
        }
        changeFoodBlocks();
    }
}
function removeOpacity() {
    for (let i = 0; i < 4; i++) {
        foodBlocks[i].classList.remove("foodBlockOpaque")
    }
}
function changeFoodBlocks() {
    let reversedFoodColors = foodSeq.toReversed();
    for (let i = 0; i < reversedFoodColors.length; i++) {
        foodBlocks[i].style.backgroundColor = reversedFoodColors[i].color;
        foodBlocksHolder.appendChild(foodBlocks[i]);
    }
}

export function draw(gameBoard) {
    for (let i = 0; i < foods.length; i++) {
        const foodElement = document.createElement("div");
        foodElement.style.gridRowStart = foods[i].y;
        foodElement.style.gridColumnStart = foods[i].x;
        foodElement.classList.add("food")
        foodElement.style.backgroundColor = foodSeq[i].color;
        gameBoard.appendChild(foodElement);
    }
}

function randomFoodPosition() {
    let foodPosition;
    while (foodPosition == null || onSnake(foodPosition)) {
        foodPosition = getRandomGridPosition();
    }
    return foodPosition;
}
function getRandomGridPosition() {
    let xPos = Math.floor(Math.random() * 21) + 1;
    let yPos = Math.floor(Math.random() * 21) + 1;
    let randomGridPosition = { x: xPos, y: yPos };
    return randomGridPosition;
}

//score update

let highScore = localStorage.getItem("highScore");
if (highScore === null) {
    let highScoreValue = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreValue))
} else {
    highScoreV.innerText = `${highScore}`
}

resetBtn.addEventListener("click", () => {
    localStorage.removeItem("highScore")
    highScoreV.innerText = `0`
    window.location = './'
})
function updateScore() {
    currentScore.innerText = `${score}`;
    currentScoreDisplay.innerText = `${score}`;
}

// FoodBlocks



// function addColorBlocks() {
//     reversedFoodColors.forEach((foodColor) => {

//         foodColorBlock.classList.add("foodBlock");
//         foodColorBlock.style.backgroundColor = foodColor;
//         foodBlocks.appendChild(foodColorBlock);
//     })
// }
function addColorBlocks() {
    let reversedFoodColors = foodSeq.toReversed();
    for (let i = 0; i < reversedFoodColors.length; i++) {
        foodBlocks[i].classList.add("foodBlock");
        foodBlocks[i].style.backgroundColor = reversedFoodColors[i].color;
        foodBlocksHolder.appendChild(foodBlocks[i]);
    }
}
addColorBlocks();

function foodEaten(i) {
    let seqNumber = i.sequence;
    return seqNumber;
}
// food Order checker


function foodOrderChecker(i) {
    let seqNumber = i.sequence;
    if (foodSeq[foodSeq.length - 1].sequence === seqNumber) {
        foodSeq.pop();
        return true;
    }
}
//  Random Color Generator
function randomColorGen() {
    let r = Math.floor(Math.random() * 255) + 1;
    let g = Math.floor(Math.random() * 255) + 1;
    let b = Math.floor(Math.random() * 255) + 1;
    let randomColor = `rgb(${r},${g},${b})`
    let previousColor = randomColor;
    return randomColor;
}

//time
let seconds = 60;
const time = document.querySelector(".time");
export let interval = null;
window.addEventListener("keydown", () => {
    if (interval) {
        return;
    }
    interval = setInterval(timer, 1000);
}
)
function timer() {
    seconds--;
    let mins = Math.floor((seconds) / 60);
    let secs = (seconds - (mins * 60)) % 60;
    if (secs < 10) {
        secs = "0" + secs;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    time.innerText = `${mins}:${secs}`;
}
export function getTimerText() {
    if (seconds <= 0) {
        clearInterval(interval);
        seconds = 0;
        interval = null;
        return true;
    }
}
