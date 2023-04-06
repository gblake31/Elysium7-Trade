import React, {useState, useContext, useEffect} from 'react';
import './Profile.css';
import dragonImage from './Pictures/dragonLogo.png';
import {UserContext} from '../App'

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
    let [email, setEmail] = useState("");
    let [profilepic, setProfilePic] = useState(0);

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
        }
        catch(e)
        {
          //setMessage('Res: ' + res);
          //console.log("LOCAL STORAGE ID: "+localStorage.getItem('user_data').id);
          
          //console.log("LOCAL STORAGE: "+ temp.id);
          console.log('Something Went Wrong');
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
      console.log("OLD PASS: "+ oldPassword);
      console.log("USERID: "+ userID);
      let obj = {
        userid: userID,
        login: oldLogin, 
        password: oldPassword,
        email: email,
        profilepicture: profilepic,
        verified: true};
      if(event.target.innerHTML == "Change Username")
      {
        obj.login = login.value;
        oldLogin = login.value;
      }
      else if(event.target.innerHTML == "Change Password")
      {
        if (newPassword.value !== confirmNewPass.value) {
          console.log("Your passwords don't match!");
          setPasswordMessage("Your passwords don't match!");
          return;
        }
        obj.password = newPassword.value;
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
              // window.location.href = "/profile";
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
          <img id = 'profile-pic' src = {dragonImage}></img>
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