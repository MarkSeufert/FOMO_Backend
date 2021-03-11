'use strict'

const postModel = require('../models/post.js');

var Filter = require('bad-words'),
    filter = new Filter();

function getPosts(locationData) {
    let posts = postModel.find(
        {
          location:
            { $near :
               {
                 $geometry: { type: "Point",  coordinates: [ locationData.long, locationData.lat ] },
                 $minDistance: 0,
                 $maxDistance: locationData.radius //in meters
               }
            }
        }
    );
    return posts;
}

function createPost(postData) {
    let newPost = new postModel(
        {
            name: postData.username,
            email: postData.email,
            message: filter.clean(postData.message),
            userId: postData.id,
            imageFile: postData.imageFile,
            location: {
                type: 'Point',
                coordinates: [ postData.long, postData.lat ]
              }
        }
    );
    return newPost.save();

    // Create the new post and save it to mongoDB
    // let newPost = new postModel();
    // const returnedPost = await newPost.save();
    // return returnedPost;
}

function createPostWithImage(postData) {
    let newPost = new postModel(
        {
            name: postData.username,
            email: postData.email,
            message: postData.message,
            userId: postData.id,
            location: {
                type: 'Point',
                coordinates: [ postData.long, postData.lat ]
              }
        }
    );
    return newPost.save();
}

module.exports = {
    getPosts,
    createPost
};
