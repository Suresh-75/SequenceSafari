import { getInputDirection } from './inputs.js'
export const snakeSpeed = 4;
let newSegments = 0;
let snakeBody = [
    { x: 11, y: 11 }
]

export function update() {
    expandSnakeSize();
    let inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}
export function draw(gameBoard) {

    snakeBody.forEach(segment => {
        if (segment.x === snakeBody[0].x && segment.y === snakeBody[0].y) {
            const snakeHead = document.createElement("div");
            snakeHead.style.gridRowStart = segment.y;
            snakeHead.style.gridColumnStart = segment.x;
            snakeHead.classList.add("snakeHead");
            gameBoard.appendChild(snakeHead);
        }
        if (!(segment.x === snakeBody[0].x && segment.y === snakeBody[0].y)) {
            const snakeElement = document.createElement("div");
            snakeElement.style.gridRowStart = segment.y;
            snakeElement.style.gridColumnStart = segment.x;
            snakeElement.classList.add("snake");
            gameBoard.appendChild(snakeElement);
        }
    })
}
export function onSnake(position) {
    return snakeBody[0].x === position.x && snakeBody[0].y === position.y;
    // return snakeBody.some(segment => {
    //     return segment.x === position.x && segment.y === position.y
    // })
}

export function expandSnake(expandSnakeSize) {
    newSegments += expandSnakeSize;
}

function expandSnakeSize() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }
    newSegments = 0;
}
export function getSnakeHead() {
    return snakeBody[0];
}
export function snakeIntersection() {
    for (let i = 1; i <= snakeBody.length - 1; i++) {
        if (snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y) {
            return true;
        }
    }
}