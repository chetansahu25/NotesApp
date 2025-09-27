const { createUser } = require('../dao/user.dao');
const { findUserByEmail } = require('../dao/user.dao');
const bcrypt = require('bcryptjs');


async function registerUser(name, email, password, role, organisationId) {
    const newUser = await createUser({ name, email, password, role, organisationId });
    return newUser; 
}

async function loginUser(email, password) {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("User not found");
    }
    // Verify password (you'll need to implement this)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Incorrect Email or password");
    }
    return user;
}

module.exports = { registerUser, loginUser };
