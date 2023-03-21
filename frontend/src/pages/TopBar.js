import React from 'react';
import dragonImage from './dragonLogo.png';

function TopBar(){
	return(
		<div className="topBar">
			<img id="logo" src={dragonImage} alt="Dragon Logo"></img>
			<h1>Elysium7 Trade</h1>
			<div className="searchBox">
				<input type="text" placeholder="Search for products" />
			</div>
			<button type="button">Login/Register</button>
			<button type="button">Cart</button>
		</div>
	);
}

export default TopBar;
