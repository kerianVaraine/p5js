let mic, fft;
let minFreq = 100;
let maxFreq = 1000;
let frequencyPerSecondTick = 0;
let freqArr; //bin 0-fft,amplitude 0-255
let a = [0,0];

function preload() {
  imgs =[loadImage('pics/lightbulb-dim.png'), loadImage('./pics/lightbulb-bright.png')];
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  fill(255);

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function freqPicker(spect){
  let a = spect[0][1];
  
   for (let i = 0; i < 200; i++){
    if(spect[i] >150){
        a = [i, spect[i]];
        break;
    }
   }

  return a;
  
}

function fps(n) {
  return frequencyPerSecondTick++ % n;
}

function draw() {
   background(0);
     let spectrum = fft.analyze(256);
  if(fps(10) == 0){
    freqArr = freqPicker(spectrum);
      // console.log(freqArr);
    }

    // image of lightbulb stays, background changes
    if(typeof freqArr === "undefined" || freqArr[0] < 5){
    } else if (freqArr[0] >= 4) {
      image(imgs[0], windowWidth/4, windowHeight/4, 400, 400);
      tint(255, map(freqArr[0], 4, 30, 0, 256));
    }
      
      
      
    }


  

