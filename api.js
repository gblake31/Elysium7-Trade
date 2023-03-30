require('express');
require('mongodb');

exports.setApp = function ( app, client )
{
    app.post('/api/login', async (req, res, next) => 
    {
      // incoming: login, password
      // outgoing: id, firstName, lastName, error
    
      let er = '';
    
      const { login, password } = req.body;
    
      const db = client.db('COP4331');
      const results = await db.collection('Users').find({login:login,password:password}).toArray();
    
      let id = -1;
      let fn = '';
      let ln = '';
    
      if( results.length > 0 )
      {
        id = results[0]._id;
        fn = results[0].firstname;
        ln = results[0].lastname;
      }
      else {
        er = 'User not found'
      }
    
      let ret = { id:id, firstName:fn, lastName:ln, error:er};
      res.status(200).json(ret);
    });

    app.post('/api/register', async (req, res, next) => 
    {
      // incoming: login, password, firstname, lastname
      // outgoing: id, error
    
      let er = '';
      let result;
    
      const { login, password, firstname, lastname } = req.body;
    
      const db = client.db('COP4331');
      const results = await db.collection('Users').find({login:login}).toArray();
    
      let id;
    
      if( results.length > 0 )
      {
        id = '-1';
        er = 'Login is taken';
      }
      else {
        try {
          result = await db.collection('Users').insertOne({login:login, password:password, firstname:firstname, lastname:lastname});
        } catch (e) {
          print(e);
        }

        id = result.insertedId;
      }
    
      let ret = { id:id, error:er};
      res.status(200).json(ret);
    });

    app.post('/api/deleteItem', async (req, res, next) => 
    {
      // incoming: itemid, sellerid 
      // outgoing: result, error
    
      let er = '';
      let result;
      const { ObjectId } = require('mongodb');
      const db = client.db('COP4331');
    
      const { itemid, sellerid } = req.body;

      let id = new ObjectId(itemid);
    
      const results = await db.collection('Items').find({_id:id,sellerid:sellerid}).toArray();

      if( results.length > 0 )
      {
        try
        {
          result = await db.collection('Items').deleteOne({_id:id,sellerid:sellerid});
        }
        catch(e)
        {
          er = e.toString();
        }
      }
      else
      {
        er = "Item was not found";
      }
      
      let ret = { result:result, error:er};
      res.status(200).json(ret);
    });
    
    app.post('/api/searchItems', async (req, res, next) => 
    {
      // incoming: search
      // outgoing: results[], error
    
      let er = '';
    
      const { search } = req.body;
    
      let _search = search.trim();
      
      const db = client.db('COP4331');

      const results = await db.collection('Items').find({ $or: [
        {"itemname":{$regex:_search+'.*',$options:'r'} },
        {"description":{$regex:_search+'.*',$options:'r'} },
        {"condition":{$regex:_search+'.*',$options:'r'} }
        ]}).toArray();
      
      let _ret = [];
      for( let i=0; i<results.length; i++ )
      {
        _ret.push( results[i] );
      }
      
      let ret = {results:_ret, error:er};
      res.status(200).json(ret);
    });

    app.post('/api/loadKItems', async (req, res, next) => 
    {
      // incoming: search, startindex, numitems
      // outgoing: results[], error
    
      let er = '';
    
      const { search, startindex, numitems } = req.body;
    
      let _search = search.trim();
      
      const db = client.db('COP4331');

      const results = await db.collection('Items').find({ $or: [
        {"itemname":{$regex:_search+'.*',$options:'r'} },
        {"description":{$regex:_search+'.*',$options:'r'} },
        {"condition":{$regex:_search+'.*',$options:'r'} }
        ]}).toArray();
      
      let _ret = [];

      if( results.length > startindex )
      {
        let i = startindex;
        let k = numitems;
        while( i < results.length && k > 0)
        {
          _ret.push( results[i] );
          ++i;
          --k;
        }
      }
      else
      {
        er = `Starting index ${startindex} is out of bounds`;
      }
      
      let ret = {results:_ret, error:er};
      res.status(200).json(ret);
    });

    app.post('/api/updateItem', async (req, res, next) => 
    {
      // incoming: itemid, sellerid, itemname, price, description, condition, picture
      // outgoing: result, error
    
      let er = '';
      let result;
      const { ObjectId } = require('mongodb');
      const db = client.db('COP4331');
    
      const { itemid, sellerid, itemname, price, description, condition, picture } = req.body;

      let id = new ObjectId(itemid);

      try
        {
          result = await db.collection('Items').updateOne(
            {_id:id,sellerid:sellerid},
            {
              $set: {itemname:itemname,price:price,description:description,
                      condition:condition,picture:picture} 
            }
          );

          if( result.matchedCount == 0)
          {
            er = "Item could not be found";
          }
        }
        catch(e)
        {
          er = e.toString();
        }     
      
      let ret = { result:result, error:er};
      res.status(200).json(ret);
    });

    app.post('/api/retrieveItemInfo', async (req, res, next) => 
    {
      // incoming: itemid
      // outgoing: result, error
    
      let er = '';
      let result;
      const { ObjectId } = require('mongodb');
      const db = client.db('COP4331');
    
      const { itemid } = req.body;

      let id = new ObjectId(itemid);
      
      const results = await db.collection('Items').find({_id:id}).toArray();

      if( results.length > 0 )
      {
        result = results[0]
      }
      else
      {
        er = "Item was not found";
      }
      
      let ret = { result:result, error:er};
      res.status(200).json(ret);
    });

    app.post('/api/addcard', async (req, res, next) =>
    {
      // incoming: userId, color
      // outgoing: error
        
      const { userId, card } = req.body;
    
      const newCard = {Card:card,UserId:userId};
      let error = '';
    
      try
      {
        const db = client.db('COP4331Cards');
        const result = db.collection('Cards').insertOne(newCard);
      }
      catch(e)
      {
        error = e.toString();
      }
    
      let ret = { error: error };
      res.status(200).json(ret);
    });

    app.post('/api/searchcards', async (req, res, next) => 
    {
      // incoming: userId, search
      // outgoing: results[], error
    
      let error = '';
    
      const { userId, search } = req.body;
    
      let _search = search.trim();
      console.log(search) //
      console.log(_search) //
      
      const db = client.db('COP4331Cards');
      const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', 
                            $options:'r'}}).toArray();

      console.log(results) //
      
      let _ret = [];
      for( let i=0; i<results.length; i++ )
      {
        _ret.push( results[i].Card );
      }
      
      let ret = {results:_ret, error:error};
      res.status(200).json(ret);
    });
}