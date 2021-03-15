// Delete this file in the future
// This file is to test the creation of a mongodb schema under the api/cats endpoint

const mongoose = require('mongoose');

const CatSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Api', CatSchema)