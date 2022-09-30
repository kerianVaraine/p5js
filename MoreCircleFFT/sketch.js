let mic, fft;
let micThreshold = 10;

let frequencyPerSecondTick = 0;
let a = [0,0];

let rings = [];



function fps(n) {
  return frequencyPerSecondTick++ % n;
}

let ring = function(x, y, r, speed) {
  this.x = x;
  this.y = y;
  this.r = r;

  this.col = 0;
  this.strokeWeight = 3;

  this.start=0;
  this.end=5;
  //hold init start and end
  this._start =this.start;
  this._end= this.end;

  this.speed = speed;

  this.movement = function(fft, constant) {
    this.start -= constant + this.speed /8 * (fft / 1000);
    this.end += constant + this.speed /8 * (fft / 1000);
  };

  //This lagged heaps, probs obvious to someone else.
  this.makeArc = function (i, fft) {
    return arc(this.x + i * 2, this.y, this.r+fft/6, this.r+fft/6, this.start-fft/16, this.end+fft/16, OPEN);
  };
}

let makeRings = function(num, x, y, r, speed) {
  this.rings = [];
  for(let i = 0; i < num; i++) {
    this.rings.push(new ring(x, y, (r * i + r), (i * speed + 1)));
  }
return this.rings;
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(0,5);
  fill(255);

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  
  rings = makeRings(50, width/2 - 75, height/2, 20, 1);
}

function draw() {
  background(0);
  spectrum = fft.analyze(128);
  
  noFill();
  strokeCap(SQUARE);

  for (let i = 0; i < rings.length; i++) {
    const r = rings[i];
    const fft = spectrum[i];
     if(spectrum[i] > micThreshold){ // mic/audio threshold
      stroke(r.col + fft/2);
      strokeWeight(r.strokeWeight);
      arc(r.x + i * 2, r.y, r.r+fft/6, r.r+fft/6, r.start-fft/16, r.end+fft/16, OPEN);
      r.movement(fft, 0.05);
    }
  }

}