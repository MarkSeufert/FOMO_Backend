'use strict'

const userModel = require('../models/user.js');
var Promise = require("bluebird");

const user1 = {
    name: "stefan",
    age: "12"
};

function getUserInformation(userId) {
    return userModel.find({}).then((err, users) => {
        console.log(users);
        return users || "No users";
    })
}

function createUser(name) {
    let newUser = new userModel(name);
    return newUser.save().then(() => {
        return {
            name: name
        }
    });

}

module.exports = {
    getUserInformation,
    createUser
};