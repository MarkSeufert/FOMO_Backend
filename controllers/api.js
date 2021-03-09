'use strict'

const express = require('express');
const router = express.Router();

const userController = require('./userController')
const commentController = require('./commentController')
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
   
var upload = multer({ storage: storage, dest: "/tmp/files/" })

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

router.get('/comments', (req, res) => {
    commentController.getComments(req.body).then((comment) => {
        res.send(comment);
    })
});

router.post('/comment', upload.any(), (req, res) => {
    const file = req.file;
    var obj = {
        // name: req.body.name,
        // desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.resolve(__dirname, "../uploads/" + req.file.filename)),
            contentType: 'image/png'
        }
    }
    commentController.comment(req.query).then((comment) => {
        res.send(comment);
    })
});

router.post('/newPeople', (req, res) => {
    userController.createUser(req.body).then((user) => {
        res.send(user);
    });
});


module.exports = router;