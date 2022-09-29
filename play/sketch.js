let mic, fft;
let minFreq = 100;
let maxFreq = 1000;
let frequencyPerSecondTick = 0;
let a = [0,0];

let rings = [];

function prroad() {
}

function fps(n) {
  return frequencyPerSecondTick++ % n;
}

let ring = function(x, y, r, speed) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.col = 0;
  this.start=0;
  this.end=45;
  //hold init start and end
  this._start =this.start;
  this._end= this.end;
  this.speed = speed;
  this.cSpeed = function(fft) {
    return this.speed /2 * (fft / 1000);
  };
  this.movement = function(fft, constant) {
    this.start += constant + this.cSpeed(fft);
    this.end += constant + this.cSpeed(fft);
  };
}

let ringGroup = function(){

}


let makeRings = function(num, x, y, r, speed) {
  this.rings = [];
  for(let i = 0; i < num; i++) {
    this.rings.push(new ring(x + i * 5, y, (r * i + r), (i * speed + 1)));
  }
return this.rings;
}
// offset rings with x + i * 5 for coolness...



function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(0,5);
  fill(255);

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  
  rings = makeRings(30, width/2 - 75, height/2, 20, 1);
}

function draw() {
  background(0);

  spectrum = fft.analyze(256);
  
  noFill();
  strokeCap(SQUARE);

  for (let i = 0; i < rings.length; i++) {
    const r = rings[i];
    const fft = spectrum[i];
    stroke(r.col + fft);  
    strokeWeight(3);
    arc(r.x, r.y, r.r, r.r, r.start, r.end, OPEN);
    r.movement(fft, 0.05);
  }
}