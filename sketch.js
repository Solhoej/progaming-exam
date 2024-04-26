let datastore = {};

function setup() {
  createCanvas(400, 400);
}

function draw() {
  //background(16,53,95);
  GUI();
}

function GUI()
{
  push();
  stroke(255)
  strokeWeight(5);

  //section1
  line(width/3, 0, width/3, height);
  

  //section2
  line(width/1.5, 0, width/1.5, height);


  //section3
  pop();
}