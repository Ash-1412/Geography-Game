const getIDfromUsername = require('./getIDfromUsername');
const AuthenticatePasswordfromUsername = require('./AuthenticatePasswordFromUsername');

async function validateLogin(input) {

    const username = input.username.trim();
    const password = input.password;

    // Empty fields check
    if (username.length === 0 || password.length === 0) {
        return { success: false, message: 'Username and password are required.' };
    }

    try {
        // Fetch the userid from the database
        const userid = await getIDfromUsername(username);

        // Check if the username exists
        if (!userid) {
            return { success: false, message: 'Invalid username or password.' };
        }

        // Fetch the password from the database
        const password_from_database = await AuthenticatePasswordfromUsername(username);

        // Check if the password matches 
        if (password !== password_from_database) {
            return { success: false, message: 'Invalid username or password.' };
        }

        // Returns success and some user data
        return { success: true, userid, username };

    } catch (err) {
        console.error('Database error during login:', err);
        return { success: false, message: 'Internal server error.' };
    }
}

module.exports = validateLogin;