import React from 'react';
import {createContext, useState, useEffect} from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Leinecker/LoginPage';
import CardPage from './pages/Leinecker/CardPage';

const UserContext = createContext(false);

function App() {

  let [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
		const loggedInUser = localStorage.getItem('user_data');
		if (loggedInUser) {
		  setLoggedIn(true);
		}
	  }, []);
  return (
    <div>
       <UserContext.Provider value={{loggedIn, setLoggedIn}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<LandingPage />} />
            <Route path="/" index element={<LoginPage />} />
            {
            <Route path="/cards" index element={<CardPage />} />
            }
      </Routes>
    </BrowserRouter>
  </UserContext.Provider>

   
    </div>
    
);
}

export default App;
export {UserContext};

