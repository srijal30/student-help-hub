import art from '../assets/art.jpg';
import help from '../assets/help.jpg'

function Home() {
    return (  
        <div className="flex flex-col">
            <div className="bg-green-100 flex justify-around flex-wrap items-center sm:flex-nowrap py-10">
                <img className='w-[50%] max-w-[500px] mb-4 rounded-full' src={art} alt="graphic"/>
                <h1 className="font-bold text-3xl sm:text-5xl text-center w-[400px]">Get writing help from other students!</h1>
            </div>
            <div className="bg-blue-100 flex justify-around flex-wrap items-center sm:flex-nowrap py-10">
                <h1 className="font-bold text-3xl sm:text-5xl text-center w-[400px]">Help other students with their writing!</h1>
                <img className='w-[50%] max-w-[500px] mt-4 rounded-full' src={help} alt="graphic"/>
            </div>
        </div>
    );
}

export default Home;