'use strict'

const express = require('express');
const router = express.Router();

const userController = require('./userController')
const commentController = require('./commentController')
const postController = require('./postController')
var Promise = require("bluebird");

// User Controller API

router.get('/getUser', (req, res) => {
    userController.getUser(req.body).then((user) => {
        res.send(user);
    })
});

router.post('/createUser', (req, res) => {
    userController.createUser(req.body).then((user) => {
        res.send(user);
    });
});

// Comment Controller API

router.get('/comments', (req, res) => {
    commentController.getPostComments(req.body).then((comment) => {
        res.send(comment);
    })
});

router.post('/addComment', (req, res) => {
    commentController.addPostComment(req.body).then((comment) => {
        res.send(comment);
    })
});

// Post Controller API

router.get('/posts', (req, res) => {
    postController.getPosts(req.body).then((posts) => {
        res.send(comment);
    })
});

router.post('/createPost', (req, res) => {
    postController.createPost(req.body).then(() => {
        res.send(comment);
    })
});

module.exports = router;