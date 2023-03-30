import React, {useState, useContext} from 'react';
import {UserContext} from '../App'
import data from './data.json';



function ProfilePic()
{
    const loggedIn = useContext(UserContext);
    return(
        <div>
            {/* <img src={data.profilepic}> </img> */}
        </div>
    );
}
export default ProfilePic;