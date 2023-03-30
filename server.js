const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const PORT = process.env.PORT || 5000

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());

// MongoDB
require('dotenv').config();
const url = process.env.MONGODB_URI;
const mongoose = require("mongoose");
mongoose.connect(url, {dbName:"COP4331"})
  .then(() => console.log("Mongo DB connected"))
  .catch(err => console.log(err));

// API
let api = require('./api.js');
api.setApp(app, mongoose);

///////////////////////////////////////////////////
// For Heroku deployment
// Server static assets if in production
if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => 
  {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.use((request, response, next) => 
{
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
}); 

app.listen(PORT , () =>
{
  console.log('Server listening on port' + PORT);
}); // start Node + Express server

/*
// Take in a request. The / refers to the root. (localhost:5000/)
app.get("/", function (request, response) {
  response.send("<h1>It's working!</h1><p>This is some HTML</p>");
});

app.get("/message", function(request, response) {
  response.send("The server says hi!");
  }
);

*/