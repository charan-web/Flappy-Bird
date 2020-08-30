const gameContainer = document.querySelector(".game-container")
const bird = document.querySelector(".bird")
isGameOver = false;
const button = document.querySelector(".btn")
let h1 = document.querySelector(".h1")
const scoreId = document.getElementById("score")
let score = document.querySelector(".ptag").innerHTML

let value;



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

//function for jump when key is pressed
function jump() {
  if (birdBottom < 500) birdBottom += 50
  bird.style.bottom = birdBottom + 'px'
}
document.addEventListener("keyup", control)


//create obstacles
function createObstacles() {
  let obstacleLeft = 500

  let obstacleBottom = 0
//top obstacle = top pipe
//obstacle = bottom pipe
  const obstacle = document.createElement("div")
  const topObstacle = document.createElement("div")
  if (!isGameOver) {
    obstacle.classList.add("obstacle")
    topObstacle.classList.add("topObstacle")
  }
//random height for top and bottom pipes 
  obstacle.style.height = Math.random() * 300 + "px"
  topObstacle.style.height = Math.random() * 200 + "px"

//append the pipes to game container
  gameContainer.appendChild(obstacle)
  gameContainer.appendChild(topObstacle)


//positioning the pipes in game container
  obstacle.style.left = obstacleLeft + "px"
  topObstacle.style.left = obstacleLeft + 'px'

  obstacle.style.bottom = obstacleBottom + 'px'


  //moving the pipes towards the bird
  function moveLeft() {
    if (!isGameOver) {

      obstacleLeft -= 2
    }

    obstacle.style.left = obstacleLeft + 'px'
    topObstacle.style.left = obstacleLeft + 'px'



   //removing the pipes after it leaves game container
    if (obstacleLeft === -50 && topObstacle === -50) {
      clearInterval(timerId)
      gameContainer.removeChild(obstacle)
      gameContainer.removeChild(topObstacle)
    }

    //finding the collapse means when the bird hits pipes 
    //numbers indicate the position of objects
    //where pipes position and bird are at same that means COLLIDING
    if (obstacleLeft > 150 && obstacleLeft < 260 && birdLeft === 200 &&
      (birdBottom < obstacle.clientHeight || birdBottom > (580 - topObstacle.clientHeight)) ||
      birdBottom === 0) {
      gameOver()
     
      clearInterval(timerId)

    }
    //score
    else if(obstacleLeft === 30){
      value = parseInt(score)
       value++
     score = value
    document.querySelector('p').innerHTML = score
   
      
    
    
      //console.log(score)
    }
  }
  //if bird hit anyone of the pipe the we need stop the pipes moving function
  let timerId = setInterval(moveLeft, 20)

  if (!isGameOver) setTimeout(createObstacles, 3000)







}
createObstacles()
//game over function after collapse
function gameOver() {
  clearInterval(gamerTImerId)
  isGameOver = true;
  document.removeEventListener("keyup", control)
  h1.innerHTML = " Game over"
  document.getElementById("highScore").innerHTML = "#Your High score is " +"  "  +  score
  stopClouds()
  
}

//stops the clouds animation
function stopClouds(){
 let span = document.getElementsByTagName("span")
 let array = [span]
 array.forEach(element => {
 for(item of element){
   item.style.webkitAnimationPlayState = "paused";
 }
 });
}

function restart(){
  document.location.href=""
}



 

