const settings = document.querySelector(".settings")
const resumeBtn = document.querySelector(".resumeBtn");
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

settings.addEventListener("click", playPause)
let pause = 0;
function playPause() {
    if (pause === 0) {
        pause = 1;
        inputDirection = { x: 0, y: 0 };
        window.removeEventListener("keydown", userInputs)
    }

}
resumeBtn.addEventListener("click", () => {
    if (pause === 1) {
        pause = 0;
        window.addEventListener("keydown", userInputs)
    }
})
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

