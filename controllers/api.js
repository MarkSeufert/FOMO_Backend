'use strict'

const express = require('express');
const router = express.Router();

const userController = require('./userController')
const commentController = require('./commentController')


router.get('/cats', (req, res) => {
    res.send('MEOW');
});

router.get('/commment', (req, res) => {
    console.log(123)
    let comment = commentController.getComment(1);
    res.send(comment);
});

router.get('/people', (req, res) => {
    let user = userController.getUserInformation(1);
    res.send(user);
});


module.exports = router;