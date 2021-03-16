'use strict'

const postCommentModel = require('../models/postComment.js');
const postModel = require('../models/post.js');

var Filter = require('bad-words'),
    filter = new Filter();

const Promise = require("bluebird");

function getPostComments(body) {
    return postCommentModel.find({ postId: body.postId}).populate("User").then((postComments) => {
        return postComments.map((comment) => {
            let ret = comment.toJSON();
            ret.postLocation = {
                long: ret.postLocation[0],
                lat: ret.postLocation[1]
            }
            return ret;
        }) || { error: "No comments" };
    })
}

function addPostComment(body) {
    if (body.postId) {
        return postModel.findById(body.postId).populate("User").then((post) => {
            if (!post) {
                return {error: "no such post"}
            }
            return createComment(body, post)
        })
    }
    return postModel.findOne(
        {
            location:
              { $near :
                 {
                   $geometry: { type: "Point",  coordinates: [ body.long, body.lat ] },
                   $minDistance: 0,
                   $maxDistance: 0 //in meters
                 }
              }
          }).populate("User").then((post) => {
        if (!post) {
            return {error: "no such post"}
        }
        return createComment(body, post)
    })
    // Create the new user and save it to mongoDB
    // let newComment = new commentModel(postId);
    // const returnedComment = newComment.save();
    // return returnedComment;
}

function createComment(body, post){
    let newPostComment = new postCommentModel(
        {
            name: body.username,
            email: body.email,
            message: filter.clean(body.message),
            userId: body.userId,
            postId: post.id,
            postLocation: post.location.coordinates,
            location: {
                type: 'Point',
                coordinates: [ body.long, body.lat ]
              }
        }
    );
    return newPostComment.save();
}

module.exports = {
    getPostComments,
    addPostComment
};