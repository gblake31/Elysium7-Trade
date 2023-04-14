import React, {useState, useEffect} from 'react';
import dragonImage from './Pictures/dragonLogo.png';
import {UserContext} from '../App'

import './item.css'

function ProfilePage()
{
    let [seller, setSeller] = useState("");
    let [sellerPic, setSellerPic] = useState("");
    let [sellerEmail, setSellerEmail] = useState("");
    let bp = require('../components/Leinecker/Path.js');
    let item = JSON.parse(localStorage.getItem('item'));

    useEffect(() => {
        getUserInfo();
        }, []);
    const getUserInfo = async () => 
    {
      try
      {
        let obj = {userid: item.sellerid};
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
                        <h1 id = "itemName">{item.itemname}</h1>
                        <h5 id = "itemPrice">${item.price}</h5>
                    </div>
                    <div id = "itemRight">
                        <img id = "itemImage" src = {item.image}></img>
                    </div>
                </div>
                <h2 id = "descriptionHeader">Description</h2>
                <p id = "itemDesc">{item.description}</p>
                <button className='button'>I'm Interested!</button>
            </div>
        </div>
    );
}

export default ProfilePage;