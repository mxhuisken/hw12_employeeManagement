const db = require('../config/connection');
const inquirer = require('inquirer');
const viewAllDepartments = require('./viewAllDepartments');


// Delete Department
async function deleteDepartment() {
    try {
        const allDepartments = await viewAllDepartments();
        const { department_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: 'Select Department To Delete:',
                choices: allDepartments[0].map((d) => ({
                    name: d.name,
                    value: d.id,
                })),
            }
        ]);
        const delDep = await db.promise().query(`DELETE FROM department WHERE id = ${department_id}`);
        return `Department has been deleted...`;
    } catch (err) {
        console.log(`Opps! Something went wrong...`, err)
    }
}


// Export
module.exports = deleteDepartment;
