
const TYPES = [
	"BARRIER",
	"PAXLAVA",
	"OPEN",
	"SEKERBURA",
	"GHOST",
  "PACMAN",
  "QOGAL"
];

const TILE_SPEED = 0.2;

const DIMENSIONS = 20;

const SIZE = 25;	
const HALF_SIZE = SIZE / 2;
const THIRD_SIZE = SIZE / 3;
const QUARTER_SIZE = SIZE / 4;


function Tile(x, y, type, behavior) {

  this.x = x;
  this.y = y;
  this.type = type;

	this.destination = (-1, -1);
  this.moving = false;

  this.intact = true;

  this.speed = 0.2;

  this.behavior = behavior; 
}

Tile.prototype.update = function() {

  if (!this.intact) 
    return;

  if (this.moving) {

		console.log(this.x, this.y, "before lerp");
		console.log(this.destination.x, this.destination.y);

    this.x = lerp(this.x, this.destination.x, this.speed);
    this.y = lerp(this.y, this.destination.y, this.speed);

		console.log(this.x, this.y, "after lerp");

		var distanceX = Math.abs(this.x - this.destination.x);
		var distanceY = Math.abs(this.y - this.destination.y);

    if (distanceX < 0.1 && distanceY < 0.1) { 

      this.x = this.destination.x;
      this.y = this.destination.y;

      this.moving = false; 
    }
  }

  if (this.type == "PACMAN") { 

    var destinationTile = getTile(Math.floor(this.x), Math.floor(this.y));

    if (destinationTile.intact) {

      switch (destinationTile.type) {

        case "PAXLAVA":
          score++;	
          destinationTile.intact = false;
          break;

        case "SEKERBURA":
          score += 10;	
          destinationTile.intact = false;
          break;

        case "QOGAL":
          score +=5;
          destinationTile.intact = false;
          break;
      }
    }

    if (score == endScore) 
      endGame(true);

  } else if (this.type == "GHOST") {
    /* GHOST AI */

		var distance = dist(pacman.x, pacman.y, this.x, this.y);

    if (distance < 0.3) 
      endGame(false);

		/* movement */
    if (this.moving) 
      return;

    var possibleMoves = [

      getTile(this.x - 1, this.y),	// left
      getTile(this.x + 1, this.y),	// right
      getTile(this.x, this.y - 1),	// top
      getTile(this.x, this.y + 1),	// bottom
    ];

    possibleMoves.sort(function (a, b) {

      var aD = dist(a.x, a.y, pacman.x, pacman.y);
      var bD = dist(b.x, b.y, pacman.x, pacman.y);

      return aD - bD;
    });

    if (this.behavior === 0) {

      for (var i = 0; i < possibleMoves.length; i++) {

        if (this.move(possibleMoves[i].x, possibleMoves[i].y, false)) {
          break;
        }
      }
    } else {
      var index = Math.floor(random(4));
      this.move(possibleMoves[index].x, possibleMoves[index].y, false);
    }

  }
};

Tile.prototype.draw = function() {

  switch (this.type) {

    case "BARRIER":

      strokeWeight(5);
      stroke(0);
      fill("#0000FF");
      rect(this.x * SIZE, this.y * SIZE, SIZE, SIZE);
      break;

    case "PAXLAVA":

      image(paxlava, this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE, HALF_SIZE, HALF_SIZE);
      break;
    
    case "QOGAL":
      image(qogal, this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE, HALF_SIZE, HALF_SIZE);
      break;

    case "SEKERBURA":

      image(sekerbura, this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE, HALF_SIZE, HALF_SIZE);
      break;

    case "GHOST":

      fill("#FF00EE");
      stroke(0);
      strokeWeight(1);

      beginShape();
      vertex(this.x * SIZE + HALF_SIZE, this.y * SIZE + QUARTER_SIZE);
      vertex(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + (QUARTER_SIZE * 3));
      vertex(this.x * SIZE + (QUARTER_SIZE * 3), this.y * SIZE + (QUARTER_SIZE * 3));
      endShape(CLOSE);
      break;

    case "PACMAN":
      imageMode(CORNER);
      // ellipseMode(CORNER);
      // stroke("#FFFF00");
      // strokeWeight(5);
      // fill("#FFFF33");
      // ellipse(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE, HALF_SIZE);
      image(pac, this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE,HALF_SIZE,HALF_SIZE);
      break;

  }

};


Tile.prototype.move = function(x, y, relative) {

  var destinationX, destinationY;

  if (relative) { 

    destinationX = this.x + x;
    destinationY = this.y + y;
  } else {

    destinationX = x;
    destinationY = y;
  }

  if (this.moving) 
    return false;

  var destinationTile = getTile(destinationX, destinationY);

  var type = destinationTile.type;

  if ((type == "BARRIER" && this.type != "BARRIER") || 
      (type == "GHOST" && this.type == "GHOST")) 				
    return false;

  this.moving = true;
	this.destination = createVector(destinationX, destinationY);

  return true;
};


function getTile(x, y) {

  return field[y * DIMENSIONS + x];
}
