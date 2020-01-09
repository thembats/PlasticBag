function Bag(x, y, radius, speed) {
  this.radius = radius;
  this.x = x;
  this.y = y;
  this.speed = speed;

  this.drawBag = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
}