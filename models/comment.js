'use strict'

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

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

const Comment = mongoose.model('Comment', Schema({
    name: String,
    email: String,
    userId: String,
    location: pointSchema,
    date: {
        type: Date,
        default: Date.now
    }
}));

module.exports = Comment