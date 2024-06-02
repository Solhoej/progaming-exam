function displaySelectedAccount(posY = 60)
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

    for (let transaction of Object.entries(history)) 
    {
        push()
        textSize(23);
        fill(255);
        textFont('Times New Roman');
        newTransaction = text(transaction, width/25, height/10 + posY - scrollPos);
        posY += 40;
        pop()
    }
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

  for (let key in datastore) 
    {
      let currentAccount = datastore[key];
      SendMoneySelect.option(currentAccount.accountNumber);
    }
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
  accountFromTransfer = account1;
  //for (let key in datastore) 
  //{
    //let currentAccount = datastore[key];
    //SendMoneySelect.option(currentAccount.accountNumber);
 // }

  SendMoneySelect.show();
  ChooseAccountLabel.show();
  ButtonBackgroundLier.show();
  closeTransactionsButton.show();
  AcceptTransactionButton.show();
  MoneyToTransfer.show();

  sendMoneyOpened = true;
  //accountToTransfer = SendMoneySelect.value().toString();
}

function CloseTransactionMenu()
{
  SendMoneySelect.hide();
  ChooseAccountLabel.hide();
  ButtonBackgroundLier.hide();
  closeTransactionsButton.hide();
  AcceptTransactionButton.hide();
  MoneyToTransfer.hide();

  sendMoneyOpened = false;
}

function sendMoney(amount) {
  amount = parseInt(amount);
 // toAccount = SendMoneySelect.value().toString();
  //accountToTransfer = SendMoneySelect.value().toString();

  if (!datastore[accountFromTransfer] || !datastore[accountToTransfer]) {
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

  if (datastore[accountFromTransfer].balance < amount) {
    errorOutput.html("Insufficient balance!");
    errorOutput.style('color', 'red');
    errorOutput.show();
    return;
  }

  datastore[accountFromTransfer].balance -= amount;
  datastore[accountToTransfer].balance += amount;

  let fromTransactionId = Object.keys(datastore[accountFromTransfer].accountHistory).length + 1;
  let toTransactionId = Object.keys(datastore[accountToTransfer].accountHistory).length + 1;
    
  let fromAccountHistoryEntry = `Sent ${amount} to ${accountToTransfer}`;
  let toAccountHistoryEntry = `Received ${amount} from ${accountFromTransfer}`;
    
  datastore[accountFromTransfer].accountHistory[fromTransactionId] = fromAccountHistoryEntry;
  datastore[accountToTransfer].accountHistory[toTransactionId] = toAccountHistoryEntry;

  localStorage.setItem('datastore', JSON.stringify(datastore));

  MoneyAccountInput.value(0);
  errorOutput.html("Transaction successful!");
  errorOutput.style('color', 'green');
  errorOutput.show();

  CloseTransactionMenu();
}