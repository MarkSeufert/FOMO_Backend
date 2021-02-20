'use strict'

const userModel = require('../models/user.js');
var Promise = require("bluebird");

const user1 = {
    name: "stefan",
    age: "12"
};

// Returns a user given their 'userId' or 'email'
async function getUser(userData) {
    // Check that the userData isn't empty
    if (!userData)
    {
        return { error: "/people GET requires a body" };
    }

    // The userData must have a userId or email to uniquely query the user
    if (!userData.userId && !userData.email)
    {
        return { error: "/people GET requires a 'userId' or 'email' field" };
    }

    // Query based off userId
    if (userData.userId)
    {
        const user = await userModel.findById(userData.userId);
        if (!user)
            return { error: "No user found with that userId" };
        return user;
    }

    if (userData.email)
    {
        const user = await userModel.findOne({email: userData.email});
        if (!user)
            return { error: "No user found with that email" };
        return user;
    }
    return userModel.find({}).then((err, users) => {
        console.log(users);
        return users || "No users";
    })
}

// Creates a user in the mongoDB, requires a 'name' and 'email'
async function createUser(userData) {
    // Check that the request has a body
    if (!userData) 
    {
        return { error: "/newPeople POST requires a body" };
    }

    // Check that the body has a name
    if (!userData.name)
    {
        return { error: "/newPeople POST body requires 'name'" };
    }

    // Check that the body has a unique email which isn't in MongoDB
    if (!userData.email)
    {
        return { error: "/newPeople POST body requires 'email'" };
    }
    const user = await userModel.findOne({email: userData.email});
    if (user)
        return { error: "user already exists with that email" };

    // Create the new user and save it to mongoDB
    let newUser = new userModel(userData);
    const returnedUser = await newUser.save();
    return returnedUser;
}

module.exports = {
    getUser,
    createUser
};