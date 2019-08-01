const ul = document.createElement("ul")
document.body.appendChild(ul);
const pointsScored = document.querySelector(".pointsScored span");
const pointsMissed = document.querySelector(".pointsMissed span")
let missed = 1;
let scored = 1;
let circles;

const randomCirclesNumber = Math.floor(Math.random() * (21 - 15)) + 15;
const randomColor = (() => Math.floor(Math.random() * 256));
const randomCircleSize = (() => Math.floor(Math.random() * (80 - 15)) + 15);
const randomFallSpeed = (() => Math.floor(Math.random() * (20000 - 10000)) + 10000);

let hSpeed = 0;

const gamePlan = () => {

}

const createRandomCircles = () => {
  for (let i = 0; i <= randomCirclesNumber; i++) {
    circle = document.createElement("li")
    const r = randomColor();
    const g = randomColor();
    const b = randomColor();
    const circleSize = randomCircleSize();
    circle.className = "myStyle"
    circle.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    circle.style.width = `${circleSize}px`;
    circle.style.height = `${circleSize}px`;
    ul.appendChild(circle);
  }
}

const animateCircles = () => {
  circles = document.querySelectorAll(".myStyle")
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
        transform: `translateY(80vh)`
      }
    ], {
        // timing options
        duration: speed,
        iterations: 1,
        delay: 30,
        fill: "forwards"
      });
  };
  setTimeout(() => alert(`sasssanka`), hSpeed);
  console.log(`after forloop`, hSpeed);
}

ul.addEventListener("click", function (e) {
  console.log(e);
  console.log(e.target.classList);
  console.log()
  if (e.target.classList.value === document.querySelector("li.myStyle").classList.value) {
    pointsScored.textContent = `${scored++}`;
    e.target.remove();
  } else {
    setTimeout(function () {
      pointsMissed.textContent = `${missed++}`;
      document.body.style.backgroundColor = "white";
    }, 500);
    document.body.style.backgroundColor = "red";
  }

});

//removing existing balls
function cleaner() {
  let child = ul.lastElementChild;

  while (child) {
    ul.removeChild(child);
    child = ul.lastElementChild;
  }
}

//adding actions to START button
button.addEventListener('click', () => {
  //removing existing balls
  cleaner();
  // creating new balls    
  createRandomCircles();

  //animating balls
  animateCircles();

})

createRandomCircles();
animateCircles();