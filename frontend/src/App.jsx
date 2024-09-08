import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { createContext, useState } from 'react'
export const UserDetailsContext = createContext(null);


function App() {
  
  const [userDetails,setUserDetails] = useState(null);
  return (
    
    
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      <Navbar/>
      <Outlet/>
      {/* <footer>Footers</footer> */}
    </UserDetailsContext.Provider>
  )
}

export default App
