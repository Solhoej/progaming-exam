let datastore = {};

function setup() {
  createCanvas(400, 400);

  account1 = new Accounts("Lars", "Mikkelsen", "2004006969", "Squidgame Street 69", 10)
}

function draw() {
  background(220);
  account1.accountRegistration();
  console.log(account1.account);
}

function createAccount()
{
  firstName = "Lars";
  lastName = "Mikkelsen";
  cprNumber = "2004006969";
  address = "Squidgame Street 69";
  balance = 10;

  let newAccount = new Accounts(firstName, lastName, cprNumber, address, balance);
  let key = newAccount.accountNumber;
  datastore = {[key]:newAccount}
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
