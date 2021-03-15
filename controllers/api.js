'use strict'

const express = require('express');
const router = express.Router();
const Multer = require('multer');

const userController = require('./userController')
const commentController = require('./commentController')
const postController = require('./postController')
var Promise = require("bluebird");

// The credentials for the cloud storage will be found inside the computer's environment variables.
// The cloud storage functionality won't work locally unless those credentials are set up. However,
// it will work inside of the GCP instance.
const {Storage} = require('@google-cloud/storage');
const cloudstorage = new Storage();

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, can be changed as needed.
    },
  });

// A bucket is a container for objects (in our case images).
const bucket = cloudstorage.bucket('fomo-images');//(process.env.GCLOUD_STORAGE_BUCKET);

// User Controller API

router.get('/getUser', (req, res) => {
    userController.getUser(req.query).then((user) => {
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
    commentController.getPostComments(req.query).then((comment) => {
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
    postController.getPosts(req.query).then((posts) => {
        res.send(posts);
    })
});

router.post('/createPost', (req, res) => {
    postController.createPost(req.body).then((posts) => {
        res.send(posts);
    })
});

router.post('/createPostWithImage', multer.single('image'), (req, res) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }
    
    // Create a new blob in the bucket and upload the image data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
        resumable: false,
    });

    blobStream.on('error', err => {
        res.status(400).send('File upload failed.')
    });

    blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = "https://storage.googleapis.com/" + bucket.name + "/" + blob.name;
        console.log(`image uploaded to url: ${publicUrl}`);
        res.status(200).send(publicUrl);
    });

    blobStream.end(req.file.buffer);
    /*
    const file = req.file;
    let body = req.query;
    if (file){
        // Upload the file to google cloud storage
        cloudstorage.bucket('fomo-images').upload(body.filepath);

        postController.createPostWithImage(body).then((posts) => {
            res.send(posts);
        })
    }*/
});

router.get('/file/:name', (req, res) => {
    var options = {
        root: path.resolve(__dirname, "../uploads/"),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
    }
    var fileName = req.params.name;
    //res.send(fileName);
    res.sendFile(fileName, options, function (err) {
        if (err) {
            //next(err)
        } else {
            console.log('Sent:', fileName)
        }
    })
});

module.exports = router;