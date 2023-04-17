import React, {useState, useContext, useEffect} from 'react';
import ItemList from '../components/ItemList';
import {UserContext} from '../App'
import imageCompression from 'browser-image-compression';



function LandingPage(props){
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

	useEffect(() => {
		const doSearch = async (str) => {
		  let obj = {search: str};
		  let js = JSON.stringify(obj);
		  try {
			const response = await fetch(bp.buildPath('api/searchItems'), {
			  method: 'POST',
			  body: js,
			  headers: {'Content-Type': 'application/json'}
			});
			let res = JSON.parse(await response.text());
			if (res.error === '') {
			  console.log('success');
			  props.updateList(res.results);
			} else {
			  console.log(res.error);
			}
		  } catch(e) {
			alert(e.toString());
			return;
		  }
		}
		doSearch('');
	}, []);

	return (
		<div id = "page">
			<main>
				<div className="Listing">
					<h1>Listings:</h1>
				</div>
				<ItemList arr = {props.itemList} inventory = {false}/>
			</main>
		</div>
	);
}

export default LandingPage;