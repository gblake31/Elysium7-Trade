import React, {useState} from 'react';
import './Landing.css';
import TopBar from './TopBar.js';
import CategoryBar from './CategoryBar.js';
import LoginDropdown from '../components/Login/LoginDropdown';
import RegisterDropdown from '../components/Login/RegisterDropdown';

function LandingPage(){
	// Getter and setter for visibility, by default invisible
	let [loginIsVisible, setLoginVisibility] = useState(false);
	let [registerIsVisible, setRegisterVisibility] = useState(false);
	let [getGreeting, setGreeting] = useState("");

	let toggleLogin = () => {
		setRegisterVisibility(false);
		setLoginVisibility(true);
	};

	let toggleRegister = () => {
		setLoginVisibility(false);
		setRegisterVisibility(true);
	};

	let displayAccount = (login) => {
		setLoginVisibility(false);
		setGreeting(login);
	};

	return (
		<div>
			{// When greeting is empty for callback, login button appears
			}
			<TopBar callback = {toggleLogin} greeting = {getGreeting}/>
			<CategoryBar />
			<h1>{getGreeting}</h1>
			<LoginDropdown switchToRegister = {toggleRegister} visible = {loginIsVisible} onLogin = {displayAccount}/>
			<RegisterDropdown switchToLogin = {toggleLogin} visible = {registerIsVisible}/>
			
			<main>
			<div className="sectionContainer">
				<div className="section section1">
					<h2>This week's bargain</h2>
					<ul>
						<li>Product 1</li>
						<li>Product 2</li>
						<li>Product 3</li>
						<li>Product 3</li>
						<li>Product 3</li>
						<li>Product 3</li>
						<li>Product 3</li>
						<li>Product 3</li>
						<li>Product 3</li>
						<li>Product 3</li>
						<li>Product 3</li>
						<li>Product 3</li>
						<li>Product 3</li>
						<li>Product 3</li>
						<li>Product 3</li>
						<li>Product 3</li>
						<li>Product 3</li>
						<li>Product 3</li>
						<li>Product 3</li>
					</ul>
				</div>
				<div className="section section2">
					<h2>Recommended for you</h2>
					<ul>
						<li>Product 1</li>
						<li>Product 2</li>
						<li>Product 3</li>
					</ul>
				</div>
			</div>
			</main>
		</div>
	);
}

export default LandingPage;
