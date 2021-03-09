'use strict'

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// const bodyParser = require('body-parser')
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// // parse application/json
// app.use(bodyParser.json())

const apiRouter = require('./controllers/api.js');
const db = require('./models/db.js');

// Middleware goes here
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
var upload = multer({ storage: storage, dest: "/tmp/files/" })

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));

app.use('/', (req, res, next) => {
    console.log(`user accessing ${req.path}`);
    next();
});

// The API endpoints are hit here

app.use('/api', apiRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));