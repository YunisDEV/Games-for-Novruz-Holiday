function TileSnake(x, y) {

	this.direction = createVector(-1, 0);

	this.body = [createVector(x, y)];

	this.alive = true;
}


TileSnake.prototype.update = function(food) {

	
	var nextTile = this.body[0].copy().add(this.direction); 

  this.body.unshift(nextTile); 


	for (var i = 0; i < this.body.length; i++) {
		if (i != 0 && checkCollision(this.body[0], this.body[i])) {
			

			this.alive = false;
		}
	}


	if (this.body[0].x > wOs || this.body[0].x < 0 || this.body[0].y > hOs || this.body[0].y < 0) {
		gameOver();
	}

	if (this.body[0].x == food.x && this.body[0].y == food.y && foodStatus==true) { 
  

    return true;
  } 
  else if(this.body[0].x == food.x && this.body[0].y == food.y && foodStatus==false){
	gameOver();
  }
  else {

    this.body.splice(this.body.length - 1, 1);
		return false;
  }
};

TileSnake.prototype.draw = function() {

	fill(255);
	for (var j = 0; j < this.body.length; j++) {

		rect(this.body[j].x * SCL, this.body[j].y * SCL, SCL, SCL);
	}
};


TileSnake.prototype.direct = function(direction) {

	
	if ((direction.x != -this.direction.x &&	direction.y != -this.direction.y)){
		console.log(this.body[0].x);
		this.direction = direction;
	}
};


function checkCollision(tile1, tile2) {

	return (tile1.x === tile2.x) && (tile1.y === tile2.y);
}

