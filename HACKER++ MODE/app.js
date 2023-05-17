import { draw as drawSnake, update as updateSnake, getSnakeHead as snakeHead, onSnake, expandSnake, snakeBody, onSnakeBody } from './functions.js'
import { getInputDirection } from './inputs.js'
// import { update as updateFood, draw as drawFood, getTimerText } from './food.js'

// import { getInputDirection } from './inputs.js';
const gameMusicBtn = document.querySelector(".gameMusic");
const modalUserInput = document.querySelector(".modalUserInput");
const gameBoard = document.querySelector(".gameBoard")
const closeBtn = document.querySelector(".closeBtn")
const livesSlider = document.querySelector(".livesSlider");
const gridSlider = document.querySelector(".gridSlider");
const timeSlider = document.querySelector(".timeSlider");
let valueTime = document.querySelector(".valueTime");
let valuelives = document.querySelector(".valuelives");
let valueGrid = document.querySelector(".valueGrid");
let gameMusic = new Audio("Musics/intense.mp3");
let gameOverMusic = new Audio("Musics/gameOver.mp3");
let explosionSound = new Audio("Musics/medium-explosion.mp3");
let healthPowerSound = new Audio("Musics/healthPower.mp3");
let speedPowerSound = new Audio("Musics/speedUp.mp3");
let failureMusic = new Audio("Musics/failure.mp3");
const startGame = document.querySelector(".startGame");
const modal = document.querySelector(".modal");
const playBtn = document.querySelector(".playBtn");
const settings = document.querySelector(".settings");
const settingsModal = document.querySelector(".settingsModal");
const resumeBtn = document.querySelector(".resumeBtn");
const loadGameBtn = document.querySelector(".loadGameBtn");

livesSlider.oninput = function () {
    valuelives.textContent = this.value;
}
gridSlider.oninput = function () {
    valueGrid.textContent = this.value;
}
timeSlider.oninput = function () {
    valueTime.textContent = this.value;
}
modalUserInput.showModal();

let userInputLives;
let userInputGrid;
let userInputTime;

startGame.addEventListener("click", gameEngine)


function gameEngine() {
    userInputLives = valuelives.textContent;
    userInputGrid = valueGrid.textContent;
    userInputTime = valueTime.textContent;
    let loadedValues = null;
    loadGameBtn.addEventListener("click", () => {
        loadedValues = JSON.parse(localStorage.getItem("savedValuesV"));
        valueLoader();
        // savedFoodPosition
        // savedFoodSeq
        // savedFoodBlocks
        for (let i = 0; i < snakeBody.length; i++) {
            snakeBody.pop();
        }
        for (let i = 0; i < loadedValues.savedSnakeBody.length; i++) {
            snakeBody.push(loadedValues.savedSnakeBody[i])
        }
    })

    function valueLoader() {
        userInputLives = loadedValues.savedLives;
        for (let i = 0; i < 5; i++) {
            lifeBox[i].classList.remove("life");
        }
        for (let i = 0; i < userInputLives; i++) {
            lifeBox[i].classList.add("life");
        }
        livesLeft = userInputLives;
        seconds = loadedValues.savedTime
        score = loadedValues.savedScore
        highScore2 = loadedValues.savedHighScore

    }
    modalUserInput.close();
    gameMusic.play();
    gameMusic.loop = true

    let snakeSpeed = 6;
    settings.addEventListener("click", () => {
        settingsModal.showModal();
    })
    resumeBtn.addEventListener("click", () => {
        settingsModal.close();
    })
    // speed increment
    setInterval(() => {
        snakeSpeed += 0.5;
    }, 10000)
    // musics
    function speedPowerUpFunction() {
        snakeSpeed += 2
        setTimeout(() => {
            snakeSpeed = 6.5
        }, 5000)
    }


    gameMusicBtn.addEventListener("click", playPause)
    let music = 1;
    function playPause() {
        if (music === 0) {
            music = 1;
            gameMusic.play();
            gameMusicBtn.style.backgroundImage = "url('images/speaker-filled-audio-tool.png')"
        }
        else {
            music = 0;
            gameMusic.pause();
            gameMusicBtn.style.backgroundImage = "url('images/mute.png')"
        }
    }
    //modal code
    playBtn.addEventListener("click", () => {
        modal.close();
        window.location = './'
    })
    //modal code
    let lastRenderedFrameTime = 0;
    let gameOver = false;
    function main(currentTime) {

        if (gameOver) {
            modal.showModal();
            gameMusic.pause();
            clearInterval(interval);
            interval = null;
            failureMusic.play();
            setTimeout(() => {
                gameOverMusic.play()
            }, 1500)
        }
        window.requestAnimationFrame(main);
        let frameRate = (currentTime - lastRenderedFrameTime) / 1000;
        if (frameRate < 1 / snakeSpeed) return;
        lastRenderedFrameTime = currentTime;
        update();
        draw();
    }
    window.requestAnimationFrame(main);
    function update() {
        updateSnake();
        updateFood();
        updatePowerUps()
        updateBombPosition();
        deathCheck();
    }
    function draw() {
        gameBoard.innerHTML = "";
        drawSnake(gameBoard);
        drawFood(gameBoard);
        drawPowerUps()
    }

    const lives = document.querySelector(".lives")
    // const life = document.querySelectorAll(".life")
    const lifeBox = document.querySelectorAll("#lifeBox")
    let initialLives = userInputLives;
    for (let i = 0; i < initialLives; i++) {
        lifeBox[i].classList.add("life");
    }
    function lifePowerUpFunction() {
        lifeBox[livesLeft].classList.add("life");
        livesLeft++;
    }
    function lifeDestructFunction() {
        lifeBox[livesLeft - 1].classList.remove("life");
        livesLeft--;
    }
    let livesLeft = initialLives;
    function checkLivesLeft() {
        let lifeLost = 0;
        let Over = outsideGrid(snakeHead()) || snakeIntersection();
        if (Over === true) {
            lifeBox[livesLeft - 1].classList.remove("life")
            lifeLost = 1;
        } else {
            lifeLost = 0;
        }
        livesLeft = (livesLeft - lifeLost);

        return livesLeft;
    }
    function snakeIntersection() {
        if (over2 === 1) {
            return false;
        } else if (over2 === 0) {
            for (let i = 1; i <= snakeBody.length - 1; i++) {
                if (snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y) {
                    return true;
                }
            }
        }

    }

    let gameOver1 = false;
    function deathCheck() {
        let livesLeft = checkLivesLeft();
        if (livesLeft <= 0) {
            gameOver1 = true;
        }
        gameOver = gameOver1 || getTimerText();
    }
    //lives left
    function outsideGrid(snakeHead) {
        if (snakeHead.x < 1 || snakeHead.y < 1 || snakeHead.x > userInputGrid || snakeHead.y > userInputGrid) {
            return true;
        }
    }
    gameBoard.style.gridTemplateColumns = `repeat(${userInputGrid},1fr)`
    gameBoard.style.gridTemplateRows = `repeat(${userInputGrid},1fr)`;



    //food js



    // import { userInputTime } from './app.js'
    let words = ["SHOT", "BOX", "WICK", "FOX", "CLEAN", "SNAKE", "BRICK", "SLICE", "GRAPE", "ROUGH", "QUICK", "AGILE", "STERN", "WEB", "GAMES", "AXON", "SAVE", "DEAL", "CARD", "DROP", "TAIL", "EASY", "FAST", "NEAR", "DARK", "GAIN", "PAST", "HOPE", "FILM", "MEOW", "FIRM", "DOWN", "ZAP", "DOG", "TRICHY", "PENCIL", "JOHN"];
    let previousNum = 0;
    let randomNum = 0;
    function randomWordGenerator() {
        while (previousNum === randomNum) {
            randomNum = Math.floor(Math.random() * 37) + 1;
        }
        previousNum = randomNum;
        let randomWord = words[randomNum - 1];
        return randomWord;
    }

    const currentScore = document.querySelector(".currentScore");
    const currentScoreDisplay = document.querySelector(".currentScoreDisplay");
    const highScoreV = document.querySelector(".highScore");
    const resetBtn = document.querySelector(".resetBtn");
    const foodBlocksHolder = document.querySelector(".foodBlocks")
    const foodBlocks = document.querySelectorAll("#block")
    const yayMusic = new Audio("Musics/consume2.wav")

    let foodSeq = [
        // { letter: "G", sequence: 4 },
        // { letter: "N", sequence: 3 },
        // { letter: "I", sequence: 2 },
        // { letter: "K", sequence: 1 }
    ]
    let score = 0;
    let foods = [
        // { ...randomFoodPosition(), sequence: 4 },
        // { ...randomFoodPosition(), sequence: 3 },
        // { ...randomFoodPosition(), sequence: 2 },
        // { ...randomFoodPosition(), sequence: 1 }
    ]
    let randomWord = randomWordGenerator();
    for (let i = 0; i < randomWord.length; i++) {
        foodSeq.unshift(
            { letter: randomWord[i], sequence: i + 1 }
        )
    }
    for (let i = 0; i < randomWord.length; i++) {
        foods.unshift(
            { ...randomFoodPosition(), sequence: i + 1 }
        )
    }
    let expandSnakeSize = 1;
    function updateFood() {
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
        if (score > highScore2) {
            let highScoreValue = score;
            localStorage.setItem("highScore2", JSON.stringify(highScoreValue))
            highScoreV.innerText = `${highScoreValue}`
        }
        updateScore();
        if (foodSeq.length === 0) {
            seconds += 6;
            yayMusic.play();
            let randomWord = randomWordGenerator();
            for (let i = 0; i < 6; i++) {
                foodBlocks[i].classList.remove("foodBlock");
                foodBlocks[i].classList.remove("foodBlockOpaque");
                foodBlocks[i].innerText = "";
            }
            for (let i = 0; i < randomWord.length; i++) {
                foods.unshift({ ...randomFoodPosition(), sequence: i + 1 })
                foodSeq.unshift({
                    letter: randomWord[i], sequence: i + 1
                })
            }
            changeFoodBlocks();
        }
    }
    function changeFoodBlocks() {
        let reversedFoodColors = foodSeq.toReversed();
        for (let i = 0; i < reversedFoodColors.length; i++) {
            foodBlocks[i].classList.add("foodBlock");
            foodBlocks[i].innerText = reversedFoodColors[i].letter;
            foodBlocksHolder.appendChild(foodBlocks[i]);
        }
    }
    function drawFood(gameBoard) {
        for (let i = 0; i < foods.length; i++) {
            const foodElement = document.createElement("div");
            foodElement.style.gridRowStart = foods[i].y;
            foodElement.style.gridColumnStart = foods[i].x;
            foodElement.classList.add("food");
            foodElement.innerText = foodSeq[i].letter;
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
        let xPos = Math.floor(Math.random() * userInputGrid) + 1;
        let yPos = Math.floor(Math.random() * userInputGrid) + 1;
        let randomGridPosition = { x: xPos, y: yPos };
        return randomGridPosition;
    }

    //score update

    let highScore2 = localStorage.getItem("highScore2");
    if (highScore2 === null) {
        let highScoreValue = 0;
        localStorage.setItem("highScore2", JSON.stringify(highScoreValue))
    } else {
        highScoreV.innerText = `${highScore2}`
    }

    resetBtn.addEventListener("click", () => {
        localStorage.removeItem("highScore2")
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
            foodBlocks[i].innerText = reversedFoodColors[i].letter;
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
    // function randomColorGen() {
    //     let r = Math.floor(Math.random() * 255) + 1;
    //     let g = Math.floor(Math.random() * 255) + 1;
    //     let b = Math.floor(Math.random() * 255) + 1;
    //     let randomColor = `rgb(${r},${g},${b})`
    //     let previousColor = randomColor;
    //     return randomColor;
    // }

    //time

    let seconds = 60 * userInputTime;
    const time = document.querySelector(".time");
    let interval = null;
    window.addEventListener("keydown", () => {
        if (interval) {
            return;
        }
        interval = setInterval(timer, 1000);
    }
    )
    function timer() {
        addSeconds()

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
    function getTimerText() {
        if (seconds <= 0) {
            seconds = 0;
            clearInterval(interval);
            interval = null;
            return true;
        } if (time.innerText === "00:00") {
            seconds = 0;
            clearInterval(interval);
            interval = null;
            return true;
        }
    }
    let addedSeconds = 1;
    function addSeconds() {
        seconds -= addedSeconds;
    }
    let inputBombDirection = { x: 0, y: 0 }
    settings.addEventListener("click", PauseMusic)
    let pause = 0;
    let over2 = 0;
    function PauseMusic() {
        if (pause === 0) {
            pause = 1;
            changeGameOver();
            addedSeconds = 0;
        }
    }


    resumeBtn.addEventListener("click", playMusic)
    function playMusic() {
        if (pause === 1) {
            pause = 0;
            addedSeconds = 1;
            changeGameOverN();
        }
    }

    function changeGameOver() {
        if (over2 === 0) {
            over2 = 1;
        }
    }
    function changeGameOverN() {
        setTimeout(() => {
            if (over2 === 1) {
                over2 = 0;
            }
        }, 12000)
    }

    // random words
    function randomLetterGenerator() {
        let randomWord = randomWordGenerator();
        for (let i = 0; i < randomWord.length; i++) {
            foodSeq.push({
                letter: randomWord[i], sequence: i + 1
            })
            return randomWord;
        }
    }

    // powerups
    let lifePowerUps = [
        { ...getRandomGridPosition() },
    ];
    let speedPowerUps = [
        { ...getRandomGridPosition() },
    ];
    let bombObstacle = [
        { ...getRandomGridPosition() },
    ]
    let portals = [
        { ...getRandomPortalGridPosition() },
        { ...getRandomPortalGridPosition() }
    ]
    function getRandomPortalGridPosition() {
        let xPos = Math.floor(Math.random() * (userInputGrid - 5)) + 3;
        let yPos = Math.floor(Math.random() * (userInputGrid - 5)) + 3;
        let randomGridPosition = { x: xPos, y: yPos };
        return randomGridPosition;
    }
    function updatePowerUps() {
        for (let i = 0; i < lifePowerUps.length; i++) {
            if (onSnake(lifePowerUps[i])) {
                if (livesLeft < 5) {
                    healthPowerSound.play()
                    lifePowerUpFunction();
                    lifePowerUps.splice(i, 1);
                } if (lifePowerUps.length === 0) {
                    setTimeout(() => {
                        lifePowerUps.unshift(
                            { ...getRandomGridPosition() }
                        )
                    }, 25000)
                }
            }
        }
        for (let i = 0; i < speedPowerUps.length; i++) {
            if (onSnake(speedPowerUps[i])) {
                speedPowerSound.play();
                speedPowerUps.splice(i, 1)
                speedPowerUpFunction();
            }
            if (speedPowerUps.length === 0) {
                setTimeout(() => {
                    speedPowerUps.unshift(
                        { ...getRandomGridPosition() }
                    )
                }, 25000)
            }
        }
        for (let i = 0; i < bombObstacle.length; i++) {
            if (onSnakeBody(bombObstacle[i])) {
                explosionSound.play();
                bombObstacle.splice(i, 1)
                lifeDestructFunction();
            }
            if (bombObstacle.length === 0) {
                setTimeout(() => {
                    bombObstacle.unshift(
                        { ...getRandomGridPosition() }
                    )
                }, 5000)
            }
        }

        if (onSnake(portals[0])) {
            let inputDir = getInputDirection()
            snakeBody[0].x = portals[1].x + inputDir.x;
            snakeBody[0].y = portals[1].y + inputDir.y;
        }
        if (onSnake(portals[1])) {
            let inputDir = getInputDirection()
            snakeBody[0].x = portals[0].x + inputDir.x;
            snakeBody[0].y = portals[0].y + inputDir.y;
        }
    }
    function updateBombPosition() {
        if (bombObstacle.length === 0) return;
        let inputBombDirection = getInputBombDirection();
        // for (let i = bombObstacle.length - 2; i >= 0; i--) {
        //     bombObstacle[i + 1] = { ...bombObstacle[i] };
        // }
        bombObstacle[0].x += inputBombDirection.x;
        bombObstacle[0].y += inputBombDirection.y;

        // bombObstacle[0].x += 1;
        // bombObstacle[0].y += 0;
    }
    function drawPowerUps() {
        for (let i = 0; i < lifePowerUps.length; i++) {
            const power = document.createElement("div");
            power.style.gridRowStart = lifePowerUps[i].y;
            power.style.gridColumnStart = lifePowerUps[i].x;
            power.classList.add("lifePower");
            // setInterval(() => {
            //     power.classList.add("Scale");
            // }, 100)
            gameBoard.append(power);
        }
        for (let i = 0; i < speedPowerUps.length; i++) {
            const power = document.createElement("div");
            power.style.gridRowStart = speedPowerUps[i].y;
            power.style.gridColumnStart = speedPowerUps[i].x;
            power.classList.add("speedPower");
            gameBoard.append(power);
        }
        for (let i = 0; i < bombObstacle.length; i++) {
            const obstacle = document.createElement("div");
            obstacle.style.gridRowStart = bombObstacle[i].y;
            obstacle.style.gridColumnStart = bombObstacle[i].x;
            obstacle.classList.add("bomb");
            gameBoard.append(obstacle);
        }
        for (let i = 0; i < portals.length; i++) {
            const portal = document.createElement("div");
            portal.style.gridRowStart = portals[i].y;
            portal.style.gridColumnStart = portals[i].x;
            portal.classList.add("portal");
            gameBoard.append(portal);
        }

    }

    function getInputBombDirection() {
        if ((4 <= bombObstacle[0].x <= (userInputGrid - 3)) && inputBombDirection.x === 0) {
            inputBombDirection = { x: 1, y: 0 };
        }
        // if (3 <= bombObstacle[0].y <= (userInputGrid)) {
        //     inputBombDirection = { x: 0, y: -1 };
        // }
        if (bombObstacle[0].x > (userInputGrid - 3)) {
            inputBombDirection = { x: -1, y: 0 };
        }
        if (bombObstacle[0].x < 4 && inputBombDirection.x === -1) {
            inputBombDirection = { x: 1, y: 0 };
        }
        return inputBombDirection;
    }


    const saveGameBtn = document.querySelector(".saveGameBtn")

    saveGameBtn.addEventListener("click", () => {
        let savedLives = livesLeft;
        let savedTime = seconds;
        let savedScore = score;
        let savedHighScore = highScore2;
        let savedSnakeBody = snakeBody;
        let savedFoodPosition = foods;
        let savedFoodSeq = foodSeq;
        let savedFoodBlocks = foodBlocks;
        let savedValues = { savedLives, savedTime, savedScore, savedHighScore, savedSnakeBody, savedFoodPosition, savedFoodSeq, savedFoodBlocks }
        localStorage.setItem("savedValuesV", JSON.stringify(savedValues));
        saveGameBtn.classList.add("disabled");
    })
}


// timer
// const time = document.querySelector(".time");
// let interval = null;
// window.addEventListener("keydown", () => {
//     if (interval) {
//         return;
//     }
//     interval = setInterval(timer, 1000);
// }
// )
// function timer() {
//     seconds--;
//     let mins = Math.floor((seconds) / 60);
//     let secs = (seconds - (mins * 60)) % 60;
//     if (secs < 10) {
//         secs = "0" + secs;
//     }
//     if (mins < 10) {
//         mins = "0" + mins;
//     }
//     time.innerText = `${mins}:${secs}`;
// }
// function getTimerText() {
//     if (time.innerText === "00:00") {
//         return true;
//     }
// }

