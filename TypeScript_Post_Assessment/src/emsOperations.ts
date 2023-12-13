import { IEmployee } from "./IEmployee";

export class EMSOperations{
    public employees: IEmployee[] = [];

    public addEmployee(employee: IEmployee): void {
        this.employees.push(employee);
        console.log(`Employee(${employee.employeeName}) added successfully\n`);
    }
    public deleteEmployee(empId: number): void {
        const index = this.employees.findIndex(employee => employee.employeeId === empId);
        if(index !== -1){
            const deletedEmployee = this.employees.splice(index, 1)[0];
            console.log(`Employee deleted: ${deletedEmployee.employeeName}\n`);   
        }
        else{
            console.log(`Employee with id ${empId} not found !!!\n`);
        }
    }
    
    public displayEmployeeDetails(): void {
        if(this.employees.length <= 0){
            console.log("No employees available to display\n");
            return;
        }
        console.log("List of employees and their details:");
        console.log("---------------------------------------------------------------------------");
        this.employees.forEach((employee) => {
            console.log(`ID: ${employee.employeeId} \t Name: ${employee.employeeName} \t Role: ${employee.employeeRole} \n`)
        });
        console.log("---------------------------------------------------------------------------");

    }
}