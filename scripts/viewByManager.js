const db = require('../config/connection');
const inquirer = require('inquirer');


// Get Manager IDs
async function viewByManager() {
    try {
        const allManagers = await db.promise().query('SELECT first_name, last_name, id FROM employee WHERE (id IN (SELECT manager_id FROM employee));');

        const managerIDs = allManagers[0].map((m) => ({
            name: `${m.first_name} ${m.last_name}`,
            value: m.id,
        }));

        const { manager_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'manager_id',
                message: 'Select Manager:',
                choices: managerIDs,

            }
        ]);
        const viewManEmployees = await db.promise().query(`SELECT * FROM employee WHERE manager_id = ${manager_id}`);
        return viewManEmployees;
    } catch (err) {
        console.log(`Opps! Something went wrong...`, err)
    }
}

module.exports = viewByManager;