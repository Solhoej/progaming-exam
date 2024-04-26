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
    }

    accountNumberGeneration() 
    {
        this.accountNumber = String(Math.floor(Math.random() * 10000)).padStart(4, '0');

        return this.bankAddress + this.accountNumber;
    }

    accountRegistration()
    {
        this.accountName = `${this.accountLastName} ${this.accountFirstName}`;

        this.account = 
        {
            name: this.accountName, 
            cprNumber: this.cprNumber.toString(),
            address: this.address,
            accountNumber: this.accountNumberGeneration()
        }
    }
}
