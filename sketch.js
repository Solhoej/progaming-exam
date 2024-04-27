let datastore = {};

let SearchBar;
let FirstNameBar;
let LastNameBar;
let FakePersonalNumber;
let CreateAccountButton;
let AdressInput;
let errorOutput;
let deleteAccountButton;

let startTime;
let waitTime = 5000;

let r1 = 60;
let g1 = 60;
let b1 = 60;

//decides which accounts to be displayed in the middle display
let account1;

let hideAlpha = 0;

let scrollPos = 0;

function setup() 
{
  createCanvas(windowWidth/1.2, windowHeight/1.2);
  background(127, 94, 145, 25);

  let savedData = localStorage.getItem('datastore');
  if (savedData) 
  {
    datastore = JSON.parse(savedData);
  }

  GUIApplications();
  console.log(Object.keys(datastore).length);
}

function draw() 
{
  GUI();
  checkInputs(FirstNameBar.value(), LastNameBar.value(), FakePersonalNumber.value(), AdressInput.value());
  displaySelectedAccount();
}

function displayDatastoreContent(posY=60) {
  let searchString = SearchBar.value().toLowerCase().replace(/\s/g, '');
  for (let key in datastore) {
    let account = datastore[key];
    let fullName = `${account.accountLastName}${account.accountFirstName}`.toLowerCase().replace(/\s/g, '');
    if (fullName.includes(searchString)) {
      let accountInfo = `Account Number: ${key}\n`;
      accountInfo += `Name: ${account.accountLastName} ${account.accountFirstName}\n`;
      accountInfo += `CPR Number: ${account.cprNumber}\n`;
      accountInfo += `Address: ${account.address}\n`;
      
      fill(r1, g1, b1);
      stroke(180);
      strokeWeight(1);
      rect(width/60 + 20, posY - 20, (width/3) - 120, 90);

      stroke(180);
      strokeWeight(1);
      textAlign(LEFT);
      textSize(16);
      fill(255);
      text(accountInfo, width / 50 + 20, posY);
      posY += 140;
    }
  }
}

function displaySelectedAccount()
{
  if(account1)
  {
    let ControlVariable

    if(int(datastore[account1].creationDate[3]) < 10)
    {
      ControlVariable = "0";
    }
    else
    {
      ControlVariable = "";
    }

    AccountNameInfo.html(datastore[account1].accountFirstName + " " + datastore[account1].accountLastName);
    AccountNumberInfo.html(datastore[account1].bankAddress + datastore[account1].accountNumber);
    AccountcprNumberInfo.html(datastore[account1].cprNumber)
    AccountAddressInfo.html(datastore[account1].address)
    AccountCreationdateInfo.html(datastore[account1].creationDate[0] + ":" + datastore[account1].creationDate[1] + " / " + datastore[account1].creationDate[2] + "-" + ControlVariable + datastore[account1].creationDate[3] + "-" + datastore[account1].creationDate[4])
    AccountHistoryInfo.html(datastore[account1].accountHistory)
  }
}

function deleteSelectedAccount() {
  if (account1) {
    delete datastore[account1];
    account1 = undefined;
  }

  localStorage.setItem('datastore', JSON.stringify(datastore));
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
    errorOutput.show();
  }
  else
  {
    CreateAccountButton.elt.disabled = false;
    errorOutput.hide();
  }

  if (!account1)
  {
    deleteAccountButton.hide()
    AccountNameInfo.hide()
    AccountNumberInfo.hide()
    AccountcprNumberInfo.hide()
    AccountAddressInfo.hide()
    AccountCreationdateInfo.hide()
    AccountHistoryInfo.hide()
  }
  else
  {
    deleteAccountButton.show();
    AccountNameInfo.show()
    AccountNumberInfo.show()
    AccountcprNumberInfo.show()
    AccountAddressInfo.show()
    AccountCreationdateInfo.show()
  }

  if (millis() - startTime >= waitTime) {
    errorOutput.html("You need to fill out all of the forms!")
    errorOutput.style('color', 'red');
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

  scrollPos = 0;

  //Add the account to the datastore with the accountNumber as the keycode
  datastore[key] = newAccount;
  account1 = key;

  localStorage.setItem('datastore', JSON.stringify(datastore));
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
  FirstNameBar.position(width/1.25, height/6)
  FirstNameBar.size(width/3.9, height/15)
  FirstNameBar.class("inputForm");
  FirstNameBar.style('font-size', '20px');

  LastNameBar = createInput();
  LastNameBar.attribute("placeholder", "Enter last name here")
  LastNameBar.position(width/1.25, height/4)
  LastNameBar.size(width/3.9, height/15)
  LastNameBar.class("inputForm");
  LastNameBar.style('font-size', '20px');

  FakePersonalNumber = createInput();
  FakePersonalNumber.attribute("placeholder", "Enter CPR-Number")
  FakePersonalNumber.position(width/1.25, height/3)
  FakePersonalNumber.size(width/3.9, height/15)
  FakePersonalNumber.class("inputForm");
  FakePersonalNumber.style('font-size', '20px');

  AdressInput = createInput();
  AdressInput.attribute("placeholder", "Enter Adress Name")
  AdressInput.position(width/1.25, height/2.4)
  AdressInput.size(width/3.9, height/15)
  AdressInput.class("inputForm");
  AdressInput.style('font-size', '20px');

  CreateAccountButton = createButton("Create Account")
  CreateAccountButton.position(width/1.25, height/2)
  CreateAccountButton.size(width/3.65, height/15)
  CreateAccountButton.class("button-64");
  CreateAccountButton.elt.disabled = true;
  CreateAccountButton.mousePressed(CreateButtonFunction);

  errorOutput = createP("You need to fill out all of the forms!");
  errorOutput.position(width/1.25, height/1.8)
  errorOutput.style('font-size', '30px');
  errorOutput.style('color', 'red');
  errorOutput.hide();

  deleteAccountButton = createButton("Delete Account")
  deleteAccountButton.position(width/2.15, height)
  deleteAccountButton.size(width/3.65, height/15)
  deleteAccountButton.class("button-24");
  deleteAccountButton.hide();
  deleteAccountButton.mousePressed(deleteSelectedAccount);

  AccountNameInfo = createP("Name");
  AccountNameInfo.position(width/1.73, height/13)
  AccountNameInfo.style('font-size', '30px');
  AccountNameInfo.style('color', 'white');
  //AccountNameInfo.hide();

  AccountNumberInfo = createP("Account Number");
  AccountNumberInfo.position(width/1.73, height/7)
  AccountNumberInfo.style('font-size', '10px');
  AccountNumberInfo.style('color', 'white');
  //AccountNumberInfo.hide();

  AccountcprNumberInfo = createP("CPR number");
  AccountcprNumberInfo.position(width/2.25, height/5)
  AccountcprNumberInfo.style('font-size', '30px');
  AccountcprNumberInfo.style('color', 'white');
  //AccountcprNumberInfo.hide();

  AccountAddressInfo = createP("Address");
  AccountAddressInfo.position(width/2.25, height/4)
  AccountAddressInfo.style('font-size', '30px');
  AccountAddressInfo.style('color', 'white');
  //AccountcprNumberInfo.hide();

  AccountCreationdateInfo = createP("Hour:Minute / Day-Month-Year");
  AccountCreationdateInfo.position(width/2.25, height/3.3)
  AccountCreationdateInfo.style('font-size', '30px');
  AccountCreationdateInfo.style('color', 'white');
  //AccountCreationdateInfo.hide();

  AccountHistoryInfo = createP("History");
  AccountHistoryInfo.position(width/2.25, height/2.8)
  AccountHistoryInfo.style('font-size', '30px');
  AccountHistoryInfo.style('color', 'white');
  //AccountHistoryInfo.hide();
}

function CreateButtonFunction() 
{
  console.log("Hello")
  startTime = millis();
  createAccount(FirstNameBar.value(), LastNameBar.value(), FakePersonalNumber.value(), AdressInput.value());
  FirstNameBar.value("")
  LastNameBar.value("")
  FakePersonalNumber.value("")
  AdressInput.value("")
  errorOutput.html("Succesfully Created Account")
  errorOutput.style('color', 'green');
}

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

function mouseWheel(event) {
  scrollPos += event.delta;
}

function mousePressed()
{
  if(mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)
  {
    account1 = undefined;
    console.log(account1)
  }

  if (mouseX < width / 3 && mouseY > 60) {
    let posY = 60 - scrollPos;
    for (let key in datastore) {
      if (mouseY > posY && mouseY < posY + 140) {
        account1 = key;
        return; // Exit the loop once account1 is set
      }
      posY += 140;
    }
  }

}