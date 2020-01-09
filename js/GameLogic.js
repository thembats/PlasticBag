var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var maxIndex = 6;
var speedIndex = 6;
var obstacleSpeeds = [3, 5, 7, 9, 7, 5, 3];
var bagSpeeds = [-6, -4, -2, 0, 2, 4, 6];

var leftKeyPressed = false;
var rightKeyPressed = false;

var bag = new Bag(32, 32, 64, 96, bagSpeeds[speedIndex]);
var rightWall = new Obstacle(64, canvas.height, canvas.width - 64, 0, 0);
var leftWall = new Obstacle(64, canvas.height, 0, 0, 0);

var pathways = new Map();
pathways.set("path1", new Pathway());
pathways.set("path2", new Pathway());
pathways.set("path3", new Pathway());

pathways.get("path1").setY(canvas.height + 20);
pathways.get("path2").setY(-40);
pathways.get("path3").setY(-40);

function updateSpeedIndex() {
  if (rightKeyPressed && speedIndex < maxIndex) {
    speedIndex++;
  } else if (leftKeyPressed && speedIndex > 0) {
    speedIndex--;
  }
}

// This function matches the speed at which the pathways move
// with the speed of the bag.
//
// Once one pathway reaches the center of the screen, the next pathway
// is assigned a new pathway and it's Y is set at the bottom of the screen.
// This makes the pathway spawning random.
function updateAllPathways() {
  for (const [key, value] of pathways.entries()) {
    value.setY(value.getY() - obstacleSpeeds[speedIndex]);
    if (value.getY() <= (canvas.height / 2) && value.getY() >= (canvas.height / 2) - 20) {
      switch (key) {
        case "path1":
          pathways.set("path2", new Pathway());
          pathways.get("path2").setY(canvas.height + 10);
          break;
        case "path2":
          pathways.set("path3", new Pathway());
          pathways.get("path3").setY(canvas.height + 10);
          break;
        case "path3":
          pathways.set("path1", new Pathway());
          pathways.get("path1").setY(canvas.height + 10);
          break;
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bag.drawBag();
  rightWall.drawObstacle();
  leftWall.drawObstacle();
  for (const [key, value] of pathways.entries()) {
    value.drawPathway();
  }

  updateSpeedIndex();

  // move bag and obstacle
  bag.x += bagSpeeds[speedIndex];
  updateAllPathways();
  // tests if bag hit a wall
  if (bag.x < rightWall.width || bag.x > (canvas.width - (rightWall.width * 1.5))) {
    alert("GAME OVER");
    document.location.reload();
    clearInterval(interval); // Needed for Chrome to end game
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
