const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const PORT = process.env.PORT || 5000

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());

/*
const url = 'mongodb+srv://RickLeinecker:COP4331Rocks@cluster0.ehunp00.mongodb.net/?retryWrites=true&w=majority';
  const MongoClient = require("mongodb").MongoClient;
  const client = new MongoClient(url);
  client.connect(console.log("mongodb connected"));
*/

// MongoDB
require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect();

// API
/*
let api = require('./api.js');
api.setApp(app, client);
*/

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

let cardList = 
[
  'Roy Campanella',
  'Paul Molitor',
  'Tony Gwynn',
  'Dennis Eckersley',
  'Reggie Jackson',
  'Gaylord Perry',
  'Buck Leonard',
  'Rollie Fingers',
  'Charlie Gehringer',
  'Wade Boggs',
  'Carl Hubbell',
  'Dave Winfield',
  'Jackie Robinson',
  'Ken Griffey, Jr.',
  'Al Simmons',
  'Chuck Klein',
  'Mel Ott',
  'Mark McGwire',
  'Nolan Ryan',
  'Ralph Kiner',
  'Yogi Berra',
  'Goose Goslin',
  'Greg Maddux',
  'Frankie Frisch',
  'Ernie Banks',
  'Ozzie Smith',
  'Hank Greenberg',
  'Kirby Puckett',
  'Bob Feller',
  'Dizzy Dean',
  'Joe Jackson',
  'Sam Crawford',
  'Barry Bonds',
  'Duke Snider',
  'George Sisler',
  'Ed Walsh',
  'Tom Seaver',
  'Willie Stargell',
  'Bob Gibson',
  'Brooks Robinson',
  'Steve Carlton',
  'Joe Medwick',
  'Nap Lajoie',
  'Cal Ripken, Jr.',
  'Mike Schmidt',
  'Eddie Murray',
  'Tris Speaker',
  'Al Kaline',
  'Sandy Koufax',
  'Willie Keeler',
  'Pete Rose',
  'Robin Roberts',
  'Eddie Collins',
  'Lefty Gomez',
  'Lefty Grove',
  'Carl Yastrzemski',
  'Frank Robinson',
  'Juan Marichal',
  'Warren Spahn',
  'Pie Traynor',
  'Roberto Clemente',
  'Harmon Killebrew',
  'Satchel Paige',
  'Eddie Plank',
  'Josh Gibson',
  'Oscar Charleston',
  'Mickey Mantle',
  'Cool Papa Bell',
  'Johnny Bench',
  'Mickey Cochrane',
  'Jimmie Foxx',
  'Jim Palmer',
  'Cy Young',
  'Eddie Mathews',
  'Honus Wagner',
  'Paul Waner',
  'Grover Alexander',
  'Rod Carew',
  'Joe DiMaggio',
  'Joe Morgan',
  'Stan Musial',
  'Bill Terry',
  'Rogers Hornsby',
  'Lou Brock',
  'Ted Williams',
  'Bill Dickey',
  'Christy Mathewson',
  'Willie McCovey',
  'Lou Gehrig',
  'George Brett',
  'Hank Aaron',
  'Harry Heilmann',
  'Walter Johnson',
  'Roger Clemens',
  'Ty Cobb',
  'Whitey Ford',
  'Willie Mays',
  'Rickey Henderson',
  'Babe Ruth'
];

app.post('/api/addcard', async (req, res, next) =>
{
  // incoming: userId, color
  // outgoing: error
  const { userId, card } = req.body;
  const newCard = {Card:card,UserId:userId};
  var error = '';
  try
  {
    const db = client.db('COP4331Cards');
    const result = db.collection('Cards').insertOne(newCard);
  }
  catch(e)
  {
    error = e.toString();
  }
  cardList.push( card );
  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error
  let error = '';

  const { login, password } = req.body;

  const db = client.db('COP4331Cards');
  const results = await db.collection('Users').find({Login:login, Password:password}).toArray();

  let id = -1;
  let fn = '';
  let ln = '';

  if (results.length > 0) {
    id = results[0].UserID;
    fn = results[0].FirstName;
    ln = results[0].LastName
  }

  let ret = { id:id, firstName:fn, lastName:ln, error:error};
  res.status(200).json(ret);
});

app.post('/api/searchcards', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error
  var error = '';
  const { userId, search } = req.body;
  var _search = search.trim();
  
  const db = client.db('COP4331Cards');
  const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', 
$options:'r'}}).toArray();
  
  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Card );
  }
  
  var ret = {results:_ret, error:error};
  res.status(200).json(ret);
});