var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var spaceKeyPressed = false;

var maxIndex = 0;
var speedIndex = 0;
var obstacleSpeeds = [0, 6, 8, 10, 8, 6, 4];
var bagSpeeds = [0, -10, -6, 0, 6, 10, 12];
var score = 0;
var highscore = localStorage.getItem("highscore");

if (highscore == null) {
  localStorage.setItem("highscore", score)
}

var leftKeyPressed = false;
var rightKeyPressed = false;

var bag = new Bag(96, 96, 20, bagSpeeds[speedIndex]);
var rightWall = new Obstacle(60, canvas.height, canvas.width - 60, 0, 0);
var leftWall = new Obstacle(60, canvas.height, 0, 0, 0);

var pathways = new Map();
pathways.set("path1", new Pathway());
pathways.set("path2", new Pathway());
pathways.set("path3", new Pathway());

pathways.get("path1").setY(canvas.height + 20);
pathways.get("path2").setY(canvas.height + 800);
pathways.get("path3").setY(canvas.height + 800);

function updateSpeedIndex() {
    if (rightKeyPressed && speedIndex < maxIndex) {
        speedIndex++;
    } else if (leftKeyPressed && speedIndex > 0) {
        speedIndex--;
    }
}

// Returns true if bag collides with wall/obstacles
function checkCollisions() {
    // tests if bag hit a wall
    if (bag.x < rightWall.width + bag.radius || bag.x > (canvas.width - rightWall.width - bag.radius)) {
        return true;
    }

    for (const [key, value] of pathways.entries()) {
        if (bag.x > value.getRightX() - bag.radius
            && bag.x < value.getRightX() + value.getRightWidth()
            && bag.y > value.getRightY() - bag.radius - 1
            && bag.y < value.getRightY() + value.getRightHeight() + bag.radius
            || bag.x > value.getLeftX()
            && bag.x < value.getLeftX() + value.getLeftWidth() + bag.radius - 8
            && bag.y > value.getLeftY() - bag.radius - 1
            && bag.y < value.getLeftY() + value.getLeftHeight() + bag.radius)
        {
            alert('rx: ' + value.getRightX() + ' ry: ' + value.getRightY() + ' bx: ' + bag.x + ' by: ' + bag.y + ' brad: ' + bag.radius);
            return true;
        }
    }
    return false;
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
        } else if (!value.hasPassed && value.getY() < bag.y) {
            score++;
            value.hasPassed = true;
        }
    }
}

function drawInstructions() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Avoid the walls!", canvas.height / 2 + 50, canvas.width / 2 - 140);
    ctx.fillText("Use left and right arrow keys to control the ball.", canvas.height / 2 - 40, canvas.width / 2 - 110);
    ctx.fillText("Press Space to Start", canvas.height / 2 + 35, canvas.width / 2 - 80);

}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, leftWall.width + 10, 20);
    ctx.fillText("High score: " + highscore, canvas.width - rightWall.width - 140, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!spaceKeyPressed) {
        drawInstructions();
    }
    bag.drawBag();
    rightWall.drawObstacle();
    leftWall.drawObstacle();
    for (const [key, value] of pathways.entries()) {
        value.drawPathway();
    }
    drawScore();
    updateSpeedIndex();

    // move bag and obstacle
    if (checkCollisions()) {
        if (score > highscore) {
          localStorage.setItem("highscore", score);
        }
        alert("Game over");
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
    }

    updateAllPathways();
    bag.x += bagSpeeds[speedIndex];
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightKeyPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftKeyPressed = true;
    }
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        maxIndex = 6;
        speedIndex = 6;
        obstacleSpeeds = [4, 6, 8, 10, 8, 6, 4];
        bagSpeeds = [-8, -6, -2, 0, 2, 6, 8];
        score = 0;
        leftKeyPressed = false;
        rightKeyPressed = false;
        spaceKeyPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightKeyPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftKeyPressed = false;
    }
}

// draw() will be called every 10ms
var interval = setInterval(draw, 30);
