import promptSync from "prompt-sync";
const prompt = promptSync();

import { createAccount, displayAllAccountsDetails, viewCustomerDetails, withdrawMoney, depositMoney } from "./bankOps";
import{ viewBalance } from "./bankOps";
export function start(): never {
  console.log("Welcome to My Banking Application!!");

  while(true){
    console.log("Choose from the below options: ");
    console.log("1. Open Savings or Current Account");
    console.log("2. View Balance");
    console.log("3. View Customer Details");
    console.log("4. Withdraw Money");
    console.log("5. Deposit Money");
    console.log("6. Display Details of All Customers");
    console.log("7. Exit from Application");
    
    let option:number = (Number)(prompt("Enter your Option: "))
    switch (option) {
      case 1:
        createAccount();
        break;
      case 2:
        viewBalance();
        break;
      case 3:
        viewCustomerDetails();
        break;
      case 4:
        withdrawMoney();
        break;
      case 5:
        depositMoney();
        break;
      case 6:
        displayAllAccountsDetails();
        break;
      case 7:
        console.log("Thanks for using my Application");
        process.exit(0);
      default:
        console.log("Please choose a valid option\n");
        // break;
    }
  }
}

// Application starts from here !!!
start();