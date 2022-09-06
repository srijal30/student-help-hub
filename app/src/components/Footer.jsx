function Footer() {
    return ( 
        <footer className="fixed bottom-0 w-full bg-gradient-to-r from-green-400
        to-green-800 flex text-white font-medium text-sm px-3 pt-1 justify-between items-center">
            <div>
                <h1>&copy; Copyright {new Date().getFullYear()} Salaj Rijal</h1>
            </div>
            <div className="text-sm text-right font-thin">
                <a className="block underline" href={"https://www.freepik.com/free-vector/female-student-listening-webinar-online_9175118.htm#query=education%20illustration&position=1&from_view=keyword"}
                >pch.vector</a>
                <a className="block underline   " href={"https://www.freepik.com/free-vector/diary-concept-illustration_10389818.htm#query=essay&position=0&from_view=search"}
                >storyset</a>
            </div>
        </footer>
    );
}

export default Footer;