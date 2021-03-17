'use strict'

const postModel = require('../models/post.js');

var Filter = require('bad-words'),
    filter = new Filter();

function getPosts(locationData) {
    if (locationData.long && locationData.lat) {
        return postModel.find(
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
        ).populate('user').then(res => {
            return res.map((post) => {
                let ret = post.toJSON();
                ret.location = {
                    long: post.location.coordinates[0],
                    lat: post.location.coordinates[1]
                }
                return ret;
            });
        })
    }
    return [];
}

function getAllPosts() {
    return postModel.find({}).populate('user');
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
            message: filter.clean(postData.message),
            user: postData.userId,
            imageFile: "",
            location: {
                type: 'Point',
                coordinates: [ postData.long, postData.lat ]
              }
        }
    );
    return newPost.save().then((savedPost) => {
        return savedPost.populate('user').execPopulate().then(post => {
            let ret = post.toJSON();
            ret.location = {
                long: post.location.coordinates[0],
                lat: post.location.coordinates[1]
            }
            return ret;
        })
    });
}

function createPostWithImage(postData) {
    let newPost = new postModel(
        {
            message: filter.clean(postData.message),
            user: postData.userId,
            imageFile: postData.imageUrl,
            location: {
                type: 'Point',
                coordinates: [ postData.long, postData.lat ]
            }
        }
    );
    return newPost.save().then((savedPost) => {
        return savedPost.populate('user').execPopulate().then(post => {
            let ret = post.toJSON();
            ret.location = {
                long: post.location.coordinates[0],
                lat: post.location.coordinates[1]
            }
            return ret;
        })
    });
}

module.exports = {
    getPosts,
    getAllPosts,
    createPost,
    createPostWithImage,
};
