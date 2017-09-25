var souls = [];

function setup() {
  // createCanvas(400, 400);
  // createCanvas(displayWidth, displayHeight);
  createCanvas(windowWidth, windowHeight);
  background(0);
  for (var i = 0; i < 20; i++) {
    souls[i] = new Soul();
  }
}

function draw() {
  background(0);
  for(var i = 0; i < souls.length; i++) {
    souls[i].show();
    souls[i].move();
  }
}

function Soul() {
  this.x = random(this.d/2width);
  this.y = random(height);
  this.xv = random(-4, 4);
  this.yv = random(-4, 4);
  this.d = random(30, 50);
	this.show = function() { ellipse(this.x, this.y, this.d, this.d); }
  this.move = function() {
		this.x += this.xv;
    this.y += this.yv;
    this.xv = (this.x >= width - this.d/2 || this.x < 0 + this.d/2) ? -this.xv : this.xv;
		this.yv = (this.y > height - this.d/2 || this.y < 0 + this.d/2) ? -this.yv : this.yv;
  }
}

// var soul = {
//   x : 0,
//   y : 0,
//   xv : 0,
//   yv : 0,
//   d : 50,
//   show : function() { ellipse(this.x, this.y, this.d, this.d); },
//   move : function() {
// 	this.x += this.xv;
//     this.y += this.yv;
//     this.xv = (this.x > width - this.d/2 || this.x < 0 + this.d/2) ? -this.xv : this.xv;
// 	this.yv = (this.y > height - this.d/2 || this.y < 0 + this.d/2) ? -this.yv : this.yv;
//   }
// };
