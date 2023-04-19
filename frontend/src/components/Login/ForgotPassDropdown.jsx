import React, {useState} from 'react'
import './dropdown.css';
import logostr from '../../pages/Pictures/LogoString.txt';

function ForgotPassDropdown(props) {
    
    let css = {};
    // Moves the position of the props (login box), css handles transition
    css.top = props.visible ? "-4%" : "-200%";

    let bp = require('../Leinecker/Path.js');
  
    let [email, setEmail] = useState("");
    let [userID, setUserID] = useState("");
    let [message, setMessage] = useState("");
    const getID = async () => 
    {
      try
      {
        let obj = {email: email.value};
        let js = JSON.stringify(obj); 
   
        const response = await fetch(bp.buildPath('api/getIDFromEmail'),
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        let res = JSON.parse(await response.text());
        try
        {
          if(res.error.length > 0)
          {
            console.log(res.error);
            return 0;
          }
          await setUserID(res.userid);
          console.log("This is resID: "+ res.userid);
          console.log("THIS IS USER ID: "+userID);
          return res.userid;
        }
        catch(e)
        {
          console.log('Something Went Wrong Trying to get ID from email');
        }
        
      }
      catch(e)
      {
        console.log(e.toString());
        return 0;
      }  
    }

    const sendEmail = async()  => 
    {   
        let id = await getID();
        let logo;
        await fetch(logostr)
        .then(r => r.text())
        .then(text => {
        logo = text;
        });
        // CHANGE FOR REAL THING
        let link = "https://paradise-7.herokuapp.com/forgotpassword/"; // NEEDS ID
        let testlink = "localhost:3000/forgotpassword/"; // NEEDS ID
        let obj = {receiver: email.value, subject: "Forgot Password for Elysium Account", 
        text: "", html: `<head>
        <style> 
          button {
            display: inline-block;
            background-color: #4d08a1;
            padding: 10px;
            width: 200px;
            color: white;
            margin-bottom: 20px;
            text-align: center;
            border: 4px double #000000; /* add this line */
            border-radius: 10px; /* add this line */
            font-size: 20px; /* add this line */
          }
          #text{
            margin-left: 10px;
            color: white;
          }
          #logo{
            align-self: center;
            width: 60px;
            height: 70px;
          }
          #top-bar{
            margin: auto;
            display: flex;
            flex-direction: row;
            justify-content: center;
            background-color: #102610;
          }
          #body-bar{
            margin: auto;
            display: flex;
            flex-direction: row;
            justify-content: center;
            background-color: #234423;
          }
        </style>
      </head>
      
      <body>
        <div id = "top-bar">
        <h1 id = "text"> Elysium7 Trade </h1>
        <a href="https://images.gr-assets.com/hostedimages/1436766894ra/15500460.gif" style = "width: 60 visibility: hidden;">.</a>
        <img id = "logo" src = "${logo}"> 
            </div>
        <div id = "body-bar">
          <h2 id = "text"> Looks like you forgot your password. Please ignore if you did not request this.</h2>
        </div>
        <div id = "body-bar">
          <a href="${link+id}" style = "width: 60 visibility: hidden;">
            <button>
            Click Here To Reset Your Password
            </button>
          </a>
      </body>
      
      `};
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
                setMessage("Please check your email to reset your password");
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
            <h1>Please Enter your email</h1>
            <input className = "field" type = "text" ref={(c) => setEmail(c)}  placeholder = "Email"></input>
            <button className = "button" onClick = {sendEmail}>Send Password Reset</button>
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

