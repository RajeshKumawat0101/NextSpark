import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import React, { createContext, useState, useRef } from 'react'
// import Home from './Pages/Home';

export const UserDetailsContext = createContext(null);

  
function App() {
  const user = JSON.parse(localStorage.getItem("user"))||null;
  const sessionId = localStorage.getItem("sessionId")||null;
  const [userDetails,setUserDetails] = useState({user,sessionId});
  const userDetailsRef = useRef(userDetails);

  console.log("user at app ",userDetails);

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails,userDetailsRef }}>
      <Navbar/>
       <Outlet/>
      {/* <footer>Footers</footer> */}
    </UserDetailsContext.Provider>
  )
}

export default App;
