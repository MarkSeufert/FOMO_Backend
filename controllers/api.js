'use strict'

const express = require('express');
const router = express.Router();

const userController = require('./userController')
const commentController = require('./commentController')
var Promise = require("bluebird");


router.get('/cats', (req, res) => {
    res.send('MEOW');
});

router.get('/comment', (req, res) => {
    console.log(123)
    commentController.getComment(1).then((comment) => {
        res.send(comment);
    })
});

router.get('/people', (req, res) => {
    userController.getUser(req.body).then((user) => {
        res.send(user);
    })
});

router.post('/comment', (req, res) => {
    commentController.comment(req.body).then((comment) => {
        res.send(comment);
    })
});

router.post('/newPeople', (req, res) => {
    userController.createUser(req.body).then((user) => {
        res.send(user);
    });
});


module.exports = router;