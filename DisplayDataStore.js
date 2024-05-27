function displayDatastoreContent(posY = 60)
{
  if (!accountOpened) 
    {
    //we will declare what the user has searched
    let searchString = SearchBar.value().toLowerCase().replace(/\s/g, '');
    let searchStringNumber = SearchBar.value().toLowerCase().replace(/\s/g, '');
    let searchStringAddress = SearchBar.value().toLowerCase().replace(/\s/g, '');
    //we will loop through all our keys
    for (let key in datastore) 
      {
      //declare current account
      let account = datastore[key];
      //we will declare what we want to search for
      let fullName = `${account.accountLastName}${account.accountFirstName}`.toLowerCase().replace(/\s/g, '');
      let accountNumber = account.accountNumber.toLowerCase().replace(/\s/g, '');
      let accountAddress = account.address.toLowerCase().replace(/\s/g, '');

      //if what we want to search for has whatever the user has searched then
      if (fullName.includes(searchString) || accountNumber.includes(searchStringNumber) || accountAddress.includes(searchStringAddress)) 
        {
        //we will declare the accounts info and put the string together
        let accountInfo = `Account Number: ${key}\n`;
        accountInfo += `Name: ${account.accountLastName} ${account.accountFirstName}\n`;
        accountInfo += `CPR Number: ${account.cprNumber}\n`;
        accountInfo += `Address: ${account.address}\n`;

        //change the color of the button depending on the users behavior
        if (mouseX > (width / 60) + 40 && mouseX < (width / 60 + 20) + (width / 3) - 95 && mouseY > posY + 50 && mouseY < posY + 145) 
          {
          fill(44, 48, 61);
          stroke(180, 5, 5);
          strokeWeight(5);
          if (mouseIsPressed) 
            {
            fill(40, 45, 48);
            stroke(5, 180, 5);
            strokeWeight(5);
            account1 = key;
            prevScrollTarget = targetScrollPos;
            targetScrollPos = 0;
            accountOpened = true;
            print("accountOpened");
          }
        }
        else 
        {
          fill(r1, g1, b1);
          stroke(180);
          strokeWeight(1);
        }

        rect(width / 60 + 20, posY - 20, (width / 3) - 120, 90);

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
}