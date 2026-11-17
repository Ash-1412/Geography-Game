/*Encryption is to be done, otherwise this is a standard get function for the password with username as the input*/
const {db} = require('./db');

async function AuthenticatePasswordByUsername(username){
    const sql = 'SELECT password FROM users WHERE username = $1';
    return await db.oneOrNone(sql, [username])
}

module.exports = AuthenticatePasswordByUsername
