'use strict'

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser')

const apiRouter = require('./controllers/api.js');
const db = require('./models/db.js');

// Middleware goes here

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/', (req, res, next) => {
    console.log(`user accessing ${req.path}`);
    next();
});

// The API endpoints are hit here

app.use('/api', apiRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));