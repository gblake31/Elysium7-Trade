import React, { useEffect,useState } from 'react';
import './Profile.css';

function ForgotPassword() {
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
    let [oldProfilePic, setOldProfilePic] = useState("");
    let profilePicRef;
    let [email, setEmail] = useState("");
    let [profilePic, setProfilePic] = useState("");
    let inventoryArr;
    let [inventory, setInventory] = useState([]);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user_data');
        if (loggedInUser) {
          window.location.href = '/'
        }
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        try {
            let temp = window.location.href.split("/");
            let id = temp[temp.length - 1];
            let obj = { userid: id };
            let js = JSON.stringify(obj);

            const response = await fetch(bp.buildPath('api/retrieveUserInfo'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            let res = JSON.parse(await response.text());
            let userInfo = res.result;
            try {
                if (res.error.length > 0) {
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
                await setOldProfilePic(userInfo.profilepicture);
            }
            catch (e) {
                console.log('Something Went Wrong Trying to get UserInfo');
            }

        }
        catch (e) {
            alert(e.toString());
            return;
        }
    }
    const sendUsername = async()  => 
    {   
       
        let obj = {receiver: email, subject: "Username for Elysium Account", 
        text: "Here is your Username: "+oldLogin, html: ""};
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
            setUserMessage("Username sent to email. Please give it some time to arrive.");
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    const update = async (event) => {
        let obj = {
            userid: userID,
            login: oldLogin,
            password: newPassword.value,
            email: email,
            profilepicture: oldProfilePic,
            verified: true
        };
        if (login.value !== oldLogin)
        {
            setUserMessage("Incorrect Username!");
            return;
        }
        if (newPassword.value !== confirmNewPass.value) {
            setPasswordMessage("Your passwords don't match!");
            return;
        }
        // Regex for Password
        if(!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(newPassword.value)))
        {
            setPasswordMessage("Your password does not meet the minimum requirements");
            return;
        }
        event.preventDefault();
        // incoming: userid, login, password, firstname, lastname, email, profilepicture, verified
        // outgoing: result, error

        let js = JSON.stringify(obj);
        try {
            const response = await fetch(bp.buildPath('api/updateAccount'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            let res = JSON.parse(await response.text());
            if (res.error.length > 0) {
                console.log(res.error);
                setUserMessage('Something Went Wrong');
            }
            else {
                window.location.href = "/";
            }
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    }

    return (
        <div>
            <div className='input-box'>
                  <label id = "Text" >Please enter your username:</label>
                  <input className = "account_field" type = "text"  
                  defaultValue = {login.value} ref={(c) => login = c} ></input> 
            </div>
            <p>{userMessage}</p>
            <div className = "horizontal">
                <h3 className="click-text" onClick={sendUsername}>Forgot Username?</h3>
            </div>
            

            <div className='input-box'>
            <label id="Text" >New Password:</label>
            <input className="account_field" type="text" ref={(c) => newPassword = c}
                placeholder='New Password'></input>
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
            <input className="account_field" type="text" ref={(c) => confirmNewPass = c}
                placeholder='Retype New Password'></input>
            
            </div>
            <p>{passMessage}</p>
            <div className = "horizontal">
                <h3 className="click-text" onClick={update}>Change Password</h3>
            </div>
            
        </div>
        
    );

}

export default ForgotPassword;