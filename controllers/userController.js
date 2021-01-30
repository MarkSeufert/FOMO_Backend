'use strict'

const userModel = require('../models/user.js');

const user1 = {
    name: "stefan",
    age: "12"
};

async function getUserInformation(userId) {
    return userModel.find({}, async (err, users) => {
        console.log(users);
        return users;
    });
}

function createUser(name) {
    let newUser = new userModel(name);
    newUser.save((err) => {
        console.log("err: ", err);
    });
}

module.exports = {
    getUserInformation,
    createUser
};