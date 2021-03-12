'use strict'

const mongoose = require('mongoose');
const Schema   = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const postComment = mongoose.model('postComment', Schema({
    userID: ObjectId,
    name: String,
    message: String,
    email: String,
    postId: ObjectId,
    postLocation: [Number],
    date: {
        type: Date,
        default: Date.now
    }
}));



module.exports = postComment