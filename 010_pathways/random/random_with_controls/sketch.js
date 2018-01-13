/* Mimi Yin, NYU-ITP
Random pathways with controls.
*/

// Store x,y coordinates of current location
let x, y;
// Store x,y coordinates of previous location
let px, py;
// Store current xspeed and yspeed
let xspeed, yspeed;

// Whether to draw the rectangle of possibility
let rop = false;

// Mode of control for arrow keys
let mode;
// # of frames to wait before changing direction.
let interval;
// Range of random, relative range of vertical random
let range, yscl;
// How much to shift right/left, up/down
let xshift, yshift;
// Which preset
let preset = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  reset();

  xspeed = 0;
  yspeed = 0;

  rop = false;
  mode = 0;
  interval = 1;
  range = 4;
  yscl = 1;
  xshift = 1;
  yshift = 1;

  noStroke();
}

function draw() {
  //background(0);

  //Change direction
  if (frameCount % interval == 0) {
    xspeed = random(-range, range * xshift); //shift median to go right/left
    yspeed = random(-range * yscl, range * yscl * yshift); // shift median to go up/down
  }

  // Move
  x += xspeed;
  y += yspeed;

  // Draw a line from the previous loc to this loc
  stroke(255);
  line(px, py, x, y);

  // Draw the rectangle of possibility
  if (rop) {
    stroke(255, 0, 0, 255 * range / 32);
    noFill();
    rect(x - range, y - (range * yscl), range + (range * xshift), (range * yscl) + (range * yscl * yshift));
  }

  // Remember current location for next frame
  px = x;
  py = y;

  // Re-center when off-screen
  if (x < 0 || x > width || y < 0 || y > height) reset();

  // Print control values to screen
  noStroke();
  fill(0);
  rect(0, 0, 500, 120);
  fill(255);
  textSize(18);
  text("mode (ESC): " + mode + "\tpreset (1-6): " + preset, 10, 20);
  text("mode 0. interval (UP/DWN): " + interval + "\trange (RT/LFT): " + nfs(range, 0, 2), 10, 40);
  text("mode 1. yscl (UP/DWN): " + nfs(yscl, 0, 2), 10, 60);
  text("mode 2. yshift (DWN/UP): " + nfs(yshift, 0, 2) + "\txshift (RT/LFT): " + nfs(xshift, 0, 2), 10, 80);
  text("Press RETURN to clear canvas.", 10, 100);

}

function keyPressed() {
  // Presets
  switch (key) {
    // "Normal"
    case '1':
      interval = 1;
      range = 4;
      yscl = 1;
      xshift = 1;
      yshift = 1;
      preset = 1;
      break;
      // Fast
    case '2':
      interval = 1;
      range = 50;
      yscl = 1;
      xshift = 1;
      yshift = 1;
      preset = 2;
      break;
      // Only changes every second. Slow.
    case '3':
      interval = 120;
      range = 2;
      yscl = 1;
      xshift = 1;
      yshift = 1;
      preset = 3;
      break;
      // More vertical.
    case '4':
      interval = 30;
      range = 2;
      yscl = .5;
      xshift = 1;
      yshift = 1;
      preset = 4;
      break;
      // Moving towards upper-right.
    case '5':
      interval = 1;
      range = 1;
      yscl = 1;
      xshift = 1.5;
      yshift = .7;
      preset = 5;
      break;
      // Moving towards upper-right.
    case '6':
      interval = 180;
      range = 1;
      yscl = 1;
      xshift = 1;
      yshift = 1;
      preset = 6;
      break;
  }


  // Change mode to change which
  // lets the arrow keys control
  switch (keyCode) {
    case TAB:
      rop = !rop;
      break;
    case ESCAPE:
      mode++;
      mode %= 3;
      break;
      // Reset
    case RETURN:
      reset();
      break;
  }

  // Arrow key controls
  switch (mode) {
    case 0:
      switch (keyCode) {
        case UP_ARROW:
          interval++;
          break;
        case DOWN_ARROW:
          interval--;
          break;
        case RIGHT_ARROW:
          range++;
          break;
        case LEFT_ARROW:
          range--;
          break;
      }
      interval = bottomOut(interval, 1);
      range = bottomOut(range);
      break;
    case 1:
      switch (keyCode) {
        case UP_ARROW:
          yscl += 0.1;
          break;
        case DOWN_ARROW:
          yscl -= 0.1;
          break;
      }
      yscl = bottomOut(yscl, 0);
      break;
    case 2:
      switch (keyCode) {
        case RIGHT_ARROW:
          xshift += 0.1;
          break;
        case LEFT_ARROW:
          xshift -= 0.1;
          break;
        case UP_ARROW:
          yshift -= 0.1;
          break;
        case DOWN_ARROW:
          yshift += 0.1;
          break;
      }
      xshift = bottomOut(xshift, 0);
      yshift = bottomOut(yshift, 0);
      break;
  }
}

function reset() {
  background(0);
  x = width / 2;
  y = (height / 2) + 120;
  px = x;
  py = y;
}

// Bottom out at...
function bottomOut(p, bottom) {
  return p < bottom ? bottom : p;
}