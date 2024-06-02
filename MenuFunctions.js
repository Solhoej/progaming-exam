function Scrollframe(x=0, y=0) {
    push();
    translate(x, y);
    fill(53, 50, 61);
    stroke(150);
    rect(-x, -y, width/3, height);
    noFill();
    // Adjust the posY parameter based on the scroll position
    displayDatastoreContent(60 - scrollPos);
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

let menuState = true;
let targetX;

function OpenMenu()
{
  menuState = !menuState;

  targetX = menuState ? width * 1.17 : width * 1.07;

  if(menuState)
  {
    backgroundsMenuButton.html("<")
    backgroundsMenuButton.class("button-64");
  }
  else
  {
    backgroundsMenuButton.html(">")
    backgroundsMenuButton.class("button-24");
  }

}

function BackgroundsMenu()
{
  if(!menuState)
  {
    backgroundsMenuButton.position(lerp(backgroundsMenuButton.x, width * 1.07, 0.1), height / 2);
    backgroundSelect.position(lerp(backgroundSelect.x, width * 1.1, 0.1), height/10);
    
    backgroundButton1.position(lerp(backgroundSelect.x, width * 1.1, 0.1), height/10);
    backgroundButton1Img.position(lerp(backgroundSelect.x, width * 1.1, 0.1), height/10);

    backgroundButton2.position(lerp(backgroundSelect.x, width * 1.1, 0.1), height/3.5);
    backgroundButton2Img.position(lerp(backgroundSelect.x, width * 1.1, 0.1), height/3.5);

    backgroundButton3.position(lerp(backgroundSelect.x, width * 1.1, 0.1), height/2.12);
    backgroundButton3Img.position(lerp(backgroundSelect.x, width * 1.1, 0.1), height/2.12);

    backgroundButton4.position(lerp(backgroundSelect.x, width * 1.1, 0.1), height/1.52);
    backgroundButton4Img.position(lerp(backgroundSelect.x, width * 1.1, 0.1), height/1.52);

    backgroundButton5.position(lerp(backgroundSelect.x, width * 1.1, 0.1), height/1.184);
    backgroundButton5Img.position(lerp(backgroundSelect.x, width * 1.1, 0.1), height/1.184);

  }
  else
  {
    backgroundsMenuButton.position(lerp(backgroundsMenuButton.x, width * 1.17, 0.1), height / 2);
    backgroundSelect.position(lerp(backgroundSelect.x, width * 1.2, 0.1), height/10);
    backgroundButton1.position(lerp(backgroundSelect.x, width * 1.2, 0.1), height/10);
    backgroundButton1Img.position(lerp(backgroundSelect.x, width * 1.2, 0.1), height/10);

    backgroundButton2.position(lerp(backgroundSelect.x, width * 1.2, 0.1), height/3.5);
    backgroundButton2Img.position(lerp(backgroundSelect.x, width * 1.2, 0.1), height/3.5);

    backgroundButton3.position(lerp(backgroundSelect.x, width * 1.2, 0.1), height/2.12);
    backgroundButton3Img.position(lerp(backgroundSelect.x, width * 1.2, 0.1), height/2.12);

    backgroundButton4.position(lerp(backgroundSelect.x, width * 1.2, 0.1), height/1.52);
    backgroundButton4Img.position(lerp(backgroundSelect.x, width * 1.2, 0.1), height/1.52);

    backgroundButton5.position(lerp(backgroundSelect.x, width * 1.2, 0.1), height/1.184);
    backgroundButton5Img.position(lerp(backgroundSelect.x, width * 1.2, 0.1), height/1.184);

  }

}

function mouseWheel(event) {
  targetScrollPos += event.delta;
}

function updateScrollPos() {
  scrollPos = lerp(scrollPos, targetScrollPos, 0.1);
}

function mousePressed() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
    if (!sendMoneyOpened)
    {
      account1 = undefined;
      accountOpened = false;
      targetScrollPos = prevScrollTarget;
      console.log("Account1: " + account1);
    } else {
      console.log("Sendmoney is open my g" + " Account1: " + account1);
    }
  }
}