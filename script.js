let scoreH2 = document.getElementById('score');
let timeLeftH2 = document.getElementById('timeLeft');
let startNewGameButton = document.getElementById('startNewGame');
let pauseGameButton = document.getElementById('pauseGame');
let sqaures = document.querySelectorAll('.square');
let gameMusic = new Audio('gameMusic.mp3');
let hitMusic = new Audio('hitMusic.mp3');
let score = 0;
let timeLeft = 60;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;
// let grid = document.getElementByClassName('grid')[0];




function randomMole() {
   sqaures.forEach(sqaure => {                    // forEach will run the element for each grid

    sqaure.classList.remove('mole');
   }) 

let randomSqaure = sqaures[Math.floor(Math.random()*sqaures.length)];
randomSqaure.classList.add('mole');
hitPosition = randomSqaure.id;       
}

function countDown(){
    timeLeft--;
    timeLeftH2.innerHTML = `Time Left ${timeLeft}`;
    
    if(timeLeft === 0){
        clearInterval(timerId);
        clearInterval(randomMoleId);
        grid.style.display = 'none';
    }
}
randomMole();

function startGame() {
    score = 0;
    timeLeft = 60;
    scoreH2.innerHTML = 'Your Score: 0';
    timeLeft.innerHTML = 'Time Left: 60';
    // grid.style.display = 'flex';
    pauseGameButton.style.display ='inline-block';
    pauseGameButton.innerHTML = 'Pause';
    gameMusic.play();
    timerId = setInterval(randomMole, 1000);
    randomMoleId = setInterval(countDown, 1000);

}

function pauseResumeGame(){
    if(pauseGameButton.textContent === 'Pause'){
        gameMusic.pause();
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId = null;
        randomMoleId = null;
        pauseGameButton.textContent = 'Resume';
    }else{
        gameMusic.play();
        timerId = setInterval(randomMole, 1000);
        randomMoleId = setInterval(countDown, 1000);
        pauseGameButton.textContent = 'Pause';

    }

}

sqaures.forEach(sqaure => {
       sqaure.addEventListener('mousedown', () => {
       if(timerId !== null){
        if(sqaure.id === hitPosition){
            hitMusic.play();
            setTimeout(() => {hitMusic.pause()}, 1000);
            score++;
            scoreH2.innerHTML = `Your Score: ${score}`;
            hitPosition = null;
        }

        }

       })

})




startNewGameButton.addEventListener('click',startGame);
pauseGameButton.addEventListener('click',pauseResumeGame);






