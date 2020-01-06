var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var maxIndex = 6;
var speedIndex = 6;
var obstacleSpeeds = [3, 5, 7, 9, 7, 5, 3];
var bagSpeeds = [-6, -4, -2, 0, 2, 4, 6];

var leftKeyPressed = false;
var rightKeyPressed = false;

var bag = new Bag(32, 32, 64, 96, bagSpeeds[speedIndex]);
var obstacle = new Obstacle(canvas.width / 2, 32, 0, canvas.height + 20, obstacleSpeeds[speedIndex]);
var obstacle1 = new Obstacle(canvas.width / 3, 32, canvas.width, canvas.height + 20, obstacleSpeeds[speedIndex]);
var rightWall = new Obstacle(64, canvas.height, canvas.width - 64, 0, 0);
var leftWall = new Obstacle(64, canvas.height, 0, 0, 0);

function updateSpeedIndex() {
  if (rightKeyPressed && speedIndex < maxIndex) {
    speedIndex++;
  } else if (leftKeyPressed && speedIndex > 0) {
    speedIndex--;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bag.drawBag();
  obstacle.drawObstacle();
  rightWall.drawObstacle();
  leftWall.drawObstacle();
  updateSpeedIndex();

  // move bag and obstacle
  bag.x += bagSpeeds[speedIndex];
  obstacle.y -= obstacleSpeeds[speedIndex];
  // tests if bag hit a wall
  if (bag.x < rightWall.width || bag.x > (canvas.width - (rightWall.width * 1.5))) {
    alert("GAME OVER");
    document.location.reload();
    clearInterval(interval); // Needed for Chrome to end game
  }

  if (obstacle.y < -20) {
    obstacle.y = canvas.height + 20;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightKeyPressed = true;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftKeyPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightKeyPressed = false;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftKeyPressed = false;
  }
}
// draw() will be called every 10ms
var interval = setInterval(draw, 30);
