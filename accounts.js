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

        this.savingsAccounts = [];
        this.creationDate = [hour(), minute(), day(), month(), year()]
    }

    accountNumberGeneration() 
    {
        this.accountNumber = String(Math.floor(Math.random() * 10000)).padStart(4, '0');

        return this.bankAddress + this.accountNumber;
    }

    accountRegistration()
    {
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
}
