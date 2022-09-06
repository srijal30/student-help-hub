import React, { useState } from 'react';
import { createUser, loginUser } from '../utilities';

export function SignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit = e => {
        e.preventDefault();
        const req = {
            email: email,
            password: password
        };
        loginUser(req)
        .then( res => {
            if(!res.success){
                console.log('login unsucessful because of', res.message);
            } else {
                console.log('login success');
                props.setLoggedIn(true);
            }
        })
        .catch( err => console.log('AUTH ERROR\n', err))
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
                <input className='block mx-auto border-2 p-2 rounded-md border-black 
                hover:border-gray-500' type="submit" value="Submit"/>
            </form>
        </div>
    );
}


export function SignUp(props) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit = e => {
        e.preventDefault();
        const request = {
            username: username,
            email: email,
            password: password
        }
        createUser(request)
        .then(res => {
            if(!res.success){
                console.log('sign up unsuccessful because of', res.message)
            }
            else{
                console.log('sign up successful');
                props.setPage('SignIn');
            }
        })
        .catch(err => console.log('AUTH ERROR\n', err));
    }
    return ( 
        <div className='flex-col justify-around text-center max-w-sm mt-20 rounded-2xl m-auto shadow-lg p-10'>
            <h1 className='text-xl font-bold mt-2 mb-5'>Sign Up</h1>
            <form onSubmit={onSubmit}>
                <label className='font-bold block'>Email:</label>
                <input className="p-2 border-2 border-black my-5" type="email" required value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
                <label className='font-bold block'>Username:</label>
                <input className="p-2 border-2 border-black my-5" type="text" required value={username}
                onChange={(e)=>setUsername(e.target.value)}/>
                <label className='font-bold block'>Password:</label>
                <input className="p-2 border-2 border-black my-5" type="password" required value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
                <input className='block mx-auto border-2 p-2 rounded-md border-black 
                hover:border-gray-500' type="submit" value="Submit"/>
            </form>
        </div>
    );
}
