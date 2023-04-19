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
	let allowSearch = true;
	let curindex = 0;
	const [startindexcur, setStartIndexCur] = useState(0);
	const [loading, setLoading] = useState(false);

	/* useEffect(() => {
		if (curindex == 0){
			console.log("first load");
			console.log(curindex);
			doSearch('');
			curindex = curindex + 10;
		  }
		let debounceTimeoutId = null;
		const handleScroll = async () => {
		  const mainElement = document.querySelector('main');
		  const remainingScrollHeight = mainElement.scrollHeight - (mainElement.scrollTop + mainElement.clientHeight);
		  if (remainingScrollHeight <= 1000) {
			try {
				if(!loading && allowSearch) {
					if (debounceTimeoutId) {
						clearTimeout(debounceTimeoutId);
				  	}
				  	debounceTimeoutId = setTimeout(async () => {
					debounceTimeoutId = null;
					setLoading(true);
					console.log(curindex);
					await doSearch('');
					curindex = curindex + 10;
					setLoading(false);
				  }, 300);
				}
			}
			finally {
				setLoading(false);
			}
			
		  }
		};
	
		document.querySelector('main').addEventListener('scroll', handleScroll);
	
		return () => {
		  document.querySelector('main').removeEventListener('scroll', handleScroll);
		};
	  }, []);

	  const doSearch = async (str) => {
		let obj = { search: str, startindex: curindex, numitems: 10 };
		let js = JSON.stringify(obj);
		if (allowSearch) {
			try {
			const response = await fetch(bp.buildPath('api/loadKItems'), {
				method: 'POST',
				body: js,
				headers: { 'Content-Type': 'application/json' },
			});
			let res = JSON.parse(await response.text());
			if (res.error === '') {
				console.log('success');
				props.updateList(prevItemList => [...prevItemList, ...res.results]);
			} else {
				allowSearch = false;
				console.log(res.error);
			}
			} catch (e) {
			allowSearch = false;
			console.log(e.toString());
			return;
			}
		}
	  }; */
	  /*let myVar = '';

	  useEffect(() => {
		let loading = false;
		const createCall = async() => {
			if (!loading) {
				loading = true;
				console.log("Calling update List");
				await props.updateList("", 0);
			}
			
		}
		createCall();
	  }, [myVar]);*/

	return (
		<div id = "landingPage">
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