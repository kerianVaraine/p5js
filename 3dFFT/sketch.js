let easycam;
voxDim = 20;

let v1 = new p5.Vector(50, 50, 50);
let v2 = new p5.Vector(150,150,150);

let 

function setup() {
  createCanvas(710, 400, WEBGL);
  easycam = createEasyCam({distance:500});
  document.oncontextmenu = function() { return false; }
}

function draw() {
  background(250);
  strokeWeight(3);
  for (let j = 0; j < 2; j++) {
    push();
    for (let i = 0; i < 10; i++) {
      translate(
        sin(frameCount * 1 + j),
        i * 1,
        sin(frameCount * 0.001 + j)
        
      );
      rotateZ(frameCount * 0.01);
      push();
      box(voxDim,voxDim,voxDim);
      pop();
    }
    pop();
  }
}
