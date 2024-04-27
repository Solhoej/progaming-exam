let datastore = {};

let SearchBar;
let FirstNameBar;
let LastNameBar;
let FakePersonalNumber;
let CreateAccountButton;
let AdressInput;

let account1;
let account2;

function setup() 
{
  createCanvas(windowWidth/1.2, windowHeight/1.2);
  background(127, 94, 145, 25);
  GUIApplications();
}

function draw() 
{
  GUI();
  checkInputs(FirstNameBar.value(), LastNameBar.value(), FakePersonalNumber.value(), AdressInput.value());
}

function displayDatastoreContent(posY=60) {
  for (let key in datastore) {
    let account = datastore[key];
    let accountInfo = `Account Number: ${key}\n`;
    accountInfo += `Name: ${account.accountFirstName} ${account.accountLastName}\n`;
    accountInfo += `CPR Number: ${account.cprNumber}\n`;
    accountInfo += `Address: ${account.address}\n`;
    //accountInfo += `Balance: ${account.balance}\n`;

    fill(60, 60, 60);
    stroke(180)
    rect(width/60 + 20, posY - 20, (width/3) - 120, 90)

    stroke(180)
    strokeWeight(1);
    textAlign(LEFT);
    textSize(16);
    fill(255);
    text(accountInfo, width / 50 + 20, posY);
    posY += 120;
  }
}

function checkInputs(FirstName, LastName, CPRNumber, Adress)
{
  let firstName = FirstName
  let lastName = LastName
  let cprNumber = CPRNumber
  let address = Adress

  if (firstName == "" || lastName == "" || cprNumber == "" || address == "")
  {
    CreateAccountButton.elt.disabled = true;
  }
  else
  {
    CreateAccountButton.elt.disabled = false;
  }
}

function createAccount(FirstName, LastName, CPRNumber, Address, Balance=0)
{
  let newAccount = new Accounts(FirstName, LastName, CPRNumber, Address, Balance);
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

  //Add the account to the datastore with the accountNumber as the keycode
  datastore[key] = newAccount;
  account1 = key;
  print(datastore);
  print(account1);
}

function GUIApplications()
{
  //search
  SearchBar = createInput();
  SearchBar.attribute("placeholder", "Search for account number")
  SearchBar.position(width/5, height/8)
  SearchBar.size(200, 15)
  SearchBar.class("inputForm");

  //forms
  FirstNameBar = createInput();
  FirstNameBar.attribute("placeholder", "Enter first name here")
  FirstNameBar.position(width/1.15, height/6)
  FirstNameBar.size(200, 15)
  FirstNameBar.class("inputForm");

  LastNameBar = createInput();
  LastNameBar.attribute("placeholder", "Enter last name here")
  LastNameBar.position(width/1.15, height/4.8)
  LastNameBar.size(200, 15)
  LastNameBar.class("inputForm");

  FakePersonalNumber = createInput();
  FakePersonalNumber.attribute("placeholder", "Enter CPR-Number")
  FakePersonalNumber.position(width/1.15, height/3.98)
  FakePersonalNumber.size(200, 15)
  FakePersonalNumber.class("inputForm");

  AdressInput = createInput();
  AdressInput.attribute("placeholder", "Enter Adress Name")
  AdressInput.position(width/1.15, height/3.4)
  AdressInput.size(200, 15)
  AdressInput.class("inputForm");

  CreateAccountButton = createButton("Create Account")
  CreateAccountButton.position(width/1.15, height/2.8)
  CreateAccountButton.size(230, 25)
  CreateAccountButton.class("button-64");
  CreateAccountButton.elt.disabled = true;
  CreateAccountButton.mousePressed(CreateButtonFunction);
}

function CreateButtonFunction() 
{
  console.log("Hello")
  createAccount(FirstNameBar.value(), LastNameBar.value(), FakePersonalNumber.value(), AdressInput.value());
}

function Scrollframe(x=0, y=0)
{
  //displayer alle kontoerne i en scroll frame
  push();
  translate(x, y)
  noFill();
  stroke(150)
  let backdrop = rect(0, 0, (width/3) - x*2, height - 80)
  fill(255);
  let scroller = rect(width/3.3, 0, 10, (height - 80), 90);
  displayDatastoreContent();
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
