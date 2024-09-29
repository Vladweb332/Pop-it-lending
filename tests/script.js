const startBtn = document.querySelector("#start");
const game = document.querySelector("#game");
const time = document.querySelector("#time");
const timeHeader = document.querySelector("#time-header");
const resultHeader = document.querySelector("#result-header");
const result = document.querySelector("#result");
const gameTimeInput = document.querySelector("#game-time");

let score = 0;
let isGameStarted = false;

startBtn.addEventListener("click", startGame);
game.addEventListener("click", handleBoxClick);
gameTimeInput.addEventListener("input", setGameTime);

function startGame() {
  score = 0;
  setGameTime();
  gameTimeInput.setAttribute("disabled", "true");
  timeHeader.classList.remove("hide");
  resultHeader.classList.add("hide");
  isGameStarted = true;
  game.style.backgroundColor = "#fff";
  startBtn.classList.add("hide");

  const interval = setInterval(function () {
    const currentTime = parseFloat(time.textContent);

    if (currentTime <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      time.textContent = (currentTime - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

function setGameTime() {
  const gameTime = parseInt(gameTimeInput.value);
  time.textContent = gameTime.toFixed(1);
  timeHeader.classList.remove("hide");
  resultHeader.classList.add("hide");
}

function endGame() {
  isGameStarted = false;
  gameTimeInput.removeAttribute("disabled");
  setGameScore();
  startBtn.classList.remove("hide");
  game.innerHTML = "";
  game.style.backgroundColor = "#ccc";
  timeHeader.classList.add("hide");
  resultHeader.classList.remove("hide");
}

function setGameScore() {
  result.textContent = score.toString();
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }

  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

function renderBox() {
  game.innerHTML = "";
  const box = document.createElement("div");
  const boxSize = getRandom(30, 100);
  const gameSize = game.getBoundingClientRect();
  const maxTop = gameSize.height - boxSize;
  const maxLeft = gameSize.width - boxSize;

  box.style.height = `${boxSize}px`;
  box.style.width = `${boxSize}px`;
  box.style.position = "absolute";
  box.style.backgroundColor = getRandomColor();
  box.style.top = `${getRandom(0, maxTop)}px`;
  box.style.left = `${getRandom(0, maxLeft)}px`;
  box.style.cursor = "pointer";
  box.setAttribute("data-box", "true");

  game.appendChild(box);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#33FFF5"];
  return colors[Math.floor(Math.random() * colors.length)];
}
