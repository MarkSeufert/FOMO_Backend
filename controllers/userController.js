'use strict'

const userModel = require('../models/user.js');

const Promise = require("bluebird");

// Returns a user given their 'userId' or 'email'
function getUser(userData) {
    let error = "";
    // Check that the userData isn't empty
    if (!userData)
    {
        error = "/people GET requires a body";
    }

    // The userData must have a userId or email to uniquely query the user
    if (!userData.userId && !userData.email)
    {
        error = "/people GET requires a 'userId' or 'email' field";
    }
    if(error){
        return new Promise((resolve, reject) => {
            resolve(error);
        });
    }

    let user = 0;
    // Query based off userId
    if (userData.userId)
    {
        return userModel.findById(userData.userId).then((user) => {
            if (!user)
                return { error: "No user found with that userId" };
            return user;
        })
    }

    if (userData.email)
    {
        return userModel.findOne({email: userData.email}).then((user) => {
            if (!user)
                return { error: "No user found with that email" };
            return user;
        })
    }
    return userModel.find({}).then((err, users) => {
        return users || "No users";
    })
}

// Creates a user in the mongoDB, requires a 'name' and 'email'
function createUser(userData) {
    let error = "";
    // Check that the request has a body
    if (!userData) 
    {
        error = "/newPeople POST requires a body";
    }

    // Check that the body has a name
    if (!userData.name)
    {
        error = "/newPeople POST body requires 'name'";
    }

    // Check that the body has a unique email which isn't in MongoDB
    if (!userData.email)
    {
        error = "/newPeople POST body requires 'email'";
    }
    if(error){
        return new Promise((resolve, reject) => {
            resolve(error);
        });
    }

    return userModel.findOne({email: userData.email}).then((existingUser) => {
        if (existingUser)
            return { error: "user already exists with that email" };
        
        // Create the new user and save it to mongoDB
        let newUser = new userModel(userData);
        return newUser.save();
    })
}

module.exports = {
    getUser,
    createUser
};