import React from 'react';
import dragonImage from './Pictures/dragonLogo.png';

function TopBar(props){
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
				{props.greeting === "" ? <button type="button" onClick = {props.callback}>Login/Register</button>:<h1>{props.greeting}</h1>}
				{props.greeting === "" ? null : <button type="button" onClick={() => {window.location.reload(true)}}>Logout</button>}
			</div>
			
		</div>
	);
}

export default TopBar;
