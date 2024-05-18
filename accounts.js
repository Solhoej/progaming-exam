class Accounts 
{
    constructor(firstName, lastName, cprNumber, address, balance) 
    {
        this.accountFirstName = firstName;
        this.accountLastName = lastName;
        this.cprNumber = cprNumber;
        this.address = address;

        this.bankAddress = "6942042069"

        this.balance = balance;
        this.accountNumber;
        this.accountHistory = {};
        this.account;

        this.isAdmin = false;

        this.savingsAccounts = [];
        this.creationDate = [hour(), minute(), day(), month(), year()]
    }

    accountNumberGeneration() 
    {
        //Generate random floating point number multiplied by 10000, to create a unique 4 digit number
        //padStart adds zero's to the string until it becomes a 4 digit number
        this.accountNumber = String(Math.floor(Math.random() * 10000)).padStart(4, '0');

        return this.bankAddress + this.accountNumber;
    }

    accountRegistration()
    {
        //Define an object which stores strings of information, under their own property
        this.account = 
        {
            name: `${this.accountLastName} ${this.accountFirstName}`, 
            cprNumber: this.cprNumber.toString(),
            address: this.address,
            accountNumber: this.accountNumberGeneration(),
            savingsAccounts: this.savingsAccounts,
            accountHistory: this.accountHistory,
            creationDate: this.creationDate
        }
    }

    adminRegistration(value=false)
    {
        this.isAdmin = value;
    }

}
