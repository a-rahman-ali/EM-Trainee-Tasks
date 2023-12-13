"use strict";
// [10:59 AM] Mayura Sonar
// Employee Management System: 
// Design an employee management system using TypeScript. 
// Include features such as adding employees, 
// deleting the information, and displaying a list of employees.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emsOperations_1 = require("./emsOperations");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
function getDetailsFromUser() {
    let employeeId = (Number)(prompt("Enter the employee ID: "));
    let employeeName = prompt("Enter the name of Employee: ");
    let employeeRole = prompt("Enter the role of Employee: ");
    return { employeeId, employeeName, employeeRole };
}
function displayMenu() {
    console.log("Choose from the below options: ");
    console.log("1. To Add a employee");
    console.log("2. To Remove a employee");
    console.log("3. To Display a list of employees");
    console.log("4. To Exit from the Application \n");
}
function startApp() {
    const ems = new emsOperations_1.EMSOperations();
    console.log("Welcome to my Employee Management System");
    while (true) {
        displayMenu();
        let opt = (Number)(prompt("Enter your choice:"));
        if (opt == 1) {
            const newEmployee = getDetailsFromUser();
            ems.addEmployee(newEmployee);
        }
        else if (opt == 2) {
            let empId = (Number)(prompt("Enter the employee ID: "));
            ems.deleteEmployee(empId);
        }
        else if (opt == 3) {
            ems.displayEmployeeDetails();
        }
        else if (opt == 4) {
            console.log("Thanks for using my application");
            process.exit(0);
        }
        else {
            console.log("Please select a valid option");
        }
    }
}
startApp();
