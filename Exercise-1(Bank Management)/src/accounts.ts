export class BankAccount{
  public userName: string;
  public userAge: number;
  public userLocation: string;
  public userState: string;
  public userCountry: string;
  public userEmail: string;
  public balance: number;
  public accountNumber: string;
  
  constructor(
    userName: string, 
    userAge: number, 
    userLocation: string, 
    userState: string, 
    userCountry: string, 
    userEmail: string, 
    balance: number,
    accountType: string,
  ) {
    this.userName = userName;
    this.userAge = userAge;
    this.userLocation = userLocation;
    this.userState = userState;
    this.userCountry = userCountry;
    this.userEmail = userEmail;
    this.balance = balance;
    this.accountNumber = this.generateAccountNumber(accountType);
  }
  // 
  private generateAccountNumber(accountType: string): string {
    const prefix = accountType === "savings" ? "Sav" : "Curr";
    const random = Math.floor(Math.random() * 1000000);
    return `${prefix}${String(random).padStart(6, "0")}`;
  }
    
  public getAccountType(): string{
    return this.accountNumber.startsWith("Sav") ? "Savings" : "Current";
  }

  public deposit(amount: number) {
    if(amount < 0){
      console.log("Deposit Amount cannot be negative.\n");
      return;
    }
    this.balance += amount;
    console.log(`Initial Balance: ${this.balance - amount}`);
    console.log(`Total Balance: ${this.balance}\n`);
  }
  public withdraw(amount: number) {
    if(amount < 0){
      console.log("Withdrawal Amount cannot be negative.\n");
      return;
    }
    if (this.balance >= amount && !(this.balance - amount <= 800)) {
        this.balance -= amount;
        console.log(`Withdrawn: ${amount}`);
        console.log(`Total Balance: ${this.balance}\n`);
    } else {
        console.log("Insufficient balance for withdrawal. You may use Overdraft.\n");
    }
  }
}
export class CurrentAccount extends BankAccount{
  constructor(userName: string, userAge: number, userLocation: string, userState: string, userCountry: string, userEmail: string, initialBalance: number){
    super(userName, userAge, userLocation, userState, userCountry, userEmail, initialBalance, "current");
  }
}

export class SavingsAccount extends BankAccount{
  constructor(userName: string, userAge: number, userLocation: string, userState: string, userCountry: string, userEmail: string, initialBalance: number){
    super(userName, userAge, userLocation, userState, userCountry, userEmail, initialBalance, "savings");
  }
}
