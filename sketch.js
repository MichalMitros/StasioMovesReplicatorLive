let video;
let poseNet;
let pose;
let output = [];
let stasio;
let scl;

// function preload() {
//   video = createVideo("./fox_source.mov");
// }

function setup() {
  
  video = createCapture(0);
  video.hide();
  video.volume(0);
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  output.push({
    poses: [],
    isAnimated: false,
    animation_steps: 0
  });
  
  createCanvas(4*video.width, video.height*3);
  console.log(video.width);
  scl = height/16.5;
  stasio = new Stasio(output, height/16.5);
}

function draw() {
  background(0);
  image(video, 0, 0);

  if(pose) {
    // console.log(output);
    let bottomX = (pose.leftHip.x+pose.rightHip.x)/2;
    let shoulderX = 0.6 * (bottomX - pose.nose.x);
    let bottomY = (pose.leftHip.y+pose.rightHip.y)/2;
    let shoulderY = 0.6 * (bottomY - pose.nose.y);
    strokeWeight(2);
    stroke(0, 255, 0);
    line(pose.leftShoulder.x, pose.leftShoulder.y, pose.rightShoulder.x, pose.rightShoulder.y);
    line(pose.leftShoulder.x, pose.leftShoulder.y, pose.leftElbow.x, pose.leftElbow.y);
    line(pose.leftElbow.x, pose.leftElbow.y, pose.leftWrist.x, pose.leftWrist.y);
    line(pose.rightShoulder.x, pose.rightShoulder.y, pose.rightElbow.x, pose.rightElbow.y);
    line(pose.rightElbow.x, pose.rightElbow.y, pose.rightWrist.x, pose.rightWrist.y);
    line(pose.leftShoulder.x, pose.leftShoulder.y, pose.leftHip.x, pose.leftHip.y);
    line(pose.leftHip.x, pose.leftHip.y, pose.rightHip.x, pose.rightHip.y);
    line(pose.rightHip.x, pose.rightHip.y, pose.rightShoulder.x, pose.rightShoulder.y);
    line(pose.leftHip.x, pose.leftHip.y, pose.leftKnee.x, pose.rightKnee.y);
    line(pose.leftKnee.x, pose.rightKnee.y, pose.leftAnkle.x, pose.leftAnkle.y);
    line(pose.rightHip.x, pose.rightHip.y, pose.rightKnee.x, pose.rightKnee.y);
    line(pose.rightKnee.x, pose.rightKnee.y, pose.rightAnkle.x, pose.rightAnkle.y);
    line(pose.nose.x, pose.nose.y, (pose.leftShoulder.x+pose.rightShoulder.x)/2, (pose.leftShoulder.y+pose.rightShoulder.y)/2);
    fill(0, 255, 0);
    stroke(255);
    strokeWeight(3);
    ellipse(pose.nose.x, pose.nose.y, 8);
    ellipse(pose.leftShoulder.x, pose.leftShoulder.y, 8);
    ellipse(pose.rightShoulder.x, pose.rightShoulder.y, 8);
    ellipse(pose.leftElbow.x, pose.leftElbow.y, 8);
    ellipse(pose.rightElbow.x, pose.rightElbow.y, 8);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 8);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 8);
    ellipse(pose.leftHip.x, pose.leftHip.y, 8);
    ellipse(pose.rightHip.x, pose.rightHip.y, 8);
    ellipse(pose.leftKnee.x, pose.rightKnee.y, 8);
    ellipse(pose.rightKnee.x, pose.rightKnee.y, 8);
    ellipse(pose.leftAnkle.x, pose.leftAnkle.y, 8);
    ellipse(pose.rightAnkle.x, pose.rightAnkle.y, 8);

    
    scale(2, 1);
    let p = {
      // left_arm_shoulder_x: ((pose.leftShoulder.x+pose.rightShoulder.x)/2 - width/2) / (height/16.5),
      left_arm_shoulder_x: (pose.nose.x + shoulderX - width/2) / (height/16.5),
      // left_arm_shoulder_y: ((pose.leftShoulder.y+pose.rightShoulder.y)/2 - height/2) / (height/16.5) + 2,
      left_arm_shoulder_y: (pose.nose.y + shoulderY - height/2) / (height/16.5),
      left_arm_elbow_x: (pose.leftElbow.x - width/2) / (height/16.5),
      left_arm_elbow_y: (pose.leftElbow.y - height/2) / (height/16.5)+1,
      left_arm_hand_x: (pose.leftWrist.x - width/2) / (height/16.5),
      left_arm_hand_y: (pose.leftWrist.y - height/2) / (height/16.5)+1,
      right_arm_shoulder_x: (pose.nose.x + shoulderX - width/2) / (height/16.5),
      right_arm_shoulder_y: (pose.nose.y + shoulderY - height/2) / (height/16.5),
      right_arm_elbow_x: (pose.rightElbow.x - width/2) / (height/16.5),
      right_arm_elbow_y: (pose.rightElbow.y - height/2) / (height/16.5)+0.5,
      right_arm_hand_x: (pose.rightWrist.x - width/2) / (height/16.5),
      right_arm_hand_y: (pose.rightWrist.y - height/2) / (height/16.5)+0.5,
      left_leg_hip_x: ((pose.leftHip.x+pose.rightHip.x)/2 - width/2) / (height/16.5),
      left_leg_hip_y: ((pose.leftHip.y+pose.rightHip.y)/2 - height/2) / (height/16.5) + 3,
      left_leg_knee_x: (pose.leftKnee.x - width/2) / (height/16.5),
      left_leg_knee_y: (pose.leftKnee.y - height/2) / (height/16.5) + 1.25,
      left_leg_foot_x: (pose.leftAnkle.x - width/2) / (height/16.5) + 0.25,
      left_leg_foot_y: (pose.leftAnkle.y - height/2) / (height/16.5) + 0.5,
      right_leg_hip_x: ((pose.leftHip.x+pose.rightHip.x)/2 - width/2) / (height/16.5),
      right_leg_hip_y: ((pose.leftHip.y+pose.rightHip.y)/2 - height/2) / (height/16.5) + 3,
      right_leg_knee_x: (pose.rightKnee.x - width/2) / (height/16.5),
      right_leg_knee_y: (pose.rightKnee.y - height/2) / (height/16.5) + 1.25,
      right_leg_foot_x: (pose.rightAnkle.x - width/2) / (height/16.5) - 0.25,
      right_leg_foot_y: (pose.rightAnkle.y - height/2) / (height/16.5) + 0.5,
      body_bottom_x: ((pose.leftHip.x+pose.rightHip.x)/2 - width/2) / (height/16.5),
      body_bottom_y: ((pose.leftHip.y+pose.rightHip.y)/2 - height/2) / (height/16.5) + 3,
      body_top_x: (pose.nose.x - width/2) / (height/16.5),
      body_top_y: (pose.nose.y - height/2) / (height/16.5),
      head_center_x: (pose.nose.x - width/2) / (height/16.5),
      head_center_y: (pose.nose.y - height/2) / (height/16.5),
    };
    scale(0.5, 1);
    translate(width, height/2);
    if(stasio) {
      stasio.show_pose(p);
    }
    strokeWeight(1);
  }
}

function gotPoses(poses) {
  if(poses.length > 0) {
    pose = poses[0].pose;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}
