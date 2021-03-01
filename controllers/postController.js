'use strict'

const postModel = require('../models/post.js');

function getPosts() {
    return postModel.find({}).then((err, posts) => {
        return posts || "No posts";
    })
}

function createPost() {
    // Create the new post and save it to mongoDB
    let newPost = new postModel();
    const returnedPost = await newPost.save();
    return returnedPost;
}

module.exports = {
    getPosts,
    createPost
};