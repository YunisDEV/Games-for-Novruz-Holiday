
var horizon;
var obstacleSpeed;

var score;
var obstacles = [];

var dino;
var dinoImg;
function setup() {
  createCanvas(800, 400);

  textAlign(CENTER);

  horizon = height - 40;
  
	score = 0;
	obstacleSpeed = 5;

	var size = 20;
	dino = new TRex(size * 2, height - horizon, size);

  textSize(20);
}

function draw() {
  background('rgba(255,255,255, 1)');

	drawHUD();

	handleLevel(frameCount);

	dino.update(horizon);

  handleObstacles();
}
function drawHUD() {

  stroke(51);
	strokeWeight(3);
  line(0, horizon, width, horizon);

	noStroke();
  text("Xalınız: " + score, width / 2, 30);

	dino.draw();
}

function handleObstacles() {

  for (var i = obstacles.length - 1; i >= 0; i--) {

		obstacles[i].update(obstacleSpeed);
		obstacles[i].draw();

		if (obstacles[i].hits(dino))
			endGame();

    if (!obstacles[i].onScreen)
      obstacles.splice(i, 1);
  }
}

function handleLevel(n) {

  if (n % 30 === 0) {

    var n = noise(n);
    if (n > 0.5)
      newObstacle(n);

	  if (n % 120 === 0)
	    obstacleSpeed *= 3;
  }

	score++;
}

function newObstacle(n) {

	var col = '#000000';
	var size = 50;
  var obs = new Obstacle(width + size, size, horizon, col);

  obstacles.push(obs);
}

function keyPressed() {

	if ((keyCode === UP_ARROW || keyCode === 32) && dino.onGround)
		dino.jump();
}

function touchStarted(){
	if(true){
		dino.jump();
	}
}

function endGame() {

	noLoop();
  noStroke();
  textSize(40);
  text('UDUZDUN', width / 2, height / 2-15);
  textSize(20);
  text("Yenidən başlamaq üçün f5\'i bas", width / 2, height / 2 + 10);
}
