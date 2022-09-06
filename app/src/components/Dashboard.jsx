import { yourEssays, othersEssays, commentOnEssay } from "../utilities";
import React, { useState, useEffect } from 'react';


function Dashboard(props) {
    const [currentEssay, changeEssay] = useState(null);
    return (  
        <React.Fragment>
        {props.currentUser && (
            <div>
                <div className="flex justify-between items-toplien mt-3 mb-7">
                    <div className="ml-5">
                        <h1 className="font-bold text-4xl">{props.currentUser.username}</h1>
                        <h1 className="font-light text-med">{props.currentUser.email}</h1>
                    </div>
                    <div className="text-right mr-5">
                        <h1 className="text-lg font-bold">🪙{props.currentUser.coins}</h1>
                    </div>
                </div>
                <div className="flex flex-wrap">
                    {currentEssay && <EssayEditor essay={currentEssay} changeEssay={changeEssay}/>}
                    <YourEssays setPage={props.setPage} changeEssay={changeEssay}/>
                    <SuggestedEssays setPage={props.setPage} changeEssay={changeEssay}/>
                </div>
            </div>
        )}
    </React.Fragment>
    );
}


function YourEssays(props){
    const[essays, setEssays] = useState(null);
    useEffect(()=>{
        const getEssays = async () => {
            const req = await yourEssays();
            //console.log(req);
            setEssays(req.data.essays);
        }
        getEssays();
    }, []); 
    return(
        <div className="w-[45%] sm:p-10 border-2 border-gray-500 rounded-lg mx-auto min-w-[250px] my-5 p-2 h-fit">
            <h1 className="text-4xl font-bold text-center">Request</h1>
            <p className="text-center max-w-1 mt-3 mx-5 text-sm"
            >You can request essays to be reviewed here. Requesting a review will cost 20 coins. Click the
            plus button to request a review for an essay.</p> 
            <div className="flex mt-5 p-2 justify-between">
                <h1 className="font-bold text-left text-md sm:text-xl">Title:</h1>
                <button className="text-white text-md bg-green-400 hover:bg-green-700
                rounded-lg px-2 font-bold pb-1"
                onClick={()=>props.setPage('CreateEssay')}>+</button>
            </div>
            {essays && <EssayList essays={essays} type='your' changeEssay={props.changeEssay}/>}
        </div>
    )
}


function SuggestedEssays(props){
    const[essays, setEssays] = useState(null);
    const [toggler, setToggler] = useState(false);
    useEffect(()=>{
        const getEssays = async () => {
            const req = await othersEssays();
            //console.log(req);
            setEssays(req.data.essays);
        }
        getEssays();
    }, [toggler]); 
    return(
        <div className="w-[45%] sm:p-10 border-2 border-gray-500 rounded-lg mx-auto  min-w-[250px] my-5 p-2 h-fit">
            <h1 className="text-4xl font-bold text-center">Review</h1>
            <p className="text-center max-w-1 mt-3 mx-5 text-sm"
            >You can find essays to review here. Reviewing an essay will give you 10 coins. Click the refresh
            button to reroll your essay options.</p> 
            <div className="flex mt-5 p-2 justify-between">
                <h1 className="font-bold text-left text-md sm:text-xl">Title:</h1>
                <button className="text-white text-md bg-[#00a6ed] 
                rounded-lg px-2 font-bold" onClick={()=>setToggler(!toggler)}>🔃</button>  
            </div>
            {essays && <EssayList essays={essays} type='other' changeEssay={props.changeEssay}/>}
        </div>
    )
}


function EssayList(props){
    const color = props.type == 'your' ? 'green' : 'blue';
    const onClick = essay => {
        props.changeEssay(essay);
    };
    return(
        <div className="overflow-y-auto h-[250px]">
            {props.essays.map(essay=>(
                <div className="flex" onClick={()=>onClick(essay)} key={essay.id}>
                    <div className={`flex justify-between font-bold px-2 py-1 border-2 mx-2 my-1 w-full rounded-lg hover:border-${color}-300`}>
                        <h1 className="first-letter:uppercase">{essay.title}</h1>
                        <i className="text-sm font-extralight">Comments: {essay.comments.length}</i>
                    </div>
                </div>
            ))}
        </div>
    )
}

function EssayEditor(props){
    const [commentContent, changeContent] = useState('');
    const onSubmit = e => {
        e.preventDefault();
        commentOnEssay({
            'content': commentContent,
            'essay_id': props.essay.id
        })
        .then(res=>{props.changeEssay(null); window.location.reload()})
        .catch(err=>console.log('COMMENT ERR', err));
    }
    return (
        <div className="bg-gray-500 bg-opacity-80 fixed inset-x-0 border-t-2 border-t-black 
        z-100 flex items-center justify-center p-10">
            <div className="w-[75%] flex flex-col bg-white items-center overflow-y-auto 
            snap-center border-gray-800 border-2 shadow-lg p-10 text-center mt-15 h-[700px]">
                <h1 className="first-letter:uppercase mb-7 font-extrabold text-3xl">{props.essay.title}</h1>

                <h1 className="font-bold sm:text-lg">Author's Message:</h1>
                <p className="mb-9 w-[90%] lg:w-[800px] sm:w-[500px] p-2  mt-1">{props.essay.message}</p>
                
                <h1 className="font-bold sm:text-lg">Content:</h1>
                <p className="mb-9 w-[90%] lg:w-[800px] sm:w-[500px] p-2  mt-1">{props.essay.content}</p>
                
                {props.essay.comments.map(comment=>(
                    <div className="bg-gray-300 rounded-xl p-3 mb-4" key={comment.id}>
                        <h1 className="first-letter:uppercase">{comment.content}</h1>
                    </div>
                ))}
                
                <form onSubmit={onSubmit}>
                    <textarea type="text" className="p-2 border-2 border-black rounded mb-2"
                    onChange={e=>changeContent(e.target.value)} required/>
                    <input className="block mx-auto bg-blue-400 rounded text-white px-4 py-2 mb-2 hover:bg-blue-600" value="Add Comment" type="submit"/>
                </form>
                <button className="rounded-lg px-4 py-2 text-white hover:bg-green-700
                bg-green-400 "
                onClick={()=>props.changeEssay(null)} >Skip</button>
            </div>
        </div>

    );
}


export default Dashboard;