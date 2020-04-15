class Stasio {

    constructor(dances, scale) {
      this.dances = dances;
      this.scale = scale;
      this.present_dance = floor(random(0, this.dances.length));
      this.present_pose = 0;
      this.prev = undefined;
      this.pres = undefined;
      this.step = 0;
      this.isAnimated = false;
      this.dance_history = [];
      this.dance_history.push(this.present_dance);
    }
  
    nextDance() {
      this.prev = this.dances[this.present_dance].poses[this.present_pose];
      if(this.dances.length > 6) {
        let possible_dances = [];
        for(let i=0; i<this.dances.length; i++) {
          if(!this.dance_history.includes(i)) {
            possible_dances.push(i);
          }
        }
        this.present_dance = random(possible_dances);
        // while(this.dance_history.includes(this.present_dance)) {
        //   this.present_dance = floor(random(0, this.dances.length));
        // }
      } else if(dances.length > 1) {
        let id = this.present_dance;
        while((this.present_dance = floor(random(0, this.dances.length))) === id);
      }
  
      if(this.dance_history.length > 3) {
        this.dance_history.splice(0, 1);
      }
      this.dance_history.push(this.present_dance);
  
      this.present_pose = 0;
      this.pres = this.dances[this.present_dance].poses[this.present_pose];
      if(this.dances[this.present_dance].isAnimated) {
        this.isAnimated = true;
      }
      counter = 0;
      saveDataToLocalStorage();
      getDataFromLocalStorage();
    }
  
    changeDance() {
      if(random() < dance_frequency_slider.value() && counter > 600) {
        this.nextDance();
      }
    }
  
    changePose() {
      this.prev = this.dances[this.present_dance].poses[this.present_pose];
      this.present_pose++;
      if(this.present_pose == this.dances[this.present_dance].poses.length) {
        this.present_pose = 0;
      }
      this.pres = this.dances[this.present_dance].poses[this.present_pose];
      if(this.dances[this.present_dance].isAnimated) {
        this.isAnimated = true;
      }
      saveDataToLocalStorage();
    }
  
    getMultiplier() {
      if(this.dances[this.present_dance].multiplier !== undefined) {
        return this.dances[this.present_dance].multiplier;
      }
      return 1;
    }
  
    animate() {
      if(this.step < this.dances[this.present_dance].animation_steps) {
  
        let pose = {
          left_arm_shoulder_x: this.prev.left_arm_shoulder_x + this.step*((this.pres.left_arm_shoulder_x-this.prev.left_arm_shoulder_x)/this.dances[this.present_dance].animation_steps),
          left_arm_shoulder_y: this.prev.left_arm_shoulder_y + this.step*((this.pres.left_arm_shoulder_y-this.prev.left_arm_shoulder_y)/this.dances[this.present_dance].animation_steps),
          left_arm_elbow_x: this.prev.left_arm_elbow_x + this.step*((this.pres.left_arm_elbow_x-this.prev.left_arm_elbow_x)/this.dances[this.present_dance].animation_steps),
          left_arm_elbow_y: this.prev.left_arm_elbow_y + this.step*((this.pres.left_arm_elbow_y-this.prev.left_arm_elbow_y)/this.dances[this.present_dance].animation_steps),
          left_arm_hand_x: this.prev.left_arm_hand_x + this.step*((this.pres.left_arm_hand_x-this.prev.left_arm_hand_x)/this.dances[this.present_dance].animation_steps),
          left_arm_hand_y: this.prev.left_arm_hand_y + this.step*((this.pres.left_arm_hand_y-this.prev.left_arm_hand_y)/this.dances[this.present_dance].animation_steps),
          right_arm_shoulder_x: this.prev.right_arm_shoulder_x + this.step*((this.pres.right_arm_shoulder_x-this.prev.right_arm_shoulder_x)/this.dances[this.present_dance].animation_steps),
          right_arm_shoulder_y: this.prev.right_arm_shoulder_y + this.step*((this.pres.right_arm_shoulder_y-this.prev.right_arm_shoulder_y)/this.dances[this.present_dance].animation_steps),
          right_arm_elbow_x: this.prev.right_arm_elbow_x + this.step*((this.pres.right_arm_elbow_x-this.prev.right_arm_elbow_x)/this.dances[this.present_dance].animation_steps),
          right_arm_elbow_y: this.prev.right_arm_elbow_y + this.step*((this.pres.right_arm_elbow_y-this.prev.right_arm_elbow_y)/this.dances[this.present_dance].animation_steps),
          right_arm_hand_x: this.prev.right_arm_hand_x + this.step*((this.pres.right_arm_hand_x-this.prev.right_arm_hand_x)/this.dances[this.present_dance].animation_steps),
          right_arm_hand_y: this.prev.right_arm_hand_y + this.step*((this.pres.right_arm_hand_y-this.prev.right_arm_hand_y)/this.dances[this.present_dance].animation_steps),
          left_leg_hip_x: this.prev.left_leg_hip_x + this.step*((this.pres.left_leg_hip_x-this.prev.left_leg_hip_x)/this.dances[this.present_dance].animation_steps),
          left_leg_hip_y: this.prev.left_leg_hip_y + this.step*((this.pres.left_leg_hip_y-this.prev.left_leg_hip_y)/this.dances[this.present_dance].animation_steps),
          left_leg_knee_x: this.prev.left_leg_knee_x + this.step*((this.pres.left_leg_knee_x-this.prev.left_leg_knee_x)/this.dances[this.present_dance].animation_steps),
          left_leg_knee_y: this.prev.left_leg_knee_y + this.step*((this.pres.left_leg_knee_y-this.prev.left_leg_knee_y)/this.dances[this.present_dance].animation_steps),
          left_leg_foot_x: this.prev.left_leg_foot_x + this.step*((this.pres.left_leg_foot_x-this.prev.left_leg_foot_x)/this.dances[this.present_dance].animation_steps),
          left_leg_foot_y: this.prev.left_leg_foot_y + this.step*((this.pres.left_leg_foot_y-this.prev.left_leg_foot_y)/this.dances[this.present_dance].animation_steps),
          right_leg_hip_x: this.prev.right_leg_hip_x + this.step*((this.pres.right_leg_hip_x-this.prev.right_leg_hip_x)/this.dances[this.present_dance].animation_steps),
          right_leg_hip_y: this.prev.right_leg_hip_y + this.step*((this.pres.right_leg_hip_y-this.prev.right_leg_hip_y)/this.dances[this.present_dance].animation_steps),
          right_leg_knee_x: this.prev.right_leg_knee_x + this.step*((this.pres.right_leg_knee_x-this.prev.right_leg_knee_x)/this.dances[this.present_dance].animation_steps),
          right_leg_knee_y: this.prev.right_leg_knee_y + this.step*((this.pres.right_leg_knee_y-this.prev.right_leg_knee_y)/this.dances[this.present_dance].animation_steps),
          right_leg_foot_x: this.prev.right_leg_foot_x + this.step*((this.pres.right_leg_foot_x-this.prev.right_leg_foot_x)/this.dances[this.present_dance].animation_steps),
          right_leg_foot_y: this.prev.right_leg_foot_y + this.step*((this.pres.right_leg_foot_y-this.prev.right_leg_foot_y)/this.dances[this.present_dance].animation_steps),
          body_top_x: this.prev.body_top_x + this.step*((this.pres.body_top_x-this.prev.body_top_x)/this.dances[this.present_dance].animation_steps),
          body_top_y: this.prev.body_top_y + this.step*((this.pres.body_top_y-this.prev.body_top_y)/this.dances[this.present_dance].animation_steps),
          body_bottom_x: this.prev.body_bottom_x + this.step*((this.pres.body_bottom_x-this.prev.body_bottom_x)/this.dances[this.present_dance].animation_steps),
          body_bottom_y: this.prev.body_bottom_y + this.step*((this.pres.body_bottom_y-this.prev.body_bottom_y)/this.dances[this.present_dance].animation_steps),
          head_center_x: this.prev.head_center_x + this.step*((this.pres.head_center_x-this.prev.head_center_x)/this.dances[this.present_dance].animation_steps),
          head_center_y: this.prev.head_center_y + this.step*((this.pres.head_center_y-this.prev.head_center_y)/this.dances[this.present_dance].animation_steps),
          eyes: this.prev.eyes,
          smile: this.prev.smile
        };
        this.step++;
        this.show_pose(pose);
      }
      if(this.step == this.dances[this.present_dance].animation_steps) {
        this.isAnimated = false;
        this.step = 0;
      }
  
    }
  
    show() {
      let pose = this.dances[this.present_dance].poses[this.present_pose];
  
      strokeWeight(this.scale/7);
      noFill();
      stroke(255);
      if(frameCount < 240) {
        stroke((255/240)*frameCount);
      }
  
      // HANDS
      line(pose.left_arm_shoulder_x*this.scale, pose.left_arm_shoulder_y*this.scale,
           pose.left_arm_elbow_x*this.scale, pose.left_arm_elbow_y*this.scale);
      line(pose.left_arm_elbow_x*this.scale, pose.left_arm_elbow_y*this.scale,
           pose.left_arm_hand_x*this.scale, pose.left_arm_hand_y*this.scale);
      line(pose.right_arm_shoulder_x*this.scale, pose.right_arm_shoulder_y*this.scale,
           pose.right_arm_elbow_x*this.scale, pose.right_arm_elbow_y*this.scale);
      line(pose.right_arm_elbow_x*this.scale, pose.right_arm_elbow_y*this.scale,
           pose.right_arm_hand_x*this.scale, pose.right_arm_hand_y*this.scale);
  
      // LEGS
      line(pose.left_leg_hip_x*this.scale, pose.left_leg_hip_y*this.scale,
           pose.left_leg_knee_x*this.scale, pose.left_leg_knee_y*this.scale);
      line(pose.left_leg_knee_x*this.scale, pose.left_leg_knee_y*this.scale,
           pose.left_leg_foot_x*this.scale, pose.left_leg_foot_y*this.scale);
      line(pose.right_leg_hip_x*this.scale, pose.right_leg_hip_y*this.scale,
           pose.right_leg_knee_x*this.scale, pose.right_leg_knee_y*this.scale);
      line(pose.right_leg_knee_x*this.scale, pose.right_leg_knee_y*this.scale,
           pose.right_leg_foot_x*this.scale, pose.right_leg_foot_y*this.scale);
  
      // BODY AND HEAD
      line(pose.body_top_x*this.scale, pose.body_top_y*this.scale,
           pose.body_bottom_x*this.scale, pose.body_bottom_y*this.scale);
      ellipse(pose.head_center_x*this.scale, pose.head_center_y*this.scale,
              this.scale*4, this.scale*4);
  
      // FACE
      if(pose.smile !== undefined) {
        pose.smile(this.scale, pose.head_center_x, pose.head_center_y);
      } else {
        this.default_smile(this.scale, pose.head_center_x, pose.head_center_y);
      }
      if(pose.eyes !== undefined) {
        pose.eyes(this.scale, pose.head_center_x, pose.head_center_y);
      } else {
        this.default_eyes(this.scale, pose.head_center_x, pose.head_center_y);
      }
    }
  
    show_pose(pose) {
      strokeWeight(this.scale/7);
      noFill();
      stroke(255);
  
      fill(0);
      // BODY AND HEAD
      line(pose.body_top_x*this.scale, pose.body_top_y*this.scale,
           pose.body_bottom_x*this.scale, pose.body_bottom_y*this.scale);
      ellipse(pose.head_center_x*this.scale, pose.head_center_y*this.scale,
              this.scale*3.5, this.scale*3.5);
      // HANDS
      line(pose.left_arm_shoulder_x*this.scale, pose.left_arm_shoulder_y*this.scale,
           pose.left_arm_elbow_x*this.scale, pose.left_arm_elbow_y*this.scale);
      line(pose.left_arm_elbow_x*this.scale, pose.left_arm_elbow_y*this.scale,
           pose.left_arm_hand_x*this.scale, pose.left_arm_hand_y*this.scale);
      line(pose.right_arm_shoulder_x*this.scale, pose.right_arm_shoulder_y*this.scale,
           pose.right_arm_elbow_x*this.scale, pose.right_arm_elbow_y*this.scale);
      line(pose.right_arm_elbow_x*this.scale, pose.right_arm_elbow_y*this.scale,
           pose.right_arm_hand_x*this.scale, pose.right_arm_hand_y*this.scale);
  
      // LEGS
      line(pose.left_leg_hip_x*this.scale, pose.left_leg_hip_y*this.scale,
           pose.left_leg_knee_x*this.scale, pose.left_leg_knee_y*this.scale);
      line(pose.left_leg_knee_x*this.scale, pose.left_leg_knee_y*this.scale,
           pose.left_leg_foot_x*this.scale, pose.left_leg_foot_y*this.scale);
      line(pose.right_leg_hip_x*this.scale, pose.right_leg_hip_y*this.scale,
           pose.right_leg_knee_x*this.scale, pose.right_leg_knee_y*this.scale);
      line(pose.right_leg_knee_x*this.scale, pose.right_leg_knee_y*this.scale,
           pose.right_leg_foot_x*this.scale, pose.right_leg_foot_y*this.scale);
      
      
  
      // FACE
      if(pose.smile !== undefined) {
        pose.smile(this.scale, pose.head_center_x, pose.head_center_y);
      } else {
        this.default_smile(this.scale, pose.head_center_x, pose.head_center_y);
      }
      if(pose.eyes !== undefined) {
        pose.eyes(this.scale, pose.head_center_x, pose.head_center_y);
      } else {
        this.default_eyes(this.scale, pose.head_center_x, pose.head_center_y);
      }
  
    }
  
    default_smile(scale, head_center_x, head_center_y) {
      strokeWeight(scl/13);
      line((head_center_x-0.25)*scl, (head_center_y+1.25)*scl, (head_center_x+0.25)*scl, (head_center_y+1.25)*scl);
    }
  
    default_eyes(scale, head_center_x, head_center_y) {
      strokeWeight(scl/6);
      point((head_center_x-0.9)*scl, (head_center_y-0.5)*scl);
      point((head_center_x+0.9)*scl, (head_center_y-0.5)*scl);
    }
  }