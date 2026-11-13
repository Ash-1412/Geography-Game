const {db} = require('./db');

async function getIDfromUser(username){
    const sql = 'SELECT user_id FROM users WHERE username = $1';
    return await db.oneOrNone(sql, [username])
}

module.exports = getIDfromUser