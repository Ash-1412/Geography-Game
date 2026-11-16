const getIDfromUsername = require('./getIDfromUsername');

async function validateLogin(input) {

    const username = input.username.trim();
    const password = input.password;

    // Empty fields check
    if (username.length === 0 || password.length === 0) {
        return { success: false, message: 'Username and password are required.' };
    }

    try {
        // Fetch the user from the database
        const user = await getIDfromUsername.getIDfromUser(username);

        // Check if the user exists
        if (!user) {
            return { success: false, message: 'Invalid username or password.' };
        }

        // Check if the password matches 
        if (password !== user.password) {
            return { success: false, message: 'Invalid username or password.' };
        }

        // Returns success and the user data
        return { success: true, user };

    } catch (err) {
        console.error('Database error during login:', err);
        return { success: false, message: 'Internal server error.' };
    }
}

module.exports = validateLogin;