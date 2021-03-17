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

const Post = mongoose.model('Post', Schema({
    user: {
      type: ObjectId,
      ref: 'User'
    },
    message: String,
    imageFile: String,
    location: pointSchema,
    date: {
        type: Date,
        default: Date.now
    }
}));



module.exports = Post