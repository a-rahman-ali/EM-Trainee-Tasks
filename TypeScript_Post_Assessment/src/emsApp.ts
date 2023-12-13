// [10:59 AM] Mayura Sonar
// Employee Management System: 
// Design an employee management system using TypeScript. 
// Include features such as adding employees, 
// deleting the information, and displaying a list of employees.

import { EMSOperations } from "./emsOperations";
import promptSync from "prompt-sync"
import { IEmployee } from './IEmployee';

const prompt = promptSync();

function getDetailsFromUser(): IEmployee{
    let employeeId: number = (Number)(prompt("Enter the employee ID: "));
    let employeeName: string = prompt("Enter the name of Employee: ");
    let employeeRole: string = prompt("Enter the role of Employee: ");
    return { employeeId, employeeName, employeeRole};            
}
function displayMenu(): void {
    console.log("Choose from the below options: ");
    console.log("1. To Add a employee");
    console.log("2. To Remove a employee");
    console.log("3. To Display a list of employees");
    console.log("4. To Exit from the Application \n");
}
function startApp(): void{
    const ems = new EMSOperations();
    console.log("Welcome to my Employee Management System");
    while(true){    
        displayMenu();
        let opt: number = (Number)(prompt("Enter your choice:"));
        if(opt == 1){
            const newEmployee: IEmployee = getDetailsFromUser();
            ems.addEmployee(newEmployee);
        }
        else if(opt == 2){
            let empId: number = (Number)(prompt("Enter the employee ID: "));
            ems.deleteEmployee(empId);
        }
        else if(opt == 3){
            ems.displayEmployeeDetails();
        }
        else if(opt == 4){
            console.log("Thanks for using my application");
            process.exit(0);
        }
        else{
            console.log("Please select a valid option");
        }
    }
}

startApp();