import React, {useState} from 'react';
import dragonImage from './Pictures/dragonLogo.png';
import {UserContext} from '../App'

import './item.css'

function ProfilePage()
{
    let item = JSON.parse(localStorage.getItem('item'));
    return (
        <div>
            <h1>{item.itemname}</h1>
            <p>{item.description}</p>
            <img id = "itemImage" src = {item.image}></img>
            <button className='button'>I'm Interested!</button>
        </div>
    );
}

export default ProfilePage;