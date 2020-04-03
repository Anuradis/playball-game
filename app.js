const ul = document.createElement("ul")
document.body.appendChild(ul);
const startButton = document.querySelector(".start")
const pointsScored = document.querySelector(".pointsScored span");
const pointsMissed = document.querySelector(".pointsMissed span");
let currentPlayer = document.querySelector(".currentPlayer");
let loginBtn = document.querySelector(".login");
let player = document.querySelector("#uName");
let missed = 0;
let scored = 0;
let result = 0;
let circles;
let randomCirclesNumber;
let endTimer = 0;
let hSpeed = 0;
let playerName;
let best = 0;
let difference = 0;
let btn_text;
var playerBase = [];




//Checking if playerBase array has same element as current player's name
function ifUsed(array) {
  return array == playerName;
}


//creating random cirlces
let createRandomCircles = () => {
  const randomColor = (() => Math.floor(Math.random() * 256));
  const randomCircleSize = (() => Math.floor(Math.random() * (120 - 15)) + 15);
  randomCirclesNumber = Math.floor(Math.random() * (17 - 2 + 1)) + 2;
  for (let i = 0; i <= randomCirclesNumber - 1; i++) {
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



//animating circles
let animateCircles = () => {
  const randomFallSpeed = (() => Math.floor(Math.random() * (10000 - 5000)) + 5000);
  circles = document.querySelectorAll(".circleStyle")
  for (let i = 0; i < circles.length; i++) {
    let speed = randomFallSpeed();
    if (speed > hSpeed) {
      hSpeed = speed;
      console.log(hSpeed);
    }
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
  endTimer = setTimeout(() => nextGame(), hSpeed);;
}





// function removing elements and counting scores on click
ul.addEventListener("click", function (e) {

  console.log(e);
  console.log(e.target.classList);
  if (e.target.classList.value === document.querySelector("li.circleStyle").classList.value) {
    e.target.setAttribute('id', 'disappear');
    scored++;
    pointsScored.textContent = scored;
  } else {
    setTimeout(function () {
      missed++;
      pointsMissed.textContent = missed;
      document.body.style.backgroundImage = "url('corona_blue.jpg')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";

    }, 500);
    document.body.style.backgroundImage = "url('coronavirus_background.png')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  
  }
  resultAndDifferenceCounted();

  
}
)




//removing existing balls, scores, setTimeout etc.
function cleaner() {
  playerBase = [];
  let child = ul.lastElementChild;

  while (child) {
    ul.removeChild(child);
    child = ul.lastElementChild;
  }

  missed = 0;
  scored = 0;
  pointsScored.textContent = scored;
  pointsMissed.textContent = missed;

  if (endTimer) {
    clearTimeout(endTimer);
  }
}

//adding action to Login button

loginBtn.addEventListener('click', () => {
  if (loginBtn.innerHTML == "LogIn") {
    addText();
    console.log("add text executed");
  } else {
    logOut();
    console.log("LogOut executed");
  }
})

//adding actions to START button
startButton.addEventListener('click', () => {
  //removing existing balls
  cleaner();

  // creating new balls
  createRandomCircles();

  //animating balls
  animateCircles();

})

//function asking for next game
function nextGame() {
  //Establish result
  gameFinished();
  //Enabling login function after the game
  loginBtn.disabled = false;
  //setTimeout for fixing confirm pop up before ball disappearing in Chrome
  setTimeout(() => {
    if (window.confirm("Do You wanna play again?")) {
      gameInit();
    } else {
      cleaner();
    }
  }, 200)
}





//function initializing new game
function gameInit() {

  //removing existing balls
  cleaner();

  // creating new balls
  createRandomCircles();

  //animating balls
  animateCircles();

  // declaring when game ends

}

  // declaring first case when game ends
function endGame1() {

  if (scored === randomCirclesNumber) {
    bestScore();
    
  }
}

//best score functionality
function bestScore() {
  let bestResult = document.querySelector(".bestResultPoints");
  if (result > best) {
    best = result;
    bestResult.innerHTML = `${playerName} ${result}`;

  }
}
//result and differenceCounted
function resultAndDifferenceCounted() {
  result = scored - missed;
  difference = best - result;
  if(difference < 0) {
    difference = difference * (-1)
  }
}


//function adding text from input to menu
function addText() {
  playerName = player.value;
  console.log(playerName);
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

//function logging out from the game
function logOut () {
  player.disabled = false;
  player.value = "";
  startButton.disabled = true;
  loginBtn.classList = "login button";
  loginBtn.innerHTML = "LogIn";
  currentPlayer.innerHTML = "";
  cleaner();

}

function logIn () {
    loginBtn.innerHTML = "Log Out"
    loginBtn.classList = "logout-btn button";
    var nrPlayer = playerBase.length;
    playerBase[nrPlayer] = playerName;
    console.log(playerBase);
    currentPlayer.innerHTML = playerName
    startButton.disabled = false;
    player.disabled = true;
}

//window is being displayed
function gameFinished() {
  endGame1();
  if (window.alert(`You have scored ${scored} times and missed ${missed} times your total result is ${result} points. Your result is ${result < best ? "lower" : "higher"} than best result by ${difference}`)) {
    nextGame();
    };  
  }