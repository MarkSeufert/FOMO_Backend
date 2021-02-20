'use strict'

const mongoose = require('mongoose');
const Schema   = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const Post = mongoose.model('Post', Schema({
    userID: ObjectId,
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
}));

module.exports = Post