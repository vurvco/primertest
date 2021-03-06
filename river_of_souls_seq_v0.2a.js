var souls = [];
var soulNum = 25;
var clockStart, clockEnd, lapsedTime;
var v = 2;

function setup() {
  // createCanvas(400, 400);
  // createCanvas(displayWidth, displayHeight);
  createCanvas(windowWidth, windowHeight);
  background(0);
  for (var i = 0; i < soulNum; i++) {												// Initialize souls.
    souls[i] = new Soul();
  }
}

function draw() {

  noStroke();															  			// Onion skin layer.
  fill(0, 18);
  rect(0, 0, width, height);
  
  for (var i = 0; i < souls.length; i++) {											// Invoke souls.
    souls[i].show();
    souls[i].move();

    for (var j = 0; j < souls.length; j++) {										// Soul interaction.
      if (i != j) {
        var soulsDistance = dist(souls[i].x, souls[i].y, souls[j].x, souls[j].y);	// Total distance.
        var soulSpace = souls[i].d / 2 + souls[j].d / 2;							// Touch Radius.
        var communionDistance = 150;
        var lineWeight = 50/soulsDistance;
        
        if (soulsDistance <= communionDistance) {		          					// Communion lines.    
          stroke(lineWeight * 200, lineWeight, lineWeight, 6);
          line(souls[i].x, souls[i].y, souls[j].x, souls[j].y); 
        }
        
        if (soulsDistance <= soulSpace) {											// Adhesion. (Average velocities).
          souls[i].xv = souls[j].xv = (souls[i].xv + souls[j].xv) / 2; 
          souls[i].yv = souls[j].yv = (souls[i].yv + souls[j].yv) / 2;
          
          clockStart = (clockStart == 0) ? millis() : 0;							// Set timer.
          clockEnd = random(15000, 200000);
          timeLapse = millis() - clockStart;
          
          if (timeLapse >= clockEnd) {												// Separation.
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
    
        strokeWeight(lineWeight);													// Inner glow.
    	for (var k = 0; k < 14; k++) {
      	  bezier(souls[i].x, souls[i].y, 
          souls[i].x + random(-50, 50), souls[i].y + random(-50, 50), 
          souls[i].x + random(-50, 50), souls[i].y + random(-50, 50), 
          souls[i].x, souls[i].y);
    }	// End glow.
    
  }	  // End for i.
}	// End draw.

// ====================== Soul Object ====================== //

function Soul() {											 // Setup.
  this.d = random(10, 100);
  this.x = random(this.d, windowWidth - this.d);
  this.y = random(this.d, windowHeight - this.d);
  this.xv = random(-v, v);
  this.yv = random(-v, v);
  
  this.show = function() {									 // Display.
    stroke(100, 10, 200, 10);
    strokeWeight(2);
    fill(100, 10, 200, 5);  
    ellipse(this.x, this.y, this.d, this.d);    
  }
  
  this.move = function() {									 // Behavior (non-interactive).
    this.x += this.xv;
    this.y += this.yv;
    this.xv = (this.x > windowWidth - this.d / 2 || this.x < 0 + this.d / 2) ? -this.xv : this.xv;
    this.yv = (this.y > windowHeight - this.d / 2 || this.y < 0 + this.d / 2) ? -this.yv : this.yv;
  }
}

//function windowResized() {							// Buggy. Be careful.
//  resizeCanvas(windowWidth, windowHeight);
//}