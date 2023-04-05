import React, {useState} from 'react'
import './dropdown.css';

function LoginDropdown(props) {

    let css = {};
    // Moves the position of the props (login box), css handles transition
    css.top = props.visible ? "-4%" : "-200%";

    let bp = require('../Leinecker/Path.js');
  
    let loginName;
    let loginPassword;

    const doLogin = async event => 
    {
        event.preventDefault();
        let obj = {login:loginName.value,password:loginPassword.value};
        let js = JSON.stringify(obj);
        try
        {    
            const response = await fetch(bp.buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            let res = JSON.parse(await response.text());
            if( res.id <= 0 )
            {
                console.log('User/Password combination incorrect');
            }
            else
            {
                var user = {id:res.id,username: loginName.value, email: res.email};
                localStorage.setItem('user_data', JSON.stringify(user));
                console.log('Login Successful');
                props.onLogin();
                loginName.value = "";
                loginPassword.value = "";
                
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
  };

    return (
        <div id = "login-box" style = {css}>
            <h1>Welcome back</h1>
            {/* <label id = "username" >Username</label> */}
            <input className = "field" type = "text" ref={(c) => loginName = c}  placeholder = "Username"></input>
            {/* <label id = "password">Password</label> */}
            <input className = "field" type = "password" ref={(c) => loginPassword = c} placeholder = "Password"></input>
            <button onClick = {doLogin}>Login</button>
            <div className = "horizontal">
                <h3>Don't have an account?</h3>
                <button onClick={props.switchToRegister}>Register</button>
            </div>
        </div>
    )
}

export default LoginDropdown;

