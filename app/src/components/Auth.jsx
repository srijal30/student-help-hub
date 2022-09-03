import React, { useState } from 'react';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = e => {

    }

    return ( 
        <div className='flex-col justify-around text-center max-w-sm mt-20 rounded-2xl m-auto shadow-lg p-10'>
            <h1 className='text-xl font-bold mt-2 mb-5'>Sign In</h1>
            <form onSubmit={onSubmit}>
                <label className='font-bold block'>Email:</label>
                <input className="p-2 border-2 border-black my-5" type="email" required value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
                <label className='font-bold block'>Password:</label>
                <input className="p-2 border-2 border-black my-5" type="password" required value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
            </form>
        </div>
    );
}


export function SignUp() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return ( 
        <div className='flex-col justify-around text-center max-w-sm mt-20 rounded-2xl m-auto shadow-lg p-10'>
            <h1 className='text-xl font-bold mt-2 mb-5'>Sign Up</h1>
            <form>
                <label className='font-bold block'>Email:</label>
                <input className="p-2 border-2 border-black my-5" type="email" required value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
                <label className='font-bold block'>Username:</label>
                <input className="p-2 border-2 border-black my-5" type="text" required value={username}
                onChange={(e)=>setUsername(e.target.value)}/>
                <label className='font-bold block'>Password:</label>
                <input className="p-2 border-2 border-black my-5" type="password" required value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
            </form>
        </div>
    );
}
