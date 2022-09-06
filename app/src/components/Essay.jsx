import { useState } from "react";
import { createEssay } from "../utilities";

export function CreateEssay(props) {
    const[title, setTitle] = useState('');
    const[content, setContent] = useState('');
    const[message, setMessage] = useState('');
    const onSubmit = e => {
        e.preventDefault();
        createEssay({
            title: title,
            content: content,
            message: message,
        })
        .then(res=>{
            console.log(res);
            if(res.success){
                console.log('successfully created essay');
                props.setPage('Dashboard');
                window.location.reload();
            } else {
                console.log('could not create essay because', res.message)
            }
        })
        .catch(err=>console.log('ESSAY ERR', err));
    }
    return (
        <div className='flex-col justify-around text-center max-w-[75%] mt-20 rounded-2xl m-auto shadow-lg p-10'>
            <h1 className='text-xl font-bold mt-2 mb-5'>Request Essay Review</h1>
            <form onSubmit={onSubmit} className="px-5">
                <label className='font-bold block'>Title:</label>
                <input className="p-2 border-2 border-black my-5 w-100 rounded-lg" type="text" required value={title}
                onChange={(e)=>setTitle(e.target.value)}/>
                <label className='font-bold block'>Content:</label>
                <textarea className="p-2 border-2 border-black my-5 h-80 w-full overflow-auto rounded-lg" placeholder="Paste your essay here..." required value={content}
                onChange={(e)=>setContent(e.target.value)}/>
                <label className='font-bold block'>Additional Message:</label>
                <textarea className="p-2 border-2 border-black my-5 h-48 w-full overflow-auto rounded-lg" placeholder="Write a message to your editors..." value={message}
                onChange={(e)=>setMessage(e.target.value)} required/>
                <input className='mt-10 block mx-auto border-2 p-2 mb-5 rounded-md border-black 
                hover:border-gray-500' type="submit" value="Submit"/>
                <p>Cost: 20 Coins</p>
            </form>
        </div>
    );
}


export function CommentEssay(props) {
    return (
        <div>
            Comment Essay
        </div>
    );
}