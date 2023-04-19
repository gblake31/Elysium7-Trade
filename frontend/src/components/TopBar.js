import React, {useContext} from 'react';
import dragonImage from '../pages/Pictures/dragonLogo.png';
import searchImage from '../pages/Pictures/search.png';
import ProfilePic from './ProfilePic';

import {UserContext} from '../App'


function TopBar(props){
	let {loggedIn, setLoggedIn} = useContext(UserContext);
	let bp = require('./Leinecker/Path.js');
	let searchInput;
	function renderUserData()
	{
		if (!loggedIn)
		{
			console.log("not logged in: "+ localStorage.getItem('user_data'));
			return (<button type="button" onClick = {props.callback}>Login/<br></br>Register</button>);
		}
		else 
		{
			console.log("logged in: "+ localStorage.getItem('user_data'));
			let obj = JSON.parse(localStorage.getItem('user_data'));
			return (
			<div id = "right">
				<h1>Hi, {obj.username}</h1>
				<ProfilePic></ProfilePic>
				<button type="button" onClick={props.logout}>Logout</button>	
			</div>);
		}
	}


	/*const doSearch = async (str) =>
	{
		let local = JSON.parse(localStorage.getItem('user_data'));
		let obj = {search: str}
		let js = JSON.stringify(obj);
		try {
			const response = await fetch(bp.buildPath('api/searchItems'),
			{method: 'POST', body:js, headers:{'Content-Type': 'application/json'}});
			let res = JSON.parse(await response.text());
			if (res.error == '') {
				console.log("success");
				props.updateList(res.results);
			}
			else {
				console.log(res.error);
			}
		}
		catch(e) {
			alert(e.toString());
			return;
		}
	}*/

	const createCall = async(str) => {
		await props.updateList(str, 0);
	}

	return(
		<div className="topBar">
			<div id = "left">
				<img id="logo" src={dragonImage} alt="Dragon Logo" onClick = {() => window.location.href = "/"}></img>
				<h1 id="title" onClick = {() => window.location.href = "/"}>Elysium7 Trade</h1>
			</div>
			<div id = "right">
				<div className="searchBox">
					<input type="text" placeholder="Search for products" ref={(c) => searchInput = c}/>
					<img id = "searchImg" src = {searchImage} onClick = {() => createCall(searchInput.value)}></img>
				</div>
				{renderUserData()}
			</div>
		</div>
	);
}

export default TopBar;
