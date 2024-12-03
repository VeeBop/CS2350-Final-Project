const canvas = document.getElementById("waterfallCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// Variable to hold our mouse position
let mousePos = { x: -1, y: -1 };

class droplet {
  constructor(x, y) {
    this.x = x; // X Pos
    this.y = y; // Y Pos

    this.r = Math.floor(Math.random() * 50 + 10); // Radius/width

    // Set the initial velocity
    this.dx = Math.floor(Math.random() * 15);
    this.dy = 0;
    // 50/50 whether x is going left or right
    this.dx *= Math.random() < 0.5 ? 1 : -1;

    this.c = `#00${Math.floor(Math.random() * 255)}ff`; // Random blue/teal color
  }

  draw() {
    ctx.fillStyle = this.c;
    // // For some reason here, arcs are really slow to draw, and it crashes
    // // the canvas :(
    // ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillRect(this.x, this.y, this.r, this.r);
    ctx.fill();
  }

  animate() {
    // Move the position
    this.x += this.dx;
    this.y += this.dy;

    // Change velocities
    if (this.dx < 0) {
      this.dx++;
    } else if (this.dx > 0) {
      this.dx--;
    }

    if (this.dy < 20) {
      this.dy++;
    }

    this.draw();
  }
}

const droplets = [];

function update() {
  // Create a few new droplet if the mouse is in bounds
  if (
    mousePos.x >= 0 &&
    mousePos.x <= canvas.width &&
    mousePos.y >= 0 &&
    mousePos.y <= canvas.height
  ) {
    for (let i = 0; i < Math.floor(Math.random() * 10); i++)
      droplets.push(new droplet(mousePos.x, mousePos.y));
  }

  // Overwrite canvas
  ctx.fillStyle = "#252623";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Animate all droplets
  for (let i = 0; i < droplets.length; i++) {
    droplets[i].animate();

    // If the droplet is off the screen, delete it
    if (droplets[i].y > canvas.height) {
      droplets.splice(i, 1);
    }
  }

  // Next frame
  requestAnimationFrame(update);
}

// Helper function to get mouse position
// https://stackoverflow.com/questions/1114465/getting-mouse-location-in-canvas
function getMousePos(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}
canvas.addEventListener("mousemove", function (evt) {
  mousePos = getMousePos(canvas, evt);
});

// Start the loop
update();
