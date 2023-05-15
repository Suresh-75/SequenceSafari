export function outsideGrid(snakeHead) {
    if (snakeHead.x < 1 || snakeHead.y < 1 || snakeHead.x > 21 || snakeHead.y > 21) {
        return true;
    }
}