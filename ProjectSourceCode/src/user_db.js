const {db} = require('./db');

async function getUserById(userID){
    const sql = 'SELECT username FROM users WHERE user_id = $1';
    return await db.oneOrNone(sql, [userID])
}
