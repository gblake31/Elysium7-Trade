import React from 'react';

function CategoryBar(props){

	let bp = require('../components/Leinecker/Path.js');

	/*const doSearch = async (cat) =>
	{
		let local = JSON.parse(localStorage.getItem('user_data'));
		let obj = {search: "", category: cat}
		let js = JSON.stringify(obj);
		try {
			const response = await fetch(bp.buildPath('api/searchItems'),
			{method: 'POST', body:js, headers:{'Content-Type': 'application/json'}});
			let res = JSON.parse(await response.text());
			if (res.error == '') {
				console.log("success");
				props.updateList(res.results);
			}
			else {
				console.log(res.error);
			}
		}
		catch(e) {
			alert(e.toString());
			return;
		}
	}*/

	const createCall = async(cat) => {
		await props.updateList("", cat);
	}

	return(
		<div className="categoryBar">
			<button onClick = {() => createCall(1)}>Games</button>
			<button onClick = {() => createCall(2)}>Consoles</button>
			<button onClick = {() => createCall(3)}>Controllers</button>
			<button onClick = {() => createCall(4)}>Keyboards/Mice</button>
			<button onClick = {() => createCall(5)}>Audio</button>
			<button onClick = {() => createCall(6)}>Other</button>
		</div>
	);
}

export default CategoryBar;
