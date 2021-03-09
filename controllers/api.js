'use strict'

const express = require('express');
const router = express.Router();

const userController = require('./userController')
const commentController = require('./commentController')
const postController = require('./postController')
var Promise = require("bluebird");

var multer = require('multer');
const path = require('path');
var fs = require('fs');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
var upload = multer({ storage: storage })

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
        res.send(posts);
    })
});

router.post('/createPost', (req, res) => {
    postController.createPost(req.body).then((posts) => {
        res.send(posts);
    })
});

router.post('/createPostWithImage', upload.single('image'), (req, res) => {
    const file = req.file;
    let body = req.query;
    if (file){
        var obj = {
            img: {
                data: fs.readFileSync(path.resolve(__dirname, "../uploads/" + req.file.filename)),
                contentType: 'image/png'
            }
        }
        body.imageFile = req.file.filename;
        postController.createPost(body).then((posts) => {
            res.send(posts);
        })
    }
    // commentController.comment(req.query).then((comment) => {
    //     res.send(comment);
    // })
});

module.exports = router;