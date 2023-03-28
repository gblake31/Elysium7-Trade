import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import axios from 'axios';

function Login()
{
    const app_name = 'paradise-7'

    let bp = require('./Path.js');
    let storage = require('../../tokenStorage.js');            
  
    let loginName;
    let loginPassword;

    const [message, setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();
        
        let obj = {login:loginName.value,password:loginPassword.value};
        let js = JSON.stringify(obj);
        
        let config = 
        {
            method: 'post',
            url: bp.buildPath('api/login'),	
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };

        axios(config)
            .then(function (response) 
        {
            let res = response.data;
            if (res.error) 
            {
                setMessage('User/Password combination incorrect');
            }
            else 
            {	
                storage.storeToken(res);
                let jwt = require('jsonwebtoken');
    
                let ud = jwt.decode(storage.retrieveToken(),{complete:true});
                let userId = ud.payload.userId;
                let firstName = ud.payload.firstName;
                let lastName = ud.payload.lastName;
                  
                let user = {firstName:firstName,lastName:lastName,id:userId}
                localStorage.setItem('user_data', JSON.stringify(user));
                window.location.href = '/cards';
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });
    }

    return(
      <div id="loginDiv">
        <span id="inner-title">PLEASE LOG IN</span><br />
        <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c}  /><br />
        <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
        <input type="submit" id="loginButton" class="buttons" value = "Do It"
          onClick={doLogin} />
        <span id="loginResult">{message}</span>
     </div>
    );
};

export default Login;
