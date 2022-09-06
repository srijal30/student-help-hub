import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { SignIn, SignUp } from "./components/Auth";
import { getCurrentUser } from "./utilities";

import Footer from "./components/Footer";
import { CreateEssay } from "./components/Essay";

function App() {
  const[currentPage, setPage] = useState('Home');
  const[loggedIn, setLoggedIn] = useState(false);
  const[currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const tokenExists = localStorage.getItem('token');
    if(tokenExists){
      console.log('Token already saved!');
      setLoggedIn(true);
    }
    if(loggedIn){
      getCurrentUser()
      .then(res => setCurrentUser(res.data))
      .catch(err => console.log('APP ERROR', err));
      setPage('Dashboard');
    } else{
      setCurrentUser(null);
      setCurrentPage('SignIn')
    }
  }, [loggedIn]);

  //set currentPage according to its value
  const setCurrentPage = () => {
    switch(currentPage) {
      case 'Dashboard':
        return <Dashboard currentUser={currentUser} setPage={setPage}/>;
      case 'Home':
        return <Home/>;
      case 'SignIn':
        return <SignIn setLoggedIn={setLoggedIn}/>;
      case 'SignUp':
        return <SignUp setPage={setPage}/>;
      case 'CreateEssay':
        return <CreateEssay setPage={setPage}/>;
    } 
  }

  return (
    <div>
      <Navbar setPage={setPage} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      {setCurrentPage()}
      <Footer/>
    </div>
  );
  
}

export default App;
