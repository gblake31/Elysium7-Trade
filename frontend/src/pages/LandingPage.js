import React from 'react';
import './Landing.css';
import TopBar from './TopBar.js';
import CategoryBar from './CategoryBar.js';



function LandingPage(){
	return (
		<div>
			<TopBar />
			<CategoryBar />
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
