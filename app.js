const ul = document.createElement("ul");
const header = document.querySelector("header");
const startButton = document.querySelector(".start")
const loginBtn = document.querySelector(".login");
const pointsScored = document.querySelector(".pointsScored span");
const pointsMissed = document.querySelector(".pointsMissed span");
const currentPlayer = document.querySelector(".currentPlayer");
const musicButton = document.querySelector(".music")
const player = document.querySelector("#uName");
const icon = document.querySelector(".fa-volume-up")
const fullGameTrack = document.createElement("audio");
header.parentNode.insertBefore(ul, header.nextSibling);
ul.parentNode.insertBefore(fullGameTrack, ul.nextSibling);
fullGameTrack.src = "./sounds/full-game-track.wav";
fullGameTrack.loop = true;
ul.style.width = "70vw";
ul.style.margin = "auto";

let missed = 0;
let scored = 0;
let scoredCounter = 0;
let result = 0;
let resultArr = [];
let circles;
let speed;
let circlesNumber = 5;
let endTimer = 0;
let playerName;
let best = 0;
let difference = 0;
let btn_text;
let playerBase = [];


//LISTENERS
// Game Logic Method
ul.addEventListener("click", function (e) {
  const missedSound = new Audio();
  const scoredSound = new Audio();
  scoredSound.src = "./sounds/cleaning-spray.flac"
  missedSound.src = "./sounds/missed-sound.wav"
  if (e.target.classList.value === document.querySelector("li.circleStyle").classList.value) {
    e.target.setAttribute('id', 'disappear');
    scoredSound.play();
    scored++;
    scored >= circlesNumber ? pointsScored.textContent = scored : pointsScored.textContent = scoredCounter;
    while (circlesNumber === scored) {
      clearTimeout(endTimer);
      processToNextLvl();
    }
  } else {
    setTimeout(function () {
      missedSound.play();
      missed++;
      pointsMissed.textContent = missed;
      document.body.style.backgroundImage = "url('./images/blue.jpg')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    }, 500);
    document.body.style.backgroundImage = "url('./images/red.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  }
})

loginBtn.addEventListener('click', () => {
  if (loginBtn.innerHTML == "LogIn") {
    addText();
  } else {
    logOut();
  }
})

//adding action to Music button
musicButton.addEventListener('click', () => {
  if (fullGameTrack.paused === true) {
    icon.style.color = "black";
    fullGameTrack.play();
  } else {
    fullGameTrack.pause();
    icon.style.color = "red";
  }
})

//adding actions to START button
startButton.addEventListener('click', () => {
  fullGameTrack.play();
  cleaner();
  createRandomCircles();
  animateCircles();
})

const ifUsed = (array) => {
  return array == playerName;
}

const arrSum = arr => arr.reduce((a, b) => a + b, 0)

//CLEANER - RESET existing balls, scores, setTimeout etc.
const cleaner = () => {
  playerBase = [];
  let child = ul.lastElementChild;

  while (child) {
    ul.removeChild(child);
    child = ul.lastElementChild;
  }
  missed = 0;
  scored = 0;
  resultArr = [];
  circlesNumber = 5;
  scoredCounter = 0;
  pointsScored.textContent = scoredCounter;
  pointsMissed.textContent = missed;

  if (endTimer) {
    clearTimeout(endTimer);
  }
}

const createRandomCircles = () => {
  const randomColor = (() => Math.floor(Math.random() * 256));
  const randomCircleSize = (() => Math.floor(Math.random() * (120 - 15)) + 15);
  for (let i = 0; i <= circlesNumber - 1; i++) {
    circle = document.createElement("li")
    const r = randomColor();
    const g = randomColor();
    const b = randomColor();
    const circleSize = randomCircleSize();
    circle.className = "circleStyle"
    circle.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    circle.style.width = `${circleSize}px`;
    circle.style.height = `${circleSize}px`;
    ul.appendChild(circle);
  }
  //Disabling login function after the game started
  startButton.disabled = true;
}

const animateCircles = () => {
  const randomFallSpeed = (() => Math.floor(Math.random() * (10000 - 5000)) + 5000);
  circles = document.querySelectorAll(".circleStyle")
  for (let i = 0; i < circles.length; i++) {
    speed = randomFallSpeed();
    console.log(speed);
    circles[i].animate([
      // keyframes
      {
        transform: 'translateY(0px)'
      },
      {
        transform: `translateY(75vh)`
      }
    ], {
      // timing options
      duration: speed,
      iterations: 1,
      delay: 30,
      fill: "forwards"
    });
  };
  //here function ending game after highest time - second case when game ends
  endTimer = setTimeout(() => endGame(), speed);
}

const nextGame = () => {
  //Enabling login function after the game
  loginBtn.disabled = false;
  setTimeout(() => {
    if (window.confirm("Do You wanna play again?")) {
      gameInit();
    } else {
      cleaner();
    }
  }, 200)
}

const gameInit = () => {
  cleaner();
  createRandomCircles();
  animateCircles();
}

const processToNextLvl = () => {
  resultArr.push(scored)
  scoredCounter = arrSum(resultArr);
  ul.innerHTML = "";
  circlesNumber++
  scored = 0;
  createRandomCircles();
  animateCircles();

}

const endGame = () => {
  //Establish result
  resultAndDifferenceCounted();
  bestScore();
  displayResults();
  nextGame();
}

const bestScore = () => {
  let bestResult = document.querySelector(".bestResultPoints");
  if (result > best) {
    best = result;
    bestResult.innerHTML = `${playerName} ${result}`;
  }
}

const resultAndDifferenceCounted = () => {
  result = scoredCounter - missed;
  difference = best - result;
  if (difference < 0) {
    difference = difference * (-1)
  }
}

//function adding text from input to menu
const addText = () => {
  playerName = player.value;
  // Checking if login input is not empty and alerting to write
  if (playerName.valueOf() === undefined || playerName.valueOf() == "") {
    startButton.disabled = true;
    alert("Please enter your name to be able to start!");
  }
  //Checking if login was used before
  else if (playerBase.some(ifUsed) == true) {
    console.log("already used name");
  } else {
    console.log("you already used this account");
    logIn();
  }
}

const logOut = () => {
  player.disabled = false;
  player.value = "";
  startButton.disabled = true;
  loginBtn.classList = "login button btn btn-primary";
  loginBtn.innerHTML = "LogIn";
  currentPlayer.innerHTML = "";
  cleaner();

}

const logIn = () => {
  loginBtn.innerHTML = "Log Out"
  loginBtn.classList = "logout-btn button btn btn-warning";
  var nrPlayer = playerBase.length;
  playerBase[nrPlayer] = playerName;
  console.log(playerBase);
  currentPlayer.innerHTML = playerName
  startButton.disabled = false;
  player.disabled = true;
}

const displayResults = () => {
  if (window.alert(`You have scored ${scoredCounter} times and missed ${missed} times your total result is ${result} points. Your result is ${result < best ? "lower" : "higher"} than best result by ${difference}`)) {}
};