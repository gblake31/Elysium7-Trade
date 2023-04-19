import React, {useState, useEffect} from 'react';
import dragonImage from './Pictures/dragonLogo.png';
import {UserContext} from '../App'
import logostr from './Pictures/LogoString.txt';

import './item.css'

function ItemPage()
{
    let [seller, setSeller] = useState("");
    let [sellerPic, setSellerPic] = useState("");
    let [sellerEmail, setSellerEmail] = useState("");
    let [itemName, setItemName] = useState("");
    let [itemPrice, setItemPrice] = useState("");
    let [itemImage, setItemImage] = useState("");
    let [itemDesc, setItemDesc] = useState("");
    let [itemCond, setItemCond] = useState("");
    let [itemCat, setItemCat] = useState("");
    let [message, setMessage] = useState("");
    let userPic;
    let [sellerID, setSellerID] = useState("");
    let bp = require('../components/Leinecker/Path.js');
    let itemID;
    //let item = JSON.parse(localStorage.getItem('item'));

    let categories = ["None", "Games", "Consoles", "Controllers", "Keyboards/Mice", "Audio", "Other"];

    useEffect(() => {
        getItemInfo();
        
    }, []);
    const getItemInfo = async () =>
    {
      try
      {
        let temp = window.location.href.split("/");
        itemID = temp[temp.length - 1];
        let obj = {itemid: itemID};
        let js = JSON.stringify(obj); 
   
        const response = await fetch(bp.buildPath('api/retrieveItemInfo'),
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        let res = JSON.parse(await response.text());
        let item = res.result;
        try
        {
          if(res.error.length > 0)
          {
            console.log(res.error);
            return;
          }
          setItemName(item.itemname);
          setItemPrice(item.price);
          setItemImage(item.image);
          setItemDesc(item.description);
          setItemCond(item.condition);
          setItemCat(item.category);
          setSellerID(item.sellerid);
          // boolean is to tell getuser that we need to store sellerinfo
          getUserInfo(item.sellerid, true);
        }
        catch(e)
        {
          console.log('Something Went Wrong Trying to get UserInfo');
        }
        
      }
      catch(e)
      {
        console.log(e.toString());
        return;
      }  
    }
    const getUserInfo = async (id, seller) => 
    {
      try
      {
        let obj = {userid: id};
        let js = JSON.stringify(obj); 
   
        const response = await fetch(bp.buildPath('api/retrieveUserInfo'),
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        let res = JSON.parse(await response.text());
        let userInfo = res.result;
        try
        {
          if(res.error.length > 0)
          {
            console.log("id:" + id);
            console.log("ERorr: "+res.error);
            return;
          }
          if(seller)
          {
            setSeller(userInfo.login);
            setSellerPic(userInfo.profilepicture);
            setSellerEmail(userInfo.email);
          }
          else
          {
            userPic = userInfo.profilepicture;
          }
          
        }
        catch(e)
        {
          console.log('Something Went Wrong Trying to get UserInfo');
        }
        
      }
      catch(e)
      {
        console.log(e.toString());
        return;
      }  
    }

    const contactOwner = async () =>
    {
      let user = localStorage.getItem('user_data');
      if (!user) 
      {
        setMessage("You need to be logged in to send inquiries");
        return;
      }
      user = JSON.parse(user);
      // False means get buyer not seller
      await getUserInfo(user.id, false);
      if(user.id == sellerID)
      {
        setMessage("This is your item!");
        return;
      }
      let logo;
        await fetch(logostr)
        .then(r => r.text())
        .then(text => {
        // code = "\"" + text +"\"";
        logo = text;        
        });
        let obj = {receiver: sellerEmail, subject: "Someone Is Interested in Your Product", 
        text: "", html: `<head>
        <style> 
          #text{
            margin-left: 10px;
            color: white;
            text-align: center;
          }
          #logo{
            align-self: center;
            width: 60px;
            height: 70px;
          }
          #pfp{
            align-self: center;
            width: 5vw;
          }
          #item-img{
            align-self: center;
            max-width: 500px;
            max-height: 500px;
          }
          #top-bar{
            margin: auto;
            display: flex;
            flex-direction: row;
            justify-content: center;
            background-color: #102610;
          }
          #bkg
          {
            flex-direction: column;
            background-color: #234423;
          }
          #body-bar{
            margin: auto;
            display: flex;
            flex-direction: row;
            justify-content: center;
            background-color: #212121;
      
            width: 70%;
          }
        </style>
      </head>
      
      <body>
        <div id = "top-bar">
        <h1 id = "text"> Elysium7 Trade </h1>
        <img id = "logo" src = "${logo}"> 
            </div>
        <div id = "bkg">
        <div id = "body-bar">
          <img id = "pfp" src = "${userPic}">
          <h2 id = "text"> ${user.username}</h2>
        </div>
        <div id = "body-bar">
          <h2 id = "text"> Hey! I am interested in buying an item you are selling: </h2>
        </div>
        <div id = "body-bar">
          <h2 id = "text">${itemName}</h2>
        </div> 
        <div id = "body-bar">
          <img id = "item-img" src = "${itemImage}">
        </div>
        <div id = "body-bar">
          <h2 id = "text"> Listing Price: \$${itemPrice}</h2>
        </div>
        <div id = "body-bar">
          <h2 id = "text"> Please contact me at: ${user.email} to discuss purchase details</h2>
        </div>
        </div>
      </body>
      
      
      
      `};
      
        let js = JSON.stringify(obj);
        try
        {    
            const response = await fetch(bp.buildPath('api/sendEmail'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            let res = JSON.parse(await response.text());
            if( res.error.length > 0 )
            {
                console.log(res.error);
                return;
            }
            setMessage("Owner contacted! Your email has been sent to them so they may communicate with you");
        }
        catch(e)
        {
          console.log(e.toString());
            return;
        }    

    }
    return (
      <main>
        <div id="itemOuter">
            <div id = "sellerInfo">
                <div className = "flex">
                    <img id = "itemSellerPic" src = {sellerPic}></img>
                    <h1 id = "itemSeller">Seller: {seller}</h1>
                    <h2 id = "itemSellerEmail">{sellerEmail}</h2>
                </div>
            </div>
            <div id = "itemInfo">
                <div id = "itemTop">
                    <div id = "itemLeft">
                        <div id = "name-and-price">
                          <h1 id = "itemName">{itemName}</h1>
                          <h5 id = "itemPrice">${itemPrice}</h5>
                        </div>
                        <h2 id = "descriptionHeader">Description</h2>
                        <div id = "lolflex"><p id = "itemDesc">{itemDesc}</p></div>
                        <div id = "condition">
                          <h2 id = "conditionHeader">Condition</h2>
                          <p id = "conditionDesc">{itemCond}</p>
                        </div>
                        <div id = "condition">
                          <h2 id = "conditionHeader">Category</h2>
                          <p id = "conditionDesc">{categories[itemCat]}</p>
                        </div> 
                    </div>
                    <div id = "itemRight">
                        <img id = "itemImage" src = {itemImage}></img>
                    </div>
                </div>
                
                <button className='button' onClick={contactOwner}>I'm Interested!</button>
                <p>{message}</p>
            </div>
        </div>
      </main>
    );
}

export default ItemPage;