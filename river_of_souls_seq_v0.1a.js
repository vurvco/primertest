var souls = [];
var clockStart, clockEnd, lapsedTime;
var v = 2;

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
  for (var i = 0; i < souls.length; i++) {
    souls[i].show();
    souls[i].move();

    for (var j = 0; j < souls.length; j++) {
      if (i != j) {
        if (dist(souls[i].x, souls[i].y, souls[j].x, souls[j].y) <= souls[i].d / 2 + souls[j].d / 2) {
          // Adhesion. (Average velocities).
          souls[i].xv = souls[j].xv = (souls[i].xv + souls[j].xv) / 2; 
          souls[i].yv = souls[j].yv = (souls[i].yv + souls[j].yv) / 2;
          // Set timer.
          clockStart = (clockStart == 0) ? millis() : 0;
          clockEnd = random(15000, 200000);
          timeLapse = millis() - clockStart;
          // Separation.
          if (timeLapse >= clockEnd) {
            clockStart = 0;
            clockEnd = 20;
            souls[i].xv = random(-v, v);
  			souls[i].yv = random(-v, v);
            souls[j].xv = random(-v, v);
  			souls[j].yv = random(-v, v);
          }	  // End if timer.
        }	// End if collision/adhesion.
      }	  // End if i != j.
    }	// End for j.
  }	  // End for i.
}	// End draw.

function Soul() {
  this.d = random(10, 100);
  this.x = random(this.d, windowWidth - this.d);
  this.y = random(this.d, windowHeight - this.d);
  this.xv = random(-v, v);
  this.yv = random(-v, v);
  this.show = function() {
    ellipse(this.x, this.y, this.d, this.d);
  }
  this.move = function() {
    this.x += this.xv;
    this.y += this.yv;
    this.xv = (this.x > windowWidth - this.d / 2 || this.x < 0 + this.d / 2) ? -this.xv : this.xv;
    this.yv = (this.y > windowHeight - this.d / 2 || this.y < 0 + this.d / 2) ? -this.yv : this.yv;
  }
}

//function windowResized() {							// Buggy. Be careful.
//  resizeCanvas(windowWidth, windowHeight);
//}