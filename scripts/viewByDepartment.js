const db = require('../config/connection');
const inquirer = require('inquirer');
const viewAllDepartments = require('./viewAllDepartments');


// Get Department IDs
async function viewByDepartment() {
    try {
        const allDepartments = await viewAllDepartments();
        const { department_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: 'Select Department To View All Employees:',
                choices: allDepartments[0].map((d) => ({
                    name: d.name,
                    value: d.id,
                })),
            }
        ]);
        const departEmployees = await db.promise().query(`SELECT department.name, role.department_id, employee.first_name, employee.last_name, employee.role_id, role.role_title
    FROM ((employee
    INNER JOIN role ON employee.role_id = role.role_id)
    INNER JOIN department ON role.department_id = department.id) 
    WHERE department.id = ${department_id}`);

        return departEmployees;
    } catch (err) {
        console.log(`Opps! Something went wrong...`, err)
    }
}

module.exports = viewByDepartment;