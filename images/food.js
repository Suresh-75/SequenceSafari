import { onSnake, expandSnake } from './functions.js'
const currentScore = document.querySelector(".currentScore");
const currentScoreDisplay = document.querySelector(".currentScoreDisplay");
const highScoreV = document.querySelector(".highScore");
const resetBtn = document.querySelector(".resetBtn");
const foodBlocks = document.querySelector(".foodBlocks")

let foodColors = ["red", "blue", "purple"];




let score = 0;
let foods = [
    // { x: 10, y: 2 },
    // { x: 13, y: 5 },
    // { x: 14, y: 7 }
    randomFoodPosition(),
    randomFoodPosition(),
    randomFoodPosition()
]

let expandSnakeSize = 1;
export function update() {
    for (let i = 0; i < foods.length; i++) {
        if (onSnake(foods[i])) {
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
        foodElement.classList.add("food");
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

function addColorBlocks() {
    reversedFoodColors.forEach((foodColor) => {
        const foodColorBlock = document.createElement("div");
        foodColorBlock.classList.add("foodBlock");
        foodColorBlock.style.borderColor = foodColor;
        foodBlocks.appendChild(foodColorBlock);
    })
}
addColorBlocks();