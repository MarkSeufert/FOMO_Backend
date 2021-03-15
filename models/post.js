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
    userId: {
      type: ObjectId,
      ref: 'User'
    },
    name: String,
    message: String,
    email: String,
    imageFile: String,
    location: pointSchema,
    date: {
        type: Date,
        default: Date.now
    }
}));



module.exports = Post