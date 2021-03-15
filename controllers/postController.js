'use strict'

const postModel = require('../models/post.js');

var Filter = require('bad-words'),
    filter = new Filter();

function getPosts(locationData) {
    if (locationData.long, locationData.lat) {
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
    } else {
        let posts = postModel.find().populate('User');
        return posts;
    }
}

function createPost(postData) {
    let error = "";
    // Error check postData
    if (!postData) 
    {
        error = "/createPost POST requires a body";
    }
    if (!postData.message)
    {
        error = "/createPost POST body requires 'message'";
    }
    if (!postData.userId)
    {
        error = "/createPost POST body requires 'userId'";
    }
    if (!postData.long || !postData.lat)
    {
        error = "/createPost POST body requires 'long' and 'lat'";
    }
    if(error){
        return new Promise((resolve, reject) => {
            resolve(error);
        });
    }

    let newPost = new postModel(
        {
            name: postData.username,
            email: postData.email,
            message: filter.clean(postData.message),
            userId: postData.userId,
            imageFile: "",
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
            message: filter.clean(postData.message),
            userId: postData.userId,
            imageFile: postData.imageUrl,
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
    createPost,
    createPostWithImage
};
