let video;
let poseNet;
let poses = [];
let noseX=0;
let noseY=0;


function setup() {
  createCanvas(640, 480);
  background(0);
video = createCapture(VIDEO);
video.hide();
angleMode(DEGREES);

poseNet=ml5.poseNet(video,{outputStride:8, quantBytes:4}, modelReady);
poseNet.on('pose',function(results) {
  poses = results;
});
}

function modelReady(){
  console.log('modelReady');
}

// function gotPoses(poses) {
//   console.log(poses);
//   if(poses.length > 0){
//     let newX1=poses[0].pose.keypoints[0].position.x;
//     let newY1=poses[0].pose.keypoints[0].position.y;
//     noseX=lerp(noseX,newX1,0.5);
//     noseY=lerp(noseY,newY1,0.5);
//   }
// }

function mousePressed(){
  console.log(JSON.stringify(poses))
}

function draw() {
  background(255);

  push();
  // flip web camera feed
  translate(video.width, 0);
  scale(-1,1);
  //
  image(video, 0, 0, width, height);
  drawKeypoints();
  drawSkeleton();
  pop();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  if(poses.length > 0){
    const pose = poses[0].pose;
    for (let j = 0; j < pose.keypoints.length; j += 1) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      const keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.
      if (keypoint.score > 0.5) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  if(poses.length >0){
    const skeleton = poses[0].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j += 1) {
      const partA = skeleton[j][0];
      const partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
  }