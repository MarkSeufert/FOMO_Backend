'use strict'
var Promise = require("bluebird");

const comment1 = {
    content: "Testing testing, hello I am cat"
};

function getComment(commentId) {
    return new Promise((resolve, reject) => {
        resolve(comment1);
    });
}

module.exports = {
    getComment
};