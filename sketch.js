let datastore = {};

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function createAccount()
{
  let newAccount = new Accounts("Lars", "Mikkelsen", "2004006969", "Squidgame Street 69", 10);
  newAccount.accountRegistration();
  let key = newAccount.accountNumber;

  for (let i = 0; i < datastore.length; i++)
  {
    existingKeys = datastore[i];
    while (key == existingKeys)
    {
      newAccount.accountNumberGeneration();
    }
  }

  datastore[key] = newAccount;
  print(datastore);
}

function GUIApplications()
{
  SearchBar = createInput();
  SearchBar.attribute("placeholder", "Search for account number")
  SearchBar.position(width/6, height/7)
  SearchBar.size(200, 15)

}

function Scrollframe(x=0, y=0)
{
  push();
  translate(x, y)
  noFill();
  let backdrop = rect(0, 0, width/3, height)
  fill(255);
  let scroller = rect(width/3.10, 0, 10, height, 90);
  pop();
}

function GUI()
{
  push();
  stroke(255)
  strokeWeight(5);

  Scrollframe();

  //section1
  line(width/3, 0, width/3, height);
  

  //section2
  line(width/1.5, 0, width/1.5, height);


  //section3
  pop();
}
