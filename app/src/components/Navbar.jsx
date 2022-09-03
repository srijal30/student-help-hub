import React, { useState } from 'react';

function Navbar(props) {
    return (
        <div className="flex justify-between bg-gradient-to-r to-green-400
        from-green-800 p-6 items-center flex-grow-0 h-15">
        
            <div>
                <h1 className="text-xl font-bold text-white">HelpHub</h1>
            </div>

            <div className="flex text-white items-center flex-row-reverse">
                <button className="bg-green-800 px-5 py-2 rounded-lg 
                text-white font-semibold hover:bg-green-700 ">Sign Up</button>
                
                <button className="px-5 py-2 first-letter:text-white font-semibold outline-5 
                outline-black hover:text-gray-300">Sign In</button>
                
                <p className="text-lg">|</p>
            </div>

        </div> 
    );
}

export default Navbar;