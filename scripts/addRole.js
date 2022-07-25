const db = require('../config/connection');
const inquirer = require('inquirer');


// Refactored for ASYNC AWAIT
async function addRole() {
    try {
        // List Possible Departments
        const [department] = await db.promise().query("SELECT * FROM department")
        const departChoices = department.map(dep => {
            return {
                name: dep.name,
                value: dep.id
            }
        })

        const { role_title, role_salary, department_id } = await inquirer.prompt([
            {
                type: 'input',
                name: "role_title",
                message: "Enter Role's Title:",
            },
            {
                type: 'input',
                name: "role_salary",
                message: "Enter Role's Salary:",
            },
            {
                type: 'list',
                name: "department_id",
                message: "Enter Role's Department:",
                choices: departChoices
            }
        ])
        // Add Role
        await db.promise().query(`INSERT INTO role (role_title, role_salary, department_id) VALUES (?, ?, ?)`, [role_title, role_salary, department_id])
        return `${role_title} has been added to the database`
    } catch (err) {
        console.log(`Opps! Something went wrong...`, err)
    }

}

module.exports = addRole;