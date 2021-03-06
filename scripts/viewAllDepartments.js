const db = require('../config/connection');

// Refactored for ASYNC AWAIT
async function viewAllDepartments() {
    try {
        const allDepartments = await db.promise().query('SELECT * FROM department')
        return allDepartments
    } catch (err) {
        console.log(`Opps! Something went wrong...`, err)
    }
}

module.exports = viewAllDepartments;