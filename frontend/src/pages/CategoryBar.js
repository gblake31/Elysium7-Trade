import React from 'react';

function CategoryBar(props){

	let bp = require('../components/Leinecker/Path.js');

	const doSearch = async (cat) =>
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
	}

	return(
		<div className="categoryBar">
			<button onClick = {() => doSearch(1)}>Games</button>
			<button onClick = {() => doSearch(2)}>Consoles</button>
			<button onClick = {() => doSearch(3)}>Controllers</button>
			<button onClick = {() => doSearch(4)}>Keyboards/Mice</button>
			<button onClick = {() => doSearch(5)}>Audio</button>
			<button onClick = {() => doSearch(6)}>Other</button>
		</div>
	);
}

export default CategoryBar;
