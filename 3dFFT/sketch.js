let easycam;
let voxDim = 20;

let v1 = new p5.Vector(50, 50, 50);
let v2 = new p5.Vector(150,150,150);



function setup() {
  createCanvas(710, 400, WEBGL);
  easycam = createEasyCam({distance:500});
  document.oncontextmenu = function() { return false; }
}

function draw() {
  background(250);
  strokeWeight(1);
  
}
