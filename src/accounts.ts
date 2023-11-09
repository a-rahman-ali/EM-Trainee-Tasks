export class BankAccount{
    
    private userName: string;
    private userAge: number;
    private userLocation: string;
    private userState: string;
    private userCountry: string;
    private userEmail: string;
    protected balance: number;
    private accountNumber: string;
    
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
    generateAccountNumber(accountType: string): string {
      const prefix = accountType === "savings" ? "Sav" : "Curr";
      const random = Math.floor(Math.random() * 1000000);
      return `${prefix}${String(random).padStart(6, "0")}`;
    }
    static isValidEmail(email: string): boolean{
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return emailPattern.test(email); 
    }
    getUserName(): string { 
      return this.userName; 
    }
    getUserAge(): number { 
      return this.userAge; 
    }
    getUserLocation(): string { 
      return this.userLocation;
    }
    getUserState(): string { 
      return this.userState; 
    }
    getUserCountry(): string { 
      return this.userCountry; 
    }
    getUserEmail(): string { 
      return this.userEmail; 
    }
    getBalance(): number { 
      return this.balance; 
    }
    getAccountNumber(): string{
      return this.accountNumber;
    }
    getAccountType(): string{
      return this.getAccountNumber().startsWith("Sav") ? "Savings" : "Current";
    }
}
export class CurrentAccount extends BankAccount{
  constructor(userName: string, userAge: number, userLocation: string, userState: string, userCountry: string, userEmail: string, initialBalance: number){
    super(userName, userAge, userLocation, userState, userCountry, userEmail, initialBalance, "current");
    this.generateAccountNumber("current");
  }
  getAccountType(): string {
    return "Current";
  }
  deposit(amount: number) {
        this.balance += amount;
        console.log(`Initial Balance: ${this.balance - amount}`);
        console.log(`Total Balance: ${this.balance}`);
  }
  withdraw(amount: number) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawn: ${amount}`);
            console.log(`Total Balance: ${this.balance}`);
        } else {
            console.log("Insufficient balance for withdrawal. You may use Overdraft.");
        }
  }
}

export class SavingsAccount extends BankAccount{
  constructor(userName: string, userAge: number, userLocation: string, userState: string, userCountry: string, userEmail: string, initialBalance: number){
    super(userName, userAge, userLocation, userState, userCountry, userEmail, initialBalance, "savings");
    this.generateAccountNumber("savings");
  }
  getAccountType(): string { 
    return "Savings";
  }
  deposit(amount: number) {
        this.balance += amount;
        console.log(`Initial Balance: ${this.balance - amount}`);
        console.log(`Total Balance: ${this.balance}`);
  }
  withdraw(amount: number) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawn: ${amount}`);
            console.log(`Total Balance: ${this.balance}`);
        } else {
            console.log("Insufficient balance for withdrawal.");
        }
    }
}
