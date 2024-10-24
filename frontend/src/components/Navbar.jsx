import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { GiSplitCross } from "react-icons/gi";
import { UserDetailsContext } from '../App';
import { useContext } from 'react';
import {CircleUserRound} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {userDetails}= useContext(UserDetailsContext);
  console.log("user at navbar ",userDetails);
  const isAuthenticated = userDetails?.user && userDetails?.sessionId;
  
  const updatedHref = isAuthenticated === null ? '/' : '/jobs-internships';
  const Toggler = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: '/jobs-internships', title: 'Start a search' },
    { path: '/my-work', title: 'My Posts' },
    { path: '/create-job', title: 'Post' }
  ];



  return (
    <header className='text-black max-w-screen-2xl container mx-auto x1:px-24 px-12 py-0 bg-yellow-300 sticky z-10'>
      <nav className='flex justify-between items-center'>
        <a href={updatedHref} className='flex items-center gap-2 text-4xl'>
          <span>NextSpark</span>
        </a>

        <ul className='hidden md:flex gap-12 '>
          {navItems.map(({ path, title }) => ( 
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? 'active:' : 'pending')}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
       
          <div className=' text-black lg:block width:40px'>
          {isAuthenticated ? (
              <Link to="/logout" className='border rounded bg-blue-600 hover:bg-spark'>
                <button className="border rounded bg-red-600 hover:bg-red-500 px-4 py-1 text-white">
                  Logout
                </button>
              </Link>  
          ) : (
            <Link to="/" className='border rounded bg-blue-600 hover:bg-spark'>
              <CircleUserRound size={40} absoluteStrokeWidth={true} strokeWidth={1} />
            </Link>
          )}
          </div>
        

        <div className='md:hidden block'>
          <button onClick={Toggler}>
            {
             isOpen ? <GiSplitCross className='w-5 h-5 text-primary' /> :
             <TbLayoutSidebarLeftCollapseFilled className='w-5 h-5 text-primary' />
            }
          </button>
        </div>
      </nav>
 
      <div className={`px-4 bg-black py-5 rounded-sm ${isOpen ? "" : "hidden"}`}>
        <ul>
          {navItems.map(({ path, title }) => (
            <li key={path} className='text-white'>
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? 'active:' : 'pending') }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
