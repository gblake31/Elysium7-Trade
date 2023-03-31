import React, {useState, useContext, useEffect} from 'react';
// import './Profile.css';
import {UserContext} from '../App'

function ProfilePage()
{
    // incoming: userid
      // outgoing: result, error
      // Get userID
    // const getUserInfo = async event => 
    // {
    //     event.preventDefault();
    //     let obj = {userid: localStorage.getItem('user_data').userid};
    //     let js = JSON.stringify(obj);
    //     try
    //     {    
    //         const response = await fetch(bp.buildPath('api/retrieveUserInfo'),
    //             {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
    //         let res = JSON.parse(await response.text());
    //         if(res.er.length > 0 )
    //         {
    //             console.log('Something Went Wrong');
    //         }
    //         else
    //         {
    //             // be careful with what res is, api returns a 'result' object
    //             var user = {useridfirstName:res.firstName,lastName:res.lastName,id:res.id}
    //             localStorage.setItem('user_data', JSON.stringify(user));
    //             console.log('Login Successful');
    //             loginName.value = "";
    //             loginPassword.value = "";
    //             props.onLogin(res.firstName);
    //         }
    //     }
    //     catch(e)
    //     {
    //         alert(e.toString());
    //         return;
    //     }  
    // }  

        // incoming: userid, login, password, firstname, lastname, email, profilepicture, verified
      // outgoing: result, error
    
      
    let userID = localStorage.getItem('user_data').password;
    let loginName = localStorage.getItem('user_data').login;
    let loginPassword = localStorage.getItem('user_data').password;
    let firstName = localStorage.getItem('user_data').firstName;



    // const update = async event => 
    // {
    //     event.preventDefault();
    //     let obj = {userid: login:loginName.value,password:loginPassword.value};
    //     let js = JSON.stringify(obj);
    //     try
    //     {    
    //         const response = await fetch(bp.buildPath('api/login'),
    //             {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
    //         let res = JSON.parse(await response.text());
    //         if( res.id <= 0 )
    //         {
    //             console.log('User/Password combination incorrect');
    //         }
    //         else
    //         {
    //             var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
    //             localStorage.setItem('user_data', JSON.stringify(user));
    //             console.log('Login Successful');
    //             loginName.value = "";
    //             loginPassword.value = "";
    //             props.onLogin(res.firstName);
    //         }
    //     }
    //     catch(e)
    //     {
    //         alert(e.toString());
    //         return;
    //     }  
    //}  
    let {loggedIn, setLoggedIn} = useContext(UserContext);
    useEffect(() => {
		const loggedInUser = localStorage.getItem('user_data');
		if (!loggedInUser) {
		  window.location.href = '/'
		}
	  }, []);

    return(
        <div>
             <label id = "username" >Change First Name</label>
             <input className = "field" type = "text" ref={(c) => firstName = c.value}></input>
             
             {/* <button onClick = {changeName()}>Update</button> */}
            <h3>Reset Password</h3>
            
        </div>
    );
    
}

export default ProfilePage;