import React, {useState, useEffect} from 'react';
import dragonImage from './Pictures/dragonLogo.png';
import {UserContext} from '../App'

import './item.css'

function ProfilePage()
{
    let [seller, setSeller] = useState("");
    let [sellerPic, setSellerPic] = useState("");
    let [sellerEmail, setSellerEmail] = useState("");
    let [itemName, setItemName] = useState("");
    let [itemPrice, setItemPrice] = useState("");
    let [itemImage, setItemImage] = useState("");
    let [itemDesc, setItemDesc] = useState("");
    let bp = require('../components/Leinecker/Path.js');
    let itemID;
    let sellerID;
    //let item = JSON.parse(localStorage.getItem('item'));

    useEffect(() => {
        getItemInfo();
        console.log("GOT HERE");
        
        
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
          sellerID = item.sellerid;
          getUserInfo(item.sellerid);
        }
        catch(e)
        {
          console.log('Something Went Wrong Trying to get UserInfo');
        }
        
      }
      catch(e)
      {
        alert(e.toString());
        return;
      }  
    }
    const getUserInfo = async (id) => 
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
            console.log(res.error);
            return;
          }
          setSeller(userInfo.login);
          setSellerPic(userInfo.profilepicture);
          setSellerEmail(userInfo.email);
        }
        catch(e)
        {
          console.log('Something Went Wrong Trying to get UserInfo');
        }
        
      }
      catch(e)
      {
        alert(e.toString());
        return;
      }  
    }
    return (
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
                        <h1 id = "itemName">{itemName}</h1>
                        <h5 id = "itemPrice">${itemPrice}</h5>
                    </div>
                    <div id = "itemRight">
                        <img id = "itemImage" src = {itemImage}></img>
                    </div>
                </div>
                <h2 id = "descriptionHeader">Description</h2>
                <p id = "itemDesc">{itemDesc}</p>
                <button className='button'>I'm Interested!</button>
            </div>
        </div>
    );
}

export default ProfilePage;