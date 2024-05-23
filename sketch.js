let datastore = {};

let SearchBar;
let FirstNameBar;
let LastNameBar;
let FakePersonalNumber;
let CreateAccountButton;
let AdressInput;
let errorOutput;
let deleteAccountButton;

let MoneyAccountInput;

let AddMoneyButton;
let SubMoneyButton;

let SendMoneyButton;

let backgroundsMenuButton;

let SendMoneySelect;

let startTime;
let waitTime = 5000;

let r1 = 60;
let g1 = 60;
let b1 = 60;

//decides which accounts to be displayed in the middle display
let account1;
let accountToTransfer;
let accountFromTransfer;

let targetedAccount;

let backgroundSelect;

let hideAlpha = 0;

//determines the scroll position
let scrollPos = 0;

function setup() 
{
  createCanvas(windowWidth/1.2, windowHeight/1.2);
  background(127, 94, 145, 25);

  //create a localStorage to save our datastore
  let savedData = localStorage.getItem('datastore');
  if (savedData) 
  {
    //if theres already data then we will throw that data into our datastore table
    datastore = JSON.parse(savedData);
  }

  //setting up guis
  GUIApplications();
  //console.log(Object.keys(datastore).length);
  //noCursor();

}

function draw() 
{
  //making everything work repeatedly
  GUI();
  checkInputs(FirstNameBar.value(), LastNameBar.value(), FakePersonalNumber.value(), AdressInput.value());
  displaySelectedAccount();
  BackgroundsMenu();
  updateScrollPos();
  accountToTransfer = SendMoneySelect.value();
  if(account1 && datastore[account1].cprNumber == "Admin")
  {
    datastore[account1].isAdmin = true;
  }

}

function hideCursor() {
  document.body.style.cursor = 'none';
}

function showCursor() {
  document.body.style.cursor = 'pointer';
}

function displayDatastoreContent(posY=60) {
  //we will declare what the user has searched
  let searchString = SearchBar.value().toLowerCase().replace(/\s/g, '');
  let searchStringNumber = SearchBar.value().toLowerCase().replace(/\s/g, '');
  let searchStringAddress = SearchBar.value().toLowerCase().replace(/\s/g, '');
  //we will loop through all our keys
  for (let key in datastore) {
    //declare current account
    let account = datastore[key];
    //we will declare what we want to search for
    let fullName = `${account.accountLastName}${account.accountFirstName}`.toLowerCase().replace(/\s/g, '');
    let accountNumber = account.accountNumber.toLowerCase().replace(/\s/g, '');
    let accountAddress = account.address.toLowerCase().replace(/\s/g, '');

    //if what we want to search for has whatever the user has searched then
    if (fullName.includes(searchString) || accountNumber.includes(searchStringNumber) || accountAddress.includes(searchStringAddress)) {
      //we will declare the accounts info and put the string together
      let accountInfo = `Account Number: ${key}\n`;
      accountInfo += `Name: ${account.accountLastName} ${account.accountFirstName}\n`;
      accountInfo += `CPR Number: ${account.cprNumber}\n`;
      accountInfo += `Address: ${account.address}\n`;
      
      //change the color of the button depending on the users behavior
      if(mouseX > (width/60) + 40 && mouseX < (width/60 + 20) + (width/3) - 95 && mouseY > posY + 50 && mouseY < posY + 145)
      {
        fill(44,48,61);
        stroke(180, 5, 5);
        strokeWeight(5);
        if(mouseIsPressed)
        {
          fill(40, 45, 48);
          stroke(5, 180, 5);
          strokeWeight(5);
          account1 = key;
        }
      }
      else
      {
        fill(r1, g1, b1);
        stroke(180);
        strokeWeight(1);
      }
      
      rect(width/60 + 20, posY - 20, (width/3) - 120, 90);

      stroke(180);
      strokeWeight(1);
      textAlign(LEFT);
      textSize(16);
      fill(255);

      //here we display the info string
      text(accountInfo, width / 50 + 20, posY);
      posY += 140;
    }
  }
}

function displaySelectedAccount()
{
  //if we have a selected account then
  if(account1)
  {
    //this is just to check if our month is less than 10
    let ControlVariable;
    let ControlVariable2;
    let ControlVariable3;

    if(int(datastore[account1].creationDate[3]) < 10)
    {
      ControlVariable = "0";
    }
    else
    {
      ControlVariable = "";
    }

    if(int(datastore[account1].creationDate[0]) < 10)
    {
      ControlVariable2 = "0";
    }
    else
    {
      ControlVariable2 = "";
    }

    if(int(datastore[account1].creationDate[1]) < 10)
    {
      ControlVariable3 = "0";
    }
    else
    {
      ControlVariable3 = "";
    }

    //we will change the html of our dom objects to the accounts info
    AccountNameInfo.html(datastore[account1].accountFirstName + " " + datastore[account1].accountLastName);
    AccountNumberInfo.html(datastore[account1].bankAddress + datastore[account1].accountNumber);
    AccountcprNumberInfo.html(datastore[account1].cprNumber)
    AccountAddressInfo.html(datastore[account1].address)
    AccountCreationdateInfo.html(ControlVariable2 + datastore[account1].creationDate[0] + ":" + ControlVariable3 + datastore[account1].creationDate[1] + " / " + datastore[account1].creationDate[2] + "-" + ControlVariable + datastore[account1].creationDate[3] + "-" + datastore[account1].creationDate[4])
    //AccountHistoryInfo.html(datastore[account1].accountHistory)

    let history = datastore[account1].accountHistory;
    let formattedHistory = '';

    for (let [key, value] of Object.entries(history)) {
        formattedHistory += `Transaction ${key}: ${value}<br>`;
    }

    AccountHistoryInfo.html(formattedHistory);

  }
}

function deleteSelectedAccount() {
  //will delete the selected account
  if (account1) {
    delete datastore[account1];
    account1 = undefined;
  }

  //will save the data to the datastore so it stays deleted
  localStorage.setItem('datastore', JSON.stringify(datastore));
}

function checkInputs(FirstName, LastName, CPRNumber, Adress)
{
  //we will check if the user can interact with objects
  let firstName = FirstName
  let lastName = LastName
  let cprNumber = CPRNumber
  let address = Adress

  if(cprNumber == "Admin")
  {
    CreateAccountButton.elt.disabled = false;
    errorOutput.hide();
  }
  else if (firstName == "" || lastName == "" || cprNumber == "" || address == "" || cprNumber.length < 10)
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
    MoneyAccountInput.hide()
    AddMoneyButton.hide()
    SubMoneyButton.hide()
    AccountBalance.hide()
    SendMoneyButton.hide()
  }
  else
  {
    deleteAccountButton.show();
    AccountNameInfo.show()
    AccountNumberInfo.show()
    AccountcprNumberInfo.show()
    AccountAddressInfo.show()
    AccountCreationdateInfo.show()
    AccountHistoryInfo.show();

    if(datastore[account1].isAdmin)
    {
      MoneyAccountInput.show();
      AddMoneyButton.show();
      SubMoneyButton.show();
    }
    else
    {
      MoneyAccountInput.hide()
      AddMoneyButton.hide()
      SubMoneyButton.hide()
      AccountBalance.hide()
    }

    AccountBalance.show();
    SendMoneyButton.show();

    AccountBalance.html("Balance: " + datastore[account1].balance)

  }

  //will wait 3000 milliseconds(3 seconds) then change the dom
  if (millis() - startTime >= waitTime) {
    errorOutput.html("You need to fill out all of the forms!")
    errorOutput.style('color', 'red');
  }

}

function createAccount(FirstName, LastName, CPRNumber, Address, Balance=0)
{
  //we create a new account object
  let newAccount = new Accounts(FirstName, LastName, CPRNumber, Address, Balance);
  //we will registrate the account (meaning that we will generate an account number)
  newAccount.accountRegistration();
  //we will declare our key
  let key = newAccount.accountNumber;

  //we will look through all account and check if the number we generated is already existing
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

  //save the data to the datastore
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
  LastNameBar.position(width/1.25, height/3.8)
  LastNameBar.size(width/3.9, height/15)
  LastNameBar.class("inputForm");
  LastNameBar.style('font-size', '20px');

  FakePersonalNumber = createInput();
  FakePersonalNumber.attribute("placeholder", "Enter CPR-Number")
  FakePersonalNumber.position(width/1.25, height/2.75)
  FakePersonalNumber.size(width/3.9, height/15)
  FakePersonalNumber.class("inputForm");
  FakePersonalNumber.style('font-size', '20px');

  AdressInput = createInput();
  AdressInput.attribute("placeholder", "Enter Adress Name")
  AdressInput.position(width/1.25, height/2.15)
  AdressInput.size(width/3.9, height/15)
  AdressInput.class("inputForm");
  AdressInput.style('font-size', '20px');

  CreateAccountButton = createButton("Create Account")
  CreateAccountButton.position(width/1.25, height/1.75)
  CreateAccountButton.size(width/3.65, height/15)
  CreateAccountButton.class("button-64");
  CreateAccountButton.elt.disabled = true;
  CreateAccountButton.mousePressed(CreateButtonFunction);

  errorOutput = createP("You need to fill out all of the forms!");
  errorOutput.position(width/1.25, height/1.65)
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

  backgroundsMenuButton = createButton("<")
  backgroundsMenuButton.position(width * 1.17 ,height/2)
  backgroundsMenuButton.class("button-64");
  backgroundsMenuButton.style('font-size', '30px');
  backgroundsMenuButton.style('color', 'white');
  backgroundsMenuButton.mousePressed(OpenMenu);

  MoneyAccountInput = createInput(0);
  MoneyAccountInput.attribute("placeholder", "Enter amount");
  MoneyAccountInput.position(width/1.75, height/1.2);
  MoneyAccountInput.class("inputForm");
  MoneyAccountInput.size(75, 30)
  MoneyAccountInput.style('font-size', '30px');
  MoneyAccountInput.style('color', 'white');

  AddMoneyButton = createButton("+")
  AddMoneyButton.position(width/1.57 ,height/1.2)
  AddMoneyButton.class("button-64");
  AddMoneyButton.size(75, 45)
  AddMoneyButton.style('font-size', '30px');
  AddMoneyButton.style('color', 'white');
  AddMoneyButton.mousePressed(AddMoney);

  SubMoneyButton = createButton("-")
  SubMoneyButton.position(width/1.915 ,height/1.2)
  SubMoneyButton.class("button-24");
  SubMoneyButton.size(75, 45)
  SubMoneyButton.style('font-size', '30px');
  SubMoneyButton.style('color', 'white');
  SubMoneyButton.mousePressed(SubMoney);

  AccountBalance = createP(0)
  AccountBalance.position(width/2.25, height/2)
  AccountBalance.style('font-size', '30px');
  AccountBalance.style('color', 'white');

  SendMoneyButton = createButton("Send")
  SendMoneyButton.position(width/1.915 ,height/1.1)
  SendMoneyButton.class("button-642");
  SendMoneyButton.size(260, 40)
  SendMoneyButton.style('font-size', '25px');
  SendMoneyButton.style('color', 'white');
  SendMoneyButton.mousePressed(OpenTransactionMenu);

  backgroundSelect = createImg("assets/morten.jpg");
  backgroundSelect.position(width*1.1, 0);
  backgroundSelect.size(140, height);

  backgroundButton1Img = createImg("assets/Hut.gif");
  backgroundButton1Img.size(145, 145);
  backgroundButton1 = createButton('');
  backgroundButton1.size(145, 145);
  backgroundButton1.position(width*1.1, 0);
  backgroundButton1.elt.style.opacity = '0';
  backgroundButton1.mousePressed(function() {
    document.body.style.backgroundImage = "url('assets/Hut.gif')";
  });

  backgroundButton2Img = createImg("assets/pokemon.gif");
  backgroundButton2Img.size(145, 145);
  backgroundButton2 = createButton('');
  backgroundButton2.size(145, 145);
  backgroundButton2.position(width*1.1, 0);
  backgroundButton2.elt.style.opacity = '0';
  backgroundButton2.mousePressed(function() {
    document.body.style.backgroundImage = "url('assets/pokemon.gif')";
    document.body.style.backgroundSize = "cover";
  });

  backgroundButton3Img = createImg("assets/sunflower.gif");
  backgroundButton3Img.size(145, 145);
  backgroundButton3 = createButton('');
  backgroundButton3.size(145, 145);
  backgroundButton3.position(width*1.1, 0);
  backgroundButton3.elt.style.opacity = '0';
  backgroundButton3.mousePressed(function() {
    document.body.style.backgroundImage = "url('assets/sunflower.gif')";
  });

  backgroundButton4Img = createImg("assets/trees.gif");
  backgroundButton4Img.size(145, 145);
  backgroundButton4 = createButton('');
  backgroundButton4.size(145, 145);
  backgroundButton4.position(width*1.1, 0);
  backgroundButton4.elt.style.opacity = '0';
  backgroundButton4.mousePressed(function() {
    document.body.style.backgroundImage = "url('assets/trees.gif')";
  });

  backgroundButton5Img = createImg("assets/Kunst.jpg");
  backgroundButton5Img.size(145, 145);
  backgroundButton5 = createButton('');
  backgroundButton5.size(145, 145);
  backgroundButton5.position(width*1.1, 0);
  backgroundButton5.elt.style.opacity = '0';
  backgroundButton5.mousePressed(function() {
    document.body.style.backgroundImage = "url('assets/Kunst.jpg')";
  });

  ButtonBackgroundLier = createButton("")
  ButtonBackgroundLier.elt.disabled = true;
  ButtonBackgroundLier.class("button-lie");
  ButtonBackgroundLier.position(400, 100)
  ButtonBackgroundLier.size(width-500, height-40)
  ButtonBackgroundLier.hide();

  ChooseAccountLabel = createP("Choose an account");
  ChooseAccountLabel.position(width/2, (height-40)/12)
  ChooseAccountLabel.style('font-size', '40px');
  ChooseAccountLabel.style('color', 'white');
  ChooseAccountLabel.hide();

  closeTransactionsButton = createButton("X")
  closeTransactionsButton.position(width-160, height/7.6)
  closeTransactionsButton.size(width/25, height/15)
  closeTransactionsButton.class("button-24");
  closeTransactionsButton.hide();
  closeTransactionsButton.mousePressed(CloseTransactionMenu);

  SendMoneySelect = createSelect('Select account');
  SendMoneySelect.size(300);
  SendMoneySelect.position(width/2, (height-40)/5);
  SendMoneySelect.hide();
  SendMoneySelect.class('custom-select');

  MoneyToTransfer = createInput()
  MoneyToTransfer.attribute("placeholder", "Enter amount to transfer")
  MoneyToTransfer.size(width/5.5, height/100);
  MoneyToTransfer.position(width/2, height/4);
  MoneyToTransfer.hide();
  MoneyToTransfer.class("custom-select");

  AcceptTransactionButton = createButton("Transfer")
  AcceptTransactionButton.position(width/2, height/3.44);
  AcceptTransactionButton.size(width/4.75, height/22.5);
  AcceptTransactionButton.hide();
  AcceptTransactionButton.class("button-64");
  AcceptTransactionButton.mousePressed(function() {
    sendMoney(accountFromTransfer, SendMoneySelect.value().toString(), MoneyToTransfer.value())
  });

  //customCursor = document.getElementById('custom-cursor');
  //document.addEventListener('mousemove', updateCursorPosition);
}

function AddMoney()
{
  datastore[account1].balance += int(MoneyAccountInput.value());
  MoneyAccountInput.value(0);
  localStorage.setItem('datastore', JSON.stringify(datastore));
}

function SubMoney()
{
  datastore[account1].balance -= int(MoneyAccountInput.value());
  MoneyAccountInput.value(0);
  localStorage.setItem('datastore', JSON.stringify(datastore));
}

function OpenTransactionMenu()
{
  //print('sigma');
  accountFromTransfer = account1;
  for (let key in datastore) 
  {
    let currentAccount = datastore[key];
    SendMoneySelect.option(currentAccount.accountNumber);
  }

  SendMoneySelect.show();
  ChooseAccountLabel.show();
  ButtonBackgroundLier.show();
  closeTransactionsButton.show();
  AcceptTransactionButton.show();
  MoneyToTransfer.show();
}

function CloseTransactionMenu()
{
  SendMoneySelect.hide();
  ChooseAccountLabel.hide();
  ButtonBackgroundLier.hide();
  closeTransactionsButton.hide();
  AcceptTransactionButton.hide();
  MoneyToTransfer.hide();
}

function sendMoney(fromAccount, toAccount, amount) {
  amount = parseInt(amount);
  console.log(fromAccount, toAccount)
  if (!datastore[fromAccount] || !datastore[toAccount]) {
    errorOutput.html("Invalid account selected!");
    errorOutput.style('color', 'red');
    errorOutput.show();
    return;
  }
  
  if (isNaN(amount) || amount <= 0) {
    errorOutput.html("Invalid amount entered!");
    errorOutput.style('color', 'red');
    errorOutput.show();
    return;
  }

  if (datastore[fromAccount].balance < amount) {
    errorOutput.html("Insufficient balance!");
    errorOutput.style('color', 'red');
    errorOutput.show();
    return;
  }

  datastore[fromAccount].balance -= amount;
  datastore[toAccount].balance += amount;

  let fromTransactionId = Object.keys(datastore[fromAccount].accountHistory).length + 1;
  let toTransactionId = Object.keys(datastore[toAccount].accountHistory).length + 1;
    
  let fromAccountHistoryEntry = `Sent ${amount} to ${toAccount}`;
  let toAccountHistoryEntry = `Received ${amount} from ${fromAccount}`;
    
  datastore[fromAccount].accountHistory[fromTransactionId] = fromAccountHistoryEntry;
  datastore[toAccount].accountHistory[toTransactionId] = toAccountHistoryEntry;

  localStorage.setItem('datastore', JSON.stringify(datastore));

  MoneyAccountInput.value(0);
  errorOutput.html("Transaction successful!");
  errorOutput.style('color', 'green');
  errorOutput.show();

  CloseTransactionMenu();
}

function CreateButtonFunction() 
{
  //will call the createAccount function when clicked
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

let menuState = true;
let targetX;

function OpenMenu()
{
  menuState = !menuState;

  targetX = menuState ? width * 1.17 : width * 1.07;
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

let targetScrollPos = 0;

function mouseWheel(event) {
  targetScrollPos += event.delta;
}

function updateScrollPos() {
  scrollPos = lerp(scrollPos, targetScrollPos, 0.1);
}

function mousePressed() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
    account1 = undefined;
    console.log(account1);
  }

  // Check if the click is within the bounds of the displayed search results
  if (mouseX < width / 3 && mouseY > 60) {
    let posY = 60 - scrollPos;
    for (let key in datastore) {
      if (mouseY > posY && mouseY < posY + 140) {
        // Check if the clicked position matches the displayed account
        let searchString = SearchBar.value().toLowerCase().replace(/\s/g, '');
        let searchStringNumber = SearchBar.value().toLowerCase().replace(/\s/g, '');
        let searchStringAddress = SearchBar.value().toLowerCase().replace(/\s/g, '');

        let account = datastore[key];
        let fullName = `${account.accountLastName}${account.accountFirstName}`.toLowerCase().replace(/\s/g, '');
        let accountNumber = account.accountNumber.toLowerCase().replace(/\s/g, '');
        let accountAddress = account.address.toLowerCase().replace(/\s/g, '');

        if (fullName.includes(searchString) || accountNumber.includes(searchStringNumber) || accountAddress.includes(searchStringAddress)) {
          // Update account1 only if the clicked position corresponds to the displayed account
          account1 = key;
          return; // Exit the loop once account1 is set
        }
      }
      posY += 140;
    }
  }
}