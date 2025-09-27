const User = require('../models/users.model');

//create User Function
async function createUser({ name, email, password, role, organisationId}) {
    const newUser = await User.create({ name, email, password, role, organisationId });

    return newUser;
}

// check if user is admin 
async function isAdmin(userId) {
    const user = await User.findById(userId).lean();
    return user ? user.role === 'admin' : false;
}




//find User Function
async function findUserByEmail(email) {
    const user = await User.findOne({ email }).lean();
    return user;
}

//update user function
async function updateUser(id, { name, email, password, role, organisationId }) {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password, role, organisationId }, { new: true });
    return updatedUser;
}

module.exports = { createUser, findUserByEmail, updateUser, isAdmin };