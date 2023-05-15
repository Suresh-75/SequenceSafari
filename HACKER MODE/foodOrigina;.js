import { onSnake, expandSnake } from './functions.js'
const currentScore = document.querySelector(".currentScore");
const currentScoreDisplay = document.querySelector(".currentScoreDisplay");
const highScoreV = document.querySelector(".highScore");
const resetBtn = document.querySelector(".resetBtn");
let foodColors =
    // ["#533a71", "#decaff", "#68c8de"],
    // ["#bfc27c", "#c39f28", "#d96e26", "#ab2337"],
    ["#8b4e76", "#595179", "#26547c", "#559fa5", "#06d6a0"]


let score = 0;
// let food = randomFoodPosition();
let foods = [
    randomFoodPosition(),
    randomFoodPosition(),
    randomFoodPosition()
]

let expandSnakeSize = 1;
export function update() {
    // if (onSnake(foods)) {
    //     expandSnake(expandSnakeSize);
    //     food = randomFoodPosition();
    for (let i = 0; i < foods.length; i++) {
        if (onSnake(foods[i])) {
            expandSnake(expandSnakeSize);
            // foods[i] = randomFoodPosition();
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

// export function update() {
//     if (onSnake(food)) {
//         expandSnake(expandSnakeSize);
//         food = randomFoodPosition();
//         score += 5;
//         if (score > highScore) {
//             let highScoreValue = score;
//             localStorage.setItem("highScore", JSON.stringify(highScoreValue))
//             highScoreV.innerText = `${highScoreValue}`
//         }
//         updateScore();
//     }
// }

// export function draw(gameBoard) {
//     const foodElement = document.createElement("div");
//     foodElement.style.gridRowStart = food.y;
//     foodElement.style.gridColumnStart = food.x;
//     foodElement.classList.add("food");
//     gameBoard.appendChild(foodElement);
// }

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



// function randomFoodColor() {
//     let r = Math.floor(Math.random() * 255) + 1;
//     let g = Math.floor(Math.random() * 255) + 1;
//     let b = Math.floor(Math.random() * 255) + 1;
//     return `rgb(${r},${g},${b})`;
// }
// function randomFoodColorPicker() {
//     let i = Math.floor(Math.random() * foodColors.length);
//     let j = Math.floor(Math.random() * foodColors[i].length);
//     let foodColor = `${foodColors[i][j]}`
//     return foodColor;
// }




