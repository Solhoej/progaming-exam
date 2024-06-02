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
let sendMoneyOpened = false;

let accountOpened = false;

let targetScrollPos = 0;
let prevScrollTarget;

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

  for (let key in datastore) 
    {
      let currentAccount = datastore[key];
      SendMoneySelect.option(currentAccount.accountNumber);
    }
}

function draw() 
{
  //making everything work repeatedly
  GUI();
  checkInputs(FirstNameBar.value(), LastNameBar.value(), FakePersonalNumber.value(), AdressInput.value());
  displaySelectedAccount();
  BackgroundsMenu();
  updateScrollPos();

  accountToTransfer = SendMoneySelect.value().toString();
  accountFromTransfer = account1;

  console.log("from transfer: " + accountFromTransfer);
  console.log("previous to transfer selected: " + accountToTransfer);
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