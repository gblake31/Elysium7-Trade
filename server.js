const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// Cross-Origin Resource Sharing
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
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

// Take in a request. The / refers to the root. (localhost:5000/)
app.get("/", function (request, response) {
  response.send("<h1>It's working!</h1><p>This is some HTML</p>");
});

app.get("/message", function(request, response) {
  response.send("The server says hi!");
  }
);

app.listen(5000); // start Node + Express server on port 5000