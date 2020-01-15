function TRex(x, y, radius) {

	this.x = x+20;
	this.y = y;

	this.yVelocity = 0;
	this.speed = 1;
	this.onGround = true;

	this.radius = radius; // size of circle
}

/**
	*	handle y values
	*/
TRex.prototype.update = function(platform) {

	var bottom = this.y + this.radius;
	var nextBottom = bottom + this.yVelocity;

  if (bottom <= platform && nextBottom >= platform) {

		this.yVelocity = 0;
		this.y = platform - this.radius;
		this.onGround = true;
  } else if (platform - bottom > 1) {

		this.yVelocity += this.speed;
		this.onGround = false;
  }
	this.y += this.yVelocity;
};
TRex.prototype.jump = function() {

	this.yVelocity = -(this.radius * 0.7); // jump
};

TRex.prototype.draw = function() {
	ellipse(this.x, this.y, this.radius * 2);
};
