'use strict'

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const User = mongoose.model('User', Schema({
    name: String,
    email: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
}));

module.exports = User