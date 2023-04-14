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

  // This checks if user is logged in on page load
  useEffect(() => {
		const loggedInUser = localStorage.getItem('user_data');
		if (loggedInUser) {
		  setLoggedIn(true);
		}
	  }, []);

  return (
    <div style={isDark ? {scrollable: "hidden"} : {}}>
      <UserContext.Provider value={{loggedIn, setLoggedIn}}>
        <TopBar callback = {toggleLogin} logout = {logOut} updateList = {(arr) => setItemList(arr)}/>
        <CategoryBar updateList = {(arr) => setItemList(arr)}/>
        <LoginDropdown switchToRegister = {toggleRegister} visible = {loginIsVisible} onLogin = {displayAccount} 
			switchToForgot = {toggleForgot}/>
		<RegisterDropdown switchToLogin = {toggleLogin} visible = {registerIsVisible} onRegister = {onRegister}/>
		<ForgotPassDropdown switchToLogin = {toggleLogin} visible = {forgotIsVisible}/>
			  {isDark ? <div id = "darkScreen"/> : <div/>}
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<LandingPage updateList = {(arr) => setItemList(arr)} itemList = {itemList}/>} />
            <Route path="/profile" index element={<ProfilePage />}/>
			<Route path="/item" index element={<ItemPage/>}/>
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

