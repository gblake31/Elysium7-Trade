import React, {useState, useContext, useEffect} from 'react';
import './Profile.css';
import dragonImage from './Pictures/dragonLogo.png';
import {UserContext} from '../App'
import ItemList from '../components/ItemList'

import imageCompression from 'browser-image-compression';

function ProfilePage()
{
    let bp = require('../components/Leinecker/Path.js');
    let [userMessage, setUserMessage] = useState("");
    let [passMessage, setPasswordMessage] = useState("");

    let [oldLogin, setOldLogin] = useState("");
    let [oldPassword, setOldPassword] = useState("");
    let login = "";
    let [userID, setUserID] = useState("");
    let curPassword = "";
    let newPassword = "";
    let confirmNewPass = "";
    let [oldProfilePic, setOldProfilePic] = useState("");
    let profilePicRef;
    let [email, setEmail] = useState("");
    let [profilePic, setProfilePic] = useState("");
    let inventoryArr;
    let [inventory, setInventory] = useState([]);

    async function fillInventory(idArr) {
      console.log(idArr);
      inventoryArr = [];
      for (let i = 0; i < idArr.length; i++) {
        await appendInventory(i, idArr[i]);
      }
      setInventory(inventoryArr);
    }

    async function uploadImage() {
      let imgFile = profilePicRef.files[0];
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 800
      }
      let compressedFile;
      try {
        compressedFile = await imageCompression(imgFile, options);
      } catch (error) {
        console.log(error);
        return;
      }

      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

      let imgstr = await toBase64(compressedFile);
      setProfilePic(imgstr);
    }

    function createListing() {
      localStorage.setItem('item', "");
      window.location.href = "/listing";
    }

    function editListing() {
      window.location.href = "/listing";
    }

    // incoming: userid
    // outgoing: result, error
    // Get userID
    useEffect(() => {
      const loggedInUser = localStorage.getItem('user_data');
      if (!loggedInUser) {
        window.location.href = '/'
      }
      else
      {
        getUserInfo();
      }
      }, []);
    
    const getUserInfo = async () => 
    {
      try
      {
        let temp = JSON.parse(localStorage.getItem('user_data'));
        let obj = {userid: temp.id};
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
          /* result format: 
          id, login, password, firstname, lastname, email, ordered, favorited, listings, profilepicture, verified
          */
          await setUserID(userInfo._id);
          await setOldLogin(userInfo.login);
          await setOldPassword(userInfo.password);
          await setEmail(userInfo.email);
          await setOldProfilePic(userInfo.profilepicture);
          await setProfilePic(userInfo.profilepicture);
          await fillInventory(userInfo.listings);
          
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

    const appendInventory = async (i, itemid) => 
    {
      try
      {
        let obj = {itemid: itemid};
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
          }
          inventoryArr[i] = item;
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
    
    
    
    // Check if they are actually logged in and then get user info
    let {loggedIn, setLoggedIn} = useContext(UserContext);

    const update = async (event) => 
    {

      let obj = {
        userid: userID,
        login: oldLogin, 
        password: oldPassword,
        email: email,
        profilepicture: oldProfilePic,
        verified: true};
      if(event.target.innerHTML == "Change Username")
      {
        obj.login = login.value;
        oldLogin = login.value;
      }
      else if(event.target.innerHTML == "Change Password")
      {
        if (curPassword != oldPassword)
        {
          setPasswordMessage("Your current password is incorrect!");
          return;
        }
        if (newPassword.value !== confirmNewPass.value) {
          setPasswordMessage("Your passwords don't match!");
          return;
        }
        else
        {
          setPasswordMessage("");
        }
        obj.password = newPassword.value;
      }
      else if (event.target.innerHTML == "Update Profile Picture") {
        obj.profilepicture = profilePic;
      }
      
      console.log(obj);
      event.preventDefault();
      // incoming: userid, login, password, firstname, lastname, email, profilepicture, verified
      // outgoing: result, error
      
      let js = JSON.stringify(obj);
      try
      {    
          const response = await fetch(bp.buildPath('api/updateAccount'),
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
          let res = JSON.parse(await response.text());
          if( res.error.length > 0)
          {
              console.log(res.error);
              setUserMessage('Something Went Wrong');
          }
          else
          {
              var user = {id:userID,username:oldLogin,email:email};
              console.log(user);
              localStorage.setItem('user_data', JSON.stringify(user));
              window.location.href = "/profile";
          }
      }
      catch(e)
      {
          alert(e.toString());
          return;
      }    
    }  
    
    return(        
      <main>
          <div className="Header">
				    <h2>Account:</h2>
				  </div>
          <div className='profile_editor'>
            <div className='profile_images'>
              <img id = 'profile-pic' src = {profilePic}></img>
              <input type = "file" onChange = {uploadImage} ref={(c) => profilePicRef = c}></input>
              <button onClick = {update}>Update Profile Picture</button>
            </div>
            <div id = 'input-fields'> 
                <div className='input-box'>
                  <label id = "Text" >Username:</label>
                  <input className = "account_field" type = "text"  
                  defaultValue = {oldLogin} ref={(c) => login = c} ></input>
                  <p>{userMessage}</p>
                  <h3 className = "click-text" onClick={update}>Change Username</h3>
                </div>
                <div className='input-box'>
                  <label id = "Text" >Current Password:</label>
                  <input className = "account_field" type = "text" ref={(c) => curPassword = c} 
                  placeholder = 'Current Password'></input>
                </div>
                <div className='input-box'>
                  <label id = "Text" >New Password:</label>
                  <input className = "account_field" type = "text" ref={(c) => newPassword = c} 
                  placeholder = 'New Password'></input>
                  <input className = "account_field" type = "text" ref={(c) => confirmNewPass = c} 
                  placeholder = 'Retype New Password'></input>
                  <p>{passMessage}</p>
                  <h3 className = "click-text" onClick={update}>Change Password</h3>
                </div>
            </div>
          </div>
          <div className="Header">
				    <h2>Inventory:</h2>
            <ItemList arr = {inventory} inventory = {true}/>
				  </div>
          <button onClick = {createListing}>Create a new Listing!</button>
          <button onClick = {editListing}>Edit a Listing!</button>

            
      </main>
    );
    
}

export default ProfilePage;