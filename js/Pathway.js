function Pathway() {
  var playableArea = canvas.width - (rightWall.width * 4);
  var randWidth = Math.floor(Math.random() * playableArea);
  var rightWidth = playableArea - randWidth;
  var left = new Obstacle(randWidth, 36, rightWall.width, canvas.height + 20, 0);
  var right = new Obstacle(rightWidth, 36, (canvas.width - leftWall.width) - rightWidth, canvas.height + 20, 0);
  var hasPassed = false;
   
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

  this.getLeftX = function () {
      return left.x;
  }

  this.getLeftY = function () {
      return left.y;
  } 

  this.getRightX = function () {
      return right.x;
  }

  this.getRightY = function () {
      return right.y;
  }

  this.getRightWidth = function () {
      return right.width;
  }

  this.getLeftWidth = function () {
      return left.width;
  }

  this.getLeftHeight = function () {
      return left.height;
  }

  this.getRightHeight = function () {
      return right.height;
  }

}