function Pathway() {
  var playableArea = canvas.width - (rightWall.width * 4);
  var randWidth = Math.floor(Math.random() * playableArea);
  var rightWidth = playableArea - randWidth;
  var left = new Obstacle(randWidth, 32, rightWall.width, canvas.height + 20, 0);
  var right = new Obstacle(rightWidth, 32, (canvas.width - leftWall.width) - rightWidth, canvas.height + 20, 0);

  this.drawPathway = function () {
    left.drawObstacle();
    right.drawObstacle();
  }

  this.setY = function (y) {
    left.y = y;
    right.y = y;
  }

  this.getY = function () {
    return left.y;
  }

}