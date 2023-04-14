import React, {useState} from 'react'
import './dropdown.css'

function RegisterDropdown(props) {

    let css = {};
    // Moves the position of the props (login box), css handles transition
    css.top = props.visible ? "-30%" : "-200%";

    let bp = require('../Leinecker/Path.js');
  
    let loginEmail;
    let loginUsername;
    let loginPassword;
    let loginConfirmPassword;

    let [message, setMessage] = useState("");

    const sendEmail = async(link)  => 
    {   

        let obj = {receiver: loginEmail.value, subject: "Verify Email for Elysium", 
        text: "Thanks for Registering to ElysiumTrade! Paste this link in your browser: "+link, html: ""};
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
    const doRegister = async event => 
    {   
        if (loginPassword.value !== loginConfirmPassword.value) {
            console.log("Your passwords don't match!");
            setMessage("Your passwords don't match!");
            return;
        }
        // Regex for Password
        if(!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(loginPassword.value)))
        {
            setMessage("Your password does not meet the minimum requirements");
            return;
        }
        // Regex to check Email
	    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginEmail.value)))
        {
            setMessage("Invalid Email Format");
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
                console.log(res.error);
            }
            else
            {
                // CHANGE FOR REAL THING
                let link = "https://paradise-7.herokuapp.com/verifyemail/" + res.id;
                let testlink = "localhost:3000/verifyemail/" + res.id;
                sendEmail(testlink);
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
            {/* <button onClick={()=>{window.location.href = "/"}}>Exit</button> */}
            <button onClick={()=>{window.location.href = "/"}}>Exit</button>
            <h2>Create an Account</h2>
            {/* <label id = "email">Email</label> */}
            <input className = "field" type = "text" ref={(c) => loginEmail = c} placeholder = "Email"></input>
            {/* <label id = "username">Username</label> */}
            <input className = "field" type = "text" ref={(c) => loginUsername = c} placeholder = "Username"></input>
            {/* <label id = "password">Password</label> */}
            <input className = "field" type = "password" ref={(c) => loginPassword = c} placeholder = "Password"></input>
            {/* <label id = "confirmPassword">Confirm Password</label> */}
            <h3 className="req-text" style = {{marginRight:4.5+'em'}}>Password Requirements:</h3>
                <ul className='req-text'>
                    <div className = "column-list"> 
                        <li>Minimum 8 characters</li>
                        <li>At least 1 letter</li>
                    </div>
                    <div className = "column-list"> 
                        <li>At least 1 symbol</li>
                        <li>At least 1 number</li>
                    </div>
                    
                </ul>
            <input className = "field" type = "password" ref={(c) => loginConfirmPassword = c} placeholder = "Confirm Password"></input>
            <button onClick = {doRegister}>Register</button>
            <p>{message}</p>
            <div className = "horizontal"> 
                <h3 className = "click-text" onClick={props.switchToLogin}>Already have an account?</h3>
            </div>
        </div>
    )
}

export default RegisterDropdown;

