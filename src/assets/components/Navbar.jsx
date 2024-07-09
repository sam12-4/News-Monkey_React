import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = ({close, setClose}) => {
  return (
    <>
      <nav className='navbar md:my-3 container md:static fixed top-0 z-30'>
        <div className="text-white md:mx-[9.5%] text-lg gap-4 rounded-lg bg-gradient-to-r from-black p-5 to-gray-600 flex justify-center items-center">
          <img src="./hamburger.svg" className='md:hidden' alt="" onClick={()=>{setClose(false); console.log(close);}}/>
        <img src="./news.gif" className=' w-16 -top-4 -left-16' alt="" />
          <div><div className='logo relative md:text-2xl font-bold heading-text'>News Monkey</div>
          </div>
          
        </div>
      </nav>
    </>
  )
}

export default Navbar
