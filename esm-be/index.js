const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const teacher = require('./routes/teacher');
const student = require('./routes/student');
const questions = require('./routes/questions');

const exams = require('./routes/exams');

const InitiateMongoServer = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
var path = require('path');
require('dotenv').config();

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

/**
 * Router Middleware
 * Router - /user/*
 * * Router - /teacher/*
 * Method - *
 */

app.use('/user', user);
app.use('/teacher', teacher);
app.use('/student', student);
app.use('/question', questions);
app.use('/exams', exams);

if (process.env.NODE_ENV === 'production') {
   // Serve any static files
   app.use(express.static(path.join(__dirname, '/client/esm-client/build')));
   // Handle React routing, return all requests to React app
   app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, '/client/esm-client/build', 'index.html'));
   });
}

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.listen(PORT, (req, res) => {
   console.log(`Server Started at PORT ${PORT}`);
});
