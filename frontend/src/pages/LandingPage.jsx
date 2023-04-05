import React, {useState, useContext} from 'react';
import './Landing.css';

import ItemList from '../components/ItemList';
import {UserContext} from '../App'
import {FilePicker} from 'react-file-picker'

function LandingPage(){
	let {loggedIn, setLoggedIn} = useContext(UserContext);

	let [ready, setReady] = useState(false);
	let [myimg, setmyimg] = useState("");

	let bp = require('../components/Leinecker/Path.js');

	let sid;
    let item;
    let pr;
    let desc;
    let cond;
	let f;

	function getThing(image) {
		console.log(image);
		setmyimg(URL.createObjectURL(image.blob()));
	}

	const callAPI2 = async event =>
	{
		event.preventDefault();
		let obj = {itemid: "642b95272948dc5a29dc3c1c"}
		let js = JSON.stringify(obj);
		try {
			const response = await fetch(bp.buildPath('api/retrieveItemInfo'),
			{method: 'POST', body:js, headers:{'Content-Type': 'application/json'}});
			let res = JSON.parse(await response.text());
			if (res.error == '') {
				console.log("success");
				console.log(res.result);
				getThing(res.result.image);
			}
			else {
				console.log(res.error);
			}
		}
		catch(e) {
			alert(e.toString());
			return;
		}
	}

	const callAPI = async event =>
	{
		event.preventDefault();
		let obj = {sellerid: sid.value, itemname: item.value, price: pr.value, description: desc.value, condition: cond.value, image: f.files[0].blob(), listedtime: "0"}
		let js = JSON.stringify(obj);
		console.log(js);
		try {
			const response = await fetch(bp.buildPath('api/createItem'),
			{method: 'POST', body:js, headers:{'Content-Type': 'application/json'}});
			let res = JSON.parse(await response.text());
			if (res.error == '') {
				console.log("success");
			}
			else {
				console.log(res.error);
			}
		}
		catch(e) {
			alert(e.toString());
			return;
		}
	}

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

					<label>sellerid:</label>
					<input type = "text" ref={(c) => sid = c}></input>
					<label>itemname:</label>
					<input type = "text" ref={(c) => item = c}></input>
					<label>price:</label>
					<input type = "text" ref={(c) => pr = c}></input>
					<label>description:</label>
					<input type = "text" ref={(c) => desc = c}></input>
					<label>condition:</label>
					<input type = "text" ref={(c) => cond = c}></input>
					<label>file</label>
					<input type = "file" ref={(c) => f = c }></input>
					<img src = {myimg}></img>
					<button onClick= {callAPI}>Send it!</button>
					<button onClick= {callAPI2}>Get Image</button>
				</div>
			</main>
		</div>
	);
}

export default LandingPage;
