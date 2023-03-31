import React, {useContext} from 'react';
import dragonImage from '../pages/Pictures/dragonLogo.png';
import ProfilePic from './ProfilePic';

import {UserContext} from '../App'

function TopBar(props){
	let {loggedIn, setLoggedIn} = useContext(UserContext);
	function renderUserData()
	{
		if (!loggedIn)
		{
			console.log("not logged in: "+ localStorage.getItem('user_data'));
			return (<button type="button" onClick = {props.callback}>Login/Register</button>);
		}
		else 
		{
			console.log("logged in: "+ localStorage.getItem('user_data'));
			let obj = JSON.parse(localStorage.getItem('user_data'));
			return (
			<div id = "right">
				<h1>Hi, {obj.firstName}</h1>
				<ProfilePic></ProfilePic>
				<button type="button" onClick={props.logout}>Logout</button>	
			</div>);
		}
	}
	return(
		<div className="topBar">
			<div id = "left">
				<img id="logo" src={dragonImage} alt="Dragon Logo"></img>
				<h1>Elysium7 Trade</h1>
			</div>
			<div id = "right">
				<div className="searchBox">
					<input type="text" placeholder="Search for products" />
				</div>
				{renderUserData()}
			</div>
			
		</div>
	);
}

export default TopBar;
