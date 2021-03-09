'use strict'

const commentModel = require('../models/comment.js');

function getPostComments(postId) {
    return commentModel.find({}).then((err, comments) => {
        return comments || "No comments";
    })
}

function addPostComment(postId) {
    // Create the new user and save it to mongoDB
    let newComment = new commentModel(postId);
    const returnedComment = newComment.save();
    return returnedComment;
}

module.exports = {
    getPostComments,
    addPostComment
};