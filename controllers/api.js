'use strict'

const express = require('express');
const router = express.Router();

const userController = require('./userController')
const commentController = require('./commentController')


router.get('/cats', (req, res) => {
    res.send('MEOW');
});

router.get('/comment', async (req, res) => {
    console.log(123)
    let comment = await commentController.getComment(1);
    res.send(comment);
});

router.get('/people', async (req, res) => {
    let user = await userController.getUserInformation(1);
    res.send(user);
});

router.post('/newPeople', (req, res) => {
    if (req.body) {
        let user = userController.createUser({name: req.body.name});
        res.send(user);
    } else {
        res.send("Need to have a name");
    }
});


module.exports = router;