'use strict'

const express = require('express');
const router = express.Router();
const Multer = require('multer');
const path = require('path');

const userController = require('./userController')
const commentController = require('./commentController')
const postController = require('./postController')
var Promise = require("bluebird");

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
var Jimp = require('jimp');

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
    }
  });

// A bucket is a container for objects (in our case images).
const bucket = cloudstorage.bucket('fomo-images');

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

router.get('/allPosts', (req, res) => {
    postController.getAllPosts(req.query).then((posts) => {
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
    
    const img_buf = Buffer.from(req.file.buffer.toString('base64'), 'base64');

    const request = {
        image: {
            content: img_buf
        }
    };
    
    client.safeSearchDetection(request)
    .then(([result]) => {
        const safe = result.safeSearchAnnotation
        if (safe.adult == 'LIKELY' || safe.adult == 'VERY_LIKELY' ||
            safe.violence == 'LIKELY' || safe.violence == 'VERY_LIKELY') {
            
            console.log(`Detected image as inappropriate.`);
            
            return new Promise((resolve, reject) => {
                Jimp.read(img_buf, (err, image) => {
                    if (err) throw err;
                    image.blur( 70 );
                    req.file.buffer = image.bitmap.data;
                    console.log("Image blurred");
                    return resolve(req.file);
                });
            });
        }
        return Promise.resolve(req.file);
    }).then(image => {
        console.log("adding to cloud")
        // Create a new blob in the bucket and upload the image data.
        const imageName = image.fieldname + '-' + Date.now() + path.extname(image.originalname);
        const blob = bucket.file(imageName);
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
    
            let body = req.query;
            body.imageUrl = publicUrl;
            postController.createPostWithImage(body).then((posts) => {
                res.send(posts);
            });
        });
    
        blobStream.end(image.buffer);
    }).catch(err => {
        console.error('ERROR:', err);
    });
});

module.exports = router;