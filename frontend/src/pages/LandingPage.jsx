import React, {useState, useContext} from 'react';
import './Landing.css';
import TopBar from '../components/TopBar.js';
import CategoryBar from './CategoryBar.js';
import LoginDropdown from '../components/Login/LoginDropdown';
import RegisterDropdown from '../components/Login/RegisterDropdown';
import ItemList from '../components/ItemList';
import {UserContext} from '../App'

function LandingPage(){
	// Getter and setter for visibility, by default invisible
	let [loginIsVisible, setLoginVisibility] = useState(false);
	let [registerIsVisible, setRegisterVisibility] = useState(false);

	let {loggedIn, setLoggedIn} = useContext(UserContext);

	// Toggles login display
	let toggleLogin = () => {
		setRegisterVisibility(false);
		setLoginVisibility(true);
	};

	// Toggles register display
	let toggleRegister = () => {
		setLoginVisibility(false);
		setRegisterVisibility(true);
	};

	let displayAccount = () => {
		setLoginVisibility(false);
		setLoggedIn(true);
	};

	let onRegister = () => {
		setRegisterVisibility(false);
	};

	let logOut = () => {
		setLoggedIn(false);
		localStorage.clear();
	};

	let isDark = loginIsVisible | registerIsVisible;
	
	
	return (
		<div id = "page">
			{
			}
			<TopBar callback = {toggleLogin} loggedIn = {loggedIn} logout = {logOut}/>
			<CategoryBar />
			<LoginDropdown switchToRegister = {toggleRegister} visible = {loginIsVisible} onLogin = {displayAccount}/>
			<RegisterDropdown switchToLogin = {toggleLogin} visible = {registerIsVisible} onRegister = {onRegister}/>
			<div id = "darkScreen" style = {{opacity: isDark ? "70%" : "0%"}}/>
			
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
