import * as React from "react";
import App from "../App";
import Home from "../Pages/Home";
import MyWork from '../Pages/MyWork'
import EditWork from "../Pages/EditWork";
import {
  createBrowserRouter,
} from "react-router-dom";

import CreateJob from "../Pages/CreateJob";
import PrivateRoute from "./PrivateRoute";
import AllWorks from "../Pages/AllWorks";
import LogInUser from "../Pages/LogInUser.jsx";
import SignUp from "../Pages/SignUp.jsx";
import LogOutUser from "../Pages/LogOutUser.jsx";

 
const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
          path:"/",element:<LogInUser/>,
        },
        {
          path:"/home",element:<PrivateRoute element={<Home />} />,
        },
        {
          path:"/create-job",element:<PrivateRoute element={<CreateJob />} />,
        },
        {
          path:"/jobs-internships",element:<PrivateRoute element={<AllWorks />} />,
        },
        {
          path:"/my-work",element:<PrivateRoute element={<MyWork />} />,
        },
        {
          path:"/edit-work/:id",
          element:<PrivateRoute element={<EditWork />} />,
          loader:async ({params})=>{
            try {
              console.log("param is ",params);
              console.log("id is ",params?.id)
              const id = params?.id;
              //correct the url adding /works
              const response = await fetch(`http://localhost:3000/works/my-works-by-id/${id}`)
              // const presponse = await response.json(); 
              console.log("response id ",response);
              if (response.status === 404) {
                throw new Error("Work not found");
              }    
              if(!response.ok){
                throw new Error("Failed to fetch the work data");
               
              }
              return await response.json();
            } catch (error) {
              console.error("Error loading work data: ",error);
              throw new Response("Error fetching work data",{status:500});
            }
          }
        },
        {
          path:"/logout",
          element:<PrivateRoute element={<LogOutUser />} />,
        },
        {
          path:"/signup",
          element: <SignUp /> ,
        }
      ]
    },
  ]);

export default router;