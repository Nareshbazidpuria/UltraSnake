function onloadf() {
    prelaoder = document.querySelector('.preloader');
    prelaoder.style.display = 'none'
}
if (screen.width > 600) {
    // constants and variables

    let inputDir = { x: 0, y: 0 };
    const playSound = new Audio('sounds/play.mp3');
    const turnSound = new Audio('sounds/turn.mp3');
    const eatSound = new Audio('sounds/eat.mp3');
    const gameOverSound = new Audio('sounds/gameOver.mp3');

    let speed = 2;
    let soundOnOff = 'On';
    let score = 0;
    let hiScore = localStorage.getItem('hiScore');
    lastPaintTime = 0;
    let snakeArr = [{ x: 1, y: 1 }];
    let food = { x: 7, y: 10 }

    playGame.addEventListener('click', startGame);
    plAgain.addEventListener('click', startGame);

    // Preloader function 


    function startGame() {

        if (soundOnOff === 'On') {
            playSound.play();
            playSound.addEventListener('ended', () => {
                playSound.play();
            })
        }
        goverSec.style.display = "none";
        home.style.display = "none";
        ground.style.display = "grid";
        scoreEle.style.display = "block";
        pressBtn.style.display = "block";
        settingSec.style.display = "block";
        hiScoreEle.style.display = "block";
        quit.style.display = "block";
        scoreEle.innerHTML = `Score : ${score}`;
        if (hiScore === null) {
            hiScoreEle.innerHTML = `High Score : 0`;
        }
        else {
            hiScoreEle.innerHTML = `High Score : ` + JSON.parse(hiScore);
        }


        // Game funcions
        function main(ctime) {
            window.requestAnimationFrame(main);
            if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
                return;
            }
            lastPaintTime = ctime;
            gameEngine();
        }

        function isCollide(snake) {
            // if you bump into yourself
            for (let i = 1; i < snake.length; i++) {
                if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                    return true;
                }
            }

            // if you bump into the wall
            if (snake[0].x >= 30 || snake[0].x <= 0 || snake[0].y >= 25 || snake[0].y <= 0) {
                return true;
            }
            // return false;
        }

        function gameEngine() {
            // updating the snake array and food
            if (isCollide(snakeArr)) {

                inputDir = { x: 0, y: 0 };
                if (soundOnOff === 'On') {
                    gameOverSound.play();
                    playSound.pause();
                }
                // Game Over  /////////////////////////////////////////////////////////////////////////////////////
                yourScore.innerHTML = `Your Score : ${score}`;
                goverSec.style.display = "block";
                setTimeout(() => {
                    snakeArr = [{ x: 1, y: 1 }];
                    score = 0;
                    scoreEle.innerHTML = `Score : ${score}`;
                }, 100);
                if (soundOnOff === 'On') {
                    playSound.play();
                }
            }

            //  if you have eaten the food
            if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
                snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
                score += 1;
                if (soundOnOff === 'On') {
                    eatSound.play();
                }
                if (hiScore === null) {
                    hiScore = score;
                    localStorage.setItem('hiScore', hiScore);
                }
                else if (score > JSON.parse(hiScore)) {
                    hiScore = score;
                    localStorage.setItem('hiScore', hiScore);
                }
                scoreEle.innerHTML = `Score : ${score}`;
                hiScoreEle.innerHTML = `High Score : ` + JSON.parse(hiScore);

                let a = 1;
                let b = 29;
                let c = 24;
                food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (c - a) * Math.random()) };
            }

            // moving the snake
            for (let i = snakeArr.length - 2; i >= 0; i--) {
                snakeArr[i + 1] = { ...snakeArr[i] }
            }
            snakeArr[0].x += inputDir.x;
            snakeArr[0].y += inputDir.y;


            // display snake and food
            // 1. snake
            ground.innerHTML = "";
            snakeArr.forEach((e, index) => {
                if (index === 0) {
                    snakeHeadElement = document.createElement('div');
                    snakeHeadElement.style.gridRowStart = e.y;
                    snakeHeadElement.style.gridColumnStart = e.x;
                    snakeHeadElement.innerHTML = `<div class="eye">'</div>
                                        <div class="eye">'</div>`;
                    snakeHeadElement.classList.add('snakeHead');
                    ground.appendChild(snakeHeadElement);
                }
                else if (index == snakeArr.length - 1) {
                    snakeTailElement = document.createElement('div');
                    snakeTailElement.style.gridRowStart = e.y;
                    snakeTailElement.style.gridColumnStart = e.x;
                    snakeTailElement.classList.add('tail');
                    ground.appendChild(snakeTailElement);
                }
                else {
                    snakeElement = document.createElement('div');
                    snakeElement.style.gridRowStart = e.y;
                    snakeElement.style.gridColumnStart = e.x;
                    snakeElement.classList.add('snake');
                    ground.appendChild(snakeElement);
                }
            })

            // 2. food
            foodElement = document.createElement('div');
            foodElement.style.gridRowStart = food.y;
            foodElement.style.gridColumnStart = food.x;
            foodElement.classList.add('food');
            ground.appendChild(foodElement);


        }


        // Main Logic of the game  /////////////////////////////////////////////////////////////////////////////////
        window.requestAnimationFrame(main);
        window.addEventListener('keydown', (e) => {
            pressBtn.style.display = "none";
            goverSec.style.display = "none";
            inputDir = { x: 0, y: 1 }   //start the game
            //play();
            switch (e.key) {
                case "ArrowUp":
                    inputDir.x = 0;
                    inputDir.y = -1;
                    if (soundOnOff === 'On') {
                        turnSound.play();
                    }
                    break;
                case "ArrowDown":
                    inputDir.x = 0;
                    inputDir.y = 1;
                    if (soundOnOff === 'On') {
                        turnSound.play();
                    }
                    break;
                case "ArrowLeft":
                    inputDir.x = -1;
                    inputDir.y = 0;
                    if (soundOnOff === 'On') {
                        turnSound.play();
                    }
                    break;
                case "ArrowRight":
                    inputDir.x = 1;
                    inputDir.y = 0;
                    if (soundOnOff === 'On') {
                        turnSound.play();
                    }
                    break;
                default:
                    break;
            }
        })

        quit.addEventListener('click', () => {
            location.reload();
        })
        secondQuit.addEventListener('click', () => {
            location.reload();
        })
    }

    //////////////  Settings   ///////////////////////

    settings.addEventListener('click', settingFunction);
    settingSec.addEventListener('click', settingFunction);

    function settingFunction() {
        setting.style.display = "block";

        level.addEventListener('click', () => {
            levelUl.style.display = "block";
            setting.style.display = "none";
            let levels = document.getElementsByClassName('levels');

            levels[0].addEventListener('click', () => {
                speed = 2;
                levelUl.style.display = "none";
            })
            levels[1].addEventListener('click', () => {
                speed = 7;
                levelUl.style.display = "none";
            })
            levels[2].addEventListener('click', () => {
                speed = 15;
                levelUl.style.display = "none";
            })
        })

        setting.addEventListener('mouseleave', () => {
            setting.style.display = "none";
        })

        sound.addEventListener('click', () => {
            soundUl.style.display = "block";
            setting.style.display = "none";

            soundOn.addEventListener('click', () => {
                soundOnOff = 'On';
                soundUl.style.display = "none";
            })
            soundOff.addEventListener('click', () => {
                soundOnOff = 'Off';
                soundUl.style.display = "none";
            })
        })
    }
}