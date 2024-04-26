let datastore = {};

let SearchBar;

function setup() {
  createCanvas(windowWidth / 1.2, windowHeight / 1.2);
  background(117, 94, 140, 20);
  GUIApplications();
}

function draw() {
  //background(16,53,95);
  GUI();
}

function GUIApplications()
{
  SearchBar = createInput();
  SearchBar.attribute("placeholder", "Search for account number")
  SearchBar.position(width/5, height/8)
  SearchBar.size(200, 15)
  SearchBar.class("inputForm");

}

function Scrollframe(x=0, y=0)
{
  push();
  translate(x, y)
  noFill();
  stroke(150)
  let backdrop = rect(0, 0, (width/3) - x*2, height - 80)
  fill(255);
  let scroller = rect(width/3.3, 0, 10, (height - 80), 90);
  pop();
}

function GUI()
{
  push();
  stroke(255)
  strokeWeight(5);

  Scrollframe(15, 65);

  //section1
  line(width/3, 0, width/3, height);
  

  //section2
  line(width/1.5, 0, width/1.5, height);


  //section3
  pop();
}
