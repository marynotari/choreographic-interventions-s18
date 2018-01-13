/* Mimi Yin, NYU-ITP
Linear motion with controls
*/

// Variables to store x,y coordinates of current position
let x, y
// Variables to store x,y coordinates of previous position
let px, py;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initial position is center
  x = width / 2;
  y = height/2;

  background(0);
}

function draw() {

  //Calculate speed based on distance of mouse from center
  x+=(mouseX-(width/2))/(width/50);
  y+=(mouseY-(height/2))/(height/50);

  // Set fill color to white
  stroke(255);
  // Draw a circle at x,y
  line(px, py, x, y);

  // Remember current position as previous position for next frame
  px = x;
  py = y;

  // Draw a landmark in the center
  fill(255);
  rect(width/2, height/2, 10, 10);
}

// Start new line wherever mouse is
function mousePressed(){
  background(0);
  x = mouseX;
  y = mouseY;
}

