import React, {useState} from 'react'
import './dropdown.css'

function RegisterDropdown(props) {

    let css = {};
    // Moves the position of the props (login box), css handles transition
    css.top = props.visible ? "20%" : "-1000px";

    let bp = require('../Leinecker/Path.js');
  
    let loginFirstName;
    let loginLastName;
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
        let obj = {firstname: loginFirstName.value, lastname: loginLastName.value, login: loginUsername.value, email: loginEmail.value, password: loginPassword.value};
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
        <div id = "outer" style = {css}>
            <h1>Create an Account</h1>
            <label id = "firstname">First Name</label>
            <input className = "field" type = "text" ref={(c) => loginFirstName = c}></input>
            <label id = "lastname">Last Name</label>
            <input className = "field" type = "text" ref={(c) => loginLastName = c}></input>
            <label id = "email">Email</label>
            <input className = "field" type = "text" ref={(c) => loginEmail = c}></input>
            <label id = "username">Username</label>
            <input className = "field" type = "text" ref={(c) => loginUsername = c}></input>
            <label id = "password">Password</label>
            <input className = "field" type = "password" ref={(c) => loginPassword = c}></input>
            <label id = "confirmPassword">Confirm Password</label>
            <input className = "field" type = "password" ref={(c) => loginConfirmPassword = c}></input>
            <button onClick = {doRegister}>Register</button>
            <p>{message}</p>
            <div id = "footer">
                <h3>Already have an account?</h3>
                <button onClick = {props.switchToLogin}>Login</button>
            </div>
        </div>
    )
}

export default RegisterDropdown;

