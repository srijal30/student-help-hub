import React, { useState } from 'react';

function Navbar(props) {
    return (
        <div className="flex justify-between bg-gradient-to-r to-green-400
        from-green-800 p-6 items-center flex-grow-0 h-15 flex-col sm:flex-row">
        
            <div className="flex items-center text-white">
                <h1 className="text-xl font-bold mr-5">HelpHub</h1>
                <button 
                className="px-5 py-2 hover:text-gray-300 font-medium"
                onClick={()=>props.setPage('Home')}>Home</button>
                <button 
                className="px-5 py-2 hover:text-gray-300 font-medium"
                onClick={()=>props.setPage('Dashboard')}>Dashboard</button>
            </div>

            <div className="flex text-white items-center">

                <button className="px-5 py-2 font-semibold hover:text-gray-300"
                onClick={()=>props.setPage('SignIn')}>Sign In</button>
                <button className="bg-green-800 px-5 py-2 rounded-lg text-white font-semibold hover:bg-green-700"
                onClick={()=>props.setPage('SignUp')}>Sign Up</button>
            
            </div>

        </div> 
    );
}

export default Navbar;