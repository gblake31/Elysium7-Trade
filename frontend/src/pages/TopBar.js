import React from 'react';
import dragonImage from './Pictures/dragonLogo.png';

function TopBar(props){
	return(
		<div className="topBar">
			<img id="logo" src={dragonImage} alt="Dragon Logo"></img>
			<h1>Elysium7 Trade</h1>
			<div className="searchBox">
				<input type="text" placeholder="Search for products" />
			</div>
			{props.greeting === "" ? <button type="button" onClick = {props.callback}>Login/Register</button>:<h1>{props.greeting}</h1>}
			<button type="button" >Cart</button>
		</div>
	);
}

export default TopBar;
