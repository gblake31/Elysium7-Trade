import React, {useState} from 'react'
import './dropdown.css'

function RegisterDropdown(props) {

    let css = {};
    // Moves the position of the props (login box), css handles transition
    css.top = props.visible ? "-20%" : "-200%";

    let bp = require('../Leinecker/Path.js');
  
    let loginEmail;
    let loginUsername;
    let loginPassword;
    let loginConfirmPassword;

    let [message, setMessage] = useState("");

    const doRegister = async event => 
    {   
        if (loginPassword.value !== loginConfirmPassword.value) {
            console.log("Your passwords don't match!");
            setMessage("Your passwords don't match!");
            return;
        }

        event.preventDefault();
        let obj = {login: loginUsername.value, email: loginEmail.value, password: loginPassword.value};
        let js = JSON.stringify(obj);
        try
        {    
            const response = await fetch(bp.buildPath('api/register'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            let res = JSON.parse(await response.text());
            if( res.id <= 0 )
            {
                console.log('User already exists.');
                setMessage("User already exists in the database");
                console.log(res.err);
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                console.log('Register Successful');
                props.onRegister();
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
  };

    return (
        <div id = "register-box" style = {css}>
            <h2>Create an Account</h2>
            <input className = "field" type = "text" ref={(c) => loginUsername = c} placeholder = "Username"></input>
            {/* <label id = "email">Email</label> */}
            <input className = "field" type = "text" ref={(c) => loginEmail = c} placeholder = "Email"></input>
            {/* <label id = "username">Username</label> */}
            <input className = "field" type = "text" ref={(c) => loginUsername = c} placeholder = "Username"></input>
            {/* <label id = "password">Password</label> */}
            <input className = "field" type = "password" ref={(c) => loginPassword = c} placeholder = "Password"></input>
            {/* <label id = "confirmPassword">Confirm Password</label> */}
            <input className = "field" type = "password" ref={(c) => loginConfirmPassword = c} placeholder = "Confirm Password"></input>
            <button onClick = {doRegister}>Register</button>
            <p>{message}</p>
            <div className = "horizontal">
                <h3>Already have an account?</h3>
                <button onClick = {props.switchToLogin}>Login</button>
            </div>
        </div>
    )
}

export default RegisterDropdown;

