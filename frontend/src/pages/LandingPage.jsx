import React, {useState, useContext} from 'react';
import './Landing.css';


import ItemList from '../components/ItemList';
import {UserContext} from '../App'

function LandingPage(){
	let {loggedIn, setLoggedIn} = useContext(UserContext);
	return (
		<div id = "page">
			<main>
				{loggedIn ? <ItemList/> : <div/>}
				<div className="section section2">
					<h2>Recommended for you</h2>
					<ul>
						<li>Product 1</li>
						<li>Product 2</li>
						<li>Product 3</li>
					</ul>
				</div>
			</main>
		</div>
	);
}

export default LandingPage;
