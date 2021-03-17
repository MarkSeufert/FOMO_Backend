'use strict'

const postCommentModel = require('../models/postComment.js');
const postModel = require('../models/post.js');

var Filter = require('bad-words'),
    filter = new Filter();

const Promise = require("bluebird");

function getPostComments(body) {
    return postCommentModel.find({ postId: body.postId}).populate("user").then((postComments) => {
        return postComments.map((comment) => {
            let ret = comment.toJSON();
            ret.location = {
                long: ret.location.coordinates[0],
                lat: ret.location.coordinates[1]
            }
            return ret;
        }) || { error: "No comments" };
    })
}

function addPostComment(body) {
    if (body.postId) {
        return postModel.findById(body.postId).populate("user").then((post) => {
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
          }).populate("user").then((post) => {
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
            message: filter.clean(body.message),
            user: body.userId,
            postId: post.id,
            location: {
                type: 'Point',
                coordinates: post.location.coordinates
            }
        }
    );
    return newPostComment.save().then((savedComment) => {
        return savedComment.populate('user').execPopulate().then(comment => {
            let ret = comment.toJSON();
            ret.location = {
                long: comment.location.coordinates[0],
                lat: comment.location.coordinates[1]
            }
            return ret;
        })
    });
}

module.exports = {
    getPostComments,
    addPostComment
};