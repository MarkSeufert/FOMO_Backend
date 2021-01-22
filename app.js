'use strict'

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const apiRouter = require('./controllers/api.js')


// Middleware goes here

app.use('/', (req, res, next) => {
    console.log(`user accessing ${req.path}`);
    next();
});

// The API endpoints are hit here

app.use('/api', apiRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));