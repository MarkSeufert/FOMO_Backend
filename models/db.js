'use strict'

const mongoose = require('mongoose'); 

mongoose.connect("mongodb+srv://admin:nomofomo@cluster0.sr4ky.mongodb.net/Test_Database?retryWrites=true&w=majority",
                {useNewUrlParser: true, useUnifiedTopology: true},
                () => console.log("Server is connected to MongoDB"));