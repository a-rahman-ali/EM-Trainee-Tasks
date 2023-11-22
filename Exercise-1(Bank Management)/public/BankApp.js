"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
const bankOps_1 = require("./bankOps");
const bankOps_2 = require("./bankOps");
function start() {
    console.log("Welcome to My Banking Application!!");
    while (true) {
        console.log("Choose from the below options: ");
        console.log("1. Open Savings or Current Account");
        console.log("2. View Balance");
        console.log("3. View Customer Details");
        console.log("4. Withdraw Money");
        console.log("5. Deposit Money");
        console.log("6. Display Details of All Customers");
        console.log("7. Exit from Application");
        let option = (Number)(prompt("Enter your Option: "));
        switch (option) {
            case 1:
                (0, bankOps_1.createAccount)();
                break;
            case 2:
                (0, bankOps_2.viewBalance)();
                break;
            case 3:
                (0, bankOps_1.viewCustomerDetails)();
                break;
            case 4:
                (0, bankOps_1.withdrawMoney)();
                break;
            case 5:
                (0, bankOps_1.depositMoney)();
                break;
            case 6:
                (0, bankOps_1.displayAllAccountsDetails)();
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
exports.start = start;
// Application starts from here !!!
start();
