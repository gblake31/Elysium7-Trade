import React, {useState} from 'react'
import './dropdown.css';

function LoginDropdown(props) {

    let css = {};
    // Moves the position of the props (login box), css handles transition
    css.top = props.visible ? "-4%" : "-200%";

    let bp = require('../Leinecker/Path.js');
  
    let loginName;
    let loginPassword;
    let [message, setMessage] = useState("");

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
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {id:res.id,username: loginName.value, email: res.email};
                if(!res.verified)
                {
                    setMessage("Your account needs to be verified. Check your email");
                    return;
                }
                localStorage.setItem('user_data', JSON.stringify(user));

                console.log('Login Successful');
                props.onLogin();
                loginName.value = "";
                loginPassword.value = "";
                
            }
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }    
  };

    return (
        <div id = "login-box" style = {css}>
            <button className = "button" onClick={()=>{window.location.href = "/"}}>Exit</button>
            <h1>Welcome back</h1>
            {/* <label id = "username" >Username</label> */}
            <input className = "field" type = "text" ref={(c) => loginName = c}  placeholder = "Username"></input>
            {/* <label id = "password">Password</label> */}
            <input className = "field" type = "password" ref={(c) => loginPassword = c} placeholder = "Password"></input>
            <button className = "button" onClick = {doLogin}>Login</button>
            <p>{message}</p>
            <h3 className = "click-text" onClick={props.switchToRegister}>Don't have an account?</h3>
            <h3 className = "click-text" onClick={props.switchToForgot}>Forgot Password?</h3>
            
            {/* <div className = "horizontal">
                <h3>Forgot Password?</h3>
                <button onClick={props.switchToRegister}>Register</button>
            </div> */}
            
        </div>
    )
}

export default LoginDropdown;

