function Obstacle(width, height, x, y, speed) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speed = speed;

  this.drawObstacle = function () {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

}