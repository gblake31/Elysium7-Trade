require('express');
require('mongodb');
require('mongoose');

// load user model
const User = require("./models/user.js");
// load card model
//const Card = require("./models/card.js"); // COMMENT BACK IN IF USING CARD API!!

exports.setApp = function ( app, client )
{
    app.post('/api/addcard', async (req, res, next) =>
    {
      // incoming: userId, color
      // outgoing: error
        
      let token = require('./createJWT.js');
      const { userId, card, jwtToken } = req.body;

      try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      const newCard = new Card({Card:card,UserId:userId});
      let error = '';
    
      try
      {
        newCard.save();
      }
      catch(e)
      {
        error = e.toString();
      }
    
      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken);
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = { error: error, jwtToken: refreshedToken };
      res.status(200).json(ret);

    });
    
    app.post('/api/login', async (req, res, next) => 
    {
      // incoming: login, password
      // outgoing: accessToken, id, firstName, lastName, error (if successful, no error returned)
    
      let er = '';
    
      const { login, password } = req.body;
    
      const results = await User.find({ Login: login, Password: password });

      let id = -1;
      let fn = '';
      let ln = '';

      let ret;
    
      if( results.length > 0 )
      {
        id = results[0]._id;
        fn = results[0].FirstName;
        ln = results[0].LastName;

        try
        {
          const token = require("./createJWT.js");
          ret = token.createToken( fn, ln, id );
        }
        catch(e)
        {
          ret = {error:e.message};
        }

      }
      else {
        ret = {error:"Login/Password incorrect"};
      }
    
      res.status(200).json(ret);
    });

    app.post('/api/register', async (req, res, next) => 
    {
      // incoming: login, password, firstname, lastname, email
      // outgoing: id, error
    
      let er = '';
      let result;
    
      const { login, password, firstname, lastname, email } = req.body;

      const results = await User.find({Login:login});
      let id;
    
      if( results.length > 0 )
      {
        id = '-1';
        er = 'Login is taken';
      }
      else {

      const newUser = new User({UserID:1,FirstName:firstname,LastName:lastname,Login:login,Password:password,Email:email});

      try
      {
        newUser.save();
      }
      catch(e)
      {
        er = e.toString();
      }

        id = newUser._id
      }
    
      let ret = { id:id, error:er};
      res.status(200).json(ret);
    });

    app.post('/api/searchcards', async (req, res, next) => 
    {
      // incoming: userId, search
      // outgoing: results[], error
    
      let error = '';
    
      var token = require('./createJWT.js');

      const { userId, search, jwtToken } = req.body;

      try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }

    
      let _search = search.trim();
      
      const results = await Card.find({ "Card": { $regex: _search + '.*', $options: 'r' } });
      
      let _ret = [];
      for( let i=0; i<results.length; i++ )
      {
        _ret.push( results[i].Card );
      }
      
      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken);
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = { results:_ret, error: error, jwtToken: refreshedToken };

      res.status(200).json(ret);
    });
    
}