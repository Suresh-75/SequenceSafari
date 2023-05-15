import { onSnake, expandSnake } from './functions.js'
const currentScore = document.querySelector(".currentScore");
const currentScoreDisplay = document.querySelector(".currentScoreDisplay");
const highScoreV = document.querySelector(".highScore");
const resetBtn = document.querySelector(".resetBtn");
const foodBlocksHolder = document.querySelector(".foodBlocks")
const foodBlocks = document.querySelectorAll("#block")

let foodColors = ["red", "blue", "purple", "yellow"];

let foodSeq = [
    { color: 'yellow', sequence: 1 },
    { color: 'purple', sequence: 2 },
    { color: 'blue', sequence: 3 },
    { color: 'red', sequence: 4 }
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
            if (!foodOrderChecker(foods[i])) {
                //    isGameOver = true;
                //      return;
            }
            let seqNum = foodEaten(foods[i])
            console.log(seqNum)
            foodBlocks[seqNum - 1].classList.add("foodBlockOpaque");


            expandSnake(expandSnakeSize);
            foods.splice(i, 1);
            score += 5;
        }
    }
    if (score > highScore) {
        let highScoreValue = score;
        localStorage.setItem("highScore", JSON.stringify(highScoreValue))
        highScoreV.innerText = `${highScoreValue}`
    }
    updateScore();
}

export function draw(gameBoard) {
    for (let i = 0; i < foods.length; i++) {
        const foodElement = document.createElement("div");
        foodElement.style.gridRowStart = foods[i].y;
        foodElement.style.gridColumnStart = foods[i].x;
        foodElement.style.backgroundColor = foodColors[i];
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

let reversedFoodColors = foodColors.toReversed();

// function addColorBlocks() {
//     reversedFoodColors.forEach((foodColor) => {

//         foodColorBlock.classList.add("foodBlock");
//         foodColorBlock.style.backgroundColor = foodColor;
//         foodBlocks.appendChild(foodColorBlock);
//     })
// }
function addColorBlocks() {
    for (let i = 0; i < reversedFoodColors.length; i++) {
        foodBlocks[i].classList.add("foodBlock");
        foodBlocks[i].style.backgroundColor = reversedFoodColors[i];
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
    foodSeq[0].sequence
}