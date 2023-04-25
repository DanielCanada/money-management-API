// import Dependencies
const dotenv = require('dotenv');
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const path = require('path');

// Configure ENV File and Require Connection File
dotenv.config({path : './config.env'});
require('./db/conn');


// Require Model
const Records = require('./models/recordSchema');

// These Method is used to get data and cookies form FrontEnd
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors({origin: true}));

// Import Routes
const recordRoutes = require('./routes/records');
app.use('/records', recordRoutes);

app.get('/', (req, res)=>{
  res.send("Hello World!");
})

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  });
}

// RUN SERVER
const port = process.env.PORT || 3001;
app.listen(port, ()=>{
  console.log("Server is Listening")
})