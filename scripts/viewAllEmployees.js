const db = require('../config/connection');


// employee ids, first names, last names, 
// job titles, departments, salaries, and managers
async function viewAllEmployees() {
    try {
        const allEmployees = await db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.role_title, department.name, role.role_salary, employee.manager_id 
    FROM ((employee 
    INNER JOIN role ON employee.role_id = role.role_id) 
    INNER JOIN department ON role.department_id = department.id)`);
        return allEmployees;
    } catch (err) {
        console.log(`Opps! Something went wrong...`, err)
    }
}

module.exports = viewAllEmployees;
