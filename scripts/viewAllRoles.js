const db = require('../config/connection');


// Refactored for ASYNC AWAIT
async function viewAllRoles() {
    try {
        const allRoles = await db.promise().query('SELECT * FROM role')
        return allRoles
    } catch (err) {
        console.log(`Opps! Something went wrong...`, err)
    }
}

module.exports = viewAllRoles;