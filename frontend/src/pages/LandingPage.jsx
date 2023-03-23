import React, {useState} from 'react';
import './Landing.css';
import TopBar from './TopBar.js';
import CategoryBar from './CategoryBar.js';
import LoginDropdown from '../components/LoginDropdown';
import RegisterDropdown from '../components/RegisterDropdown';

function LandingPage(){
	let [loginIsVisible, setLoginVisibility] = useState(false);
	let [registerIsVisible, setRegisterVisibility] = useState(false);

	let toggleLogin = () => {
		setRegisterVisibility(false);
		setLoginVisibility(true);
	};

	let toggleRegister = () => {
		setLoginVisibility(false);
		setRegisterVisibility(true);
	};

	return (
		<div>
			<TopBar callback = {toggleLogin} />
			<CategoryBar />
			<LoginDropdown switchToRegister = {toggleRegister} visible = {loginIsVisible}/>
			<RegisterDropdown switchToLogin = {toggleLogin} visible = {registerIsVisible}/>
			
			<main>
			<div className="sectionContatiner">
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
