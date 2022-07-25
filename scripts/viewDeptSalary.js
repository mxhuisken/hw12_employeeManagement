const db = require('../config/connection');
const inquirer = require('inquirer');
const viewAllDepartments = require('./viewAllDepartments');


// Get Department IDs
async function viewDepartSalary() {
    try {
        const allDepartments = await viewAllDepartments();
        const { department_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: 'Select Department Total Salary:',
                choices: allDepartments[0].map((d) => ({
                    name: d.name,
                    value: d.id,
                })),
            }
        ]);

        // Get Department Total Salary
        const departSalary = await db.promise().query(`SELECT SUM(role_salary) AS total_salary FROM role WHERE department_id = ${department_id}`);
        return departSalary;
    } catch (err) {
        console.log(`Opps! Something went wrong...`, err)
    }
}

module.exports = viewDepartSalary;