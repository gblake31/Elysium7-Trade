import React, {useState, useContext, useEffect} from 'react';
import './Profile.css';
import dragonImage from './Pictures/dragonLogo.png';
import {UserContext} from '../App'

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
    let oldProfilePic = "";
    let profilePicRef;
    let [email, setEmail] = useState("");
    let [profilePic, setProfilePic] = useState("");

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
          await setProfilePic(userInfo.profilepicture);
          profilePic = userInfo.profilepicture;
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
      <div>
          <img id = 'profile-pic' src = {profilePic}></img>
          <input type = "file" onChange = {uploadImage} ref={(c) => profilePicRef = c}></input>
          <button onClick = {update}>Update Profile Picture</button>
          <div id = 'input-fields'> 
              <div className='input-box'>
                <label id = "username" >Change Username</label>
                <input className = "field" type = "text"  
                defaultValue = {oldLogin} ref={(c) => login = c} ></input>
                <p>{userMessage}</p>
                <button onClick = {update}>Change Username</button>  
              </div>
              <div className='input-box'>
                <label id = "username" >Change Password</label>
                <input className = "field" type = "text" ref={(c) => curPassword = c} 
                placeholder = 'Current Password'></input>
                <input className = "field" type = "text" ref={(c) => newPassword = c} 
                placeholder = 'New Password'></input>
                <input className = "field" type = "text" ref={(c) => confirmNewPass = c} 
                placeholder = 'Retype New Password'></input>
                <p>{passMessage}</p>
                <button onClick = {update}>Change Password</button>  
              </div>
          </div>
          
             
            
      </div>
    );
    
}

export default ProfilePage;