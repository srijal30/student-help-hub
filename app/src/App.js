import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { SignIn, SignUp } from "./components/Auth";

import Footer from "./components/Footer";
import { createUser } from "./utilities";

function App() {
  const[currentPage, setPage] = useState('Home');
  const[loggedIn, setLoggedIn] = useState(false);
  //set currentPage according to its value
  const setCurrentPage = () => {
    switch(currentPage) {
      case 'Dashboard':
        return <Dashboard/>;
      case 'Home':
        return <Home/>;
      case 'SignIn':
        return <SignIn/>;
      case 'SignUp':
        return <SignUp/>;
    } 
  }

  return (
    <div>
      <Navbar setPage={setPage}/>
      {setCurrentPage()}
    </div>
  );
  
}

export default App;
