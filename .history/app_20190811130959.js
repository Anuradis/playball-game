const ul = document.createElement("ul")
document.body.appendChild(ul);
const pointsScored = document.querySelector(".pointsScored span");
const pointsMissed = document.querySelector(".pointsMissed span");
const startButton = document.querySelector(".start");
let missed = 0;
let scored = 0;
let circles;
let randomCirclesNumber;
let endTimer = 0;
let hSpeed = 0;
let playerName;
let currentPlayer;
let best = 0;

//best score functionality
function bestScore() {
  
  let bestResult = document.querySelector(".bestResultPoints");
  if (scored > best) {
    best = scored;
    bestResult.innerHTML = `${playerName} ${best}`;
    
  }
}


//function adding text from input to menu
function addText(){
  let player = document.querySelector("#uName");
  playerName = player.value;
  currentPlayer = document.querySelector(".currentPlayer")
  console.log(playerName);
  currentPlayer.innerHTML = playerName
}




//creating random cirlces
let createRandomCircles = () => {
  const randomColor = (() => Math.floor(Math.random() * 256));
  const randomCircleSize = (() => Math.floor(Math.random() * (60 - 15)) + 15);
  randomCirclesNumber = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
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
      document.body.style.backgroundColor = "white";
    }, 500);
    document.body.style.backgroundColor = "red";
  }
  endGame1();
}
)




//removing existing balls, scores, setTimeout etc.
function cleaner() {
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



//adding actions to START button
startButton.addEventListener('click', () => {
  //removing existing balls
  cleaner();
  
  // creating new balls    
  createRandomCircles();

  //animating balls
  animateCircles();
})



// declaring first case when game ends
function endGame1() {
  
  if ( scored == randomCirclesNumber ) {
    bestScore();
    nextGame()
  }
}

//function asking for next game
function nextGame () {
  //setTimeout for fixing confirm pop up before ball disappearing in Chrome
  setTimeout( ()=> {
  if (window.confirm("Do You wanna play again?")) {
    gameInit();
    
   }else {
     cleaner();
   }
},200)
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

