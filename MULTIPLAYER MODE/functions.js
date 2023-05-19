import { getInputDirection, getInputDirection2 } from './inputs.js'
let newSegments = 0;
let newSegments2 = 0;
export let snakeBody = [
    { x: 11, y: 11 }
]
export let snakeBody2 = [
    { x: 18, y: 20 }
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
export function update2() {
    expandSnakeSize2();
    let inputDirection2 = getInputDirection2();
    for (let i = snakeBody2.length - 2; i >= 0; i--) {
        snakeBody2[i + 1] = { ...snakeBody2[i] };
    }
    snakeBody2[0].x += inputDirection2.x;
    snakeBody2[0].y += inputDirection2.y;
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
export function draw2(gameBoard) {
    snakeBody2.forEach(segment => {
        if (segment.x === snakeBody2[0].x && segment.y === snakeBody2[0].y) {
            const snakeHead = document.createElement("div");
            snakeHead.style.gridRowStart = segment.y;
            snakeHead.style.gridColumnStart = segment.x;
            snakeHead.classList.add("snakeHead2");
            gameBoard.appendChild(snakeHead);
        }
        if (!(segment.x === snakeBody2[0].x && segment.y === snakeBody2[0].y)) {
            const snakeElement = document.createElement("div");
            snakeElement.style.gridRowStart = segment.y;
            snakeElement.style.gridColumnStart = segment.x;
            snakeElement.classList.add("snake2");
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
export function onSnake2(position) {
    return snakeBody2[0].x === position.x && snakeBody2[0].y === position.y;
    // return snakeBody.some(segment => {
    //     return segment.x === position.x && segment.y === position.y
    // })
}
export function expandSnake(expandSnakeSize) {
    newSegments += expandSnakeSize;
}
export function expandSnake2(expandSnakeSize) {
    newSegments2 += expandSnakeSize;
}
export function onSnakeBody(position) {
    return snakeBody.some(segment => {
        return segment.x === position.x && segment.y === position.y
    })
}
export function onSnakeBody2(position) {
    return snakeBody2.some(segment => {
        return segment.x === position.x && segment.y === position.y
    })
}
function expandSnakeSize() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }
    newSegments = 0;
}

function expandSnakeSize2() {
    for (let i = 0; i < newSegments2; i++) {
        snakeBody2.push({ ...snakeBody2[snakeBody2.length - 1] })
    }
    newSegments2 = 0;
}



export function getSnakeHead() {
    return snakeBody[0];
}
export function getSnakeHead2() {
    return snakeBody2[0];
}