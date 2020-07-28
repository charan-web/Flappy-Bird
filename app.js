const gameContainer = document.querySelector(".game-container")
const bird = document.querySelector(".bird")
isGameOver = false;
const button = document.querySelector(".btn")
let h1 = document.querySelector(".h1")


let birdBottom = 150
let birdLeft = 200
let gravity = 2
let gap = 350



//startGame
function startGame() {
  birdBottom -= gravity
  bird.style.left = birdLeft + 'px'
  bird.style.bottom = birdBottom + 'px'
}
let gamerTImerId = setInterval(startGame, 20)

function control(e) {
  if (e.keyCode === 32) {
    jump()
  }
}


function jump() {
  if (birdBottom < 500) birdBottom += 50
  bird.style.bottom = birdBottom + 'px'
}
document.addEventListener("keyup", control)


//obstacles
function createObstacles() {
  let obstacleLeft = 500

  let obstacleBottom = 0

  const obstacle = document.createElement("div")
  const topObstacle = document.createElement("div")
  if (!isGameOver) {
    obstacle.classList.add("obstacle")
    topObstacle.classList.add("topObstacle")
  }

  obstacle.style.height = Math.random() * 300 + "px"
  topObstacle.style.height = Math.random() * 200 + "px"

  gameContainer.appendChild(obstacle)
  gameContainer.appendChild(topObstacle)
  obstacle.style.left = obstacleLeft + "px"
  topObstacle.style.left = obstacleLeft + 'px'

  obstacle.style.bottom = obstacleBottom + 'px'


  function moveLeft() {
    if (!isGameOver) {

      obstacleLeft -= 2
    }

    obstacle.style.left = obstacleLeft + 'px'
    topObstacle.style.left = obstacleLeft + 'px'




    if (obstacleLeft === -50 && topObstacle === -50) {
      clearInterval(timerId)
      gameContainer.removeChild(obstacle)
      gameContainer.removeChild(topObstacle)
    }
    if (obstacleLeft > 150 && obstacleLeft < 260 && birdLeft === 200 &&
      (birdBottom < obstacle.clientHeight || birdBottom > (580 - topObstacle.clientHeight)) ||
      birdBottom === 0) {
      gameOver()
      clearInterval(timerId)

    }
  }
  let timerId = setInterval(moveLeft, 20)

  if (!isGameOver) setTimeout(createObstacles, 3000)







}
createObstacles()

function gameOver() {
  clearInterval(gamerTImerId)
  isGameOver = true;
  document.removeEventListener("keyup", control)
  h1.innerHTML = " Game over"
}
