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
            name: commentData.username,
            email: commentData.email,
            comment: commentData.comment,
            userId: commentData.id,
            location: {
                type: 'Point',
                coordinates: [ commentData.long, commentData.lat ]
              }
        }
    );
    return newComment.save();
}

function getComments(locationData){
    let abc = commentModel.find(
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
    return abc;
}

function getComment(commentId) {
    return new Promise((resolve, reject) => {
        resolve(comment1);
    });
}

module.exports = {
    comment,
    getComments,
    getComment
};