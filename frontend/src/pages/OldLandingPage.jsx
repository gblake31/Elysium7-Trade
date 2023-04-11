import React, {useState, useContext} from 'react';
import './Landing.css';


import ItemList from '../components/ItemList';
import {UserContext} from '../App'
import MapImage from './Pictures/mapPicture.jpg';
import WoodBackground from './Pictures/woodBackground.png';

function LandingPage(){
	let {loggedIn, setLoggedIn} = useContext(UserContext);
	return (
		<div id = "page">
			<main>
				<div className="sectionContainer">
				    <div className="section recommended">
                        <div className="recommendedTop">
                            <img id="woodBackground" src={WoodBackground}></img>
                            <div className="imageText">
                                <h2>Recommended for you</h2>
                            </div>
                        </div>
                        <button className="navigationButton back">&lt;</button>
						<div className="product card1" onClick={() => doThis()}>
                            <div className="productName">
                                <h3>NAME</h3>
                            </div>
                            <div className="productImage">
                                <img src="https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08143016.png"></img>
                            </div>
                            <div className="productPrice">
                                <p>$20.01</p>
                            </div>
                        </div>
                        <div className="product card2" onClick={() => doThis()}>
                            <div className="productName">
                                <h3>NAME</h3>
                            </div>
                            <div className="productImage">
                                <img src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6265/6265133_sd.jpg"></img>
                            </div>
                            <div className="productPrice">
                                <p>$20.02</p>
                            </div>
                        </div>
                        <button className="navigationButton forward">&gt;</button>
					</div>
					<div className="section map">
						<img id="mapBackground" src={MapImage} alt="map background"></img>
					</div>
				</div>

			</main>
		</div>
	);
}

export default LandingPage;
