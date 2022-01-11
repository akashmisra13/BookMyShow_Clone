import React, { useContext } from "react";
import { BiChevronDown, BiMenu, BiSearch, BiShareAlt } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { MovieContext } from "../../context/Movie.context";
function NavSm() {
    const { movie } = useContext(MovieContext);
    return (
        <>
        <div className="text-white flex items-center justify-between">
            <div>
                <h3 className="text-xl font-bold">It All Starts Here!</h3>
                <span className="text-gray-400 text-xs flex items-center cursor-pointer hover:text-white">
                    Delhi NCR <BiChevronDown />
                </span>
            </div>
            <div className="w-8 h-8">
                <BiSearch className="w-full h-full" />
            </div>
        </div>
    </>
);
}

function NavLg() {
    return (<>
        <div className="container flex mx-auto px-4 items-center justify-between">
        
            <div className="flex items-center w-1/2 gap-3">
            <div className="w-10 h-10">
                    <img src='https://i.ibb.co/zPBYW3H/imgbin-bookmyshow-office-android-ticket-png.png' alt='logo' className='w-full h-full' />

                </div>
                <div className="w-full flex items-center gap-3 bg-white px-3 py-1 rounded-md">
                    <BiSearch />
                    <input type="search" className="w-full bg-transparent border-none focus:outline-none" placeholder="Search for Movies, Sports, Events, Plays and Activities" />
                </div>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-gray-200 text-base flex items-center cursor-pointer hover:text-white">
                    Varanasi <BiChevronDown />
                </span>
                <NavLink className="bg-red-600 text-white px-2 py-1 text-sm rounded"  to='/login' >
                    Sign in
                </NavLink>
                <div className="w-8 h-8 text-white ">
                    <BiMenu className="w-full h-full" />
                </div>
                
            </div>
        </div>
    </>)
}
const MovieNavbar = () => {
    return <>
    <nav className='bg-white border-b-2 lg:border-b-0 lg:bg-darkBackground-700 p-4'>
        <div className='md:hidden'>
            {/* Mobile Screen */}
            <NavSm />
        </div>
        <div className='hidden md:flex lg:hidden'>
            {/* Medium/Tab based Screen */}
            <NavSm />
        </div>
        <div className='hidden w-full lg:flex '>
            {/* Large Screens */}
            <NavLg />
        </div>
    </nav>
</>

}
export default MovieNavbar;