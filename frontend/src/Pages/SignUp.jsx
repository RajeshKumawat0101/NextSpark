import React, { useState, useContext } from "react";
import { UserDetailsContext } from "../App";

const SignUp = ()=>{
    // console.log(useContext(UserDetailsContext));
    
    // const {setUserDetails,userDetailsRef} = useContext(UserDetailsContext);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    


    const handleSubmit= (e)=>{
            e.preventDefault();

            const user = {
                username : userName,
                useremail : userEmail,
                userpassword :userPassword
            };
             
            // console.log(userName)
            // console.log(userEmail); 
            // console.log(userPassword);
            
            
            fetch("http://localhost:3000/admin/sign-up",{
                 method:"POST",
                 headers: {
                    'Content-type': 'application/json'
                  },
                  body: JSON.stringify(user)
                })
                .then((response) => response.json())
                .then((result) => {
                  console.log("form submission result ",result)
                }
            )

            setUserName("");
            setUserEmail("");
            setUserPassword("");
            // userDetailsRef.current = result.user;
            // setUserDetails(result.userDetails); 
            <Navigate to="/loginuser" replace />
    }


    return (
        <div className="mt-24 w-full md:w-96 md:max-w-full mx-auto">
        <div className="p-6 border border-gray-300 sm:rounded-md">

            <h2 className="block mb-6 text-center text-gray-700">Register The User</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username" className="block mb-6">
                    <span className="text-gray-700">User Name</span>
                    <input type="text" id="username" value={userName} className="block w-full mt-1 p-1
                        border-gray-300 rounded-md shadow-sm"
                        placeholder="user name"
                        onChange={(e)=>{setUserName(e.target.value)}}>
                    </input>
                </label>
                <label htmlFor="useremail" className="block mb-6"> 
                    <span className="text-gray-700">Email Address</span>
                    <input type="text" id="useremail" value={userEmail} className="block w-full mt-1 p-1
                        border-black rounded-md shadow-sm"
                        placeholder="user email"
                        onChange={(e)=>{setUserEmail(e.target.value)}}>
                    </input>
                </label>
                <label htmlFor="userpassword" className="block mb-6"> 
                    <span className="text-gray-700">Password </span> 
                    <input type="text" id="userpassword" value={userPassword} className="block w-full mt-1 p-1
                        border-gray-300 rounded-md shadow-sm"
                        placeholder="password (must be 6+ length)"
                        onChange={(e)=>{setUserPassword(e.target.value)}}>
                    </input>
                </label>
                <button type="submit" id="logInButton" className="h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800"
                >SignUp</button>
            </form>
        </div>
        </div>
    
    )
}

export default SignUp;