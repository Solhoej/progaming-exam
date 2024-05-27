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