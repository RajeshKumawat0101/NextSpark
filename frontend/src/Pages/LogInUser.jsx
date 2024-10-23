import React, { useState , useContext, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDetailsContext } from "../App";

const LogInUser = ()=>{
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");

    const navigate = useNavigate();
    const {userDetails, setUserDetails}  = useContext(UserDetailsContext);
    console.log("user at login ", userDetails);
    useEffect(()=>{
        if(userDetails?.user && userDetails?.sessionId){
            navigate('/home',{replace: true})
        }  
    },[]);    

    const handleSubmit= (e)=>{
        e.preventDefault();

        if(!userEmail || !userPassword){
            setErrorMessage("Please enter both email and password");
            return ;
        }

        const user = {
            useremail : userEmail,
            userpassword :userPassword
        }

        fetch("http://localhost:3000/admin/login",
            {
                method:"POST",
                headers: {
                'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then((response) => response.json())
            .then((result) => {
                console.log("result is ",result);
                if(result.code === 500){
                    alert(result.message);
                }

                if(result.code === 200){
                  const {sessionId,user} = result;
                  localStorage.setItem("sessionId",sessionId);
                  localStorage.setItem("user",JSON.stringify(user));  
                  setUserDetails({user,sessionId});
                  navigate('/home',{replace: true})  
                }  
            }
        ) 
    setUserEmail("");
    setUserPassword("");    
}


    return (
        
        <>
            <div className="mt-24 w-full md:w-96 md:max-w-full mx-auto">
                <div className="p-6 border border-gray-300 sm:rounded-md">

                    <h2 className="block mb-6 text-center text-gray-700">LogIn User</h2>
                    <form onSubmit={handleSubmit}>
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
                            <input type="password" id="userpassword" value={userPassword} className="block w-full mt-1 p-1
                                border-gray-300 rounded-md shadow-sm"
                                placeholder="password (must be 6+ length)"
                                onChange={(e)=>{setUserPassword(e.target.value)}}>
                            </input>
                        </label>
                        <button type="submit" id="logInButton" className="h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800"
                        >Login</button>
                    </form>
                    <p className=" mt-3 mb-0 h-10 text-black">Not Regesterd yet ? <Link to= "/signup" className="text-blue-400"><button >Signup</button></Link></p>    
                </div>
            </div>
        </>   
    )
}

export default LogInUser;
