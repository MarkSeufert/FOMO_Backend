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
    userController.getUserInformation(1).then((user) => {
        res.send(user);
    })
});

router.post('/newPeople', (req, res) => {
    if (req.body) {
        userController.createUser({name: req.body.name}).then((user) => {
            res.send(user);
        });
    } else {
        res.send("Need to have a name");
    }
});


module.exports = router;