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
  FakePersonalNumber.style('font-size', '20px')

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
  AccountHistoryInfo.style('font-size', '23px');
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
  AccountBalance.position(width/1.73, height/8)
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

  backgroundButton2Img = createImg("assets/Dirthut.png");
  backgroundButton2Img.size(145, 145);
  backgroundButton2 = createButton('');
  backgroundButton2.size(145, 145);
  backgroundButton2.position(width*1.1, 0);
  backgroundButton2.elt.style.opacity = '0';
  backgroundButton2.mousePressed(function() {
    document.body.style.backgroundImage = "url('assets/Dirthut.png')";
    document.body.style.backgroundSize = "cover";
  });

  backgroundButton3Img = createImg("assets/Mew.png");
  backgroundButton3Img.size(145, 145);
  backgroundButton3 = createButton('');
  backgroundButton3.size(145, 145);
  backgroundButton3.position(width*1.1, 0);
  backgroundButton3.elt.style.opacity = '0';
  backgroundButton3.mousePressed(function() {
    document.body.style.backgroundImage = "url('assets/Mew.png')";
  });

  backgroundButton4Img = createImg("assets/Mewtwo.png");
  backgroundButton4Img.size(145, 145);
  backgroundButton4 = createButton('');
  backgroundButton4.size(145, 145);
  backgroundButton4.position(width*1.1, 0);
  backgroundButton4.elt.style.opacity = '0';
  backgroundButton4.mousePressed(function() {
    document.body.style.backgroundImage = "url('assets/Mewtwo.png')";
  });

  backgroundButton5Img = createImg("assets/Moltres.png");
  backgroundButton5Img.size(145, 145);
  backgroundButton5 = createButton('');
  backgroundButton5.size(145, 145);
  backgroundButton5.position(width*1.1, 0);
  backgroundButton5.elt.style.opacity = '0';
  backgroundButton5.mousePressed(function() {
    document.body.style.backgroundImage = "url('assets/Moltres.png')";
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
    sendMoney( MoneyToTransfer.value())
  });

  //customCursor = document.getElementById('custom-cursor');
  //document.addEventListener('mousemove', updateCursorPosition);
}
