require('express');
require('mongodb');

exports.setApp = function ( app, client )
{
    app.post('/api/addcard', async (req, res, next) =>
    {
      // incoming: userId, color
      // outgoing: error
        
      const { userId, card } = req.body;
    
      const newCard = {Card:card,UserId:userId};
      let error = '';
    
      try
      {
        const db = client.db();
        const result = db.collection('Cards').insertOne(newCard);
      }
      catch(e)
      {
        error = e.toString();
      }
    
      let ret = { error: error };
      res.status(200).json(ret);
    });
    
    app.post('/api/login', async (req, res, next) => 
    {
      // incoming: login, password
      // outgoing: id, firstName, lastName, error
    
      let error = '';
    
      const { login, password } = req.body;
    
      const db = client.db();
      const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
    
      let id = -1;
      let fn = '';
      let ln = '';
    
      if( results.length > 0 )
      {
        id = results[0].UserId;
        fn = results[0].FirstName;
        ln = results[0].LastName;
      }
    
      let ret = { id:id, firstName:fn, lastName:ln, error:''};
      res.status(200).json(ret);
    });
    
    app.post('/api/searchcards', async (req, res, next) => 
    {
      // incoming: userId, search
      // outgoing: results[], error
    
      let error = '';
    
      const { userId, search } = req.body;
    
      let _search = search.trim();
      
      const db = client.db();
      const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', 
                            $options:'r'}}).toArray();
      
      let _ret = [];
      for( let i=0; i<results.length; i++ )
      {
        _ret.push( results[i].Card );
      }
      
      let ret = {results:_ret, error:error};
      res.status(200).json(ret);
    });
    
}