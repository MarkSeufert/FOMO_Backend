'use strict'

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Comment = mongoose.model('Comment', Schema({
    name: String,
    email: String,
    userId: String,
    x_coord: Number,
    y_coord: Number,
    date: {
        type: Date,
        default: Date.now
    }
}));

module.exports = Comment