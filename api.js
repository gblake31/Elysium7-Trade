require('express');
require('mongodb');

const { ObjectId } = require('mongodb');

exports.setApp = function ( app, client )
{
    app.post('/api/login', async (req, res, next) => 
    {
      // incoming: login, password
      // outgoing: id, email, error
    
      let er = '';
    
      const { login, password } = req.body;
    
      const db = client.db('COP4331');
      const results = await db.collection('Users').find({login:login,password:password}).toArray();
    
      let id = -1;
      let email = '';
    
      if( results.length > 0 )
      {
        id = results[0]._id;
        email = results[0].email;
      }
      else {
        er = 'User not found'
      }
    
      let ret = { id:id, login:login, email:email, error:er};
      res.status(200).json(ret);
    });

    app.post('/api/register', async (req, res, next) => 
    {
      // incoming: login, password, email
      // outgoing: id, error
    
      let er = '';
      let result;
    
      const { login, password, email } = req.body;
    
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
          result = await db.collection('Users').insertOne({login:login, password:password, 
            email:email, ordered:[], favorited:[], listings:[], 
            profilepicture:0, verified:false});
        } catch (e) {
          console.log(e);
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
      // incoming: itemid, sellerid, itemname, price, description, condition, image
      // outgoing: result, error
      
      let fs = require('fs');
      
      let er = '';
      let result;

      const db = client.db('COP4331');
    
      const { itemid, sellerid, itemname, price, description, condition, picture } = req.body;

      let id = new ObjectId(itemid);

      try
        {
          result = await db.collection('Items').updateOne(
            {_id:id,sellerid:sellerid},
            {
              $set: {itemname:itemname,price:price,description:description,
                      condition:condition,image:fs.readFileSync(image)} 
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

    app.post('/api/retrieveUserInfo', async (req, res, next) => 
    {
      // incoming: userid
      // outgoing: result, error
      
      let er = '';

      const { userid } = req.body;

      let id = new ObjectId(userid);

      // Select the COP4331 database
      const db = client.db('COP4331');
      // Find the userID in the Users collection
      const results = await db.collection('Users').find({_id:id}).toArray();

      let result;

      // If there was a find
      if (results.length > 0) 
      {
        result=results[0];
      }
      else {
        er = 'User not found';
      }

      // Return a JSON object
      let ret = {result:result, error:er}
      res.status(200).json(ret);
    });

    app.post('/api/deleteAccount', async(req, res, next) =>
    {
      // incoming: login, password
      // outgoing: error

      let er = '';

      // Get the body
      const { login, password } = req.body;

      // Select the COP4331 database
      const db = client.db('COP4331');

      try 
      {
        // Delete the account and acquire the results
        const results = await db.collection('Users').deleteOne({login:login,password:password});
        
        // If the deletion was not acknowledged
        if (results.acknowledged === false) 
        {
          er += 'Write concern disabled\n';
        }
        // If the account was not deleted
        else if (results.deletedCount !== 1) 
        {
          er += 'Account deletion failed\n';
        }
      } catch(e) 
      {
        console.log(e);
      }

      // Return a JSON object
      let ret = { error:er };
      res.status(200).json(ret);

    });

    app.post('/api/updateAccount', async(req, res, next) => {
      // incoming: userid, login, password, email, profilepicture, verified
      // outgoing: result, error
    
      let er = '';
      let result;
    
      const db = client.db('COP4331');

      const { userid, login, password, email, profilepicture, verified } = req.body;
      let id = new ObjectId(userid);
      
      try
      {
        result = await db.collection('Users').updateOne(
          {_id:id},
          {
            $set: {login:login,password:password,email:email,
              profilepicture:profilepicture,verified:verified} 
          }
        );

        if( result.matchedCount == 0)
        {
          er = "User could not be found";
        }
      }
      catch(e)
      {
        er = e.toString();
      }
    
      let ret = {result:result, error:er};
      res.status(200).json(ret);
    });

    app.post('/api/createItem', async(req, res, next) => {
      // incoming: sellerid, itemname, price, description, condition, image, listedtime
      // outgoing: itemid, error

      let fs = require('fs');

      let er = '';
      let result;
    
      let id;

      const { sellerid:sellerid, itemname:itemname, price:price, 
        description:description, condition:condition, image:image, 
        listedtime:listedtime } = req.body;
    
      const db = client.db('COP4331');

      try {
        result = await db.collection('Items').insertOne({sellerid:sellerid,
          itemname:itemname, price:price, description:description,
          condition:condition, listedtime:listedtime, image:image
        });

        id = result.insertedId;
      } catch(e) {
        er = 'Insert failed';
        console.log(e);
      }

      let ret = { itemid:id, error:er};
      res.status(200).json(ret);
    });

    app.post('/api/sendEmail/', async(req, res, next) => {
      // incoming: receiver, subject, text, html
      // outgoing: error
      
      let er = '';

      const nodemailer = require('nodemailer');

      const { receiver:receiver, subject:subject, text:text, html:html } = req.body;

      /*
      let testAccount = await nodemailer.createTestAccount();

      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      */

      let transporter = nodemailer.createTransport({
        service: "Hotmail",
        auth: {
          user: "elysiumtrade7@outlook.com",
          pass: "DkzMTtfd46enG3M",
        }
      })

      let mailOptions = {
        from: 'elysiumtrade7@outlook.com',
        to: receiver,
        subject: subject,
        text: text,
        html: html
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          er = error;
        } else {
          console.log('Message sent: %s', info.messageId);
        }
        transporter.close();
      });

      //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      let ret = {error:er};
      res.status(200).json(ret);
    });

    app.post('/api/verify/:id', async(req, res, next) => {
      // outgoing: result, error

      let result;
      let er = '';

      const db = client.db('COP4331');
      const id = new ObjectId(req.params.id);

      try
      {
        result = await db.collection('Users').updateOne(
          {_id:id},
          {
            $set: {verified:true} 
          }
        );

        if( result.matchedCount == 0)
        {
          er = "User could not be found";
        }
      }
      catch(e)
      {
        er = e.toString();
      }
    
      let ret = {result:result, error:er};
      res.status(200).json(ret);
    });

    app.post('/api/addItemToUser', async(req, res, next) => {
      // incoming: userid, itemid
      // outoging: result, error
      
      let result;
      let er = '';

      const {userid, itemid} = req.body;

      const db = client.db('COP4331');
      const id = new ObjectId(userid);

      const results = await db.collection('Users').find({_id:id}).toArray();

      // If there was a find
      if (results.length > 0) 
      {
        itemlist = results[0].listings;
        itemlist.push(itemid);

        try
        {
          result = await db.collection('Users').updateOne(
            {_id:id},
            {
              $set: {listings:itemlist} 
            }
          );

          if( result.matchedCount == 0)
          {
            er = "User could not be found";
          }
        }
        catch(e)
        {
          er = e.toString();
        }
      }
      else {
        er = 'User not found';
      }

      // Return a JSON object
      let ret = {result:result, error:er}
      res.status(200).json(ret);
    });
}