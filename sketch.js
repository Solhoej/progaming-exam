function setup() {
  createCanvas(400, 400);

  account1 = new Accounts("Lars", "Mikkelsen", "2004006969", "Squidgame Street 69", 10)
}

function draw() {
  background(220);
  account1.accountRegistration();
  console.log(account1.account);
}
