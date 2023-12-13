"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMSOperations = void 0;
class EMSOperations {
    constructor() {
        this.employees = [];
    }
    addEmployee(employee) {
        this.employees.push(employee);
        console.log(`Employee(${employee.employeeName}) added successfully\n`);
    }
    deleteEmployee(empId) {
        const index = this.employees.findIndex(employee => employee.employeeId === empId);
        if (index !== -1) {
            const deletedEmployee = this.employees.splice(index, 1)[0];
            console.log(`Employee deleted: ${deletedEmployee.employeeName}\n`);
        }
        else {
            console.log(`Employee with id ${empId} not found !!!\n`);
        }
    }
    displayEmployeeDetails() {
        if (this.employees.length <= 0) {
            console.log("No employees available to display\n");
            return;
        }
        console.log("List of employees and their details:");
        console.log("---------------------------------------------------------------------------");
        this.employees.forEach((employee) => {
            console.log(`ID: ${employee.employeeId} \t Name: ${employee.employeeName} \t Role: ${employee.employeeRole} \n`);
        });
        console.log("---------------------------------------------------------------------------");
    }
}
exports.EMSOperations = EMSOperations;
