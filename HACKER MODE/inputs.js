const pauseBtn = document.querySelector(".pauseBtn")
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

pauseBtn.addEventListener("click", playPause)
let pause = 1;
function playPause() {
    if (pause === 0) {
        pause = 1;
        inputDirection = { x: 0, y: 0 };
        window.removeEventListener("keydown", userInputs)
        pauseBtn.style.backgroundImage = "url('images/icons8-play-30.png')"
    }
    else {
        pause = 0;
        window.addEventListener("keydown", userInputs)
        pauseBtn.style.backgroundImage = "url('images/pause.png')"
    }
}


window.addEventListener("keydown", userInputs)
function userInputs(e) {

    switch (e.key) {
        case 'ArrowUp':
            if (lastInputDirection.y !== 0) return;
            inputDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (lastInputDirection.y !== 0) return;
            inputDirection = { x: 0, y: 1 };
            break;
        case 'ArrowRight':
            if (lastInputDirection.x !== 0) return;
            inputDirection = { x: 1, y: 0 };
            break;
        case 'ArrowLeft':
            if (lastInputDirection.x !== 0) return;
            inputDirection = { x: -1, y: 0 };
            break;
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

    }
}
export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}

