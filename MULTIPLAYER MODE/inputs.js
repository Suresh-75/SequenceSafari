const settings = document.querySelector(".settings")
const resumeBtn = document.querySelector(".resumeBtn");
let inputDirection = { x: 0, y: 0 };
let inputDirection2 = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };
let lastInputDirection2 = { x: 0, y: 0 };

settings.addEventListener("click", playPause)

let pause = 0;
function playPause() {
    if (pause === 0) {
        pause = 1;
        inputDirection = { x: 0, y: 0 };
        inputDirection2 = { x: 0, y: 0 };
        window.removeEventListener("keydown", userInputs)
        window.removeEventListener("touchstart", startTouch)
        window.removeEventListener("touchmove", moveTouch)
    }
}
resumeBtn.addEventListener("click", () => {
    if (pause === 1) {
        pause = 0;
        window.addEventListener("keydown", userInputs)
    }
})
resumeBtn.addEventListener("keydown", (e) => {
    if (pause === 1 && e.whcih === 27) {
        pause = 0;
        window.addEventListener("keydown", userInputs)
    }
})


window.addEventListener("touchStart", (e) => {
    e.preventDefault();
    let touch = e.touches[0]
    if (e.touches.length === 1) {
        inputDirection = { x: touch.pageX, y: touch.pageY }
    }
})

window.addEventListener("keydown", userInputs)

function userInputs(e) {
    switch (e.key) {
        case 'w':
            if (lastInputDirection.y !== 0) return;
            inputDirection = { x: 0, y: -1 };
            break;
        case 's':
            if (lastInputDirection.y !== 0) return;
            inputDirection = { x: 0, y: 1 };
            break;
        case 'd':
            if (lastInputDirection.x !== 0) return;
            inputDirection = { x: 1, y: 0 };
            break;
        case 'a':
            if (lastInputDirection.x !== 0) return;
            inputDirection = { x: -1, y: 0 };
            break;
        case 'ArrowUp':
            if (lastInputDirection2.y !== 0) return;
            inputDirection2 = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (lastInputDirection2.y !== 0) return;
            inputDirection2 = { x: 0, y: 1 };
            break;
        case 'ArrowRight':
            if (lastInputDirection2.x !== 0) return;
            inputDirection2 = { x: 1, y: 0 };
            break;
        case 'ArrowLeft':
            if (lastInputDirection2.x !== 0) return;
            inputDirection2 = { x: -1, y: 0 };
            break;
    }
}

window.addEventListener("touchstart", startTouch);
window.addEventListener("touchmove", moveTouch);

let initialX = null;
let initialY = null;
function startTouch(e) {
    initialX = e.changedTouches[0].pageX;
    initialY = e.changedTouches[0].pageY;
}

function moveTouch(e) {
    if (initialX === null && initialY === null) return;
    let dirX = e.changedTouches[0].pageX - initialX;
    let dirY = e.changedTouches[0].pageY - initialY;
    if (Math.abs(dirX) > Math.abs(dirY)) {
        if (dirX > 0) {
            if (lastInputDirection.x !== 0) return;
            inputDirection = { x: 1, y: 0 };
        }
        else {
            //swipe left
            if (lastInputDirection.x !== 0) return;
            inputDirection = { x: -1, y: 0 };
        }
    } else {
        if (dirY < 0) {
            //up
            if (lastInputDirection.y !== 0) return;
            inputDirection = { x: 0, y: -1 };
        } else {
            //down
            if (lastInputDirection.y !== 0) return;
            inputDirection = { x: 0, y: 1 };
        }
    }
}

export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}

export function getInputDirection2() {
    lastInputDirection2 = inputDirection2;
    return inputDirection2;
}

