'use strict'
var Promise = require("bluebird");
const commentModel = require('../models/comment.js');

const comment1 = {
    content: "Testing testing, hello I am cat"
};

function comment(commentData) {
    // Create the new user and save it to mongoDB
    // let newComment = new commentModel(commentData);
    let newComment = new commentModel(
        {
            name: "String1",
            email: "String2",
            userId: "String3",
            x_coord: 123,
            y_coord: 456,
        }
    );
    return newComment.save();
}

function getComment(commentId) {
    return new Promise((resolve, reject) => {
        resolve(comment1);
    });
}

module.exports = {
    comment,
    getComment
};