import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import { createUser } from "./utilities";

function App() {
  const[currentPage, setPage] = useState('Dashboard');
  //set currentPage according to its value
  const setCurrentPage = () => {
    switch(currentPage) {
      case 'Dashboard':
        return <Dashboard/>;
    } 
  }
  return (
    <div className="">
      <Navbar setPage={setPage}/>
      {setCurrentPage()}
    </div>
  );
}

export default App;
