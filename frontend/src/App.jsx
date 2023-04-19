import React from 'react';
import {createContext, useState, useEffect} from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import ItemPage from './pages/ItemPage';
import TopBar from './components/TopBar.js';
import CategoryBar from './pages/CategoryBar';

import LoginDropdown from './components/Login/LoginDropdown';
import RegisterDropdown from './components/Login/RegisterDropdown';
import ForgotPassDropdown from './components/Login/ForgotPassDropdown';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ListingPage from './pages/ListingPage';

const UserContext = createContext(false);

function App() {

	const [curindex, setCurIndex] = useState(0);
	const [searchStr, setSearchStr] = useState("");
	const [categoryInt, setCategoryInt] = useState(0);
	const [allowSearch, setAllowSearch] = useState(true);
	const [loading, setLoading] = useState(false);
	const [enableSearch, setEnableSearch] = useState(true);
	let bp = require('./components/Leinecker/Path.js');

	let callSearch = async(inputStr, inputCat) =>
	{
		setLoading(false);
		setAllowSearch(true);
		if (curindex != 0)
			setCurIndex(0);
		setItemList([]);
		if (inputStr != searchStr)
			setSearchStr(inputStr);
		if (inputCat != categoryInt)
			setCategoryInt(inputCat);
	};

	useEffect(() => {

		const loggedInUser = localStorage.getItem('user_data');
		if (loggedInUser) {
		  setLoggedIn(true);
		}

		let debounceTimeoutId = null;
		
		const handleScroll = async () => {
		const mainElement = document.querySelector('main');
		const remainingScrollHeight = mainElement.scrollHeight - (mainElement.scrollTop + mainElement.clientHeight);
		
		if (remainingScrollHeight <= 800) {
			console.log("trying to load more with loading as: ", loading, " and allowSearch as: ", allowSearch, " and curindex as: ", curindex);
			try {
				if(!loading && allowSearch) {
					//console.log("inside of if statement");
					if (debounceTimeoutId) {
						clearTimeout(debounceTimeoutId);
				  	}
				  	debounceTimeoutId = setTimeout(async () => {
					debounceTimeoutId = null;
					setLoading(true);
					console.log(searchStr, " ", categoryInt, " ", curindex);
					setEnableSearch(true);
					console.log("after update:", curindex);
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

	  useEffect(() => {
		if (allowSearch) {
			const doSearch = async () => {
				console.log("Searching str: ", searchStr, " cat: ", categoryInt, " start index: ", curindex);
				let obj = { search: searchStr, startindex: curindex, numitems: 5, category: categoryInt };
				let js = JSON.stringify(obj);
				try {
					const response = await fetch(bp.buildPath('api/loadKItems'), {
						method: 'POST',
						body: js,
						headers: { 'Content-Type': 'application/json' },
					});
					let res = JSON.parse(await response.text());
					if (res.error === '') {
						console.log('success');
						setItemList(prevItemList => [...prevItemList, ...res.results]);
						setCurIndex(prevIndex => prevIndex + 5);
						setEnableSearch(false);
					} else {
						setAllowSearch(false);
						console.log(res.error);
					}
				} catch (e) {
						setAllowSearch(false);
						console.log(e.toString());
					return;
				}
			};
			doSearch();
		}
	  }, [searchStr, categoryInt, allowSearch, enableSearch]);



  let [loggedIn, setLoggedIn] = useState(false);

  // Getter and setter for visibility, by default invisible
	let [loginIsVisible, setLoginVisibility] = useState(false);
	let [registerIsVisible, setRegisterVisibility] = useState(false);
	let [forgotIsVisible, setForgotVisibility] = useState(false);

	let [itemList, setItemList] = useState([]);

	// Toggles login display
	let toggleLogin = () => {
		setRegisterVisibility(false);
		setForgotVisibility(false);
		setLoginVisibility(true);
		console.log("GOt here");
	};

	// Toggles register display
	let toggleRegister = () => {
		setLoginVisibility(false);
		setRegisterVisibility(true);
	};

	// Toggles Forgot Password display
	let toggleForgot = () => {
		setLoginVisibility(false);
		setForgotVisibility(true);
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
    	window.location.href = '/';
	};

	let isDark = loginIsVisible | registerIsVisible | forgotIsVisible;

  
  return (
    <div style={isDark ? {scrollable: "hidden"} : {}}>
      <UserContext.Provider value={{loggedIn, setLoggedIn}}>
        <TopBar callback = {toggleLogin} logout = {logOut} updateList = {callSearch}/>
        <CategoryBar updateList = {callSearch}/>
        <LoginDropdown switchToRegister = {toggleRegister} visible = {loginIsVisible} onLogin = {displayAccount} 
			switchToForgot = {toggleForgot}/>
		<RegisterDropdown switchToLogin = {toggleLogin} visible = {registerIsVisible} onRegister = {onRegister}/>
		<ForgotPassDropdown switchToLogin = {toggleLogin} visible = {forgotIsVisible}/>
			  {isDark ? <div id = "darkScreen"/> : <div/>}
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<LandingPage updateList = {callSearch} itemList = {itemList}/>} />
            <Route path="/profile" index element={<ProfilePage />}/>
			<Route path="/item/:id" index element={<ItemPage/>}/>
			<Route path="/listing" index element={<ListingPage/>}/>
			<Route path={"/verifyemail/:id"} index element={<VerifyEmail/>}/>
			<Route path={"/forgotpassword/:id"} index element={<ForgotPassword/>}/>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
    
	);
}

export default App;
export {UserContext};

