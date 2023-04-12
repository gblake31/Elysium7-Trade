import React, {useState} from 'react'
import './dropdown.css';

function ForgotPassDropdown(props) {

    let css = {};
    // Moves the position of the props (login box), css handles transition
    css.top = props.visible ? "-4%" : "-200%";

    let bp = require('../Leinecker/Path.js');
  
    let email;
    let [message, setMessage] = useState("");

    const sendEmail = async()  => 
    {   
        return;
        // CHANGE FOR REAL THING
        let link = "https://paradise-7.herokuapp.com/verifyemail/"; //NEEDS ID
        let testlink = "localhost:3000/forgotpassword/"; //NEEDS ID
        let obj = {receiver: email.value, subject: "Forgot Password for Elysium Account", 
        text: "Looks like you forgot your password. Please ignore if you did not request this. Paste this link in your browser: "+testlink, html: ""};
        let js = JSON.stringify(obj);
        try
        {    
            const response = await fetch(bp.buildPath('api/sendEmail'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            let res = JSON.parse(await response.text());
            if( res.error.length > 0 )
            {
                console.log(res.error);
            }
            else
            {
                console.log('Register Successful');
                setMessage("Register Successful! Please check your email to get verified");
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
            <button onClick={()=>{window.location.href = "/"}}>Exit</button>
            <h1>Please Enter your email</h1>
            <input className = "field" type = "text" ref={(c) => email = c}  placeholder = "Email"></input>
            <button onClick = {sendEmail}>Send Password Reset</button>
            <p>{message}</p>
            <h3 className = "click-text" onClick={props.switchToLogin}>Back to Login</h3>
            
            {/* <div className = "horizontal">
                <h3>Forgot Password?</h3>
                <button onClick={props.switchToRegister}>Register</button>
            </div> */}
            
        </div>
    )
}

export default ForgotPassDropdown;
